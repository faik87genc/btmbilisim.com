import Link from "next/link";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { site } from "@/lib/site";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

// Closing band of the service and category pages: the visitor reaches a person
// directly (phone / WhatsApp); the form stays one link away. Ink-950 band:
// the primary action is white with ink text (identity v2).
export function ContactCta({
  title = "Bu alanda ihtiyacınızı konuşalım.",
  description = "Arayın veya WhatsApp'tan yazın; çağrı merkezi yok, doğrudan uzman ekibe ulaşırsınız. İlk görüşme ve keşif ücretsizdir.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section data-contact-cta="" className="relative overflow-hidden bg-navy-950 py-20 md:py-24">
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading tone="dark" align="center" eyebrow="İletişim" title={title} description={description} />
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={site.phone.href}
            className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-white px-6 text-[0.9375rem] font-semibold tabular-nums text-navy-950 transition-colors hover:bg-gold-100"
          >
            <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
          </a>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-control border border-white/30 px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp&apos;tan yazın<span className="visually-hidden"> (yeni sekmede açılır)</span>
          </a>
        </div>
        <p className="mt-6 text-center text-sm text-slate-300">
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
