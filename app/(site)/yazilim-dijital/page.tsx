import type { Metadata } from "next";
import { CategoryView } from "@/components/site/CategoryView";
import { SoftwareShowcase } from "@/components/btm/SoftwareShowcase";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["yazilim-dijital"];

const base = {
  title: "Yazılım, Entegrasyon ve Otomasyon Çözümleri | BTM Bilişim",
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
    <CategoryView category={category}>
      <SoftwareShowcase />
    </CategoryView>
  );
}
