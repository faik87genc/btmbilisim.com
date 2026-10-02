import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";
import type { Page } from "@/lib/db/schema";
import { getPublishedPages, pageHref, tagSlug } from "@/lib/pages";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { IMG_SIZES, imageInfo } from "@/lib/imageVariants";
import { DEFAULT_OG_IMAGE } from "@/lib/structuredData";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { Button } from "@/components/ensa/Button";
import { JsonLd } from "@/components/site/Parts";

// Hizmet Rehberi: the service pages carried over from the old WordPress site.
// They keep their original URLs (search engines know them); this page lists
// them as cards so they stay one click from the header and footer.

export const revalidate = 300;

const TITLE = `Hizmet Rehberi${site.titleSuffix}`;
const DESCRIPTION =
  "BTM Bilişim hizmet rehberi: siber güvenlik, sızma testi, ağ ve sistem altyapısı, sunucu, sanallaştırma, bulut yedekleme, veri kurtarma, lisanslama, yazılım ve web tasarım hizmetleri.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/hizmet-rehberi/") },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: absoluteUrl("/hizmet-rehberi/"), images: [DEFAULT_OG_IMAGE] },
};

const GROUPS: { title: string; slugs: string[] }[] = [
  { title: "Siber Güvenlik", slugs: ["siber-guvenlik-hizmetleri", "sizma-testi-penetrasyon-testi"] },
  {
    title: "Altyapı ve Sunucu",
    slugs: [
      "ag-ve-sistem-altyapi-cozumleri",
      "sunucu-ve-veri-merkezi-hizmetleri",
      "sanallastirma-hizmetleri",
      "sistem-entegrasyonu",
      "kurulum-hizmeti",
    ],
  },
  { title: "Bulut ve Veri", slugs: ["bulut-ve-yedekleme-cozumleri", "cloud-hizmetleri", "veri-kurtarma-hizmetleri"] },
  {
    title: "Destek, Yazılım ve Lisans",
    slugs: ["it-destek-ve-danismanlik", "lisanslama-hizmetleri", "yazilim-hizmetleri", "web-tasarim-hizmetleri"],
  },
];

// Camera installation has no service page of its own, but ~40 posts.
const CAMERA_TAG = "Kamera Kurulum";

function GuideCard({ page, delay }: { page: Page; delay: number }) {
  const img = imageInfo(page.coverImageUrl);
  return (
    <MotionReveal delay={delay} className="h-full">
      <Link
        href={pageHref(page)}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy-950/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_18px_40px_-24px_rgba(10,18,32,0.35)]"
      >
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-navy-900">
          {page.coverImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img?.src ?? page.coverImageUrl}
              srcSet={img?.srcSet}
              sizes={img?.srcSet ? IMG_SIZES.card : undefined}
              alt=""
              width={img?.width ?? 640}
              height={img?.height ?? 360}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink-900 transition-colors group-hover:text-gold-700">
            {page.title}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">{page.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-gold-700">
            Hizmeti inceleyin
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </MotionReveal>
  );
}

export default async function ServiceGuidePage() {
  const bySlug = new Map((await getPublishedPages()).map((p) => [p.slug, p]));
  const groups = GROUPS.map((g) => ({ ...g, pages: g.slugs.map((s) => bySlug.get(s)).filter((p): p is Page => !!p) })).filter(
    (g) => g.pages.length > 0,
  );

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BTM Bilişim Hizmet Rehberi",
    itemListElement: groups
      .flatMap((g) => g.pages)
      .map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: absoluteUrl(pageHref(p)) })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <PageHero
        title="Hizmet Rehberi"
        eyebrow="Sahadaki Hizmetlerimiz"
        lead="Ağ altyapısından sunucuya, yedeklemeden güvenliğe; kurulumdan bakıma kadar sahada verdiğimiz hizmetlerin ayrıntılı sayfaları."
        crumbs={[{ text: "Hizmet Rehberi" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/hizmetler/" variant="primary">
            Tüm hizmetlere genel bakış
          </Button>
          <Button href="/iletisim/#teklif" variant="ghost-dark">
            Teklif Alın
          </Button>
        </div>
      </PageHero>

      {groups.map((g, gi) => (
        <section key={g.title} className={gi % 2 === 0 ? "bg-paper-50 py-16 md:py-20" : "bg-white py-16 md:py-20"}>
          <Container>
            <SectionHeading eyebrow={String(gi + 1).padStart(2, "0")} title={g.title} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.pages.map((p, i) => (
                <GuideCard key={p.slug} page={p} delay={(i % 3) * 0.05} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="bg-navy-900 py-16 md:py-20">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gold-500/30 bg-gold-500/10 text-gold-300">
              <Camera className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-paper-50">Güvenlik kamerası (IP kamera) sistemleri</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
                Fabrika, depo, OSB ve işyerleri için projelendirme, kurulum, kayıt ve uzaktan izleme. Gebze, Darıca,
                Dilovası ve Tuzla&apos;daki kurulum rehberlerimizi inceleyin.
              </p>
            </div>
          </div>
          <Button href={`/blog/etiket/${tagSlug(CAMERA_TAG)}/`} variant="ghost-dark">
            Kamera yazıları
          </Button>
        </Container>
      </section>

      <section className="bg-paper-50 py-16">
        <Container>
          <SectionHeading
            align="center"
            title="Uzmanlık alanlarımızın tamamı"
            description="Danışmanlıktan lisanslamaya altı ana hizmet alanımız ve alt hizmetleri."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              ["Danışmanlık", "/danismanlik/"],
              ["Siber Güvenlik", "/siber-guvenlik/"],
              ["Sistem & Network", "/sistem-network/"],
              ["Bulut & Yedekleme", "/bulut-yedekleme/"],
              ["Yazılım & Dijital", "/yazilim-dijital/"],
              ["Lisanslama", "/lisanslama/"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-navy-950/15 bg-white px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:border-gold-500/50 hover:text-gold-700"
              >
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
