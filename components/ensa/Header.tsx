"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  Award,
  Cookie,
  Gauge,
  Users,
  FileLock2,
  LayoutGrid,
  Mail,
  Menu,
  Newspaper,
  Package,
  Send,
  X,
  type LucideIcon,
} from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { serviceCategoryList } from "@/lib/services";
import { servicePagesContent } from "@/lib/servicePages";
import { products } from "@/lib/products";
import { categoryIcons, productIcons, serviceIcon } from "@/lib/serviceIcons";
import { references, team } from "@/lib/data/trust";

// Mega-menu header (layout modelled on invekor.com.tr): "Hizmetler" opens all
// six service areas with their sub-services, "Ürünler" the software products,
// "Hakkımızda" the corporate pages. Desktop menus open on hover/focus (CSS
// only); on mobile everything collapses into an accordion.

/** Sub-services shown per area in the desktop mega menu; the rest sit behind "Tümü". */
const MEGA_ITEMS = 5;

const detailSlug = new Map(servicePagesContent.map((s) => [`${s.categorySlug}/${s.serviceKey}`, s.slug]));
const areas = serviceCategoryList.map((c) => ({
  slug: c.slug,
  title: c.shortTitle,
  icon: categoryIcons[c.slug],
  services: c.services.map((s) => {
    const slug = detailSlug.get(`${c.slug}/${s.key}`);
    return { key: s.key, name: s.name, href: slug ? `/${c.slug}/${slug}/` : `/${c.slug}/` };
  }),
}));

const corporate: { label: string; href: string; icon: LucideIcon; note: string }[] = [
  { label: "Şirket", href: "/hakkimizda/", icon: Building2, note: "BTM Bilişim'i tanıyın" },
  // Team and references appear once lib/data/trust.ts has real entries.
  ...(team.length ? [{ label: "Ekibimiz", href: "/ekibimiz/", icon: Users, note: "Uzman kadromuz" }] : []),
  ...(references.length ? [{ label: "Referanslar", href: "/referanslar/", icon: Award, note: "Bize güvenen kurumlar" }] : []),
  { label: "Hizmet Rehberi", href: "/hizmet-rehberi/", icon: BookOpen, note: "Sahadaki hizmet sayfalarımız" },
  { label: "Risk Skoru Testi", href: "/risk-skoru-testi/", icon: Gauge, note: "8 soruda güvenlik risk seviyeniz" },
  { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni/", icon: FileLock2, note: "Kişisel verilerin korunması" },
  { label: "Çerez Politikası", href: "/cerez-politikasi/", icon: Cookie, note: "Çerez kullanımı ve tercihler" },
];

const servicePrefixes = [...areas.map((a) => `/${a.slug}/`), "/hizmet-rehberi/", "/hizmetler/"];

/** Pathname with a trailing slash, so it compares equal to the hrefs above. */
const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);

const topLink = (active: boolean) =>
  `flex items-center gap-1.5 rounded-sm px-3 py-2 text-[14.5px] font-medium transition-colors ${
    active ? "text-navy-800" : "text-slate-500 hover:text-navy-800"
  }`;

// Desktop dropdown panel: hidden until its trigger group is hovered or focused.
const panel =
  "invisible absolute top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100";
