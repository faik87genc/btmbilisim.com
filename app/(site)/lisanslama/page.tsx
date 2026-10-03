import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["lisanslama"];

const base = {
  title: "Microsoft, VMware, Veeam Lisanslama | BTM Bilişim",
  description:
    "Microsoft, VMware, Veeam ve siber güvenlik ürünleri dahil kurumsal yazılım lisanslarınızı tek noktadan tedarik eder, yönetiriz.",
  alternates: { canonical: "/lisanslama/" },
};

export const metadata: Metadata = {
  ...base,
  ...ogMeta({ title: base.title, description: base.description, path: "/lisanslama/" }),
};

export default function Page() {
  return <CategoryPage category={category} />;
}
