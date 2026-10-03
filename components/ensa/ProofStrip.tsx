import { Container } from "./Container";
import { serviceCategoryList } from "@/lib/services";
import { products } from "@/lib/products";

// Four plain, verifiable facts right under the homepage hero (counts come from
// the data files; no invented customer or project numbers).
const FACTS = [
  { value: "2010", label: "yılından beri sahada" },
  { value: "7/24", label: "teknik destek" },
  { value: String(serviceCategoryList.length), label: "uzmanlık alanı" },
  { value: String(products.length), label: "kendi yazılım ürünü" },
];

export function ProofStrip() {
  return (
    <section aria-label="BTM Bilişim kısaca" className="border-t border-white/10 bg-navy-950">
      <Container>
        <dl className="grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
          {FACTS.map((f) => (
            <div key={f.label} className="flex flex-col-reverse px-2 py-6 text-center md:py-8">
              <dt className="mt-1 text-sm text-slate-300">{f.label}</dt>
              <dd className="font-display text-3xl font-semibold text-white md:text-4xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
