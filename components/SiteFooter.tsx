import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "@/components/site/Icon";

// Footer, floating WhatsApp button and cookie banner — same markup as
// _legacy-static-site/templates/base.html.

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link className="brand" href="/" aria-label={`${site.name} — Anasayfa`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="brand-logo" src="/assets/img/logo-full-light.webp" alt={site.name} width={163} height={52} loading="lazy" />
              </Link>
              <p>{site.description}</p>
              {/* Each icon shows only once its URL is set in lib/site.ts. */}
              {Object.values(site.social).some(Boolean) && (
                <div className="footer-social">
                  {site.social.instagram && (
                    <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram (yeni sekmede açılır)">
                      <svg width={16} height={16} aria-hidden="true"><use href="#i-instagram" /></svg>
                    </a>
                  )}
                  {site.social.x && (
                    <a href={site.social.x} target="_blank" rel="noopener" aria-label="X (yeni sekmede açılır)">
                      <svg width={16} height={16} aria-hidden="true"><use href="#i-x" /></svg>
                    </a>
                  )}
                  {site.social.linkedin && (
                    <a href={site.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn (yeni sekmede açılır)">
                      <svg width={16} height={16} aria-hidden="true"><use href="#i-linkedin" /></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
            <div>
              <h2 className="footer-h">Hizmetler</h2>
              <ul className="footer-links">
                <li><Link href="/siber-guvenlik-hizmetleri/">Siber Güvenlik</Link></li>
                <li><Link href="/sizma-testi-penetrasyon-testi/">Sızma Testi</Link></li>
                <li><Link href="/ag-ve-sistem-altyapi-cozumleri/">Ağ ve Sistem Altyapısı</Link></li>
                <li><Link href="/sunucu-ve-veri-merkezi-hizmetleri/">Sunucu ve Veri Merkezi</Link></li>
                <li><Link href="/bulut-ve-yedekleme-cozumleri/">Bulut ve Yedekleme</Link></li>
                <li><Link href="/it-destek-ve-danismanlik/">IT Destek ve Danışmanlık</Link></li>
                <li><Link href="/hizmetler/">Tüm Hizmetler</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-h">Kurumsal</h2>
              <ul className="footer-links">
                <li><Link href="/hakkimizda/">Hakkımızda</Link></li>
                <li><Link href="/blog/">Blog</Link></li>
                <li><Link href="/iletisim/">İletişim</Link></li>
                <li><Link href="/kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</Link></li>
                <li><Link href="/cerez-politikasi/">Çerez Politikası</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-h">İletişim Bilgileri</h2>
              <p>{site.address}</p>
              <p><a href={site.phone.href}>{site.phone.display}</a></p>
              <p><a href={site.mobile.href}>{site.mobile.display}</a></p>
              <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} {site.name} — {site.legalName}. Tüm hakları saklıdır.
            </span>
            <span>
              <Link href="/kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</Link> ·{" "}
              <Link href="/cerez-politikasi/">Çerez Politikası</Link> ·{" "}
              <button type="button" className="footer-link-btn" id="cookie-prefs">Çerez Tercihleri</button>
            </span>
          </div>
        </div>
      </footer>

      <a
        className="float-wa"
        href={site.whatsapp.href}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp ile iletişime geçin (yeni sekmede açılır)"
      >
        <Icon id="whatsapp" size={26} fill="#fff" />
      </a>
    </>
  );
}

// Runs while the HTML is parsed, before first paint: shows the banner for
// visitors without a stored choice, so the floating WhatsApp button is laid
// out above it from the start (site.css: body:has(#cookie-banner:not([hidden]))).
// Waiting for hydration made that button jump up after first paint (CLS).
// No offsetHeight read here: forcing layout mid-parse cost ~300 ms of main
// thread on a throttled phone; SiteBehavior sets the exact --cb-h later.
// Keep the "cookie-consent" key in sync with SiteBehavior.tsx.
const SHOW_BANNER_EARLY = `(function(){try{if(localStorage.getItem("cookie-consent"))return}catch(e){}var b=document.getElementById("cookie-banner");if(b)b.hidden=false})()`;

/**
 * Cookie consent banner. Rendered right after the skip link (see the site
 * layout) so keyboard users reach it first; `position:fixed` keeps it at the
 * bottom of the screen. Revealed by the inline script above before first
 * paint; buttons and later show/hide handled by SiteBehavior.
 */
export function CookieBanner() {
  return (
    <>
      {/* suppressHydrationWarning: the inline script may drop `hidden` before hydration. */}
      <div
        className="cookie-banner"
        id="cookie-banner"
        role="region"
        aria-label="Çerez bildirimi"
        hidden
        suppressHydrationWarning
      >
        <div className="cookie-banner-in">
          <p>
            Sitemizde, deneyiminizi iyileştirmek için zorunlu çerezler ve (onayınız hâlinde) analiz
            çerezleri kullanılmaktadır. Detaylar için{" "}
            <Link href="/cerez-politikasi/">Çerez Politikası&apos;nı</Link> inceleyebilirsiniz.
          </p>
          <div className="cookie-banner-actions">
            {/* Same style for both: rejecting must be as easy and prominent as accepting (KVKK çerez rehberi). */}
            <button type="button" className="btn btn-primary btn-sm" id="cookie-reject">Reddet</button>
            <button type="button" className="btn btn-primary btn-sm" id="cookie-accept">Kabul Et</button>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SHOW_BANNER_EARLY }} />
    </>
  );
}
