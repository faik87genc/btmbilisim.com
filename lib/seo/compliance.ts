// Pre-publish content-policy scan: claims this site must never make (see the
// team brief) and citation sanity for ISO/IEC 27001:2022 Annex A and KVKK.
// Pure and framework-free — runs on every keystroke in the admin editor and in
// the AI pipeline (so a failing rule becomes a repair instruction). It only
// WARNS: nothing here blocks saving or publishing.

import { isValidAnnexA, KVKK_ARTICLE_COUNT } from "./standardsRef";

export type ComplianceSeverity = "bad" | "warn";

export type ComplianceHit = {
  id: string;
  label: string;
  severity: ComplianceSeverity;
  /** Fix hint shown next to the matches. */
  hint: string;
  /** Up to 3 short context snippets around the matches. */
  matches: string[];
};

type Rule = {
  id: string;
  label: string;
  severity: ComplianceSeverity;
  hint: string;
  patterns: RegExp[];
  /** Drop a match when this returns true (e.g. %100 is handled elsewhere). */
  skip?: (match: string) => boolean;
};

/**
 * Turkish-safe lower-casing with dotless ı folded to i, so patterns can be
 * written once in plain lower case ("iaf", "lead auditor"). Every mapping is
 * 1:1 in length, so match indices still point into the original text.
 */
export function normalizeForScan(s: string): string {
  return s.toLocaleLowerCase("tr-TR").replace(/ı/g, "i");
}

