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
import { PageHero } from "@/components/ensa/PageHero";
import { BlogCard } from "@/components/ensa/BlogCard";

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
    openGraph: { type: "website", title, description, url, images: [DEFAULT_OG_IMAGE] },
  };
}

export function Pager({ page, total, hrefFor }: { page: number; total: number; hrefFor: (n: number) => string }) {
  if (total <= 1) return null;
  const keep = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total));
  const pages = [...keep].sort((a, b) => a - b);
  const arrow = (disabled: boolean) =>
    `flex h-9 w-9 items-center justify-center rounded-full border border-navy-950/10 text-slate-600 transition-colors hover:border-gold-500/40 hover:text-ink-900 ${
      disabled ? "pointer-events-none opacity-40" : ""
    }`;
  return (
    <nav aria-label="Sayfalar" className="mt-12 flex items-center justify-center gap-2">
      <Link href={hrefFor(Math.max(1, page - 1))} className={arrow(page <= 1)} aria-label="Önceki sayfa" aria-disabled={page <= 1}>
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Link>
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && pages[i - 1] !== p - 1 && (
            <span className="px-0.5 text-slate-500" aria-hidden="true">
              …
            </span>
          )}
          <Link
            href={hrefFor(p)}
            aria-current={p === page ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              p === page
                ? "bg-gold-500 text-navy-950"
                : "border border-navy-950/10 text-slate-600 hover:border-gold-500/40 hover:text-ink-900"
            }`}
          >
            {p}
          </Link>
        </span>
      ))}
      <Link
        href={hrefFor(Math.min(total, page + 1))}
        className={arrow(page >= total)}
        aria-label="Sonraki sayfa"
        aria-disabled={page >= total}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </nav>
  );
}

export async function BlogIndex({ pageNum }: { pageNum: number }) {
  const posts = await allPosts();
  const total = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const chunk = posts.slice((pageNum - 1) * PER_PAGE, pageNum * PER_PAGE);
  const tags = getAllTags(posts)
    .filter((t) => t.count >= MIN_TAG_COUNT)
    .slice(0, MAX_TAG_CHIPS);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <PageHero
        title="Bilişim ve güvenlik rehberi"
        eyebrow="Blog"
        lead="Siber güvenlik, ağ ve sistem altyapısı, yedekleme ve kamera sistemleri üzerine sahadan uygulamalı yazılar."
        crumbs={pageNum > 1 ? [{ text: "Blog", href: "/blog/" }, { text: `Sayfa ${pageNum}` }] : [{ text: "Blog" }]}
      />

      <section className="bg-paper-50 py-16 md:py-20">
        <Container>
          {pageNum === 1 && tags.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Link
                  key={t.slug}
                  href={`/blog/etiket/${t.slug}/`}
                  className="rounded-full border border-navy-950/10 bg-white px-3 py-1 text-sm text-slate-600 transition-colors hover:border-gold-500/40 hover:text-ink-900"
                >
                  {t.tag} <span className="text-slate-500">{t.count}</span>
                </Link>
              ))}
            </div>
          )}

          {chunk.length === 0 ? (
            <p className="text-sm text-slate-500">Henüz yayınlanmış yazı yok.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {chunk.map((p, i) => (
                <BlogCard key={p.id} post={p} delay={(i % 3) * 0.05} priority={i < 3} />
              ))}
            </div>
          )}

          <Pager page={pageNum} total={total} hrefFor={pageHrefFor} />
        </Container>
      </section>
    </>
  );
}
