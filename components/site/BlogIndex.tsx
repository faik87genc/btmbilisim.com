import type { Metadata } from "next";
import Link from "next/link";
import type { Page } from "@/lib/db/schema";
import { getPublishedPages, pageHref, postLikePages } from "@/lib/pages";
import { site } from "@/lib/site";
import { absoluteUrl, postTag } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, organizationJsonLd } from "@/lib/structuredData";
import { Breadcrumbs, JsonLd, PostCard, type CardPost } from "@/components/site/Parts";

// Port of _legacy-static-site/templates/blog_index.html: 9 posts per page,
// page 1 at /blog/, later pages at /blog/sayfa-N/.

const PER_PAGE = 9;
const BLOG_DESC =
  "ISO 27001, KVKK ve siber güvenlik hakkında uzman rehberler, güncel mevzuat analizleri ve pratik tavsiyeler.";

export function toCard(p: Page): CardPost {
  return { href: pageHref(p), title: p.title, excerpt: p.excerpt, heroImg: p.coverImageUrl, tag: postTag(p) };
}

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
  const title = n > 1 ? `Blog - Sayfa ${n}${site.titleSuffix}` : `Bilgi Güvenliği Blogu${site.titleSuffix}`;
  const description = n > 1 ? `${BLOG_DESC} (Sayfa ${n})` : BLOG_DESC;
  const url = absoluteUrl(pageHrefFor(n));
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url, images: [DEFAULT_OG_IMAGE] },
  };
}

export async function BlogIndex({ pageNum }: { pageNum: number }) {
  const posts = await allPosts();
  const total = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const chunk = posts.slice((pageNum - 1) * PER_PAGE, pageNum * PER_PAGE);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Breadcrumbs crumbs={[{ text: "Blog" }]} />
      <main id="main" tabIndex={-1}>
        <section className="section-navy" style={{ padding: "56px 0" }}>
          <div className="wrap text-center">
            <span className="eyebrow" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}>
              Bilgi Güvenliği Rehberi
            </span>
            <h1>ISO 27001, KVKK ve Siber Güvenlik Blogu</h1>
            <p style={{ color: "#c9d3f2", maxWidth: 640, margin: "0 auto" }}>
              Bilgi güvenliği yönetim sistemi, sızma testi ve KVKK uyumu hakkında uzman rehberler, güncel mevzuat
              analizleri ve pratik tavsiyeler.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            {chunk.length === 0 ? (
              <p className="text-center">Henüz yayınlanmış yazı yok.</p>
            ) : (
              <div className="grid grid-3">
                {/* The first card is the mobile LCP element. */}
                {chunk.map((p, i) => (
                  <PostCard key={p.id} post={toCard(p)} priority={i === 0} />
                ))}
              </div>
            )}

            {total > 1 && (
              <div className="pagination">
                {pageNum > 1 && <Link href={pageHrefFor(pageNum - 1)}>‹</Link>}
                {Array.from({ length: total }, (_, i) => i + 1).map((n) =>
                  n === pageNum ? (
                    <span key={n} className="active">
                      {n}
                    </span>
                  ) : (
                    <Link key={n} href={pageHrefFor(n)}>
                      {n}
                    </Link>
                  ),
                )}
                {pageNum < total && <Link href={pageHrefFor(pageNum + 1)}>›</Link>}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
