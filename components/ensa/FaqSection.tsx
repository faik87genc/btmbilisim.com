import { ChevronDown } from "lucide-react";
import { Container } from "./Container";
import { MotionReveal } from "./MotionReveal";
import { SectionHeading } from "./SectionHeading";

export type FaqItem = { question: string; answer: string };

export function FaqSection({
  items,
  tone = "light",
}: {
  items: FaqItem[];
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className={isDark ? "cv-auto bg-navy-950 py-20 md:py-28" : "cv-auto bg-tint-50 py-20 md:py-28"}>
      <Container className="lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Sıkça Sorulan Sorular"
            title="Merak edilenler"
            tone={tone}
          />
        </div>
        {/* One accordion list: hairline-separated rows inside a single card. */}
        <MotionReveal className="mt-10 lg:mt-0">
          <div className={isDark ? "card-dark divide-y divide-white/10" : "card divide-y divide-line"}>
            {items.map((item) => (
              <details key={item.question} className="group">
                <summary
                  className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 rounded-card px-5 py-4 font-display text-[1.0625rem] font-semibold leading-snug marker:content-none md:px-7 md:py-5 [&::-webkit-details-marker]:hidden ${
                    isDark ? "text-white hover:text-gold-300" : "text-navy-950 hover:text-gold-700"
                  }`}
                >
                  {item.question}
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isDark ? "bg-white/[0.06] text-gold-300" : "bg-gold-100 text-gold-600"
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" strokeWidth={2} />
                  </span>
                </summary>
                <p
                  className={`px-5 pb-6 text-[0.9375rem] leading-[1.7] md:px-7 md:pr-20 ${
                    isDark ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </MotionReveal>
      </Container>
      <script
        type="application/ld+json"
        // See app/(site)/layout.tsx for why "<" is escaped here.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
