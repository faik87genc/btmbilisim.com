import { and, desc, eq, lte } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages, type Page } from "@/lib/db/schema";
import { slugifyTr } from "@/lib/slug";
import { fallbackPages } from "@/lib/fallbackPages";
import { isRetiredSlug } from "@/lib/legacyRedirects";

// Generic/domain words that appear in almost every title on an IT services
// site — without stripping them, "related" scoring would
// match nearly everything to everything purely on shared boilerplate terms.
const RELATED_STOPWORDS = new Set([
  "ve", "ile", "icin", "nedir", "nasil", "bir", "bu", "ne", "kadar",
  "mi", "mu", "danismanlik", "danismanligi", "hizmeti", "hizmetleri",
  "cozumleri", "cozumu", "rehberi", "guncel", "sistemi", "kurulur",
  "yonetimi", "sistemleri", "sirketler", "isletmeler", "kurumlar", "kurumsal",
  "btm", "bilisim", "kocaeli", "gebze", "2025", "2026",
]);

function relatedTokens(text: string): Set<string> {
  return new Set(
    slugifyTr(text)
      .split("-")
      .filter((t) => t.length > 2 && !RELATED_STOPWORDS.has(t)),
  );
}

// --- Shared data access ---------------------------------------------------
// Every public surface (home, /blog, tag archives, sitemap, a page's own
// route) needs "published rows". Centralised here so the DB-unreachable
// behaviour stays identical everywhere: when the DB can't be reached, the
// static site's content (lib/fallbackPages.ts) is served instead.

/**
 * A row is "live" once it's marked published AND its `publishedAt` has
 * passed — this is what makes scheduled publishing work.
 */
export function isPageLive(p: Pick<Page, "published" | "publishedAt">): boolean {
  return p.published && !!p.publishedAt && p.publishedAt.getTime() <= Date.now();
}

async function queryPublishedPages(): Promise<Page[] | null> {
  try {
    return await db
      .select()
      .from(pages)
      .where(and(eq(pages.published, true), lte(pages.publishedAt, new Date())))
      .orderBy(desc(pages.publishedAt));
  } catch {
    return null;
  }
}

export async function getPublishedPages(): Promise<Page[]> {
  // One retry turns a rare transient DB blip (e.g. during the many-way
  // concurrent hits `generateStaticParams` triggers at build time) into a
  // non-event instead of silently baking an empty page list into a static
  // build — same pattern as the source project's `getPublishedPosts()`.
  let rows = await queryPublishedPages();
  if (rows === null) rows = await queryPublishedPages();
  // Still unreachable (or not configured yet): serve the static-site content.
  return rows ?? fallbackPages();
}

export async function getPublishedByKind(kind: Page["kind"]): Promise<Page[]> {
  const all = await getPublishedPages();
  return all.filter((p) => p.kind === kind);
}

/**
 * "Blog-style" content for the /blog listing and tag archives: every real
 * `kind: "blog"` row (new admin-authored posts, also served at /[slug]) PLUS
 * every migrated `kind: "page"` row that carries a tag (the ~120 long-tail
 * guide/location articles inherited from the old site — they keep their
 * original flat /[slug] URL, so a "core" page like /hakkimizda or /iletisim,
 * which has no tags, never shows up here). Untagged `kind: "page"` rows are
 * the small set of genuinely static/core pages.
 */
export function postLikePages(all: Page[]): Page[] {
  return all
    // Redirected (consolidated) rows never appear in listings or tag archives.
    .filter((p) => (p.kind === "blog" || p.tags.length > 0) && !isRetiredSlug(p.slug))
    .sort((a, b) => {
      const at = (a.publishedAt ?? a.createdAt).getTime();
      const bt = (b.publishedAt ?? b.createdAt).getTime();
      return bt - at;
    });
}

/**
 * The URL a page renders at: always the flat /[slug]/ (trailing slash, like
 * the static site), for admin-written posts too — every article on the site
 * lives at the root, so new ones match. Slugs are unique across kinds.
 * `kind` is kept in the signature so callers needn't change.
 */
export function pageHref(p: Pick<Page, "kind" | "slug">): string {
  return `/${p.slug}/`;
}

/** Look up a page by its current slug, or any slug it previously lived at. */
export function resolvePage(all: Page[], slug: string): Page | null {
  return (
    all.find((p) => p.slug === slug) ??
    all.find((p) => p.slugHistory.includes(slug)) ??
    null
  );
}

/** URL-safe form of a display tag, e.g. "Sızma Testi" -> "sizma-testi". */
export function tagSlug(tag: string): string {
  return slugifyTr(tag);
}

export type TagSummary = { tag: string; slug: string; count: number };

/** All tags across the given (blog) pages, most-used first. */
export function getAllTags(items: Page[]): TagSummary[] {
  const map = new Map<string, TagSummary>();
  for (const p of items) {
    for (const raw of p.tags) {
      const slug = tagSlug(raw);
      if (!slug) continue;
      const cur = map.get(slug);
      if (cur) cur.count++;
      else map.set(slug, { tag: raw, slug, count: 1 });
    }
  }
  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "tr"),
  );
}

export function getPagesByTagSlug(
  items: Page[],
  slug: string,
): { tag: string; pages: Page[] } {
  const matched = items.filter((p) => p.tags.some((t) => tagSlug(t) === slug));
  const tag = matched[0]?.tags.find((t) => tagSlug(t) === slug) ?? slug;
  return { tag, pages: matched };
}

/** Rows sharing the most tags with `current` (falls back to most recent others). */
export function getRelatedPages(
  items: Page[],
  current: Page,
  limit = 3,
): Page[] {
  const currentTags = new Set(current.tags.map(tagSlug));
  const currentTokens = relatedTokens([current.title, ...current.tags].join(" "));
  const scored = items
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      const tagOverlap = p.tags.reduce(
        (n, t) => n + (currentTags.has(tagSlug(t)) ? 1 : 0),
        0,
      );
      const tokenOverlap = [...relatedTokens([p.title, ...p.tags].join(" "))].filter(
        (t) => currentTokens.has(t),
      ).length;
      return { page: p, score: tagOverlap * 3 + tokenOverlap };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const at = (a.page.publishedAt ?? a.page.createdAt).getTime();
      const bt = (b.page.publishedAt ?? b.page.createdAt).getTime();
      return bt - at;
    });
  return scored.slice(0, limit).map((s) => s.page);
}
