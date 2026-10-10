import Link from "next/link";
import { ArrowRight, ChevronDown, Clock, Mail, MessageCircle, Phone, RefreshCw, Tag } from "lucide-react";
import type { Page } from "@/lib/db/schema";
import { SiteMarkdown } from "@/components/site/SiteMarkdown";
import { JsonLd } from "@/components/site/Parts";
import { Crumbs, CtaBand, LightHero, PostGrid, SectionHead } from "@/components/site/ui";
import { serviceForPost } from "@/components/site/serviceMatch";
import { Container } from "@/components/ensa/Container";
import { AboutLayout } from "@/components/btm/AboutLayout";
import { getPublishedPages, pageHref, postLikePages, tagSlug } from "@/lib/pages";
import { site } from "@/lib/site";
import { IMG_SIZES, imageInfo } from "@/lib/imageVariants";
import { extractFaq, extractHeadings, stripFaqSection } from "@/lib/markdownStructure";
import { articleJsonLd, faqPageJsonLd, organizationJsonLd, pageDates, serviceJsonLd } from "@/lib/structuredData";
import {
  breadcrumbsFor,
  buildNestedToc,
  faqPairs,
  formatDateTr,
  isPost,
  postTag,
  readingTimeMinutes,
  type TocEntry,
} from "@/lib/siteView";

// One page of content (DB row, or the imported WordPress copy) on identity v2.
// Posts: light two-column hero (title, excerpt, meta | cover), a ~72ch reading
// column with a sticky table of contents, the FAQ as cards, related posts, the
// blue CTA band and the latest posts. Core pages (legal texts, ...): light
// header + one reading column. The about page keeps its own frame (AboutLayout).

