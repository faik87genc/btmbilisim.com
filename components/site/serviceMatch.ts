import { servicePagesContent } from "@/lib/servicePages";
import { serviceCategories } from "@/lib/services";
import { slugifyTr } from "@/lib/slug";

// Word-overlap matching between posts and service pages (Turkish-aware ASCII
// tokens; filler words such as "ve", "hizmetleri" ignored). Used for the
// "relevant service" link of an article and the related posts of a service.

const STOP = new Set(["ve", "ile", "icin", "hizmetleri", "hizmeti", "cozumleri", "danismanligi", "yonetimi", "nedir", "nasil", "rehberi"]);

export function tokens(s: string): Set<string> {
  return new Set(
    slugifyTr(s)
      .split("-")
      .filter((t) => t.length > 2 && !STOP.has(t)),
  );
}

function overlap(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const w of a) if (b.has(w)) n++;
  return n;
}

/** The service page whose title shares the most words with the post, if any. */
export function serviceForPost(post: { title: string; tags: string[] }): { label: string; href: string } | null {
  const have = tokens([post.title, ...post.tags].join(" "));
  let best: { score: number; label: string; href: string } | null = null;
  for (const e of servicePagesContent) {
    const score = overlap(tokens(e.title), have);
    if (score > 0 && (!best || score > best.score)) {
      best = { score, label: e.title, href: `/${e.categorySlug}/${e.slug}/` };
    }
  }
  if (best) return { label: best.label, href: best.href };
  // No direct hit: the category whose name or services match best.
  for (const c of Object.values(serviceCategories)) {
    if (overlap(tokens([c.title, ...c.services.map((s) => s.name)].join(" ")), have) > 0) {
      return { label: c.shortTitle, href: `/${c.slug}/` };
    }
  }
  return null;
}
