import Link from "next/link";
import { ArrowRight, ChevronRight, Mail, MapPin, MessageCircle, Phone, Headphones } from "lucide-react";
import { Container } from "./Container";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { serviceCategoryList } from "@/lib/services";
import { references, team } from "@/lib/data/trust";

// Corporate footer: contact strip, site map columns (service areas, products,
// corporate pages) and the legal bar. Logo-blue ground, orange accents.

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

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">
      <span className="h-0.5 w-5 rounded-full bg-gold-500" aria-hidden="true" />
      {children}
    </h2>
  );
}

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="group flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-white">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gold-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-300">

      {/* Contact strip */}
      <div data-footer-cta="" className="relative border-b border-white/10">
        <Container className="flex flex-col items-start justify-between gap-5 py-8 md:flex-row md:items-center lg:max-w-7xl">
          <div>
            <p className="font-display text-2xl font-bold text-white">Projenizi birlikte planlayalım.</p>
            <p className="mt-1 text-sm text-slate-300">Ücretsiz keşif ve teklif için bize ulaşın; aynı gün dönüş yapalım.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#teklif"
              className="inline-flex items-center gap-2 rounded-control bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
            >
              Teklif Alın <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 rounded-control border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
            </a>
          </div>
        </Container>
      </div>

      <Container className="relative grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:max-w-7xl lg:grid-cols-3 xl:grid-cols-[1.3fr_1fr_1.2fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/logo-full-light.webp"
            alt="BTM Bilişim — Bilgi Teknolojileri Merkezi"
            width={375}
            height={120}
            loading="lazy"
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.description}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a href={site.phone.href} className="flex items-center gap-3 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /> {site.phone.display}
              </a>
            </li>
            <li>
              <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white">
                <MessageCircle className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /> {site.mobile.display} (WhatsApp)
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /> {site.email}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.supportEmail.address}`} className="flex items-start gap-3 break-all hover:text-white">
                <Headphones className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>
                  {site.supportEmail.address}
                  <span className="block text-xs text-slate-400">{site.supportEmail.label}</span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /> {site.address}
            </li>
          </ul>
        </div>

        <div>
          <Heading>Hizmet Alanları</Heading>
          <LinkList items={serviceCategoryList.map((c) => ({ label: c.shortTitle, href: `/${c.slug}/` }))} />
        </div>

        <div>
          <Heading>Popüler Hizmetler</Heading>
          <LinkList items={POPULAR_SERVICES} />
        </div>

        <div>
          <Heading>Yazılım Ürünleri</Heading>
          <LinkList items={products.map((p) => ({ label: p.name, href: `/yazilim-urunlerimiz/${p.slug}/` }))} />
        </div>

        <div>
          <Heading>Kurumsal</Heading>
          <LinkList items={corporate} />
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-slate-300 md:flex-row md:items-center md:justify-between lg:max-w-7xl">
          <span>
            © {new Date().getFullYear()} {site.name} — {site.legalName}. Tüm hakları saklıdır.
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
            <button type="button" id="cookie-prefs" className="hover:text-white">
              Çerez Tercihleri
            </button>
            <a href="https://www.iso27001danismanlik.com/" target="_blank" rel="noopener" className="hover:text-white">
              SEO ve Tasarım<span className="visually-hidden"> (yeni sekmede açılır)</span>
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
