"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { eq } from "drizzle-orm";
import { put } from "@vercel/blob";
import { db, isDatabaseConfigured } from "@/lib/db";
import { pages, type Page } from "@/lib/db/schema";
import {
  verifyPassword,
  verifySessionToken,
  createSessionToken,
  authConfigProblems,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { slugifyTr as slugify } from "@/lib/slug";
import { improveArticle } from "@/lib/ai/generateArticle";
import { aiProviderAvailable, redactSecrets } from "@/lib/ai/providers";
import { runArticlePipeline } from "@/lib/ai/articlePipeline";
import { liveLinkTargets } from "@/lib/ai/siteContext";
import { polishDraft } from "@/lib/ai/polishDraft";
import type { LinkSuggestion } from "@/lib/ai/linkTargets";
import { clampWordCount, sanitizeBrief, type ContentBrief } from "@/lib/ai/brief";
import { rewriteNews } from "@/lib/ai/rewriteNews";
import {
  generateImageWithFallback,
  imageSize,
  configuredImageProvider,
  type ImageProvider,
} from "@/lib/ai/generateImage";
import type { ArticleDraft } from "@/lib/ai/articleDraft";
import type { NewsDraft } from "@/lib/ai/newsDraft";
import { fetchArticle, NewsFetchError } from "@/lib/newsSource";
import { isPageLive, pageHref } from "@/lib/pages";
import { assertPublicHost } from "@/lib/publicHost";
import { submitToIndexNow } from "@/lib/indexNow";
import { site } from "@/lib/site";
import { applyWatermark } from "@/lib/watermark";

// --- Session guards ---
//
// Server Actions are independently reachable POST endpoints — the `proxy.ts`
// check only covers navigations, not action invocations. Every mutating action
// below re-verifies the session itself so auth never depends on the matcher.

async function hasValidSession(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

async function requireSession(): Promise<void> {
  if (!(await hasValidSession())) redirect("/admin/login/");
}

async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

// --- Auth ---

const LOGIN_WINDOW_MS = 10 * 60 * 1000;

export async function login(formData: FormData) {
  // Misconfigured env (missing/short SESSION_SECRET, malformed hash): say so
  // instead of crashing in createSessionToken() or pretending the password
  // was wrong. The login page lists which variable to fix.
  if (authConfigProblems().length > 0) {
    redirect("/admin/login/?error=config");
  }

  // Throttle brute-force attempts: 10 tries per IP per 10 minutes, plus a
  // global ceiling so rotating IPs can't multiply the budget indefinitely.
  const perIp = await rateLimit(`admin-login:${await clientIp()}`, 10, LOGIN_WINDOW_MS);
  const global = perIp.ok
    ? await rateLimit("admin-login:global", 60, LOGIN_WINDOW_MS)
    : perIp;
  if (!perIp.ok || !global.ok) {
    redirect("/admin/login/?error=rate");
  }

  const password = String(formData.get("password") || "");
  const storedHash = process.env.ADMIN_PASSWORD_HASH || "";

  if (!verifyPassword(password, storedHash)) {
    redirect("/admin/login/?error=1");
  }

  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    // Always Secure in production; plain http://localhost in dev needs it off.
    secure: process.env.NODE_ENV === "production",
    // Strict: the admin cookie is never sent on a cross-site request, so a
    // foreign page can't ride the session (CSRF) even via top-level navigation.
    // Same-site links (admin -> "Taslağı önizle") still carry it.
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/admin/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  redirect("/admin/login/");
}

// --- Image upload ---

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
// Browser uploads arrive in the request body, which Vercel caps at 4.5 MB.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4 MB
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

/**
 * The real image format, read from the file's first bytes. `File.type` (and a
 * remote server's Content-Type) is caller-controlled, so an HTML/SVG payload
 * could otherwise be stored under an image name. Returns null for anything
 * that is not JPEG, PNG, WebP or AVIF.
 */
function sniffImageType(b: Uint8Array): string | null {
  const ascii = (from: number, to: number) =>
    String.fromCharCode(...b.subarray(from, Math.min(to, b.length)));
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (
    b.length >= 8 &&
    b[0] === 0x89 && ascii(1, 4) === "PNG" &&
    b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a
  ) {
    return "image/png";
  }
  if (b.length >= 12 && ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  if (b.length >= 12 && ascii(4, 8) === "ftyp" && /avi[fs]/.test(ascii(8, 64))) return "image/avif";
  return null;
}

export async function uploadImage(formData: FormData) {
  if (!(await hasValidSession())) {
    return { error: "Oturumunuz sona ermiş. Lütfen tekrar giriş yapın." };
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return { error: "Dosya seçilmedi." };
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Yalnızca JPEG, PNG, WebP veya AVIF görseller yüklenebilir." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "Görsel en fazla 4 MB olabilir." };
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      error:
        "Görsel depolama henüz yapılandırılmamış (BLOB_READ_WRITE_TOKEN eksik).",
    };
  }
  try {
    // Trust the bytes, not the browser-declared type: the stored extension and
    // Content-Type come from the sniffed format.
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = sniffImageType(bytes);
    if (!type) {
      return { error: "Dosya geçerli bir JPEG, PNG, WebP veya AVIF görsel değil." };
    }
    // Never trust the client filename in the object key — derive the extension
    // from the verified type and use a random, collision-free name.
    const ext = EXT_BY_TYPE[type];
    const key = `uploads/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const blob = await put(key, await applyWatermark(Buffer.from(bytes), type), {
      access: "public",
      contentType: type,
    });
    return { url: blob.url };
  } catch {
    return { error: "Görsel yüklenirken bir hata oluştu." };
  }
}

// Re-host an image referenced by a pasted/imported article onto our own Blob
// store, so the post never depends on a third-party URL (e.g. the AI tool's
// temporary storage) staying alive. Admin-only; only http(s); only real image
// responses; size-capped. Refuses obvious internal targets (SSRF guard).
const BLOCKED_IMPORT_HOSTS =
  /^(localhost$|127\.|0\.0\.0\.0$|10\.|192\.168\.|169\.254\.|::1$|\[?::1\]?$|172\.(1[6-9]|2\d|3[01])\.)/i;

function isAllowedImportUrl(u: URL): boolean {
  return (u.protocol === "http:" || u.protocol === "https:") &&
    !BLOCKED_IMPORT_HOSTS.test(u.hostname);
}

/**
 * `fetch(..., { redirect: "follow" })` re-validates nothing on each hop — a
 * host that passes the SSRF blocklist can still 302 to an internal address
 * (e.g. cloud metadata IPs) and the browser-style auto-follow would happily
 * fetch it. Following redirects by hand and re-checking every `Location`
 * against the same blocklist closes that gap.
 */
async function fetchImageFollowingSafeRedirects(
  start: URL,
  signal: AbortSignal,
  maxRedirects = 5,
): Promise<Response> {
  let current = start;
  for (let i = 0; i <= maxRedirects; i++) {
    // The regex blocklist only sees the literal hostname; also reject names
    // that resolve to private/loopback/link-local addresses (and IPv6 forms).
    await assertPublicHost(current.hostname);
    const res = await fetch(current, { signal, redirect: "manual" });
    if (res.status < 300 || res.status >= 400 || !res.headers.get("location")) {
      return res;
    }
    const next = new URL(res.headers.get("location")!, current);
    if (!isAllowedImportUrl(next)) {
      throw new Error("Yönlendirme, izin verilmeyen bir adrese gidiyor.");
    }
    current = next;
  }
  throw new Error("Çok fazla yönlendirme.");
}

export async function importRemoteImage(
  url: string,
): Promise<{ url?: string; error?: string }> {
  if (!(await hasValidSession())) {
    return { error: "Oturumunuz sona ermiş. Lütfen tekrar giriş yapın." };
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { error: "Görsel depolama yapılandırılmamış (BLOB_READ_WRITE_TOKEN)." };
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { error: "Geçersiz görsel adresi." };
  }
  if (!isAllowedImportUrl(parsed)) {
    return { error: "Bu adres taşınamaz." };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    const res = await fetchImageFollowingSafeRedirects(parsed, controller.signal).finally(() =>
      clearTimeout(timeout),
    );

    if (!res.ok) return { error: `Görsel indirilemedi (${res.status}).` };

    const type = (res.headers.get("content-type") || "").split(";")[0].trim();
    if (!ALLOWED_IMAGE_TYPES.includes(type)) {
      return { error: `Desteklenmeyen görsel türü: ${type || "bilinmiyor"}.` };
    }
    // Refuse a declared-oversize body before buffering it into memory.
    if (Number(res.headers.get("content-length")) > MAX_IMAGE_BYTES) {
      return { error: "Görsel 5 MB sınırını aşıyor." };
    }
    const buf = new Uint8Array(await res.arrayBuffer());
    if (buf.byteLength === 0) return { error: "Görsel boş." };
    if (buf.byteLength > MAX_IMAGE_BYTES) {
      return { error: "Görsel 5 MB sınırını aşıyor." };
    }
    // The remote Content-Type is the other server's claim; check the bytes.
    const sniffed = sniffImageType(buf);
    if (!sniffed) {
      return { error: "İndirilen dosya geçerli bir görsel değil." };
    }

    const ext = EXT_BY_TYPE[sniffed];
    const key = `blog-import/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const blob = await put(key, await applyWatermark(Buffer.from(buf), sniffed), {
      access: "public",
      contentType: sniffed,
    });
    return { url: blob.url };
  } catch {
    return { error: "Görsel taşınırken bir hata oluştu." };
  }
}

// --- AI drafting ---

// Daily-article default; the brief/calendar can ask for 1200–4500.
const DEFAULT_WORD_COUNT = 1800;

type AiResult = { draft?: ArticleDraft; error?: string };
type AiGenerateResult = AiResult & {
  /** Writer-controllable SEO score of the returned draft (0–100). */
  score?: number;
  /** Model calls it took (1 = first draft passed). */
  rounds?: number;
  /** Focus keyword used, so the editor can fill the SEO field. */
  focusKeyword?: string;
  /** Which AI provider produced the draft, e.g. "Gemini (gemini-2.5-flash)". */
  provider?: string;
  /** 3–5 verified internal-link candidates (real, live slugs). */
  linkSuggestions?: LinkSuggestion[];
  /** Pipeline trace (rounds, automatic fixes). */
  log?: string[];
};

function aiUnavailable(): string | null {
  if (!aiProviderAvailable()) {
    return "AI yazım için bir sağlayıcı anahtarı tanımlı değil (ANTHROPIC_API_KEY / GEMINI_API_KEY / OPENAI_API_KEY / DEEPSEEK_API_KEY).";
  }
  return null;
}

function parseKeywords(raw: string[] | string | undefined): string[] {
  const list = Array.isArray(raw) ? raw : (raw ?? "").split(/[,\n]/);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of list) {
    const k = String(part).trim().replace(/\s+/g, " ");
    if (!k) continue;
    const key = k.toLocaleLowerCase("tr-TR");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(k);
    if (out.length >= 8) break;
  }
  return out;
}

export async function generateBlogDraft(input: {
  topic: string;
  keywords?: string[] | string;
  angle?: string;
  wordCount?: number;
  tone?: string;
  /** Content-calendar fields (niyet, küme, slug, zorunlu iç linkler, format, not). */
  brief?: Partial<Record<keyof ContentBrief, unknown>>;
}): Promise<AiGenerateResult> {
  if (!(await hasValidSession())) return { error: "Oturum sona ermiş." };
  const missing = aiUnavailable();
  if (missing) return { error: missing };

  const topic = (input.topic || "").trim();
  if (topic.length < 3) {
    return { error: "Önce bir konu gir." };
  }
  const keywords = parseKeywords(input.keywords);
  if (keywords.length === 0) keywords.push(topic);

  // Calendar rows may ask for pillar (3000–4500) or Ek-A card (1200–1800)
  // lengths, so accept any value in range, not just the dropdown presets.
  const wordCount = clampWordCount(input.wordCount, DEFAULT_WORD_COUNT);

  try {
    const result = await runArticlePipeline({
      topic,
      keywords,
      angle: input.angle?.trim() || undefined,
      wordCount,
      tone: (input.tone || "kurumsal ve akıcı").trim(),
      brief: sanitizeBrief(input.brief),
    });
    return {
      draft: result.draft,
      score: result.score,
      rounds: result.rounds,
      focusKeyword: keywords[0],
      provider: result.provider,
      linkSuggestions: result.linkSuggestions,
      log: result.log,
    };
  } catch (e) {
    return { error: e instanceof Error ? redactSecrets(e.message) : "Üretim başarısız oldu." };
  }
}

const MAX_PASTED_SOURCE = 40_000;

/**
 * Guarantee the source institution (e.g. "KOSGEB", "TÜBİTAK") is one of the
 * post's tags, and first — that's what the blog card shows as the cover badge
 * and what powers `/blog/etiket/<kaynak>` as a de-facto source archive. The
 * model usually includes it already, but this makes it deterministic rather
 * than hoping the draft complies.
 */
function withSourceTag(tags: string[], sourceName?: string): string[] {
  const name = (sourceName || "").trim();
  if (!name) return tags;
  const already = tags.some(
    (t) => t.toLocaleLowerCase("tr-TR") === name.toLocaleLowerCase("tr-TR"),
  );
  const merged = already
    ? [name, ...tags.filter((t) => t.toLocaleLowerCase("tr-TR") !== name.toLocaleLowerCase("tr-TR"))]
    : [name, ...tags];
  return merged.slice(0, 4);
}

export type NewsDraftResult = {
  draft?: NewsDraft;
  error?: string;
  /** Where the source came from — filled into the draft's attribution. */
  sourceUrl?: string;
  sourceName?: string;
  /** How much source text was actually rewritten (chars), for the panel. */
  sourceChars?: number;
};

/**
 * Rewrite a news article — fetched from `url` or pasted as `sourceText` — into
 * a short, original news item. The result is an unpublished draft the editor
 * reviews (facts, attribution) before publishing.
 */
export async function generateNewsDraft(input: {
  url?: string;
  sourceText?: string;
  sourceName?: string;
}): Promise<NewsDraftResult> {
  if (!(await hasValidSession())) return { error: "Oturum sona ermiş." };
  const missing = aiUnavailable();
  if (missing) return { error: missing };

  const url = (input.url || "").trim();
  const pasted = (input.sourceText || "").trim();

  let sourceText = "";
  let sourceUrl: string | undefined;
  let sourceName = (input.sourceName || "").trim() || undefined;
  let sourceTitle: string | undefined;

  if (url) {
    try {
      const art = await fetchArticle(url);
      sourceText = art.text;
      sourceUrl = art.url;
      sourceName = sourceName || art.siteName;
      sourceTitle = art.title || undefined;
    } catch (e) {
      if (e instanceof NewsFetchError) return { error: e.message };
      return { error: "Kaynak alınamadı. Haber metnini elle yapıştır." };
    }
  } else if (pasted) {
    if (pasted.replace(/\s/g, "").length < 200) {
      return { error: "Yapıştırılan metin çok kısa (en az ~200 karakter)." };
    }
    sourceText = pasted.slice(0, MAX_PASTED_SOURCE);
  } else {
    return { error: "Bir haber URL'si gir ya da haber metnini yapıştır." };
  }

  try {
    const draft = await rewriteNews({
      sourceText,
      sourceName,
      sourceUrl,
      sourceTitle,
    });
    return {
      draft: { ...draft, tags: withSourceTag(draft.tags, sourceName) },
      sourceUrl,
      sourceName,
      sourceChars: sourceText.length,
    };
  } catch (e) {
    return {
      error: e instanceof Error ? redactSecrets(e.message) : "Haber yeniden yazılamadı.",
    };
  }
}

const EXT_BY_IMAGE_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const IMAGE_STYLES = [
  "foto",
  "3d",
  "infografik",
  "vektor",
  "minimal",
  "editoryal",
] as const;
type ImageStyle = (typeof IMAGE_STYLES)[number];

const IMAGE_PROVIDER_LABEL: Record<ImageProvider, string> = {
  cloudflare: "Cloudflare",
  pollinations: "Pollinations",
  gemini: "Gemini",
  openai: "OpenAI",
};

/**
 * Generate a blog image from a text prompt (AI panel's image suggestions).
 * Stores it on Vercel Blob when configured; in local dev without a Blob token
 * it writes into `public/blog-ai/` so the URL is a real, renderable path
 * (data: URLs break `next/image` on the public post page).
 */
export async function generateBlogImage(input: {
  prompt: string;
  kind?: "hero" | "inline";
  style?: string;
}): Promise<{ url?: string; error?: string; note?: string }> {
  if (!(await hasValidSession())) return { error: "Oturum sona ermiş." };
  const prompt = (input.prompt || "").trim();
  if (prompt.length < 10) return { error: "Görsel istemi çok kısa." };
  const style = IMAGE_STYLES.includes(input.style as ImageStyle)
    ? (input.style as ImageStyle)
    : undefined;
  const size = imageSize(input.kind === "inline" ? "inline" : "hero");
  // The public/ fallback below only works on a local disk; Vercel's is
  // read-only, so fail before spending an image-provider call.
  if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      error:
        "Görsel depolama yapılandırılmamış (BLOB_READ_WRITE_TOKEN eksik). Vercel → Storage'dan Blob deposu bağlanınca görsel üretimi çalışır.",
    };
  }

  try {
    const wanted = configuredImageProvider();
    const { image, provider: usedProvider } = await generateImageWithFallback(
      prompt,
      size,
      style,
    );
    const note =
      usedProvider !== wanted
        ? `${IMAGE_PROVIDER_LABEL[wanted]} kotası/kredisi yok — ${IMAGE_PROVIDER_LABEL[usedProvider]} ile üretildi.`
        : undefined;
    const { contentType } = image;
    const bytes = await applyWatermark(image.bytes, contentType);
    if (bytes.byteLength > MAX_IMAGE_BYTES) {
      return { error: "Üretilen görsel 5 MB sınırını aştı." };
    }
    const ext = EXT_BY_IMAGE_TYPE[contentType] ?? "jpg";
    const file = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`blog-ai/${file}`, bytes, {
        access: "public",
        contentType,
      });
      return { url: blob.url, note };
    }

    // Local dev: no Blob store — persist under public/ for a real URL.
    // NOTE: public/blog-ai/ is gitignored, so this URL 404s in production.
    const { writeFile, mkdir } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const dir = join(process.cwd(), "public", "blog-ai");
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, file), bytes);
    const localWarning =
      "⚠️ Görsel yalnızca yerel diske kaydedildi — canlıda görünmez. " +
      "Yayınlamadan önce BLOB_READ_WRITE_TOKEN'ı yapılandırıp görseli yeniden üret.";
    return {
      url: `/blog-ai/${file}`,
      note: note ? `${note} ${localWarning}` : localWarning,
    };
  } catch (e) {
    return {
      error: e instanceof Error ? redactSecrets(e.message) : "Görsel üretilemedi.",
    };
  }
}

