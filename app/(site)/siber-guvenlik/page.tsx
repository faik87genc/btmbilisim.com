import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { PentestScope, SecurityShowcase } from "@/components/btm/HomeSections";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["siber-guvenlik"];

const base = {
  title: "Sızma Testi, SIEM, EDR Siber Güvenlik | BTM Bilişim",
  description:
    "Sızma testi, SIEM, firewall, EDR ve ISO 27001 teknik güvenlik dahil sekiz alanda kurumsal siber güvenlik çözümleri sunuyoruz.",
  alternates: { canonical: "/siber-guvenlik/" },
};

export const metadata: Metadata = {
  ...base,
  ...ogMeta({ title: base.title, description: base.description, path: "/siber-guvenlik/" }),
};

export default function Page() {
  // DLP/EDR showcase, phishing demo and the pentest scope (moved here from
  // the homepage to keep it short).
  return (
    <CategoryPage category={category}>
      <SecurityShowcase />
      <PentestScope />
    </CategoryPage>
  );
}
