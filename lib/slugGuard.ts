import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { fallbackPages } from "@/lib/fallbackPages";

// Does a one-segment URL (/<slug>/ or /blog/<slug>/) belong to a page we
// know? Used by proxy.ts to answer unknown slugs with a plain 404 BEFORE they
// reach the ISR-cached [slug] route: every distinct bot-probed URL that
// rendered a 404 there was a separate ISR cache write, which exhausted
// Vercel's free 200k writes/month.
//
// The set is kept in module memory per server instance: refreshed every 5
// minutes, and at most once a minute when a miss suggests a brand-new post.
// Any DB failure answers "known" so a Neon outage never turns real pages
// into 404s (the page itself then falls back as before).
const TTL_MS = 5 * 60_000;
const MISS_REFRESH_MS = 60_000;

let known: Set<string> | null = null;
let loadedAt = 0;
let loading: Promise<void> | null = null;

async function load(): Promise<void> {
  const rows = await db
    .select({ slug: pages.slug, slugHistory: pages.slugHistory })
    .from(pages);
  const next = new Set<string>();
  for (const r of rows) {
    next.add(r.slug);
    for (const s of r.slugHistory) next.add(s);
  }
  for (const p of fallbackPages()) next.add(p.slug);
  known = next;
  loadedAt = Date.now();
}

function refresh(): Promise<void> {
  loading ??= load().finally(() => {
    loading = null;
  });
  return loading;
}

export async function isKnownSlug(slug: string): Promise<boolean> {
  try {
    const age = Date.now() - loadedAt;
    if (!known || age > TTL_MS) await refresh();
    if (known!.has(slug)) return true;
    if (Date.now() - loadedAt > MISS_REFRESH_MS) {
      await refresh();
      return known!.has(slug);
    }
    return false;
  } catch {
    return true;
  }
}
