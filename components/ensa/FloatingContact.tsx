"use client";

import { Phone } from "lucide-react";
import { site } from "@/lib/site";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.912.535 3.7 1.466 5.229L2.05 22l4.899-1.285A9.936 9.936 0 0 0 12 22c5.522 0 10-4.477 10-10S17.522 2 12.001 2Zm0 18.187a8.157 8.157 0 0 1-4.153-1.137l-.298-.177-3.088.81.826-3.021-.194-.31A8.146 8.146 0 0 1 3.813 12c0-4.518 3.669-8.187 8.187-8.187 4.518 0 8.187 3.669 8.187 8.187s-3.668 8.187-8.186 8.187Z" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
    </svg>
  );
}

// Bir "+" arkasına gizlenen açılır menü yerine iki doğrudan erişilebilir
// buton — B2B ziyaretçinin en yüksek niyetli kanalı (WhatsApp) tek tıkla
// ulaşılabilir olmalı, ikinci bir tıklamayla ortaya çıkan gizli bir
// seçenek olmamalı.
export function FloatingContact() {
  return (
    <div
      className="fixed right-6 z-50 flex flex-col items-end gap-3"
      // Sits above the cookie banner while it is shown (SiteBehavior sets --cb-h).
      style={{ bottom: "calc(var(--cb-h, 0px) + 1.5rem)" }}
    >
      <a
        href={site.phone.href}
        aria-label={`Hemen arayın — ${site.phone.display}`}
        title={`Hemen arayın — ${site.phone.display}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-800 text-paper-50 shadow-lg ring-2 ring-white/40 transition-transform duration-200 hover:scale-105 hover:bg-navy-800 focus-visible:scale-105"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={site.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp'tan yazın (yeni sekmede açılır)"
        title="WhatsApp'tan yazın"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#128C4A] text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#0f7a40] focus-visible:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
