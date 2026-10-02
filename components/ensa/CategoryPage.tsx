import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlobeBands } from "./GlobeBands";
import { Container } from "./Container";
import { MotionReveal } from "./MotionReveal";
import { SectionHeading } from "./SectionHeading";
import { FaqSection } from "./FaqSection";
import { Button } from "./Button";
import { ServiceCategory } from "@/lib/services";
import { servicePagesContent } from "@/lib/servicePages";

export function CategoryPage({ category }: { category: ServiceCategory }) {
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
        <GlobeBands className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] text-gold-500/15" />
        <Container className="relative max-w-3xl">
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
                "group relative flex h-full flex-col overflow-hidden rounded-sm border border-navy-950/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_24px_48px_-28px_rgba(10,18,32,0.3)]";
              const body = (
                <>
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-navy-950/30">{number}</span>
                    {slug && (
                      <ArrowUpRight className="h-4 w-4 text-gold-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
                      Detaylı bilgi
                    </span>
                  )}
                </>
              );

              return (
                <MotionReveal key={service.key} delay={(i % 3) * 0.06} className={cardClass}>
                  {slug ? (
                    <Link href={`/${category.slug}/${slug}`} className="flex h-full flex-col">
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </MotionReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <FaqSection items={category.faq} />

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="Bu alanda ihtiyacınızı konuşalım."
            description="Ekibimiz, uygunluk durumunuzu ve süreç adımlarını ilk görüşmede netleştirir."
          />
          <div className="mt-8 flex justify-center">
            <Button href="/iletisim/" variant="primary">
              Görüşme Talep Edin
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
