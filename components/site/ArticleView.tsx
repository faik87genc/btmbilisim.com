import Link from "next/link";
import type { Page } from "@/lib/db/schema";
import { Icon } from "@/components/site/Icon";
import { SiteMarkdown } from "@/components/site/SiteMarkdown";
import { Breadcrumbs, CtaBand, JsonLd } from "@/components/site/Parts";
import { pageHref } from "@/lib/pages";
import { IMG_SIZES, imageInfo } from "@/lib/imageVariants";
import { articleJsonLd, faqPageJsonLd, organizationJsonLd, serviceJsonLd } from "@/lib/structuredData";
import {
  breadcrumbsFor,
  buildNestedToc,
  faqPairs,
  formatDateTr,
  isPost,
  postTag,
  readingTimeMinutes,
  splitAtFirstH2,
  type TocEntry,
} from "@/lib/siteView";

// One page of content (DB row) in the static site's page.html layout: posts
// get the two-column article with TOC + sidebar, core pages a centred column.

function TocBox({ toc }: { toc: TocEntry[] }) {
  return (
    <details className="toc-box" open>
      <summary>
        <span className="toc-title">İçerik</span> <span className="toc-toggle" aria-hidden="true" />
      </summary>
      <nav aria-label="İçindekiler">
        <ol className="toc">
          {toc.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`}>
                <span className="toc-n">{i + 1}</span> {t.text}
              </a>
              {t.children.length > 0 && (
                <ol>
                  {t.children.map((c, j) => (
                    <li key={c.id}>
                      <a href={`#${c.id}`}>
                        <span className="toc-n">
                          {i + 1}.{j + 1}
                        </span>{" "}
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
    </details>
  );
}

export function ArticleView({ page, related, draftNote }: { page: Page; related: Page[]; draftNote?: string | null }) {
  const post = isPost(page);
  const description = page.metaDescription || page.excerpt;
  const faqs = post ? faqPairs(page.content) : [];
  const service = post ? null : serviceJsonLd(pageHref(page));

  return (
    <>
      {!draftNote && <JsonLd data={organizationJsonLd()} />}
      {!draftNote && post && <JsonLd data={articleJsonLd(page, description)} />}
      {!draftNote && service && <JsonLd data={service} />}
      {!draftNote && faqs.length > 0 && <JsonLd data={faqPageJsonLd(faqs)} />}
      {draftNote && (
        <div style={{ background: "#f59e0b", color: "#0c1e33", padding: "8px 16px", textAlign: "center", fontSize: 14, fontWeight: 600 }}>
          {draftNote}
        </div>
      )}
      <Breadcrumbs crumbs={breadcrumbsFor(page)} />
      <main id="main" tabIndex={-1}>
        <article className="section">
          <div className="wrap">{post ? <PostBody page={page} related={related} /> : <CoreBody page={page} />}</div>
        </article>
      </main>
    </>
  );
}

// The post cover is the LCP element: eager + high fetch priority, with
// responsive variants so mobile downloads the 640w/960w file, not the original.
function CoverImage({ src, alt }: { src: string; alt: string }) {
  const info = imageInfo(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="post-hero-img"
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

function PostBody({ page, related }: { page: Page; related: Page[] }) {
  const toc = buildNestedToc(page.content);
  const [intro, rest] = toc.length ? splitAtFirstH2(page.content) : [page.content, ""];
  const date = page.publishedAt ?? page.createdAt;

  return (
    <div className="post-layout">
      <div>
        <span className="tag">{postTag(page)}</span>
        <h1>{page.title}</h1>
        <div className="post-meta">
          <span>
            <Icon id="user" size={14} /> {page.authorName || "Uzman Ekibimiz"}
          </span>
          <span>
            <Icon id="calendar" size={14} /> {formatDateTr(date)}
          </span>
          <span>
            <Icon id="clock" size={14} /> {readingTimeMinutes(page.content)} dk okuma
          </span>
        </div>
        {page.coverImageUrl && <CoverImage src={page.coverImageUrl} alt={page.title} />}

        <div className="entry-content">
          {/* Without a cover, the first in-content image is the likely LCP element. */}
          <SiteMarkdown content={intro} eagerFirstImage={!page.coverImageUrl} />
          {toc.length > 0 && <TocBox toc={toc} />}
          {rest && <SiteMarkdown content={rest} />}
        </div>

        <CtaBand
          style={{ marginTop: 48 }}
          title="Ücretsiz Danışmanlık Teklifi Alın"
          text="24 saat içinde sizinle iletişime geçilsin."
          cta="Hemen Teklif Alın"
        />
      </div>

      <aside>
        <div className="side-cta">
          <h2 className="side-h">Ücretsiz Keşif Görüşmesi</h2>
          <p>Siber güvenlik, altyapı ve IT destek ihtiyaçlarınız için hemen görüşün.</p>
          <Link className="btn btn-on-navy btn-block" href="/#teklif">
            İletişime Geçin
          </Link>
        </div>
        {related.length > 0 && (
          <div className="side-box">
            <h2 className="side-h">İlgili Yazılar</h2>
            <ul className="related-list">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={pageHref(r)}>{r.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}

function CoreBody({ page }: { page: Page }) {
  return (
    <>
      <div className="sec-head" style={{ maxWidth: 820 }}>
        <h1>{page.title}</h1>
      </div>
      <div className="entry-content" style={{ maxWidth: 820, margin: "0 auto" }}>
        {/* Core pages have no separate hero image; the first content image sits
            right under the H1 and is usually the LCP element. */}
        <SiteMarkdown content={page.content} eagerFirstImage />
      </div>
      <CtaBand
        style={{ marginTop: 56 }}
        title="Projenizi Birlikte Planlayalım"
        text="İhtiyacınızı ücretsiz keşif görüşmesiyle netleştirelim, size özel teklifimizi hazırlayalım."
        cta="Ücretsiz Teklif Alın"
      />
    </>
  );
}
