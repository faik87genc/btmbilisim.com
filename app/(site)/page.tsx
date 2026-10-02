import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  CalendarCheck,
  Check,
  Clock,
  Cog,
  Headphones,
  MapPin,
  Phone,
  PhoneCall,
  Search,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { FaqSection } from "@/components/ensa/FaqSection";
import { HomeBlogSection } from "@/components/ensa/HomeBlogSection";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { ProductCard } from "@/components/ensa/ProductCard";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { Button } from "@/components/ensa/Button";
import { QuoteForm } from "@/components/QuoteForm";
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
// /anasayfa-2/. Section layout partly modelled on invekor.com.tr; every claim
// here is true for BTM — no invented customer counts, years or reviews.

const TITLE = "BTM Bilişim | Siber Güvenlik, Altyapı ve Yazılım Çözümleri";
const DESCRIPTION =
  "BTM Bilişim; siber güvenlik, sızma testi, ağ ve sunucu altyapısı, bulut yedekleme, lisanslama ve kurumsal yazılım ürünleriyle Gebze, Kocaeli ve Türkiye genelinde hizmet verir.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: absoluteUrl("/"), images: [DEFAULT_OG_IMAGE] },
};

// Latest posts are read from the DB (HomeBlogSection); 5-min backstop.
export const revalidate = 300;

const HERO_POINTS = [
  "Sızma testi deneyimiyle güvenlik odaklı kurulum",
  "Ağ, sunucu, bulut ve yedekleme tek ekipte",
  "Gebze merkezli, Kocaeli ve İstanbul'da yerinde servis",
  "Kurulum sonrası bakım, izleme ve hızlı müdahale",
];

const QUICK_TILES = [
  { title: "Siber Güvenlik & Sızma Testi", href: "/siber-guvenlik/", icon: ShieldCheck },
  { title: "Sistem & Network", href: "/sistem-network/", icon: categoryIcons["sistem-network"] },
  { title: "Bulut & Yedekleme", href: "/bulut-yedekleme/", icon: categoryIcons["bulut-yedekleme"] },
  { title: "Yazılım Ürünlerimiz", href: "/yazilim-urunlerimiz/", icon: Boxes },
];

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

const WHY = [
  {
    icon: ShieldCheck,
    title: "Güvenlik Odaklı Kurulum",
    text: "Her kurulumu sızma testi deneyimimizin ışığında, sıkılaştırılmış ve dokümante edilmiş şekilde teslim ediyoruz.",
    tag: "Önce güvenlik",
  },
  {
    icon: UserCheck,
    title: "Tek Muhatap",
    text: "Ağdan sunucuya, yedeklemeden lisanslamaya tüm bilişim işleriniz için tek bir ekiple çalışırsınız.",
    tag: "Uçtan uca",
  },
  {
    icon: Headphones,
    title: "7/24 Teknik Destek",
    text: "Arıza anında hızlı müdahale, düzenli bakım ve uzaktan izleme ile sistemleriniz ayakta kalır.",
    tag: "Her zaman aktif",
  },
  {
    icon: Sparkles,
    title: "Kendi Yazılım Ürünlerimiz",
    text: `Atlas, Orbit, PentForce gibi ${products.length} kurumsal yazılım ürünümüzü projelerinizde kullanabilirsiniz.`,
    tag: "Ürün + hizmet",
  },
];

const detailSlug = new Map(servicePagesContent.map((s) => [`${s.categorySlug}/${s.serviceKey}`, s.slug]));
const CHIPS_PER_AREA = 5;

