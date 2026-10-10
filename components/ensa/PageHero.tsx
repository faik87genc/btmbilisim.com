import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";
import { JsonLd } from "@/components/site/Parts";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import type { Crumb } from "@/lib/siteView";

/**
 * Dark page header used by every content route: breadcrumb trail (+ its
 * BreadcrumbList schema), optional eyebrow, the page <h1> and a lead line.
 * `children` renders under the lead (meta row, tag chips, ...).
 * `compact` shortens the vertical padding (contact page: the form moves up);
 * `overlap` leaves extra room below for a panel pulled up over the hero.
 *
 * Identity v2: ink-950 ground (one soft brand-blue light top right) and a faint
 * engineering grid fading out from that corner — no ornament.
 */
export function PageHero({
  title,
  lead,
  eyebrow,
  crumbs,
  children,
  compact = false,
  overlap = false,
}: {
  title: string;
  lead?: string | null;
  eyebrow?: string;
  /** Trail after "Ana Sayfa"; the last entry is the current page. */
  crumbs?: Crumb[];
  children?: React.ReactNode;
  compact?: boolean;
  overlap?: boolean;
}) {
  const top = compact ? "pt-12 md:pt-16" : "pt-14 md:pt-20";
  const bottom = overlap ? "pb-28 md:pb-36" : compact ? "pb-12 md:pb-16" : "pb-14 md:pb-20";
  return (
    <section className={`relative overflow-hidden bg-brand-gradient ${top} ${bottom}`}>
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="max-w-3xl">
          {crumbs && crumbs.length > 0 && (
            <>
              <JsonLd data={breadcrumbJsonLd(crumbs)} />
              <nav aria-label="Sayfa yolu" className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-300">
                <Link href="/" className="text-gold-300 hover:text-white">
                  Ana Sayfa
                </Link>
                {crumbs.map((c, i) => (
                  <span key={i} className="contents">
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300/60" aria-hidden="true" />
                    {i === crumbs.length - 1 || !c.href ? (
                      <span className="text-slate-300" aria-current={i === crumbs.length - 1 ? "page" : undefined}>
                        {c.text}
                      </span>
                    ) : (
                      <Link href={c.href} className="text-gold-300 hover:text-white">
                        {c.text}
                      </Link>
                    )}
                  </span>
                ))}
              </nav>
            </>
          )}
          {eyebrow && <p className="eyebrow eyebrow-dark mb-4">{eyebrow}</p>}
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-white md:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-pretty text-lg leading-[1.65] text-slate-300">{lead}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
