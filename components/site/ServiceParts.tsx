import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { IconTile } from "@/components/ensa/IconTile";
import { WhatsAppIcon } from "@/components/ensa/WhatsAppIcon";
import { SiteMarkdown } from "@/components/site/SiteMarkdown";
import type { CardItem } from "@/components/site/serviceContent";
import { serviceWhatsAppHref } from "@/lib/contact";
import { site } from "@/lib/site";
import type { Crumb } from "@/lib/siteView";

// Building blocks of the service and category pages on identity v2: an ink
// hero with a fine grid, scope cards, numbered process steps and link cards.

const H2 =
  "scroll-mt-28 text-balance font-display text-[1.4375rem] font-bold leading-[1.2] tracking-[-0.02em] text-navy-950 sm:text-[1.75rem]";

/** Visual trail on the light hero; the page emits its own BreadcrumbList. */
function HeroTrail({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="text-[13px] leading-5">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <li>
          <Link href="/" className="rounded-sm text-slate-500 transition-colors hover:text-gold-700">
            Ana Sayfa
          </Link>
        </li>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              {last || !c.href ? (
                <span className="font-medium text-ink-900" aria-current={last ? "page" : undefined}>
                  {c.text}
                </span>
              ) : (
                <Link href={c.href} className="rounded-sm text-slate-500 transition-colors hover:text-gold-700">
                  {c.text}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Primary "Ücretsiz keşif" (brand blue), WhatsApp with the service named,
 * and the direct line from md up (phones have the fixed call bar). */
export function HeroActions({ service }: { service: string }) {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/#teklif"
          className="press inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-gold-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-700"
        >
          Ücretsiz keşif isteyin <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href={serviceWhatsAppHref(service)}
          target="_blank"
          rel="noopener noreferrer"
          className="press inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-slate-400 bg-white px-6 text-sm font-semibold text-navy-950 transition-colors hover:border-gold-600 hover:text-gold-700"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp&apos;tan yazın<span className="visually-hidden"> (yeni sekmede açılır)</span>
        </a>
        <a
          href={site.phone.href}
          className="press hidden h-12 items-center justify-center gap-2 rounded-[10px] px-3 text-sm font-semibold tabular-nums text-navy-950 transition-colors hover:text-gold-700 md:inline-flex"
        >
          <Phone className="h-4 w-4 text-gold-600" aria-hidden="true" /> {site.phone.display}
        </a>
      </div>
      <p className="mt-4 text-sm text-slate-500">İlk görüşme ve keşif ücretsizdir; doğrudan uzman ekibe ulaşırsınız.</p>
    </div>
  );
}

/** Light page header (identity v2.1: warm paper + soft brand glows): trail,
 * eyebrow, the page <h1>, lead, actions | the ink side panel. */
export function InkHero({
  crumbs,
  eyebrow,
  title,
  lead,
  service,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  service: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-50 pb-16 pt-8 md:pb-24 md:pt-10">
      <div className="bg-blueprint-light pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <HeroTrail crumbs={crumbs} />
        <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
          <div className="min-w-0">
            <p className="eyebrow-v2">{eyebrow}</p>
            <h1 className="mt-3 text-balance font-display text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.025em] text-navy-950 md:text-[2.75rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-500">{lead}</p>
            <div className="mt-8">
              <HeroActions service={service} />
            </div>
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

/** Ink side panel (gradient card on the light hero): a short check list (scope summary / services in the area). */
export function HeroPanel({
  label,
  items,
  footer,
}: {
  label: string;
  items: { text: string; href?: string }[];
  footer?: React.ReactNode;
}) {
  return (
    <div className="card-v2-dark bg-ink-gradient p-6 shadow-lift md:p-7">
      <p className="eyebrow-v2 eyebrow-v2-dark">{label}</p>
      <ul className="mt-4 divide-y divide-white/10">
        {items.map((it) => (
          <li key={it.text}>
            {it.href ? (
              <Link href={it.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm text-slate-200 transition-colors hover:text-white">
                {it.text}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-300 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ) : (
              <span className="flex items-start gap-3 py-2.5 text-sm leading-relaxed text-slate-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                {it.text}
              </span>
            )}
          </li>
        ))}
      </ul>
      {footer && <div className="mt-4 border-t border-white/10 pt-4 text-xs text-slate-300">{footer}</div>}
    </div>
  );
}

function MdInline({ md }: { md: string }) {
  return (
    <div className="prose-card">
      <SiteMarkdown content={md} />
    </div>
  );
}

/** The scope section of a service page as cards (heading text and order kept). */
export function ScopeCards({ id, heading, lead, items }: { id: string; heading: string; lead: string; items: CardItem[] }) {
  const titled = items.every((i) => i.title);
  return (
    <section aria-labelledby={id} className="mt-14 first:mt-0">
      <p className="eyebrow-v2">Hizmet kapsamı</p>
      <h2 id={id} className={`mt-2 ${H2}`}>
        {heading}
      </h2>
      {lead && (
        <div className="markdown-content prose-v2 mt-4">
          <SiteMarkdown content={lead} />
        </div>
      )}
      <ul className={`mt-7 grid grid-cols-1 gap-4 ${titled ? "md:grid-cols-2" : "sm:grid-cols-2"}`}>
        {items.map((it, i) => (
          <li key={i} className={`card-v2 ${titled ? "p-6" : "flex items-start gap-3.5 p-5"}`}>
            {titled ? (
              <>
                <div className="flex items-center gap-3.5">
                  <span className="step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-navy-950">{it.title}</h3>
                </div>
                {it.body && (
                  <div className="mt-3">
                    <MdInline md={it.body} />
                  </div>
                )}
              </>
            ) : (
              <>
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-gold-100 text-gold-600" aria-hidden="true">
                  <Check className="h-4 w-4" strokeWidth={2} />
                </span>
                <div className="min-w-0 text-[0.9375rem] leading-relaxed text-ink-900 [&_.prose-card]:text-ink-900">
                  <MdInline md={it.body} />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A numbered process as steps with a connecting rule. */
export function ProcessSteps({
  id,
  eyebrow = "Nasıl çalışıyoruz",
  heading,
  lead,
  items,
}: {
  id: string;
  eyebrow?: string;
  heading: string;
  lead?: string;
  items: CardItem[];
}) {
  return (
    <section aria-labelledby={id} className="mt-14 first:mt-0">
      <p className="eyebrow-v2">{eyebrow}</p>
      <h2 id={id} className={`mt-2 ${H2}`}>
        {heading}
      </h2>
      {lead && (
        <div className="markdown-content prose-v2 mt-4">
          <SiteMarkdown content={lead} />
        </div>
      )}
      <ol className="mt-8">
        {items.map((it, i) => (
          <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
            {i < items.length - 1 && <span className="absolute bottom-0 left-[1.375rem] top-12 w-px bg-slate-200" aria-hidden="true" />}
            <span className="step-num relative" aria-hidden="true">
              {i + 1}
            </span>
            <div className="min-w-0 pt-2">
              {it.title && <h3 className="font-display text-[1.0625rem] font-semibold leading-snug text-navy-950">{it.title}</h3>}
              {it.body && (
                <div className={it.title ? "mt-1.5" : ""}>
                  <MdInline md={it.body} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Link card with an icon tile (related services, service areas). */
export function LinkCard({
  href,
  icon,
  title,
  text,
  cta = "İnceleyin",
  headingLevel = 3,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  text?: string;
  cta?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="card-v2 card-v2-link group flex h-full flex-col p-6 md:p-7">
      <IconTile icon={icon} />
      <Heading className="mt-5 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-navy-950">
        <Link href={href} className="card-v2-stretch transition-colors group-hover:text-gold-700">
          {title}
        </Link>
      </Heading>
      {text && <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{text}</p>}
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700" aria-hidden="true">
        {cta} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </div>
  );
}

/** Four steps every engagement follows (category pages). Same wording as the
 * process sections of the service pages — nothing promised beyond them. */
export const ENGAGEMENT_STEPS: CardItem[] = [
  { title: "Ücretsiz ön görüşme", body: "İhtiyacınızı ve önceliklerinizi dinler, kapsamı ve takvimi netleştiririz." },
  { title: "Keşif ve analiz", body: "Altyapınızı yerinde ve uzaktan inceler, riskleri ve eksikleri raporlarız." },
  { title: "Uygulama", body: "Kurulum, geçiş ve yapılandırmayı kendi ekibimizle, minimum kesintiyle yaparız." },
  { title: "İzleme ve destek", body: "Düzenli bakım, raporlama ve 7/24 teknik destekle yanınızda oluruz." },
];

/** Engagement steps as a horizontal row of cards (full-width bands). */
export function StepRow({ items }: { items: CardItem[] }) {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <li key={i} className="card-v2 p-6">
          <span className="step-num" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 font-display text-[1.0625rem] font-semibold leading-snug text-navy-950">
            <span className="visually-hidden">{i + 1}. adım: </span>
            {it.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{it.body}</p>
        </li>
      ))}
    </ol>
  );
}
