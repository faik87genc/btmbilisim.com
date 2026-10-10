import type { LucideIcon } from "lucide-react";

// The site's one icon shape (identity v2): a 44px brand-50 square (12px
// radius) with a 20px brand-blue lucide icon at 1.75 stroke. On dark grounds a
// translucent tile with a light ring. Decorative — the meaning is always
// carried by the text next to it.
export function IconTile({
  icon: Icon,
  tone = "light",
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  tone?: "light" | "dark";
  /** md: 44px tile, 20px icon · lg: 48px tile, 24px icon */
  size?: "md" | "lg";
  className?: string;
}) {
  const box = size === "lg" ? "h-12 w-12" : "h-11 w-11";
  const glyph = size === "lg" ? "h-6 w-6" : "h-5 w-5";
  const surface = tone === "dark" ? "bg-white/[0.06] text-gold-300 ring-1 ring-white/15" : "bg-gold-100 text-gold-600";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-xl ${box} ${surface} ${className}`}>
      <Icon className={glyph} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
