// Loads the imported WordPress content (lib/data/fallback-pages.json, written
// by scripts/import-wordpress.mjs) into the `pages` table, preserving every
// slug exactly (SEO-indexed URLs must not move).
//
// Usage:  node scripts/migrate-legacy-content.mjs [--dry-run] [--update]
//   --dry-run  print a summary + sample row, write nothing
//   --update   also overwrite rows that already exist (default: skip them, so
//              edits made in the admin panel are never clobbered)
//
// Requires DATABASE_URL in .env.local.

import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });
config({ path: ".env" });

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes("--dry-run");
const UPDATE = process.argv.includes("--update");

// Inline schema (mirrors lib/db/schema.ts) — kept dependency-free from the
// TS app code so this plain .mjs script needs no build step to run.
const pages = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  kind: text("kind").notNull().default("page"),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  ogImageUrl: text("og_image_url"),
  authorName: text("author_name"),
  tags: text("tags").array().notNull().default([]),
  noindex: boolean("noindex").notNull().default(false),
  slugHistory: text("slug_history").array().notNull().default([]),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

function buildRows() {
  const raw = JSON.parse(readFileSync(join(__dirname, "..", "lib", "data", "fallback-pages.json"), "utf8"));
  return raw.map((r) => ({
    ...r,
    publishedAt: new Date(r.publishedAt),
    createdAt: new Date(r.publishedAt),
    updatedAt: new Date(r.updatedAt),
  }));
}

async function main() {
  const rows = buildRows();
  const posts = rows.filter((r) => r.kind === "blog").length;
  console.log(`Prepared ${rows.length} rows (${posts} posts, ${rows.length - posts} pages).`);

  if (DRY_RUN) {
    console.log("--dry-run: not writing to the database. Sample row:");
    const sample = rows.find((r) => r.slug === "hakkimizda") ?? rows[0];
    console.log(JSON.stringify({ ...sample, content: sample.content.slice(0, 400) + "…" }, null, 2));
    return;
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set (.env.local) — nothing to migrate into yet.");
    process.exit(1);
  }

  const db = drizzle(neon(process.env.DATABASE_URL));
  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  for (const row of rows) {
    const existing = await db.select({ id: pages.id }).from(pages).where(eq(pages.slug, row.slug));
    if (existing.length === 0) {
      await db.insert(pages).values(row);
      inserted++;
    } else if (UPDATE) {
      await db.update(pages).set(row).where(eq(pages.slug, row.slug));
      updated++;
    } else {
      skipped++;
    }
  }
  console.log(`Done. Inserted ${inserted}, updated ${updated}, skipped ${skipped}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