function TocList({ toc }: { toc: TocEntry[] }) {
  return (
    <ol className="toc-v2 space-y-0.5">
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`}>{t.text}</a>
          {t.children.length > 0 && (
            <ol className="toc-sub space-y-0.5">
              {t.children.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>{c.text}</a>
                </li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ol>
  );
}

// The post cover is the LCP element: eager + high fetch priority, with
// responsive variants so mobile downloads the 640w/960w file, not the original.
function CoverImage({ src, alt }: { src: string; alt: string }) {
  const info = imageInfo(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={info?.src ?? src}
      srcSet={info?.srcSet}
      sizes={info?.srcSet ? IMG_SIZES.cover : undefined}
      alt={alt}
      width={info?.width ?? 1200}
      height={info?.height ?? 750}
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
  );
}

function ContactCard() {
  return (
    <div className="card-v2 p-6">
      <p className="eyebrow-v2">Hemen başlayalım</p>
      <p className="mt-2 font-display text-lg font-semibold leading-snug text-navy-950">Ücretsiz keşif görüşmesi</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">İhtiyacınızı anlatın; ekibimiz durumunuzu ilk görüşmede netleştirsin.</p>
      <Link
        href="/#teklif"
        className="press mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-gold-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-gold-700"
      >
        Teklif alın <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <ul className="mt-5 space-y-2.5 border-t border-slate-200 pt-4 text-sm">
        <li>
          <a href={site.phone.href} className="flex items-center gap-2.5 text-ink-900 transition-colors hover:text-gold-700">
            <Phone className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
            {site.phone.display}
          </a>
        </li>
        <li>
          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-ink-900 transition-colors hover:text-gold-700"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
            WhatsApp<span className="visually-hidden"> (yeni sekmede açılır)</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 break-all text-ink-900 transition-colors hover:text-gold-700">
            <Mail className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
            {site.email}
          </a>
        </li>
      </ul>
    </div>
  );
}

export function ArticleView({ page, related, draftNote }: { page: Page; related: Page[]; draftNote?: string | null }) {
  const post = isPost(page);
  const description = page.metaDescription || page.excerpt;
  const faqs = post ? faqPairs(page.content) : [];
  const service = post ? null : serviceJsonLd(pageHref(page));
  const crumbs = breadcrumbsFor(page);

  return (
    <>
      {!draftNote && <JsonLd data={organizationJsonLd()} />}
      {!draftNote && post && <JsonLd data={articleJsonLd(page, description)} />}
      {!draftNote && service && <JsonLd data={service} />}
      {!draftNote && faqs.length > 0 && <JsonLd data={faqPageJsonLd(faqs)} />}
      {draftNote && <div className="bg-gold-600 px-4 py-2 text-center text-sm font-medium text-white">{draftNote}</div>}
      {post ? <PostBody page={page} related={related} crumbs={crumbs} /> : <CoreBody page={page} crumbs={crumbs} />}
    </>
  );
}

const FAQ_H2 = /s[ıi]k[çc]a\s+sorulan|^sss$|\bf\.?a\.?q\.?\b/i;

async function PostBody({ page, related, crumbs }: { page: Page; related: Page[]; crumbs: ReturnType<typeof breadcrumbsFor> }) {
  const toc = buildNestedToc(page.content);
  const { published, modified } = pageDates(page);
  const updated = modified.getTime() > published.getTime();
  const minutes = readingTimeMinutes(page.content);
  const category = postTag(page);

  // A "Sıkça sorulan sorular" section (H2 + H3 questions) is shown as cards
  // under the body; ids come from the full document so the TOC still links.
  const faqItems = extractFaq(page.content);
  const headings = extractHeadings(page.content);
  const faqHeading = faqItems.length > 0 ? headings.find((h) => h.level === 2 && FAQ_H2.test(h.text)) : undefined;
  const body = faqHeading ? stripFaqSection(page.content) : page.content;
  const faqIds = new Map<string, string>();
  if (faqHeading) {
    const after = headings.slice(headings.indexOf(faqHeading) + 1);
    for (const h of after) if (h.level === 3 && !faqIds.has(h.text)) faqIds.set(h.text, h.id);
  }

  const relatedIds = new Set([page.id, ...related.map((r) => r.id)]);
  const latest = postLikePages(await getPublishedPages())
    .filter((p) => !relatedIds.has(p.id))
    .slice(0, 3);
  const serviceLink = serviceForPost(page);

  return (
    <>
      <section className="border-b border-slate-200 bg-paper-50 pb-12 pt-8 md:pb-16 md:pt-10">
        <Container>
          <Crumbs crumbs={[{ text: "Blog", href: "/blog/" }, ...crumbs]} />
          <div className="mt-10 grid items-center gap-10 md:mt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <div className="min-w-0">
              <Link href={crumbs[0]?.href ?? "/blog/"} className="chip-v2 transition-colors hover:bg-gold-100/70 hover:text-gold-800">
                {category}
              </Link>
              <h1 className="mt-4 text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] text-navy-950 sm:text-4xl lg:text-[2.625rem]">
                {page.title}
              </h1>
              {page.excerpt && page.excerpt !== page.title && (
                <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-500">{page.excerpt}</p>
              )}
              <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  {category}
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  {minutes} dk okuma
                </li>
                <li className="flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  {updated ? "Güncellendi" : "Yayınlandı"}:{" "}
                  <time dateTime={(updated ? modified : published).toISOString()}>{formatDateTr(updated ? modified : published)}</time>
                </li>
              </ul>
            </div>
            <div className="photo-tone aspect-[16/10] w-full rounded-[20px] border border-slate-200 shadow-[0_24px_48px_-28px_rgb(11_18_32/0.35)]">
              {page.coverImageUrl ? (
                <CoverImage src={page.coverImageUrl} alt={page.title} />
              ) : (
                <div className="cover-pattern flex h-full w-full flex-col justify-end p-6 md:p-8" aria-hidden="true">
                  <span className="eyebrow-v2 eyebrow-v2-dark">{category}</span>
                  <span className="mt-2 font-display text-xl font-semibold tracking-tight text-white md:text-2xl">BTM Bilişim Blog</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <article className="min-w-0">
              {toc.length > 0 && (
                <details className="card-v2 group mb-10 p-5 lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-base font-semibold text-navy-950 marker:content-none">
                    İçindekiler
                    <ChevronDown className="h-4 w-4 text-gold-600 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <nav aria-label="İçindekiler" className="mt-4">
                    <TocList toc={toc} />
                  </nav>
                </details>
              )}
              <div className="markdown-content prose-v2">
                {/* Without a cover, the first in-content image is the likely LCP element. */}
                <SiteMarkdown content={body} eagerFirstImage={!page.coverImageUrl} />
              </div>

              {faqHeading && (
                <section aria-labelledby={faqHeading.id} className="mt-14 max-w-[72ch]">
                  <h2 id={faqHeading.id} className="scroll-mt-28 font-display text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] text-navy-950 max-sm:text-[1.4375rem]">
                    {faqHeading.text}
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {faqItems.map((f) => (
                      <li key={f.question} className="card-v2 p-5 md:p-6">
                        <h3 id={faqIds.get(f.question)} className="scroll-mt-28 font-display text-[1.0625rem] font-semibold leading-snug text-navy-950">
                          {f.question}
                        </h3>
                        <div className="prose-card mt-2">
                          <SiteMarkdown content={f.answer} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {page.tags.length > 0 && (
                <div className="mt-14 flex max-w-[72ch] flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
                  <span className="mr-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Etiketler</span>
                  {page.tags.map((t) => (
                    <Link key={t} href={`/blog/etiket/${tagSlug(t)}/`} className="filter-v2 min-h-9 text-[13px]">
                      {t}
                    </Link>
                  ))}
                </div>
              )}
            </article>

            <aside className="hidden space-y-6 lg:sticky lg:top-28 lg:block lg:h-fit">
              {toc.length > 0 && (
                <nav aria-label="İçindekiler">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Bu yazıda</p>
                  <div className="max-h-[40vh] overflow-y-auto pr-1">
                    <TocList toc={toc} />
                  </div>
                </nav>
              )}
              <ContactCard />
            </aside>
          </div>
          <div className="mt-12 lg:hidden">
            <ContactCard />
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-paper-50 py-16 md:py-20" aria-labelledby="related-title">
          <Container>
            <SectionHead id="related-title" eyebrow="İlgili yazılar" title="Bunlar da ilginizi çekebilir" />
            <div className="mt-10">
              <PostGrid posts={related} />
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        title="Bu konuyu kurumunuz için birlikte planlayalım."
        lead="Yerinde keşifle mevcut durumu çıkarır, önceliklendirilmiş bir eylem planı sunarız. İlk görüşme ve keşif ücretsizdir."
        secondary={serviceLink ? { label: serviceLink.label, href: serviceLink.href } : { label: "Hizmetlerimiz", href: "/hizmetler/" }}
      />

      {latest.length > 0 && (
        <section className="bg-white pb-20 md:pb-24" aria-labelledby="latest-title">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHead id="latest-title" eyebrow="Kaynaklar" title="Son yazılar" />
              <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-navy-950">
                Tüm yazılar <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10">
              <PostGrid posts={latest} />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function CoreBody({ page, crumbs }: { page: Page; crumbs: ReturnType<typeof breadcrumbsFor> }) {
  // The about page has its own frame (facts panel, Künye aside, team, contact
  // band) around the same Markdown and metadata.
  if (page.slug === "hakkimizda") return <AboutLayout page={page} crumbs={crumbs} />;
  // Single pages (legal texts, ...): one readable text column, aligned with
  // the logo like the rest of the site.
  return (
    <>
      <LightHero title={page.title} lead={page.excerpt !== page.title ? page.excerpt : null} crumbs={crumbs} />
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="markdown-content prose-v2 core-page">
            {/* Core pages have no separate hero image; the first content image is the likely LCP element. */}
            <SiteMarkdown content={page.content} eagerFirstImage />
          </div>
        </Container>
      </section>
    </>
  );
}
