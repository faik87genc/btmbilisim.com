import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  Code2,
  ExternalLink,
  Headphones,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  Route,
  SearchCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { FaqSection } from "@/components/ensa/FaqSection";
import { HomeBlogSection } from "@/components/ensa/HomeBlogSection";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { Button } from "@/components/ensa/Button";
import { QuoteForm } from "@/components/QuoteForm";
import { PentestScope, SecurityShowcase, TrustSection } from "@/components/btm/HomeSections";
import { JsonLd } from "@/components/site/Parts";
import { serviceCategoryList } from "@/lib/services";
import { servicePagesContent } from "@/lib/servicePages";
import { products } from "@/lib/products";
import { categoryIcons, productIcons } from "@/lib/serviceIcons";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";
import home from "@/lib/data/home.json";

// Ana Sayfa 1 (the primary homepage; the slider variant is /anasayfa-2/).
// Built for two jobs: rank for "IT danışmanlık" and the core services, and let
// a visitor reach BTM directly (phone / WhatsApp are in the hero, the header
// and the floating buttons). Every claim is true for BTM — no invented
// customer counts or reviews.
//
// Section rhythm: hero (dark) · IT consulting (white) · service areas (paper)
// · security showcase (white) · pentest (dark) · ISO 27001 (paper) · software
// (dark) · [trust, only with real data] · quote (white) · FAQ (paper) · blog.

const TITLE = "IT Danışmanlık ve Siber Güvenlik Hizmetleri | BTM Bilişim";
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
  { icon: Headphones, title: "Sürekli destek", text: "İzleme, bakım ve sanal IT müdürü (vCIO) ile sistemi ayakta tutuyoruz." },
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

