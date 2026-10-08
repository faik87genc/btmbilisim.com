import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ChevronRight, Headphones, Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { GlobeBands } from "@/components/ensa/GlobeBands";
import { MarkdownRenderer } from "@/components/ensa/MarkdownRenderer";
import { FaqSection } from "@/components/ensa/FaqSection";
import { Button } from "@/components/ensa/Button";
import { JsonLd } from "@/components/site/Parts";
import { serviceCategories } from "@/lib/services";
import { getServicePageContent, servicePageParams, servicePagesContent } from "@/lib/servicePages";
import { getPublishedPages, pageHref, postLikePages } from "@/lib/pages";
import { slugifyTr } from "@/lib/slug";
import { absoluteUrl, ogMeta } from "@/lib/siteView";
import { site } from "@/lib/site";
import type { Page } from "@/lib/db/schema";
import { ContactCta } from "@/components/ensa/ContactCta";
import { WhyBtm } from "@/components/ensa/WhyBtm";
import { ServiceContactButtons } from "@/components/ensa/ServiceContactButtons";
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

// "<Hizmet> | Gebze, Kocaeli | BTM Bilişim" when it fits in ~65 characters
// (local intent: most searches add the city), else "<Hizmet> | BTM Bilişim".
function titleFor(title: string): string {
  const local = `${title} | Gebze, Kocaeli${site.titleSuffix}`;
  return local.length <= 65 ? local : `${title}${site.titleSuffix}`;
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

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={serviceJsonLd} />

      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <GlobeBands className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] text-gold-500/15" />
        <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-14">
          <div>
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
          <div className="mt-8">
            <ServiceContactButtons service={page.title} />
          </div>
          </div>

          {scope.length > 0 && (
            <div className="rounded-card bg-white/5 p-6 ring-1 ring-white/15 md:p-7">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-300">Hizmet kapsamı</p>
              <ul className="mt-4 space-y-3">
                {scope.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/15 pt-4 text-xs text-slate-300">
                Ücretsiz keşif · 7/24 teknik destek · {site.areaLabel}
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            <div className="min-w-0 max-w-3xl">
              <MarkdownRenderer content={page.content} />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-card border border-navy-950/10 bg-white p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">Hemen Başlayalım</p>
                <h2 className="mt-3 font-display text-xl font-semibold text-ink-900">Bu hizmeti konuşalım</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Ekibimiz ihtiyacınızı ve uygunluk durumunuzu ilk görüşmede netleştirir.
                </p>
                <Button href={site.phone.href} variant="primary" className="mt-5 w-full">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
                </Button>
                <div className="mt-6 space-y-3 border-t border-navy-950/10 pt-5 text-sm">
                  <a
                    href={serviceWhatsAppHref(page.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-ink-900 transition-colors hover:text-gold-700"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    WhatsApp<span className="visually-hidden"> (yeni sekmede açılır)</span>
                  </a>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all text-ink-900 transition-colors hover:text-gold-700">
                    <Mail className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    {site.email}
                  </a>
                  <a href={`mailto:${site.supportEmail.address}`} className="flex items-start gap-3 break-all text-ink-900 transition-colors hover:text-gold-700">
                    <Headphones className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    <span>
                      {site.supportEmail.address}
                      <span className="block text-xs text-slate-500">{site.supportEmail.label}</span>
                    </span>
                  </a>
                </div>
              </div>

              {relatedServices.length > 0 && (
                <div className="rounded-card border border-navy-950/10 bg-white p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">{categoryInfo.shortTitle}</p>
                  <h2 className="mt-3 font-display text-base font-semibold text-ink-900">İlgili hizmetler</h2>
                  <ul className="mt-4 space-y-3">
                    {relatedServices.map((s) => (
                      <li key={s.key}>
                        <Link href={s.href} className="group flex items-center justify-between gap-3">
                          <span className="text-sm text-slate-600 transition-colors group-hover:text-ink-900">{s.name}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gold-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
                <div className="rounded-card border border-navy-950/10 bg-white p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">Blog</p>
                  <h2 className="mt-3 font-display text-base font-semibold text-ink-900">İlgili yazılar</h2>
                  <ul className="mt-4 space-y-3">
                    {relatedPosts.map((p) => (
                      <li key={p.id}>
                        <Link href={pageHref(p)} className="group flex items-start justify-between gap-3">
                          <span className="text-sm leading-snug text-slate-600 transition-colors group-hover:text-ink-900">{p.title}</span>
                          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

      <WhyBtm />

      {page.faq.length > 0 && <FaqSection items={page.faq} />}

      <ContactCta title="Bu hizmeti kurumunuz için değerlendirelim." />
    </>
  );
}
