import type { Metadata } from "next";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { RiskQuiz } from "@/components/btm/RiskQuiz";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE } from "@/lib/structuredData";

const TITLE = `Bilgi Güvenliği Risk Skoru Testi${site.titleSuffix}`;
const DESCRIPTION =
  "Kurumunuzun siber güvenlik risk seviyesini ve KVKK hazırlığını 8 soruda ücretsiz değerlendirin; eksik başlıklar için önerileri anında görün.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/risk-skoru-testi/") },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: absoluteUrl("/risk-skoru-testi/"), images: [DEFAULT_OG_IMAGE] },
};

export default function RiskScorePage() {
  return (
    <>
      <PageHero
        title="Bilgi güvenliği risk skoru"
        eyebrow="Ücretsiz Analiz Aracı"
        lead="Yedekleme, güvenlik duvarı, uç nokta koruması, güncellemeler, MFA, sızma testi, farkındalık ve KVKK: 8 soruda kurumunuzun risk seviyesini görün."
        crumbs={[{ text: "Risk Skoru Testi" }]}
      />
      <section className="bg-paper-50 py-14 md:py-20">
        <Container className="max-w-3xl">
          <RiskQuiz />
        </Container>
      </section>
    </>
  );
}
