import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Headphones, Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { FaqSection } from "@/components/ensa/FaqSection";
import { WhyBtm } from "@/components/ensa/WhyBtm";
import { JsonLd } from "@/components/site/Parts";
import { SiteMarkdown } from "@/components/site/SiteMarkdown";
import { CtaBand, PostGrid, SectionHead } from "@/components/site/ui";
import { HeroPanel, InkHero, LinkCard, ProcessSteps, ScopeCards } from "@/components/site/ServiceParts";
import { serviceBlocks } from "@/components/site/serviceContent";
import { serviceCategories } from "@/lib/services";
import { serviceIcon } from "@/lib/serviceIcons";
import { getServicePageContent, servicePageParams, servicePagesContent } from "@/lib/servicePages";
import { getPublishedPages, postLikePages } from "@/lib/pages";
import { extractHeadings } from "@/lib/markdownStructure";
import { slugifyTr } from "@/lib/slug";
import { absoluteUrl, ogMeta } from "@/lib/siteView";
import { site } from "@/lib/site";
import type { Page } from "@/lib/db/schema";
import { serviceWhatsAppHref } from "@/lib/contact";

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
    title: { absolute: page.metaTitle ?? titleFor(page.title) },
    description: page.metaDescription,
    alternates: { canonical: url },
    ...ogMeta({ title: page.title, description: page.metaDescription, path: `/${category}/${service}/` }),
  };
}

// "<Hizmet> | BTM Bilişim": titles name no single district — the service
// area (Gebze, Tuzla, Kocaeli, İstanbul) lives in descriptions and schema.
function titleFor(title: string): string {
  return `${title}${site.titleSuffix}`;
}

const STOP = new Set(["ve", "ile", "icin", "hizmetleri", "hizmeti", "cozumleri", "danismanligi", "yonetimi"]);
const tokens = (s: string) => new Set(slugifyTr(s).split("-").filter((t) => t.length > 2 && !STOP.has(t)));

/** Up to five items of the page's scope section (an H2 containing "kapsam"):
 * its bullets, or its H3 headings when the section is split into subsections.
 * Falls back to the first bullet list. Plain text, for the hero card. */
