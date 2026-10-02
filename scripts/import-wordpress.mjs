// One-shot import of the old WordPress site (www.btmbilisim.com) into this
// codebase. Every slug is kept exactly, so indexed URLs keep working.
//
//   node scripts/import-wordpress.mjs [--fetch]
//
//   --fetch   refresh the raw dump in scripts/data/wp/ from the live WP REST API
//             (otherwise the committed dump is used — it is the archive once
//             the WordPress site is shut down)
//
// Writes:
//   lib/data/fallback-pages.json      rows in the `pages` table shape (served
//                                     when no DB is configured; loaded into the
//                                     DB by scripts/migrate-legacy-content.mjs)
//   public/wp-content/uploads/...     every referenced image, same path as on WP
//                                     (+ -640w/-960w.webp variants)
//   lib/data/image-variants.json      responsive-image manifest (lib/imageVariants.ts)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import TurndownService from "turndown";
import turndownGfm from "turndown-plugin-gfm";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DUMP = path.join(ROOT, "scripts", "data", "wp");
const PUBLIC = path.join(ROOT, "public");
const ORIGIN = "https://www.btmbilisim.com";

// WP pages that are replaced by coded routes (home = app/(site)/page.tsx,
// blog = app/(site)/blog, iletisim = app/(site)/iletisim) — their URLs already exist.
const SKIP_PAGES = new Set(["anasayfa", "blog", "iletisim"]);

// --- 1. raw dump --------------------------------------------------------------

