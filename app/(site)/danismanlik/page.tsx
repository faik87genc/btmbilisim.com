import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["danismanlik"];

const base = {
  title: "Kurumsal Danışmanlık: IT, ISO 27001, KVKK ve ERP | BTM Bilişim",
  description:
    "IT danışmanlık, ISO 27001 bilgi güvenliği ve KVKK danışmanlığı, Logo ERP desteği ve dijital dönüşüm danışmanlığı. 2010'dan beri Gebze ve Kocaeli'de BTM Bilişim.",
  alternates: { canonical: "/danismanlik/" },
};

export const metadata: Metadata = {
  ...base,
  ...ogMeta({ title: base.title, description: base.description, path: "/danismanlik/" }),
};

export default function Page() {
  return <CategoryPage category={category} />;
}
