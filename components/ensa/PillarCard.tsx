import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ColumnMotif } from "./ColumnMotif";
import { MotionReveal } from "./MotionReveal";

export function PillarCard({
  index,
  title,
  summary,
  count,
  href,
  delay = 0,
  tone = "dark",
}: {
  index: string;
  title: string;
  summary: string;
  count: string;
  href: string;
  delay?: number;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <MotionReveal delay={delay} className="group h-full">
      <Link
        href={href}
        className={`group/card relative flex h-full flex-col justify-between overflow-hidden rounded-card border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 ${
          isDark
            ? "border-paper-50/10 bg-navy-800"
            : "border-navy-950/10 bg-white shadow-[0_18px_40px_-24px_rgba(10,18,32,0.25)]"
        }`}
      >
        <div className="flex items-start justify-between">
          <ColumnMotif
            className={`h-10 w-8 transition-colors duration-300 group-hover/card:text-gold-300 ${
              isDark ? "text-gold-500/70" : "text-gold-500"
            }`}
          />
          <span className={`font-mono text-xs ${isDark ? "text-slate-300" : "text-slate-500"}`}>
            {index}
          </span>
        </div>

        <div className="mt-10">
          <h3
            className={`font-display text-xl font-semibold ${
              isDark ? "text-paper-50" : "text-ink-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {summary}
          </p>
        </div>

        <div
          className={`mt-8 flex items-center justify-between border-t pt-4 ${
            isDark ? "border-paper-50/10" : "border-navy-950/10"
          }`}
        >
          <span
            className={`font-mono text-xs uppercase tracking-wider ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {count}
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-gold-500 transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:-translate-y-1"
            aria-hidden="true"
          />
        </div>

        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover/card:scale-x-100" />
      </Link>
    </MotionReveal>
  );
}
