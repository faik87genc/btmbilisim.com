import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";
import { GlobeBands } from "./GlobeBands";
import { JsonLd } from "@/components/site/Parts";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import type { Crumb } from "@/lib/siteView";

/**
 * Dark page header used by every content route: breadcrumb trail (+ its
 * BreadcrumbList schema), optional eyebrow, the page <h1> and a lead line.
 * `children` renders under the lead (meta row, tag chips, ...).
 */
export function PageHero({
  title,
  lead,
  eyebrow,
  crumbs,
  children,
}: {
  title: string;
  lead?: string | null;
  eyebrow?: string;
  /** Trail after "Ana Sayfa"; the last entry is the current page. */
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 md:py-24">
      <GlobeBands className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] text-gold-500/15" />
      <Container className="relative">
        <div className="max-w-3xl">
        {crumbs && crumbs.length > 0 && (
          <>
            <JsonLd data={breadcrumbJsonLd(crumbs)} />
            <nav
              aria-label="Sayfa yolu"
              className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gold-300"
            >
              <Link href="/" className="hover:text-gold-100">
                Ana Sayfa
              </Link>
              {crumbs.map((c, i) => (
                <span key={i} className="contents">
                  <ChevronRight className="h-3 w-3 text-gold-300/50" aria-hidden="true" />
                  {i === crumbs.length - 1 || !c.href ? (
                    <span className="text-slate-300" aria-current={i === crumbs.length - 1 ? "page" : undefined}>
                      {c.text}
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-gold-100">
                      {c.text}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </>
        )}
        {eyebrow && (
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-300">
            <span className="h-px w-8 bg-gold-300" />
            {eyebrow}
          </div>
        )}
        <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-paper-50 md:text-5xl">{title}</h1>
        {lead && <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">{lead}</p>}
        {children}
        </div>
      </Container>
    </section>
  );
}
