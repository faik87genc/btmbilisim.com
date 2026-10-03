import Link from "next/link";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { site } from "@/lib/site";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

// Closing band of the service and category pages: the visitor reaches a person
// directly (phone / WhatsApp); the form stays one link away.
export function ContactCta({
  title = "Bu alanda ihtiyacınızı konuşalım.",
  description = "Arayın veya WhatsApp'tan yazın; çağrı merkezi yok, doğrudan uzman ekibe ulaşırsınız. İlk görüşme ve keşif ücretsizdir.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section data-contact-cta="" className="bg-navy-950 py-16">
      <Container>
        <SectionHeading tone="dark" align="center" title={title} description={description} />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={site.mobile.href}
            className="inline-flex items-center justify-center gap-2 rounded-control bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            <Phone className="h-4 w-4" aria-hidden="true" /> {site.mobile.display}
          </a>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-control px-6 py-3 text-sm font-semibold transition-colors border border-white/30 bg-white/10 text-white hover:border-gold-300 hover:bg-white/20"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp&apos;tan yazın<span className="visually-hidden"> (yeni sekmede açılır)</span>
          </a>
        </div>
        <p className="mt-5 text-center text-sm text-slate-300">
          Yazılı talep tercih ederseniz{" "}
          <Link href="/#teklif" className="font-semibold text-white underline underline-offset-4 hover:text-gold-300">
            ücretsiz keşif formunu
          </Link>{" "}
          doldurun.
        </p>
      </Container>
    </section>
  );
}
