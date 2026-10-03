import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "navy" | "ghost-light" | "ghost-dark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-navy-950 hover:bg-gold-400 focus-visible:bg-gold-400",
  navy: "bg-navy-800 text-white hover:bg-navy-700",
  "ghost-light":
    "border border-navy-950/15 text-navy-800 hover:border-navy-800/50 hover:bg-paper-50",
  "ghost-dark":
    "border border-white/30 text-white hover:border-gold-300 hover:text-gold-300",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-control px-6 py-3 text-sm font-semibold transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]";

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  ...props
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as unknown as () => void}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
