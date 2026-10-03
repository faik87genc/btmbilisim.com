import { serviceCategoryList } from "@/lib/services";
import { products } from "@/lib/products";
import { references, team } from "@/lib/data/trust";

// Menu data shared by the server-rendered desktop header and the client
// mobile menu. Plain serialisable values only (no icons, no page bodies).

export type NavArea = {
  slug: string;
  title: string;
  services: { key: string; name: string; href: string }[];
};

export const navAreas: NavArea[] = serviceCategoryList.map((c) => ({
  slug: c.slug,
  title: c.shortTitle,
  // Detail pages live at /{category}/{key}/ (lib/servicePages.ts keeps slug === serviceKey).
  services: c.services.map((s) => ({ key: s.key, name: s.name, href: `/${c.slug}/${s.key}/` })),
}));

export const navProducts = products.map((p) => ({ slug: p.slug, name: p.name, tagline: p.tagline }));

export type CorporateKey = "sirket" | "ekip" | "referans" | "risk" | "kvkk" | "cerez";

export const navCorporate: { key: CorporateKey; label: string; href: string; note: string }[] = [
  { key: "sirket", label: "Şirket", href: "/hakkimizda/", note: "BTM Bilişim'i tanıyın" },
  // Team and references appear once lib/data/trust.ts has real entries.
  ...(team.length ? [{ key: "ekip" as const, label: "Ekibimiz", href: "/ekibimiz/", note: "Uzman kadromuz" }] : []),
  ...(references.length
    ? [{ key: "referans" as const, label: "Referanslar", href: "/referanslar/", note: "Bize güvenen kurumlar" }]
    : []),
  { key: "risk", label: "Risk Skoru Testi", href: "/risk-skoru-testi/", note: "8 soruda güvenlik risk seviyeniz" },
  { key: "kvkk", label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni/", note: "Kişisel verilerin korunması" },
  { key: "cerez", label: "Çerez Politikası", href: "/cerez-politikasi/", note: "Çerez kullanımı ve tercihler" },
];
