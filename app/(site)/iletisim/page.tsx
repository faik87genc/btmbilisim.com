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
  "ISO 27001, KVKK ve sızma testi danışmanlığı için bizimle iletişime geçin. Telefon, e-posta ve adres bilgilerimiz.";

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
                ISO 27001, KVKK ve sızma testi süreçleriniz için ücretsiz ön görüşme talep edin. 24 saat içinde size
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
                  <ConsentMap query="Yenikent Mah. Dicle Cd. G Blok No:16 Gebze/Kocaeli" />
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
