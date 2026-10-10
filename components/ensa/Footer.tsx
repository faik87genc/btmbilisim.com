import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone, Headphones } from "lucide-react";
import { Container } from "./Container";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { serviceCategoryList } from "@/lib/services";
import { references, team } from "@/lib/data/trust";

// Corporate footer (identity v2): the closing CTA panel, four columns (company
// + contact, service areas & products, popular services, corporate), the legal
// identity block (only fields filled in lib/site.ts) and the legal bar.
// Ink-950 ground; brand-300 is the only accent.

// Sitewide links to the main service pages: they help crawlers reach and
// weigh these pages (in-content links still matter more).
const POPULAR_SERVICES = [
  { label: "IT Danışmanlık Hizmetleri", href: "/danismanlik/it-danismanlik-hizmetleri/" },
  { label: "Sızma Testi (Penetrasyon Testi)", href: "/siber-guvenlik/sizma-testi-penetrasyon-testi/" },
  { label: "Siber Güvenlik Danışmanlığı", href: "/siber-guvenlik/siber-guvenlik-danismanligi/" },
  { label: "ISO 27001 Danışmanlığı", href: "/danismanlik/iso-27001-bilgi-guvenligi-danismanligi/" },
  { label: "KVKK Danışmanlığı", href: "/danismanlik/kvkk-danismanligi/" },
  { label: "Network (Ağ) Altyapısı Kurulumu", href: "/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/" },
  { label: "Sunucu Kurulumu ve Yönetimi", href: "/sistem-network/sunucu-kurulum-ve-yonetimi/" },
  { label: "IP Kamera Sistemleri", href: "/sistem-network/ip-kamera-guvenlik-kamerasi-sistemleri/" },
  { label: "IT Destek ve Bakım", href: "/sistem-network/it-bakim-ve-destek-hizmetleri/" },
  { label: "Veri Yedekleme (Backup)", href: "/bulut-yedekleme/veri-yedekleme-cozumleri/" },
  { label: "Microsoft 365 Çözümleri", href: "/bulut-yedekleme/microsoft-365-cozumleri/" },
  { label: "Kurumsal Web Tasarım", href: "/yazilim-dijital/web-tasarim-ve-kurumsal-web-sitesi/" },
];

const corporate = [
  { label: "Hakkımızda", href: "/hakkimizda/" },
  ...(team.length ? [{ label: "Ekibimiz", href: "/ekibimiz/" }] : []),
  ...(references.length ? [{ label: "Referanslar", href: "/referanslar/" }] : []),
  { label: "Tüm Hizmetler", href: "/hizmetler/" },
  { label: "Risk Skoru Testi", href: "/risk-skoru-testi/" },
  { label: "Blog", href: "/blog/" },
  { label: "İletişim", href: "/iletisim/" },
];

const legal = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni/" },
  { label: "Çerez Politikası", href: "/cerez-politikasi/" },
];

// Legal identity line: only the fields that are filled in lib/site.ts
// (site.legal); today that is the legal name and the address.
const L = site.legal as Record<keyof typeof site.legal, string>;
const legalIdentity = [
  L.tradeName || site.legalName,
  L.mersis && `MERSİS: ${L.mersis}`,
  L.tradeRegistry && `Ticaret Sicil: ${L.tradeRegistry}`,
  (L.taxOffice || L.taxNumber) && `Vergi: ${[L.taxOffice, L.taxNumber].filter(Boolean).join(" / ")}`,
  L.kep && `KEP: ${L.kep}`,
  site.address,
].filter((x): x is string => Boolean(x));

// Social accounts: only the ones filled in lib/site.ts (all empty today).
const SOCIAL_LABELS: Record<keyof typeof site.social, string> = { linkedin: "LinkedIn", instagram: "Instagram", x: "X" };
const social = (Object.keys(site.social) as (keyof typeof site.social)[])
  .map((k) => ({ label: SOCIAL_LABELS[k], href: site.social[k] as string }))
  .filter((s) => s.href);

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white">{children}</h2>;
}

