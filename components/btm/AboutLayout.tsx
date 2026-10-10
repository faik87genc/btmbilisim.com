import { ArrowRight, HardHat, Phone, Scale, ShieldCheck, Waypoints } from "lucide-react";
import type { Page } from "@/lib/db/schema";
import { SiteMarkdown } from "@/components/site/SiteMarkdown";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { Button } from "@/components/ensa/Button";
import { ContactCta } from "@/components/ensa/ContactCta";
import { IconTile } from "@/components/ensa/IconTile";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { StatRow } from "@/components/ensa/StatRow";
import { TeamCards } from "@/components/btm/TeamCards";
import { ApproachSteps, TrustSection } from "@/components/btm/HomeSections";
import { factsFor, team } from "@/lib/data/trust";
import { site } from "@/lib/site";
import type { Crumb } from "@/lib/siteView";

// /hakkimizda/ (the DB page "hakkimizda", rendered through ArticleView →
// CoreBody). The Markdown, title and metadata are the page's own and stay as
// they are; only the frame around them lives here (identity v2):
// hero (ink) → facts panel pulled over the hero + text with a sticky "Künye"
// aside (surface) → approach, steps 01–04 (white) → values (surface) → team
// (white) → reference strip (surface, only with data) → contact band (ink).

const FACTS = factsFor(["since", "customers", "iso", "support"]);
const SINCE = factsFor(["since"])[0]?.value;

// Every Künye row is read from lib/site.ts (and the founding year from
// companyFacts) — nothing typed in here.
const KUNYE: { label: string; value: string; href?: string }[] = [
  { label: "Unvan", value: site.legalName },
  ...(SINCE ? [{ label: "Kuruluş", value: SINCE }] : []),
  { label: "Merkez", value: `${site.postalAddress.addressLocality} / ${site.postalAddress.addressRegion}` },
  { label: "Hizmet bölgesi", value: site.areaLabel },
  { label: "Çalışma saatleri", value: site.hours.label },
  { label: "Telefon", value: site.phone.display, href: site.phone.href },
  { label: "Destek", value: site.supportEmail.address, href: `mailto:${site.supportEmail.address}` },
];

// The principles the site already states elsewhere (hero, IT consulting,
// security pages, quote form) — gathered here, no new claims.
const VALUES = [
  {
    icon: ShieldCheck,
    title: "Önce güvenlik",
    text: "Her projeye ISO 27001 baş denetçi deneyimiyle, önce güvenlik gözüyle bakarız; KVKK ve ISO 27001 gereksinimleri kurulumun parçasıdır.",
  },
  {
    icon: Waypoints,
    title: "Satıcıdan bağımsızlık",
    text: "Marka değil ihtiyaç öneririz. Teknoloji yol haritanızı ürün bağımsız kurar, önde gelen markalarla uyumlu çalışırız.",
  },
  {
    icon: HardHat,
    title: "Sahada uygulama",
    text: "Danışmanlık raporda kalmaz: önerdiğimiz işi kendi ekibimizle kurar, sonrasında izler ve yönetiriz.",
  },
  {
    icon: Scale,
    title: "Şeffaflık",
    text: "Kalem kalem bütçelenmiş teklif veririz. Çağrı merkezi yok; doğrudan uzman ekibe ulaşırsınız.",
  },
];

export function AboutLayout({ page, crumbs }: { page: Page; crumbs: Crumb[] }) {
  return (
    <>
      <PageHero title={page.title} lead={page.excerpt !== page.title ? page.excerpt : null} crumbs={crumbs} overlap />

      <section className="bg-tint-50 pb-20 md:pb-28">
        <Container className="relative z-10 -mt-16 md:-mt-20">
          <div className="rounded-panel border border-line bg-white px-2 shadow-lift md:px-4">
            <p className="visually-hidden">BTM Bilişim kısaca</p>
            <StatRow facts={FACTS} tone="light" />
          </div>
        </Container>

        <Container className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
            <div className="markdown-content core-page min-w-0 max-w-3xl">
              {/* Core pages have no separate hero image; the first content image is the likely LCP element. */}
              <SiteMarkdown content={page.content} eagerFirstImage />
            </div>

            <aside aria-label="Künye ve iletişim" className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="card p-6 md:p-7">
                <p className="eyebrow">Künye</p>
                <dl className="mt-4">
                  {KUNYE.map((row) => (
                    <div key={row.label} className="grid gap-1 border-t border-line py-3.5">
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{row.label}</dt>
                      <dd className="break-words text-[0.9375rem] leading-snug text-navy-950">
                        {row.href ? (
                          <a href={row.href} className="rounded-sm font-semibold text-gold-700 hover:text-gold-800">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative overflow-hidden rounded-panel bg-navy-950 p-6 shadow-lift md:p-7">
                <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <p className="font-display text-xl font-bold leading-snug tracking-[-0.01em] text-white">Ücretsiz keşif isteyin</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">İhtiyacınızı anlatın; ön görüşme ve keşif ücretsizdir.</p>
                  <Button href="/#teklif" variant="inverse" className="mt-5 w-full">
                    Keşif talep edin <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <a
                    href={site.phone.href}
                    className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-control text-sm font-semibold tabular-nums text-white hover:text-gold-300"
                  >
                    <Phone className="h-4 w-4 text-gold-300" strokeWidth={1.75} aria-hidden="true" /> {site.phone.display}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Approach: the same four steps as the homepage */}
      <section className="cv-auto bg-white py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Çalışma Yaklaşımımız"
            title="Keşiften sürekli desteğe, dört adımda."
            description="Her işe ihtiyacı ve riski netleştirerek başlarız; planı birlikte onaylar, kendi ekibimizle uygular ve sonrasında da yanınızda kalırız."
          />
          <MotionReveal className="mt-12">
            <ApproachSteps />
          </MotionReveal>
        </Container>
      </section>

      {/* Values */}
      <section className="cv-auto bg-tint-50 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Değerlerimiz" title="İşimizi nasıl yaptığımız" />
          <MotionReveal className="mt-12">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
              {VALUES.map((v) => (
                <li key={v.title} className="card flex h-full items-start gap-5 p-6 md:p-7">
                  <IconTile icon={v.icon} size="lg" />
                  <div>
                    <h3 className="font-display text-[1.1875rem] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-950">{v.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-500">{v.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </Container>
      </section>

      {team.length > 0 && (
        <section className="cv-auto bg-white py-20 md:py-28">
          <Container>
            <SectionHeading
              eyebrow="Ekibimiz"
              title="Sahada yıllarını geçirmiş bir ekip"
              description="Danışmanlığını yaptığımız işi kendimiz kurarız; ekibimiz BT operasyonları, altyapı ve bilgi güvenliği tecrübesini bir araya getirir."
            />
            <div className="mt-12">
              <TeamCards members={team} headingLevel={3} />
            </div>
          </Container>
        </section>
      )}

      <TrustSection variant="strip" />

      <ContactCta
        title="Altyapınızı birlikte planlayalım."
        description="Arayın veya WhatsApp'tan yazın; çağrı merkezi yok, doğrudan uzman ekibe ulaşırsınız. İlk görüşme ve keşif ücretsizdir."
      />
    </>
  );
}
