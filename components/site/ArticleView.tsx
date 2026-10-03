import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, Mail, MessageCircle, Phone, User } from "lucide-react";
import type { Page } from "@/lib/db/schema";
import { SiteMarkdown } from "@/components/site/SiteMarkdown";
import { JsonLd } from "@/components/site/Parts";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { BlogCard } from "@/components/ensa/BlogCard";
import { Button } from "@/components/ensa/Button";
import { pageHref, tagSlug } from "@/lib/pages";
import { site } from "@/lib/site";
import { IMG_SIZES, imageInfo } from "@/lib/imageVariants";
import { articleJsonLd, faqPageJsonLd, organizationJsonLd, serviceJsonLd } from "@/lib/structuredData";
import {
  breadcrumbsFor,
  buildNestedToc,
  faqPairs,
  formatDateTr,
  isPost,
  readingTimeMinutes,
  type TocEntry,
} from "@/lib/siteView";

// One page of content (DB row, or the imported WordPress copy) in the
// ensakurumsal.com design: posts get the article layout with TOC + sidebar,
// core pages (old service pages, legal texts, about) a single column.

function Toc({ toc }: { toc: TocEntry[] }) {
  return (
    <nav aria-label="İçindekiler" className="mb-10 rounded-card border border-navy-950/10 bg-white p-5">
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">İçindekiler</div>
      <ol className="space-y-1.5 text-sm">
        {toc.map((t, i) => (
          <li key={t.id}>
            <a href={`#${t.id}`} className="text-slate-600 underline-offset-2 hover:text-gold-700 hover:underline">
              <span className="mr-1 text-slate-400">{i + 1}.</span> {t.text}
            </a>
            {t.children.length > 0 && (
              <ol className="mt-1.5 space-y-1.5 pl-5">
                {t.children.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="text-slate-500 underline-offset-2 hover:text-gold-700 hover:underline">
                      {c.text}
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// The post cover is the LCP element: eager + high fetch priority, with
// responsive variants so mobile downloads the 640w/960w file, not the original.
function CoverImage({ src, alt }: { src: string; alt: string }) {
  const info = imageInfo(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mb-10 aspect-[16/9] w-full rounded-card border border-navy-950/10 object-cover"
      src={info?.src ?? src}
      srcSet={info?.srcSet}
      sizes={info?.srcSet ? IMG_SIZES.cover : undefined}
      alt={alt}
      width={info?.width ?? 1200}
      height={info?.height ?? 675}
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
  );
}

function ContactBox() {
  return (
    <div className="rounded-card border border-navy-950/10 bg-white p-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">Hemen Başlayalım</p>
      <h2 className="mt-3 font-display text-xl font-semibold text-ink-900">Ücretsiz keşif görüşmesi</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        İhtiyacınızı anlatın; ekibimiz durumunuzu ilk görüşmede netleştirsin.
      </p>
      <Button href="/iletisim/#teklif" variant="primary" className="mt-5 w-full">
        Teklif Alın
      </Button>
      <div className="mt-6 space-y-3 border-t border-navy-950/10 pt-5 text-sm">
        <a href={site.phone.href} className="flex items-center gap-3 text-ink-900 transition-colors hover:text-gold-700">
          <Phone className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
          {site.phone.display}
        </a>
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-ink-900 transition-colors hover:text-gold-700"
        >
          <MessageCircle className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
          WhatsApp
        </a>
        <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all text-ink-900 transition-colors hover:text-gold-700">
          <Mail className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
          {site.email}
        </a>
        <a href={`mailto:${site.supportEmail.address}`} className="flex items-center gap-3 break-all text-ink-900 transition-colors hover:text-gold-700">
          <Mail className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
          {site.supportEmail.address} <span className="text-xs text-slate-500">({site.supportEmail.label})</span>
        </a>
      </div>
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
      {draftNote && (
        <div className="bg-gold-500 px-4 py-2 text-center text-sm font-medium text-navy-950">{draftNote}</div>
      )}
      {post ? <PostBody page={page} related={related} crumbs={crumbs} /> : <CoreBody page={page} crumbs={crumbs} />}
    </>
  );
}

function PostBody({ page, related, crumbs }: { page: Page; related: Page[]; crumbs: ReturnType<typeof breadcrumbsFor> }) {
  const toc = buildNestedToc(page.content);
  const date = page.publishedAt ?? page.createdAt;

  return (
    <>
      <PageHero title={page.title} crumbs={[{ text: "Blog", href: "/blog/" }, ...crumbs]}>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.15em] text-gold-300">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDateTr(date)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {readingTimeMinutes(page.content)} dk okuma
          </span>
          <span className="flex items-center gap-2">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            {page.authorName || "BTM Bilişim Ekibi"}
          </span>
        </div>
        {page.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {page.tags.map((t) => (
              <Link
                key={t}
                href={`/blog/etiket/${tagSlug(t)}/`}
                className="rounded-full border border-paper-50/15 px-3 py-1 text-xs font-medium text-slate-300 hover:border-gold-300/50 hover:text-gold-100"
              >
                {t}
              </Link>
            ))}
          </div>
        )}
      </PageHero>

      <section className="bg-paper-50 py-16 md:py-20">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
            <article className="min-w-0">
              {page.coverImageUrl && <CoverImage src={page.coverImageUrl} alt={page.title} />}
              {toc.length > 0 && <Toc toc={toc} />}
              <div className="markdown-content">
                {/* Without a cover, the first in-content image is the likely LCP element. */}
                <SiteMarkdown content={page.content} eagerFirstImage={!page.coverImageUrl} />
              </div>
            </article>
            <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
              <ContactBox />
              {related.length > 0 && (
                <div className="rounded-card border border-navy-950/10 bg-white p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">Blog</p>
                  <h2 className="mt-3 font-display text-base font-semibold text-ink-900">İlgili yazılar</h2>
                  <ul className="mt-4 space-y-3">
                    {related.map((r) => (
                      <li key={r.id}>
                        <Link href={pageHref(r)} className="group flex items-start justify-between gap-3">
                          <span className="text-sm leading-snug text-slate-600 transition-colors group-hover:text-ink-900">
                            {r.title}
                          </span>
                          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-navy-950/10 bg-white py-16 md:py-20">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-ink-900">Bunlar da ilginizi çekebilir</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <BlogCard key={r.id} post={r} delay={i * 0.05} />
              ))}
            </div>
          </Container>
        </section>
      )}

    </>
  );
}

function CoreBody({ page, crumbs }: { page: Page; crumbs: ReturnType<typeof breadcrumbsFor> }) {
  // Single pages (about, legal texts) read best as one centred column. (The
  // old WordPress service pages that had a side contact box now 301 to the
  // new service pages.)
  return (
    <>
      <PageHero title={page.title} lead={page.excerpt !== page.title ? page.excerpt : null} crumbs={crumbs} />
      <section className="bg-paper-50 py-16 md:py-20">
        <Container className="max-w-3xl">
          <div className="markdown-content">
            {/* Core pages have no separate hero image; the first content image is the likely LCP element. */}
            <SiteMarkdown content={page.content} eagerFirstImage />
          </div>
        </Container>
      </section>
    </>
  );
}
