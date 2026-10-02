import { pgTable, uuid, text, boolean, timestamp, index } from "drizzle-orm/pg-core";

/**
 * Every piece of site content — blog articles AND standalone/service/location
 * pages — lives in one table. `kind` picks the public route and whether it
 * shows up in `/blog` + tag archives; everything else (admin editor, AI
 * generation, SEO scoring) is identical for both, so one CMS model covers
 * both instead of duplicating near-identical schemas (see the migration plan
 * for why: this site has ~150 non-blog pages, too many to hand-code the way
 * the source project's small service-page set is hardcoded in TS).
 */
export const pages = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  kind: text("kind", { enum: ["blog", "page"] }).notNull().default("blog"),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url"),
  // --- SEO ---
  // `metaTitle` / `metaDescription` override the <title> and meta description
  // independently of the on-page <h1> (`title`) and the card blurb (`excerpt`).
  // Null = fall back to title / excerpt.
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  // Target query the page is optimised for — drives the editor's SEO checks.
  focusKeyword: text("focus_keyword"),
  // Social share image; null = fall back to coverImageUrl, then the site logo.
  ogImageUrl: text("og_image_url"),
  // Real byline for E-E-A-T (schema.org Person author). Null = Organization.
  authorName: text("author_name"),
  // Topic tags — power /blog/etiket/[tag] archives and "related posts".
  tags: text("tags").array().notNull().default([]),
  // Keep this page out of the index (thin/updating content) without unpublishing.
  noindex: boolean("noindex").notNull().default(false),
  // Previous slugs this page has lived at, so old URLs can 301 to the current one.
  slugHistory: text("slug_history").array().notNull().default([]),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  // Every public listing (home, /blog, tag archives, sitemap, llms.txt) reads
  // via `getPublishedPages()`, which filters on exactly these two columns
  // (WHERE published AND published_at <= now()) and sorts by published_at —
  // a plain, non-locking composite index, safe to add on a live table.
  index("pages_published_idx").on(table.published, table.publishedAt),
  index("pages_kind_idx").on(table.kind),
]);

export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;