export async function improveBlogDraft(input: {
  focusKeyword: string;
  keywords?: string[];
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  tags: string[];
  content: string;
  failing: string[];
}): Promise<AiResult> {
  if (!(await hasValidSession())) return { error: "Oturum sona ermiş." };
  const missing = aiUnavailable();
  if (missing) return { error: missing };
  if (!input.content?.trim()) return { error: "İyileştirilecek içerik yok." };
  if (!input.failing?.length) return { error: "Giderilecek bir eksik yok." };

  try {
    const linkTargets = await liveLinkTargets();
    const { draft: raw } = await improveArticle({
      linkTargets,
      focusKeyword: (input.focusKeyword || "").trim(),
      keywords: input.keywords,
      title: input.title || "",
      metaTitle: input.metaTitle || "",
      metaDescription: input.metaDescription || "",
      excerpt: input.excerpt || "",
      tags: input.tags || [],
      content: input.content,
      failing: input.failing.slice(0, 20),
    });
    const { draft } = polishDraft(raw, {
      knownSlugs: new Set(linkTargets.map((t) => t.slug)),
      titleSuffix: site.titleSuffix,
    });
    return { draft };
  } catch (e) {
    return { error: e instanceof Error ? redactSecrets(e.message) : "İyileştirme başarısız oldu." };
  }
}

