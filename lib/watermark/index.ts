import "server-only";
import sharp from "sharp";
import { WATERMARK_PNG_BASE64 } from "./mark";

/**
 * Stamps "btmbilisim.com" into the bottom-right corner of every image
 * the admin stores (upload, import, AI generation), so a copied or
 * screenshotted picture still carries the source. Inset from the edge so it
 * can't be cropped off without cutting into the picture itself.
 *
 * Never blocks saving: anything sharp can't handle (or icons too small to
 * mark) goes through unchanged.
 */

const MARK = Buffer.from(WATERMARK_PNG_BASE64, "base64");

// Below this width the image is an icon/logo, not a photo worth marking.
const MIN_WIDTH = 480;
// Mark width as a share of the image width, clamped for tiny/huge images.
const MARK_SHARE = 0.3;
const MARK_MIN = 170;
const MARK_MAX = 560;
// Distance from the right/bottom edge, as a share of the image width.
const INSET_SHARE = 0.025;

export async function applyWatermark(bytes: Buffer, contentType: string): Promise<Buffer> {
  try {
    const img = sharp(bytes, { failOn: "none" }).rotate();
    const meta = await img.metadata();
    // Orientation-corrected size (EXIF 5-8 swap width/height).
    const swap = (meta.orientation ?? 1) >= 5;
    const width = (swap ? meta.height : meta.width) ?? 0;
    const height = (swap ? meta.width : meta.height) ?? 0;
    if (width < MIN_WIDTH || height < 120 || (meta.pages ?? 1) > 1) return bytes;

    const markWidth = Math.round(Math.min(MARK_MAX, Math.max(MARK_MIN, width * MARK_SHARE)));
    const mark = await sharp(MARK).resize({ width: markWidth }).toBuffer({ resolveWithObject: true });
    const inset = Math.round(width * INSET_SHARE);
    const left = Math.max(0, width - mark.info.width - inset);
    const top = Math.max(0, height - mark.info.height - inset);

    const out = img.composite([{ input: mark.data, left, top }]);
    switch (contentType) {
      case "image/png":
        return await out.png({ compressionLevel: 9 }).toBuffer();
      case "image/webp":
        return await out.webp({ quality: 88 }).toBuffer();
      case "image/avif":
        return await out.avif({ quality: 60 }).toBuffer();
      default:
        return await out.jpeg({ quality: 88, mozjpeg: true }).toBuffer();
    }
  } catch {
    return bytes;
  }
}
