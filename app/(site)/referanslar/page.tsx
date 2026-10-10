import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { CaseStoryCard } from "@/components/btm/CaseStoryCard";
import { Button } from "@/components/ensa/Button";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { liveCaseStories, references } from "@/lib/data/trust";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";

// Live only once lib/data/trust.ts lists real references. Layout: intro →
// logo wall → success stories (only when liveCaseStories has entries) → CTA.

export const metadata: Metadata = {
  title: `Referanslarımız${site.titleSuffix}`,
  description: "BTM Bilişim'in hizmet verdiği kurumlar.",
  alternates: { canonical: absoluteUrl("/referanslar/") },
};

export default function ReferencesPage() {
  if (references.length === 0) notFound();
  const sectors = [...new Set(references.map((r) => r.sector ?? "Diğer"))];
  const hasStories = liveCaseStories.length > 0;
  return (
    <>
      <PageHero
        title={hasStories ? "Referanslar ve Başarı Hikâyeleri" : "Referanslarımız"}
        eyebrow="Bize Güvenenler"
        crumbs={[{ text: "Referanslar" }]}
        lead="BTM Bilişim'in birlikte çalıştığı kurumlardan bazıları. Bu sayfada yalnızca adının ve logosunun paylaşılmasına izin veren kurumlar yer alır."
      />

      {/* Logo wall: centred flex rows, so a short list never leaves a half-empty grid. */}
      <section className="bg-paper-50 py-14 md:py-20">
        <Container className="max-w-5xl">
          {sectors.map((sector) => (
            <div key={sector} className="mb-12 last:mb-0">
              {sectors.length > 1 && <h2 className="mb-5 text-center font-display text-xl font-bold text-navy-800">{sector}</h2>}
              <ul className="flex flex-wrap justify-center gap-4">
                {references
                  .filter((r) => (r.sector ?? "Diğer") === sector)
                  .map((r) => (
                    <li
                      key={r.name}
                      className="flex w-[calc(50%-0.5rem)] flex-col items-center justify-center gap-3 rounded-card border border-navy-950/10 bg-white px-5 py-7 shadow-card sm:w-60 md:w-72"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.logo} alt="" loading="lazy" className="h-14 w-auto max-w-full object-contain md:h-16" />
                      <span className="text-center text-sm font-medium text-ink-900">{r.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>

      {hasStories && (
        <section className="bg-white py-16 md:py-24">
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="Başarı Hikâyeleri" title="Birlikte neler yaptık?" />
            <div className="mt-10 space-y-8">
              {liveCaseStories.map((s) => (
                <CaseStoryCard key={s.slug} story={s} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Closing CTA; data-contact-cta hides the footer's duplicate strip. The
          phone link is desktop-only: phones have the fixed call bar. */}
      <section data-contact-cta="" className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="Benzer bir ihtiyacınız mı var?"
            description="Altyapınızı yerinde görelim, ihtiyacı birlikte netleştirelim. İlk görüşme ve keşif ücretsizdir."
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/#teklif">
              Ücretsiz Keşif İsteyin <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <a
              href={site.phone.href}
              className="press hidden items-center justify-center gap-2 rounded-control border border-white/30 md:inline-flex px-6 py-3 text-sm font-semibold text-white transition-[color,border-color,transform] hover:border-gold-300 hover:text-gold-300"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
