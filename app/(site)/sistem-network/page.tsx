import type { Metadata } from "next";
import { CategoryView } from "@/components/site/CategoryView";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["sistem-network"];

const base = {
  title: "Sistem, Ağ ve Sunucu Altyapı Çözümleri | BTM Bilişim",
  description:
    "Ağ altyapısı, sunucu ve sanallaştırma, Wi-Fi, IP kamera, firewall/VPN ve 7/24 IT destek: Gebze, Tuzla, Kocaeli ve İstanbul'da sistem ve network çözümleri.",
  alternates: { canonical: "/sistem-network/" },
};

export const metadata: Metadata = {
  ...base,
  ...ogMeta({ title: base.title, description: base.description, path: "/sistem-network/" }),
};

export default function Page() {
  return <CategoryView category={category} />;
}
