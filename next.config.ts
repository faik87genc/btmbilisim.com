import type { NextConfig } from "next";

// Content-Security-Policy, in two layers (see node_modules/next/dist/docs/
// 01-app/02-guides/content-security-policy.md, "Without Nonces"):
//
// 1. ENFORCED — only directives that cannot break rendering: no plugins, no
//    <base> hijack, no framing by other sites, forms post only to this origin
//    (the public forms use fetch(); admin forms are Server Actions on /admin).
//
// 2. REPORT-ONLY — the full allow-list. It never blocks anything; violations
//    are POSTed to /api/csp-report/ and logged. Once the Vercel logs show no
//    legitimate violations for a while, move these directives into the
//    enforced header.
//    - 'unsafe-inline' script/style stays: Next's inline bootstrap
//      (self.__next_f), inline JSON-LD and style attributes need it, and nonces
//      would force every page to dynamic rendering.
//    - 'unsafe-eval' is development-only (React dev tooling); production
//      React/Next do not use eval.
//    - googletagmanager / google-analytics: GA4, loaded only after cookie
//      consent and only when NEXT_PUBLIC_GA4_ID is set (SiteBehavior.tsx).
//    - frame-src: the Google Maps embed on /iletisim/.
//    - blob storage host: admin-uploaded cover images.
const isDev = process.env.NODE_ENV === "development";

const BLOB_HOST = "https://*.public.blob.vercel-storage.com";
const CSP_REPORT_PATH = "/api/csp-report/";

const cspBaseline = [
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
];

const cspEnforced = cspBaseline.join("; ");

const cspReportOnly = [
  "default-src 'self'",
  ...cspBaseline,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${BLOB_HOST} https://*.google-analytics.com https://*.googletagmanager.com`,
  "font-src 'self' data:",
  `connect-src 'self' ${BLOB_HOST} https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com`,
  "frame-src https://www.google.com https://maps.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "media-src 'self'",
  `report-uri ${CSP_REPORT_PATH}`,
  "report-to csp",
].join("; ");

