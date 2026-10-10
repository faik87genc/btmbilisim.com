"use client";

import { useEffect, useRef, useState } from "react";
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
  references,
}: {
  areas: NavArea[];
  products: { slug: string; name: string }[];
  corporate: { label: string; href: string }[];
  /** Top-level "Referanslar" item, same as the desktop nav (null while there are none). */
  references: { label: string; href: string } | null;
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const toggle = (name: string) => setSection((s) => (s === name ? null : name));
  const group = (name: string, label: string) => (
    <button
      type="button"
      onClick={() => toggle(name)}
      aria-expanded={section === name}
      aria-controls={`mm-${name}`}
      className="flex items-center justify-between rounded-md px-2 py-3 text-base font-medium text-ink-900"
    >
      {label}
      <ChevronDown className={`h-4 w-4 transition-transform ${section === name ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
  );

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="inline-flex items-center justify-center rounded-control p-2 text-navy-950 lg:hidden"
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
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white shadow-lift lg:hidden"
        >
          {/* Bottom padding clears the fixed "Hemen Ara / WhatsApp" bar so the last CTA stays tappable. */}
          <Container className="flex flex-col gap-1 pt-4 pb-24">
            <Link onClick={() => setOpen(false)} href="/" className="rounded-md px-2 py-3 text-base font-medium text-ink-900">
              Ana Sayfa
            </Link>
            <Link onClick={() => setOpen(false)} href="/danismanlik/it-danismanlik-hizmetleri/" className="rounded-md px-2 py-3 text-base font-semibold text-gold-700">
              IT Danışmanlık
            </Link>

            {group("hizmetler", "Hizmetler")}
            {section === "hizmetler" && (
              <div id="mm-hizmetler" className="mb-2 space-y-3 border-l border-line pl-3">
                {areas.map((a) => {
                  const Icon = categoryIcons[a.slug];
                  return (
                    <details key={a.slug} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-1.5 text-sm font-semibold text-navy-950">
                        <span className="flex items-center gap-2">
                          {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                          {a.title}
                        </span>
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <div className="mt-1 flex flex-col">
                        <Link onClick={() => setOpen(false)} href={`/${a.slug}/`} className="px-2 py-2 text-sm font-medium text-gold-700">
                          Tüm {a.title} hizmetleri
                        </Link>
                        {a.services.map((s) => (
                          <Link key={s.key} onClick={() => setOpen(false)} href={s.href} className="px-2 py-2 text-sm text-slate-600">
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </details>
                  );
                })}
                <Link onClick={() => setOpen(false)} href="/hizmetler/" className="block py-1.5 text-sm font-semibold text-navy-950">
                  Tüm Hizmetler
                </Link>
              </div>
            )}

            {group("urunler", "Ürünler")}
            {section === "urunler" && (
              <div id="mm-urunler" className="mb-2 flex flex-col border-l border-line pl-3">
                <Link onClick={() => setOpen(false)} href="/yazilim-urunlerimiz/" className="px-2 py-2 text-sm font-medium text-gold-700">
                  Tüm ürünler
                </Link>
                {products.map((p) => (
                  <Link key={p.slug} onClick={() => setOpen(false)} href={`/yazilim-urunlerimiz/${p.slug}/`} className="px-2 py-2 text-sm text-slate-600">
                    {p.name}
                  </Link>
                ))}
              </div>
            )}

            {references && (
              <Link onClick={() => setOpen(false)} href={references.href} className="rounded-md px-2 py-3 text-base font-medium text-ink-900">
                {references.label}
              </Link>
            )}

            {group("kurumsal", "Hakkımızda")}
            {section === "kurumsal" && (
              <div id="mm-kurumsal" className="mb-2 flex flex-col border-l border-line pl-3">
                {corporate.map((c) => (
                  <Link key={c.href} onClick={() => setOpen(false)} href={c.href} className="px-2 py-2 text-sm text-slate-600">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}

            <Link onClick={() => setOpen(false)} href="/blog/" className="rounded-md px-2 py-3 text-base font-medium text-ink-900">
              Blog
            </Link>
            <Link onClick={() => setOpen(false)} href="/iletisim/" className="rounded-md px-2 py-3 text-base font-medium text-ink-900">
              İletişim
            </Link>
            <Link
              href="/#teklif"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-control bg-gold-500 px-5 py-3 text-sm font-semibold text-white"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Ücretsiz Keşif İsteyin
            </Link>
          </Container>
        </div>
      )}
    </>
  );
}