async function fetchAll(type) {
  const rows = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${ORIGIN}/wp-json/wp/v2/${type}?per_page=100&page=${page}`);
    if (!res.ok) break;
    rows.push(...(await res.json()));
    if (page >= Number(res.headers.get("x-wp-totalpages") || 1)) break;
  }
  return rows;
}

/** Keep only the fields the import uses — the full REST payload is ~7 MB of noise. */
const SLIM = {
  pages: (p) => ({ id: p.id, slug: p.slug, status: p.status, date_gmt: p.date_gmt, modified_gmt: p.modified_gmt, title: p.title, content: p.content, excerpt: p.excerpt, featured_media: p.featured_media, yoast: pickYoast(p.yoast_head_json) }),
  posts: (p) => ({ id: p.id, slug: p.slug, status: p.status, date_gmt: p.date_gmt, modified_gmt: p.modified_gmt, title: p.title, content: p.content, excerpt: p.excerpt, featured_media: p.featured_media, categories: p.categories, tags: p.tags, yoast: pickYoast(p.yoast_head_json) }),
  categories: (c) => ({ id: c.id, slug: c.slug, name: c.name }),
  tags: (t) => ({ id: t.id, slug: t.slug, name: t.name }),
  media: (m) => ({ id: m.id, source_url: m.source_url, alt_text: m.alt_text }),
};
function pickYoast(y) {
  if (!y) return null;
  return { title: y.title, description: y.description, og_description: y.og_description, og_image: y.og_image?.[0]?.url ?? null };
}

if (process.argv.includes("--fetch")) {
  fs.mkdirSync(DUMP, { recursive: true });
  for (const type of Object.keys(SLIM)) {
    const rows = (await fetchAll(type)).map(SLIM[type]);
    fs.writeFileSync(path.join(DUMP, `${type}.json`), JSON.stringify(rows));
    console.log(`fetched ${type}: ${rows.length}`);
  }
}

const read = (f) => JSON.parse(fs.readFileSync(path.join(DUMP, f), "utf8"));
const wpPages = read("pages.json");
const wpPosts = read("posts.json");
const cats = new Map(read("categories.json").map((c) => [c.id, c]));
const tags = new Map(read("tags.json").map((t) => [t.id, t]));
const media = new Map(read("media.json").map((m) => [m.id, m]));

// --- 2. HTML -> Markdown --------------------------------------------------------

const BRAND_SUFFIX_RE = /\s*[|–-]\s*BTM Bili[şs]im.*$/i;
const images = new Set();

const decode = (s) =>
  String(s ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();

/** Absolute btmbilisim.com URL -> site-relative path. Uploads keep their /wp-content path. */
function localize(url) {
  if (!url) return url;
  const m = url.match(/^(?:https?:)?\/\/(?:www\.)?btmbilisim\.com(\/[^\s"')]*)?$/i);
  if (!m) return url;
  let p = m[1] || "/";
  if (p.startsWith("/wp-content/uploads/")) {
    p = p.split("?")[0];
    images.add(p);
    return p;
  }
  if (p.startsWith("tel:") || p.startsWith("mailto:")) return p;
  if (!p.includes("?") && !p.includes("#") && !/\.\w{2,4}$/.test(p) && !p.endsWith("/")) p += "/";
  return p;
}

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
td.use(turndownGfm.gfm);
td.remove(["script", "style", "noscript", "svg", "form", "iframe", "button", "input", "select", "textarea"]);
td.addRule("icons", {
  filter: (n) => n.nodeName === "I" && /\b(fa|eicon|uicore|icon)/.test(n.getAttribute("class") || ""),
  replacement: () => "",
});
td.addRule("img", {
  filter: "img",
  replacement: (_, n) => {
    const src = n.getAttribute("data-src") || n.getAttribute("src") || "";
    if (!src || src.startsWith("data:")) return "";
    const alt = (n.getAttribute("alt") || "").replace(/[[\]]/g, "");
    return `\n\n![${alt}](${localize(src)})\n\n`;
  },
});
td.addRule("links", {
  filter: (n) => n.nodeName === "A" && n.getAttribute("href"),
  replacement: (content, n) => {
    const text = content.trim();
    if (!text) return "";
    let href = n.getAttribute("href").replace(/^tel:\/\//, "tel:");
    href = localize(href);
    if (href === "#" || href.startsWith("javascript:")) return text;
    return `[${text}](${href})`;
  },
});

/** Elementor widget leftovers that carry no content. */
function isNoise(block) {
  const t = block.trim();
  if (/^\d{1,4}\+?$/.test(t)) return true; // counter widget numbers
  if (/^[A-ZÇĞİÖŞÜa-zçğıöşü ]{2,30}$/.test(t) && !/[.!?:]/.test(t) && t.split(" ").length <= 3 && !t.startsWith("#")) {
    // Short orphan labels next to counters ("Ağ Projesi") — keep real one-word links/headings.
    return true;
  }
  if (/3D FX Kartlar/i.test(t)) return true;
  return false;
}

function htmlToMd(html, title) {
  let md = td
    .turndown(html)
    .replace(/ /g, " ")
    .replace(/^[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const blocks = [];
  const seenHeadings = new Set();
  for (const raw of md.split(/\n{2,}/)) {
    let block = raw.trim();
    if (!block || isNoise(block)) continue;
    // The layout renders the H1; demote any H1 in the body.
    block = block.replace(/^#\s+/, "## ");
    const h = block.match(/^#{2,6}\s+(.+)$/);
    if (h) {
      const text = decode(h[1]);
      // Elementor pages repeat their title as a heading in every section.
      if (text === title && seenHeadings.has(text)) continue;
      if (seenHeadings.has(text) && blocks[blocks.length - 1]?.startsWith("#")) continue;
      seenHeadings.add(text);
    }
    if (blocks[blocks.length - 1] === block) continue; // mobile+desktop duplicates
    blocks.push(block);
  }
  // Drop headings left with no body before the next heading of the same/higher level.
  const out = blocks.filter((b, i) => {
    const m = b.match(/^(#{2,6})\s/);
    if (!m) return true;
    const next = blocks[i + 1];
    if (!next) return false;
    const n = next.match(/^(#{2,6})\s/);
    return !n || n[1].length > m[1].length;
  });
  return out.join("\n\n");
}

function cover(item) {
  const url = media.get(item.featured_media)?.source_url || item.yoast?.og_image || null;
  return url ? localize(url) : null;
}

function seo(item, title) {
  const y = item.yoast || {};
  let metaTitle = decode(y.title).replace(BRAND_SUFFIX_RE, "").trim() || null;
  if (metaTitle === title) metaTitle = null;
  const metaDescription = decode(y.description || y.og_description).replace(/-Anasayfa$/, "") || null;
  return { metaTitle, metaDescription };
}

const rows = [];
for (const p of wpPages) {
  if (p.status !== "publish" || SKIP_PAGES.has(p.slug)) continue;
  const title = decode(p.title.rendered);
  const s = seo(p, title);
  rows.push({
    kind: "page",
    slug: p.slug,
    title,
    excerpt: s.metaDescription || decode(p.excerpt?.rendered) || title,
    content: htmlToMd(p.content.rendered, title),
    coverImageUrl: cover(p),
    ...s,
    tags: [],
    published: true,
    publishedAt: `${p.date_gmt}Z`,
    updatedAt: `${p.modified_gmt}Z`,
  });
}
for (const p of wpPosts) {
  if (p.status !== "publish") continue;
  const title = decode(p.title.rendered);
  const s = seo(p, title);
  const tagNames = [
    ...p.categories.map((id) => cats.get(id)).filter((c) => c && !["genel", "uncategorized"].includes(c.slug)),
    ...p.tags.map((id) => tags.get(id)).filter(Boolean),
  ].map((t) => decode(t.name));
  rows.push({
    kind: "blog",
    slug: p.slug,
    title,
    excerpt: s.metaDescription || decode(p.excerpt.rendered).replace(/\s*\[…\]$/, "") || title,
    content: htmlToMd(p.content.rendered, title),
    coverImageUrl: cover(p),
    ...s,
    tags: [...new Set(tagNames.length ? tagNames : ["Genel"])].slice(0, 8),
    published: true,
    publishedAt: `${p.date_gmt}Z`,
    updatedAt: `${p.modified_gmt}Z`,
  });
}

// Pages the WP site never had (legal texts), written for the new site.
rows.push(...JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "data", "extra-pages.json"), "utf8")));

fs.writeFileSync(path.join(ROOT, "lib", "data", "fallback-pages.json"), JSON.stringify(rows) + "\n");
console.log(`rows: ${rows.length} (${rows.filter((r) => r.kind === "page").length} pages, ${rows.filter((r) => r.kind === "blog").length} posts)`);

// --- 3. images ------------------------------------------------------------------

const VARIANT_WIDTHS = [640, 960];
const manifestPath = path.join(ROOT, "lib", "data", "image-variants.json");
const manifest = {};
let downloaded = 0;
const failed = [];

async function handle(p) {
  const dest = path.join(PUBLIC, decodeURIComponent(p));
  if (!fs.existsSync(dest)) {
    const res = await fetch(ORIGIN + p).catch(() => null);
    if (!res?.ok) { failed.push(p); return; }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    downloaded++;
  }
  try {
    const meta = await sharp(dest).metadata();
    if (!meta.width || !meta.height || meta.format === "svg") return;
    const base = dest.replace(/\.[a-z0-9]+$/i, "");
    const widths = VARIANT_WIDTHS.filter((w) => w < meta.width * 0.9);
    for (const w of widths) {
      const out = `${base}-${w}w.webp`;
      if (!fs.existsSync(out)) await sharp(dest).resize({ width: w }).webp({ quality: 78 }).toFile(out);
    }
    manifest[p] = [meta.width, meta.height, widths];
  } catch {
    // Unreadable file: served as is, no manifest entry.
  }
}

const queue = [...images].sort();
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await handle(queue.shift()); }));
fs.writeFileSync(manifestPath, JSON.stringify(manifest) + "\n");
console.log(`images: ${images.size} referenced, ${downloaded} downloaded, ${Object.keys(manifest).length} in manifest`);
if (failed.length) console.log("failed:", failed.join("\n  "));
