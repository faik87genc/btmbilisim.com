import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Clock, Headphones, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ConsentMap } from "@/components/site/ConsentMap";
import { JsonLd } from "@/components/site/Parts";
import { Button } from "@/components/ensa/Button";
import { Container } from "@/components/ensa/Container";
import { IconTile } from "@/components/ensa/IconTile";
import { PageHero } from "@/components/ensa/PageHero";
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
  openGraph: { type: "website", locale: "tr_TR", siteName: site.name, title: TITLE, description: DESCRIPTION, url: absoluteUrl("/iletisim/"), images: [DEFAULT_OG_IMAGE] },
};

// Layout (docs/tasarim-spec-ana-sayfa-hakkimizda-iletisim.md 3.3, identity v2):
// a short hero, then on the surface ground the channel cards and the office
// card on the left, the dark form panel (visible labels) on the right, sticky
// on desktop. Phones get the one-tap channels first, then the form, the office
// and the consent-gated map last.

type Channel = { icon: LucideIcon; label: string; value: string; action: string; href: string; external?: boolean; wide?: boolean };

const channels: Channel[] = [
  { icon: Phone, label: "Telefon", value: site.phone.display, action: "Hemen arayın", href: site.phone.href },
  { icon: MessageCircle, label: "WhatsApp", value: site.mobile.display, action: "WhatsApp'tan yazın", href: site.whatsapp.href, external: true },
  { icon: Mail, label: "Teklif ve bilgi", value: site.email, action: "E-posta gönderin", href: `mailto:${site.email}`, wide: true },
  {
    icon: Headphones,
    label: site.supportEmail.label,
    value: site.supportEmail.address,
    action: "Destek talebi gönderin",
    href: `mailto:${site.supportEmail.address}`,
    wide: true,
  },
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
        compact
      >
        <Button href="#iletisim-formu" variant="ghost-light" className="mt-6 md:hidden">
          Formu doldurun <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </PageHero>

      <section className="bg-tint-50 py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {/* Below lg the wrapper dissolves (display: contents) so the office
                card can move after the form. */}
            <div className="contents lg:block">
              <div>
                <h2 className="visually-hidden">İletişim bilgileri</h2>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {channels.map((c) => (
                    <li key={c.label} className={c.wide ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : undefined}>
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="card card-link group flex h-full flex-col p-6"
                      >
                        <IconTile icon={c.icon} />
                        <span className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{c.label}</span>
                        <span className="mt-1.5 font-display text-[1.0625rem] font-semibold tabular-nums text-navy-950 [overflow-wrap:anywhere]">
                          {c.value}
                        </span>
                        <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-gold-700 group-hover:text-gold-800">
                          {c.action}
                          {c.external && <span className="visually-hidden"> (yeni sekmede açılır)</span>}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card order-last overflow-hidden !rounded-panel p-6 md:p-8 lg:order-none lg:mt-6">
                <div className="flex items-center gap-4">
                  <IconTile icon={MapPin} />
                  <h3 className="font-display text-[1.1875rem] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-950">Ofisimiz</h3>
                </div>
                <address className="mt-4 text-[0.9375rem] not-italic leading-relaxed text-navy-950">{site.address}</address>
                <dl className="mt-5 grid gap-3 border-t border-line pt-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      <Clock className="h-3.5 w-3.5 text-gold-600" strokeWidth={1.75} aria-hidden="true" /> Çalışma saatleri
                    </dt>
                    <dd className="mt-1.5 text-navy-950">{site.hours.label}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      <Headphones className="h-3.5 w-3.5 text-gold-600" strokeWidth={1.75} aria-hidden="true" /> Teknik destek
                    </dt>
                    <dd className="mt-1.5 text-navy-950">{site.supportEmail.label}</dd>
                  </div>
                </dl>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-gold-700 hover:text-gold-800"
                >
                  Yol tarifi alın<span className="visually-hidden"> (yeni sekmede açılır)</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <div className="-mx-6 -mb-6 mt-4 md:-mx-8 md:-mb-8">
                  <ConsentMap query="Hacıhalil Mah. 1207. Sk. No:1 Match Plaza, 41400 Gebze/Kocaeli" />
                </div>
              </div>
            </div>

            <div className="form-dark relative scroll-mt-28 overflow-hidden rounded-panel bg-navy-950 p-6 shadow-lift md:p-10 lg:sticky lg:top-28 lg:self-start">
              <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="relative">
              <p className="eyebrow eyebrow-dark">Mesaj gönderin</p>
              <h2 className="mt-4 text-balance font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-[2rem]">
                Ücretsiz keşif görüşmesi isteyin
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">En geç bir iş günü içinde dönüş yapıyoruz.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
