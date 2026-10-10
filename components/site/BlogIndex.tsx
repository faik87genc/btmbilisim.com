import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Page } from "@/lib/db/schema";
import { getAllTags, getPublishedPages, postLikePages } from "@/lib/pages";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, organizationJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/components/site/Parts";
import { Container } from "@/components/ensa/Container";
import { CtaBand, LightHero, PostGrid, TagFilters } from "@/components/site/ui";

// Blog index: 9 posts per page, page 1 at /blog/, later pages at
// /blog/sayfa-N/ (the old site's paging URLs).

const PER_PAGE = 9;
// Tag chips above the grid: the imported posts carry ~400 WordPress tags, so
// only the ones that group several posts are worth a chip.
const MAX_TAG_CHIPS = 16;
const MIN_TAG_COUNT = 3;
const BLOG_DESC =
  "Siber güvenlik, ağ altyapısı, sunucu, bulut yedekleme ve güvenlik kamerası sistemleri hakkında uygulamalı rehberler.";

async function allPosts(): Promise<Page[]> {
  return postLikePages(await getPublishedPages());
}

export async function blogPageCount(): Promise<number> {
  return Math.max(1, Math.ceil((await allPosts()).length / PER_PAGE));
}

function pageHrefFor(n: number): string {
  return n === 1 ? "/blog/" : `/blog/sayfa-${n}/`;
}

export function blogIndexMetadata(n: number): Metadata {
  const title = n > 1 ? `Blog - Sayfa ${n}${site.titleSuffix}` : `Blog: Bilişim ve Güvenlik Rehberi${site.titleSuffix}`;
  const description = n > 1 ? `${BLOG_DESC} (Sayfa ${n})` : BLOG_DESC;
  const url = absoluteUrl(pageHrefFor(n));
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title, description, url, images: [DEFAULT_OG_IMAGE] },
  };
}

export function Pager({ page, total, hrefFor }: { page: number; total: number; hrefFor: (n: number) => string }) {
  if (total <= 1) return null;
  const keep = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total));
  const pages = [...keep].sort((a, b) => a - b);
  const box =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-[10px] border px-3 text-sm font-semibold tabular-nums transition-colors";
  const idle = "border-slate-200 bg-white text-ink-900 hover:border-gold-600/40 hover:text-gold-700";
  const arrow = (disabled: boolean) =>
    `${box} gap-1.5 ${idle} ${disabled ? "pointer-events-none opacity-40" : ""}`;
  return (
    <nav aria-label="Sayfalar" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      <Link href={hrefFor(Math.max(1, page - 1))} className={arrow(page <= 1)} aria-disabled={page <= 1} tabIndex={page <= 1 ? -1 : undefined}>
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Önceki</span>
        <span className="visually-hidden sm:hidden">Önceki sayfa</span>
      </Link>
      <ol className="flex items-center gap-2">
        {pages.map((p, i) => (
          <li key={p} className="flex items-center gap-2">
            {i > 0 && pages[i - 1] !== p - 1 && (
              <span className="px-0.5 text-slate-500" aria-hidden="true">
                …
              </span>
            )}
            <Link
              href={hrefFor(p)}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Sayfa ${p}`}
              className={`${box} ${p === page ? "border-gold-600 bg-gold-600 text-white" : idle}`}
            >
              {p}
            </Link>
          </li>
        ))}
      </ol>
      <Link
        href={hrefFor(Math.min(total, page + 1))}
        className={arrow(page >= total)}
        aria-disabled={page >= total}
        tabIndex={page >= total ? -1 : undefined}
      >
        <span className="hidden sm:inline">Sonraki</span>
        <span className="visually-hidden sm:hidden">Sonraki sayfa</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </nav>
  );
}

/** The tag filter row: tags that group several posts, most used first. */
export function blogFilterTags(posts: Page[]) {
  return getAllTags(posts)
    .filter((t) => t.count >= MIN_TAG_COUNT)
    .slice(0, MAX_TAG_CHIPS);
}

export async function BlogIndex({ pageNum }: { pageNum: number }) {
  const posts = await allPosts();
  const total = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const chunk = posts.slice((pageNum - 1) * PER_PAGE, pageNum * PER_PAGE);
  const tags = blogFilterTags(posts);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <LightHero
        title="Bilişim ve güvenlik rehberi"
        eyebrow="Kaynaklar · Blog"
        lead="Siber güvenlik, ağ ve sistem altyapısı, yedekleme ve kamera sistemleri üzerine sahadan uygulamalı yazılar."
        crumbs={pageNum > 1 ? [{ text: "Blog", href: "/blog/" }, { text: `Sayfa ${pageNum}` }] : [{ text: "Blog" }]}
      >
        {tags.length > 0 && <TagFilters tags={tags} current={null} allIsPage={pageNum === 1} />}
      </LightHero>

      <section className="bg-white py-14 md:py-20" aria-labelledby="blog-list-title">
        <Container>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="blog-list-title" className="font-display text-xl font-semibold tracking-[-0.01em] text-navy-950">
              {pageNum > 1 ? `Tüm yazılar · Sayfa ${pageNum}` : "En güncel yazılar"}
            </h2>
            <p className="text-sm tabular-nums text-slate-500">
              {posts.length} yazı · Sayfa {pageNum}/{total}
            </p>
          </div>
          {chunk.length === 0 ? (
            <p className="text-sm text-slate-500">Henüz yayınlanmış yazı yok.</p>
          ) : (
            <PostGrid posts={chunk} priorityCount={3} />
          )}

          <Pager page={pageNum} total={total} hrefFor={pageHrefFor} />
        </Container>
      </section>

      <CtaBand
        title="Altyapınız için bir yol haritası mı arıyorsunuz?"
        lead="Yazılarda anlattıklarımızı sahada uyguluyoruz. Mevcut durumunuzu birlikte inceleyelim; ilk görüşme ve keşif ücretsizdir."
        secondary={{ label: "Hizmetlerimiz", href: "/hizmetler/" }}
      />
    </>
  );
}
