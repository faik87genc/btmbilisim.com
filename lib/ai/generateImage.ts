import "server-only";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import sharp from "sharp";

/**
 * Blog görseli üretimi. Sağlayıcılar (kalite ↑, hepsi anahtar/faturalandırma ister
 * — pollinations hariç):
 *  - pollinations : anahtarsız, ücretsiz. Orta-düşük kalite (free tier küçüldü).
 *  - cloudflare   : Cloudflare Workers AI (Flux-schnell). ÜCRETSİZ günlük kota,
 *                   CF_ACCOUNT_ID + CF_API_TOKEN ister. Pollinations'tan iyi.
 *  - gemini       : Google Nano Banana / Gemini 3 Image. En iyi kalite +
 *                   konuya sadık. Görsel üretiminde ÜCRETSİZ KOTA YOK (Billing).
 *  - openai       : OpenAI gpt-image-1. Çok iyi. OpenAI faturalandırması ister.
 * `BLOG_IMAGE_PROVIDER` ile seç; boşsa CF anahtarları varsa `cloudflare`, yoksa
 * `pollinations`. Seçilen sağlayıcı kota/kredi hatası verirse sistem otomatik
 * `pollinations`a düşer (çağıran taraf bilgilendirilir).
 *
 * Hangi sağlayıcı üretirse üretsin çıktı `sharp` ile hedef kadraja (hero 16:9,
 * inline 4:3) kırpılıp tek formata (JPEG) yeniden kodlanır — Flux-schnell hep
 * 1024², gpt-image-1 3:2 döndürdüğü için bu şart.
 */
export type GeneratedImage = { bytes: Buffer; contentType: string };
export type ImageProvider = "pollinations" | "cloudflare" | "gemini" | "openai";

type Size = { width: number; height: number; aspect: string };

const HERO: Size = { width: 1600, height: 900, aspect: "16:9" };
const INLINE: Size = { width: 1200, height: 900, aspect: "4:3" };

export function imageSize(kind: "hero" | "inline"): Size {
  return kind === "inline" ? INLINE : HERO;
}

export type ImageStyle =
  | "foto"
  | "3d"
  | "infografik"
  | "vektor"
  | "minimal"
  | "editoryal";

const STYLE_PREFIX: Record<ImageStyle, string> = {
  foto: "Professional corporate photography, real environment, natural soft window light, shallow depth of field, 50mm lens, muted blue and slate tones",
  "3d": "Polished 3D isometric render, matte materials, soft studio lighting, corporate blue / slate / white palette, subtle depth of field",
  infografik:
    "Clean flat infographic-style illustration, simple geometric icons, generous spacing, corporate blue palette, no data labels",
  vektor:
    "Modern flat vector illustration, smooth gradients, limited 3-colour corporate palette, crisp shapes",
  minimal:
    "Minimalist conceptual composition, one clear subject, large areas of negative space, soft corporate tones, fine grain",
  editoryal:
    "Sophisticated editorial concept illustration, metaphorical, muted corporate palette, magazine quality",
};

/**
 * Wrap the model's raw description with a house style and strong anti-artifact
 * direction — the usual AI-image failures for B2B blog art are gibberish text
 * on screens/signage and distorted faces, so we steer hard away from both.
 */
function composePrompt(prompt: string, style?: ImageStyle): string {
  const prefix = style ? `${STYLE_PREFIX[style]}. ` : "";
  return (
    `${prefix}Subject: ${prompt}. ` +
    "Composition: one clear focal point, uncluttered, corporate and trustworthy mood, tasteful. " +
    "Strictly no text, no letters, no numbers, no UI screenshots, no charts with labels, no logos, no watermarks, no signage. " +
    "Any paper, documents or printed pages must be blurred, at an oblique angle, or partly out of frame so no writing is legible — never a sharp top-down close-up of a document. " +
    "No faces looking at camera; any people are incidental, cropped or out of focus. " +
    "Photoreal detail, crisp, well-lit, no distortion, no artifacts, no extra limbs."
  );
}

export function configuredImageProvider(): ImageProvider {
  const v = (process.env.BLOG_IMAGE_PROVIDER || "").trim().toLowerCase();
  if (v === "gemini" || v === "openai" || v === "cloudflare" || v === "pollinations") {
    return v;
  }
  // Unset: prefer Cloudflare Flux-schnell when its (free) credentials exist —
  // clearly better than Pollinations at no cost. Otherwise Pollinations.
  if (process.env.CF_ACCOUNT_ID && process.env.CF_API_TOKEN) return "cloudflare";
  return "pollinations";
}

