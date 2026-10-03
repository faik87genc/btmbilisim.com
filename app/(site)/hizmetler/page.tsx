import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MonitorCog } from "lucide-react";
import { site } from "@/lib/site";
import { absoluteUrl, ogMeta } from "@/lib/siteView";
import { serviceCategoryList } from "@/lib/services";
import { servicePagesContent } from "@/lib/servicePages";
import { categoryIcons } from "@/lib/serviceIcons";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { Button } from "@/components/ensa/Button";
import { JsonLd } from "@/components/site/Parts";

// /hizmetler/: hub of every service page, grouped by area. It replaced both the
// old WordPress "Hizmetler" page (same URL, so its rankings carry over) and the
// interim /hizmet-rehberi/ list (now a 301 to here — lib/legacyRedirects.ts).

const TITLE = `Hizmetlerimiz: IT Danışmanlık, Siber Güvenlik ve Altyapı${site.titleSuffix}`;
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
      <PageHero
        title="Hizmetlerimiz"
        eyebrow="IT Danışmanlık · Güvenlik · Altyapı"
        lead="Tüm süreçlerimizin temelinde IT danışmanlığı var: önce ihtiyacı ve riski netleştiriyor, sonra altyapıyı, güvenliği ve yazılımı buna göre kuruyor ve yönetiyoruz."
        crumbs={[{ text: "Hizmetlerimiz" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={IT_CONSULTING}>
            IT Danışmanlık Hizmetleri <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/#teklif" variant="ghost-dark">
            Ücretsiz keşif isteyin
          </Button>
        </div>
      </PageHero>

      {/* Featured: IT consulting, the base of every engagement */}
      <section className="bg-white py-14 md:py-16">
        <Container className="max-w-7xl">
          <Link
            href={IT_CONSULTING}
            className="group flex flex-col gap-6 rounded-card border border-navy-950/10 bg-paper-50 p-6 shadow-card transition-shadow hover:shadow-lift md:flex-row md:items-center md:p-8"
          >
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-control bg-navy-800 text-white">
              <MonitorCog className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block font-display text-2xl font-semibold text-navy-800">IT Danışmanlık Hizmetleri</span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-600">
                Teknoloji yol haritası, altyapı ve güvenlik değerlendirmesi, sanal IT müdürü (vCIO) ve sözleşmeli IT
                desteği. 2010&apos;dan bu yana işletmelerin bilişim kararlarına eşlik ediyoruz.
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
              İnceleyin <ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </Container>
      </section>

      {serviceCategoryList.map((c, ci) => {
        const Icon = categoryIcons[c.slug];
        return (
          <section key={c.slug} className={ci % 2 === 0 ? "cv-auto bg-paper-50 py-16 md:py-20" : "cv-auto bg-white py-16 md:py-20"}>
            <Container className="max-w-7xl">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading eyebrow={c.eyebrow} title={c.title} description={c.intro} />
                <Button href={`/${c.slug}/`} variant="ghost-light">
                  <Icon className="h-4 w-4" aria-hidden="true" /> {c.shortTitle} genel bakış
                </Button>
              </div>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.services.map((s, i) => (
                  <MotionReveal key={s.key} as="li" delay={(i % 3) * 0.04} className="h-full">
                    <Link
                      href={hrefFor(c.slug, s.key)}
                      className="group flex h-full flex-col rounded-card border border-navy-950/10 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-navy-800/30 hover:shadow-lift"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-display text-base font-semibold text-ink-900 group-hover:text-navy-800">{s.name}</span>
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      </span>
                      <span className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</span>
                    </Link>
                  </MotionReveal>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}
    </>
  );
}