// --- Pages (blog posts + standalone/service/location pages) ---
//
// One CMS model covers both `kind`s — see lib/db/schema.ts for why. The
// public route a row renders under, and whether it appears in /blog + tag
// archives, are the only things `kind` controls.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const DB_MISSING_ERROR =
  "Veritabanı bağlı değil (DATABASE_URL boş). Kayıt yapılamaz — kurulum için docs/ADMIN-KURULUM.md.";

// Top-level segments owned by real routes/files: a flat page with one of these
// slugs would be saved but never reachable (the static route wins).
const RESERVED_PAGE_SLUGS = new Set([
  "admin", "api", "blog", "iletisim", "iso-27001-danismanlik-hizmeti",
  "sitemap-xml", "robots-txt", "assets", "_next",
]);

/** Why `slug` can't be used for this `kind`, or null if it's fine. */
function reservedSlugReason(kind: "blog" | "page", slug: string): string | null {
  // Posts render at the flat /[slug]/ too, so the reserved set applies to both.
  if (RESERVED_PAGE_SLUGS.has(slug)) {
    return `"/${slug}/" sitenin sabit bir adresi — farklı bir URL (slug) gir.`;
  }
  return null;
}

function isSafeImageUrl(value: string): boolean {
  if (value.length > 2048 || /[\s"'<>\\]/.test(value)) return false;
  if (value.startsWith("/")) return !value.startsWith("//");
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

function parseTags(raw: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(/[,\n]/)) {
    const t = part.trim().replace(/\s+/g, " ");
    if (!t) continue;
    const key = t.toLocaleLowerCase("tr-TR");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
    if (out.length >= 12) break;
  }
  return out;
}

// Bound to the form via useActionState — returning `{ error }` instead of
// throwing is required here: Next.js redacts thrown Server Action errors to a
// generic, digest-only message in production ("An error occurred in the
// Server Components render"), which was showing the user a dead-end instead
// of the actual validation/DB message.
export async function savePage(
  _prevState: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  await requireSession();
  const id = String(formData.get("id") || "");
  const kind: "blog" | "page" = formData.get("kind") === "page" ? "page" : "blog";
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const coverImageUrl = String(formData.get("coverImageUrl") || "").trim() || null;
  const metaTitle = String(formData.get("metaTitle") || "").trim() || null;
  const metaDescription =
    String(formData.get("metaDescription") || "").trim() || null;
  const focusKeyword = String(formData.get("focusKeyword") || "").trim() || null;
  const ogImageUrl = String(formData.get("ogImageUrl") || "").trim() || null;
  const authorName = String(formData.get("authorName") || "").trim() || null;
  const tags = parseTags(String(formData.get("tags") || ""));
  const noindex = formData.get("noindex") === "on";
  // "draft" | "now" | "schedule" — the editor's 3-way publish control.
  const publishMode = String(formData.get("publishMode") || "").trim();
  const published = publishMode !== "draft";
  // datetime-local, e.g. "2026-09-15T09:30" — no timezone, so it's read as
  // Turkey local time (the whole site's editorial calendar is TR).
  const scheduledRaw = String(formData.get("publishedAt") || "").trim();
  let slug = String(formData.get("slug") || "").trim();

  if (!isDatabaseConfigured()) {
    return { error: DB_MISSING_ERROR };
  }
  if (id && !UUID_RE.test(id)) {
    return { error: "Geçersiz kayıt kimliği." };
  }
  if (!title || !excerpt || !content) {
    return { error: "Başlık, özet ve içerik zorunludur." };
  }
  // Image fields land in <img src>, og:image and JSON-LD: only http(s) URLs or
  // site-relative paths (e.g. /assets/img/x.webp), never javascript:/data:.
  for (const [label, value] of [
    ["Kapak görseli", coverImageUrl],
    ["Paylaşım (OG) görseli", ogImageUrl],
  ] as const) {
    if (value && !isSafeImageUrl(value)) {
      return { error: `${label} adresi https:// ile ya da / ile başlamalı.` };
    }
  }
  slug = slug ? slugify(slug) : slugify(title);
  if (!slug) return { error: "Geçerli bir URL (slug) üretilemedi." };

  // On edit, look up the existing row so we can (a) keep the original
  // publish date and (b) record the old slug for a 301 if it changed.
  let existing: Page | undefined;
  if (id) {
    try {
      existing = (await db.select().from(pages).where(eq(pages.id, id)))[0];
    } catch (e) {
      console.error("savePage: kayıt okunamadı", e);
      return { error: "Veritabanına ulaşılamadı. Bağlantıyı kontrol edip tekrar dene." };
    }
    if (!existing) {
      return { error: "Düzenlenen kayıt bulunamadı (silinmiş olabilir)." };
    }
  }
  // Migrated rows may already sit on a reserved slug (e.g. the ISO 27001
  // service page, which has its own route); only block *moving to* one.
  if (!existing || existing.slug !== slug || existing.kind !== kind) {
    const reserved = reservedSlugReason(kind, slug);
    if (reserved) return { error: reserved };
  }

  let publishedAt: Date | null = null;
  if (publishMode === "schedule") {
    if (!scheduledRaw) return { error: "Yayın tarihi/saati gir." };
    const parsed = new Date(`${scheduledRaw}:00+03:00`);
    if (Number.isNaN(parsed.getTime())) {
      return { error: "Geçerli bir yayın tarihi/saati gir." };
    }
    publishedAt = parsed;
  } else if (publishMode === "now") {
    // Already live (published, and its publish date has passed)? Editing and
    // re-saving with "Şimdi Yayınla" must NOT bump the publish date each time
    // — only a draft/scheduled page moving to "now" gets stamped fresh.
    publishedAt = existing && isPageLive(existing) ? existing.publishedAt : new Date();
  }

  let slugHistory = existing?.slugHistory ?? [];
  if (existing && existing.slug !== slug) {
    slugHistory = [
      existing.slug,
      ...slugHistory.filter((s) => s !== existing.slug && s !== slug),
    ].slice(0, 10);
  }

  const values = {
    kind,
    title,
    excerpt,
    content,
    coverImageUrl,
    metaTitle,
    metaDescription,
    focusKeyword,
    ogImageUrl,
    authorName,
    tags,
    noindex,
    slugHistory,
    published,
    publishedAt,
    slug,
    updatedAt: new Date(),
  };

  try {
    if (id) {
      await db.update(pages).set(values).where(eq(pages.id, id));
    } else {
      await db.insert(pages).values(values);
    }
  } catch (e) {
    // Drizzle wraps the driver error in a DrizzleQueryError; the real
    // Postgres error (with `.code`) is on `.cause` — 23505 is
    // unique_violation, which on this table is always the `slug` column.
    const code = (e as { cause?: { code?: string } }).cause?.code;
    if (code === "23505") {
      return {
        error: `Bu URL zaten kullanılıyor: /${slug} — farklı bir URL (slug) gir.`,
      };
    }
    // Anything else is unexpected — log the real error server-side (Next
    // redacts thrown messages in production) and give the user a way forward
    // instead of the generic crash screen.
    console.error("savePage: beklenmeyen DB hatası", e);
    return { error: "Kaydedilirken beklenmeyen bir hata oluştu. Tekrar dene." };
  }

  revalidatePublicSurfaces([
    ...(existing ? [pageHref(existing)] : []),
    pageHref({ kind, slug }),
  ]);
  // Ping IndexNow for a page that is live now (a scheduled one is not
  // reachable yet), plus its old URL when the slug moved (now a 301) or when
  // it was just unpublished/noindexed (now gone). No-op without INDEXNOW_KEY.
  const liveNow = !!publishedAt && published && publishedAt.getTime() <= Date.now() && !noindex;
  const wasLive = !!existing && isPageLive(existing) && !existing.noindex;
  const changed = [
    ...(liveNow ? [pageHref({ kind, slug })] : []),
    ...(existing && wasLive && (existing.slug !== slug || !liveNow) ? [pageHref(existing)] : []),
  ];
  if (changed.length > 0) {
    after(() => submitToIndexNow(changed.map((h) => `${site.baseUrl}${h}`)));
  }
  redirect(kind === "blog" ? "/admin/blog/" : "/admin/sayfalar/");
}

/**
 * A create/edit/delete can change almost every public surface: the page's own
 * URL(s), the homepage and /blog/ listings, tag archives, the "İlgili Yazılar"
 * block on the neighbouring posts, the sitemap and the RSS feed. Per-path
 * calls missed some of these (a post published on 2026-09-26 was still absent
 * from /sitemap.xml a quarter of an hour later), so invalidate the whole site:
 * with one post a day this is cheap, and each page only re-renders on its
 * next visit.
 */
function revalidatePublicSurfaces(hrefs: string[]) {
  revalidatePath("/", "layout");
  for (const href of new Set(hrefs)) revalidatePath(href.replace(/\/+$/, "") || "/");
}

export async function deletePage(id: string) {
  await requireSession();
  if (!isDatabaseConfigured()) throw new Error(DB_MISSING_ERROR);
  if (!UUID_RE.test(id)) throw new Error("Geçersiz kayıt kimliği.");
  const [existing] = await db.select().from(pages).where(eq(pages.id, id));
  if (existing) {
    await db.delete(pages).where(eq(pages.id, id));
    revalidatePublicSurfaces([pageHref(existing)]);
    if (isPageLive(existing) && !existing.noindex) {
      after(() => submitToIndexNow([`${site.baseUrl}${pageHref(existing)}`]));
    }
  }
  redirect(existing?.kind === "page" ? "/admin/sayfalar/" : "/admin/blog/");
}
