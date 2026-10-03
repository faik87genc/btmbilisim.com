import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { GlobeBands } from "@/components/ensa/GlobeBands";
import { Container } from "@/components/ensa/Container";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { FaqSection } from "@/components/ensa/FaqSection";
import { Button } from "@/components/ensa/Button";
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
        <GlobeBands className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] text-gold-500/15" />
        <Container className="relative max-w-3xl">
          <span className="inline-block rounded-sm bg-paper-50/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gold-300">
            {product.code}
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight text-paper-50 md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
            {product.description}
          </p>
          <MotionReveal>
            <div className="mt-8">
              <Button href="/iletisim/" variant="primary">
                Demo Talep Edin
              </Button>
            </div>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={product.category} title="Öne çıkan özellikler" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-sm border border-navy-950/10 bg-white p-4"
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

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Diğer Ürünlerimiz" title="Ürün ailemizin geri kalanı" />
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
