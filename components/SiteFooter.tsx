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
                <img className="brand-logo" src="/assets/img/logo-full-light.webp" alt={site.name} width={142} height={52} loading="lazy" />
              </Link>
              <p>
                ISO 27001 Bilgi Güvenliği Yönetim Sistemi, KVKK uyum ve sızma testi (pentest)
                süreçlerinde çözüm ortağınız. Sektörde tecrübeli uzman ekibimiz ve kendi geliştirdiğimiz platformlarla
                verilerinizi ve itibarınızı koruma altına alıyoruz.
              </p>
              <div className="footer-social">
                <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Instagram (yeni sekmede açılır)">
                  <svg width={16} height={16} aria-hidden="true"><use href="#i-instagram" /></svg>
                </a>
                <a href={site.social.x} target="_blank" rel="noopener" aria-label="X (yeni sekmede açılır)">
                  <svg width={16} height={16} aria-hidden="true"><use href="#i-x" /></svg>
                </a>
                {/* Shown only once a company page URL is set in lib/site.ts. */}
                {site.social.linkedin && (
                  <a href={site.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn (yeni sekmede açılır)">
                    <svg width={16} height={16} aria-hidden="true"><use href="#i-linkedin" /></svg>
                  </a>
                )}
              </div>
            </div>
            <div>
              <h2 className="footer-h">Hızlı Erişim</h2>
              <ul className="footer-links">
                <li><Link href="/">Anasayfa</Link></li>
                <li><Link href="/hakkimizda/">Hakkımızda</Link></li>
                <li><Link href="/danismanlik-hizmetleri/">Danışmanlık Hizmetleri</Link></li>
                <li><Link href="/siber-guvenlik-hizmetleri/">Siber Güvenlik Hizmetleri</Link></li>
                <li><Link href="/egitim-hizmetleri/">Eğitim Hizmetleri</Link></li>
                <li><Link href="/blog/">Blog</Link></li>
                <li><Link href="/iletisim/">İletişim</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-h">Kurumsal</h2>
              <ul className="footer-links">
                <li><Link href="/vizyonumuz/">Vizyonumuz</Link></li>
                <li><Link href="/misyonumuz/">Misyonumuz</Link></li>
                <li><Link href="/bilgi-guvenligi-politikasi/">Bilgi Güvenliği Politikası</Link></li>
                <li><Link href="/kisisel-verilerin-korunmasi-politikasi/">KVKK Aydınlatma Metni</Link></li>
                <li><Link href="/cerez-politikasi/">Çerez Politikası</Link></li>
                <li><Link href="/kullanim-kosullari/">Kullanım Koşulları</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="footer-h">İletişim Bilgileri</h2>
              <p>{site.address}</p>
              <p><a href={site.phone.href}>{site.phone.display}</a></p>
              <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} {site.name},{" "}
              <a href={site.parent.url} target="_blank" rel="noopener">
                {site.parent.name}
                <span className="visually-hidden"> (yeni sekmede açılır)</span>
              </a> markasıdır. Tüm hakları
              saklıdır. Yazı ve görseller izinsiz ve kaynak gösterilmeden kopyalanamaz.
            </span>
            <span>
              <Link href="/kisisel-verilerin-korunmasi-politikasi/">KVKK Aydınlatma Metni</Link> ·{" "}
              <Link href="/cerez-politikasi/">Çerez Politikası</Link> ·{" "}
              <button type="button" className="footer-link-btn" id="cookie-prefs">Çerez Tercihleri</button> ·{" "}
              <Link href="/kullanim-kosullari/">Kullanım Koşulları</Link>
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
