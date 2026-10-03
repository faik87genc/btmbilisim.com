// Framework-free on-page SEO analysis for a blog post draft. Pure function so
// the admin editor can call it on every keystroke and (later) a test can pin
// its behaviour. Turkish-tuned where it matters (locale-aware casing, sentence
// splitting, readability thresholds).

export type CheckStatus = "good" | "warn" | "bad" | "na";

export type SeoCheck = {
  id: string;
  /** Short label shown in the checklist. */
  label: string;
  status: CheckStatus;
  /** One-line explanation / fix hint. */
  detail: string;
  /** Grouping for the UI. */
  group: "meta" | "content" | "links" | "taxonomy" | "compliance";
  /** Relative weight in the overall score (default 1). `na` is excluded. */
  weight?: number;
};

export type SeoAnalysis = {
  score: number; // 0..100
  /**
   * Score over only the checks an AI writer can fix from text alone — meta,
   * headings, keyword placement, links, body length, tags. Excludes the cover
   * image, OG image and in-content image alt (those need real uploads). The
   * article-generation pipeline optimises against THIS number.
   */
  controllableScore: number; // 0..100
  checks: SeoCheck[];
  stats: {
    wordCount: number;
    readingTimeMin: number;
    keywordCount: number;
    keywordDensity: number; // percent
    headings: { level: number; text: string }[];
    internalLinks: number;
    /** Distinct money pages (BTM service pages) linked. */
    moneyLinks: number;
    externalLinks: number;
    imagesTotal: number;
    imagesMissingAlt: number;
    h2Count: number;
    tables: number;
    faqCount: number;
    effectiveTitle: string;
    effectiveDescription: string;
  };
};

export type BlogSeoInput = {
  title: string;
  metaTitle?: string | null;
  slug: string;
  excerpt: string;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  content: string; // markdown
  coverImageUrl?: string | null;
  ogImageUrl?: string | null;
  tags?: string[];
  /** Appended to the page <title> by the route's metadata template. */
  titleSuffix?: string;
  /**
   * "blog" applies the daily-article standard (1500–2500 words, table, FAQ,
   * CTA, 3+ internal links); "page" keeps the lighter core-page thresholds.
   * Defaults to "blog".
   */
  kind?: "blog" | "page";
  /** Other rows on the site — enables slug/title cannibalisation and broken-link checks. */
  existingPages?: ExistingPageRef[];
  /** Slug the row is currently saved under (edit screen) — never a conflict with itself. */
  currentSlug?: string | null;
  /** Byline field; the site policy is "anonymous team, roles only". */
  authorName?: string | null;
  /** Personal names that must never appear (server-configured). */
  forbiddenNames?: string[];
};

export type ExistingPageRef = {
  slug: string;
  title: string;
  focusKeyword?: string | null;
};

import { slugifyTr } from "@/lib/slug";
import { faqPairs } from "@/lib/markdownStructure";
import { checkCitations, COMPLIANCE_RULES, scanCompliance } from "./compliance";
import { MIN_MONEY_LINKS, moneyLinksIn } from "@/lib/ai/linkTargets";

/**
 * Connectors that read as machine-written when they open many sentences
 * ("Nitekim, …", "Haliyle, …"). Matched on lower-cased sentence starts.
 */
const ROBOTIC_CONNECTORS = [
  "nitekim",
  "haliyle",
  "zira",
  "öncelikle",
  "sonuç olarak",
  "bununla birlikte",
  "dolayısıyla",
];
/** Warn when more than this share of sentences opens with one of them. */
const CONNECTOR_MAX_SHARE = 0.08;

/** Sentences of the body, one markdown line at a time (headings/list items end a sentence). */
function bodySentences(md: string): string[] {
  const out: string[] = [];
  for (const line of md.replace(/```[\s\S]*?```/g, " ").split("\n")) {
    if (/^\s*\|/.test(line)) continue; // table rows
    const plain = toPlainText(line);
    if (!plain) continue;
    for (const s of plain.split(/(?<=[.!?…])\s+/)) if (s.trim()) out.push(s.trim());
  }
  return out;
}

/** Below this a blog post is thin content, whatever else it has. */
export const THIN_CONTENT_WORDS = 1200;

