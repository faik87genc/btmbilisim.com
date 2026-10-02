// Pure helpers for internal linking in AI drafts: rank real pages by topical
// overlap, strip links to pages that do not exist, and turn the model's link
// suggestions into a verified 3–5 item list. No DB / SDK imports, so it can be
// unit-tested with plain data.

import { slugifyTr } from "@/lib/slug";

export type LinkTarget = {
  slug: string;
  title: string;
  /** "service" = core/service page (conversion target), "article" = guide/post. */
  kind: "service" | "article";
  tags: string[];
};

export type LinkSuggestion = {
  /** Always a real, live slug (no slashes). */
  slug: string;
  title: string;
  /** Suggested anchor text. */
  anchor: string;
  /** Why this link fits (one sentence). */
  reason: string;
  /** True when the draft body already links there. */
  inContent: boolean;
};

/** Legal/about pages that are never useful contextual link targets. */
const NEVER_LINK = new Set([
  "cerez-politikasi",
  "kvkk-aydinlatma-metni",
]);

/** Route paths that exist outside the pages table. */
const STATIC_LINKABLE = new Set(["", "blog", "iletisim"]);

/**
 * "Money pages": the service pages every article must link to (at least
 * {@link MIN_MONEY_LINKS}, in context). Real slugs (nav + pages table).
 */
export const MONEY_PAGES: { slug: string; group: "güvenlik" | "altyapı" | "yazılım" }[] = [
  { slug: "hizmetler", group: "altyapı" },
  { slug: "siber-guvenlik-hizmetleri", group: "güvenlik" },
  { slug: "sizma-testi-penetrasyon-testi", group: "güvenlik" },
  { slug: "ag-ve-sistem-altyapi-cozumleri", group: "altyapı" },
  { slug: "sunucu-ve-veri-merkezi-hizmetleri", group: "altyapı" },
  { slug: "bulut-ve-yedekleme-cozumleri", group: "altyapı" },
  { slug: "cloud-hizmetleri", group: "altyapı" },
  { slug: "sanallastirma-hizmetleri", group: "altyapı" },
  { slug: "sistem-entegrasyonu", group: "altyapı" },
  { slug: "kurulum-hizmeti", group: "altyapı" },
  { slug: "it-destek-ve-danismanlik", group: "altyapı" },
  { slug: "lisanslama-hizmetleri", group: "altyapı" },
  { slug: "veri-kurtarma-hizmetleri", group: "altyapı" },
  { slug: "yazilim-hizmetleri", group: "yazılım" },
  { slug: "web-tasarim-hizmetleri", group: "yazılım" },
];

export const MONEY_PAGE_SLUGS: ReadonlySet<string> = new Set(MONEY_PAGES.map((p) => p.slug));

/** Every article links to at least this many distinct money pages. */
export const MIN_MONEY_LINKS = 2;

/** Distinct money pages the body links to (the page's own slug excluded). */
export function moneyLinksIn(content: string, selfSlug?: string | null): string[] {
  return [...linkedSlugs(content)].filter(
    (s) => MONEY_PAGE_SLUGS.has(s) && s !== (selfSlug ?? ""),
  );
}

const STOP = new Set([
  "ve", "ile", "icin", "nedir", "nasil", "bir", "bu", "ne", "kadar", "mi", "mu",
  "rehberi", "rehber", "guncel", "hizmeti", "hizmetleri", "cozumleri", "sistemi", "sistemleri",
  "danismanlik", "danismanligi", "kurumsal", "btm", "bilisim", "2025", "2026", "2027",
]);

function tokens(s: string): Set<string> {
  return new Set(
    slugifyTr(s)
      .split("-")
      .filter((t) => t.length > 2 && !STOP.has(t)),
  );
}

export function isLinkable(t: LinkTarget): boolean {
  return !NEVER_LINK.has(t.slug);
}

/** Targets sorted by token overlap with `brief` (topic + keywords), best first. */
export function rankLinkTargets(targets: LinkTarget[], brief: string): LinkTarget[] {
  const want = tokens(brief);
  return targets
    .filter(isLinkable)
    .map((t, i) => {
      const have = tokens([t.title, t.slug.replace(/-/g, " "), ...t.tags].join(" "));
      let score = 0;
      for (const w of want) if (have.has(w)) score++;
      return { t, score, i };
    })
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .map((x) => x.t);
}

