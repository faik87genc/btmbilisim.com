"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CalendarCheck,
  Check,
  Factory,
  Network,
  PieChart,
  Radar,
  Receipt,
  ShieldCheck,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "@/lib/products";

const icons: Record<string, LucideIcon> = {
  atlas: PieChart,
  "cek-senet-programi": Receipt,
  cyberware: ShieldCheck,
  cyberquan: Factory,
  cyberhost: Wifi,
  pentforce: Radar,
  "fornet-enterprise": Network,
  otium: CalendarCheck,
  orbit: Boxes,
};

// Real product screenshots / key visuals, one per product.
const shots: Record<string, { src: string; w: number; h: number; alt: string }> = {
  atlas: { src: "/hero/atlas-1.jpg", w: 1600, h: 900, alt: "Atlas bütçe ve finans paneli" },
  "cek-senet-programi": {
    src: "/products/cek-senet/cek-hazirlama.webp",
    w: 1600,
    h: 765,
    alt: "Çek senet programı çek hazırlama ekranı",
  },
  cyberquan: { src: "/hero/cyberquan-1.png", w: 1671, h: 941, alt: "CyberQuan üretim izleme paneli" },
  cyberhost: { src: "/hero/cyberhost-1.jpg", w: 1376, h: 768, alt: "CyberHost misafir Wi-Fi yönetimi" },
  pentforce: { src: "/hero/pentforce-1.jpg", w: 1376, h: 768, alt: "PentForce otonom sızma testi platformu" },
  "fornet-enterprise": { src: "/hero/fornet-1.jpg", w: 1376, h: 768, alt: "FORNET ENTERPRISE izleme platformu" },
  otium: { src: "/hero/otium-1.jpg", w: 1376, h: 768, alt: "Otium izin yönetimi" },
  orbit: { src: "/hero/orbit-1.jpg", w: 1953, h: 544, alt: "Orbit IT envanter ve helpdesk" },
};

const INTERVAL = 6500;

export function ProductShowcase({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const next = useCallback(() => setActive((i) => (i + 1) % products.length), [products.length]);

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(next, INTERVAL);
    return () => window.clearTimeout(t);
  }, [active, paused, reduced, next]);

  const p = products[active];

  return (
    <div
      className="grid grid-cols-1 gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-label="Yazılım ürünlerimiz"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {products.map((item, i) => {
          const ItemIcon = icons[item.slug] ?? PieChart;
          const on = i === active;
          return (
            <button
              key={item.slug}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`relative flex shrink-0 items-center gap-3 overflow-hidden rounded-control border px-4 py-3 text-left transition-colors lg:w-full ${
                on
                  ? "border-gold-400/70 bg-white shadow-[0_14px_30px_-18px_rgb(7_26_49/0.45)]"
                  : "border-slate-200 bg-white/60 hover:border-gold-400/50 hover:bg-white"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  on ? "bg-gold-400 text-navy-950" : "bg-gold-100 text-gold-600"
                }`}
              >
                <ItemIcon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block whitespace-nowrap font-display text-[0.9375rem] font-semibold text-navy-950">
                  {item.name}
                </span>
                <span className="hidden truncate text-xs text-slate-500 lg:block">{item.category}</span>
              </span>
              {on && !reduced && (
                <span
                  key={`${active}-${paused}`}
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gold-400"
                  style={{
                    animation: paused ? "none" : `showcase-progress ${INTERVAL}ms linear forwards`,
                    transform: paused ? "scaleX(1)" : undefined,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" aria-live="polite" className="min-w-0">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[28px] bg-[radial-gradient(60%_80%_at_80%_0%,rgb(232_129_47/0.28),transparent_70%)] blur-xl"
          />
          <div className="relative overflow-hidden rounded-[18px] border border-navy-950/10 bg-navy-950 shadow-[0_30px_60px_-30px_rgb(7_26_49/0.7)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-navy-900 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold-400" />
              <span className="ml-3 truncate rounded-md bg-white/10 px-3 py-0.5 text-[11px] text-slate-300">
                btmbilisim.com/yazilim-urunlerimiz/{p.slug}
              </span>
            </div>
            <div className="relative aspect-[16/8.5] bg-navy-900">
              {products.map((item, i) => {
                const s = shots[item.slug];
                const on = i === active;
                const ItemIcon = icons[item.slug] ?? PieChart;
                return (
                  <div
                    key={item.slug}
                    aria-hidden={!on}
                    className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${
                      on ? "scale-100 opacity-100" : "pointer-events-none scale-[1.02] opacity-0"
                    }`}
                  >
                    {s ? (
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={s.w}
                        height={s.h}
                        priority={i === 0}
                        sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, calc(100vw - 32px)"
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(60%_80%_at_50%_0%,rgb(232_129_47/0.25),transparent_70%)]">
                        <ItemIcon className="h-16 w-16 text-gold-400" strokeWidth={1.25} aria-hidden="true" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="eyebrow">{p.category}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-navy-950 md:text-3xl">
              {p.name}
              <span className="ml-3 text-base font-normal text-slate-500 md:text-lg">{p.tagline}</span>
            </h3>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-slate-600">{p.description}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`/yazilim-urunlerimiz/${p.slug}/`}
            className="btn btn-primary shrink-0"
          >
            Ürünü inceleyin <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ShowcaseAllLink() {
  return (
    <Link
      href="/yazilim-urunlerimiz/"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700"
    >
      Tüm yazılım ürünleri <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