const panelBox =
  "rounded-lg border border-navy-950/10 bg-white shadow-[0_28px_60px_-28px_rgba(7,43,85,0.35)]";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const pathname = norm(usePathname());

  const servicesActive = servicePrefixes.some((h) => pathname.startsWith(h));
  const productsActive = pathname.startsWith("/yazilim-urunlerimiz/");
  const corporateActive = corporate.some((c) => pathname === c.href) && !servicesActive;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    // First read after paint: avoids a forced layout during hydration.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = () => {
    setOpen(false);
    setSection(null);
  };
  const toggle = (name: string) => setSection((s) => (s === name ? null : name));

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-navy-950/10 shadow-[0_6px_24px_-16px_rgba(7,43,85,0.35)]" : "border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between gap-6 py-3 lg:max-w-7xl">
        <Logo />

        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          {/* Hizmetler — mega menu */}
          <div className="group">
            <Link href="/hizmetler/" className={topLink(servicesActive)} aria-haspopup="true">
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              Hizmetler
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-180" aria-hidden="true" />
            </Link>
            <div className={`${panel} left-1/2 w-[min(1040px,calc(100vw-48px))] -translate-x-1/2`}>
              <div className={`${panelBox} p-7`}>
                <div className="grid grid-cols-3 gap-x-8 gap-y-7">
                  {areas.map((a) => (
                    <div key={a.slug}>
                      <Link
                        href={`/${a.slug}/`}
                        className="mb-3 flex items-center justify-between gap-3 border-b border-navy-950/10 pb-2.5 text-navy-800 hover:text-navy-700"
                      >
                        <span className="flex items-center gap-2 font-display text-[15px] font-semibold">
                          <a.icon className="h-4.5 w-4.5" aria-hidden="true" />
                          {a.title}
                        </span>
                        <span className="rounded-full bg-paper-100 px-2 py-0.5 text-[11px] font-semibold text-navy-800">
                          {a.services.length}
                        </span>
                      </Link>
                      <ul className="space-y-0.5">
                        {a.services.slice(0, MEGA_ITEMS).map((s) => {
                          const Icon = serviceIcon(s.key);
                          return (
                            <li key={s.key}>
                              <Link
                                href={s.href}
                                className="flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-[13.5px] text-slate-600 transition-colors hover:bg-paper-50 hover:text-navy-800"
                              >
                                <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                                {s.name}
                              </Link>
                            </li>
                          );
                        })}
                        {a.services.length > MEGA_ITEMS && (
                          <li>
                            <Link
                              href={`/${a.slug}/`}
                              className="flex items-center gap-1 px-2 py-1.5 text-[12.5px] font-semibold text-gold-700 hover:text-gold-600"
                            >
                              Tümü ({a.services.length}) <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link
                  href="/hizmet-rehberi/"
                  className="mt-7 flex items-center justify-between rounded-md bg-paper-50 px-4 py-3 transition-colors hover:bg-paper-100"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-gold-600" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold text-ink-900">Hizmet Rehberi</span>
                      <span className="block text-xs text-slate-500">
                        Ağ, sunucu, kamera, yedekleme ve güvenlik — sahadaki hizmet sayfalarımız
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Ürünler */}
          <div className="group relative">
            <Link href="/yazilim-urunlerimiz/" className={topLink(productsActive)} aria-haspopup="true">
              <Package className="h-4 w-4" aria-hidden="true" />
              Ürünler
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-180" aria-hidden="true" />
            </Link>
            <div className={`${panel} left-1/2 w-[640px] -translate-x-1/2`}>
              <div className={`${panelBox} p-4`}>
                <div className="grid grid-cols-2 gap-1">
                  {products.map((p) => {
                    const Icon = productIcons[p.slug] ?? Package;
                    return (
                      <Link
                        key={p.slug}
                        href={`/yazilim-urunlerimiz/${p.slug}/`}
                        className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-paper-50"
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gold-500/10 text-gold-600">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink-900">{p.name}</span>
                          <span className="block text-xs leading-snug text-slate-500">{p.tagline}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/yazilim-urunlerimiz/"
                  className="mt-2 flex items-center justify-between rounded-md bg-paper-50 px-4 py-2.5 text-sm font-semibold text-navy-800 hover:bg-paper-100"
                >
                  Tüm yazılım ürünlerimiz <ArrowUpRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Hakkımızda */}
          <div className="group relative">
            <Link href="/hakkimizda/" className={topLink(corporateActive)} aria-haspopup="true">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              Hakkımızda
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-180" aria-hidden="true" />
            </Link>
            <div className={`${panel} left-0 w-[320px]`}>
              <div className={`${panelBox} p-2`}>
                {corporate.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-paper-50"
                  >
                    <c.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold text-ink-900">{c.label}</span>
                      <span className="block text-xs text-slate-500">{c.note}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/blog/" className={topLink(pathname.startsWith("/blog/"))}>
            <Newspaper className="h-4 w-4" aria-hidden="true" />
            Blog
          </Link>
          <Link href="/iletisim/" className={topLink(pathname === "/iletisim/")}>
            <Mail className="h-4 w-4" aria-hidden="true" />
            İletişim
          </Link>
        </nav>

        <Link
          href="/#teklif"
          className="hidden items-center gap-2 rounded-md bg-gold-500 px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-navy-950 shadow-[0_10px_24px_-12px_rgba(232,129,47,0.9)] transition-colors hover:bg-gold-400 lg:inline-flex"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Hemen Teklif Al
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm p-2 text-ink-900 lg:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="mobil-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div id="mobil-menu" className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-navy-950/10 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <Link href="/" onClick={close} className="rounded-sm px-2 py-3 text-base font-medium text-ink-900">
              Ana Sayfa
            </Link>

            <button
              type="button"
              onClick={() => toggle("hizmetler")}
              aria-expanded={section === "hizmetler"}
              className="flex items-center justify-between rounded-sm px-2 py-3 text-base font-medium text-ink-900"
            >
              Hizmetler
              <ChevronDown className={`h-4 w-4 transition-transform ${section === "hizmetler" ? "rotate-180" : ""}`} />
            </button>
            {section === "hizmetler" && (
              <div className="mb-2 space-y-3 border-l-2 border-gold-500/40 pl-3">
                {areas.map((a) => (
                  <details key={a.slug} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-1.5 text-sm font-semibold text-navy-800">
                      <span className="flex items-center gap-2">
                        <a.icon className="h-4 w-4" aria-hidden="true" />
                        {a.title}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <div className="mt-1 flex flex-col">
                      <Link href={`/${a.slug}/`} onClick={close} className="px-2 py-2 text-sm font-medium text-gold-700">
                        Tüm {a.title} hizmetleri
                      </Link>
                      {a.services.map((s) => (
                        <Link key={s.key} href={s.href} onClick={close} className="px-2 py-2 text-sm text-slate-600">
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </details>
                ))}
                <Link href="/hizmet-rehberi/" onClick={close} className="block py-1.5 text-sm font-semibold text-navy-800">
                  Hizmet Rehberi
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => toggle("urunler")}
              aria-expanded={section === "urunler"}
              className="flex items-center justify-between rounded-sm px-2 py-3 text-base font-medium text-ink-900"
            >
              Ürünler
              <ChevronDown className={`h-4 w-4 transition-transform ${section === "urunler" ? "rotate-180" : ""}`} />
            </button>
            {section === "urunler" && (
              <div className="mb-2 flex flex-col border-l-2 border-gold-500/40 pl-3">
                <Link href="/yazilim-urunlerimiz/" onClick={close} className="px-2 py-2 text-sm font-medium text-gold-700">
                  Tüm ürünler
                </Link>
                {products.map((p) => (
                  <Link key={p.slug} href={`/yazilim-urunlerimiz/${p.slug}/`} onClick={close} className="px-2 py-2 text-sm text-slate-600">
                    {p.name}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => toggle("kurumsal")}
              aria-expanded={section === "kurumsal"}
              className="flex items-center justify-between rounded-sm px-2 py-3 text-base font-medium text-ink-900"
            >
              Hakkımızda
              <ChevronDown className={`h-4 w-4 transition-transform ${section === "kurumsal" ? "rotate-180" : ""}`} />
            </button>
            {section === "kurumsal" && (
              <div className="mb-2 flex flex-col border-l-2 border-gold-500/40 pl-3">
                {corporate.map((c) => (
                  <Link key={c.href} href={c.href} onClick={close} className="px-2 py-2 text-sm text-slate-600">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/blog/" onClick={close} className="rounded-sm px-2 py-3 text-base font-medium text-ink-900">
              Blog
            </Link>
            <Link href="/iletisim/" onClick={close} className="rounded-sm px-2 py-3 text-base font-medium text-ink-900">
              İletişim
            </Link>
            <Link
              href="/#teklif"
              onClick={close}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy-950"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Hemen Teklif Al
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
