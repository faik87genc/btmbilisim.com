import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["danismanlik"];

const base = {
  title: "Kurumsal Danışmanlık: IT, ISO 27001, KVKK ve Hibe | BTM Bilişim",
  description:
    "IT danışmanlık, ISO 27001 ve KVKK uyumu, dijital dönüşüm, Logo ERP, KOSGEB/TÜBİTAK hibe ve finansal danışmanlık dahil sekiz alanda kurumsal danışmanlık.",
  alternates: { canonical: "/danismanlik/" },
};

export const metadata: Metadata = {
  ...base,
  ...ogMeta({ title: base.title, description: base.description, path: "/danismanlik/" }),
};

export default function Page() {
  return <CategoryPage category={category} />;
}
