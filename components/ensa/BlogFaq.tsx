import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/markdownStructure";
import { MarkdownRenderer } from "./MarkdownRenderer";

/**
 * FAQ block for the end of a blog post. Renders accessible <details> entries
 * and emits FAQPage structured data (eligible for the "People also ask" style
 * rich result). Answers may contain Markdown.
 */
export function BlogFaq({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Plain-text answer for the schema — strip the lightest Markdown.
        text: item.answer
          .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
          .replace(/[*_`>#]/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      },
    })),
  };

  return (
    <section className="mt-14 border-t border-navy-950/10 pt-10">
      <h2 className="font-display text-2xl font-semibold text-ink-900">
        Sıkça Sorulan Sorular
      </h2>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-card border border-navy-950/10 bg-white p-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink-900 marker:content-none">
              {item.question}
              <ChevronDown
                className="h-4 w-4 shrink-0 text-gold-600 transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="mt-3 text-sm leading-relaxed text-slate-600 [&_p]:mb-2 [&_p:last-child]:mb-0">
              <MarkdownRenderer content={item.answer} />
            </div>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
