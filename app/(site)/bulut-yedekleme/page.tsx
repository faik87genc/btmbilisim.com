import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["bulut-yedekleme"];

const base = {
  title: "Microsoft 365, Azure, AWS Bulut Çözümleri | BTM Bilişim",
  description:
    "Microsoft 365, Azure ve AWS bulut çözümleri, veri yedekleme, felaket kurtarma ve iş sürekliliği ile verinizin sürekliliğini garanti altına alırız.",
  alternates: { canonical: "/bulut-yedekleme/" },
};

export const metadata: Metadata = {
  ...base,
  ...ogMeta({ title: base.title, description: base.description, path: "/bulut-yedekleme/" }),
};

export default function Page() {
  return <CategoryPage category={category} />;
}
