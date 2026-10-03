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
  // Outbound links (wa.me, social) are plain navigations or
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

// Old WordPress URLs with no one-to-one successor. Every page and post slug
// was imported as is (scripts/import-wordpress.mjs), so only WP's own
// archive/theme URLs need a target.
const REDIRECTS: [string, string][] = [
  ["anasayfa", "/"],
  ["portfolio", "/hizmetler/"],
  // Linked from old posts, never existed as pages on the WordPress site.
  ["is-surekliligi", "/bulut-yedekleme/is-surekliligi-cozumleri/"],
  ["veritabani-yonetimi", "/veritabani-yonetimi-hizmeti/"],
  ["bulut-cozumleri", "/bulut-yedekleme/bulut-cozumleri/"],
  ["yonetilen-hizmetler", "/sistem-network/it-bakim-ve-destek-hizmetleri/"],
  ["bilgi-guvenligi-ve-siber-guvenlik", "/siber-guvenlik/"],
  ["kisisel-verilerin-korunmasi-politikasi", "/kvkk-aydinlatma-metni/"],
];

const LEGACY_WP_PATTERNS: [string, string][] = [
  ["/category/:path*", "/blog/"],
  ["/tag/:path*", "/blog/"],
  ["/author/:path*", "/hakkimizda/"],
  ["/portfolio/:path*", "/hizmetler/"],
  ["/blog/page/:n", "/blog/"],
  ["/page/:n", "/blog/"],
  ["/feed", "/feed.xml"],
  ["/:slug/feed", "/:slug/"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Source maps stay off in production (the default) so the original source
  // is not published alongside the bundles.
  productionBrowserSourceMaps: false,
  // The WordPress site (and every URL Google has indexed) uses /slug/ — keep it.
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
  // Permanent redirects for retired WordPress URLs.
  async redirects() {
    return [
      ...REDIRECTS.flatMap(([from, to]) => [
        { source: `/${from}`, destination: to, permanent: true },
        { source: `/${from}/`, destination: to, permanent: true },
      ]),
      ...LEGACY_WP_PATTERNS.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
};

export default nextConfig;
