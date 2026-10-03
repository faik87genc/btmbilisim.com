import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["bulut-yedekleme"];

const base = {
  title: "Bulut ve Yedekleme Çözümleri | Gebze, Kocaeli | BTM Bilişim",
  description:
    "Microsoft 365, Azure ve AWS geçişi, 3-2-1 veri yedekleme, felaket kurtarma ve veri kurtarma. BTM Bilişim ile verinizi ve operasyonunuzun sürekliliğini koruyun.",
  alternates: { canonical: "/bulut-yedekleme/" },
};

export const metadata: Metadata = {
  ...base,
  ...ogMeta({ title: base.title, description: base.description, path: "/bulut-yedekleme/" }),
};

export default function Page() {
  return <CategoryPage category={category} />;
}
