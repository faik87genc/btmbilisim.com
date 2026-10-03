import type { Metadata } from "next";
import { GlobeBands } from "@/components/ensa/GlobeBands";
import { Container } from "@/components/ensa/Container";
import { ProductCard } from "@/components/ensa/ProductCard";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { DemoRequest } from "@/components/ensa/DemoRequest";
import { products } from "@/lib/products";
import { JsonLd } from "@/components/site/Parts";
import { absoluteUrl } from "@/lib/siteView";
import { breadcrumbJsonLd } from "@/lib/structuredData";

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BTM Bilişim Yazılım Ürünleri",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    url: absoluteUrl(`/yazilim-urunlerimiz/${p.slug}/`),
  })),
};

export const metadata: Metadata = {
  title: "Kurumsal Yazılım Ürünlerimiz | BTM Bilişim",
  description:
    "Finans, siber güvenlik, insan kaynakları ve bilişim altyapısı alanlarında BTM Bilişim tarafından geliştirilen dokuz kurumsal yazılım ürünü.",
  alternates: { canonical: "/yazilim-urunlerimiz/" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ text: "Yazılım Ürünlerimiz" }])} />
      <JsonLd data={itemListJsonLd} />
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <GlobeBands className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] text-gold-500/15" />
        <Container className="relative">
          <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-300">
            <span className="h-px w-8 bg-gold-300" />
            Yazılım Ürünlerimiz
          </div>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-paper-50 md:text-5xl">
            Kendi çatımız altında geliştirdiğimiz dokuz ürün.
          </h1>
          <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
            Finans operasyonlarından siber güvenliğe kadar, danışmanlık
            tecrübemizi yazılıma dönüştürdüğümüz ürün ailesi.
          </p>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} delay={(i % 3) * 0.08} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="Ürünlerimizi işletmenize göre uyarlarız."
            description="Standart sürümden başlayıp, ihtiyaç duyduğunuz entegrasyon ve modüllerle genişletiyoruz."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="yazılım ürünleriniz" tone="dark" align="center" />
          </div>
        </Container>
      </section>
    </>
  );
}
