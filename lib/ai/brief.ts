// The editorial brief for one daily article — the fields of a content-calendar
// row (see /admin/konu-kuyrugu/ and gece-ekibi/taslaklar/icerik-takvimi-90-gun.csv)
// beyond topic + keywords. Pure; shared by the client form and the server.

export type ContentBrief = {
  /** Arama niyeti: "Bilgi", "Bilgi→Ticari", "Ticari"… */
  intent?: string;
  /** Konu kümesi, e.g. "Yedekleme > Felaket Kurtarma (PILLAR)". */
  cluster?: string;
  /** Planned slug (the calendar's "Onerilen slug"). */
  slug?: string;
  /** Internal pages the article must link to, as "/slug/" paths. */
  requiredLinks?: string[];
  /** Format note, e.g. "Pillar rehber, 93 satırlık tablo, SSS". */
  format?: string;
  /** Free editorial note, e.g. "Hukukçu kontrolü şart." */
  note?: string;
  /**
   * Bölge / sektör açısı, e.g. "Kocaeli OSB üretim firmaları". When set, the
   * examples, risks and evidence are written for that audience (never with
   * invented local clients or offices).
   */
  audience?: string;
};

export const WORD_COUNT_MIN = 1200;
export const WORD_COUNT_MAX = 4500;

function clean(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.replace(/\s+/g, " ").trim().slice(0, max);
  return s || undefined;
}

/** "/a/ | /b/, c" → ["/a/", "/b/", "/c/"] (max 8, deduped). */
export function parseLinkList(raw: string | string[] | undefined): string[] {
  const parts = Array.isArray(raw) ? raw : (raw ?? "").split(/[|,;\s]+/);
  const out: string[] = [];
  for (const p of parts) {
    const slug = p.trim().replace(/^https?:\/\/[^/]+/i, "").replace(/^\/+|\/+$/g, "");
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) continue;
    const href = `/${slug}/`;
    if (!out.includes(href)) out.push(href);
    if (out.length >= 8) break;
  }
  return out;
}

/** Normalise untrusted brief input (server action args, query string). */
export function sanitizeBrief(raw: Partial<Record<keyof ContentBrief, unknown>> | undefined): ContentBrief {
  if (!raw) return {};
  const slug = clean(raw.slug, 120)?.replace(/^\/+|\/+$/g, "");
  return {
    intent: clean(raw.intent, 60),
    cluster: clean(raw.cluster, 120),
    slug: slug && /^[a-z0-9-]+$/.test(slug) ? slug : undefined,
    requiredLinks: parseLinkList(
      Array.isArray(raw.requiredLinks) ? (raw.requiredLinks as string[]) : (raw.requiredLinks as string | undefined),
    ),
    format: clean(raw.format, 300),
    note: clean(raw.note, 400),
    audience: clean(raw.audience, 160),
  };
}

/** "3.000-4.500 kelime" → 3800 (midpoint, rounded to 100); undefined if absent. */
export function wordCountFromText(text: string | undefined): number | undefined {
  if (!text) return undefined;
  const m = /(\d[\d.]*)\s*[-–]\s*(\d[\d.]*)\s*kelime/i.exec(text);
  if (!m) return undefined;
  const a = Number(m[1].replace(/\./g, ""));
  const b = Number(m[2].replace(/\./g, ""));
  if (!a || !b) return undefined;
  return clampWordCount(Math.round((a + b) / 2 / 100) * 100);
}

export function clampWordCount(n: number | undefined, fallback = 1800): number {
  if (!n || !Number.isFinite(n)) return fallback;
  return Math.min(WORD_COUNT_MAX, Math.max(WORD_COUNT_MIN, Math.round(n / 100) * 100));
}
