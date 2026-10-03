import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["yazilim-dijital"];

const base = {
  title: "Özel Yazılım ve Dijital Dönüşüm Çözümleri | BTM Bilişim",
  description:
    "Özel yazılım geliştirme, web uygulama, ERP entegrasyonu ve iş süreci otomasyonu dahil yedi alanda dijital çözümler sunuyoruz.",
  alternates: { canonical: "/yazilim-dijital/" },
};

export const metadata: Metadata = {
  ...base,
  ...ogMeta({ title: base.title, description: base.description, path: "/yazilim-dijital/" }),
};

export default function Page() {
  return <CategoryPage category={category} />;
}
