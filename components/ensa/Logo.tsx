import Link from "next/link";

// logo-full.webp is 375x120 (scripts/build-brand-assets.mjs); the light
// variant has white text for dark backgrounds.
export function Logo({
  variant = "image",
  className = "",
}: {
  variant?: "image" | "light";
  className?: string;
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
        className="h-11 w-auto md:h-14"
      />
    </Link>
  );
}
