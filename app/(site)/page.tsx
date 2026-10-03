import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Code2,
  Gauge,
  Headphones,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  Route,
  SearchCheck,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { FaqSection } from "@/components/ensa/FaqSection";
import { HomeBlogSection } from "@/components/ensa/HomeBlogSection";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { Button } from "@/components/ensa/Button";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustSection } from "@/components/btm/HomeSections";
import { JsonLd } from "@/components/site/Parts";
import { serviceCategoryList } from "@/lib/services";
import { categoryIcons } from "@/lib/serviceIcons";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";
import home from "@/lib/data/home.json";

// Ana Sayfa 1 (the primary homepage; the slider variant is /anasayfa-2/).
// Deliberately short (UX review): the offer and a direct line in the hero, IT
// consulting as the base of everything, the service areas as plain tiles,
// software & web as a secondary band, then the form, FAQ and latest posts.
// Detail lives on the service pages (security showcase and pentest scope are
// on /siber-guvenlik/). Every claim is true for BTM — no invented numbers or
// reviews.
//
// Backgrounds: hero (dark) · IT consulting (white) · service areas (paper) ·
// software (dark) · [trust, only with real data] · quote (white) · FAQ
// (paper) · blog (white).

// "IT danışmanlık" itself is left to the pillar page (no cannibalisation).
const TITLE = "Gebze Bilişim Firması: Siber Güvenlik ve IT Altyapı | BTM Bilişim";
const DESCRIPTION =
  "2010'dan beri IT danışmanlık, siber güvenlik ve sızma testi, ağ ve sunucu altyapısı, bulut yedekleme. Gebze, Kocaeli ve İstanbul'da BTM Bilişim.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title: TITLE, description: DESCRIPTION, url: absoluteUrl("/"), images: [DEFAULT_OG_IMAGE] },
};

// Latest posts are read from the DB (HomeBlogSection); 5-min backstop.
export const revalidate = 300;

const IT_CONSULTING = "/danismanlik/it-danismanlik-hizmetleri/";

