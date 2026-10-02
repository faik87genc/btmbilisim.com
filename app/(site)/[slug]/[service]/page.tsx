import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { GlobeBands } from "@/components/ensa/GlobeBands";
import { MarkdownRenderer } from "@/components/ensa/MarkdownRenderer";
import { FaqSection } from "@/components/ensa/FaqSection";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { Button } from "@/components/ensa/Button";
import { JsonLd } from "@/components/site/Parts";
import { serviceCategories } from "@/lib/services";
import { getServicePageContent, servicePageParams, servicePagesContent } from "@/lib/servicePages";
import { getPublishedPages, pageHref, postLikePages } from "@/lib/pages";
import { slugifyTr } from "@/lib/slug";
import { absoluteUrl } from "@/lib/siteView";
import { site } from "@/lib/site";
import type { Page } from "@/lib/db/schema";

// Sub-service detail pages (/{category}/{service}/), content from
// lib/servicePages.ts. The first segment is named `slug` only because Next
// requires one dynamic name per level and /[slug]/ already serves pages.

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePageParams().map(({ category, service }) => ({ slug: category, service }));
}

type Params = Promise<{ slug: string; service: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug: category, service } = await params;
  const page = getServicePageContent(category, service);
  if (!page) return {};
  const url = absoluteUrl(`/${category}/${service}/`);
  return {
    title: `${page.title}${site.titleSuffix}`,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: "website", title: page.title, description: page.metaDescription, url },
  };
}

const STOP = new Set(["ve", "ile", "icin", "hizmetleri", "hizmeti", "cozumleri", "danismanligi", "yonetimi"]);
const tokens = (s: string) => new Set(slugifyTr(s).split("-").filter((t) => t.length > 2 && !STOP.has(t)));

/** Posts that share the most words with the service title (at least one). */
function relatedPostsFor(posts: Page[], title: string, limit = 4): Page[] {
  const want = tokens(title);
  return posts
    .map((p) => {
      const have = tokens([p.title, ...p.tags].join(" "));
      let score = 0;
      for (const w of want) if (have.has(w)) score++;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug: category, service } = await params;
  const page = getServicePageContent(category, service);
  const categoryInfo = serviceCategories[category];
  if (!page || !categoryInfo) notFound();

  const relatedSlugByKey = new Map<string, string>();
  for (const entry of servicePagesContent) {
    if (entry.categorySlug === category) relatedSlugByKey.set(entry.serviceKey, entry.slug);
  }
  const relatedServices = categoryInfo.services
    .filter((s) => s.key !== service && relatedSlugByKey.has(s.key))
    .slice(0, 5)
    .map((s) => ({ ...s, slug: relatedSlugByKey.get(s.key)! }));

  const relatedPosts = relatedPostsFor(postLikePages(await getPublishedPages()), page.title);

  const url = absoluteUrl(`/${category}/${service}/`);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: categoryInfo.shortTitle, item: absoluteUrl(`/${category}/`) },
      { "@type": "ListItem", position: 3, name: page.title },
    ],
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    url,
    serviceType: page.title,
    areaServed: "TR",
    provider: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: site.name, url: absoluteUrl("/") },
    category: categoryInfo.shortTitle,
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={serviceJsonLd} />

      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <GlobeBands className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] text-gold-500/15" />
        <Container className="relative max-w-3xl">
          <nav
            aria-label="İçerik yolu"
            className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold-300"
          >
            <Link href="/" className="hover:text-gold-100">
              Ana Sayfa
            </Link>
            <ChevronRight className="h-3 w-3 text-gold-300/50" aria-hidden="true" />
            <Link href={`/${category}/`} className="hover:text-gold-100">
              {categoryInfo.shortTitle}
            </Link>
            <ChevronRight className="h-3 w-3 text-gold-300/50" aria-hidden="true" />
            <span className="text-slate-300">{page.title}</span>
          </nav>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-paper-50 md:text-5xl">
            {page.title}
          </h1>
          <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">{page.metaDescription}</p>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container className="max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
            <div className="min-w-0">
              <MarkdownRenderer content={page.content} />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-sm border border-navy-950/10 bg-white p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">Hemen Başlayalım</p>
                <h2 className="mt-3 font-display text-xl font-semibold text-ink-900">Bu hizmeti konuşalım</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Ekibimiz ihtiyacınızı ve uygunluk durumunuzu ilk görüşmede netleştirir.
                </p>
                <Button href="/iletisim/" variant="primary" className="mt-5 w-full">
                  Görüşme Talep Edin
                </Button>
                <div className="mt-6 space-y-3 border-t border-navy-950/10 pt-5 text-sm">
                  <a href={site.phone.href} className="flex items-center gap-3 text-ink-900 transition-colors hover:text-gold-700">
                    <Phone className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                    {site.phone.display}
                  </a>
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-ink-900 transition-colors hover:text-gold-700"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                    WhatsApp
                  </a>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all text-ink-900 transition-colors hover:text-gold-700">
                    <Mail className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                    {site.email}
                  </a>
                </div>
              </div>

              {relatedServices.length > 0 && (
                <div className="rounded-sm border border-navy-950/10 bg-white p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">{categoryInfo.shortTitle}</p>
                  <h2 className="mt-3 font-display text-base font-semibold text-ink-900">İlgili hizmetler</h2>
                  <ul className="mt-4 space-y-3">
                    {relatedServices.map((s) => (
                      <li key={s.key}>
                        <Link href={`/${category}/${s.slug}/`} className="group flex items-center justify-between gap-3">
                          <span className="text-sm text-slate-600 transition-colors group-hover:text-ink-900">{s.name}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gold-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${category}/`}
                    className="mt-5 inline-block text-xs font-medium uppercase tracking-wider text-gold-800 hover:text-gold-600"
                  >
                    Tüm {categoryInfo.shortTitle} Hizmetleri →
                  </Link>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div className="rounded-sm border border-navy-950/10 bg-white p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">Blog</p>
                  <h2 className="mt-3 font-display text-base font-semibold text-ink-900">İlgili yazılar</h2>
                  <ul className="mt-4 space-y-3">
                    {relatedPosts.map((p) => (
                      <li key={p.id}>
                        <Link href={pageHref(p)} className="group flex items-start justify-between gap-3">
                          <span className="text-sm leading-snug text-slate-600 transition-colors group-hover:text-ink-900">{p.title}</span>
                          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/blog/" className="mt-5 inline-block text-xs font-medium uppercase tracking-wider text-gold-800 hover:text-gold-600">
                    Tüm Yazıları Gör →
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>

      {page.faq.length > 0 && <FaqSection items={page.faq} />}

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="Bu hizmeti kurumunuz için değerlendirelim."
            description="Ekibimiz, uygunluk durumunuzu ve süreç adımlarını ilk görüşmede netleştirir."
          />
          <div className="mt-8 flex justify-center">
            <Button href="/iletisim/" variant="primary">
              Görüşme Talep Edin
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
