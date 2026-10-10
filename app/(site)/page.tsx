import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Code2,
  Gauge,
  MonitorSmartphone,
  Phone,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { FaqSection } from "@/components/ensa/FaqSection";
import { HomeBlogSection } from "@/components/ensa/HomeBlogSection";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { Button } from "@/components/ensa/Button";
import { IconTile } from "@/components/ensa/IconTile";
import { QuoteForm } from "@/components/QuoteForm";
import { ApproachSteps, TrustSection } from "@/components/btm/HomeSections";
import { ProofStrip } from "@/components/ensa/ProofStrip";
import { WhatsAppIcon } from "@/components/ensa/WhatsAppIcon";
import { JsonLd } from "@/components/site/Parts";
import { products } from "@/lib/products";
import { serviceCategoryList } from "@/lib/services";
import { categoryIcons } from "@/lib/serviceIcons";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";
import home from "@/lib/data/home.json";

// Ana Sayfa 1 (the primary homepage; the slider variant is /anasayfa-2/).
// Identity v2 (docs/kurumsal-kimlik-v2.md): calm, precise, lots of white,
// one corporate blue as the signal. The offer and a direct line in the hero,
// the facts row, IT consulting as the base of everything, the service areas as
// one card grid, software & products as the dark band, then the form, FAQ and
// latest posts; the footer's contact strip is the closing CTA band.
// Every claim is true for BTM — no invented numbers or reviews; figures come
// from lib/data/trust.ts → companyFacts only.
//
// Backgrounds (never the same ground twice in a row; only white, surface and
// ink-950): hero (white) · facts (ink) · IT consulting (white) · service areas
// (surface) · software (ink) · [trust, only with real data] (surface) · quote
// (white) · FAQ (surface) · blog (white). At most one photo per section,
// people-free, all through .photo-tone (product screenshots keep their colours).

// "IT danışmanlık" itself is left to the pillar page (no cannibalisation).
const TITLE = "Bilişim Firması: Siber Güvenlik ve IT Altyapı | BTM Bilişim";
const DESCRIPTION =
  "2010'dan beri IT danışmanlık, siber güvenlik ve sızma testi, ağ ve sunucu altyapısı, bulut yedekleme. Gebze, Tuzla, Kocaeli ve İstanbul'da BTM Bilişim.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title: TITLE, description: DESCRIPTION, url: absoluteUrl("/"), images: [DEFAULT_OG_IMAGE] },
};

// Latest posts are read from the DB (HomeBlogSection); 5-min backstop.
export const revalidate = 300;

const IT_CONSULTING = "/danismanlik/it-danismanlik-hizmetleri/";

const SOFTWARE_SERVICES = [
  {
    icon: Code2,
    title: "Özel Yazılım Geliştirme",
    text: "İş süreçlerinizi otomatikleştiren, ERP ve mevcut sistemlerinizle entegre çalışan kurumsal yazılımlar.",
    href: "/yazilim-dijital/ozel-yazilim-gelistirme/",
  },
  {
    icon: MonitorSmartphone,
    title: "Web Tasarım",
    text: "Mobil uyumlu, hızlı, güvenli ve arama motoru dostu kurumsal web siteleri.",
    href: "/yazilim-dijital/web-tasarim-ve-kurumsal-web-sitesi/",
  },
];

const HERO_POINTS = ["Satıcıdan bağımsız teknoloji yol haritası", "Sızma testi ve siber güvenlik", "Ağ, sunucu, bulut ve yedekleme"];