const IT_STEPS = [
  { icon: SearchCheck, title: "Keşif ve analiz", text: "Altyapınızı, güvenliğinizi ve IT maliyetlerinizi yerinde inceliyoruz." },
  { icon: Route, title: "Yol haritası", text: "Önceliklendirilmiş, kalem kalem bütçelenmiş bir eylem planı sunuyoruz." },
  { icon: Wrench, title: "Uygulama", text: "Kurulum ve geçişleri kendi ekibimizle, minimum kesintiyle yapıyoruz." },
  { icon: Headphones, title: "Sürekli destek", text: "İzleme, bakım ve dış kaynak IT müdürü hizmetiyle sistemi ayakta tutuyoruz." },
];

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

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero: the offer on the left, a direct line on the right */}
      <section className="relative overflow-hidden bg-brand-gradient">
        <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative grid max-w-7xl grid-cols-1 items-center gap-10 py-12 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-300">
              <span className="h-px w-8 bg-gold-300" aria-hidden="true" />
              2010&apos;dan beri · Gebze · Kocaeli · İstanbul
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-[3.5rem]">
              IT danışmanlıktan siber güvenliğe, <span className="text-gold-300">bilişiminizin tek muhatabı.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              İşletmenizin IT altyapısını planlıyor, kuruyor ve güvence altına alıyoruz. ISO 27001 baş denetçi
              deneyimiyle her projeye önce güvenlik gözüyle bakıyor, önerdiğimiz işi sahada kendimiz uyguluyoruz.
            </p>
            <ul className="mt-7 space-y-2.5 text-sm text-slate-200">
              {["Satıcıdan bağımsız teknoloji yol haritası", "Sızma testi ve siber güvenlik", "Ağ, sunucu, bulut ve yedekleme"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" /> {t}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-8">
              <Button href={IT_CONSULTING}>
                IT Danışmanlık Hizmetleri <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Direct line */}
          <div className="rounded-card bg-white p-6 shadow-lift md:p-7">
            <h2 className="font-display text-xl font-semibold text-navy-800">Bize doğrudan ulaşın</h2>
            <p className="mt-1 text-sm text-slate-600">Arayın veya WhatsApp&apos;tan yazın; ihtiyacınızı uzmanla birlikte netleştirin.</p>
            <div className="mt-5 space-y-3">
              <a
                href={site.mobile.href}
                className="flex items-center gap-4 rounded-control bg-gold-500 px-4 py-3.5 text-navy-950 transition-colors hover:bg-gold-400"
              >
                <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-medium">Hemen arayın</span>
                  <span className="block font-display text-lg font-semibold">{site.mobile.display}</span>
                </span>
              </a>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-control bg-[#0f7a40] px-4 py-3.5 text-white transition-colors hover:bg-[#0b6434]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-medium">
                    WhatsApp&apos;tan yazın<span className="visually-hidden"> (yeni sekmede açılır)</span>
                  </span>
                  <span className="block font-display text-lg font-semibold">{site.mobile.display}</span>
                </span>
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Sabit hat:{" "}
              <a href={site.phone.href} className="font-semibold text-navy-800 hover:text-navy-700">
                {site.phone.display}
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* IT consulting: the base of every engagement, with the lead-auditor credential */}
      <section className="cv-auto bg-white py-20 md:py-24">
        <Container className="grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="IT Danışmanlık"
              title="Tüm süreçlerimizin temelinde IT danışmanlığı var."
              description="Önce ihtiyacı ve riski netleştiriyor, sonra altyapıyı, güvenliği ve yazılımı buna göre kuruyoruz. Danışmanlık raporda kalmaz: önerdiğimiz her işi kendi ekibimizle uygular, sonrasında da yönetiriz."
            />
            <p className="mt-6 flex items-start gap-3 rounded-card border border-navy-950/10 bg-paper-50 p-4 text-sm leading-relaxed text-slate-700">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-navy-800" aria-hidden="true" />
              <span>
                Projelerimiz ISO 27001 baş denetçi deneyimiyle yürütülür; KVKK ve ISO 27001 gereksinimleri her kurulumun
                parçasıdır. Belgelendirme için{" "}
                <a
                  href="https://www.iso27001danismanlik.com/"
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-navy-800 underline underline-offset-4 hover:text-navy-700"
                >
                  iso27001danismanlik.com<span className="visually-hidden"> (yeni sekmede açılır)</span>
                </a>
                .
              </span>
            </p>
            <div className="mt-8">
              <Button href={IT_CONSULTING} variant="navy">
                IT danışmanlık hizmetlerimiz <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {IT_STEPS.map((s, i) => (
              <MotionReveal key={s.title} as="li" delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-navy-950/10 bg-paper-50 p-5">
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-control bg-navy-800 text-white">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-slate-600">Adım {i + 1}</span>
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </MotionReveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Service areas: plain tiles; detail lives on the category pages */}
      <section className="cv-auto bg-paper-50 py-20 md:py-24" id="hizmetler">
        <Container className="max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Hizmet Alanlarımız"
              title="Danışmanlıktan uygulamaya tek ekip"
              description="IT danışmanlığıyla planladığımız her işi; siber güvenlikten ağ ve sunucu altyapısına, buluttan lisanslamaya kendi uzmanlarımızla hayata geçiriyoruz."
            />
            <Button href="/hizmetler/" variant="ghost-light">
              Tüm hizmetler <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
            </Button>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategoryList.map((c, i) => {
              const Icon = categoryIcons[c.slug];
              return (
                <MotionReveal key={c.slug} as="li" delay={(i % 3) * 0.05} className="h-full">
                  <Link
                    href={`/${c.slug}/`}
                    className="group flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-5 shadow-card transition-shadow hover:shadow-lift"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-navy-800 text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-start justify-between gap-2 font-display text-lg font-semibold text-ink-900 group-hover:text-navy-800">
                        {c.title}
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600">{c.summary}</span>
                    </span>
                  </Link>
                </MotionReveal>
              );
            })}
          </ul>

          <Link
            href="/risk-skoru-testi/"
            className="mt-6 flex flex-col items-start justify-between gap-3 rounded-card border border-navy-950/10 bg-white p-5 transition-shadow hover:shadow-lift sm:flex-row sm:items-center"
          >
            <span className="flex items-center gap-3">
              <Gauge className="h-6 w-6 shrink-0 text-navy-800" aria-hidden="true" />
              <span>
                <span className="block font-display text-base font-semibold text-ink-900">Siber güvenlik risk skorunuzu öğrenin</span>
                <span className="block text-sm text-slate-600">8 soru, yaklaşık 2 dakika, ücretsiz.</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
              Testi başlat <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
            </span>
          </Link>
        </Container>
      </section>

      {/* Software & web: secondary, in-house team */}
      <section className="cv-auto bg-navy-950 py-20 md:py-24">
        <Container className="max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Yazılım & Web"
              title="Kendi yazılım ekibimiz, kendi ürünlerimiz."
              description="Saha deneyimimizi yazılıma dönüştürüyoruz: ihtiyacınıza özel yazılım ve web sitesi geliştiriyor, kurumsal yazılım ürünlerimizi projelerinizde kullanıyoruz."
              tone="dark"
            />
            <Button href="/yazilim-urunlerimiz/" variant="ghost-dark">
              Yazılım ürünlerimiz <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {SOFTWARE_SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex items-start gap-4 rounded-card bg-white/5 p-6 ring-1 ring-white/15 transition-colors hover:bg-white/10"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-white/10 text-white ring-1 ring-white/20">
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-3 font-display text-lg font-semibold text-white">
                    {s.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-slate-300">{s.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <TrustSection />

      {/* Quote form — #teklif: header, article CTAs and AI-written posts link here. */}
      <section id="teklif" className="scroll-mt-28 bg-white py-16 md:py-24">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Ücretsiz Keşif & Teklif"
                title="İhtiyacınızı yazın, size dönelim."
                description="Birkaç bilgiyle kapsamınızı anlayalım; ön görüşme ve keşif ücretsizdir."
              />
              <ul className="mt-6 space-y-2.5 text-sm text-ink-900">
                {["Ücretsiz ön görüşme ve keşif", "Kalem kalem, şeffaf teklif", "Kurulumdan sonra bakım ve destek"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-navy-700" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
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
