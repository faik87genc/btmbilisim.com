import { BadgeCheck, Headphones, Phone, SearchCheck, ShieldCheck } from "lucide-react";
import { Container } from "./Container";
import { site } from "@/lib/site";

// Trust strip above the header. Only statements that are true for BTM —
// counts come from the data files, no invented customer/year figures.
const badges = [
  { icon: BadgeCheck, label: "2010'dan Beri IT Danışmanlık" },
  { icon: Headphones, label: "7/24 Teknik Destek" },
  { icon: SearchCheck, label: "Ücretsiz Keşif" },
  { icon: ShieldCheck, label: "ISO 27001 Baş Denetçi Deneyimi" },
];

export function TopBar() {
  return (
    <div className="hidden bg-brand-gradient py-2 text-xs font-medium text-paper-50 md:block">
      <Container className="flex items-center justify-between gap-6 lg:max-w-7xl">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
          {badges.map((b) => (
            <li key={b.label} className="flex items-center gap-1.5">
              <b.icon className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
              {b.label}
            </li>
          ))}
        </ul>
        <a href={site.phone.href} className="flex shrink-0 items-center gap-1.5 hover:text-gold-300">
          <Phone className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
          {site.phone.display}
        </a>
      </Container>
    </div>
  );
}
