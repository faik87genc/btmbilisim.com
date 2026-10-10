import Image from "next/image";
import { Container } from "./Container";
import { MotionReveal } from "./MotionReveal";
import { references } from "@/lib/data/trust";

// Logolar lib/data/trust.ts → references listesinden gelir (tek kaynak).
// Her logo 720x240 saydam PNG olarak normalize edildi: kırpma, ölçek ve optik
// denge dosyaların içine işlendi, bu yüzden hepsi aynı kutuda render edilir.
const LOGO_WIDTH = 720;
const LOGO_HEIGHT = 240;

export function PartnerLogos() {
  if (references.length === 0) return null;
  return (
    <section className="bg-paper-100 py-16 md:py-20">
      <Container>
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-navy-950/10" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            İş Ortaklarımız
          </span>
          <span className="h-px flex-1 bg-navy-950/10" aria-hidden="true" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {references.map((partner, i) => (
            <MotionReveal key={partner.logo} delay={i * 0.06} className="h-full">
              <div className="flex h-full items-center justify-center rounded-lg bg-white px-6 py-7 shadow-[0_10px_30px_-20px_rgba(10,18,32,0.15)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-20px_rgba(10,18,32,0.25)] md:px-8 md:py-9">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  loading="lazy"
                  sizes="(min-width: 768px) 240px, (min-width: 640px) 22vw, 70vw"
                  className="h-auto w-full max-w-[240px]"
                />
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
