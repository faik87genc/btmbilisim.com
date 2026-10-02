import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return isHotlink(request)
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
  matcher: ["/admin/:path*", "/_next/image/:path*", "/assets/img/:path*", "/wp-content/uploads/:path*"],
};
