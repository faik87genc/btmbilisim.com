import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  Cookie,
  FileLock2,
  Gauge,
  LayoutGrid,
  Mail,
  Newspaper,
  Package,
  Send,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavActive } from "./NavActive";
import { categoryIcons, productIcons, serviceIcon } from "@/lib/serviceIcons";
import { navAreas, navCorporate, navProducts, type CorporateKey } from "@/lib/navigation";

// Mega-menu header (layout modelled on invekor.com.tr). Server-rendered: the
// desktop menus open on hover/focus with CSS only, so none of this markup is
// hydrated. Client code is limited to <MobileMenu> (< lg) and <NavActive>
// (current-section highlight, closing a menu after a click).

/** Sub-services shown per area in the desktop mega menu; the rest sit behind "Tümü". */
const MEGA_ITEMS = 5;

const corporateIcons: Record<CorporateKey, LucideIcon> = {
  sirket: Building2,
  ekip: Users,
  referans: Award,
  rehber: BookOpen,
  risk: Gauge,
  kvkk: FileLock2,
  cerez: Cookie,
};

const servicePrefixes = [...navAreas.map((a) => `/${a.slug}/`), "/hizmet-rehberi/", "/hizmetler/"].join(" ");
const corporatePrefixes = navCorporate
  .filter((c) => c.key !== "rehber")
  .map((c) => c.href)
  .join(" ");

const topLink =
  "flex items-center gap-1.5 whitespace-nowrap rounded-sm px-2.5 py-2 text-[14.5px] xl:px-3 font-medium text-slate-500 transition-colors hover:text-navy-800 data-[active]:text-navy-800";

// Desktop dropdown panel: display:none until its trigger group is hovered or
// focused, so closed menus cost no layout on any page
// (and never while #site-header has data-menus-off, see NavActive).
const panel =
  "mega-panel absolute top-full z-50 hidden pt-3 group-hover:block group-focus-within:block";
const panelBox = "rounded-lg border border-navy-950/10 bg-white shadow-[0_28px_60px_-28px_rgba(7,43,85,0.35)]";

const chevron = "h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-180";

export function Header() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-navy-950/10 bg-white shadow-[0_6px_24px_-18px_rgba(7,43,85,0.35)]"
    >
      <NavActive />
      <Container className="relative flex items-center justify-between gap-6 py-3 lg:max-w-7xl">
        <Logo />

        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          {/* Hizmetler — mega menu */}
          <div className="group">
            <Link href="/hizmetler/" className={topLink} data-nav={servicePrefixes} aria-haspopup="true">
              <LayoutGrid className="hidden h-4 w-4 xl:block" aria-hidden="true" />
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
                          className="mb-3 flex items-center justify-between gap-3 border-b border-navy-950/10 pb-2.5 text-navy-800 hover:text-navy-700"
                        >
                          <span className="flex items-center gap-2 font-display text-[15px] font-semibold">
                            {AreaIcon && <AreaIcon className="h-4.5 w-4.5" aria-hidden="true" />}
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
                    );
                  })}
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
            <Link href="/yazilim-urunlerimiz/" className={topLink} data-nav="/yazilim-urunlerimiz/" aria-haspopup="true">
              <Package className="hidden h-4 w-4 xl:block" aria-hidden="true" />
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
            <Link href="/hakkimizda/" className={topLink} data-nav={corporatePrefixes} aria-haspopup="true">
              <Building2 className="hidden h-4 w-4 xl:block" aria-hidden="true" />
              Hakkımızda
              <ChevronDown className={chevron} aria-hidden="true" />
            </Link>
            <div data-menu-panel="" className={`${panel} left-0 w-[320px]`}>
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
            <Newspaper className="hidden h-4 w-4 xl:block" aria-hidden="true" />
            Blog
          </Link>
          <Link href="/iletisim/" className={topLink} data-nav="/iletisim/">
            <Mail className="hidden h-4 w-4 xl:block" aria-hidden="true" />
            İletişim
          </Link>
        </nav>

        <Link
          href="/#teklif"
          className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-gold-500 px-4 py-2.5 text-[13px] xl:px-5 font-bold uppercase tracking-wide text-navy-950 shadow-[0_10px_24px_-12px_rgba(232,129,47,0.9)] transition-colors hover:bg-gold-400 lg:inline-flex"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Hemen Teklif Al
        </Link>

        <MobileMenu
          areas={navAreas}
          products={navProducts.map(({ slug, name }) => ({ slug, name }))}
          corporate={navCorporate.map(({ label, href }) => ({ label, href }))}
        />
      </Container>
    </header>
  );
}
