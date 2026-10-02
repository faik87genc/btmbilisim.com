"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { serviceCategoryList } from "@/lib/services";

const primaryNav = [
  { label: "Yazılım Ürünlerimiz", href: "/yazilim-urunlerimiz/" },
  { label: "Blog", href: "/blog/" },
  { label: "İletişim", href: "/iletisim/" },
] as const;

const serviceHrefs = [...serviceCategoryList.map((c) => `/${c.slug}/`), "/hizmet-rehberi/"];

/** Pathname with a trailing slash, so it compares equal to the hrefs above. */
const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = norm(usePathname());
  const servicesActive = serviceHrefs.some((h) => pathname.startsWith(h));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    // Defer the first `window.scrollY` read to after paint. Calling it
    // synchronously here forces a layout flush in the middle of hydration,
    // which showed up as the "forced reflow" audit; a fresh load starts at
    // scrollY 0 anyway, and rAF still catches a reload/bfcache mid-scroll.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper-50/95 backdrop-blur transition-shadow duration-300 ${
        scrolled
          ? "border-navy-950/10 shadow-[0_1px_0_0_rgba(10,18,32,0.06)]"
          : "border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:ml-10 lg:flex">
          <Link
            href="/"
            className={`relative py-1 text-[14.5px] font-medium transition-colors ${
              pathname === "/"
                ? "text-ink-900"
                : "text-slate-500 hover:text-ink-900"
            }`}
          >
            Ana Sayfa
          </Link>

          <Link
            href="/hakkimizda/"
            className={`relative py-1 text-[14.5px] font-medium transition-colors ${
              pathname === "/hakkimizda/"
                ? "text-ink-900"
                : "text-slate-500 hover:text-ink-900"
            }`}
          >
            Kurumsal
          </Link>

          <div className="group relative">
            <Link
              href="/hizmetler/"
              className={`flex items-center gap-1 py-1 text-[14.5px] font-medium transition-colors ${
                servicesActive
                  ? "text-ink-900"
                  : "text-slate-500 hover:text-ink-900"
              }`}
            >
              Hizmetlerimiz
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-180" />
            </Link>

            <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-sm border border-navy-950/10 bg-white p-3 shadow-[0_24px_48px_-24px_rgba(10,18,32,0.25)]">
                {serviceCategoryList.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}/`}
                    className="rounded-sm px-3 py-2.5 transition-colors hover:bg-paper-100"
                  >
                    <div className="text-sm font-medium text-ink-900">
                      {category.shortTitle}
                    </div>
                    <div className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {category.services.length} alt hizmet
                    </div>
                  </Link>
                ))}
                <Link
                  href="/hizmet-rehberi/"
                  className="col-span-2 mt-1 flex items-center justify-between rounded-sm border-t border-navy-950/10 px-3 pt-3 pb-2 transition-colors hover:bg-paper-100"
                >
                  <span>
                    <span className="block text-sm font-medium text-ink-900">Hizmet Rehberi</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                      Ağ, sunucu, bulut, kamera ve güvenlik hizmet sayfalarımız
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gold-500" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-[14.5px] font-medium transition-colors ${
                  active ? "text-ink-900" : "text-slate-500 hover:text-ink-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            href="/#teklif"
            variant="primary"
            className="!rounded-md !py-2.5"
          >
            Teklif Al
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm p-2 text-ink-900 lg:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-navy-950/10 bg-paper-50 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`rounded-sm px-2 py-3 text-base font-medium ${
                pathname === "/" ? "text-ink-900" : "text-slate-500"
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/hakkimizda/"
              onClick={() => setOpen(false)}
              className={`rounded-sm px-2 py-3 text-base font-medium ${
                pathname === "/hakkimizda/" ? "text-ink-900" : "text-slate-500"
              }`}
            >
              Kurumsal
            </Link>
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              className={`flex items-center justify-between rounded-sm px-2 py-3 text-base font-medium ${
                servicesActive ? "text-ink-900" : "text-slate-500"
              }`}
            >
              Hizmetlerimiz
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {servicesOpen && (
              <div className="mb-1 flex flex-col gap-0.5 border-l border-navy-950/10 pl-3">
                {serviceCategoryList.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}/`}
                    onClick={() => setOpen(false)}
                    className={`rounded-sm px-2 py-2.5 text-sm ${
                      pathname === `/${category.slug}/`
                        ? "text-ink-900"
                        : "text-slate-500"
                    }`}
                  >
                    {category.shortTitle}
                  </Link>
                ))}
                <Link
                  href="/hizmet-rehberi/"
                  onClick={() => setOpen(false)}
                  className={`rounded-sm px-2 py-2.5 text-sm ${pathname === "/hizmet-rehberi/" ? "text-ink-900" : "text-slate-500"}`}
                >
                  Hizmet Rehberi
                </Link>
              </div>
            )}

            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-sm px-2 py-3 text-base font-medium ${
                  pathname === item.href
                    ? "text-ink-900"
                    : "text-slate-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              href="/#teklif"
              variant="primary"
              className="mt-3"
              onClick={() => setOpen(false)}
            >
              Teklif Al
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
