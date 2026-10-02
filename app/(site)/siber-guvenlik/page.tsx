import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { serviceCategories } from "@/lib/services";

const category = serviceCategories["siber-guvenlik"];

export const metadata: Metadata = {
  title: "Sızma Testi, SIEM, EDR Siber Güvenlik | BTM Bilişim",
  description:
    "Sızma testi, SIEM, firewall, EDR ve ISO 27001 teknik güvenlik dahil sekiz alanda kurumsal siber güvenlik çözümleri sunuyoruz.",
  alternates: { canonical: "/siber-guvenlik/" },
};

export default function Page() {
  return <CategoryPage category={category} />;
}
