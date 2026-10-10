"use client";

import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

// Desktop: two round buttons bottom-right. Phones: a sticky bottom bar with
// "Ara" and "WhatsApp" side by side — the direct line to the team, always one
// tap away, without covering page content (a spacer keeps the footer clear).
// Both sit above the cookie banner while it is shown (SiteBehavior sets --cb-h).
export function FloatingContact() {
  return (
    <>
      <div className="h-16 md:hidden" aria-hidden="true" />
      <nav
        aria-label="Hızlı iletişim"
        className="fixed inset-x-0 z-50 grid grid-cols-2 border-t border-line bg-white shadow-lift md:hidden"
        style={{ bottom: "var(--cb-h, 0px)" }}
      >
        <a
          href={site.phone.href}
          className="flex h-16 items-center justify-center gap-2 bg-gold-500 text-sm font-semibold text-white"
        >
          <Phone className="h-5 w-5" aria-hidden="true" /> Hemen Ara
        </a>
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-16 items-center justify-center gap-2 bg-navy-950 text-sm font-semibold text-white"
        >
          <WhatsAppIcon className="h-5 w-5" /> WhatsApp<span className="visually-hidden"> (yeni sekmede açılır)</span>
        </a>
      </nav>

      <div
        className="fixed right-6 z-50 hidden flex-col items-end gap-3 md:flex"
        style={{ bottom: "calc(var(--cb-h, 0px) + 1.5rem)" }}
      >
        <a
          href={site.phone.href}
          aria-label={`Hemen arayın — ${site.phone.display}`}
          title={`Hemen arayın — ${site.phone.display}`}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-white shadow-lift ring-4 ring-white transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-gold-700"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp'tan yazın (yeni sekmede açılır)"
          title="WhatsApp'tan yazın"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lift ring-4 ring-white transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-[#0b5e58]"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </div>
    </>
  );
}
