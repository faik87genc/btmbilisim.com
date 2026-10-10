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
    <section className="bg-tint-50 py-16 md:py-20">
      <Container>
        <p className="eyebrow text-center">İş Ortaklarımız</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {references.map((partner, i) => (
            <MotionReveal key={partner.logo} delay={i * 0.06} className="h-full">
              <div className="card flex h-full items-center justify-center px-6 py-7 md:px-8 md:py-9">
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
