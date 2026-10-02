import type { Product } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Structured data for a software-product page: the product itself as a
 * SoftwareApplication plus a BreadcrumbList. The FAQ rich result is emitted
 * separately by <FaqSection> from `product.faq`, so it is not repeated here.
 *
 * `offers` is deliberately omitted — pricing is quote-based, and a placeholder
 * price would be both wrong and a Search Console warning.
 */
export function ProductJsonLd({ product }: { product: Product }) {
  const base = site.baseUrl;
  const url = `${base}/yazilim-urunlerimiz/${product.slug}/`;

  const graph = [
    {
      "@type": "SoftwareApplication",
      name: product.name,
      alternateName: product.code,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url,
      description: product.metaDescription || product.description,
      featureList: product.features,
      inLanguage: "tr-TR",
      publisher: {
        "@type": "Organization",
        name: site.legalName,
        url: base,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${base}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Yazılım Ürünlerimiz",
          item: `${base}/yazilim-urunlerimiz/`,
        },
        { "@type": "ListItem", position: 3, name: product.name, item: url },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      // See app/(site)/layout.tsx for why "<" is escaped here.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
