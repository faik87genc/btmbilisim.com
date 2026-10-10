import Link from "next/link";
import { MapPin, Quote } from "lucide-react";
import type { CaseStory } from "@/lib/data/trust";
import { navAreas } from "@/lib/navigation";

// One success story (lib/data/trust.ts → liveCaseStories): customer, the
// approved headline, challenge → solution → outcome, an optional quote and the
// services delivered (linked to their pages). The right column shows the
// customer-approved photo, or a neutral brand pattern — never a mock screenshot.

/** Service key → label + detail page, from the same data as the menus. */
const serviceByKey = new Map(navAreas.flatMap((a) => a.services.map((s) => [s.key, s] as const)));

export function CaseStoryCard({ story, headingLevel = 3 }: { story: CaseStory; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const quote = story.quote?.consent.trim() ? story.quote : null;
  const image = story.image?.consent.trim() ? story.image : null;
  const services = story.services.map((key) => serviceByKey.get(key)).filter((s) => s !== undefined);
  const steps = [
    { label: "Zorluk", text: story.challenge },
    { label: "Çözüm", text: story.solution },
    { label: "Sonuç", text: story.outcome },
  ].filter((s) => s.text?.trim());

  return (
    <article className="grid overflow-hidden rounded-card border border-navy-950/10 bg-white shadow-card md:grid-cols-[1.4fr_1fr]">
      <div className="p-6 md:p-9">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={story.logo} alt="" loading="lazy" className="h-10 w-auto max-w-[140px] object-contain" />
          <div className="min-w-0">
            <p className="font-semibold text-ink-900">{story.customer}</p>
            {(story.sector || story.city || story.year) && (
              <p className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                {[story.sector, story.year].filter(Boolean).join(" · ")}
                {story.city && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {story.city}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        <Heading className="mt-6 text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-navy-800">
          {story.headline}
        </Heading>

        <dl className="mt-6 space-y-4">
          {steps.map((s) => (
            <div key={s.label} className="grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-4">
              <dt className="font-mono text-xs uppercase tracking-[0.16em] text-gold-800 sm:pt-1">{s.label}</dt>
              <dd className="text-sm leading-relaxed text-slate-600">{s.text}</dd>
            </div>
          ))}
        </dl>

        {quote && (
          <figure className="mt-7 border-l-2 border-gold-500 pl-4">
            <Quote className="h-5 w-5 text-navy-800/40" aria-hidden="true" />
            <blockquote className="mt-2 text-sm italic leading-relaxed text-ink-900">{quote.text}</blockquote>
            <figcaption className="mt-2 text-xs text-slate-500">
              <span className="font-semibold text-ink-900">{quote.name}</span>, {quote.role}
            </figcaption>
          </figure>
        )}

        {services.length > 0 && (
          <div className="mt-7">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500">Verilen hizmetler</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    className="inline-flex rounded-full border border-navy-950/15 px-3 py-1 text-xs font-medium text-navy-800 transition-colors hover:border-gold-500 hover:bg-paper-50"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.src} alt={image.alt} loading="lazy" className="h-56 w-full object-cover md:h-full" />
      ) : (
        <div className="relative hidden bg-brand-gradient md:block" aria-hidden="true">
          <div className="bg-dots absolute inset-0" />
        </div>
      )}
    </article>
  );
}
