import "server-only";
import { isRetiredSlug } from "@/lib/legacyRedirects";
import { getPublishedPages, postLikePages } from "@/lib/pages";
import {
  CODED_PAGES,
  MIN_MONEY_LINKS,
  MONEY_PAGES,
  MONEY_PAGE_SLUGS,
  rankLinkTargets,
  type LinkTarget,
} from "./linkTargets";

export type { LinkTarget } from "./linkTargets";

/**
 * Every live, indexable page the writer may link to — core/service pages AND
 * articles (migrated guides + admin posts), all at their flat /slug/ URL.
 */
export async function liveLinkTargets(): Promise<LinkTarget[]> {
  // Redirected / shadowed rows would only produce links to 301s.
  const all = (await getPublishedPages()).filter((p) => !p.noindex && !isRetiredSlug(p.slug));
  const postSlugs = new Set(postLikePages(all).map((p) => p.slug));
  return all.map((p) => ({
    slug: p.slug,
    title: p.title,
    kind: postSlugs.has(p.slug) ? ("article" as const) : ("service" as const),
    tags: p.tags,
  }));
}

/**
 * A compact catalogue of real internal pages the model may link to, so drafts
 * contain genuine internal links instead of invented URLs. Money pages
 * (BTM service pages) come first as the mandatory
 * link targets; other core pages are listed in full (they are few); articles
 * are ranked by topical overlap with the brief and capped, which keeps the
 * prompt short (faster, cheaper) and the suggestions relevant.
 */
export function internalLinkCatalogue(
  targets: LinkTarget[],
  brief: string,
  maxArticles = 30,
): string {
  const bySlug = new Map(targets.map((t) => [t.slug, t]));
  const money = MONEY_PAGES.filter((m) => bySlug.has(m.slug) || CODED_PAGES.has(m.slug)).map((m) => ({
    ...m,
    title: bySlug.get(m.slug)?.title ?? CODED_PAGES.get(m.slug)!,
  }));
  const services = targets.filter(
    (t) => t.kind === "service" && !MONEY_PAGE_SLUGS.has(t.slug),
  );
  const articles = rankLinkTargets(
    targets.filter((t) => t.kind === "article"),
    brief,
  ).slice(0, maxArticles);

  const lines: string[] = [];
  lines.push(
    `PARA SAYFALARI — HİZMET (en az ${MIN_MONEY_LINKS} FARKLI tanesine metnin içinde, bağlamıyla link ZORUNLU):`,
  );
  for (const m of money) lines.push(`- /${m.slug}/ — ${m.title} [${m.group}]`);
  lines.push("");
  lines.push("DİĞER ANA SAYFALAR:");
  for (const p of services) lines.push(`- /${p.slug}/ — ${p.title}`);
  lines.push("");
  lines.push("KONUYLA İLGİLİ MEVCUT YAZILAR (en ilgili olanlar üstte):");
  for (const p of articles) lines.push(`- /${p.slug}/ — ${p.title}`);
  lines.push("");
  lines.push("HİZMET DETAY SAYFALARI (konuyla ilgiliyse link verilebilir):");
  for (const [path, title] of CODED_PAGES) {
    if (path.includes("/") && !money.some((m) => m.slug === path)) lines.push(`- /${path}/ — ${title}`);
  }
  lines.push("");
  lines.push("TEKLİF / İLETİŞİM: /#teklif (teklif formu), /iletisim/ (iletişim)");
  return lines.join("\n");
}
