import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  Cookie,
  FileLock2,
  Gauge,
  Package,
  Phone,
  SearchCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavActive } from "./NavActive";
import { categoryIcons, productIcons, serviceIcon } from "@/lib/serviceIcons";
import { navAreas, navCorporate, navProducts, navReferences, type CorporateKey } from "@/lib/navigation";
import { site } from "@/lib/site";

// Mega-menu header (layout modelled on invekor.com.tr). Server-rendered: the
// desktop menus open on hover/focus with CSS only, so none of this markup is
// hydrated. Client code is limited to <MobileMenu> (< lg) and <NavActive>
// (current-section highlight, closing a menu after a click).

/** Sub-services shown per area in the desktop mega menu; the rest sit behind "Tümü". */
const MEGA_ITEMS = 5;

const corporateIcons: Record<CorporateKey, LucideIcon> = {
  sirket: Building2,
  ekip: Users,
  risk: Gauge,
  kvkk: FileLock2,
  cerez: Cookie,
};

const servicePrefixes = [...navAreas.map((a) => `/${a.slug}/`), "/hizmetler/"].join(" ");
const corporatePrefixes = navCorporate
  .map((c) => c.href)
  .join(" ");

const topLink =
  "flex items-center gap-1.5 whitespace-nowrap rounded-md px-1.5 py-2 text-[14px] xl:px-3 xl:text-[15px] font-medium text-slate-600 transition-colors hover:text-navy-950 data-[active]:text-navy-950 data-[active]:underline data-[active]:decoration-gold-600 data-[active]:decoration-2 data-[active]:underline-offset-[10px]";

// Desktop dropdown panel. Open/close timing lives in ensa.css (.mega-panel):
// a short open delay and a longer close delay, so moving the pointer
// diagonally from the trigger to a far column of the panel does not close it.
// Never shown while #site-header has data-menus-off (see NavActive).
// The panel scales in from its trigger (transform-origin set in ensa.css).
const panel = "mega-panel absolute top-full z-50 pt-3";
const panelBox = "rounded-card border border-line bg-white shadow-lift";

const chevron = "h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-180";

