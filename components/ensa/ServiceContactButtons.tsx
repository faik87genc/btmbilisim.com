import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { serviceWhatsAppHref } from "@/lib/contact";

// Direct-contact pair for service / category pages on a dark ground: WhatsApp
// opens with the service name already written, the call goes to the direct line.
export function ServiceContactButtons({ service, note = true }: { service: string; note?: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <a
          href={serviceWhatsAppHref(service)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-control bg-[#0f7a40] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b6434]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp&apos;tan teklif isteyin<span className="visually-hidden"> (yeni sekmede açılır)</span>
        </a>
        <a
          href={site.mobile.href}
          className="inline-flex items-center justify-center gap-2 rounded-control bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> {site.mobile.display}
        </a>
      </div>
      {note && <p className="mt-3 text-sm text-slate-300">İlk görüşme ve keşif ücretsizdir; doğrudan uzman ekibe ulaşırsınız.</p>}
    </div>
  );
}
