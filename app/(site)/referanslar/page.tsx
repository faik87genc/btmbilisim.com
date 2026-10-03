import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { references } from "@/lib/data/trust";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";

// Live only once lib/data/trust.ts lists real references.

export const metadata: Metadata = {
  title: `Referanslarımız${site.titleSuffix}`,
  description: "BTM Bilişim'in hizmet verdiği kurumlar.",
  alternates: { canonical: absoluteUrl("/referanslar/") },
};

export default function ReferencesPage() {
  if (references.length === 0) notFound();
  const sectors = [...new Set(references.map((r) => r.sector ?? "Diğer"))];
  return (
    <>
      <PageHero title="Referanslarımız" eyebrow="Bize Güvenenler" crumbs={[{ text: "Referanslar" }]} />
      <section className="bg-paper-50 py-14 md:py-20">
        <Container>
          {sectors.map((sector) => (
            <div key={sector} className="mb-12 last:mb-0">
              {sectors.length > 1 && <h2 className="mb-5 font-display text-xl font-bold text-navy-800">{sector}</h2>}
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {references
                  .filter((r) => (r.sector ?? "Diğer") === sector)
                  .map((r) => (
                    <li key={r.name} className="flex h-28 flex-col items-center justify-center gap-2 rounded-xl border border-navy-950/10 bg-white p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.logo} alt={r.name} loading="lazy" className="max-h-12 w-auto object-contain" />
                      <span className="text-center text-xs text-slate-500">{r.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
