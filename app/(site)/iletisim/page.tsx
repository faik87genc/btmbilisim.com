import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ConsentMap } from "@/components/site/ConsentMap";
import { Icon } from "@/components/site/Icon";
import { Breadcrumbs, JsonLd } from "@/components/site/Parts";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, organizationJsonLd } from "@/lib/structuredData";

// Port of _legacy-static-site/templates/contact.html.

const TITLE = `İletişim${site.titleSuffix}`;
const DESCRIPTION =
  "Siber güvenlik, sızma testi, ağ altyapısı, sunucu, bulut ve IT destek ihtiyaçlarınız için BTM Bilişim ile iletişime geçin. Telefon, e-posta ve adres bilgilerimiz.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/iletisim/") },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: absoluteUrl("/iletisim/"), images: [DEFAULT_OG_IMAGE] },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Breadcrumbs crumbs={[{ text: "İletişim" }]} />
      <main id="main" tabIndex={-1}>
        <section className="section">
          <div className="wrap">
            <div className="sec-head left" style={{ maxWidth: 640, marginBottom: 48 }}>
              <span className="eyebrow">İletişim</span>
              <h1>
                Bize <em>ulaşın</em>.
              </h1>
              <p className="lead">
                Siber güvenlik, ağ ve sistem altyapısı, sunucu, bulut ve IT destek ihtiyaçlarınız için ücretsiz keşif
                görüşmesi talep edin. En geç bir iş günü içinde size
                dönüş yapılır.
              </p>
            </div>

            <div className="contact-grid">
              <div>
                <h2 className="visually-hidden">İletişim bilgileri</h2>
                <ul className="clist">
                  <li>
                    <div className="ic"><Icon id="phone" size={18} /></div>
                    <div><b>Destek Hattı</b><a href={site.phone.href}>{site.phone.display}</a></div>
                  </li>
                  <li>
                    <div className="ic"><Icon id="whatsapp" size={18} /></div>
                    <div><b>Mobil / WhatsApp</b><a href={site.mobile.href}>{site.mobile.display}</a></div>
                  </li>
                  <li>
                    <div className="ic"><Icon id="mail" size={18} /></div>
                    <div><b>E-Posta Adresi</b><a href={`mailto:${site.email}`}>{site.email}</a></div>
                  </li>
                  <li>
                    <div className="ic"><Icon id="pin" size={18} /></div>
                    <div><b>Adres</b><span className="v">{site.address}</span></div>
                  </li>
                  <li>
                    <div className="ic"><Icon id="clock" size={18} /></div>
                    <div><b>Çalışma Saatleri</b><span className="v">{site.hours.label}</span></div>
                  </li>
                </ul>

                <div style={{ borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--line)" }}>
                  <ConsentMap query="Hacıhalil Mah. 1207. Sk. No:1 Match Plaza, 41400 Gebze/Kocaeli" />
                </div>
              </div>

              <div>
                <h2 className="visually-hidden">İletişim formu</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
