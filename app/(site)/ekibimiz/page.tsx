import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { team } from "@/lib/data/trust";
import { TeamCards } from "@/components/btm/TeamCards";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";

// Live only once lib/data/trust.ts lists team members (with their consent).

export const metadata: Metadata = {
  title: `Ekibimiz${site.titleSuffix}`,
  description: "BTM Bilişim ekibi: kurucumuz Oğuzhan Batum ve sistem & network, bilgi güvenliği danışmanı, ISO 27001 baş denetçi Faik Genç.",
  alternates: { canonical: absoluteUrl("/ekibimiz/") },
};

export default function TeamPage() {
  if (team.length === 0) notFound();
  return (
    <>
      <PageHero
        title="Ekibimiz"
        eyebrow="Uzman Kadro"
        lead="Sahada yıllarını geçirmiş bir ekip: BT operasyonları, sistem ve network altyapısı, bilgi güvenliği ve ISO 27001 denetim tecrübesi aynı çatı altında."
        crumbs={[{ text: "Hakkımızda", href: "/hakkimizda/" }, { text: "Ekibimiz" }]}
      />
      <section className="bg-paper-50 py-14 md:py-20">
        <Container>
          <TeamCards members={team} />
        </Container>
      </section>
    </>
  );
}