/** Normalise "/foo", "foo/", "https://www.site/foo/" → "foo". */
export function toSlug(href: string, baseUrl?: string): string | null {
  let h = href.trim();
  if (baseUrl && h.startsWith(baseUrl)) h = h.slice(baseUrl.length);
  if (/^[a-z]+:/i.test(h) || h.startsWith("//")) return null; // external
  h = h.split("#")[0].split("?")[0];
  return h.replace(/^\/+|\/+$/g, "");
}

/**
 * Rewrite the body's internal links: known slugs get the canonical trailing
 * slash (`/slug/`), links to pages that don't exist are unwrapped to plain
 * text so a draft can never ship a 404 link. External and anchor links are
 * left alone.
 */
export function sanitizeInternalLinks(
  content: string,
  known: ReadonlySet<string>,
): { content: string; removed: string[] } {
  const removed: string[] = [];
  const out = content.replace(
    /(!?)\[([^\]]*)\]\((\/(?!\/)[^)\s]*)((?:\s+"[^"]*")?)\)/g,
    (whole, bang: string, text: string, href: string, title: string) => {
      if (bang) return whole; // images
      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
      const slug = toSlug(href);
      if (slug === null) return whole;
      if (slug === "") return `[${text}](/${hash}${title})`; // home, /#teklif
      if (slug.startsWith("blog/") || slug.startsWith("assets/")) return whole;
      if (STATIC_LINKABLE.has(slug) || known.has(slug)) {
        return `[${text}](/${slug}/${hash}${title})`;
      }
      removed.push(`/${slug}/`);
      return text;
    },
  );
  return { content: out, removed };
}

/** Slugs the body links to (normalised, deduped). */
export function linkedSlugs(content: string): Set<string> {
  const s = new Set<string>();
  for (const m of content.matchAll(/(?<!!)\[[^\]]*\]\((\/(?!\/)[^)\s]*)[^)]*\)/g)) {
    const slug = toSlug(m[1]);
    if (slug) s.add(slug);
  }
  return s;
}

/**
 * Verify the model's suggestions against real pages, then top up from the
 * relevance ranking so the editor always gets 3–5 real candidates.
 */
export function finalizeLinkSuggestions(opts: {
  suggested: { slug: string; anchor: string; reason: string }[];
  targets: LinkTarget[];
  brief: string;
  content: string;
  /** The draft's own slug — never suggest linking to itself. */
  selfSlug?: string;
  min?: number;
  max?: number;
}): LinkSuggestion[] {
  const min = opts.min ?? 3;
  const max = opts.max ?? 5;
  const bySlug = new Map(opts.targets.filter(isLinkable).map((t) => [t.slug, t]));
  const inBody = linkedSlugs(opts.content);
  const out: LinkSuggestion[] = [];
  const seen = new Set<string>();

  const push = (t: LinkTarget, anchor: string, reason: string) => {
    if (seen.has(t.slug) || t.slug === opts.selfSlug || out.length >= max) return;
    seen.add(t.slug);
    out.push({
      slug: t.slug,
      title: t.title,
      anchor: anchor.trim() || t.title,
      reason: reason.trim(),
      inContent: inBody.has(t.slug),
    });
  };

  for (const s of opts.suggested) {
    const slug = toSlug(s.slug.startsWith("/") ? s.slug : `/${s.slug}`);
    const t = slug ? bySlug.get(slug) : undefined;
    if (t) push(t, s.anchor, s.reason);
  }
  if (out.length < min) {
    const ranked = rankLinkTargets([...bySlug.values()], opts.brief);
    // At least one conversion target first, then the closest articles.
    const service = ranked.find((t) => t.kind === "service" && !seen.has(t.slug));
    if (service && !out.some((o) => bySlug.get(o.slug)?.kind === "service")) {
      push(service, service.title, "İlgili hizmet sayfası (dönüşüm).");
    }
    for (const t of ranked) {
      if (out.length >= min) break;
      push(t, t.title, "Konu örtüşmesine göre otomatik önerildi.");
    }
  }
  return out;
}
