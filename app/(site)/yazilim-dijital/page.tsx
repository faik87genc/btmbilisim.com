import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";

const category = serviceCategories["yazilim-dijital"];

export const metadata: Metadata = {
  title: "Özel Yazılım ve Dijital Dönüşüm Çözümleri | BTM Bilişim",
  description:
    "Özel yazılım geliştirme, web uygulama, ERP entegrasyonu ve iş süreci otomasyonu dahil yedi alanda dijital çözümler sunuyoruz.",
  alternates: { canonical: "/yazilim-dijital/" },
};

export default function Page() {
  return <CategoryPage category={category} />;
}
