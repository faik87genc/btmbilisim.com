import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

// Identity v2 buttons: 48px (sm 40px), 10px radius (never a pill), press
// feedback scale .97. Roles:
// - primary:     brand blue fill, white text — one per section
// - inverse:     the primary action on dark grounds (white fill, ink text)
// - navy:        ink fill, a strong second action on light grounds
// - ghost-light: secondary on light grounds (white, hairline, ink text)
// - ghost-dark:  secondary on dark grounds
type Variant = "primary" | "inverse" | "navy" | "ghost-light" | "ghost-dark";

const variantClasses: Record<Variant, string> = {
  primary: "bg-gold-500 text-white hover:bg-gold-700",
  inverse: "bg-white text-navy-950 hover:bg-gold-100",
  navy: "bg-navy-950 text-white hover:bg-navy-800",
  "ghost-light": "border border-slate-400 bg-white text-navy-950 hover:border-gold-600 hover:text-gold-700",
  "ghost-dark": "border border-white/30 text-white hover:border-gold-300 hover:text-gold-300",
};

const sizeClasses = {
  md: "min-h-12 px-6 text-[0.9375rem]",
  sm: "min-h-10 px-4 text-sm",
} as const;

const base =
  "inline-flex items-center justify-center gap-2 rounded-control py-2.5 font-semibold transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97]";

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: keyof typeof sizeClasses;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick as unknown as () => void}>
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