/** Small caps label used inside cards and definition lists. */
const LABEL = "text-xs font-semibold uppercase tracking-[0.12em] text-slate-500";

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero: the offer on the left; on the right one technical photo with the direct line pinned over it */}
      <section className="relative overflow-hidden bg-white">
        <div className="bg-blueprint-light pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative grid max-w-7xl grid-cols-1 items-center gap-12 pb-14 pt-10 md:pb-20 md:pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pb-24 lg:pt-20">
          <div>
            <ul className="flex flex-wrap gap-2" aria-label="Öne çıkanlar">
              <li className="inline-flex items-center gap-1.5 rounded-control bg-gold-100 px-3 py-1.5 text-xs font-semibold text-gold-700">
                <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> ISO 27001 baş denetçi deneyimi
              </li>
              <li className="inline-flex items-center rounded-control bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-line">
                2010&apos;dan beri
              </li>
              <li className="hidden items-center rounded-control bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-line sm:inline-flex">
                Gebze · Kocaeli · İstanbul
              </li>
            </ul>
            <h1 className="mt-6 text-balance font-display text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.025em] text-navy-950 sm:text-[2.5rem] lg:text-[2.625rem]">
              IT danışmanlıktan siber güvenliğe, <span className="text-gold-600">bilişiminizin tek muhatabı.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-[1.65] text-slate-500">
              İşletmenizin IT altyapısını planlıyor, kuruyor ve güvence altına alıyoruz.
              <span className="hidden md:inline">
                {" "}ISO 27001 baş denetçi deneyimiyle her projeye önce güvenlik gözüyle bakıyor, önerdiğimiz işi sahada
                kendimiz uyguluyoruz.
              </span>
            </p>
            <ul className="mt-7 hidden space-y-2.5 text-[0.9375rem] text-slate-700 sm:block">
              {HERO_POINTS.map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-teal-600" strokeWidth={2.25} aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={IT_CONSULTING}>
                IT Danışmanlık Hizmetleri <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="#hizmetler" variant="ghost-light">
                Hizmet alanlarımız
              </Button>
            </div>
          </div>

          <div className="relative lg:pl-6">
            <div className="photo-tone aspect-[16/10] shadow-lift md:aspect-[16/9] lg:aspect-[4/5] xl:aspect-[1/1]">
              <Image
                src="/wp-content/uploads/2025/07/sunucu-ve-veri-merkezi-hizmetleri-3-1024x683.jpg"
                alt="Veri merkezinde mavi ışıklı sunucu kabinleri"
                width={1024}
                height={683}
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, calc(100vw - 48px)"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Direct line, pinned over the photo (phones use the fixed call bar instead) */}
            <div className="card absolute -bottom-8 left-6 hidden w-[min(calc(100%-3rem),22rem)] p-6 shadow-lift md:block lg:-left-6 lg:bottom-8">
              <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-navy-950">Bize doğrudan ulaşın</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">Arayın veya WhatsApp&apos;tan yazın; ihtiyacınızı uzmanla birlikte netleştirin.</p>
              <div className="mt-5 space-y-2.5">
                <a
                  href={site.phone.href}
                  className="press flex items-center gap-3.5 rounded-control bg-gold-500 px-4 py-3 text-white transition-colors hover:bg-gold-700"
                >
                  <Phone className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    <span className="block text-xs font-medium text-white/85">Hemen arayın</span>
                    <span className="block font-display text-lg font-bold tabular-nums">{site.phone.display}</span>
                  </span>
                </a>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press flex items-center gap-3.5 rounded-control bg-white px-4 py-3 text-navy-950 ring-1 ring-slate-400 transition-colors hover:text-gold-700 hover:ring-gold-600"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  <span>
                    <span className="block text-xs font-medium text-slate-500">
                      WhatsApp&apos;tan yazın<span className="visually-hidden"> (yeni sekmede açılır)</span>
                    </span>
                    <span className="block font-display text-lg font-bold tabular-nums">{site.mobile.display}</span>
                  </span>
                </a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <span className="h-2 w-2 shrink-0 rounded-full bg-teal-600" aria-hidden="true" />
                7/24 teknik destek · ilk görüşme ücretsiz
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ProofStrip />

      {/* IT consulting: the base of every engagement, with the lead-auditor credential */}
      <section className="cv-auto bg-white py-20 md:py-28">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="IT Danışmanlık"
                title="Tüm süreçlerimizin temelinde IT danışmanlığı var."
                description="Önce ihtiyacı ve riski netleştiriyor, sonra altyapıyı, güvenliği ve yazılımı buna göre kuruyoruz. Danışmanlık raporda kalmaz: önerdiğimiz her işi kendi ekibimizle uygular, sonrasında da yönetiriz."
              />
              <p className="mt-7 flex items-start gap-3.5 rounded-card bg-tint-50 p-5 text-[0.9375rem] leading-relaxed text-slate-700 ring-1 ring-line">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  Projelerimiz ISO 27001 baş denetçi deneyimiyle yürütülür; KVKK ve ISO 27001 gereksinimleri her kurulumun
                  parçasıdır. Belgelendirme sürecinde{" "}
                  <a
                    href="https://www.iso27001danismanlik.com/"
                    target="_blank"
                    rel="noopener"
                    className="font-semibold text-gold-700 underline decoration-gold-600/40 underline-offset-4 hover:decoration-current"
                  >
                    ISO 27001 danışmanlığı<span className="visually-hidden"> (yeni sekmede açılır)</span>
                  </a>{" "}
                  ekibimizle birlikte çalışırız.
                </span>
              </p>
              <div className="mt-8">
                <Button href={IT_CONSULTING}>
                  IT danışmanlık hizmetlerimiz <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <MotionReveal className="photo-tone aspect-[16/10] lg:aspect-[4/3]">
              <Image
                src="/wp-content/uploads/2025/07/ag-ve-sistem-altyapi-cozumleri-3.webp"
                alt="Kabinette düzenli patch kablolama ve switch portları"
                width={940}
                height={627}
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, calc(100vw - 48px)"
                loading="lazy"
              />
            </MotionReveal>
          </div>

          <MotionReveal className="mt-16">
            <p className={`${LABEL} mb-5`}>Nasıl çalışıyoruz</p>
            <ApproachSteps />
          </MotionReveal>
        </Container>
      </section>

      {/* Service areas: one card grid, like a portfolio; detail lives on the category pages */}
      <section className="cv-auto scroll-mt-28 bg-tint-50 py-20 md:py-28" id="hizmetler">
        <Container className="max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Hizmet Alanlarımız"
              title="Danışmanlıktan uygulamaya tek ekip"
              description="IT danışmanlığıyla planladığımız her işi; siber güvenlikten ağ ve sunucu altyapısına, buluttan lisanslamaya kendi uzmanlarımızla hayata geçiriyoruz."
            />
            <Button href="/hizmetler/" variant="ghost-light">
              Tüm hizmetler <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {serviceCategoryList.map((c, i) => {
              const Icon = categoryIcons[c.slug];
              return (
                <MotionReveal key={c.slug} as="li" delay={(i % 3) * 0.05} className="h-full">
                  <Link href={`/${c.slug}/`} className="card card-link group flex h-full flex-col p-6 md:p-7">
                    <span className="flex items-start justify-between gap-4">
                      <IconTile icon={Icon} size="lg" />
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-gold-600"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mt-6 font-display text-[1.1875rem] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-950 group-hover:text-gold-700">
                      {c.title}
                    </h3>
                    <span className="mt-2 block text-[0.9375rem] leading-relaxed text-slate-500">{c.summary}</span>
                  </Link>
                </MotionReveal>
              );
            })}
          </ul>

          <Link
            href="/risk-skoru-testi/"
            className="card card-link mt-6 flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center md:p-7"
          >
            <span className="flex items-center gap-4">
              <IconTile icon={Gauge} size="lg" />
              <span>
                <span className="block font-display text-lg font-semibold text-navy-950">Ücretsiz siber güvenlik risk skorunuzu öğrenin</span>
                <span className="mt-0.5 block text-[0.9375rem] text-slate-500">8 soru, yaklaşık 2 dakika. Sonuçta öncelikli önlem listesi.</span>
              </span>
            </span>
            <span className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-control bg-gold-500 px-5 text-[0.9375rem] font-semibold text-white">
              Testi başlat <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </Container>
      </section>

      {/* Software & products: the dark band; the shot is a real BTM product (Atlas) */}
      <section className="cv-auto bg-navy-950 py-20 md:py-28">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-10">
            <SectionHeading
              eyebrow="Yazılım & Web"
              title="Kendi yazılım ekibimiz, kendi ürünlerimiz."
              description="Saha deneyimimizi yazılıma dönüştürüyoruz: ihtiyacınıza özel yazılım ve web sitesi geliştiriyor, kurumsal yazılım ürünlerimizi projelerinizde kullanıyoruz."
              tone="dark"
            />
            {/* Product colours are kept: no .photo-tone on a product screenshot. */}
            <MotionReveal className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <Link
                href="/yazilim-urunlerimiz/atlas/"
                className="group block overflow-hidden rounded-panel bg-white/[0.04] ring-1 ring-white/10 transition-colors hover:ring-gold-300/50"
              >
                <Image
                  src="/hero/atlas-1.jpg"
                  alt="Atlas çok şirketli finans ve bütçe paneli, dizüstü ekranında"
                  width={1600}
                  height={900}
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, calc(100vw - 48px)"
                  loading="lazy"
                  className="aspect-[16/9] h-auto w-full object-cover"
                />
                <span className="flex items-center justify-between gap-3 px-5 py-4 text-[0.9375rem] font-semibold text-white">
                  <span>
                    <span className="eyebrow eyebrow-dark">Ürün</span>
                    <span className="mt-1 block">Atlas: ürünü inceleyin</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-gold-300" strokeWidth={1.75} aria-hidden="true" />
                </span>
              </Link>
            </MotionReveal>
            <div>
              <ul className="grid grid-cols-1 gap-4">
                {SOFTWARE_SERVICES.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="card-dark card-link group flex items-start gap-4 p-5 md:p-6">
                      <IconTile icon={s.icon} tone="dark" size="lg" />
                      <span className="flex-1">
                        <span className="flex items-center justify-between gap-3 font-display text-lg font-semibold text-white">
                          {s.title}
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                        </span>
                        <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-slate-300">{s.text}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Kurumsal yazılım ürünlerimiz</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/yazilim-urunlerimiz/${p.slug}/`}
                        className="inline-flex min-h-9 items-center rounded-md px-3 text-sm font-medium text-slate-200 ring-1 ring-white/15 transition-colors hover:text-white hover:ring-gold-300/60"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Button href="/yazilim-urunlerimiz/" variant="inverse">
                  Yazılım ürünlerimiz <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustSection />

      {/* Quote form — #teklif: header, article CTAs and AI-written posts link here. */}
      <section id="teklif" className="scroll-mt-28 bg-white py-20 md:py-28">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Ücretsiz Keşif & Teklif"
                title="İhtiyacınızı yazın, size dönelim."
                description="Birkaç bilgiyle kapsamınızı anlayalım; ön görüşme ve keşif ücretsizdir."
              />
              <ul className="mt-7 space-y-3 text-[0.9375rem] text-slate-700">
                {["Ücretsiz ön görüşme ve keşif", "Kalem kalem, şeffaf teklif", "Kurulumdan sonra bakım ve destek"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-teal-600" strokeWidth={2.25} aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <dl className="mt-8 grid gap-5 border-t border-line pt-6 text-[0.9375rem] sm:grid-cols-2">
                <div>
                  <dt className={LABEL}>Çalışma saatleri</dt>
                  <dd className="mt-1.5 text-navy-950">{site.hours.label}</dd>
                </div>
                <div>
                  <dt className={LABEL}>Telefon</dt>
                  <dd className="mt-1.5">
                    <a href={site.phone.href} className="font-semibold tabular-nums text-gold-700 hover:text-gold-800">
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="lg:self-start">
              <QuoteForm />
            </div>
          </div>
        </Container>
      </section>

      <FaqSection items={home.faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      <HomeBlogSection />
    </>
  );
}