function LinkList({ items, className = "mt-5" }: { items: { label: string; href: string }[]; className?: string }) {
  return (
    <ul className={`${className} space-y-1`}>
      {items.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="inline-flex min-h-8 items-center rounded-sm text-sm text-slate-300 transition-colors hover:text-white"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const contactLink = "flex items-start gap-3 rounded-sm text-sm text-slate-300 transition-colors hover:text-white";
const contactIcon = "mt-0.5 h-4 w-4 shrink-0 text-gold-300";

export function Footer() {
  return (
    <footer className="relative bg-navy-950 text-slate-300">
      {/* Closing CTA panel (hidden on pages that end with their own ContactCta band) */}
      <div data-footer-cta="" className="pt-14 md:pt-20">
        <Container className="lg:max-w-7xl">
          <div className="card-dark relative overflow-hidden px-6 py-8 md:px-10 md:py-10">
            <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <p className="eyebrow eyebrow-dark">Ücretsiz keşif</p>
                <p className="mt-3 text-balance font-display text-2xl font-bold tracking-[-0.02em] text-white md:text-[2rem] md:leading-[1.15]">
                  Projenizi birlikte planlayalım.
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-300">
                  Ücretsiz keşif ve teklif için bize ulaşın; en geç bir iş günü içinde dönüş yapalım.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/#teklif"
                  className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-white px-6 text-[0.9375rem] font-semibold text-navy-950 transition-colors hover:bg-gold-100"
                >
                  Teklif Alın <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={site.phone.href}
                  className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-control border border-white/30 px-6 text-[0.9375rem] font-semibold tabular-nums text-white transition-colors hover:border-gold-300 hover:text-gold-300"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-x-8 gap-y-12 py-14 sm:grid-cols-2 md:py-16 lg:max-w-7xl lg:grid-cols-[1.35fr_1fr_1.1fr_0.9fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/logo-full-light.webp"
            alt="BTM Bilişim — Bilgi Teknolojileri Merkezi"
            width={375}
            height={120}
            loading="lazy"
            className="h-12 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.description}</p>
          <ul className="mt-6 space-y-3">
            <li>
              <a href={site.phone.href} className={contactLink}>
                <Phone className={contactIcon} strokeWidth={1.75} aria-hidden="true" />
                <span className="tabular-nums">{site.phone.display}</span>
              </a>
            </li>
            <li>
              <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className={contactLink}>
                <MessageCircle className={contactIcon} strokeWidth={1.75} aria-hidden="true" />
                <span className="tabular-nums">
                  {site.mobile.display} (WhatsApp)<span className="visually-hidden"> (yeni sekmede açılır)</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${contactLink} break-all`}>
                <Mail className={contactIcon} strokeWidth={1.75} aria-hidden="true" /> {site.email}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.supportEmail.address}`} className={`${contactLink} break-all`}>
                <Headphones className={contactIcon} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  {site.supportEmail.address}
                  <span className="block text-xs text-slate-300/80">{site.supportEmail.label}</span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <Clock className={contactIcon} strokeWidth={1.75} aria-hidden="true" /> {site.hours.label}
            </li>
          </ul>
          {social.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Sosyal medya">
              {social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center rounded-md px-3 text-sm font-medium text-slate-200 ring-1 ring-white/15 hover:text-white hover:ring-gold-300/60"
                  >
                    {s.label}
                    <span className="visually-hidden"> (yeni sekmede açılır)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <Heading>Hizmet Alanları</Heading>
          <LinkList items={serviceCategoryList.map((c) => ({ label: c.shortTitle, href: `/${c.slug}/` }))} />
          <div className="mt-9">
            <Heading>Yazılım Ürünleri</Heading>
            <LinkList items={products.map((p) => ({ label: p.name, href: `/yazilim-urunlerimiz/${p.slug}/` }))} />
          </div>
        </div>

        <div>
          <Heading>Popüler Hizmetler</Heading>
          <LinkList items={POPULAR_SERVICES} />
        </div>

        <div>
          <Heading>Kurumsal</Heading>
          <LinkList items={corporate} />
        </div>
      </Container>

      {/* Legal identity: only the fields filled in lib/site.ts → legal */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 md:flex-row md:items-start md:gap-6 lg:max-w-7xl">
          <p className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
            <MapPin className="h-3.5 w-3.5 text-gold-300" strokeWidth={1.75} aria-hidden="true" /> Şirket bilgileri
          </p>
          <ul className="flex flex-col gap-1.5 text-xs leading-relaxed text-slate-300 md:flex-row md:flex-wrap md:gap-x-2">
            {legalIdentity.map((item, i) => (
              <li key={item} className="md:flex md:gap-2">
                {i > 0 && (
                  <span className="hidden text-slate-300/50 md:inline" aria-hidden="true">
                    ·
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-slate-300 md:flex-row md:items-center md:justify-between lg:max-w-7xl">
          <span>
            © {new Date().getFullYear()} {site.name} — {site.legalName}. Tüm hakları saklıdır.
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-sm hover:text-white">
                {l.label}
              </Link>
            ))}
            <button type="button" id="cookie-prefs" className="rounded-sm hover:text-white">
              Çerez Tercihleri
            </button>
            {/* Site-wide credit link: nofollow so Google never reads it as a footer link scheme
                against the sister site; the in-content links (home, about, IT consulting) carry the SEO value. */}
            <a href="https://www.iso27001danismanlik.com/" target="_blank" rel="noopener nofollow" className="rounded-sm hover:text-white">
              SEO ve Tasarım<span className="visually-hidden"> (yeni sekmede açılır)</span>
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
