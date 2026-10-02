import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";

const category = serviceCategories["lisanslama"];

export const metadata: Metadata = {
  title: "Microsoft, VMware, Veeam Lisanslama | BTM Bilişim",
  description:
    "Microsoft, VMware, Veeam ve siber güvenlik ürünleri dahil kurumsal yazılım lisanslarınızı tek noktadan tedarik eder, yönetiriz.",
  alternates: { canonical: "/lisanslama/" },
};

export default function Page() {
  return <CategoryPage category={category} />;
}
