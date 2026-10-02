import manifest from "@/lib/data/image-variants.json";

// Responsive image data for files under /assets/img. The manifest is written by
// `_legacy-static-site/scripts/image_variants.py`, which also generates the
// `<name>-640w.webp` / `<name>-960w.webp` files next to each original.
// Admin uploads on Vercel Blob (often 1-2 MB PNGs) are not in the manifest:
// they are served through the Next.js image optimizer (/_next/image, allowed
// by images.remotePatterns in next.config.ts), which resizes them and returns
// AVIF/WebP. Any other URL is left as is.

type Entry = [width: number, height: number, variantWidths: number[]];
const MANIFEST = manifest as unknown as Record<string, Entry>;

// `sizes` hints matching the stylesheet's layout (.wrap = 1120px max, 24px gutters).
export const IMG_SIZES = {
  // .post-hero-img: 2.1fr column of .post-layout; full width below 980px.
  cover: "(max-width: 980px) calc(100vw - 48px), 712px",
  // .post-card in .grid-3: 3 cols, 2 cols ≤980px, 1 col ≤760px.
  card: "(max-width: 760px) calc(100vw - 48px), (max-width: 980px) calc(50vw - 35px), 344px",
  // .entry-content images: capped at the 820px content column.
  content: "(max-width: 868px) calc(100vw - 48px), 820px",
} as const;

/**
 * `src` replaces the original URL when set (optimizer copy); width/height are
 * only known for manifest files.
 */
export type ImageInfo = { src?: string; width?: number; height?: number; srcSet?: string };

const BLOB_URL = /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i;
// Must be members of images.deviceSizes/imageSizes (Next defaults) and
// images.qualities in next.config.ts.
const OPTIMIZER_WIDTHS = [384, 640, 828, 1200];
const OPTIMIZER_QUALITY = 75;

function optimizerUrl(src: string, w: number): string {
  // Trailing slash: with trailingSlash on, Next serves the optimizer at
  // /_next/image/ (the slash-less path answers with a 308 redirect).
  return `/_next/image/?url=${encodeURIComponent(src)}&w=${w}&q=${OPTIMIZER_QUALITY}`;
}

export function imageInfo(src: string | null | undefined): ImageInfo | null {
  if (!src) return null;
  if (BLOB_URL.test(src)) {
    return {
      src: optimizerUrl(src, OPTIMIZER_WIDTHS[OPTIMIZER_WIDTHS.length - 1]),
      srcSet: OPTIMIZER_WIDTHS.map((w) => `${optimizerUrl(src, w)} ${w}w`).join(", "),
    };
  }
  const entry = MANIFEST[src];
  if (!entry) return null;
  const [width, height, variants] = entry;
  if (!variants.length) return { width, height };
  const base = src.replace(/\.[a-z0-9]+$/i, "");
  const srcSet = [...variants.map((w) => `${base}-${w}w.webp ${w}w`), `${src} ${width}w`].join(", ");
  return { width, height, srcSet };
}
