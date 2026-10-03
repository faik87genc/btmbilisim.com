// Old WordPress service pages that duplicated the new service pages (same
// topic, competing for the same searches). Each one now 301-redirects to its
// replacement so its rankings and backlinks consolidate there. Used by
// next.config.ts (the redirects) and, through isRetiredSlug(), by the sitemap,
// llms-full.txt, the AI link targets and the admin slug check, so none of them
// lists or accepts a URL that redirects. No imports: next.config.ts loads this.

export const LEGACY_SERVICE_REDIRECTS: Readonly<Record<string, string>> = {
  "it-destek-ve-danismanlik": "/danismanlik/it-danismanlik-hizmetleri/",
  "siber-guvenlik-hizmetleri": "/siber-guvenlik/",
  "sizma-testi-penetrasyon-testi": "/siber-guvenlik/sizma-testi-penetrasyon-testi/",
  "ag-ve-sistem-altyapi-cozumleri": "/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/",
  "sunucu-ve-veri-merkezi-hizmetleri": "/sistem-network/sunucu-kurulum-ve-yonetimi/",
  "sanallastirma-hizmetleri": "/sistem-network/sanallastirma-cozumleri/",
  "sistem-entegrasyonu": "/sistem-network/sistem-entegrasyonu/",
  "kurulum-hizmeti": "/sistem-network/",
  "bulut-ve-yedekleme-cozumleri": "/bulut-yedekleme/",
  "cloud-hizmetleri": "/bulut-yedekleme/bulut-cozumleri/",
  "veri-kurtarma-hizmetleri": "/bulut-yedekleme/veri-kurtarma-hizmetleri/",
  "lisanslama-hizmetleri": "/lisanslama/",
  "yazilim-hizmetleri": "/yazilim-dijital/ozel-yazilim-gelistirme/",
  "web-tasarim-hizmetleri": "/yazilim-dijital/web-tasarim-ve-kurumsal-web-sitesi/",
  // The service guide (which listed the pages above) became the /hizmetler/ hub.
  "hizmet-rehberi": "/hizmetler/",
  // IT consulting moved to a keyword-matching URL.
  "danismanlik/bilgi-teknolojileri-it-danismanligi": "/danismanlik/it-danismanlik-hizmetleri/",
};

/** Pages-table slugs that redirect (never listed, linked or put in the sitemap). */
export const REDIRECTED_SLUGS: ReadonlySet<string> = new Set(Object.keys(LEGACY_SERVICE_REDIRECTS));

/** Pages-table rows whose URL is served by a coded route instead (the old
 * WordPress "Hizmetler" page; /hizmetler/ is now app/(site)/hizmetler). */
export const SHADOWED_SLUGS: ReadonlySet<string> = new Set(["hizmetler"]);

/** True when a pages-table row with this slug is never shown at /slug/. */
export function isRetiredSlug(slug: string): boolean {
  return REDIRECTED_SLUGS.has(slug) || SHADOWED_SLUGS.has(slug);
}

/** Rewrites an internal href that points at a redirected page to its target. */
export function resolveLegacyHref(href: string): string {
  const m = href.match(/^\/([^?#]+?)\/?([?#].*)?$/);
  if (!m) return href;
  const to = LEGACY_SERVICE_REDIRECTS[m[1]];
  return to ? to + (m[2] ?? "") : href;
}
