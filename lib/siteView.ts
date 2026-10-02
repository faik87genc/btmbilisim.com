import type { Page } from "@/lib/db/schema";
import { site } from "@/lib/site";
import { extractHeadings, faqPairs } from "@/lib/markdownStructure";
import { pageHref, tagSlug } from "@/lib/pages";
import navData from "@/lib/data/nav.json";

// Presentation rules shared by the public routes. Each one mirrors the static
// site's build.py (_legacy-static-site/scripts/build.py) so the Next.js pages
// render the same titles, breadcrumbs, TOC and related-post lists as the
// static master did.

export type NavItem = { text: string; href: string; children?: NavItem[] };
export const nav = navData as NavItem[];

/** Blog-style article (post layout, listed under /blog) vs core page. */
export function isPost(p: Pick<Page, "kind" | "tags">): boolean {
  return p.kind === "blog" || p.tags.length > 0;
}

export function postTag(p: Pick<Page, "tags">): string {
  return p.tags[0] ?? "Bilişim";
}

/** build.py: titles longer than 46 chars skip the brand suffix. */
export function documentTitle(p: Pick<Page, "metaTitle" | "title">): string {
  const base = (p.metaTitle || p.title).trim();
  return base.length > 46 ? base : `${base}${site.titleSuffix}`;
}

export function absoluteUrl(path: string): string {
  return `${site.baseUrl}${path}`;
}

const MONTHS_TR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

export function formatDateTr(d: Date): string {
  return `${d.getDate()} ${MONTHS_TR[d.getMonth()]} ${d.getFullYear()}`;
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function readingTimeMinutes(markdown: string): number {
  const words = markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/^\|?[\s|:-]+\|?$/gm, " ")
    .replace(/(^|\s)([#>*_`|-]+|\d+\.)(?=\s)/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 180));
}

export type Crumb = { text: string; href?: string };

function findNavTrail(items: NavItem[], href: string, trail: NavItem[] = []): NavItem[] | null {
  for (const n of items) {
    const next = [...trail, n];
    if (n.href === href) return next;
    if (n.children) {
      const found = findNavTrail(n.children, href, next);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Breadcrumbs after "Anasayfa": tag → title for posts, menu path for pages.
 * The tag crumb points at that tag's archive (/blog/etiket/<tag>/) — the
 * static site had no tag archives so it used /blog/, which left every archive
 * without a single internal link. Untagged posts keep /blog/.
 */
export function breadcrumbsFor(p: Page): Crumb[] {
  if (isPost(p)) {
    const slug = p.tags.length > 0 ? tagSlug(p.tags[0]) : "";
    const href = slug ? `/blog/etiket/${slug}/` : "/blog/";
    return [{ text: postTag(p), href }, { text: p.title }];
  }
  const trail = findNavTrail(nav, pageHref(p)) ?? [];
  return [...trail.slice(0, -1).map((t) => ({ text: t.text, href: t.href })), { text: p.title }];
}

export type TocEntry = { id: string; text: string; children: { id: string; text: string }[] };

/** Numbered H2 sections with nested H3s; only for posts with ≥3 entries. */
export function buildNestedToc(markdown: string): TocEntry[] {
  const toc: TocEntry[] = [];
  for (const h of extractHeadings(markdown)) {
    if (h.level === 2) toc.push({ id: h.id, text: h.text, children: [] });
    else if (h.level === 3 && toc.length) toc[toc.length - 1].children.push({ id: h.id, text: h.text });
  }
  const count = toc.reduce((n, t) => n + 1 + t.children.length, 0);
  return count >= 3 ? toc : [];
}

/** Split body at its first H2 so the TOC box can sit right above it. */
export function splitAtFirstH2(markdown: string): [string, string] {
  const m = /^## /m.exec(markdown);
  if (!m) return [markdown, ""];
  return [markdown.slice(0, m.index), markdown.slice(m.index)];
}

/** build.py's FAQ extraction — moved to the pure markdownStructure module so
 * the admin SEO checker (client side) counts exactly what the FAQPage JSON-LD
 * will contain. Re-exported for existing imports. */
export { faqPairs };

// Big near-duplicate city clusters: build.py never interlinks them by tag
// (it would reinforce a thin-content signal), it falls back to recent posts.
const NON_CLUSTERING_TAGS = new Set(["Gebze", "İstanbul"]);

/**
 * build.py's related-posts pool (same primary tag when it has ≥3 other posts,
 * else everything; city clusters are never linked to), over posts sorted
 * newest first.
 *
 * Which posts of the pool get picked differs from build.py: it always took the
 * pool's 3 newest, so every post pointed at the same few recent articles and
 * most older ones received no contextual link at all. Instead, a post in the
 * pool links to its chronological neighbours (next newer, next older, ...).
 * Every post then gets inbound links from the posts around it, and a freshly
 * published post is linked from the two posts published just before it in its
 * tag — a crawl path to it as soon as those pages revalidate.
 */
export function relatedPosts(posts: Page[], current: Page, limit = 3): Page[] {
  const tag = postTag(current);
  let pool = posts;
  if (!NON_CLUSTERING_TAGS.has(tag)) {
    const sameTag = posts.filter((o) => postTag(o) === tag && o.slug !== current.slug);
    if (sameTag.length >= 3) pool = posts.filter((o) => postTag(o) === tag);
  }
  pool = pool.filter((o) => o.slug === current.slug || !NON_CLUSTERING_TAGS.has(postTag(o)));

  const at = pool.findIndex((o) => o.slug === current.slug);
  if (at === -1) return pool.slice(0, limit);

  const picked: Page[] = [];
  for (let d = 1; picked.length < limit && (at - d >= 0 || at + d < pool.length); d++) {
    if (at - d >= 0) picked.push(pool[at - d]);
    if (picked.length < limit && at + d < pool.length) picked.push(pool[at + d]);
  }
  return picked;
}
