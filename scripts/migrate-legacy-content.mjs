// Content migration: loads the static site's FINAL page data into the
// `pages` table, preserving every slug exactly (SEO-indexed URLs must not move).
//
// Input is scripts/data/legacy-pages.json, produced from the static site's own
// build.py by `python scripts/export-legacy-data.py` — so it already includes
// build.py's cleanups and every curated override (Hakkımızda, KVKK, Pentest,
// ISO Danışmanlık, sector pages, ...), not just the raw WordPress scrape.
//
// Usage:  node scripts/migrate-legacy-content.mjs [--dry-run] [--update] [--fallback]
//   --dry-run  print a summary + sample row, write nothing
//   --fallback write the rows to lib/data/fallback-pages.json (served when the
//              DB is unreachable) instead of touching the database
//   --update   also overwrite rows that already exist (default: skip them, so
//              edits made in the admin panel are never clobbered)
//
// Requires DATABASE_URL in .env.local.

import { config } from "dotenv";
import { readFileSync, writeFileSync } from "node:fs";
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
const FALLBACK = process.argv.includes("--fallback");

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

const TITLE_SUFFIX = " | ISO 27001 Danışmanlık";
const legacyPages = JSON.parse(
  readFileSync(join(__dirname, "data", "legacy-pages.json"), "utf8"),
);

// --- block model -> Markdown ------------------------------------------------

// Absolute links to this site (with/without www, even the old .com.tr typo)
// become relative, trailing-slash paths — same as build.py's linkify_internal.
const INTERNAL_URL_RE = /https?:\/\/(?:www\.)?iso27001danismanlik\.com(?:\.tr)?(\/[a-zA-Z0-9\-/]*)?/g;
function internalPath(path) {
  const p = path || "/";
  return p.endsWith("/") ? p : `${p}/`;
}

/** Plain text: escape what Markdown would misread, then linkify internal URLs. */
function mdText(text) {
  const escaped = String(text)
    .trim()
    .replace(/^(#{1,6}\s|>|[-+*]\s|\d+[.)]\s)/, "\\$1");
  return escaped.replace(INTERNAL_URL_RE, (full, path) => `[${full}](${internalPath(path)})`);
}

/** Hand-authored HTML paragraphs only use <a> and <strong>. */
function htmlToMd(html) {
  return html
    .replace(/<strong>([\s\S]*?)<\/strong>/g, "**$1**")
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, label) => {
      const m = href.match(/^https?:\/\/(?:www\.)?iso27001danismanlik\.com(?:\.tr)?(\/[^"]*)?$/);
      return `[${label}](${m ? internalPath(m[1]) : href})`;
    })
    .replace(/<[^>]+>/g, "")
    .trim();
}

function cell(s) {
  return String(s).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function blocksToMarkdown(blocks) {
  const out = [];
  for (const b of blocks) {
    switch (b.type) {
      case "h2":
      case "h3":
      case "h4":
      case "h5":
        out.push(`${"#".repeat(Number(b.type[1]))} ${b.text.trim()}`);
        break;
      case "p":
        if (b.text?.trim()) out.push(mdText(b.text));
        break;
      case "p_html":
        out.push(htmlToMd(b.html));
        break;
      case "ul":
        out.push(b.items.map((i) => `- ${mdText(i)}`).join("\n"));
        break;
      case "ol":
        out.push(b.items.map((i, n) => `${n + 1}. ${mdText(i)}`).join("\n"));
        break;
      case "blockquote":
        out.push(`> ${mdText(b.text)}`);
        break;
      case "img":
        out.push(`![${(b.alt || "").replace(/[[\]]/g, "")}](${b.src})`);
        break;
      case "table": {
        const [head, ...rows] = b.rows;
        if (!head) break;
        out.push(
          [
            `| ${head.map(cell).join(" | ")} |`,
            `| ${head.map(() => "---").join(" | ")} |`,
            ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`),
          ].join("\n"),
        );
        break;
      }
      default:
        break; // h1 is the row title; body never repeats it
    }
  }
  return out.join("\n\n").trim();
}

/** Stored metaTitle is the part BEFORE the brand suffix (the route re-adds it). */
function baseMetaTitle(metaTitle) {
  return metaTitle.endsWith(TITLE_SUFFIX) ? metaTitle.slice(0, -TITLE_SUFFIX.length) : metaTitle;
}

function toDate(iso) {
  return iso ? new Date(`${iso}T09:00:00+03:00`) : null;
}

function buildRows() {
  return legacyPages.map((p) => {
    const published = toDate(p.publishedIso) ?? toDate(p.modifiedIso) ?? new Date();
    return {
      kind: "page",
      slug: p.slug,
      title: p.h1,
      excerpt: p.excerpt || p.metaDescription || p.h1,
      content: blocksToMarkdown(p.blocks),
      coverImageUrl: p.heroImg,
      metaTitle: baseMetaTitle(p.metaTitle),
      metaDescription: p.metaDescription,
      // A tag marks a row as a blog-style article (post layout, /blog listing).
      tags: p.isPost && p.tag ? [p.tag] : [],
      published: true,
      publishedAt: published,
      updatedAt: toDate(p.modifiedIso) ?? published,
    };
  });
}

async function main() {
  const rows = buildRows();
  const posts = rows.filter((r) => r.tags.length > 0).length;
  console.log(`Prepared ${rows.length} rows (${posts} articles, ${rows.length - posts} core pages).`);

  if (FALLBACK) {
    // Same rows, as the site's read-only fallback for when the DB is unreachable.
    const out = join(__dirname, "..", "lib", "data", "fallback-pages.json");
    writeFileSync(out, JSON.stringify(rows) + "\n");
    console.log(`Wrote ${out}`);
    return;
  }

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
