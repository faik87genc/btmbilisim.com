import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { FaqSection } from "@/components/ensa/FaqSection";
import { DemoRequest } from "@/components/ensa/DemoRequest";
import { ProductCard } from "@/components/ensa/ProductCard";
import { ProductJsonLd } from "@/components/ensa/ProductJsonLd";
import { getProductBySlug, products } from "@/lib/products";

// atlas, orbit, otium, cyberhost, pentforce, cyberquan and fornet-enterprise
// each have a dedicated hand-built page under this segment; the rest use this
// generic template.
const dedicatedPages = new Set([
  "atlas",
  "orbit",
  "otium",
  "cyberhost",
  "pentforce",
  "cyberquan",
  "fornet-enterprise",
]);

export function generateStaticParams() {
  return products
    .filter((product) => !dedicatedPages.has(product.slug))
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`,
    description: product.metaDescription,
    alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}/` },
    ...ogMeta({ title: product.name, description: product.metaDescription, path: `/yazilim-urunlerimiz/${product.slug}/` }),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <ProductJsonLd product={product} />
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,black,transparent_85%)]" aria-hidden="true" />
        <Container className="relative">
          <div className="max-w-3xl">
          <span className="inline-block rounded-[6px] bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-300">
            {product.code}
          </span>
          <h1 className="mt-5 text-balance font-display text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.025em] text-white md:text-[2.75rem]">
            {product.name}
          </h1>
          <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
            {product.description}
          </p>
          <MotionReveal>
            <div className="mt-8">
              <DemoRequest product={product.name} />
            </div>
          </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={product.category} title="Neler yapabilirsiniz?" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 card-v2 p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-ink-900">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FaqSection items={product.faq} />

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Diğer yazılımlarımız" title="Bunlara da göz atın" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} delay={i * 0.08} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