// Patterns run on normalizeForScan() output.
const RULES: Rule[] = [
  {
    id: "claim-guarantee",
    label: "Belge garantisi / %100 vaadi",
    severity: "bad",
    hint: "Belge veya başarı garantisi verilemez; kararı belgelendirme kuruluşu verir. 'Denetime hazır hale getirme' gibi süreç odaklı yaz.",
    patterns: [
      /(belge|sertifika|belgelendirme)\S*\s+(\S+\s+){0,3}garanti/g,
      /garanti\S*\s+(\S+\s+){0,2}(belge|sertifika|başari|onay)/g,
      /başari\s+garanti/g,
      /%\s?100(?![.,]\d)/g,
      /\b100\s?%/g,
      /yüzde\s+yüz\b/g,
      /(kesin|mutlaka|garantili)\s+(\S+\s+){0,2}(belge|sertifika)\S*\s+(\S+\s+){0,1}(alirsiniz|sahibi|verilir)/g,
      /denetimden\s+(kesin|mutlaka|garantili)/g,
      /(kesinlikle|mutlaka)\s+geçersiniz/g,
    ],
  },
  {
    id: "claim-identity",
    label: "Denetçi kimlik iddiası",
    severity: "bad",
    hint: "'Baş Denetçi', 'Lead Auditor', 'akredite denetçi' gibi kimlik iddiası yok — ekip yalnızca rolleriyle anılır ('deneyimli danışman ekibi').",
    patterns: [
      /baş\s*denetçi/g,
      /baş\s*tetkikçi/g,
      /lead\s*auditor/g,
      /akredite\s+(denetçi|tetkikçi|uzman)/g,
      /(sertifikali|belgeli)\s+denetçi(ler)?imiz/g,
    ],
  },
  {
    id: "claim-accreditation",
    label: "TÜRKAK / IAF anılıyor",
    severity: "bad",
    hint: "TÜRKAK/IAF ve akreditasyon kurumlarına atıf/link verme; gerekiyorsa 'akredite belgelendirme kuruluşu' gibi genel ifade kullan.",
    patterns: [/türkak/g, /\bturkak/g, /\biaf\b/g, /iaf\.nu/g],
  },
  {
    id: "claim-unoffered",
    label: "Sunulmayan hizmet imaları",
    severity: "warn",
    hint: "SOC 2 raporu, TISAX değerlendirmesi, PCI QSA hizmeti sunulmuyor — bunları verdiğimiz izlenimi yaratma (genel bilgi olarak anılabilir).",
    patterns: [
      /\bsoc\s?2\s+(rapor|denetim|hizmet|belgesi|sertifika)/g,
      /\btisax\s+(değerlendirme|denetim|hizmet|etiket)/g,
      /\bpci\s*qsa\b/g,
    ],
  },
  {
    id: "claim-tse",
    label: "TSE belgesi / onayı iddiası",
    severity: "bad",
    hint: "Sitede TSE sızma testi belgesi yok ve iddia edilmez. TSE'yi yetki/belge bağlamında anma.",
    patterns: [
      /\btse\b[^.\n]{0,80}(belge|onay|sertifika|yetki|akredit|kayitli)/g,
      /(belge|onay|sertifika|yetki)\S*[^.\n]{0,40}\btse\b/g,
      /\btse\s*(onayli|belgeli|sertifikali)/g,
    ],
  },
  {
    id: "claim-vishing",
    label: "Sesli oltalama (vishing) hizmeti",
    severity: "bad",
    hint: "Sesli oltalama sunulmuyor. Yalnızca e-posta oltalama tatbikatı yazılabilir; vishing yalnızca tehdit türü olarak anılabilir, hizmet gibi okunmamalı.",
    patterns: [
      /sesli\s+oltalama/g,
      /\bvishing\b/g,
      /telefon(la|\s+ile|\s+üzerinden)?\s+oltalama/g,
      /sesli\s+phishing/g,
    ],
  },
  {
    id: "claim-superlative",
    label: "Abartılı üstünlük iddiası",
    severity: "warn",
    hint: "'En iyi', 'lider', '1 numara' gibi kanıtlanamayan iddiaları sil.",
    patterns: [
      /türkiye['’]?nin\s+(en\s+\S+|1\s*numarali|lider)/g,
      /\ben\s+iyi\s+(iso|danişman|firma|şirket|hizmet)/g,
      /sektör(ün)?\s+lider/g,
      /\blider\s+(firma|danişman|şirket)/g,
      /\b1\s*numarali\b/g,
    ],
  },
  {
    id: "claim-stats",
    label: "Kaynaksız istatistik / rapor atfı",
    severity: "warn",
    hint: "Her yüzde ve 'araştırmaya göre' ifadesi doğrulanabilir bir kaynağa dayanmalı; dayanmıyorsa genel ifadeye çevir.",
    patterns: [
      /%\s?\d{1,2}(?!\d)([.,]\d+)?/g,
      /(?<!\d)\d{1,2}([.,]\d+)?\s?%/g,
      /(araştirma|rapor|anket|istatistik|veri)\S*\s+(göre|gösteriyor|ortaya\s+koyuyor)/g,
      /\b(gartner|ponemon|verizon\s+dbir|statista|ibm\s+cost)/g,
    ],
  },
  {
    id: "claim-clients",
    label: "Müşteri / vaka anlatımı",
    severity: "warn",
    hint: "Uydurma müşteri, vaka, proje anekdotu veya yorum yok. Gerçek ve izinli değilse genel anlatıma çevir ('denetimlerde sık görülen…', 'denetçiler genellikle … ister').",
    patterns: [
      /(müşteri|referans)(ler)?(imiz|lerimiz)\S*\s+(yorum|görüş)/g,
      /(müşteri|referans)\s+(yorumlari|görüşleri)/g,
      /(müşteri|referans)(ler)?imiz(den|in)?\s+(biri|arasinda)/g,
      /\bbir\s+müşterimiz(de|in)?\b/g,
      // First-person case stories: "yürüttüğümüz bir projede", "danışmanlık verdiğimiz fabrikada"
      /(yürüttüğümüz|gerçekleştirdiğimiz|yaptiğimiz|tamamladiğimiz|destek\s+verdiğimiz|danişmanlik\s+verdiğimiz|çaliştiğimiz)\s+(\S+\s+){0,2}(proje|denetim|müşteri|firma|kurum|şirket|fabrika|işletme)/g,
      /\b(projelerimiz|denetimlerimiz|müşterilerimiz)(in|de|den)\s+(çoğu|büyük|yarisi|birçoğu|%)/g,
    ],
  },
];

function snippet(original: string, index: number, length: number): string {
  const start = Math.max(0, index - 30);
  const end = Math.min(original.length, index + length + 30);
  return (
    (start > 0 ? "…" : "") +
    original.slice(start, end).replace(/\s+/g, " ").trim() +
    (end < original.length ? "…" : "")
  );
}

function runPatterns(
  original: string,
  norm: string,
  patterns: RegExp[],
  skip?: (m: string) => boolean,
): string[] {
  const out: string[] = [];
  let total = 0;
  for (const re of patterns) {
    for (const m of norm.matchAll(re)) {
      if (skip?.(m[0])) continue;
      total++;
      if (out.length < 3) out.push(snippet(original, m.index ?? 0, m[0].length));
    }
  }
  return total ? out : [];
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Scan all human-visible text of a post. `forbiddenNames` is an optional
 * list of personal names that must never appear (configured server-side,
 * never hardcoded in the repo).
 */
export function scanCompliance(
  text: string,
  opts: { forbiddenNames?: string[] } = {},
): ComplianceHit[] {
  const norm = normalizeForScan(text);
  const hits: ComplianceHit[] = [];

  const names = (opts.forbiddenNames ?? []).map((n) => n.trim()).filter((n) => n.length >= 3);
  if (names.length) {
    const matches = runPatterns(
      text,
      norm,
      names.map((n) => new RegExp(`\\b${escapeRe(normalizeForScan(n))}\\b`, "g")),
    );
    if (matches.length) {
      hits.push({
        id: "claim-owner-name",
        label: "Kişi adı geçiyor",
        severity: "bad",
        hint: "Site sahibinin veya ekipten birinin kişisel adı yazılmaz; yalnızca roller.",
        matches,
      });
    }
  }

  for (const rule of RULES) {
    const matches = runPatterns(text, norm, rule.patterns, rule.skip);
    if (matches.length) {
      hits.push({
        id: rule.id,
        label: rule.label,
        severity: rule.severity,
        hint: rule.hint,
        matches,
      });
    }
  }
  return hits;
}

/** Every rule id {@link scanCompliance} can emit — for "all clear" rows in the UI. */
export const COMPLIANCE_RULES: { id: string; label: string }[] = RULES.map((r) => ({
  id: r.id,
  label: r.label,
}));

export type CitationIssue = { label: string; detail: string; severity: ComplianceSeverity };

/**
 * Citation sanity: Annex A numbers must exist in ISO/IEC 27001:2022 (A.5.1–
 * A.8.34 — anything like "A.12.6.1" is 2013 numbering), KVKK article numbers
 * must be 1–33, and a post that talks about ISO 27001 should name the 2022
 * edition at least once.
 */
export function checkCitations(markdown: string): CitationIssue[] {
  const norm = normalizeForScan(markdown);
  const issues: CitationIssue[] = [];

  const badAnnex = new Set<string>();
  const annexPatterns = [
    /\ba\.(\d{1,2})\.(\d{1,2})\b/g,
    /\bek[- ]?a['’]?\S*\s+(?:kontrol\S*\s+)?(\d{1,2})\.(\d{1,2})\b/g,
    /\bannex\s+a\s*\.?\s*(\d{1,2})\.(\d{1,2})\b/g,
  ];
  for (const re of annexPatterns) {
    for (const m of norm.matchAll(re)) {
      const theme = Number(m[1]);
      const n = Number(m[2]);
      if (!isValidAnnexA(theme, n)) badAnnex.add(`A.${theme}.${n}`);
    }
  }
  if (badAnnex.size) {
    issues.push({
      severity: "bad",
      label: "Geçersiz Ek-A kontrol numarası",
      detail: `${[...badAnnex].slice(0, 5).join(", ")} — ISO/IEC 27001:2022 Ek-A yalnızca A.5.1–A.5.37, A.6.1–A.6.8, A.7.1–A.7.14, A.8.1–A.8.34 içerir (A.9–A.18 eski 2013 numaralandırmasıdır).`,
    });
  }

  const badKvkk = new Set<number>();
  const kvkkPatterns = [
    /\b(?:kvkk|6698\s+sayili\s+(?:kanun|kişisel\s+verilerin\s+korunmasi\s+kanunu))['’]?\S*\s+(\d{1,3})\.?\s*madde/g,
    /\bkvkk['’]?\S*\s+(?:madde|m\.)\s*(\d{1,3})\b/g,
  ];
  for (const re of kvkkPatterns) {
    for (const m of norm.matchAll(re)) {
      const n = Number(m[1]);
      if (n < 1 || n > KVKK_ARTICLE_COUNT) badKvkk.add(n);
    }
  }
  if (badKvkk.size) {
    issues.push({
      severity: "bad",
      label: "Geçersiz KVKK madde numarası",
      detail: `Madde ${[...badKvkk].join(", ")} — 6698 sayılı Kanun ${KVKK_ARTICLE_COUNT} maddedir.`,
    });
  }

  if (/27001\s*:\s*2013/.test(norm)) {
    issues.push({
      severity: "warn",
      label: "ISO/IEC 27001:2013 anılıyor",
      detail: "Geçiş süreci 31 Ekim 2025'te bitti; güncel gereklilik için 2022 sürümüne atıf yap (tarihsel karşılaştırma değilse).",
    });
  }
  if (/27001/.test(norm) && !/27001\s*:\s*2022|2022\s+sürüm/.test(norm)) {
    issues.push({
      severity: "warn",
      label: "Standart sürümü belirtilmemiş",
      detail: "ISO 27001'den bahsediliyor ama 'ISO/IEC 27001:2022' hiç geçmiyor — en az bir kez tam sürümüyle an.",
    });
  }
  return issues;
}