export function Header() {
  return (
    // Translucent material + scroll-edge shadow instead of a hard border: see
    // .site-header in ensa.css (solid white for reduced transparency / more contrast).
    <header id="site-header" className="site-header sticky top-0 z-50">
      <NavActive />
      <Container className="relative flex items-center justify-between gap-6 py-3 lg:max-w-7xl lg:gap-4 xl:gap-6">
        {/* 1024–1279px: a slightly smaller logo leaves room for the extra nav item and the CTA pair. */}
        <Logo className="shrink-0" imgClassName="h-11 md:h-14 lg:h-11 xl:h-14" />

        <nav aria-label="Ana menü" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          <Link href="/danismanlik/it-danismanlik-hizmetleri/" className={topLink} data-nav="/danismanlik/it-danismanlik-hizmetleri/">
            IT Danışmanlık
          </Link>

          {/* Hizmetler — mega menu */}
          <div className="group" data-menu-group="">
            <Link href="/hizmetler/" className={topLink} data-nav={servicePrefixes}>
              Hizmetler
              <ChevronDown className={chevron} aria-hidden="true" />
            </Link>
            <div data-menu-panel="" className={`${panel} left-1/2 w-[min(1040px,calc(100vw-48px))] -translate-x-1/2`}>
              <div className={`${panelBox} p-7`}>
                <div className="grid grid-cols-3 gap-x-8 gap-y-7">
                  {navAreas.map((a) => {
                    const AreaIcon = categoryIcons[a.slug];
                    return (
                      <div key={a.slug}>
                        <Link
                          href={`/${a.slug}/`}
                          className="mb-3 flex items-center justify-between gap-3 border-b border-line pb-2.5 text-navy-950 hover:text-gold-700"
                        >
                          <span className="flex items-center gap-2 font-display text-[15px] font-semibold">
                            {AreaIcon && <AreaIcon className="h-4.5 w-4.5 text-gold-600" strokeWidth={1.75} aria-hidden="true" />}
                            {a.title}
                          </span>
                          <span className="rounded-md bg-paper-50 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-slate-600 ring-1 ring-line">
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
                                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13.5px] text-slate-600 transition-colors hover:bg-paper-50 hover:text-navy-950"
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
                                className="flex items-center gap-1 px-2 py-1.5 text-[12.5px] font-semibold text-gold-700 hover:text-gold-800"
                              >
                                Tümü ({a.services.length})<span className="visually-hidden"> {a.title} hizmetleri</span> <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/hizmetler/"
                  className="mt-7 flex items-center justify-between rounded-control bg-paper-50 px-4 py-3 ring-1 ring-line transition-colors hover:bg-gold-100"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-gold-600" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-semibold text-ink-900">Tüm Hizmetler</span>
                      <span className="block text-xs text-slate-500">
                        IT danışmanlıktan lisanslamaya tüm hizmetlerimiz tek sayfada
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Ürünler */}
          <div className="group relative" data-menu-group="">
            <Link href="/yazilim-urunlerimiz/" className={topLink} data-nav="/yazilim-urunlerimiz/">
              Ürünler
              <ChevronDown className={chevron} aria-hidden="true" />
            </Link>
            <div data-menu-panel="" className={`${panel} left-1/2 w-[640px] -translate-x-1/2`}>
              <div className={`${panelBox} p-4`}>
                <div className="grid grid-cols-2 gap-1">
                  {navProducts.map((p) => {
                    const Icon = productIcons[p.slug] ?? Package;
                    return (
                      <Link
                        key={p.slug}
                        href={`/yazilim-urunlerimiz/${p.slug}/`}
                        className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-paper-50"
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
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
                  className="mt-2 flex items-center justify-between rounded-control bg-paper-50 px-4 py-2.5 text-sm font-semibold text-navy-950 ring-1 ring-line hover:bg-gold-100"
                >
                  Tüm yazılım ürünlerimiz <ArrowUpRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {navReferences && (
            <Link href={navReferences.href} className={topLink} data-nav={navReferences.href}>
              {navReferences.label}
            </Link>
          )}

          {/* Hakkımızda */}
          <div className="group relative" data-menu-group="">
            <Link href="/hakkimizda/" className={topLink} data-nav={corporatePrefixes}>
              Hakkımızda
              <ChevronDown className={chevron} aria-hidden="true" />
            </Link>
            <div data-menu-panel="" data-origin="start" className={`${panel} left-0 w-[320px]`}>
              <div className={`${panelBox} p-2`}>
                {navCorporate.map((c) => {
                  const Icon = corporateIcons[c.key];
                  return (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-paper-50"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      <span>
                        <span className="block text-sm font-semibold text-ink-900">{c.label}</span>
                        <span className="block text-xs text-slate-500">{c.note}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <Link href="/blog/" className={topLink} data-nav="/blog/">
            Blog
          </Link>
          <Link href="/iletisim/" className={topLink} data-nav="/iletisim/">
            İletişim
          </Link>
        </nav>

        {/* CTA pair: the written request (free site survey) leads, the phone
            stays one tap away as a secondary icon button (the number itself
            is in the TopBar above; at 1024–1279px only the floating call
            button, for width). Phones use the bottom call bar instead. */}
        <div className="flex items-center gap-2">
          <a
            href={site.phone.href}
            aria-label={`Hemen arayın — ${site.phone.display}`}
            title={`Hemen arayın — ${site.phone.display}`}
            className="press hidden h-10 w-10 shrink-0 items-center justify-center rounded-control border border-slate-400 bg-white text-navy-950 transition-[color,background-color,border-color,transform] hover:border-gold-600 hover:text-gold-700 md:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/#teklif"
            className="press hidden h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-control bg-gold-500 px-4 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-gold-700 sm:inline-flex xl:px-5"
          >
            <SearchCheck className="h-4 w-4" aria-hidden="true" />
            Ücretsiz Keşif
          </Link>

          <MobileMenu
          areas={navAreas}
          products={navProducts.map(({ slug, name }) => ({ slug, name }))}
          corporate={navCorporate.map(({ label, href }) => ({ label, href }))}
          references={navReferences}
          />
        </div>
      </Container>
    </header>
  );
}
