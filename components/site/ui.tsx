import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import type { Page } from "@/lib/db/schema";
import { JsonLd } from "@/components/site/Parts";
import { Container } from "@/components/ensa/Container";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import { pageHref } from "@/lib/pages";
import { site } from "@/lib/site";
import { formatDateTr, readingTimeMinutes, type Crumb } from "@/lib/siteView";

// Shared pieces of the content pages on identity v2 (docs/kurumsal-kimlik-v2.md):
// breadcrumb trail, light page header, post card, tag filter row and the
// blue closing CTA band. Classes such as .card-v2 live in app/(site)/pages.css.

/** Visible trail + its BreadcrumbList schema (same output as ensa PageHero). */
export function Crumbs({ crumbs, tone = "light" }: { crumbs: Crumb[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const link = dark ? "text-slate-300 hover:text-white" : "text-slate-500 hover:text-gold-700";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="Sayfa yolu" className="text-[13px] leading-5">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <li>
            <Link href="/" className={`rounded-sm transition-colors ${link}`}>
              Ana Sayfa
            </Link>
          </li>
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={i} className="flex min-w-0 items-center gap-1.5">
                <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${dark ? "text-slate-500" : "text-slate-400"}`} aria-hidden="true" />
                {last || !c.href ? (
                  <span
                    className={`line-clamp-1 ${dark ? "text-white" : "text-ink-900"} ${last ? "font-medium" : ""}`}
                    aria-current={last ? "page" : undefined}
                  >
                    {c.text}
                  </span>
                ) : (
                  <Link href={c.href} className={`rounded-sm transition-colors ${link}`}>
                    {c.text}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/**
 * Light page header (resources hub, tag archives): trail, eyebrow, the page
 * <h1> and a lead, on the one tinted surface. `children` sit under the lead.
 */
export function LightHero({
  title,
  eyebrow,
  lead,
  crumbs,
  children,
}: {
  title: string;
  eyebrow?: string;
  lead?: string | null;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 bg-paper-50 pb-12 pt-8 md:pb-16 md:pt-10">
      <Container>
        <Crumbs crumbs={crumbs} />
        <div className="mt-10 max-w-3xl md:mt-14">
          {eyebrow && <p className="eyebrow-v2">{eyebrow}</p>}
          <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] text-navy-950 md:text-[3.5rem]">
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-500">{lead}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}

/** Section heading on light grounds: eyebrow, H2 (40→28) and an optional lead. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <p className={`eyebrow-v2 ${dark ? "eyebrow-v2-dark" : ""}`}>{eyebrow}</p>}
      <h2
        id={id}
        className={`mt-3 text-balance font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] md:text-[2.5rem] ${
          dark ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {lead && <p className={`mt-4 text-pretty text-base leading-relaxed md:text-[1.0625rem] ${dark ? "text-slate-300" : "text-slate-500"}`}>{lead}</p>}
    </div>
  );
}

/** Ink + grid cover for posts without an image (decorative; title is in the card). */
function CoverFallback({ label }: { label?: string }) {
  return (
    <div className="cover-pattern flex h-full w-full items-end p-5" aria-hidden="true">
      <span className="font-display text-sm font-semibold tracking-tight text-white/85">BTM Bilişim</span>
      {label && <span className="ml-2 text-xs font-medium uppercase tracking-[0.12em] text-gold-300">{label}</span>}
    </div>
  );
}

/**
 * Resource card: 16:10 cover (photo tone, or the branded pattern), tag chip +
 * date, title, read time and "Yazıyı oku". The title link stretches over the
 * card, so the card is one target and its accessible name is the title.
 */
export function PostCard({
  post,
  priority = false,
  headingLevel = 3,
}: {
  post: Pick<Page, "id" | "slug" | "kind" | "title" | "excerpt" | "coverImageUrl" | "tags" | "publishedAt" | "createdAt" | "content">;
  priority?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const tag = post.tags[0];
  const date = post.publishedAt ?? post.createdAt;
  const minutes = readingTimeMinutes(post.content);
  return (
    <article className="card-v2 card-v2-link group flex h-full flex-col overflow-hidden">
      <div className="photo-tone relative aspect-[16/10] w-full shrink-0 rounded-none rounded-t-[13px]">
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt=""
            fill
            sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 50vw, 400px"
            priority={priority}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <CoverFallback label={tag} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {tag && <span className="chip-v2">{tag}</span>}
          <time dateTime={date.toISOString()} className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
            {formatDateTr(date)}
          </time>
        </div>
        <Heading className="mt-4 line-clamp-3 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-navy-950">
          <Link href={pageHref(post)} className="card-v2-stretch transition-colors group-hover:text-gold-700">
            {post.title}
          </Link>
        </Heading>
        {post.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-gold-700" aria-hidden="true">
            Yazıyı oku
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500">{minutes} dk okuma</span>
        </div>
      </div>
    </article>
  );
}

/** Responsive 1/2/3 column grid of PostCards. */
export function PostGrid({ posts, priorityCount = 0 }: { posts: Parameters<typeof PostCard>[0]["post"][]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <li key={p.id} className="h-full">
          <PostCard post={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Category filter row: real links to the tag archives (crawlable, no
 * client-side hiding). "Tümü" is the blog index; `current` marks the active one.
 */
export function TagFilters({
  tags,
  current,
  allIsPage = true,
}: {
  tags: { tag: string; slug: string; count: number }[];
  /** Active tag slug, or null on the blog index itself. */
  current: string | null;
  /** False on /blog/sayfa-N/: "Tümü" is the active filter but not this page. */
  allIsPage?: boolean;
}) {
  return (
    <nav aria-label="Konuya göre filtrele" className="mt-10">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Konuya göre</p>
      <ul className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:thin] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        <li className="shrink-0">
          <Link
            href="/blog/"
            className="filter-v2"
            data-active={current === null ? "" : undefined}
            aria-current={current === null && allIsPage ? "page" : undefined}
          >
            Tümü
          </Link>
        </li>
        {tags.map((t) => (
          <li key={t.slug} className="shrink-0">
            <Link href={`/blog/etiket/${t.slug}/`} className="filter-v2" data-active={current === t.slug ? "" : undefined} aria-current={current === t.slug ? "page" : undefined}>
              {t.tag}
              <span className="filter-count">
                <span className="visually-hidden"> (</span>
                {t.count}
                <span className="visually-hidden"> yazı)</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Closing band in the one brand blue: primary "Ücretsiz keşif" (white on blue)
 * plus a secondary link, and the direct line underneath. data-contact-cta
 * hides the footer's duplicate contact strip.
 */
export function CtaBand({
  title,
  lead,
  secondary,
}: {
  title: string;
  lead: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section data-contact-cta="" className="bg-white py-16 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[20px] bg-gold-600 px-6 py-10 text-white md:px-12 md:py-14 [&_:focus-visible]:outline-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(90deg,transparent,black)]"
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div className="max-w-2xl">
              <h2 className="text-balance font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] md:text-[2.25rem]">
                {title}
              </h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-white/90 md:text-[1.0625rem]">{lead}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/#teklif"
                className="press inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-white px-6 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-100"
              >
                Ücretsiz keşif isteyin <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="press inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-white/50 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
          <p className="relative mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/20 pt-5 text-sm text-white/90">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Doğrudan uzman ekibe ulaşın:
            <a href={site.phone.href} className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
              {site.phone.display}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
