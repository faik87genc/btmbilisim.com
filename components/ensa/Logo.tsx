import Link from "next/link";

// logo-full.webp is 779x240 (navy + orange on transparent); the light
// variant has the navy text in white for dark backgrounds.
export function Logo({
  variant = "image",
  className = "",
  imgClassName = "h-11 md:h-14",
}: {
  variant?: "image" | "light";
  className?: string;
  /** Height classes for the image (width follows the 779x240 ratio). */
  imgClassName?: string;
}) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="BTM Bilişim — Ana sayfa">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant === "light" ? "/assets/img/logo-full-light.webp" : "/assets/img/logo-full.webp"}
        alt="BTM Bilişim — Bilgi Teknolojileri Merkezi"
        width={779}
        height={240}
        // Top of every page: often the mobile LCP element.
        fetchPriority="high"
        className={`w-auto ${imgClassName}`}
      />
    </Link>
  );
}
