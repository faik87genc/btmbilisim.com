import { Container } from "./Container";
import { StatRow } from "./StatRow";
import { products } from "@/lib/products";
import { factsFor } from "@/lib/data/trust";

// Four plain facts right under the homepage hero. Values come from
// lib/data/trust.ts (companyFacts) and the product count from lib/products —
// nothing is typed in here.
const FACTS = [
  ...factsFor(["since", "customers", "support"]),
  { value: String(products.length), label: "kendi yazılım ürünü" },
];

export function ProofStrip() {
  return (
    <section aria-label="BTM Bilişim kısaca" className="border-t border-white/10 bg-navy-950">
      <Container>
        <StatRow facts={FACTS} tone="dark" />
      </Container>
    </section>
  );
}
