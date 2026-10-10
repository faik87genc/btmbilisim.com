import type { Metadata } from "next";
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
  title: "Yazılım Ürünlerimiz: 9 Kurumsal Uygulama | BTM Bilişim",
  description:
    "BTM Bilişim yazılım ekibinin geliştirdiği 9 ürün: bütçe ve çek-senet takibi, güvenlik izleme ve pentest, IoT üretim takibi, Wi-Fi, MSP, İK izin ve IT envanteri.",
  alternates: { canonical: "/yazilim-urunlerimiz/" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ text: "Yazılım Ürünlerimiz" }])} />
      <JsonLd data={itemListJsonLd} />
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,black,transparent_85%)]" aria-hidden="true" />
        <Container className="relative">
          <div className="max-w-3xl">
          <p className="eyebrow-v2 eyebrow-v2-dark">Yazılım Ürünlerimiz</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] text-white md:text-[3.25rem]">
            Sahada gördüğümüz ihtiyaçlardan doğan 9 yazılım.
          </h1>
          <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
            Müşterilerimizin BT altyapısını yönetirken tekrar tekrar karşılaştığımız
            sorunlar için kendi ekibimizle yazdığımız uygulamalar: bütçe ve tahsilat
            takibinden ağ güvenliğine, üretim hattından İK süreçlerine.
          </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
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
            title="Hazır sürümle başlayın, gerekeni birlikte ekleyelim."
            description="Önce iş akışınızı dinliyoruz; ardından ürünü kullandığınız sistemlere bağlıyor, eksik kalan modülleri sizin için devreye alıyoruz."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="yazılım ürünleriniz" tone="dark" align="center" />
          </div>
        </Container>
      </section>
    </>
  );
}
