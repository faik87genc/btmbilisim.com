import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Check, Cog, Headphones, PhoneCall, Search } from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { FaqSection } from "@/components/ensa/FaqSection";
import { HomeBlogSection } from "@/components/ensa/HomeBlogSection";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { ProductCard } from "@/components/ensa/ProductCard";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { Button } from "@/components/ensa/Button";
import { QuoteForm } from "@/components/QuoteForm";
import { PentestScope, Sectors, SecurityShowcase, TrustSection } from "@/components/btm/HomeSections";
import { HeroTabs } from "@/components/btm/HeroTabs";
import { JsonLd } from "@/components/site/Parts";
import { serviceCategoryList } from "@/lib/services";
import { servicePagesContent } from "@/lib/servicePages";
import { products } from "@/lib/products";
import { categoryIcons } from "@/lib/serviceIcons";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";
import home from "@/lib/data/home.json";

// Ana Sayfa 1 (the primary homepage). The slider variant lives at
// /anasayfa-2/. Every claim here is true for BTM — no invented customer
// counts, years or reviews.
//
// Section rhythm (design review): backgrounds alternate and never repeat
// side by side — hero (dark) · services (white) · products (dark) · [trust
// (white), only with real data] · showcase (paper) · pentest (dark) ·
// sectors (white) · process (paper) · quote (white) · FAQ (paper) · blog.

const TITLE = "BTM Bilişim | Siber Güvenlik, Altyapı ve Yazılım Çözümleri";
const DESCRIPTION =
  "Gebze merkezli BTM Bilişim: sızma testi, siber güvenlik, ağ ve sunucu altyapısı, bulut yedekleme, lisanslama ve kurumsal yazılım ürünleri.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title: TITLE, description: DESCRIPTION, url: absoluteUrl("/"), images: [DEFAULT_OG_IMAGE] },
};

// Latest posts are read from the DB (HomeBlogSection); 5-min backstop.
export const revalidate = 300;

const STEPS = [
  {
    icon: PhoneCall,
    title: "İletişim",
    text: "İhtiyacınızı dinliyor, mevcut altyapınızı değerlendiriyoruz. İlk görüşme ücretsizdir ve yükümlülük gerektirmez.",
    points: ["Ücretsiz ön görüşme", "İhtiyaç analizi", "Aynı gün dönüş"],
  },
  {
    icon: Search,
    title: "Keşif & Planlama",
    text: "Yerinde teknik keşif yapıyor, size özel çözüm mimarisini ve kalem kalem teklifi hazırlıyoruz.",
    points: ["Yerinde keşif", "Kalem kalem teklif", "Proje planı"],
  },
  {
    icon: Cog,
    title: "Uygulama",
    text: "Kurulum ve entegrasyonu minimum kesintiyle yapıyor, sistemleri güvenlik açısından sıkılaştırıp teslim ediyoruz.",
    points: ["Profesyonel kurulum", "Test & devreye alma", "Dokümantasyon ve eğitim"],
  },
  {
    icon: Headphones,
    title: "Sürekli Destek",
    text: "Devreye almadan sonra da yanınızdayız: izleme, periyodik bakım ve arıza anında hızlı müdahale.",
    points: ["7/24 destek hattı", "Proaktif izleme", "Düzenli bakım"],
  },
];