// Best free result first, most reliable free fallback second, paid providers
// last (only useful once billing is set up on one of them). The configured/
// forced provider (`configuredImageProvider()`) always gets the first try
// regardless of this order — this is just the cascade for what to attempt
// next when that one hits a quota/credit wall.
const PROVIDER_PRIORITY: ImageProvider[] = [
  "cloudflare",
  "pollinations",
  "gemini",
  "openai",
];

function providerHasCredentials(id: ImageProvider): boolean {
  switch (id) {
    case "cloudflare":
      return Boolean(process.env.CF_ACCOUNT_ID && process.env.CF_API_TOKEN);
    case "gemini":
      return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
    case "openai":
      return Boolean(process.env.OPENAI_API_KEY);
    case "pollinations":
      return true; // keyless
  }
}

/**
 * Generate an image, cascading through every configured provider (starting
 * with whichever is chosen/forced, then the rest of `PROVIDER_PRIORITY`)
 * whenever one hits a quota/credit wall — mirrors the text-generation
 * fallback in `lib/ai/providers.ts` so one exhausted free tier doesn't block
 * the editor from getting a cover image.
 */
export async function generateImageWithFallback(
  prompt: string,
  size: Size = HERO,
  style?: ImageStyle,
): Promise<{ image: GeneratedImage; provider: ImageProvider }> {
  const first = configuredImageProvider();
  const rest = PROVIDER_PRIORITY.filter(
    (id) => id !== first && providerHasCredentials(id),
  );
  const order = [first, ...rest];

  let lastErr: unknown;
  for (const provider of order) {
    try {
      const image = await generateImage(prompt, size, style, provider);
      return { image, provider };
    } catch (e) {
      lastErr = e;
      if (!isQuotaError(e)) throw e;
    }
  }
  throw lastErr;
}

/**
 * Force every provider's output to the exact target frame. Flux-schnell only
 * emits 1024², gpt-image-1 emits 3:2, Pollinations honours the request but can
 * drift — so we crop-to-fill (salient-region crop) to hero 16:9 / inline 4:3
 * and re-encode to a single format. Also strips EXIF and keeps files small.
 */
async function normalizeImage(
  img: GeneratedImage,
  size: Size,
): Promise<GeneratedImage> {
  try {
    const bytes = await sharp(img.bytes)
      .rotate() // honour any EXIF orientation before cropping
      .resize(size.width, size.height, {
        fit: "cover",
        position: sharp.strategy.attention,
      })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    return { bytes, contentType: "image/jpeg" };
  } catch {
    // If sharp can't decode it, hand back the original rather than failing the
    // whole generation — the caller still validates size/type.
    return img;
  }
}

export async function generateImage(
  prompt: string,
  size: Size = HERO,
  style?: ImageStyle,
  provider: ImageProvider = configuredImageProvider(),
): Promise<GeneratedImage> {
  const full = composePrompt(prompt, style);
  let raw: GeneratedImage;
  switch (provider) {
    case "gemini":
      raw = await geminiImage(full, size);
      break;
    case "openai":
      raw = await openaiImage(full, size);
      break;
    case "cloudflare":
      raw = await cloudflareImage(full, size);
      break;
    default:
      raw = await pollinationsImage(full, size);
  }
  return normalizeImage(raw, size);
}

/** Quota / billing errors that justify falling back to the free provider. */
export function isQuotaError(err: unknown): boolean {
  const m = (err instanceof Error ? err.message : String(err)).toLowerCase();
  // Cloudflare Workers AI's daily-free-tier message ("you have used up your
  // daily free allocation of N neurons, please upgrade to ... Paid plan")
  // doesn't contain "quota"/"exceeded"/etc., so it slipped past this check
  // and surfaced as a raw error instead of falling back to Pollinations.
  return /429|402|quota|billing|credit|insufficient|exceeded|kota|allocation|paid plan|rate.?limit/.test(
    m,
  );
}

// --- providers ----------------------------------------------------------

/**
 * Pollinations' free/anonymous tier still stamps a small "pollinations.ai"
 * watermark in the bottom-right corner even with `nologo=true` in the query
 * string — a known limitation of their keyless tier, not something any URL
 * param fixes. Crop the watermark strip off instead of shipping it; the
 * downstream cover-fit resize in `normalizeImage` re-fills the frame from
 * what's left, so no black bar or gap shows up in the final image.
 */
