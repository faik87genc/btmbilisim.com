import "server-only";
import { site } from "@/lib/site";

// IndexNow (https://www.indexnow.org): tells Bing, Yandex, Seznam, Naver and
// other participating engines that a URL changed, so a new post is crawled in
// minutes instead of whenever the sitemap is next fetched. Google does not
// take part; for Google the sitemap + RSS feed + internal links do this job.
//
// Off unless INDEXNOW_KEY is set (8–128 characters: letters, digits, "-").
// The key is public by design: it is served at /indexnow-key.txt
// (app/indexnow-key.txt/route.ts) so the engines can verify the host.

export const INDEXNOW_KEY_PATH = "/indexnow-key.txt";

export function indexNowKey(): string | null {
  const key = process.env.INDEXNOW_KEY?.trim();
  return key && /^[A-Za-z0-9-]{8,128}$/.test(key) ? key : null;
}

/** Submit absolute URLs on this host. Never throws; failures are only logged. */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  const key = indexNowKey();
  const urlList = [...new Set(urls)].filter((u) => u.startsWith(`${site.baseUrl}/`));
  if (!key || urlList.length === 0) return;
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(site.baseUrl).host,
        key,
        keyLocation: `${site.baseUrl}${INDEXNOW_KEY_PATH}`,
        urlList,
      }),
      signal: AbortSignal.timeout(8000),
    });
    // 200 OK / 202 Accepted are both success.
    if (!res.ok) console.error(`IndexNow: HTTP ${res.status}`, await res.text().catch(() => ""));
  } catch (e) {
    console.error("IndexNow: gönderilemedi", e);
  }
}
