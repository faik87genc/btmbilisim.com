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
  // Consulting services no longer offered.
  "danismanlik/finansal-ve-stratejik-danismanlik": "/danismanlik/",
  "danismanlik/kosgeb-tubitak-hibe-tesvik-danismanligi": "/danismanlik/",
  "danismanlik/proje-danismanligi": "/danismanlik/",
  // IT consulting moved to a keyword-matching URL.
  "danismanlik/bilgi-teknolojileri-it-danismanligi": "/danismanlik/it-danismanlik-hizmetleri/",
};

// Thin, near-duplicate posts consolidated into one strong page per search
// intent (October 2026 clean-up). The ~60 camera posts were mostly 250–450
// word copies with only the place name changed — the "scaled content" pattern
// that drags down trust in the whole site. The rows stay in the DB (nothing is
// deleted); the URLs 301 to the page that now covers the topic.
const CAMERA_OSB_FABRIKA = "/gebze-osb-fabrika-kamera-kurulumu/";
const CAMERA_GEBZE = "/gebze-guvenlik-kamerasi-kurulum-servis/";
const CAMERA_FIYAT = "/guvenlik-kamera-sistemi-fiyatlari/";
const CAMERA_SECIM = "/guvenlik-kamerasi-secim-hatalari/";
const CAMERA_KAYIT = "/kamera-kayit-sistemleri-depolama-cozumleri/";