function scopeItems(md: string, limit = 5): string[] {
  const clean = (t: string) =>
    t.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*\*|__/g, "").replace(/^\d+\.\s*/, "").trim();
  const lines = md.split("\n");
  const start = lines.findIndex((l) => /^## /.test(l) && /kapsam/i.test(l));
  const section: string[] = [];
  if (start >= 0) {
    for (const l of lines.slice(start + 1)) {
      if (/^## /.test(l)) break;
      section.push(l);
    }
  }
  const pick = (src: string[], re: RegExp) => src.map((l) => l.match(re)?.[1]).filter((x): x is string => !!x).map(clean);
  let items = pick(section, /^[-*] (.+)/);
  if (items.length === 0) items = pick(section, /^### (.+)/);
  if (items.length === 0) items = pick(lines, /^[-*] (.+)/);
  return items.slice(0, limit);
}

/** Posts that share the most words with the service title (at least one). */
function relatedPostsFor(posts: Page[], title: string, limit = 3): Page[] {
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
  // Sidebar links: the page's own list when it has one, else siblings.
  const relatedServices = page.related
    ? page.related.flatMap((path) => {
        const [cat, key] = path.split("/");
        const hit = serviceCategories[cat]?.services.find((s) => s.key === key);
        const entry = servicePagesContent.find((e) => e.categorySlug === cat && e.serviceKey === key);
        return hit && entry ? [{ ...hit, href: `/${cat}/${entry.slug}/` }] : [];
      })
    : categoryInfo.services
        .filter((s) => s.key !== service && relatedSlugByKey.has(s.key))
        .slice(0, 5)
        .map((s) => ({ ...s, href: `/${category}/${relatedSlugByKey.get(s.key)!}/` }));

  const scope = scopeItems(page.content);
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
    areaServed: site.areaServed.map((a) => ({ "@type": a.type, name: a.name })),
    "@id": `${url}#service`,
    provider: {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": absoluteUrl("/#organization"),
      name: site.name,
      url: absoluteUrl("/"),
      telephone: site.phone.href.replace("tel:", ""),
      address: { "@type": "PostalAddress", ...site.postalAddress },
    },
    category: categoryInfo.shortTitle,
  };

  // Body blocks: the scope section as cards, the process as numbered steps,
  // the rest as the reading column — headings and text unchanged, same order.
  const blocks = serviceBlocks(page.content);
  const h2s = extractHeadings(page.content).filter((h) => h.level === 2);
  const h2Ids = new Map(h2s.map((h) => [h.text, h.id]));
  const idFor = (heading: string) =>
    h2Ids.get(
      heading
        .replace(/\*\*|__|`/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .trim(),
    ) ?? slugifyTr(heading);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={serviceJsonLd} />

      <InkHero
        crumbs={[{ text: categoryInfo.shortTitle, href: `/${category}/` }, { text: page.title }]}
        eyebrow={categoryInfo.shortTitle}
        title={page.title}
        lead={page.metaDescription}
        service={page.title}
        aside={
          scope.length > 0 ? (
            <HeroPanel
              label="Hizmet kapsamı"
              items={scope.map((text) => ({ text }))}
              footer={<>Ücretsiz keşif · 7/24 teknik destek · {site.areaLabel}</>}
            />
          ) : undefined
        }
      />

      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
            <div className="min-w-0">
              {blocks.map((b, i) =>
                b.kind === "prose" ? (
                  <div key={i} className={`markdown-content prose-v2 ${i > 0 ? "mt-14 [&>h2:first-child]:mt-0" : ""}`}>
                    <SiteMarkdown content={b.md} />
                  </div>
                ) : b.kind === "scope" ? (
                  <ScopeCards key={i} id={idFor(b.heading)} heading={b.heading} lead={b.lead} items={b.items} />
                ) : (
                  <ProcessSteps key={i} id={idFor(b.heading)} heading={b.heading} lead={b.lead} items={b.items} />
                ),
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
              {h2s.length >= 3 && (
                <nav aria-label="Bu sayfada" className="hidden lg:block">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Bu sayfada</p>
                  <ol className="toc-v2 max-h-[40vh] space-y-0.5 overflow-y-auto pr-1">
                    {h2s.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`}>{h.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="card-v2 p-6">
                <p className="eyebrow-v2">Hemen başlayalım</p>
                <h2 className="mt-2 font-display text-lg font-semibold text-navy-950">Bu hizmeti konuşalım</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Ekibimiz ihtiyacınızı ve uygunluk durumunuzu ilk görüşmede netleştirir.
                </p>
                <a
                  href={site.phone.href}
                  className="press mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-gold-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-gold-700"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
                </a>
                <ul className="mt-5 space-y-2.5 border-t border-slate-200 pt-4 text-sm">
                  <li>
                    <a
                      href={serviceWhatsAppHref(page.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-ink-900 transition-colors hover:text-gold-700"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      WhatsApp<span className="visually-hidden"> (yeni sekmede açılır)</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 break-all text-ink-900 transition-colors hover:text-gold-700">
                      <Mail className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.supportEmail.address}`}
                      className="flex items-start gap-2.5 break-all text-ink-900 transition-colors hover:text-gold-700"
                    >
                      <Headphones className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      <span>
                        {site.supportEmail.address}
                        <span className="block text-xs text-slate-500">{site.supportEmail.label}</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <WhyBtm />

      {page.faq.length > 0 && <FaqSection items={page.faq} />}

      {relatedServices.length > 0 && (
        <section className="bg-white py-16 md:py-20" aria-labelledby="related-services-title">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHead id="related-services-title" eyebrow={categoryInfo.shortTitle} title="İlgili hizmetler" />
              <Link href={`/${category}/`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-navy-950">
                Tüm {categoryInfo.shortTitle} hizmetleri <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.slice(0, 6).map((s) => (
                <li key={s.href}>
                  <LinkCard href={s.href} icon={serviceIcon(s.key)} title={s.name} text={s.description} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-200 bg-paper-50 py-16 md:py-20" aria-labelledby="related-posts-title">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHead id="related-posts-title" eyebrow="Kaynaklar" title="İlgili yazılar" />
              <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-navy-950">
                Tüm yazılar <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10">
              <PostGrid posts={relatedPosts} />
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title="Bu hizmeti kurumunuz için değerlendirelim."
        lead="Arayın, WhatsApp'tan yazın ya da keşif formunu doldurun; çağrı merkezi yok, doğrudan uzman ekibe ulaşırsınız. İlk görüşme ve keşif ücretsizdir."
        secondary={{ label: `Tüm ${categoryInfo.shortTitle} hizmetleri`, href: `/${category}/` }}
      />
    </>
  );
}