// Applied to every response.
const securityHeaders = [
  { key: "Content-Security-Policy", value: cspEnforced },
  { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
  // Reporting API endpoint used by `report-to csp` (Chromium); `report-uri`
  // above covers Firefox/Safari.
  { key: "Reporting-Endpoints", value: `csp="${CSP_REPORT_PATH}"` },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Legacy twin of frame-ancestors for old browsers.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Isolates the browsing context from cross-origin popups (window.opener).
  // Outbound links (wa.me, ensakurumsal.com, social) are plain navigations or
  // noopener popups, so nothing relies on an opener relationship.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

// Admin and API responses must never be indexed.
const noIndexHeaders = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

// 2026-09-27: thin duplicate of the homepage for "iso 27001 danışmanlık".
// 2026-09-27: "ISO 27001 belgesi" and "nasıl alınır" consolidated into two pillar pages.
// Keep in sync with REDIRECTS in _legacy-static-site/scripts/build.py.
const REDIRECTS: [string, string][] = [
  ["iso-27001-danismanlik-2", "/"],
  // 2026-09-30: CMP is no longer offered as a service.
  ["cerez-yonetimi", "/kvkk-danismanligi/"],
  ["iso-27001-belgesi-nedir-nasil-alinir", "/iso-27001-belgesi/"],
  ["iso-27001-belgesi-nedir-nasil-alinir-2026-sartlari", "/iso-27001-belgesi/"],
  ["iso-27001-belgelendirme", "/iso-27001-belgesi/"],
  ["iso-27001-nasil-alinir", "/iso-27001-belgesi-nasil-alinir/"],
  // URL surgery wave 1 (2026-09-27): also in DB slug_history; kept here so the
  // fallback JSON can never serve the old page.
  ["iso-27001-danismanlik", "/iso-27001-danismanlik-hizmeti/"],
  ["profesyonel-bgys-danismanlik-hizmeti", "/iso-27001-danismanlik-hizmeti/"],
  ["iso-27001-bilgi-guvenligi-yonetim-sistemi", "/bilgi-guvenligi-yonetim-sistemi/"],
  ["bgys-denetiminde-neler-sorulur", "/iso-27001-denetim-sorulari/"],
  ["iso-27001-denetim-hazirlik", "/bgys-denetim-hazirlik-listesi/"],
  ["iso-27001-audit-checklist-guncel", "/bgys-denetim-hazirlik-listesi/"],
  ["iso-27001-ic-tetkik-rehberi-2", "/iso-27001-ic-tetkik-rehberi/"],
  ["akredite-iso-27001-belgesi-2026-standartlari", "/iso-27001-belgesi/"],
  ["istanbul-iso-27001-danismanlik-hizmeti", "/istanbul-iso-27001-danismanlik/"],
  ["gebze-iso-27001-danismanlik", "/gebze-iso-27001-danismanlik-belgesi/"],
];

// Old WordPress URLs that Search Console still reports as 404 (Coverage export
// 2026-09-30). These pages no longer exist in content, so they are not in
// build.py's REDIRECTS; each points to the closest live page.
const LEGACY_WP_REDIRECTS: [string, string][] = [
  ["hizmetlerimiz", "/danismanlik-hizmetleri/"],
  ["hizmetlerimiz/iso-27001-danismanlik-hizmetleri", "/iso-27001-danismanlik-hizmeti/"],
  ["hizmetlerimiz/iso-27001-danismanlik-bilgi-guvenligi-yonetim-sistemi-hizmeti", "/iso-27001-danismanlik-hizmeti/"],
  ["hizmetlerimiz/iso-27001-belgelendirme-danismanligi", "/iso-27001-danismanlik-hizmeti/"],
  ["hizmetlerimiz/iso-27001-bilgi-guvenligi-belgelendirme-sureci", "/iso-27001-belgelendirme-sureci/"],
  ["hizmetlerimiz/iso-27001-faydalari-nedir", "/iso-27001/"],
  ["hizmetlerimiz/iso-27001-belge-zorunlulugu", "/iso-27001-belgesi/"],
  ["hizmetlerimiz/iso-27001-egitim-hizmetleri", "/egitim-hizmetleri/"],
  ["hizmetlerimiz/iso-27001-risk-yonetimi", "/bilgi-guvenligi-risk-analizi/"],
  ["hizmetlerimiz/sizma-testi-hizmeti", "/sizma-testi-pentest-hizmeti/"],
  ["hizmetlerimiz/iso-27001-standart-maddeleri", "/iso-27001-sartlari/"],
  ["hizmetlerimiz/iso-27001-gereklilikleri", "/iso-27001-sartlari/"],
  ["hizmetlerimiz/iso-27001-fiyat", "/iso-27001-belgesi-fiyati/"],
  ["hizmetlerimiz/iso-27001-gdpr", "/kvkk-danismanligi/"],
  ["denetim-hizmetleri", "/danismanlik-hizmetleri/"],
  ["iso-27001-nedir-temel-kavramlar-ve-onemi", "/iso-27001-nedir/"],
  ["iso-iec-27001-nedir-iso-27001-danismanlik", "/iso-27001-nedir/"],
  ["iso-27001-nedir-ve-neden-onemlidir-2", "/iso-27001-nedir/"],
  ["iso-27001-nedir-ve-neden-onemlidir-3", "/iso-27001-nedir/"],
  ["iso-27001-belgesi-alma-suresi-sertifika-sureci-ve-tahmini-zaman-cizelgesi", "/iso-27001-kac-gunde-alinir/"],
  ["iso-27001-belgesine-hizli-ulasmanin-yollari", "/iso-27001-kac-gunde-alinir/"],
  ["iso-27001-sertifikasi-gerekliligi", "/iso-27001-belgesi/"],
  ["iso-27001-kurumsal-finansal-hizmetlerde-veri-guvenligi", "/iso-27001-belgesi/"],
  ["iso-270012022-sertifikasi-nasil-alinir-adim-adim-rehber", "/iso-27001-belgesi-nasil-alinir/"],
  ["iso-27001-belgesi-maliyeti-kucuk-ve-buyuk-isletmeler-icin-rehber", "/iso-27001-belgesi-fiyati/"],
  ["iso-27001-uygulama-maliyeti-nedir", "/iso-27001-belgesi-fiyati/"],
  ["iso-27001-uygulama-hizmeti-isletmeniz-icin-profesyonel-destek-ve-rehberlik", "/iso-27001-danismanlik-hizmeti/"],
  ["mevcut-araclarla-iso-27001-risk-yonetimi-ve-olay-takibini-nasil-entegre-edebilirsiniz", "/bilgi-guvenligi-risk-analizi/"],
  ["iso-27001-6-1-3-risk-tedavisi-kuruluslar-icin-adim-adim-rehber", "/iso-27001-27701-risk-isleme-ve-uygulanabilirlik-bildirgesi-soa/"],
  ["annex-a-kontrollerini-etkin-uygulama-rehberi", "/iso-27001-2022-revizyon-farklari/"],
  ["iso-27001-ek-a-nedir-2022-surumundeki-yenilikler-ve-farklar", "/iso-27001-2022-revizyon-farklari/"],
  ["93-ek-a-kontrolu-hangi-kontrolleri-uygulamalisiniz-ve-neden", "/iso-27001-2022-revizyon-farklari/"],
  ["iso-27001-ek-a-kontrolleri", "/iso-27001-2022-revizyon-farklari/"],
  ["iso-270012022-diger-duzenleyici-standartlarla-hangi-noktalarda-uyum-saglar", "/iso-27001-2022-revizyon-farklari/"],
  ["iso-22301-is-surekliligi-yonetim-sistemi-rehberi", "/iso22301-is-surekliligi-yonetim-sistemi/"],
  ["iso-uyumluk-guvenlik-kultur-gelistirme", "/bilgi-guvenligi-farkindalik-egitimi/"],
  ["iso-27001-liderlik-ve-baglilik", "/kapsamli-iso-27001-liderlik-ve-yonetim-taahhudu-rehberi-2026/"],
  ["iso-27001-denetiminde-basarisiz-olursam-ne-yapmaliyim", "/iso-27001-eksikleri-nasil-kapatilir/"],
  ["iso-27001-surekli-iyilestirme", "/iso-27001-sartlari/"],
  ["iso-operasyon-degerlendirme-tedavi", "/iso-27001-isletimsel-planlama-ve-operasyonel-kontrol-rehberi/"],
  ["iso27001danismanlik-com-iso-kapsam", "/iso-27001-27701-kapsam-belirleme-rehberi-2026/"],
  ["iso-27001-sizma-testi-2", "/iso-27001-sizma-testi/"],
  ["penetrasyon-testi-rehberi-2", "/penetrasyon-testi-rehberi/"],
  ["bgys-varlik-envanteri-hazirlaniyor-mu", "/bgys-varlik-envanteri-hazirlama/"],
];

// WordPress archive and theme URLs (tag/category archives, team and testimonial
// posts) have no one-to-one successor.
const LEGACY_WP_PATTERNS: [string, string][] = [
  ["/tag/:path*", "/blog/"],
  ["/category/:path*", "/blog/"],
  ["/team/:path*", "/hakkimizda/"],
  ["/team_category/:path*", "/hakkimizda/"],
  ["/testimonials/:path*", "/hakkimizda/"],
  ["/blog/page/:n", "/blog/"],
  ["/feed", "/blog/"],
  ["/:slug/feed", "/:slug/"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Source maps stay off in production (the default) so the original source
  // is not published alongside the bundles.
  productionBrowserSourceMaps: false,
  // The static site (and every URL Google has indexed) uses /slug/ — keep it.
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    inlineCss: true,
    // Admin cover uploads go through a Server Action; the 1 MB default made
    // any photo over 1 MB fail before reaching the action. Vercel caps
    // function request bodies at 4.5 MB, so match that.
    serverActions: { bodySizeLimit: "4.5mb" },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    // Blob uploads get a unique file name per upload, so an optimized copy
    // never goes stale: keep it 31 days instead of the 4 h default (fewer
    // re-transformations, faster first bytes for the /_next/image URLs that
    // lib/imageVariants.ts emits for them).
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: noIndexHeaders },
      { source: "/api/:path*", headers: noIndexHeaders },
    ];
  },
  // Permanent redirects for consolidated pages. Keep in sync with REDIRECTS in
  // _legacy-static-site/scripts/build.py (which drops the page from content).
  async redirects() {
    return [
      ...[...REDIRECTS, ...LEGACY_WP_REDIRECTS].flatMap(([from, to]) => [
        { source: `/${from}`, destination: to, permanent: true },
        { source: `/${from}/`, destination: to, permanent: true },
      ]),
      ...LEGACY_WP_PATTERNS.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
