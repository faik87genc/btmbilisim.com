import { indexNowKey } from "@/lib/indexNow";

// IndexNow key verification file (see lib/indexNow.ts). 404 until INDEXNOW_KEY
// is configured.
export const dynamic = "force-dynamic";

export function GET() {
  const key = indexNowKey();
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