const detailSlug = new Map(servicePagesContent.map((s) => [`${s.categorySlug}/${s.serviceKey}`, s.slug]));
const CHIPS_PER_AREA = 5;

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-gradient">
        <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative grid max-w-7xl grid-cols-1 items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-300">
              <span className="h-px w-8 bg-gold-300" aria-hidden="true" />
              BTM Bilişim · Gebze
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl">
              İşletmenizin bilişim altyapısında <span className="text-gold-300">güvendiğiniz</span> ortak.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Siber güvenlik ve sızma testinden ağ altyapısına, sunucu ve sanallaştırmadan bulut yedeklemeye kadar tüm
              bilişim ihtiyaçlarınızı tek ekiple planlıyor, kuruyor ve ayakta tutuyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#teklif">
                Ücretsiz Keşif Talep Edin <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/hizmetler/" variant="ghost-dark">
                Hizmetlerimiz
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3 sm:gap-6">
              {[
                ["7/24", "Teknik Destek"],
                ["Uçtan Uca", "Keşif · Kurulum · Bakım"],
                ["Gebze", "Yerinde Servis"],
              ].map(([v, l]) => (
                <div key={v} className="border-l border-white/20 pl-3 sm:pl-4">
                  <dt className="font-display text-xl font-semibold text-white sm:text-2xl">{v}</dt>
                  <dd className="mt-1 text-xs text-slate-300">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroTabs />
        </Container>
      </section>

      {/* Service areas: category cards with sub-service chips, then the field-service guide */}
      <section className="cv-auto bg-white py-20 md:py-24" id="hizmetler">
        <Container className="max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Hizmetlerimiz"
              title="Kurumsal BT ve güvenlik hizmetlerimiz"
              description="Danışmanlıktan siber güvenliğe, sistem ve network altyapısından buluta, yazılımdan lisanslamaya kadar tüm ihtiyaçlarınızı tek çatı altında topluyoruz."
            />
            <Button href="/hizmetler/" variant="ghost-light">
              Tüm hizmetler <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategoryList.map((c, i) => {
              const Icon = categoryIcons[c.slug];
              return (
                <MotionReveal key={c.slug} delay={(i % 3) * 0.06} className="h-full">
                  <div className="flex h-full flex-col rounded-card border border-navy-950/10 bg-white p-6 shadow-card transition-shadow hover:shadow-lift">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-navy-800 text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-ink-900">
                          <Link href={`/${c.slug}/`} className="hover:text-navy-700">
                            {c.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.summary}</p>
                      </div>
                    </div>
                    <ul className="mb-6 mt-5 flex flex-wrap gap-2">
                      {c.services.slice(0, CHIPS_PER_AREA).map((s) => {
                        const slug = detailSlug.get(`${c.slug}/${s.key}`);
                        return (
                          <li key={s.key}>
                            <Link
                              href={slug ? `/${c.slug}/${slug}/` : `/${c.slug}/`}
                              className="inline-flex items-center gap-1.5 rounded-control bg-paper-50 px-2.5 py-1 text-xs text-slate-700 transition-colors hover:bg-paper-100 hover:text-navy-800"
                            >
                              <Check className="h-3 w-3 text-navy-700" aria-hidden="true" />
                              {s.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href={`/${c.slug}/`}
                      className="mt-auto flex items-center justify-between rounded-control bg-paper-50 px-4 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-paper-100"
                    >
                      Tüm {c.shortTitle} hizmetleri ({c.services.length})
                      <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                    </Link>
                  </div>
                </MotionReveal>
              );
            })}
          </div>

          {/* Field services (the old BTM service pages); full list on /hizmet-rehberi/ */}
          <div className="mt-12 rounded-card border border-navy-950/10 bg-paper-50 p-6 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-lg font-semibold text-navy-800">Hizmet Rehberi: sahada verdiğimiz hizmetler</h3>
              <Link href="/hizmet-rehberi/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-navy-700">
                <BookOpen className="h-4 w-4" aria-hidden="true" /> Tümünü görün
                <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {home.serviceGroups.flatMap((g) => g.items).map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="inline-flex items-center gap-1.5 rounded-control border border-navy-950/10 bg-white px-3 py-1.5 text-sm text-ink-900 transition-colors hover:border-navy-800/30 hover:text-navy-800"
                  >
                    {it.title}
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Software products */}
      <section className="cv-auto bg-navy-950 py-20 md:py-24">
        <Container className="max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Yazılım Ürünlerimiz"
              title="İşinizi ileri taşıyan dijital ürünler."
              description="Finans, siber güvenlik, İK ve bilişim altyapısı alanlarında geliştirdiğimiz kurumsal yazılımlar."
              tone="dark"
            />
            <Button href="/yazilim-urunlerimiz/" variant="ghost-dark">
              Tüm ürünleri gör
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} delay={(i % 3) * 0.06} tone="dark" />
            ))}
          </div>
        </Container>
      </section>

      <TrustSection />

      <SecurityShowcase />

      <PentestScope />

      <Sectors />

      {/* How we work */}
      <section className="cv-auto bg-paper-50 py-20 md:py-24">
        <Container className="max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="Çalışma Sürecimiz"
            title="Nasıl çalışıyoruz?"
            description="4 adımlı, net bir süreçle ihtiyacınızı karşılıyor, devreye almadan sonra da yanınızda kalıyoruz."
          />
          <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <span className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-navy-800/20 lg:block" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <MotionReveal key={s.title} as="li" delay={i * 0.08} className="relative flex flex-col items-center">
                <span className="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-navy-800 text-white ring-8 ring-paper-50 md:h-20 md:w-20">
                  <s.icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                  <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider">Adım {i + 1}</span>
                </span>
                <div className="mt-6 flex h-full w-full flex-col rounded-card border border-navy-950/10 bg-white p-6 text-center shadow-card">
                  <h3 className="font-display text-xl font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                  <ul className="mt-4 space-y-1.5 text-left text-sm text-slate-700">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-navy-700" aria-hidden="true" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionReveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Quote form — #teklif: header CTA, article CTAs and AI-written posts link here. */}
      <section id="teklif" className="scroll-mt-28 bg-white py-16 md:py-24">
        <Container className="max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Ücretsiz Keşif & Teklif"
                title="İhtiyacınızı anlatın, aynı gün dönelim."
                description="Altyapınızı birlikte değerlendirelim; keşif randevusu, size özel çözüm ve net bir yol haritası için en kısa sürede sizinle iletişime geçelim."
              />
              <ul className="mt-6 space-y-2.5 text-sm text-ink-900">
                {[
                  "Ücretsiz keşif ve ihtiyaç analizi",
                  "Yerinde inceleme, aynı gün dönüş",
                  "Kalem kalem, şeffaf teklif",
                  "Kurulumdan sonra bakım ve destek",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-navy-700" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-card border border-navy-950/10 bg-paper-50 p-5">
                <p className="text-sm text-slate-600">Hemen konuşmak isterseniz</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Button href={site.phone.href} variant="navy">
                    <PhoneCall className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
                  </Button>
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-control border border-navy-950/15 px-6 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-800/50 hover:bg-white"
                  >
                    WhatsApp<span className="visually-hidden"> (yeni sekmede açılır)</span>
                  </a>
                </div>
              </div>
            </div>
            <QuoteForm />
          </div>
        </Container>
      </section>

      <FaqSection items={home.faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      <HomeBlogSection />
    </>
  );
}
