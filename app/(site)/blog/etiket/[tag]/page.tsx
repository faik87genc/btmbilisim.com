import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPages, getPagesByTagSlug, postLikePages } from "@/lib/pages";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE } from "@/lib/structuredData";
import { Container } from "@/components/ensa/Container";
import { blogFilterTags } from "@/components/site/BlogIndex";
import { CtaBand, LightHero, PostGrid, TagFilters } from "@/components/site/ui";

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
  const posts = postLikePages(await getPublishedPages());
  const { tag, pages: matched } = getPagesByTagSlug(posts, slug);
  if (matched.length === 0) notFound();

  // The filter row of the blog index; the current tag joins it when it is
  // not one of the most used ones, so the active filter is always visible.
  const filters = blogFilterTags(posts);
  if (!filters.some((t) => t.slug === slug)) filters.push({ tag, slug, count: matched.length });

  return (
    <>
      <LightHero
        title={`${tag} yazıları`}
        eyebrow="Kaynaklar · Etiket"
        lead={`${matched.length} yazı`}
        crumbs={[{ text: "Blog", href: "/blog/" }, { text: tag }]}
      >
        <TagFilters tags={filters} current={slug} />
      </LightHero>
      <section className="bg-white py-14 md:py-20">
        <Container>
          <PostGrid posts={matched} priorityCount={3} />
        </Container>
      </section>
      <CtaBand
        title="Bu konuda yerinde destek ister misiniz?"
        lead="Altyapınızı birlikte inceleyelim, önceliklendirilmiş bir eylem planı çıkaralım. İlk görüşme ve keşif ücretsizdir."
        secondary={{ label: "Tüm yazılar", href: "/blog/" }}
      />
    </>
  );
}
