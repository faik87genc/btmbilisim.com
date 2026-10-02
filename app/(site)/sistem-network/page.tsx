import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";

const category = serviceCategories["sistem-network"];

export const metadata: Metadata = {
  title: "Sistem, Ağ ve Sunucu Altyapı Çözümleri | BTM Bilişim",
  description:
    "Ağ altyapısı, sunucu yönetimi, sanallaştırma ve IT destek dahil dokuz alanda kurumsal sistem ve network çözümleri sunuyoruz.",
  alternates: { canonical: "/sistem-network/" },
};

export default function Page() {
  return <CategoryPage category={category} />;
}
