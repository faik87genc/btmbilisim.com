import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { site } from "@/lib/site";
import { serviceWhatsAppHref } from "@/lib/contact";

// Direct-contact pair for service / category pages on a dark ground: WhatsApp
// opens with the service name already written, the call goes to the direct line.
// Phones (< md) skip the call button: the fixed bottom bar (FloatingContact)
// already carries "Hemen Ara", so the hero does not repeat it.
export function ServiceContactButtons({ service, note = true }: { service: string; note?: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <a
          href={serviceWhatsAppHref(service)}
          target="_blank"
          rel="noopener noreferrer"
          className="press inline-flex w-full items-center justify-center gap-2 rounded-control sm:w-auto px-5 py-3 text-sm font-semibold transition-colors border border-white/30 bg-white/10 text-white hover:border-gold-300 hover:bg-white/20"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp&apos;tan teklif isteyin<span className="visually-hidden"> (yeni sekmede açılır)</span>
        </a>
        <a
          href={site.phone.href}
          className="press hidden w-full items-center justify-center gap-2 rounded-control sm:w-auto md:inline-flex bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
        </a>
      </div>
      {note && <p className="mt-3 text-sm text-slate-300">İlk görüşme ve keşif ücretsizdir; doğrudan uzman ekibe ulaşırsınız.</p>}
    </div>
  );
}
