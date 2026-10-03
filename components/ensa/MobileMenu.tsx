"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Send, X } from "lucide-react";
import { Container } from "./Container";
import { categoryIcons } from "@/lib/serviceIcons";
import type { NavArea } from "@/lib/navigation";

// Mobile (< lg) navigation: toggle button + accordion panel. The desktop mega
// menu is server-rendered CSS in Header.tsx; only this part needs state.

export function MobileMenu({
  areas,
  products,
  corporate,
}: {
  areas: NavArea[];
  products: { slug: string; name: string }[];
  corporate: { label: string; href: string }[];
}) {
  const pathname = usePathname();
  // The panel belongs to the page it was opened on, so it closes by itself
  // after any navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v;
    if (next) setSection(null);
    setOpenOn(next ? pathname : null);
  };

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = (name: string) => setSection((s) => (s === name ? null : name));
  const group = (name: string, label: string) => (
    <button
      type="button"
      onClick={() => toggle(name)}
      aria-expanded={section === name}
      className="flex items-center justify-between rounded-sm px-2 py-3 text-base font-medium text-ink-900"
    >
      {label}
      <ChevronDown className={`h-4 w-4 transition-transform ${section === name ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
  );

  return (
    <>
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

      {open && (
        <div
          id="mobil-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-72px)] overflow-y-auto border-t border-navy-950/10 bg-white shadow-[0_24px_40px_-24px_rgba(7,43,85,0.35)] lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            <Link href="/" className="rounded-sm px-2 py-3 text-base font-medium text-ink-900">
              Ana Sayfa
            </Link>

            {group("hizmetler", "Hizmetler")}
            {section === "hizmetler" && (
              <div className="mb-2 space-y-3 border-l-2 border-gold-500/40 pl-3">
                {areas.map((a) => {
                  const Icon = categoryIcons[a.slug];
                  return (
                    <details key={a.slug} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-1.5 text-sm font-semibold text-navy-800">
                        <span className="flex items-center gap-2">
                          {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                          {a.title}
                        </span>
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <div className="mt-1 flex flex-col">
                        <Link href={`/${a.slug}/`} className="px-2 py-2 text-sm font-medium text-gold-700">
                          Tüm {a.title} hizmetleri
                        </Link>
                        {a.services.map((s) => (
                          <Link key={s.key} href={s.href} className="px-2 py-2 text-sm text-slate-600">
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </details>
                  );
                })}
                <Link href="/hizmet-rehberi/" className="block py-1.5 text-sm font-semibold text-navy-800">
                  Hizmet Rehberi
                </Link>
              </div>
            )}

            {group("urunler", "Ürünler")}
            {section === "urunler" && (
              <div className="mb-2 flex flex-col border-l-2 border-gold-500/40 pl-3">
                <Link href="/yazilim-urunlerimiz/" className="px-2 py-2 text-sm font-medium text-gold-700">
                  Tüm ürünler
                </Link>
                {products.map((p) => (
                  <Link key={p.slug} href={`/yazilim-urunlerimiz/${p.slug}/`} className="px-2 py-2 text-sm text-slate-600">
                    {p.name}
                  </Link>
                ))}
              </div>
            )}

            {group("kurumsal", "Hakkımızda")}
            {section === "kurumsal" && (
              <div className="mb-2 flex flex-col border-l-2 border-gold-500/40 pl-3">
                {corporate.map((c) => (
                  <Link key={c.href} href={c.href} className="px-2 py-2 text-sm text-slate-600">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/blog/" className="rounded-sm px-2 py-3 text-base font-medium text-ink-900">
              Blog
            </Link>
            <Link href="/iletisim/" className="rounded-sm px-2 py-3 text-base font-medium text-ink-900">
              İletişim
            </Link>
            <Link
              href="/#teklif"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy-950"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Hemen Teklif Al
            </Link>
          </Container>
        </div>
      )}
    </>
  );
}
