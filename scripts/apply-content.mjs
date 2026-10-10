// Writes reviewed page rewrites (docs/icerik/<slug>.json) over the matching
// rows in the `pages` table: title, meta, excerpt, focus keyword, tags and
// body. Cover images, slug and publish state are left untouched.
//
// Usage:  node scripts/apply-content.mjs [--dry-run] [slug ...]
//   no slugs   apply every docs/icerik/*.json
//   --dry-run  print what would change, write nothing
//
// Requires DATABASE_URL in .env.local.

import { config } from "dotenv";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });
config({ path: ".env" });

const DIR = join(process.cwd(), "docs", "icerik");
const DRY_RUN = process.argv.includes("--dry-run");
const wanted = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const slugs = wanted.length
  ? wanted
  : readdirSync(DIR).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));

const sql = neon(process.env.DATABASE_URL);

for (const slug of slugs) {
  const d = JSON.parse(readFileSync(join(DIR, `${slug}.json`), "utf8"));
  const [row] = await sql`select slug, length(content) as len from pages where slug = ${slug}`;
  if (!row) {
    console.log(`SKIP  /${slug}/ — no such row`);
    continue;
  }
  if (DRY_RUN) {
    console.log(`DRY   /${slug}/ ${row.len} → ${d.content.length} chars · "${d.title}"`);
    continue;
  }
  await sql`update pages set title = ${d.title}, meta_title = ${d.metaTitle},
    meta_description = ${d.metaDescription}, excerpt = ${d.excerpt},
    focus_keyword = ${d.focusKeyword}, tags = ${d.tags}, content = ${d.content},
    updated_at = now() where slug = ${slug}`;
  console.log(`OK    /${slug}/ ${row.len} → ${d.content.length} chars`);
}
