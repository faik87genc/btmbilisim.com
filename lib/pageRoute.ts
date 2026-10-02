import type { Metadata } from "next";
import { cache } from "react";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { pages, type Page } from "@/lib/db/schema";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { getPublishedPages, isPageLive, pageHref, postLikePages } from "@/lib/pages";
import { fallbackPages } from "@/lib/fallbackPages";
import { DEFAULT_OG_IMAGE, pageDates } from "@/lib/structuredData";
import { absoluteUrl, documentTitle, isPost, relatedPosts } from "@/lib/siteView";

// Shared lookup + metadata for content. Every page and post renders at the
// flat /[slug]/ route (kind "page" = core pages + migrated articles, kind
// "blog" = admin-written posts); /blog/[slug]/ only 301s old post URLs there.

export type Resolved =
  | { kind: "found"; page: Page; draft: boolean }
  | { kind: "redirect"; to: string }
  | { kind: "none" };

export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export const resolveContent = cache(async function resolveContent(
  kind: Page["kind"] | "any",
  slug: string,
  allowDraft: boolean,
): Promise<Resolved> {
  const rows = await db
    .select()
    .from(pages)
    .where(eq(pages.slug, slug))
    .catch(() => null);
  if (rows === null) {
    // DB unreachable: serve the static-site copy (published rows only).
    const page = fallbackPages().find((p) => (kind === "any" || p.kind === kind) && p.slug === slug);
    return page ? { kind: "found", page, draft: false } : { kind: "none" };
  }
  const row = rows.find((r) => kind === "any" || r.kind === kind);
  if (row) {
    if (isPageLive(row)) return { kind: "found", page: row, draft: false };
    if (allowDraft) return { kind: "found", page: row, draft: true };
  }

  // Old URL? 301 to the current slug.
  const moved = await db
    .select({
      slug: pages.slug,
      slugHistory: pages.slugHistory,
      kind: pages.kind,
      published: pages.published,
      publishedAt: pages.publishedAt,
    })
    .from(pages)
    .catch(() => []);
  const hit = moved.find(
    (p) => (kind === "any" || p.kind === kind) && p.slugHistory.includes(slug) && isPageLive(p),
  );
  if (hit) return { kind: "redirect", to: pageHref(hit) };

  return { kind: "none" };
});

export function contentMetadata(page: Page): Metadata {
  const title = documentTitle(page);
  const description = page.metaDescription || page.excerpt;
  const image = page.ogImageUrl || page.coverImageUrl;
  const url = absoluteUrl(pageHref(page));
  const post = isPost(page);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: page.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: post ? "article" : "website",
      title,
      description,
      url,
      images: [image ? absoluteUrl(image) : DEFAULT_OG_IMAGE],
      ...(post
        ? {
            publishedTime: pageDates(page).published.toISOString(),
            modifiedTime: pageDates(page).modified.toISOString(),
          }
        : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export async function relatedFor(page: Page): Promise<Page[]> {
  if (!isPost(page)) return [];
  return relatedPosts(postLikePages(await getPublishedPages()), page);
}

export function draftNote(page: Page): string {
  const at = page.publishedAt;
  if (page.published && at && at.getTime() > Date.now()) {
    return `Zamanlanmış — ${at.toLocaleString("tr-TR", { dateStyle: "long", timeStyle: "short" })} itibarıyla otomatik yayınlanacak.`;
  }
  return "Taslak önizleme — bu sayfa henüz yayında değil.";
}
