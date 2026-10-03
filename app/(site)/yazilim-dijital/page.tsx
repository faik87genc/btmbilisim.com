import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { SoftwareShowcase } from "@/components/btm/SoftwareShowcase";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["yazilim-dijital"];

const base = {
  title: "Özel Yazılım ve Web Tasarım Hizmetleri | BTM Bilişim",
  description:
    "Kendi yazılım ekibimizle özel yazılım geliştirme, mobil uyumlu kurumsal web tasarım, ERP entegrasyonu ve iş süreci otomasyonu. Analizden bakıma uçtan uca.",
  alternates: { canonical: "/yazilim-dijital/" },
};

export const metadata: Metadata = {
  ...base,
  ...ogMeta({ title: base.title, description: base.description, path: "/yazilim-dijital/" }),
};

export default function Page() {
  return (
    <CategoryPage category={category}>
      <SoftwareShowcase />
    </CategoryPage>
  );
}
