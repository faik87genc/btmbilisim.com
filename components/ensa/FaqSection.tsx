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
    <section className={isDark ? "bg-navy-950 py-20 md:py-24" : "bg-paper-50 py-20 md:py-24"}>
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Sıkça Sorulan Sorular"
          title="Merak edilenler"
          tone={tone}
        />
        <div className="mt-10 space-y-3">
          {items.map((item) => (
            <MotionReveal key={item.question}>
              <details
                className={`group rounded-sm border p-5 ${
                  isDark
                    ? "border-paper-50/10 bg-paper-50/5"
                    : "border-navy-950/10 bg-white"
                }`}
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold marker:content-none ${
                    isDark ? "text-paper-50" : "text-ink-900"
                  }`}
                >
                  {item.question}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-gold-500 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isDark ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {item.answer}
                </p>
              </details>
            </MotionReveal>
          ))}
        </div>
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