async function cropPollinationsWatermark(bytes: Buffer): Promise<Buffer> {
  try {
    const img = sharp(bytes);
    const meta = await img.metadata();
    if (!meta.width || !meta.height) return bytes;
    const height = Math.round(meta.height * 0.92);
    return await img
      .extract({ left: 0, top: 0, width: meta.width, height })
      .toBuffer();
  } catch {
    return bytes;
  }
}

async function pollinationsImage(prompt: string, size: Size): Promise<GeneratedImage> {
  const seed = Math.floor(Math.random() * 1_000_000);
  const model = process.env.BLOG_IMAGE_MODEL || "flux";
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
    `?width=${size.width}&height=${size.height}` +
    `&model=${encodeURIComponent(model)}&seed=${seed}&nologo=true&safe=true&enhance=true`;
  const res = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!res.ok) throw new Error(`Görsel servisi ${res.status} döndü.`);
  const contentType = (res.headers.get("content-type") || "image/jpeg")
    .split(";")[0]
    .trim();
  if (!contentType.startsWith("image/")) {
    throw new Error("Görsel servisi görüntü döndürmedi.");
  }
  const rawBytes = Buffer.from(await res.arrayBuffer());
  if (rawBytes.length < 1024) throw new Error("Görsel boş geldi.");
  const bytes = await cropPollinationsWatermark(rawBytes);
  return { bytes, contentType };
}

// `_size` keeps the signature shared with the other providers; flux-schnell ignores it.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function cloudflareImage(prompt: string, _size: Size): Promise<GeneratedImage> {
  const account = process.env.CF_ACCOUNT_ID;
  const token = process.env.CF_API_TOKEN;
  if (!account || !token) {
    throw new Error("Cloudflare görselleri için CF_ACCOUNT_ID + CF_API_TOKEN gerekli.");
  }
  const model = process.env.BLOG_IMAGE_MODEL || "@cf/black-forest-labs/flux-1-schnell";
  // flux-1-schnell's schema is strict: ONLY prompt + steps (1–8) are accepted —
  // width/height/seed are rejected ("Additional properties not allowed").
  // Output is always 1024×1024.
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${account}/ai/run/${model}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, steps: 8 }),
      signal: AbortSignal.timeout(120_000),
    },
  );
  const ct = res.headers.get("content-type") || "";
  if (ct.startsWith("image/")) {
    return { bytes: Buffer.from(await res.arrayBuffer()), contentType: ct };
  }
  const json = (await res.json()) as {
    success?: boolean;
    result?: { image?: string };
    errors?: { message: string }[];
  };
  if (!res.ok || !json.success || !json.result?.image) {
    throw new Error(
      `Cloudflare görsel hatası: ${json.errors?.[0]?.message || res.status}`,
    );
  }
  return {
    bytes: Buffer.from(json.result.image, "base64"),
    contentType: "image/jpeg",
  };
}

async function geminiImage(prompt: string, size: Size): Promise<GeneratedImage> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY tanımlı değil.");
  const model = process.env.BLOG_IMAGE_MODEL || "gemini-3.1-flash-image";
  const client = new GoogleGenAI({ apiKey });
  try {
    const res = await client.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio: size.aspect },
      },
    });
    const part = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    const data = part?.inlineData?.data;
    if (!data) {
      throw new Error(
        `Gemini görsel döndürmedi (${res.candidates?.[0]?.finishReason || "boş yanıt"}).`,
      );
    }
    return {
      bytes: Buffer.from(data, "base64"),
      contentType: part?.inlineData?.mimeType || "image/png",
    };
  } catch (e) {
    if (isQuotaError(e)) {
      throw new Error(
        "Gemini görsel üretiminin ücretsiz kotası yok — Google AI Studio'da faturalandırmayı aç.",
      );
    }
    throw e;
  }
}

async function openaiImage(prompt: string, size: Size): Promise<GeneratedImage> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY tanımlı değil.");
  const model = process.env.BLOG_IMAGE_MODEL || "gpt-image-1";
  const client = new OpenAI({ apiKey });
  const dimension =
    size.aspect === "16:9"
      ? "1536x1024"
      : size.aspect === "4:3"
        ? "1536x1024"
        : "1024x1024";
  const res = await client.images.generate({
    model,
    prompt,
    size: dimension as "1536x1024" | "1024x1024",
    quality: "high",
  });
  const b64 = res.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI görsel döndürmedi.");
  return { bytes: Buffer.from(b64, "base64"), contentType: "image/png" };
}
