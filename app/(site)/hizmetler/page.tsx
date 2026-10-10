import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MonitorCog } from "lucide-react";
import { site } from "@/lib/site";
import { absoluteUrl, ogMeta } from "@/lib/siteView";
import { serviceCategoryList } from "@/lib/services";
import { servicePagesContent } from "@/lib/servicePages";
import { categoryIcons } from "@/lib/serviceIcons";
import { Container } from "@/components/ensa/Container";
import { IconTile } from "@/components/ensa/IconTile";
import { JsonLd } from "@/components/site/Parts";
import { CtaBand, LightHero, SectionHead } from "@/components/site/ui";
import { serviceIcon } from "@/lib/serviceIcons";

// /hizmetler/: hub of every service page, grouped by area. It replaced both the
// old WordPress "Hizmetler" page (same URL, so its rankings carry over) and the
// interim /hizmet-rehberi/ list (now a 301 to here — lib/legacyRedirects.ts).

const TITLE = `Hizmetlerimiz${site.titleSuffix}`;
const DESCRIPTION =
  "BTM Bilişim hizmetleri: IT danışmanlık, siber güvenlik ve sızma testi, sistem ve network altyapısı, bulut ve yedekleme, yazılım ve lisanslama. Tüm hizmetler tek sayfada.";
const PATH = "/hizmetler/";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl(PATH) },
  ...ogMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
};

const IT_CONSULTING = "/danismanlik/it-danismanlik-hizmetleri/";
const pageSlug = new Map(servicePagesContent.map((s) => [`${s.categorySlug}/${s.serviceKey}`, s.slug]));
const hrefFor = (category: string, key: string) => {
  const slug = pageSlug.get(`${category}/${key}`);
  return slug ? `/${category}/${slug}/` : `/${category}/`;
};

export default function ServicesHubPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BTM Bilişim Hizmetleri",
    itemListElement: serviceCategoryList
      .flatMap((c) => c.services.map((s) => ({ name: s.name, url: absoluteUrl(hrefFor(c.slug, s.key)) })))
      .map((s, i) => ({ "@type": "ListItem", position: i + 1, ...s })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <LightHero
        title="Hizmetlerimiz"
        eyebrow="IT Danışmanlık · Güvenlik · Altyapı"
        lead="Tüm süreçlerimizin temelinde IT danışmanlığı var: önce ihtiyacı ve riski netleştiriyor, sonra altyapıyı, güvenliği ve yazılımı buna göre kuruyor ve yönetiyoruz."
        crumbs={[{ text: "Hizmetlerimiz" }]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={IT_CONSULTING}
            className="press inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-gold-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-700"
          >
            IT Danışmanlık Hizmetleri <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/#teklif"
            className="press inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white px-6 text-sm font-semibold text-navy-950 transition-colors hover:border-gold-600/40"
          >
            Ücretsiz keşif isteyin
          </Link>
        </div>
        {/* Jump links to each area below. */}
        <nav aria-label="Hizmet alanları" className="mt-10">
          <ul className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
            {serviceCategoryList.map((c) => (
              <li key={c.slug} className="shrink-0">
                <a href={`#${c.slug}`} className="filter-v2">
                  {c.shortTitle}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </LightHero>

      {/* Featured: IT consulting, the base of every engagement */}
      <section className="bg-white pt-14 md:pt-16">
        <Container>
          <div className="card-v2 card-v2-link group flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">
            <IconTile icon={MonitorCog} size="lg" />
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-navy-950">
                <Link href={IT_CONSULTING} className="card-v2-stretch transition-colors group-hover:text-gold-700">
                  IT Danışmanlık Hizmetleri
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 md:text-base">
                Teknoloji yol haritası, altyapı ve güvenlik değerlendirmesi, sanal IT müdürü (vCIO) ve sözleşmeli IT
                desteği. 2010&apos;dan bu yana işletmelerin bilişim kararlarına eşlik ediyoruz.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700" aria-hidden="true">
              İnceleyin <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Container>
      </section>

      {serviceCategoryList.map((c) => {
        const Icon = categoryIcons[c.slug];
        return (
          <section key={c.slug} id={c.slug} className="cv-auto scroll-mt-24 bg-white py-14 md:py-16" aria-labelledby={`${c.slug}-title`}>
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-slate-200 pt-12 md:pt-14">
                <SectionHead id={`${c.slug}-title`} eyebrow={c.eyebrow} title={c.title} lead={c.intro} />
                <Link
                  href={`/${c.slug}/`}
                  className="press inline-flex h-11 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-5 text-sm font-semibold text-navy-950 transition-colors hover:border-gold-600/40 hover:text-gold-700"
                >
                  <Icon className="h-4 w-4 text-gold-600" aria-hidden="true" /> {c.shortTitle} genel bakış
                </Link>
              </div>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.services.map((s) => (
                  <li key={s.key} className="h-full">
                    <div className="card-v2 card-v2-link group flex h-full gap-4 p-5 md:p-6">
                      <IconTile icon={serviceIcon(s.key)} />
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-semibold leading-snug text-navy-950">
                          <Link href={hrefFor(c.slug, s.key)} className="card-v2-stretch transition-colors group-hover:text-gold-700">
                            {s.name}
                          </Link>
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      <CtaBand
        title="Hangi hizmetle başlayacağınızdan emin değil misiniz?"
        lead="Durumunuzu anlatın; ihtiyacı ve önceliği birlikte netleştirelim. İlk görüşme ve keşif ücretsizdir."
        secondary={{ label: "IT danışmanlık", href: IT_CONSULTING }}
      />
    </>
  );
}
