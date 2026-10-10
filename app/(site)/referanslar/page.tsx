import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStoryCard } from "@/components/btm/CaseStoryCard";
import { Container } from "@/components/ensa/Container";
import { CtaBand, LightHero, SectionHead } from "@/components/site/ui";
import { liveCaseStories, references } from "@/lib/data/trust";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";

// Live only once lib/data/trust.ts lists real references. Layout: intro →
// logo wall → success stories (only when liveCaseStories has entries) → CTA.
// Only approved names and logos; nothing is added to make the wall look fuller.

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
      <LightHero
        title={hasStories ? "Referanslar ve Başarı Hikâyeleri" : "Referanslarımız"}
        eyebrow="Bize güvenenler"
        crumbs={[{ text: "Referanslar" }]}
        lead="BTM Bilişim'in birlikte çalıştığı kurumlardan bazıları. Bu sayfada yalnızca adının ve logosunun paylaşılmasına izin veren kurumlar yer alır."
      />

      {/* Logo wall: centred flex rows, so a short list never leaves a half-empty grid. */}
      <section className="bg-white py-16 md:py-20">
        <Container className="max-w-5xl">
          {sectors.map((sector) => (
            <div key={sector} className="mb-12 last:mb-0">
              {sectors.length > 1 && (
                <h2 className="mb-6 text-center font-display text-xl font-semibold tracking-[-0.01em] text-navy-950">{sector}</h2>
              )}
              <ul className="flex flex-wrap justify-center gap-4 md:gap-5">
                {references
                  .filter((r) => (r.sector ?? "Diğer") === sector)
                  .map((r) => (
                    <li
                      key={r.name}
                      className="card-v2 flex w-[calc(50%-0.5rem)] flex-col items-center justify-center gap-4 px-5 py-8 sm:w-60 md:w-72"
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
        <section className="border-t border-slate-200 bg-paper-50 py-16 md:py-24">
          <Container className="max-w-6xl">
            <SectionHead eyebrow="Başarı hikâyeleri" title="Birlikte neler yaptık?" />
            <div className="mt-10 space-y-8">
              {liveCaseStories.map((s) => (
                <CaseStoryCard key={s.slug} story={s} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title="Benzer bir ihtiyacınız mı var?"
        lead="Altyapınızı yerinde görelim, ihtiyacı birlikte netleştirelim. İlk görüşme ve keşif ücretsizdir."
        secondary={{ label: "Hizmetlerimiz", href: "/hizmetler/" }}
      />
    </>
  );
}
