import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPages, getPagesByTagSlug, postLikePages } from "@/lib/pages";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE } from "@/lib/structuredData";
import { toCard } from "@/components/site/BlogIndex";
import { Breadcrumbs, PostCard } from "@/components/site/Parts";

export const revalidate = 300;

// ISR on demand: nothing prerendered at build time, each tag page is cached
// after its first render (without this the route rendered on every request).
export async function generateStaticParams(): Promise<{ tag: string }[]> {
  return [];
}

type Props = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: slug } = await params;
  const { tag, pages: matched } = getPagesByTagSlug(postLikePages(await getPublishedPages()), slug);
  if (matched.length === 0) return {};
  const title = `${tag} Yazıları${site.titleSuffix}`;
  const description = `${tag} konusunda ${matched.length} rehber ve yazı: BTM Bilişim'den uygulamalı bilişim ve güvenlik rehberleri.`;
  const url = absoluteUrl(`/blog/etiket/${slug}/`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TagArchivePage({ params }: Props) {
  const { tag: slug } = await params;
  const { tag, pages: matched } = getPagesByTagSlug(postLikePages(await getPublishedPages()), slug);
  if (matched.length === 0) notFound();

  return (
    <>
      <Breadcrumbs crumbs={[{ text: "Blog", href: "/blog/" }, { text: tag }]} />
      <main id="main" tabIndex={-1}>
        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Etiket</span>
              <h1>{tag} Yazıları</h1>
            </div>
            <div className="grid grid-3">
              {matched.map((p, i) => (
                <PostCard key={p.id} post={toCard(p)} priority={i === 0} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
