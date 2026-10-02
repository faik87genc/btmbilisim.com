import type { Page } from "@/lib/db/schema";
import rows from "@/lib/data/fallback-pages.json";

// Read-only copy of the static site's content (the same rows the migration
// script inserts; regenerate with `node scripts/migrate-legacy-content.mjs
// --fallback`). Served ONLY when the database can't be reached — before Neon
// is configured, or during an outage — so the public site never goes blank.
// Once the DB is up, the DB is the single source of truth.

type Row = (typeof rows)[number];

function toPage(r: Row): Page {
  const publishedAt = new Date(r.publishedAt);
  return {
    id: `fallback-${r.slug}`,
    kind: r.kind as Page["kind"],
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    coverImageUrl: r.coverImageUrl ?? null,
    metaTitle: r.metaTitle ?? null,
    metaDescription: r.metaDescription ?? null,
    focusKeyword: null,
    ogImageUrl: null,
    authorName: null,
    tags: r.tags,
    noindex: false,
    slugHistory: [],
    published: true,
    publishedAt,
    createdAt: publishedAt,
    updatedAt: new Date(r.updatedAt),
  };
}

let cached: Page[] | null = null;

/** Every fallback page, newest first (same order as the DB query). */
export function fallbackPages(): Page[] {
  cached ??= rows.map(toPage).sort((a, b) => b.publishedAt!.getTime() - a.publishedAt!.getTime());
  return cached;
}
