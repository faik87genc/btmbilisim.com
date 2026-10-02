import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost-light" | "ghost-dark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-navy-950 hover:bg-gold-300 focus-visible:bg-gold-300",
  "ghost-light":
    "border border-navy-950/15 text-ink-900 hover:border-navy-950/40",
  "ghost-dark":
    "border border-paper-50/25 text-paper-50 hover:border-gold-500 hover:text-gold-300",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium tracking-wide transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]";

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