/**
 * Pre-publish quality gate shown prominently in the editor: money-page links,
 * thin content, cannibalisation.
 */
export const QUALITY_GATE_CHECK_IDS: readonly string[] = [
  "money-links",
  "thin-content",
  "cannibalization",
];

const lc = (s: string) => s.toLocaleLowerCase("tr-TR");

/** Strip markdown to roughly plain text for word/keyword counting. */
function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/^#{1,6}\s+/gm, "") // heading marks
    .replace(/[*_>#~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(text: string): string[] {
  const t = text.match(/[\p{L}\p{N}’'-]+/gu);
  return t ? t : [];
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  const h = lc(haystack);
  const n = lc(needle).trim();
  if (!n) return 0;
  let i = 0;
  let count = 0;
  while ((i = h.indexOf(n, i)) !== -1) {
    count++;
    i += n.length;
  }
  return count;
}

function extractHeadings(md: string): { level: number; text: string }[] {
  const out: { level: number; text: string }[] = [];
  const lines = md.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{1,6})\s+(.*)$/.exec(line);
    if (m) out.push({ level: m[1].length, text: m[2].trim() });
  }
  return out;
}

/**
 * Checks that depend on assets the AI writer cannot produce (real uploaded
 * images). Excluded from {@link SeoAnalysis.controllableScore} and from the
 * generation pipeline's target — the editor still shows them so the author
 * knows to add a cover image before publishing.
 */
export const NON_WRITER_CHECK_IDS: ReadonlySet<string> = new Set([
  "image-alt",
  "cover-image",
  "social-image",
]);

/**
 * Checks only the editor can resolve (they depend on other rows or on form
 * fields the AI never writes). Shown in the checklist, excluded from the AI
 * repair list and from {@link SeoAnalysis.controllableScore}.
 */
export const MANUAL_CHECK_IDS: ReadonlySet<string> = new Set([
  "slug-conflict",
  "cannibalization",
  "author-anonymous",
]);

/** True for checks an AI rewrite of the text can fix. */
export function isWriterFixable(id: string): boolean {
  return !NON_WRITER_CHECK_IDS.has(id) && !MANUAL_CHECK_IDS.has(id);
}

// Words that say nothing about a page's topic on this site — ignored when
// comparing titles for cannibalisation.
const TITLE_STOPWORDS = new Set([
  "ve", "ile", "icin", "nedir", "nasil", "bir", "bu", "ne", "mi", "mu",
  "rehber", "rehberi", "guncel", "2025", "2026", "2027", "adim", "adimlar",
  "iso", "iec", "27001", "2022",
]);

function titleTokens(s: string): Set<string> {
  return new Set(
    slugifyTr(s)
      .split("-")
      .filter((t) => t.length > 1 && !TITLE_STOPWORDS.has(t)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

/** Paths that are real routes but not DB rows ("" = home). */
const STATIC_PATHS = new Set(["", "blog", "iletisim"]);

/** Content internal links as normalised slugs ("" = home). */
function internalLinkTargets(md: string): string[] {
  const out: string[] = [];
  for (const m of md.matchAll(/\]\((\/(?!\/)[^)\s]*)(?:\s+"[^"]*")?\)/g)) {
    const path = m[1].split("#")[0].split("?")[0];
    out.push(path.replace(/^\/+|\/+$/g, ""));
  }
  return out;
}

/** First prose paragraph (skips headings, images, tables, lists, quotes). */
function firstParagraph(md: string): string {
  for (const block of md.split(/\n\s*\n/)) {
    const b = block.trim();
    if (!b || /^(#|!\[|\||[-*+]\s|\d+[.)]\s|>|```)/.test(b)) continue;
    return b;
  }
  return "";
}

/** GFM tables: a header row followed by a |---|---| delimiter row. */
export function countTables(md: string): number {
  let n = 0;
  const lines = md.split("\n");
  for (let i = 1; i < lines.length; i++) {
    if (
      /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[i]) &&
      lines[i - 1].includes("|")
    ) {
      n++;
    }
  }
  return n;
}

function scoreControllable(checks: SeoCheck[]): number {
  const scored = checks.filter(
    (c) => c.status !== "na" && isWriterFixable(c.id),
  );
  const totalWeight = scored.reduce((s, c) => s + (c.weight ?? 1), 0);
  const gained = scored.reduce((s, c) => {
    const w = c.weight ?? 1;
    return s + w * (c.status === "good" ? 1 : c.status === "warn" ? 0.5 : 0);
  }, 0);
  return totalWeight ? Math.round((gained / totalWeight) * 100) : 0;
}

export function analyzeBlogPost(input: BlogSeoInput): SeoAnalysis {
  const suffix = input.titleSuffix ?? "";
  const effectiveTitleBase = (input.metaTitle || input.title || "").trim();
  const effectiveTitle = effectiveTitleBase
    ? `${effectiveTitleBase}${suffix}`
    : "";
  const effectiveDescription = (
    input.metaDescription ||
    input.excerpt ||
    ""
  ).trim();
  const keyword = (input.focusKeyword || "").trim();
  const hasKeyword = keyword.length > 0;

  const plain = toPlainText(input.content);
  const wordList = words(plain);
  const wordCount = wordList.length;
  const headings = extractHeadings(input.content);

  const isBlog = (input.kind ?? "blog") === "blog";
  // First real paragraph; fall back to the first 100 words for bodies that
  // open with a list/table.
  const firstChunk =
    toPlainText(firstParagraph(input.content)) ||
    wordList.slice(0, 100).join(" ");
  const keywordCount = hasKeyword ? countOccurrences(plain, keyword) : 0;
  const keywordDensity = wordCount ? (keywordCount / wordCount) * 100 : 0;

  // Internal links = distinct content targets. The home/#teklif and
  // /iletisim/ CTA links count separately (they are on every post).
  const linkTargets = internalLinkTargets(input.content);
  const contentTargets = new Set(
    linkTargets.filter((t) => t !== "" && t !== "iletisim"),
  );
  const internalLinks = contentTargets.size;
  const hasCta =
    /\]\(\/?#teklif\)|\]\(\/iletisim\/?(#[^)]*)?\)/.test(input.content);
  const h2Count = headings.filter((h) => h.level === 2).length;
  const tables = countTables(input.content);
  const faqs = faqPairs(input.content);
  const hasChecklist = /^\s*[-*+]\s+\[[ xX]\]\s+\S/m.test(input.content);
  const hasSteps = /^\s*\d+[.)]\s+\S/m.test(input.content) || hasChecklist;
  const selfSlug = (input.currentSlug || input.slug || "").trim();
  const moneyLinks = moneyLinksIn(input.content, selfSlug);
  const externalLinks = (
    input.content.match(/\]\(https?:\/\/[^)]*\)/g) || []
  ).length;
  const imageMatches = input.content.match(/!\[([^\]]*)\]\([^)]*\)/g) || [];
  const imagesTotal = imageMatches.length;
  const imagesMissingAlt = imageMatches.filter(
    (m) => /!\[\s*\]/.test(m) || /!\[\s*(görsel|image|resim|photo)\s*\]/i.test(m),
  ).length;

  // --- readability ---
  const sentences = plain
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const avgSentenceWords = sentences.length
    ? wordCount / sentences.length
    : wordCount;
  const longParas = input.content
    .split(/\n{2,}/)
    .filter((p) => words(toPlainText(p)).length > 160).length;

  const checks: SeoCheck[] = [];
  const add = (c: SeoCheck) => checks.push(c);

  // ---------- META ----------
  const tLen = effectiveTitle.length;
  add({
    id: "title-length",
    group: "meta",
    weight: 2,
    label: "Meta başlık uzunluğu",
    status: tLen === 0 ? "bad" : tLen >= 30 && tLen <= 60 ? "good" : "warn",
    detail:
      tLen === 0
        ? "Başlık boş."
        : `${tLen} karakter (hedef 30–60). Google ~60 karakterden sonrasını keser.`,
  });

  const dLen = effectiveDescription.length;
  add({
    id: "desc-length",
    group: "meta",
    weight: 2,
    label: "Meta açıklama uzunluğu",
    status: dLen === 0 ? "bad" : dLen >= 140 && dLen <= 160 ? "good" : "warn",
    detail:
      dLen === 0
        ? "Meta açıklama / özet boş."
        : `${dLen} karakter (hedef 140–160).`,
  });

  add({
    id: "keyword-set",
    group: "meta",
    weight: 2,
    label: "Odak anahtar kelime girildi",
    status: hasKeyword ? "good" : "bad",
    detail: hasKeyword
      ? `“${keyword}” için optimize ediliyor.`
      : "Hedeflediğin aramayı yaz — diğer kontroller buna göre çalışır.",
  });

  add({
    id: "keyword-in-title",
    group: "meta",
    weight: 2,
    label: "Anahtar kelime başlıkta",
    status: !hasKeyword
      ? "na"
      : countOccurrences(effectiveTitleBase, keyword) > 0
        ? "good"
        : "bad",
    detail: hasKeyword
      ? "Anahtar kelime başlığın başına yakın olsun."
      : "Önce anahtar kelime gir.",
  });

  add({
    id: "keyword-in-desc",
    group: "meta",
    label: "Anahtar kelime meta açıklamada",
    status: !hasKeyword
      ? "na"
      : countOccurrences(effectiveDescription, keyword) > 0
        ? "good"
        : "warn",
    detail: "Aramada kalın (bold) görünür, tıklama oranını artırır.",
  });

  const kwSlug = hasKeyword ? slugifyTr(keyword) : "";
  add({
    id: "keyword-in-slug",
    group: "meta",
    label: "Anahtar kelime URL'de",
    status: !hasKeyword
      ? "na"
      : kwSlug && input.slug.includes(kwSlug)
        ? "good"
        : "warn",
    detail: hasKeyword
      ? `URL "${kwSlug}" içermeli. Şu an: /${input.slug || "…"}`
      : "",
  });

  const slugWords = input.slug ? input.slug.split("-").filter(Boolean) : [];
  add({
    id: "slug-quality",
    group: "meta",
    label: "URL kısa ve temiz",
    status:
      slugWords.length === 0
        ? "bad"
        : input.slug.length <= 60 && slugWords.length <= 7
          ? "good"
          : "warn",
    detail:
      slugWords.length === 0
        ? "URL boş."
        : `${input.slug.length} karakter, ${slugWords.length} kelime (hedef ≤60 kar / ≤7 kelime).`,
  });

  // ---------- CONTENT ----------
  add({
    id: "word-count",
    group: "content",
    weight: 2,
    label: "İçerik uzunluğu",
    status: isBlog
      ? wordCount >= 1500 && wordCount <= 4500
        ? "good"
        : wordCount >= THIN_CONTENT_WORDS
          ? "warn"
          : "bad"
      : wordCount >= 600
        ? "good"
        : wordCount >= 300
          ? "warn"
          : "bad",
    detail: isBlog
      ? `${wordCount} kelime (hedef 1500–2500; pillar 3000–4500).`
      : `${wordCount} kelime. Sıralanan rehber içerikler genelde 600+ kelime.`,
  });

  add({
    id: "keyword-early",
    group: "content",
    label: "Anahtar kelime ilk paragrafta",
    status: !hasKeyword
      ? "na"
      : countOccurrences(firstChunk, keyword) > 0
        ? "good"
        : "warn",
    detail: "İlk paragrafın ilk cümlesinde geçmesi konuyu ve arama niyetini netleştirir.",
  });

  add({
    id: "h2-count",
    group: "content",
    weight: 2,
    label: isBlog ? "H2 bölüm sayısı" : "En az bir H2 alt başlık",
    status: isBlog
      ? h2Count >= 5 && h2Count <= 10
        ? "good"
        : h2Count >= 3
          ? "warn"
          : "bad"
      : h2Count >= 1
        ? "good"
        : "bad",
    detail: isBlog
      ? `${h2Count} adet ## başlık (hedef 5–10; SSS dahil). Her H2 bir alt arama niyetini karşılasın.`
      : "İçeriği ## ile bölümlere ayır — hem okunur hem taranır.",
  });

  if (isBlog) {
    add({
      id: "has-table",
      group: "content",
      label: "En az 1 tablo",
      status: tables >= 1 ? "good" : "warn",
      detail: `${tables} tablo. Karşılaştırma/karar tablosu öne çıkan snippet şansını artırır.`,
    });

    add({
      id: "faq",
      group: "content",
      weight: 2,
      label: "SSS bölümü (FAQPage şeması)",
      status:
        faqs.length >= 5 && faqs.length <= 8
          ? "good"
          : faqs.length >= 3
            ? "warn"
            : "bad",
      detail:
        faqs.length === 0
          ? "SSS yok. '## Sıkça Sorulan Sorular' altında '?' ile biten 5–8 '### Soru' ve hemen altında paragraf yanıt yaz."
          : `${faqs.length} soru-yanıt algılandı (hedef 5–8). Şemaya yalnızca '?' ile biten başlık + altındaki paragraf girer.`,
    });

    add({
      id: "steps",
      group: "content",
      label: "Somut adımlar / kontrol listesi",
      status: hasSteps ? "good" : "warn",
      detail: "Numaralı adım listesi veya '- [ ]' kontrol listesi ekle.",
    });

    // Thin content: short, or missing the structure that makes a post worth
    // ranking (decision table, checklist, FAQ). Counts toward the score on
    // top of the individual checks on purpose — it is the headline warning.
    const thin: string[] = [];
    if (wordCount < THIN_CONTENT_WORDS) thin.push(`${wordCount} kelime (en az ${THIN_CONTENT_WORDS})`);
    if (tables === 0) thin.push("tablo yok");
    if (!hasChecklist) thin.push("'- [ ]' kontrol listesi yok");
    if (faqs.length === 0) thin.push("SSS yok");
    add({
      id: "thin-content",
      group: "content",
      weight: 3,
      label: "İnce içerik riski",
      status:
        wordCount < THIN_CONTENT_WORDS || thin.length >= 2
          ? "bad"
          : thin.length === 1
            ? "warn"
            : "good",
      detail: thin.length
        ? `${thin.join(", ")}. Dolgu ekleme; saha bilgisi (denetimde istenen kanıt, sık görülen bulgu, yapılandırma örneği, sık yapılan hatalar), karar tablosu, kontrol listesi ve SSS ile derinleştir.`
        : "Uzunluk ve yapı (tablo, kontrol listesi, SSS) yeterli.",
    });

    add({
      id: "money-links",
      group: "links",
      weight: 3,
      label: `Para sayfasına bağlam içi link (en az ${MIN_MONEY_LINKS})`,
      status:
        moneyLinks.length >= MIN_MONEY_LINKS
          ? "good"
          : moneyLinks.length === 1
            ? "warn"
            : "bad",
      detail:
        moneyLinks.length >= MIN_MONEY_LINKS
          ? `Bağlanan hizmet sayfaları: ${moneyLinks.map((s) => `/${s}/`).join(", ")}.`
          : `${moneyLinks.length} hizmet sayfasına link var${
              moneyLinks.length ? ` (${moneyLinks.map((s) => `/${s}/`).join(", ")})` : ""
            }. En az ${MIN_MONEY_LINKS} farklı hizmet sayfasına ilgili cümlenin içinde link ver — ör. /danismanlik/it-danismanlik-hizmetleri/, /siber-guvenlik/sizma-testi-penetrasyon-testi/, /bulut-yedekleme/ (/#teklif sayılmaz).`,
    });

    add({
      id: "cta",
      group: "links",
      label: "Teklif çağrısı (CTA)",
      status: hasCta ? "good" : "warn",
      detail: "Son bölümde /#teklif veya /iletisim/ linkli bir teklif çağrısı olsun.",
    });
  }

  add({
    id: "keyword-in-heading",
    group: "content",
    label: "Anahtar kelime bir alt başlıkta",
    status: !hasKeyword
      ? "na"
      : headings.some((h) => countOccurrences(h.text, keyword) > 0)
        ? "good"
        : "warn",
    detail: "En az bir H2/H3 anahtar kelimeyi (veya varyantını) içersin.",
  });

  add({
    id: "keyword-density",
    group: "content",
    label: "Anahtar kelime yoğunluğu",
    status: !hasKeyword
      ? "na"
      : wordCount < 100
        ? "warn"
        : keywordDensity === 0
          ? "bad"
          : keywordDensity >= 0.4 && keywordDensity <= 2.5
            ? "good"
            : "warn",
    detail: hasKeyword
      ? `%${keywordDensity.toFixed(1)} (${keywordCount} kez). Hedef %0.4–%2.5; fazlası spam sinyali.`
      : "",
  });

  const hasMdH1 = headings.some((h) => h.level === 1);
  let skips = 0;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1) skips++;
  }
  add({
    id: "heading-structure",
    group: "content",
    label: "Başlık hiyerarşisi düzgün",
    status: hasMdH1 ? "bad" : skips > 0 ? "warn" : "good",
    detail: hasMdH1
      ? "İçerikte tek # (H1) KULLANMA — sayfa başlığı zaten H1. ## ile başla."
      : skips > 0
        ? `${skips} yerde seviye atlanmış (ör. H2'den H4'e).`
        : "H2 → H3 sıralı ilerliyor.",
  });

  add({
    id: "readability",
    group: "content",
    label: "Okunabilirlik",
    status:
      wordCount < 80
        ? "na"
        : avgSentenceWords <= 22 && longParas === 0
          ? "good"
          : avgSentenceWords > 30 || longParas > 2
            ? "bad"
            : "warn",
    detail: `Ortalama cümle ${avgSentenceWords.toFixed(0)} kelime${
      longParas ? `, ${longParas} çok uzun paragraf` : ""
    }. Kısa cümle + kısa paragraf.`,
  });

  if (isBlog) {
    const sents = bodySentences(input.content);
    const counts = new Map<string, number>();
    for (const s of sents) {
      const start = lc(s).replace(/^[^\p{L}]+/u, "");
      const hit = ROBOTIC_CONNECTORS.find(
        (c) => start.startsWith(c) && !/\p{L}/u.test(start.charAt(c.length)),
      );
      if (hit) counts.set(hit, (counts.get(hit) ?? 0) + 1);
    }
    const total = [...counts.values()].reduce((a, b) => a + b, 0);
    const share = sents.length ? total / sents.length : 0;
    add({
      id: "robotic-connectors",
      group: "content",
      label: "Robotik bağlaç kullanımı",
      status:
        sents.length < 20
          ? "na"
          : total >= 3 && share > CONNECTOR_MAX_SHARE
            ? "warn"
            : "good",
      detail: total
        ? `${total}/${sents.length} cümle (%${(share * 100).toFixed(0)}) bağlaçla başlıyor: ${[...counts]
            .map(([c, n]) => `“${c}” ×${n}`)
            .join(", ")}. %${CONNECTOR_MAX_SHARE * 100} üstü yapay metin sinyali — bağlacı at veya cümleyi yeniden kur.`
        : "Cümle başlarında Nitekim/Haliyle/Zira gibi bağlaç tekrarı yok.",
    });

    const titleYear = /\b20\d{2}\b/.exec(`${input.title} ${input.metaTitle ?? ""}`);
    add({
      id: "title-year",
      group: "meta",
      label: "Başlıkta yıl yok",
      status: titleYear ? "warn" : "good",
      detail: titleYear
        ? `Başlıkta “${titleYear[0]}” var. İçerik gerçekten tarihe bağlı değilse kaldır — yıl eskidikçe tıklama düşer ve yazı her yıl güncelleme ister.`
        : "",
    });
  }

  // ---------- LINKS & MEDIA ----------
  add({
    id: "internal-links",
    group: "links",
    weight: 2,
    label: "Dahili link (farklı sayfalara)",
    status: isBlog
      ? internalLinks >= 3
        ? "good"
        : internalLinks >= 1
          ? "warn"
          : "bad"
      : internalLinks >= 2
        ? "good"
        : internalLinks === 1
          ? "warn"
          : "bad",
    detail: `${internalLinks} farklı sayfaya dahili link (hedef ${isBlog ? "3–5" : "2+"}; teklif/iletişim linki hariç).${isBlog ? ` En az ${MIN_MONEY_LINKS} tanesi hizmet (para) sayfası olsun.` : ""}`,
  });

  if (input.existingPages && input.existingPages.length > 0) {
    const known = new Set(input.existingPages.map((p) => p.slug));
    const broken = [...new Set(linkTargets)].filter(
      (t) =>
        !STATIC_PATHS.has(t) &&
        !t.startsWith("blog/") &&
        !t.startsWith("assets/") &&
        !known.has(t),
    );
    add({
      id: "broken-internal-links",
      group: "links",
      weight: 2,
      label: "Dahili linkler gerçek sayfalara gidiyor",
      status: broken.length ? "bad" : "good",
      detail: broken.length
        ? `Sitede olmayan adres: ${broken.slice(0, 4).map((b) => `/${b}/`).join(", ")}`
        : "Tüm dahili linkler yayındaki/kayıtlı sayfalara gidiyor.",
    });
  }

  add({
    id: "external-links",
    group: "links",
    label: "Dış kaynak linki",
    status: externalLinks >= 1 ? "good" : "warn",
    detail: `${externalLinks} dış link. Otoriter bir kaynağa (mevzuat, standart) atıf güven verir.`,
  });

  add({
    id: "image-alt",
    group: "links",
    label: "Görsellerin alt metni",
    status:
      imagesTotal === 0
        ? "warn"
        : imagesMissingAlt === 0
          ? "good"
          : "bad",
    detail:
      imagesTotal === 0
        ? "İçerikte görsel yok. En az bir açıklayıcı görsel ekle."
        : imagesMissingAlt === 0
          ? `${imagesTotal} görselin hepsinde alt metin var.`
          : `${imagesMissingAlt}/${imagesTotal} görselde alt metin eksik veya jenerik.`,
  });

  add({
    id: "cover-image",
    group: "links",
    label: "Kapak görseli",
    status: input.coverImageUrl ? "good" : "bad",
    detail: "Liste kartında ve yazı başında görünür.",
  });

  add({
    id: "social-image",
    group: "links",
    label: "Sosyal paylaşım görseli",
    status: input.ogImageUrl || input.coverImageUrl ? "good" : "warn",
    detail:
      "OG görseli yoksa kapak kullanılır; ikisi de yoksa link paylaşımı logoyla çıkar (düşük tıklama).",
  });

  // ---------- TAXONOMY ----------
  const tags = input.tags ?? [];
  add({
    id: "tags",
    group: "taxonomy",
    label: "Etiket eklenmiş",
    status: tags.length >= 2 ? "good" : tags.length === 1 ? "warn" : "bad",
    detail: `${tags.length} etiket. 2–4 konu etiketi arşiv sayfalarını ve ilgili yazıları besler.`,
  });

  // ---------- CANNIBALISATION (needs the other rows) ----------
  if (input.existingPages && input.existingPages.length > 0) {
    const self = (input.currentSlug || "").trim();
    const others = input.existingPages.filter((p) => p.slug !== self);
    const slugTaken = input.slug
      ? others.find((p) => p.slug === input.slug)
      : undefined;
    add({
      id: "slug-conflict",
      group: "taxonomy",
      weight: 2,
      label: "URL (slug) benzersiz",
      status: slugTaken ? "bad" : input.slug ? "good" : "na",
      detail: slugTaken
        ? `/${input.slug}/ zaten “${slugTaken.title}” sayfasında kullanılıyor — kaydedilemez.`
        : "Bu URL başka bir sayfada yok.",
    });

    const mine = titleTokens(effectiveTitleBase || input.title);
    const mineH1 = titleTokens(input.title);
    const kwSlugFull = hasKeyword ? slugifyTr(keyword) : "";
    const similar = others
      .map((p) => {
        const theirs = titleTokens(p.title);
        const sim = Math.max(jaccard(mine, theirs), jaccard(mineH1, theirs));
        const sameKeyword =
          !!kwSlugFull &&
          ((!!p.focusKeyword && slugifyTr(p.focusKeyword) === kwSlugFull) ||
            p.slug === kwSlugFull);
        return { p, sim, sameKeyword };
      })
      .filter((x) => x.sim >= 0.6 || x.sameKeyword)
      .sort((a, b) => Number(b.sameKeyword) - Number(a.sameKeyword) || b.sim - a.sim)
      .slice(0, 3);
    // Same focus keyword or a near-identical title is a real conflict (two
    // URLs competing for one query); a looser overlap is only a heads-up.
    const hardConflict = similar.some((x) => x.sameKeyword || x.sim >= 0.8);
    add({
      id: "cannibalization",
      group: "taxonomy",
      weight: 2,
      label: "Mevcut yazıyla çakışma (yamyamlaşma)",
      status: hardConflict ? "bad" : similar.length ? "warn" : "good",
      detail: similar.length
        ? `Benzer hedef: ${similar
            .map(
              (x) =>
                `/${x.p.slug}/ “${x.p.title}”${x.sameKeyword ? " (aynı odak kelime)" : ` (%${Math.round(x.sim * 100)} benzer)`}`,
            )
            .join("; ")}. Farklı bir alt niyet seç veya mevcut yazıyı güncelle.`
        : "Aynı başlık/odak kelimeyi hedefleyen başka sayfa yok.",
    });
  }

  if (isBlog) {
    const author = (input.authorName || "").trim();
    const roleLike = /ekip|ekib|uzman|danışman|editör|takım|kurul|birim/i.test(author);
    add({
      id: "author-anonymous",
      group: "compliance",
      label: "Yazar alanı isimsiz",
      status: !author || roleLike ? "good" : "bad",
      detail:
        !author || roleLike
          ? "Yazar boş veya rol adı — kurum adına yayınlanır."
          : `“${author}” kişi adı gibi görünüyor. Kural: kişisel ad yok, yalnızca rol (boş bırak veya 'Uzman Ekibimiz').`,
    });
  }

  // ---------- COMPLIANCE (warn only — never blocks publishing) ----------
  const scanText = [
    input.title,
    input.metaTitle ?? "",
    input.metaDescription ?? "",
    input.excerpt,
    input.content,
  ].join("\n");
  const hits = scanCompliance(scanText, { forbiddenNames: input.forbiddenNames });
  const hitById = new Map(hits.map((h) => [h.id, h]));
  if (hitById.has("claim-owner-name")) {
    const h = hitById.get("claim-owner-name")!;
    add({
      id: h.id,
      group: "compliance",
      weight: 3,
      label: h.label,
      status: "bad",
      detail: `${h.hint} Bulunan: ${h.matches.join(" | ")}`,
    });
  }
  for (const rule of COMPLIANCE_RULES) {
    const h = hitById.get(rule.id);
    add({
      id: rule.id,
      group: "compliance",
      weight: h?.severity === "bad" ? 3 : 1,
      label: h ? h.label : `Yok: ${rule.label}`,
      status: h ? h.severity : "good",
      detail: h ? `${h.hint} Bulunan: ${h.matches.join(" | ")}` : "",
    });
  }
  const citationIssues = checkCitations(input.content);
  add({
    id: "citations",
    group: "compliance",
    weight: citationIssues.some((c) => c.severity === "bad") ? 3 : 1,
    label: "Standart / mevzuat atıfları",
    status: citationIssues.some((c) => c.severity === "bad")
      ? "bad"
      : citationIssues.length
        ? "warn"
        : "good",
    detail: citationIssues.map((c) => `${c.label}: ${c.detail}`).join(" "),
  });

  // ---------- SCORE ----------
  const scored = checks.filter((c) => c.status !== "na");
  const totalWeight = scored.reduce((s, c) => s + (c.weight ?? 1), 0);
  const gained = scored.reduce((s, c) => {
    const w = c.weight ?? 1;
    return s + w * (c.status === "good" ? 1 : c.status === "warn" ? 0.5 : 0);
  }, 0);
  const score = totalWeight ? Math.round((gained / totalWeight) * 100) : 0;

  return {
    score,
    checks,
    controllableScore: scoreControllable(checks),
    stats: {
      wordCount,
      readingTimeMin: Math.max(1, Math.round(wordCount / 200)),
      keywordCount,
      keywordDensity,
      headings,
      internalLinks,
      moneyLinks: moneyLinks.length,
      externalLinks,
      imagesTotal,
      imagesMissingAlt,
      h2Count,
      tables,
      faqCount: faqs.length,
      effectiveTitle,
      effectiveDescription,
    },
  };
}
