import type { Metadata } from "next";
import { CategoryPage } from "@/components/ensa/CategoryPage";
import { PentestScope, SecurityShowcase } from "@/components/btm/HomeSections";
import { serviceCategories } from "@/lib/services";
import { ogMeta } from "@/lib/siteView";

const category = serviceCategories["siber-guvenlik"];

const base = {
  title: "Siber Güvenlik Çözümleri | BTM Bilişim",
  description:
    "Sızma testinden SIEM ve 5651 log yönetimine, EDR, DLP ve firewall'a kurumsal siber güvenlik çözümleri. ISO 27001 baş denetçi deneyimiyle BTM Bilişim.",
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
