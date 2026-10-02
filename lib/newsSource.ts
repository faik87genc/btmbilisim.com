import "server-only";
import { assertPublicHost, BlockedHostError } from "@/lib/publicHost";

/**
 * Fetch a news article by URL and reduce it to plain text the model can
 * rewrite. Dependency-free (no DOMParser on the server): strips non-content
 * tags, prefers a <main>/<article> block, collapses whitespace.
 *
 * The caller is an authenticated admin, but the URL is still attacker-influenced
 * text, so `assertPublicHttpUrl` blocks non-HTTP(S) schemes and private/loopback
 * hosts (SSRF). Response size and time are capped.
 */

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB of HTML is plenty for an article
const TIMEOUT_MS = 15_000;
const UA =
  "Mozilla/5.0 (compatible; Iso27001NewsBot/1.0; +https://iso27001danismanlik.com/blog)";

export type FetchedArticle = {
  url: string;
  siteName: string;
  title: string;
  text: string;
};

export class NewsFetchError extends Error {}

export function assertPublicHttpUrl(raw: string): URL {
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    throw new NewsFetchError("Geçerli bir URL değil.");
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") {
    throw new NewsFetchError("Yalnızca http/https adresleri desteklenir.");
  }
  const host = u.hostname.toLowerCase();
  const privateHost =
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host === "[::1]" ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
    /^0\./.test(host);
  if (privateHost) {
    throw new NewsFetchError("Bu adres alınamaz.");
  }
  return u;
}

function siteNameFrom(html: string, u: URL): string {
  const og = html.match(
    /<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i,
  );
  const host = u.hostname.replace(/^www\./, "");
  if (!og?.[1]) return host;
  const full = decodeEntities(og[1]).trim();
  // Long official names ("KOSGEB T.C. Küçük ve Orta Ölçekli…") → keep the short
  // leading acronym/word if there is one, else fall back to the host.
  if (full.length <= 40) return full;
  const lead = full.split(/\s+[-–—|]\s+|\s+T\.?C\.?\s+|,\s+/)[0].trim();
  return lead.length >= 3 && lead.length <= 40 ? lead : host;
}

function titleFrom(html: string, siteName: string): string {
  const og = html.match(
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i,
  );
  if (og?.[1]) return decodeEntities(og[1]).trim();
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (t?.[1]) {
    // Trim a trailing " - Site Name" / " | Site Name" suffix.
    return decodeEntities(stripTags(t[1]))
      .replace(new RegExp(`\\s*[|\\-–—]\\s*${escapeRe(siteName)}.*$`, "i"), "")
      .trim();
  }
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return h1?.[1] ? decodeEntities(stripTags(h1[1])).replace(/\s+/g, " ").trim() : "";
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Named entities that show up in Turkish gov pages served as Latin-1-ish HTML.
const NAMED: Record<string, string> = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
  laquo: "«", raquo: "»", hellip: "…", ndash: "–", mdash: "—",
  rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”",
  uuml: "ü", Uuml: "Ü", ouml: "ö", Ouml: "Ö", auml: "ä", Auml: "Ä",
  ccedil: "ç", Ccedil: "Ç", scaron: "š", Scaron: "Š",
  Icirc: "Î", icirc: "î", ntilde: "ñ", szlig: "ß", euro: "€",
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED[name] ?? m);
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ");
}

/** Turn a full HTML document into readable article text. */
export function extractArticleText(html: string): string {
  let h = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(nav|header|footer|aside|form)\b[\s\S]*?<\/\1>/gi, " ");

  // Prefer the main content region if the page marks one.
  const region =
    h.match(/<article\b[\s\S]*?<\/article>/i)?.[0] ||
    h.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ||
    h.match(/<div[^>]+(?:id|class)=["'][^"']*(?:content|icerik|haber|detay|article|post)[^"']*["'][\s\S]*?<\/div>/i)?.[0] ||
    h;

  // Keep paragraph/heading/list boundaries as newlines.
  h = region
    .replace(/<\/(p|div|li|h[1-6]|tr|blockquote|section)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li\b[^>]*>/gi, "\n- ");

  const text = decodeEntities(stripTags(h))
    .replace(/[ \t ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
}

/**
 * Follow redirects manually, re-validating the host of every hop against
 * `assertPublicHttpUrl` — `redirect: "follow"` would otherwise let a 3xx
 * response point at a private/loopback address (SSRF) after the initial URL
 * already passed the check.
 */
async function fetchFollowingSafeRedirects(
  start: URL,
  signal: AbortSignal,
  maxRedirects = 5,
): Promise<Response> {
  let current = start;
  for (let i = 0; i <= maxRedirects; i++) {
    // Hostname regex above can't see what a name resolves to; check the DNS
    // answer too (e.g. a public-looking name pointing at 10.x / 169.254.x).
    try {
      await assertPublicHost(current.hostname);
    } catch (e) {
      if (e instanceof BlockedHostError) throw new NewsFetchError("Bu adres alınamaz.");
      throw e;
    }
    const res = await fetch(current, {
      redirect: "manual",
      signal,
      headers: { "User-Agent": UA, Accept: "text/html,*/*" },
    });
    if (res.status < 300 || res.status >= 400 || !res.headers.get("location")) {
      return res;
    }
    const next = assertPublicHttpUrl(
      new URL(res.headers.get("location")!, current).toString(),
    );
    current = next;
  }
  throw new NewsFetchError("Çok fazla yönlendirme.");
}

export async function fetchArticle(rawUrl: string): Promise<FetchedArticle> {
  const u = assertPublicHttpUrl(rawUrl);

  let res: Response;
  try {
    res = await fetchFollowingSafeRedirects(u, AbortSignal.timeout(TIMEOUT_MS));
  } catch (e) {
    if (e instanceof NewsFetchError) throw e;
    const timedOut = e instanceof Error && e.name === "TimeoutError";
    throw new NewsFetchError(
      timedOut
        ? "Kaynak zaman aşımına uğradı. Metni elle yapıştırabilirsin."
        : "Kaynağa ulaşılamadı. Metni elle yapıştırabilirsin.",
    );
  }

  if (!res.ok) {
    throw new NewsFetchError(
      `Kaynak ${res.status} döndü — muhtemelen otomatik erişimi engelliyor. Metni elle yapıştır.`,
    );
  }
  const ctype = res.headers.get("content-type") || "";
  if (!/html|text\/plain/i.test(ctype)) {
    throw new NewsFetchError("Adres bir haber sayfası değil (HTML bekleniyordu).");
  }

  const buf = new Uint8Array(await res.arrayBuffer());
  if (buf.byteLength > MAX_BYTES) {
    throw new NewsFetchError("Kaynak sayfa çok büyük.");
  }
  const html = new TextDecoder("utf-8").decode(buf);

  const text = extractArticleText(html);
  if (text.replace(/\s/g, "").length < 400) {
    throw new NewsFetchError(
      "Sayfadan yeterince metin çıkmadı — muhtemelen bir liste/özet sayfası. Haberin detay sayfasının adresini ver ya da metni elle yapıştır.",
    );
  }

  const siteName = siteNameFrom(html, u);
  return {
    url: u.toString(),
    siteName,
    title: titleFrom(html, siteName),
    text: text.slice(0, 12_000),
  };
}
