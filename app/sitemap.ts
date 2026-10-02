import type { MetadataRoute } from "next";
import type { Page } from "@/lib/db/schema";
import { getPublishedPages, getAllTags, pageHref, postLikePages, tagSlug } from "@/lib/pages";
import { absoluteUrl } from "@/lib/siteView";
import { pageDates } from "@/lib/structuredData";

// Same URL set as the static site's sitemap.xml (home, /iletisim/, /blog/ +
// its /blog/sayfa-N/ pages, every content page) plus the Next-only
// /blog/etiket/<tag>/ archives. Trailing slashes everywhere, like every URL
// Google has indexed. noindex rows are left out.

// The admin save/delete actions revalidate every public route (including this
// one) on the spot. This interval only matters for scheduled posts, which go
// live without a save — keep it short so they reach the sitemap quickly.
export const revalidate = 600;

const PER_PAGE = 9;

// /iletisim/ is a hand-written route with no DB row; bump this when its
// content changes. (Using "now" made the value change on every regeneration,
// which teaches crawlers to ignore lastmod.)
const CONTACT_LASTMOD = new Date("2026-09-25T00:00:00Z");

const modified = (p: Page) => pageDates(p).modified;

function newestOf(items: Page[], fallback: Date): Date {
  return items.reduce((max, p) => (modified(p) > max ? modified(p) : max), items.length ? modified(items[0]) : fallback);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows = await getPublishedPages();
  const all = rows.filter((p) => !p.noindex);
  const posts = postLikePages(all);
  // Listings change whenever any post is added or edited.
  const newest = newestOf(all, CONTACT_LASTMOD);
  const newestPost = newestOf(posts, newest);

  const entry = (path: string, lastModified: Date) => ({
    url: absoluteUrl(path),
    lastModified,
  });

  // /blog/ paginates every post, noindex ones included (components/site/BlogIndex.tsx).
  const blogPages = Math.max(1, Math.ceil(postLikePages(rows).length / PER_PAGE));
  return [
    entry("/", newest),
    entry("/iletisim/", CONTACT_LASTMOD),
    entry("/blog/", newestPost),
    ...Array.from({ length: blogPages - 1 }, (_, i) => entry(`/blog/sayfa-${i + 2}/`, newestPost)),
    ...all.map((p) => entry(pageHref(p), modified(p))),
    ...getAllTags(posts).map((t) =>
      entry(`/blog/etiket/${t.slug}/`, newestOf(posts.filter((p) => p.tags.some((x) => tagSlug(x) === t.slug)), newestPost)),
    ),
  ];
}
