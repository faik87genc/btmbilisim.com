import Link from "next/link";
import { Icon } from "@/components/site/Icon";
import { breadcrumbJsonLd } from "@/lib/structuredData";
import type { Crumb } from "@/lib/siteView";
import { IMG_SIZES, imageInfo } from "@/lib/imageVariants";

// Small markup pieces shared by the public routes, matching the static
// site's templates (base.html, page.html, home.html, blog_index.html).

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
          .replace(/</g, "\\u003c")
          .replace(/>/g, "\\u003e")
          .replace(/&/g, "\\u0026"),
      }}
    />
  );
}

/** Visible breadcrumb bar + its BreadcrumbList schema. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav className="breadcrumbs" aria-label="Sayfa yolu">
        <div className="wrap">
          <Link href="/">Anasayfa</Link>
          {crumbs.map((c, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span className="sep" aria-hidden="true">/</span>
              {i === crumbs.length - 1 || !c.href ? (
                <span className="current" aria-current="page">{c.text}</span>
              ) : (
                <Link href={c.href}>{c.text}</Link>
              )}
            </span>
          ))}
        </div>
      </nav>
    </>
  );
}

export type CardPost = { href: string; title: string; excerpt: string; heroImg: string | null; tag: string | null };

/**
 * `priority`: the card is in the first screen (e.g. first card of /blog/, the
 * mobile LCP element) — load it eagerly with high fetch priority.
 */
export function PostCard({ post, priority = false }: { post: CardPost; priority?: boolean }) {
  const img = imageInfo(post.heroImg);
  return (
    <Link className="post-card" href={post.href} style={{ color: "inherit", textDecoration: "none" }}>
      {post.heroImg && (
        // Decorative: the card's heading already names the post, so the
        // alt text would only repeat the link text for screen readers.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img?.src ?? post.heroImg}
          srcSet={img?.srcSet}
          sizes={img?.srcSet ? IMG_SIZES.card : undefined}
          alt=""
          width={img?.width ?? 400}
          height={img?.height ?? 225}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
        />
      )}
      <div className="body">
        {post.tag && <span className="tag">{post.tag}</span>}
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="more">
          Devamını Oku <Icon id="arrow" size={12} />
        </span>
      </div>
    </Link>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details className="faq-item" key={f.q}>
          <summary className="faq-q">
            {f.q}{" "}
            <span className="plus">
              <Icon id="plus" size={14} />
            </span>
          </summary>
          <div className="faq-a">
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title, text, cta, style }: { title: string; text: string; cta: string; style?: React.CSSProperties }) {
  return (
    <div className="cta-band" style={style}>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="btn btn-on-navy btn-lg" href="/#teklif">
        {cta} <Icon id="arrow" size={16} />
      </Link>
    </div>
  );
}
