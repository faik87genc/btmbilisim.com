import Link from "next/link";

// logo-full.webp is 375x120 (scripts/build-brand-assets.mjs); the light
// variant has white text for dark backgrounds.
export function Logo({
  variant = "image",
  className = "",
  imgClassName = "h-11 md:h-14",
}: {
  variant?: "image" | "light";
  className?: string;
  /** Height classes for the image (width follows the 375x120 ratio). */
  imgClassName?: string;
}) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="BTM Bilişim — Ana sayfa">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant === "light" ? "/assets/img/logo-full-light.webp" : "/assets/img/logo-full.webp"}
        alt="BTM Bilişim — Bilgi Teknolojileri Merkezi"
        width={375}
        height={120}
        // Top of every page: often the mobile LCP element.
        fetchPriority="high"
        className={`w-auto ${imgClassName}`}
      />
    </Link>
  );
}