export const CONSOLIDATED_REDIRECTS: Readonly<Record<string, string>> = {
  // Camera — OSB, factory and warehouse (one page instead of one per OSB).
  "kobi-osb-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "kimya-osb-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "makine-osb-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "komurculer-osb-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "guzeller-osb-kamera-kurulumu": CAMERA_OSB_FABRIKA,
  "plastikciler-osb-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "imes-osb-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "tosb-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "dilovasi-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "dilovasi-osb-kamera": CAMERA_OSB_FABRIKA,
  "dilovasi-osb-guvenlik-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "gebze-osb-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "gebze-osb-kamera-sistemi-2": CAMERA_OSB_FABRIKA,
  "gebze-osb-kamera-sistemi-3": CAMERA_OSB_FABRIKA,
  "gebze-osb-ip-kamera-sistemi-kurulumu": CAMERA_OSB_FABRIKA,
  "gebze-osb-fabrika-ip-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "gebze-osb-endustriyel-ip-kamera-cozumleri": CAMERA_OSB_FABRIKA,
  "gebze-fabrika-ip-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "gebze-fabrika-kamera-sistemi": CAMERA_OSB_FABRIKA,
  "gebze-fabrika-kamera-sistemleri-gece-goruslu": CAMERA_OSB_FABRIKA,
  "gebze-fabrika-guvenlik-kamerasi-kurulumu": CAMERA_OSB_FABRIKA,
  "gebze-buyuk-alan-kamera-kurulumu": CAMERA_OSB_FABRIKA,
  "gebze-kamera-projelendirme": CAMERA_OSB_FABRIKA,
  "kocaeli-ip-kamera-kurulumu": CAMERA_OSB_FABRIKA,
  "tuzla-depo-kamera": CAMERA_OSB_FABRIKA,
  "tuzla-depo-kamera-sistemleri": CAMERA_OSB_FABRIKA,
  "depo-kamera-sistemi-kurulumu": CAMERA_OSB_FABRIKA,
  // Camera — installation and service in Gebze and the surrounding districts.
  "gebze-kamera-sistemi-kurulumu": CAMERA_GEBZE,
  "gebze-ip-kamera-kurulumu": CAMERA_GEBZE,
  "gebze-ip-kamera-sistemi-kurulumu": CAMERA_GEBZE,
  "gebze-ip-kamera-ariza-tespiti-hizli-teknik-servis": CAMERA_GEBZE,
  "kocaeli-ip-kamera-bakim-hizmetleri": CAMERA_GEBZE,
  "darica-isyeri-kamera-kurulumu": CAMERA_GEBZE,
  "darica-gece-goruslu-guvenlik-kamerasi-modelleri": CAMERA_GEBZE,
  "btm-bilisim-darica-villa-guvenlik-sistemleri": CAMERA_GEBZE,
  "apartman-ve-site-kamera-sistemleri-kurulumu": CAMERA_GEBZE,
  "tuzla-ip-kamera-montaj": CAMERA_GEBZE,
  // Camera — cost.
  "kocaeli-ip-kamera-kurulumu-maliyetler": CAMERA_FIYAT,
  "uygun-maliyetli-kamera-sistemleri-kocaeli": CAMERA_FIYAT,
  // Camera — choosing the right camera (technology, night vision, placement).
  "ip-ahd-kamera-farklari-kocaeli": CAMERA_SECIM,
  "ip-kamera-teknolojisi-vs-analog-karsilastirma": CAMERA_SECIM,
  "gece-goruslu-kamera-teknolojileri-karsilastirma": CAMERA_SECIM,
  "gece-goruslu-kamera-sistemleri-ozellikleri": CAMERA_SECIM,
  "gece-gorus-ip-kamera-kurulumu": CAMERA_SECIM,
  "kablosuz-guvenlik-kamerasi-modelleri": CAMERA_SECIM,
  "ip-kamera-goruntu-kalitesi-artirma": CAMERA_SECIM,
  "guvenlik-kameras-analizi-kor-nokta-cozumleri": CAMERA_SECIM,
  "ip-kamera-kurulum-hatalari-ve-cozumleri": CAMERA_SECIM,
  "akilli-kamera-sistemleri-yapay-zeka-analitigi": CAMERA_SECIM,
  // Camera — recording, storage, network, power and remote access.
  "darica-guvenlik-kamera-kayit-depolama-cozumleri": CAMERA_KAYIT,
  "kocaeli-ip-kamera-sistemleri-yedekleme-guvenlik": CAMERA_KAYIT,
  "kamera-sistemi-ups-ve-yedekleme": CAMERA_KAYIT,
  "gebze-isletmeler-icin-kamera-sistemleri-uzaktan-erisim": CAMERA_KAYIT,
  "uzaktan-izleme-kamera-kurulumu": CAMERA_KAYIT,
  "kocaeli-kamera-sistemleri-ag-altyapisi-rehberi": CAMERA_KAYIT,
  // Posts that targeted a service page's own keyword (cannibalisation): the
  // service page is the one that should rank.
  "kurumsal-it-destek-danismanlik": "/danismanlik/it-danismanlik-hizmetleri/",
  "profesyonel-it-danismanligi-faydalari": "/danismanlik/it-danismanlik-hizmetleri/",
  "sizma-testi-siber-guvenlik": "/siber-guvenlik/sizma-testi-penetrasyon-testi/",
  "bulut-yedekleme-cozumleri": "/bulut-yedekleme/veri-yedekleme-cozumleri/",
  "sanallastirma-sunucu-hizmetleri": "/sistem-network/sanallastirma-cozumleri/",
  "kurumsal-sanallastirma-hizmetleri-ve-avantajlari": "/sistem-network/sanallastirma-cozumleri/",
  "ag-altyapi-sistem-entegrasyonu": "/sistem-network/sistem-entegrasyonu/",
  "kurumsal-yazilim-hizmetleri-ve-ozel-cozumler": "/yazilim-dijital/ozel-yazilim-gelistirme/",
  "yazilim-gelistirme-ile-isletmenizin-verimliligini-artirin": "/yazilim-dijital/ozel-yazilim-gelistirme/",
  "kurumsal-web-tasarim-hizmetleri-ve-seo": "/yazilim-dijital/web-tasarim-ve-kurumsal-web-sitesi/",
  "profesyonel-veri-kurtarma-hizmetleri-rehberi": "/bulut-yedekleme/veri-kurtarma-hizmetleri/",
  "dijital-donusum": "/danismanlik/yazilim-ve-dijital-donusum-danismanligi/",
  "veri-tabani-performans-optimizasyonu": "/sql-optimizasyonu/",
};

/** Every coded 301 for a pages-table slug, legacy and consolidated. */
export const SLUG_REDIRECTS: Readonly<Record<string, string>> = {
  ...LEGACY_SERVICE_REDIRECTS,
  ...CONSOLIDATED_REDIRECTS,
};

/** Pages-table slugs that redirect (never listed, linked or put in the sitemap). */
export const REDIRECTED_SLUGS: ReadonlySet<string> = new Set(Object.keys(SLUG_REDIRECTS));

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
  const to = SLUG_REDIRECTS[m[1]];
  return to ? to + (m[2] ?? "") : href;
}
