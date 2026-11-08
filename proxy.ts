import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isKnownSlug } from "@/lib/slugGuard";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

// Hotlink protection: other sites may not embed our images (the optimizer's
// /_next/image/ and the static /assets/img/ and /wp-content/uploads/ files) in their own pages.
// No Referer (direct visit, crawlers, social-card fetchers, privacy browsers)
// is always allowed; so are this site, its Vercel previews, local dev, and
// search engines / social apps whose image previews link back to us.
// Raw Vercel Blob URLs are served by Vercel's CDN and can't be covered here.
const ALLOWED_REFERRER_HOST =
  /(^|\.)btmbilisim\.com$|btm.*\.vercel\.app$|^localhost$|^127\.0\.0\.1$|(^|\.)(google|bing|yandex|duckduckgo|yahoo|ecosia|qwant|baidu|facebook|linkedin|lnkd|twitter|x|t|whatsapp|telegram|instagram|feedly|inoreader)\.(com|net|org|co|me|ru|[a-z]{2}|com?\.[a-z]{2})$/i;

function isHotlink(request: NextRequest): boolean {
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    const host = new URL(referer).hostname;
    return host !== request.nextUrl.hostname && !ALLOWED_REFERRER_HOST.test(host);
  } catch {
    return false;
  }
}

// Scanner/bot probes (/wp-login.php, /.env, ...) and unknown slugs used to
// reach the ISR-cached [slug] route, render a 404 and get that 404 stored in
// the ISR cache — one cache write per distinct URL, which exhausted Vercel's
// 200k ISR writes/month. Answer them here, uncached, before the router.
const JUNK_PATH =
  /(^|\/)(wp-|wordpress|xmlrpc|cgi-bin|phpmyadmin|phpinfo|\.git|\.env|\.aws|\.ssh|vendor\/|server-status|actuator|owa\/|autodiscover)|\.(php\d?|asp|aspx|jsp|cgi|env|bak|sql|zip|rar|tar|gz|7z|ini|ya?ml|conf|config|log|old|swp|git)(\/|$)/i;
const STATIC_FILE_EXT = /\.(jpe?g|png|webp|avif|svg|gif|ico|woff2?|ttf|css|js|map|mp4|webm|pdf)$/i;
const ALLOWED_FILE =
  /^\/(sitemap\.xml|feed\.xml|robots\.txt|llms\.txt|llms-full\.txt|indexnow-key\.txt|google[a-z0-9]+\.html)\/?$/;
const CLEAN_SLUG_PATH = /^\/[a-z0-9\-_/]*$/;
// Top-level routes that exist as real folders under app/ (never slugs).
const STATIC_ROUTES = new Set([
  "blog", "iletisim", "anasayfa-2", "bulut-yedekleme", "danismanlik", "ekibimiz", "hizmetler",
  "lisanslama", "referanslar", "risk-skoru-testi", "siber-guvenlik", "sistem-network",
  "yazilim-dijital", "yazilim-urunlerimiz", "etiket", "admin", "api", "sitemap", "feed",
]);

function isJunk(pathname: string): boolean {
  if (ALLOWED_FILE.test(pathname) || STATIC_FILE_EXT.test(pathname)) return false;
  if (JUNK_PATH.test(pathname)) return true;
  return !CLEAN_SLUG_PATH.test(pathname);
}

const NOT_FOUND = () =>
  new NextResponse("Not found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=60" },
  });

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const skip =
    pathname.startsWith("/admin") || pathname.startsWith("/_next/") || pathname.startsWith("/api/");
  if (!skip && isJunk(pathname)) return NOT_FOUND();

  // Unknown slug (/<slug>/ or /blog/<slug>/): 404 here, not a cached 404 page.
  // Draft Mode previews bypass the check.
  const slugMatch = /^\/(?:blog\/)?([a-z0-9][a-z0-9_-]*)\/?$/.exec(pathname);
  if (
    !skip &&
    slugMatch &&
    !STATIC_ROUTES.has(slugMatch[1]) &&
    !/^sayfa-\d+$/.test(slugMatch[1]) &&
    !request.cookies.has("__prerender_bypass") &&
    !(await isKnownSlug(slugMatch[1]))
  ) {
    return NOT_FOUND();
  }

  if (!pathname.startsWith("/admin")) {
    const isImage = pathname.startsWith("/_next/image") || pathname.startsWith("/assets/img/") || pathname.startsWith("/wp-content/uploads/");
    return isImage && isHotlink(request)
      ? new NextResponse("Bu görsel yalnızca btmbilisim.com üzerinde gösterilebilir.", {
          status: 403,
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
        })
      : NextResponse.next();
  }

  // trailingSlash is on (next.config.ts), so the login page is /admin/login/.
  if (pathname.replace(/\/+$/, "") === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!verifySessionToken(token)) {
    return NextResponse.redirect(new URL("/admin/login/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
