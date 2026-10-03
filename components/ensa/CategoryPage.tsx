import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlobeBands } from "./GlobeBands";
import { Container } from "./Container";
import { MotionReveal } from "./MotionReveal";
import { SectionHeading } from "./SectionHeading";
import { FaqSection } from "./FaqSection";
import { ServiceCategory } from "@/lib/services";
import { servicePagesContent } from "@/lib/servicePages";
import { ContactCta } from "./ContactCta";
import { ServiceContactButtons } from "./ServiceContactButtons";

export function CategoryPage({ category, children }: { category: ServiceCategory; children?: React.ReactNode }) {
  // A sub-service card links to its detail page when lib/servicePages carries
  // editorial content for it.
  const slugByKey = new Map<string, string>();
  for (const entry of servicePagesContent) {
    if (entry.categorySlug === category.slug) {
      slugByKey.set(entry.serviceKey, entry.slug);
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <GlobeBands className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] text-gold-500/15" />
        <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-14">
          <div>
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-300">
            <span className="h-px w-8 bg-gold-300" />
            {category.eyebrow}
          </div>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-paper-50 md:text-5xl">
            {category.title}
          </h1>
          <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
            {category.intro}
          </p>
          <div className="mt-8">
            <ServiceContactButtons service={category.title} />
          </div>
          </div>

          <nav aria-label={`${category.shortTitle} hizmetleri`} className="rounded-card bg-white/5 p-6 ring-1 ring-white/15 md:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-300">Bu alandaki hizmetler</p>
            <ul className="mt-4 space-y-2.5">
              {category.services.map((s) => {
                const slug = slugByKey.get(s.key);
                return (
                  <li key={s.key}>
                    {slug ? (
                      <Link href={`/${category.slug}/${slug}/`} className="group flex items-center justify-between gap-3 text-sm text-slate-200 hover:text-white">
                        {s.name}
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gold-300" aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className="text-sm text-slate-200">{s.name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Alt Hizmetler"
            title="Bu alandaki uzmanlık kalemlerimiz."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service, i) => {
              const slug = slugByKey.get(service.key);
              const number = String(i + 1).padStart(2, "0");
              const cardClass =
                "group relative flex h-full flex-col overflow-hidden rounded-card border border-navy-950/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-lift";
              const body = (
                <>
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-navy-950/30">{number}</span>
                    {slug && (
                      <ArrowUpRight className="h-4 w-4 text-gold-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                  {slug && (
                    <span className="mt-5 inline-block text-xs font-medium uppercase tracking-wider text-gold-800">
                      İncele ve teklif al
                    </span>
                  )}
                </>
              );

              return (
                <MotionReveal key={service.key} delay={(i % 3) * 0.06} className={cardClass}>
                  {slug ? (
                    <Link href={`/${category.slug}/${slug}/`} className="flex h-full flex-col">
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </MotionReveal>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-card bg-navy-950 p-6 md:flex-row md:items-center md:p-7">
            <div>
              <p className="font-display text-xl font-semibold text-white">Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?</p>
              <p className="mt-1 text-sm text-slate-300">Durumunuzu anlatın; doğru çözümü birlikte seçelim.</p>
            </div>
            <ServiceContactButtons service={category.title} note={false} />
          </div>
        </Container>
      </section>

      {children}

      <FaqSection items={category.faq} />

      <ContactCta title="Bu alanda ihtiyacınızı konuşalım." />
    </>
  );
}
