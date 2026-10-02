import Link from "next/link";
import { ArrowRight, ChevronRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "./Container";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { serviceCategoryList } from "@/lib/services";
import { references, team } from "@/lib/data/trust";

// Corporate footer: contact strip, site map columns (service areas, products,
// corporate pages) and the legal bar. Logo-blue ground, orange accents.

const corporate = [
  { label: "Hakkımızda", href: "/hakkimizda/" },
  ...(team.length ? [{ label: "Ekibimiz", href: "/ekibimiz/" }] : []),
  ...(references.length ? [{ label: "Referanslar", href: "/referanslar/" }] : []),
  { label: "Hizmet Rehberi", href: "/hizmet-rehberi/" },
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
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      {/* Contact strip */}
      <div className="relative border-b border-white/10">
        <Container className="flex flex-col items-start justify-between gap-5 py-8 md:flex-row md:items-center lg:max-w-7xl">
          <div>
            <p className="font-display text-2xl font-bold text-white">Projenizi birlikte planlayalım.</p>
            <p className="mt-1 text-sm text-slate-300">Ücretsiz keşif ve teklif için bize ulaşın; aynı gün dönüş yapalım.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#teklif"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-navy-950 transition-colors hover:bg-gold-400"
            >
              Teklif Alın <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
            </a>
          </div>
        </Container>
      </div>

      <Container className="relative grid gap-10 py-14 md:grid-cols-2 lg:max-w-7xl lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
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
          </div>
        </Container>
      </div>
    </footer>
  );
}
