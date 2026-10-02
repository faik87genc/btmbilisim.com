import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  CalendarCheck,
  Factory,
  Network,
  PieChart,
  Radar,
  Receipt,
  ShieldCheck,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Product } from "@/lib/products";
import { MotionReveal } from "./MotionReveal";

const productIcons: Record<string, LucideIcon> = {
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

export function ProductCard({
  product,
  delay = 0,
  tone = "light",
}: {
  product: Product;
  delay?: number;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  const Icon = productIcons[product.slug] ?? PieChart;

  return (
    <MotionReveal delay={delay} className="h-full">
      <Link
        href={`/yazilim-urunlerimiz/${product.slug}/`}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 ${
          isDark
            ? "border-paper-50/10 bg-navy-800 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]"
            : "border-navy-950/10 bg-white hover:shadow-[0_18px_40px_-24px_rgba(10,18,32,0.35)]"
        }`}
      >
        {/* Gold radial glow on hover */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/0 blur-3xl transition-colors duration-500 group-hover:bg-gold-500/10"
          aria-hidden="true"
        />
        {/* Top accent line growing on hover */}
        <span
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100"
          aria-hidden="true"
        />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-md border ${
                isDark
                  ? "border-gold-500/30 bg-gold-500/10 text-gold-300"
                  : "border-gold-500/30 bg-gold-500/10 text-gold-600"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span
              className={`font-mono text-[11px] uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {product.code}
            </span>
          </div>
          <h3
            className={`mt-4 font-display text-lg font-semibold ${
              isDark ? "text-paper-50" : "text-ink-900"
            }`}
          >
            {product.name}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {product.tagline}
          </p>
        </div>

        <div
          className={`relative mt-6 flex items-center justify-between border-t pt-4 ${
            isDark ? "border-paper-50/10" : "border-navy-950/10"
          }`}
        >
          <span
            className={`text-xs uppercase tracking-wider ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {product.category}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${
              isDark ? "text-gold-300" : "text-gold-600"
            }`}
          >
            Ürünü keşfedin
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </MotionReveal>
  );
}
