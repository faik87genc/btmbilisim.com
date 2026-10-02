import Link from "next/link";
import { ChevronRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "./Container";
import { site } from "@/lib/site";
import { products } from "@/lib/products";

const quickLinks = [
  { label: "Hakkımızda", href: "/hakkimizda/" },
  { label: "Hizmetlerimiz", href: "/hizmetler/" },
  { label: "Hizmet Rehberi", href: "/hizmet-rehberi/" },
  { label: "Yazılım Ürünlerimiz", href: "/yazilim-urunlerimiz/" },
  { label: "Blog", href: "/blog/" },
  { label: "İletişim", href: "/iletisim/" },
];

const legalLinks = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni/" },
  { label: "Çerez Politikası", href: "/cerez-politikasi/" },
];

const contactRows = [
  { icon: Phone, label: "Sabit Telefon", value: site.phone.display, href: site.phone.href },
  { icon: MessageCircle, label: "WhatsApp", value: site.whatsapp.display, href: site.whatsapp.href },
  { icon: Mail, label: "Mail Adresimiz", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Konumumuz", value: "Gebze / Kocaeli", href: "/iletisim/" },
];

const brandPillars = ["SİBER GÜVENLİK", "ALTYAPI", "YAZILIM"];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-gold-800">
      <span className="h-px w-6 bg-gold-600" />
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-navy-950/10 bg-paper-100">
      <span
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700"
        aria-hidden="true"
      />

      <Container className="relative py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.95fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/logo-full.webp"
              alt="BTM Bilişim — Bilgi Teknolojileri Merkezi"
              width={375}
              height={120}
              loading="lazy"
              className="h-12 w-auto"
            />
            <p className="mt-5 font-display text-lg font-semibold">
              <span className="bg-gradient-to-r from-gold-700 to-gold-600 bg-clip-text text-transparent">
                Dijital geleceğinizi güvenle şekillendirin.
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              {site.description}
            </p>
          </div>

          <div>
            <FooterHeading>Hızlı Menü</FooterHeading>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-ink-900 transition-colors hover:text-gold-600"
                  >
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-gold-500 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Yazılım Ürünlerimiz</FooterHeading>
            <ul className="mt-5 space-y-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/yazilim-urunlerimiz/${product.slug}/`}
                    className="group flex items-center gap-1.5 text-sm text-ink-900 transition-colors hover:text-gold-600"
                  >
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-gold-500 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>İletişim Bilgilerimiz</FooterHeading>
            <ul className="mt-5 space-y-4">
              {contactRows.map((row) => (
                <li key={row.label} className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-600">
                    <row.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      {row.label}
                    </div>
                    <a
                      href={row.href}
                      className="text-sm font-medium text-ink-900 transition-colors hover:text-gold-600"
                    >
                      {row.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-navy-950/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 text-xs text-slate-500 md:flex-row md:items-center md:gap-5">
            <span>
              © {new Date().getFullYear()} {site.name} — {site.legalName}. Tüm hakları
              saklıdır.
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-ink-900"
                >
                  {link.label}
                </Link>
              ))}
              <button type="button" id="cookie-prefs" className="transition-colors hover:text-ink-900">
                Çerez Tercihleri
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-800">
            {brandPillars.map((pillar, i) => (
              <span key={pillar} className="flex items-center gap-3">
                {pillar}
                {i < brandPillars.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-gold-500/60" />
                )}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