function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        tone === "dark" ? "bg-white/10 text-gold-300 ring-1 ring-white/15" : "bg-gold-500/10 text-gold-700 ring-1 ring-gold-500/25"
      }`}
    >
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-gradient">
        <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:max-w-7xl lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Eyebrow tone="dark">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> BTM Bilişim
              </Eyebrow>
              <Eyebrow tone="dark">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Gebze Merkezli
              </Eyebrow>
            </div>
            <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl">
              İşletmenizin bilişim altyapısında <span className="text-gold-300">güvendiğiniz</span> ortak.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Siber güvenlik ve sızma testinden ağ altyapısına, sunucu ve sanallaştırmadan bulut yedeklemeye kadar tüm
              bilişim ihtiyaçlarınızı tek ekiple planlıyor, kuruyor ve ayakta tutuyoruz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#teklif"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-bold text-navy-950 shadow-[0_14px_30px_-14px_rgba(232,129,47,0.9)] transition-colors hover:bg-gold-400"
              >
                Ücretsiz Keşif Talep Edin <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/hizmetler/"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                Hizmetlerimiz
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["7/24", "Teknik Destek"],
                ["Uçtan Uca", "Keşif · Kurulum · Bakım"],
                ["Gebze", "Yerinde Servis"],
              ].map(([v, l]) => (
                <div key={v}>
                  <dt className="font-display text-2xl font-bold text-gold-300">{v}</dt>
                  <dd className="mt-1 text-xs text-slate-300">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)]">
            <h2 className="font-display text-xl font-bold text-navy-800">Neden BTM Bilişim?</h2>
            <ul className="mt-5 space-y-3.5">
              {HERO_POINTS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-ink-900">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href="/hakkimizda/"
              className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
            >
              Bizi Tanıyın <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Quick tiles overlapping the hero edge */}
      <Container className="relative z-10 -mt-10 lg:max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_TILES.map((t, i) => (
            <MotionReveal key={t.href} delay={i * 0.05} className="h-full">
              <Link
                href={t.href}
                className="group flex h-full items-center justify-between gap-4 rounded-xl border border-navy-950/10 bg-white p-5 shadow-[0_18px_40px_-24px_rgba(7,43,85,0.4)] transition-all hover:-translate-y-1 hover:border-gold-500/50"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-800/10 text-navy-800 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                    <t.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-[15px] font-semibold text-ink-900">{t.title}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
              </Link>
            </MotionReveal>
          ))}
        </div>
      </Container>

      {/* Service areas — invekor-style intro panel + category cards with sub-service chips */}
      <section className="bg-paper-50 py-20 md:py-24" id="hizmetler">
        <Container className="lg:max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Hizmetlerimiz</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-navy-800 md:text-5xl">
              Kurumsal BT ve güvenlik hizmetlerimiz
            </h2>
            <p className="mt-4 text-slate-500">
              Danışmanlıktan siber güvenliğe, sistem ve network altyapısından buluta, yazılımdan lisanslamaya kadar tüm
              ihtiyaçlarınızı tek çatı altında topluyoruz.
            </p>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-2xl bg-brand-gradient p-7 text-white md:p-9">
            <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold">Tüm teknoloji yolculuğunuz için tek iş ortağı</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">
                Altyapı, güvenlik, bulut, yazılım ve lisanslama… BTM Bilişim olarak bilişim mimarinizi uçtan uca
                tasarlıyor, kuruyor ve sürekli geliştiriyoruz; kendi yazılım ürünlerimizle de destekliyoruz.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {serviceCategoryList.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/15 hover:bg-white/20"
                  >
                    <Check className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" /> {c.title}
                  </Link>
                ))}
              </div>
              <Link
                href="#teklif"
                className="mt-6 flex items-center justify-between rounded-lg bg-white/10 px-5 py-3.5 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15"
              >
                İhtiyaçlarınıza uygun çözüm paketini birlikte şekillendirelim
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategoryList.map((c, i) => {
              const Icon = categoryIcons[c.slug];
              return (
                <MotionReveal key={c.slug} delay={(i % 3) * 0.06} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-navy-950/10 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(7,43,85,0.35)] transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(7,43,85,0.45)]">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold text-ink-900">{c.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{c.summary}</p>
                      </div>
                    </div>
                    <ul className="mb-6 mt-5 flex flex-wrap gap-2">
                      {c.services.slice(0, CHIPS_PER_AREA).map((s) => {
                        const slug = detailSlug.get(`${c.slug}/${s.key}`);
                        return (
                          <li key={s.key}>
                            <Link
                              href={slug ? `/${c.slug}/${slug}/` : `/${c.slug}/`}
                              className="inline-flex items-center gap-1.5 rounded-md bg-paper-100 px-2.5 py-1 text-xs text-slate-600 transition-colors hover:bg-gold-500/15 hover:text-ink-900"
                            >
                              <Check className="h-3 w-3 text-emerald-600" aria-hidden="true" />
                              {s.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href={`/${c.slug}/`}
                      className="mt-auto flex items-center justify-between rounded-lg bg-paper-50 px-4 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-paper-100"
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

      {/* Software products */}
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-24">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <Container className="relative lg:max-w-7xl">
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

      {/* Field services (the old BTM service pages) */}
      <section className="bg-white py-20 md:py-24">
        <Container className="lg:max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Hizmet Rehberi</Eyebrow>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-navy-800 md:text-4xl">
                Sahada verdiğimiz hizmetler
              </h2>
              <p className="mt-3 text-slate-500">
                Ağ, sunucu, yedekleme ve güvenlik hizmetlerimizin ayrıntılı sayfaları; kurulumdan bakıma kadar.
              </p>
            </div>
            <Button href="/hizmet-rehberi/" variant="ghost-light">
              <BookOpen className="h-4 w-4" aria-hidden="true" /> Hizmet Rehberi
            </Button>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {home.serviceGroups.map((g) => (
              <div key={g.title}>
                <div className="flex items-baseline justify-between border-b-2 border-navy-800 pb-2">
                  <h3 className="font-display text-lg font-bold text-ink-900">{g.title}</h3>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{g.items.length} hizmet</span>
                </div>
                <ul className="mt-3 divide-y divide-navy-950/5">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className="group flex items-start justify-between gap-4 py-3">
                        <span>
                          <span className="block text-[15px] font-semibold text-ink-900 group-hover:text-navy-700">{it.title}</span>
                          <span className="block text-sm text-slate-500">{it.short}</span>
                        </span>
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section className="bg-paper-50 py-20 md:py-24">
        <Container className="lg:max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Çalışma Sürecimiz</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy-800 md:text-5xl">Nasıl çalışıyoruz?</h2>
            <p className="mt-4 text-slate-500">
              4 adımlı, net bir süreçle ihtiyacınızı karşılıyor, devreye almadan sonra da yanınızda kalıyoruz.
            </p>
          </div>
          <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <span
              className="absolute left-[12%] right-[12%] top-11 hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--navy-700)_0_24px,var(--gold-500)_24px_48px)] lg:block"
              aria-hidden="true"
            />
            {STEPS.map((s, i) => {
              const orange = i % 2 === 1;
              return (
                <MotionReveal key={s.title} as="li" delay={i * 0.08} className="relative flex flex-col items-center">
                  <span
                    className={`relative z-10 flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full border-4 bg-white ${
                      orange ? "border-gold-500/40" : "border-navy-700/30"
                    }`}
                  >
                    <span
                      className={`flex h-16 w-16 flex-col items-center justify-center rounded-full text-white ${
                        orange ? "bg-gold-500" : "bg-navy-700"
                      }`}
                    >
                      <s.icon className="h-6 w-6" aria-hidden="true" />
                      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider">Adım {i + 1}</span>
                    </span>
                  </span>
                  <div className="mt-6 flex h-full w-full flex-col rounded-2xl border border-navy-950/10 bg-white p-6 text-center shadow-[0_18px_40px_-30px_rgba(7,43,85,0.35)]">
                    <h3 className="font-display text-xl font-bold text-ink-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.text}</p>
                    <ul className="mt-4 space-y-1.5 text-left text-sm text-slate-600">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2">
                          <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionReveal>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Why BTM */}
      <section className="bg-white py-20 md:py-24">
        <Container className="lg:max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Neden Biz?</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy-800 md:text-5xl">
              Neden BTM Bilişim&apos;i tercih etmelisiniz?
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <MotionReveal key={w.title} delay={i * 0.06} className="h-full">
                <div className="relative flex h-full flex-col items-center rounded-2xl border border-navy-950/10 bg-white p-7 text-center shadow-[0_18px_40px_-30px_rgba(7,43,85,0.35)]">
                  <span className="absolute right-4 top-4 rounded-md bg-paper-100 px-2 py-0.5 text-xs font-bold text-navy-800">
                    0{i + 1}
                  </span>
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-800/10 text-navy-800">
                    <w.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{w.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{w.text}</p>
                  <span className="mt-5 rounded-md bg-paper-100 px-3 py-1 text-xs font-semibold text-navy-800">{w.tag}</span>
                </div>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Free analysis band */}
      <section className="relative overflow-hidden bg-brand-gradient py-16 md:py-20">
        <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative max-w-3xl text-center">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <PhoneCall className="h-7 w-7 text-white" aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-display text-4xl font-bold text-white md:text-5xl">Ücretsiz keşif ve ihtiyaç analizi</h2>
          <p className="mt-4 text-lg text-slate-300">
            Altyapınızı birlikte değerlendirelim, size özel çözümü ve net bir yol haritasını sunalım.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#teklif"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy-800 hover:bg-paper-100"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Keşif Randevusu Alın
            </Link>
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-bold text-white hover:border-gold-300 hover:text-gold-300"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-1.5">
              <SearchCheck className="h-4 w-4" aria-hidden="true" /> Ücretsiz keşif
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" /> Yerinde inceleme
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> Aynı gün dönüş
            </li>
          </ul>
        </Container>
      </section>

      {/* Quote form — #teklif: header CTA, article CTAs and AI-written posts link here. */}
      <section id="teklif" className="scroll-mt-28 bg-paper-50 py-16 md:py-24">
        <Container className="lg:max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <Eyebrow>Hızlı Teklif</Eyebrow>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-navy-800 md:text-4xl">
                İhtiyacınızı anlatın, aynı gün dönelim.
              </h2>
              <p className="mt-4 text-slate-500">
                Birkaç bilgiyle kapsamınızı anlayalım; keşif randevusu ve teklif için en kısa sürede sizinle iletişime
                geçelim.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-ink-900">
                {["Ücretsiz keşif ve ihtiyaç analizi", "Kalem kalem, şeffaf teklif", "Kurulumdan sonra bakım ve destek"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> {t}
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-6 text-sm text-slate-500">
                Hemen konuşmak isterseniz:{" "}
                <a href={site.phone.href} className="font-semibold text-navy-800 hover:text-gold-700">
                  {site.phone.display}
                </a>{" "}
                ·{" "}
                <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-800 hover:text-gold-700">
                  WhatsApp
                </a>
              </p>
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
