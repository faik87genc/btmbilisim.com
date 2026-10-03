import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPages, getPagesByTagSlug, postLikePages } from "@/lib/pages";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE } from "@/lib/structuredData";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { BlogCard } from "@/components/ensa/BlogCard";

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
    // Small tag archives are thin near-duplicates of their posts.
    robots: matched.length < 5 ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title, description, url, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TagArchivePage({ params }: Props) {
  const { tag: slug } = await params;
  const { tag, pages: matched } = getPagesByTagSlug(postLikePages(await getPublishedPages()), slug);
  if (matched.length === 0) notFound();

  return (
    <>
      <PageHero
        title={`${tag} yazıları`}
        eyebrow="Etiket"
        lead={`${matched.length} yazı`}
        crumbs={[{ text: "Blog", href: "/blog/" }, { text: tag }]}
      />
      <section className="bg-paper-50 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matched.map((p, i) => (
              <BlogCard key={p.id} post={p} delay={(i % 3) * 0.05} priority={i < 3} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
