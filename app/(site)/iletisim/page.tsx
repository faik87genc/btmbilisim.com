import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { QuoteForm } from "@/components/QuoteForm";
import { ConsentMap } from "@/components/site/ConsentMap";
import { JsonLd } from "@/components/site/Parts";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, organizationJsonLd } from "@/lib/structuredData";

const TITLE = `İletişim${site.titleSuffix}`;
const DESCRIPTION =
  "Siber güvenlik, sızma testi, ağ altyapısı, sunucu, bulut, yazılım ürünleri ve IT destek ihtiyaçlarınız için BTM Bilişim ile iletişime geçin. Telefon, WhatsApp, e-posta ve adres bilgilerimiz.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/iletisim/") },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: absoluteUrl("/iletisim/"), images: [DEFAULT_OG_IMAGE] },
};

const rows = [
  { icon: Phone, label: "Destek Hattı", value: site.phone.display, href: site.phone.href },
  { icon: MessageCircle, label: "Mobil / WhatsApp", value: site.mobile.display, href: site.whatsapp.href, external: true },
  { icon: Mail, label: "E-Posta", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Adres", value: site.address },
  { icon: Clock, label: "Çalışma Saatleri", value: site.hours.label },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <PageHero
        title="Bize ulaşın."
        eyebrow="İletişim"
        lead="Siber güvenlik, altyapı, yazılım ürünleri ve IT destek ihtiyaçlarınız için ücretsiz keşif görüşmesi talep edin. En geç bir iş günü içinde size dönüş yapılır."
        crumbs={[{ text: "İletişim" }]}
      />

      <section className="bg-paper-50 py-16 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <h2 className="visually-hidden">İletişim bilgileri</h2>
              <ul className="grid gap-5">
                {rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-700">
                      <row.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">{row.label}</div>
                      {row.href ? (
                        <a
                          href={row.href}
                          {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="break-words text-base font-medium text-ink-900 transition-colors hover:text-gold-700"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-base font-medium text-ink-900">{row.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 overflow-hidden rounded-sm border border-navy-950/10">
                <ConsentMap query="Hacıhalil Mah. 1207. Sk. No:1 Match Plaza, 41400 Gebze/Kocaeli" />
              </div>
            </div>

            <div>
              <h2 className="mb-5 font-display text-2xl font-semibold text-ink-900">Mesaj gönderin</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <section id="teklif" className="scroll-mt-28 bg-navy-950 py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <SectionHeading
              tone="dark"
              eyebrow="Hızlı Teklif"
              title="İhtiyacınızı anlatın, aynı gün dönelim."
              description="Birkaç bilgiyle kapsamınızı anlayalım; keşif randevusu ve teklif için en kısa sürede sizinle iletişime geçelim."
            />
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
