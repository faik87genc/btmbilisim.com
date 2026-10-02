// Brand assets from the source logo (scripts/brand/logo-source.jpg):
//   public/assets/img/logo-full.webp        header logo (white bg removed)
//   public/assets/img/logo-full-light.webp  footer logo (navy text -> white, for dark bg)
//   public/assets/img/logo.png              schema.org Organization logo
//   public/assets/img/og-default.jpg        default social share card (1200x630)
//   public/favicon.ico, icon-512.png, apple-touch-icon.png
//   lib/watermark/mark.ts                   "btmbilisim.com" watermark PNG
//
// Usage: node scripts/build-brand-assets.mjs

import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "scripts", "brand", "logo-source.jpg");
const IMG = join(ROOT, "public", "assets", "img");
const NAVY = { r: 13, g: 59, b: 110 };

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

/** Copy of the logo pixels with white turned transparent; `recolor` may rewrite each opaque pixel. */
function cutout(recolor) {
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i], g = out[i + 1], b = out[i + 2];
    const min = Math.min(r, g, b);
    // Distance from white drives alpha so anti-aliased edges stay smooth.
    const alpha = Math.max(0, Math.min(255, (236 - min) * 2.4));
    out[i + 3] = alpha;
    if (alpha && recolor) recolor(out, i);
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

// Blue-ish (text) pixels become white; orange mark stays.
const toLight = (px, i) => {
  if (px[i + 2] > px[i]) { px[i] = 255; px[i + 1] = 255; px[i + 2] = 255; }
};

const trimmed = async (s) => sharp(await s.png().toBuffer()).trim();

await (await trimmed(cutout())).resize({ height: 120 }).webp({ quality: 92 }).toFile(join(IMG, "logo-full.webp"));
await (await trimmed(cutout(toLight))).resize({ height: 120 }).webp({ quality: 92 }).toFile(join(IMG, "logo-full-light.webp"));
await (await trimmed(cutout())).resize({ width: 600 }).png().toFile(join(IMG, "logo.png"));

// Icon = the hexagon mark on the left (~ first 31% of the width).
const markOnly = await sharp(await cutout().png().toBuffer())
  .extract({ left: 0, top: 0, width: Math.round(width * 0.31), height })
  .png()
  .toBuffer();
const mark = await sharp(markOnly).trim().png().toBuffer();
const square = (size, pad, bg) =>
  sharp(mark)
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: bg })
    .flatten(bg.alpha === 0 ? false : { background: bg });

await square(512, 40, { r: 255, g: 255, b: 255, alpha: 0 }).png().toFile(join(ROOT, "public", "icon-512.png"));
await square(180, 18, { r: 255, g: 255, b: 255, alpha: 1 }).png().toFile(join(ROOT, "public", "apple-touch-icon.png"));

// favicon.ico: single 48x48 PNG-in-ICO entry.
const fav = await square(48, 2, { r: 255, g: 255, b: 255, alpha: 0 }).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(48, 6); header.writeUInt8(48, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(fav.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(join(ROOT, "public", "favicon.ico"), Buffer.concat([header, fav]));

// Default share card: logo centred on white with an orange/navy base bar.
const logoCard = await (await trimmed(cutout())).resize({ width: 820 }).png().toBuffer();
const bar = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#ffffff"/>
    <rect y="582" width="1200" height="48" fill="rgb(${NAVY.r},${NAVY.g},${NAVY.b})"/>
    <rect y="574" width="1200" height="8" fill="#E8812F"/>
    <text x="600" y="614" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">btmbilisim.com · Gebze / Kocaeli</text>
  </svg>`,
);
await sharp(bar)
  .composite([{ input: logoCard, gravity: "center", top: 150, left: 190 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(join(IMG, "og-default.jpg"));

// Watermark: white text with a soft dark shadow, opacity baked in.
const wmSvg = Buffer.from(
  `<svg width="560" height="80" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="s" x="-10%" y="-30%" width="120%" height="160%"><feDropShadow dx="0" dy="1.5" stdDeviation="2.5" flood-color="#000" flood-opacity="0.55"/></filter></defs>
    <text x="545" y="54" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="44" fill="#ffffff" fill-opacity="0.78" text-anchor="end" filter="url(#s)">btmbilisim.com</text>
  </svg>`,
);
const wm = await sharp(wmSvg).trim().png({ compressionLevel: 9 }).toBuffer();
writeFileSync(
  join(ROOT, "lib", "watermark", "mark.ts"),
  `// "btmbilisim.com" with a soft dark shadow, opacity baked in. Embedded so the\n` +
    `// watermark needs no file read at runtime. Regenerate: node scripts/build-brand-assets.mjs\n` +
    `export const WATERMARK_PNG_BASE64 =\n  "${wm.toString("base64")}";\n`,
);

console.log("brand assets written");
