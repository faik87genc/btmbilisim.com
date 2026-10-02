import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";

const category = serviceCategories["danismanlik"];

export const metadata: Metadata = {
  title: "Finansal, KOSGEB, TÜBİTAK Danışmanlığı | BTM Bilişim",
  description:
    "Finansal ve stratejik danışmanlık, KOSGEB/TÜBİTAK hibe teşvik, ISO 27001 ve KVKK dahil sekiz alanda uçtan uca kurumsal danışmanlık hizmeti sunuyoruz.",
  alternates: { canonical: "/danismanlik/" },
};

export default function Page() {
  return <CategoryPage category={category} />;
}
