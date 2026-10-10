import Link from "next/link";
import { MapPin, Quote } from "lucide-react";
import type { CaseStory } from "@/lib/data/trust";
import { navAreas } from "@/lib/navigation";

// One success story (lib/data/trust.ts → liveCaseStories): customer, the
// approved headline, challenge → solution → outcome, an optional quote and the
// services delivered (linked to their pages). The right column shows the
// customer-approved photo (photo tone), or the ink + grid brand pattern —
// never a mock screenshot.

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
    <article className="card-v2 grid overflow-hidden md:grid-cols-[1.4fr_1fr]">
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

        <Heading className="mt-6 text-balance font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-navy-950">
          {story.headline}
        </Heading>

        <dl className="mt-6 space-y-4">
          {steps.map((s) => (
            <div key={s.label} className="grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-700 sm:pt-1">{s.label}</dt>
              <dd className="text-sm leading-relaxed text-slate-600">{s.text}</dd>
            </div>
          ))}
        </dl>

        {quote && (
          <figure className="mt-7 rounded-r-[10px] border-l-[3px] border-gold-600 bg-paper-50 py-4 pl-4 pr-5">
            <Quote className="h-5 w-5 text-gold-600/50" aria-hidden="true" />
            <blockquote className="mt-2 text-sm leading-relaxed text-ink-900">{quote.text}</blockquote>
            <figcaption className="mt-2 text-xs text-slate-500">
              <span className="font-semibold text-ink-900">{quote.name}</span>, {quote.role}
            </figcaption>
          </figure>
        )}

        {services.length > 0 && (
          <div className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Verilen hizmetler</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    className="filter-v2 min-h-9 text-[13px]"
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
        <span className="photo-tone block h-56 rounded-none md:h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} loading="lazy" />
        </span>
      ) : (
        <div className="cover-pattern hidden md:block" aria-hidden="true" />
      )}
    </article>
  );
}