const detailSlug = new Map(servicePagesContent.map((s) => [`${s.categorySlug}/${s.serviceKey}`, s.slug]));
const CHIPS_PER_AREA = 3;

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero: the offer on the left, direct contact on the right */}
      <section className="relative overflow-hidden bg-brand-gradient">
        <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative grid max-w-7xl grid-cols-1 items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
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
              deneyimiyle her projeye önce güvenlik gözüyle bakıyor, danışmanlığını yaptığımız işi sahada kendimiz
              uyguluyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={IT_CONSULTING}>
                IT Danışmanlık Hizmetleri <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/hizmetler/" variant="ghost-dark">
                Tüm hizmetler
              </Button>
            </div>
            <ul className="mt-9 grid max-w-xl gap-x-6 gap-y-2.5 text-sm text-slate-200 sm:grid-cols-2">
              {[
                "Satıcıdan bağımsız teknoloji yol haritası",
                "Sızma testi ve siber güvenlik",
                "Ağ, sunucu, bulut ve yedekleme",
                "Yerinde ve uzaktan teknik destek",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Direct contact card */}
          <div className="rounded-card bg-white p-6 shadow-lift md:p-7">
            <h2 className="font-display text-xl font-semibold text-navy-800">Uzmana doğrudan ulaşın</h2>
            <p className="mt-1 text-sm text-slate-600">Çağrı merkezi yok; arayın veya yazın, ihtiyacınızı birlikte netleştirelim.</p>
            <div className="mt-5 space-y-3">
              <a
                href={site.phone.href}
                className="flex items-center gap-4 rounded-control bg-gold-500 px-4 py-3.5 text-navy-950 transition-colors hover:bg-gold-400"
              >
                <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-medium">Hemen arayın</span>
                  <span className="block font-display text-lg font-semibold">{site.phone.display}</span>
                </span>
              </a>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-control bg-[#128C4A] px-4 py-3.5 text-white transition-colors hover:bg-[#0f7a40]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-medium">WhatsApp&apos;tan yazın<span className="visually-hidden"> (yeni sekmede açılır)</span></span>
                  <span className="block font-display text-lg font-semibold">{site.mobile.display}</span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-control border border-navy-950/10 px-4 py-3 text-navy-800 transition-colors hover:bg-paper-50"
              >
                <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 truncate text-sm font-semibold">{site.email}</span>
              </a>
            </div>
            <Link
              href="#teklif"
              className="mt-5 flex items-center justify-between border-t border-navy-950/10 pt-4 text-sm font-semibold text-navy-800 hover:text-navy-700"
            >
              Ücretsiz keşif formu
              <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* IT consulting: the base of every engagement */}
      <section className="cv-auto bg-white py-20 md:py-24">
        <Container className="grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="IT Danışmanlık"
              title="Tüm süreçlerimizin temelinde IT danışmanlığı var."
              description="Önce ihtiyacı ve riski netleştiriyor, sonra altyapıyı, güvenliği ve yazılımı buna göre kuruyoruz. Danışmanlık raporda kalmaz: önerdiğimiz her işi kendi ekibimizle uygular, sonrasında da yönetiriz."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={IT_CONSULTING} variant="navy">
                IT danışmanlık hizmetlerimiz <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="#teklif" variant="ghost-light">
                Ücretsiz ön görüşme
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

      {/* Service areas */}
      <section className="cv-auto bg-paper-50 py-20 md:py-24" id="hizmetler">
        <Container className="max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Hizmet Alanlarımız"
              title="Danışmanlıktan uygulamaya tek ekip"
              description="Siber güvenlikten ağ ve sunucu altyapısına, buluttan lisanslamaya; IT danışmanlığıyla planladığımız her işi kendi uzmanlarımızla hayata geçiriyoruz."
            />
            <Button href="/hizmetler/" variant="ghost-light">
              Tüm hizmetler <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                    <ul className="mb-5 mt-5 space-y-1.5">
                      {c.services.slice(0, CHIPS_PER_AREA).map((s) => {
                        const slug = detailSlug.get(`${c.slug}/${s.key}`);
                        return (
                          <li key={s.key}>
                            <Link
                              href={slug ? `/${c.slug}/${slug}/` : `/${c.slug}/`}
                              className="flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-navy-800"
                            >
                              <Check className="h-3.5 w-3.5 shrink-0 text-navy-700" aria-hidden="true" />
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
        </Container>
      </section>

      <SecurityShowcase />

      <PentestScope />

      {/* ISO 27001 / KVKK — with the sister site iso27001danismanlik.com */}
      <section className="cv-auto bg-paper-50 py-20 md:py-24">
        <Container className="grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SectionHeading
            eyebrow="ISO 27001 & KVKK"
            title="Uyumu belgeyle değil, sahada kuruyoruz."
            description="ISO 27001 baş denetçi deneyimimizle bilgi güvenliği ve KVKK gereksinimlerini altyapınıza teknik olarak uyguluyoruz: erişim yönetimi, loglama, yedekleme, şifreleme ve zafiyet yönetimi. Belgelendirme sürecinin tamamı için iso27001danismanlik.com ile birlikte çalışıyoruz."
          />
          <div className="rounded-card border border-navy-950/10 bg-white p-6 shadow-card md:p-7">
            <ul className="space-y-3 text-sm text-slate-700">
              {[
                "ISO 27001 bilgi güvenliği yönetim sistemi (BGYS) kurulumu",
                "KVKK teknik ve idari tedbirlerinin uygulanması",
                "Denetim öncesi teknik eksik analizi",
                "Sızma testi ile kontrollerin doğrulanması",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/danismanlik/iso-27001-bilgi-guvenligi-danismanligi/"
                className="flex items-center justify-between rounded-control bg-paper-50 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-paper-100"
              >
                ISO 27001 danışmanlığı <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
              </Link>
              <Link
                href="/danismanlik/kvkk-danismanligi/"
                className="flex items-center justify-between rounded-control bg-paper-50 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-paper-100"
              >
                KVKK danışmanlığı <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
              </Link>
              <a
                href="https://www.iso27001danismanlik.com/"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between rounded-control border border-navy-950/10 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-paper-50"
              >
                iso27001danismanlik.com<span className="visually-hidden"> (yeni sekmede açılır)</span>
                <ExternalLink className="h-4 w-4 text-gold-600" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Software: own products + software / web services (secondary) */}
      <section className="cv-auto bg-navy-950 py-20 md:py-24">
        <Container className="max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Yazılım & Web"
              title="Kendi yazılım ekibimiz, kendi ürünlerimiz."
              description="Saha deneyimimizi yazılıma dönüştürüyoruz: kurumsal ürünlerimizi projelerinizde kullanabilir, ihtiyacınıza özel yazılım ve web sitesi geliştirebiliriz."
              tone="dark"
            />
            <Button href="/yazilim-urunlerimiz/" variant="ghost-dark">
              Tüm ürünler
            </Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
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
          <ul className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => {
              const Icon = productIcons[p.slug];
              return (
                <li key={p.slug}>
                  <Link
                    href={`/yazilim-urunlerimiz/${p.slug}/`}
                    className="flex h-full items-center gap-3 rounded-card bg-white/5 px-4 py-3.5 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                  >
                    {Icon && <Icon className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />}
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white">{p.name}</span>
                      <span className="block truncate text-xs text-slate-300">{p.tagline}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
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
                title="İhtiyacınızı anlatın, size dönelim."
                description="Altyapınızı birlikte değerlendirelim; keşif randevusu ve size özel çözüm için en kısa sürede sizinle iletişime geçelim."
              />
              <ul className="mt-6 space-y-2.5 text-sm text-ink-900">
                {[
                  "Ücretsiz ön görüşme ve keşif",
                  "Kalem kalem, şeffaf teklif",
                  "Kurulumdan sonra bakım ve destek",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-navy-700" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={site.phone.href} variant="navy">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
                </Button>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-control border border-navy-950/15 px-6 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-navy-800/50 hover:bg-paper-50"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp<span className="visually-hidden"> (yeni sekmede açılır)</span>
                </a>
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
