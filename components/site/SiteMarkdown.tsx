import type { ComponentPropsWithoutRef, JSX } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { IMG_SIZES, imageInfo } from "@/lib/imageVariants";
import { rehypeHeadingIds } from "@/lib/rehypeHeadingIds";
import { site } from "@/lib/site";

// Markdown body for public pages. Emits the same bare HTML the static build
// did (p, h2–h4 with ids, ul/ol, img, table, blockquote) so the static
// stylesheet's `.entry-content` rules style it; the caller provides the
// `.entry-content` wrapper.

// react-markdown passes its hast `node` to every component; strip it so it is
// not spread onto the DOM (it rendered as node="[object Object]").
type WithNode<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T> & { node?: unknown };

function Anchor({ href = "", children, node: _node, ...rest }: WithNode<"a">) {
  void _node;
  const isExternal = /^https?:\/\//i.test(href) && !href.includes(site.domain);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener" {...rest}>
        {children}
        <span className="visually-hidden"> (yeni sekmede açılır)</span>
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

// Rehype plugin: flag the first <img> so it renders eager + fetchpriority=high
// (it is the LCP candidate on pages without a separate cover image).
function rehypeEagerFirstImage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    let done = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, "element", (node: any) => {
      if (done || node.tagName !== "img") return;
      node.data = { ...node.data, eager: true };
      done = true;
    });
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MdImgProps = ComponentPropsWithoutRef<"img"> & { node?: any };

function Img({ src, alt = "", node, ...rest }: MdImgProps) {
  const url = typeof src === "string" ? src : undefined;
  const info = imageInfo(url);
  const eager = Boolean(node?.data?.eager);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={info?.src ?? url}
      srcSet={info?.srcSet}
      sizes={info?.srcSet ? IMG_SIZES.content : undefined}
      alt={alt}
      width={info?.width}
      height={info?.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      {...rest}
    />
  );
}

// Wide tables scroll inside a focusable region instead of turning the table
// itself into display:block, which can drop its table semantics.
function Table({ node: _node, ...rest }: WithNode<"table">) {
  void _node;
  return (
    <div className="table-wrap" role="region" aria-label="Tablo" tabIndex={0}>
      <table {...rest} />
    </div>
  );
}

// The page template owns the only <h1>; a "# " line in the body becomes an <h2>.
function H1AsH2({ node: _node, ...rest }: WithNode<"h1">) {
  void _node;
  return <h2 {...rest} />;
}

export function SiteMarkdown({ content, eagerFirstImage = false }: { content: string; eagerFirstImage?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={eagerFirstImage ? [rehypeHeadingIds, rehypeEagerFirstImage] : [rehypeHeadingIds]}
      components={{ a: Anchor, img: Img, table: Table, h1: H1AsH2 }}
    >
      {content}
    </ReactMarkdown>
  );
}
