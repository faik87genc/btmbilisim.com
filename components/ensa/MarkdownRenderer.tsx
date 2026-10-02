import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { rehypeHeadingIds } from "@/lib/rehypeHeadingIds";
import { site } from "@/lib/site";

// Anchor-linked, SEO-aware renderer for post/service body content.
//  - `rehypeHeadingIds` gives every heading a clean ASCII id so the table of
//    contents and "jump to" deep links work (and Google can build sitelink
//    anchors); it shares one slugger with `extractHeadings` so the ids match.
//  - external links open in a new tab and carry rel="noopener noreferrer";
//    internal links stay plain so they pass full link equity.
//  - images render lazily with async decode; alt text comes from the Markdown.
function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const isExternal =
    /^https?:\/\//i.test(href) && !href.includes(site.domain);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

// AI-written posts often include comparison tables; without a scroll
// container a wide one (several columns) forces the whole page to scroll
// sideways on mobile instead of just the table.
function Table({ children, ...rest }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto">
      <table {...rest}>{children}</table>
    </div>
  );
}

function Img({ src, alt = "", ...rest }: ComponentPropsWithoutRef<"img">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="my-6 w-full rounded-sm border border-navy-950/10"
      {...rest}
    />
  );
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHeadingIds]}
        components={{ a: Anchor, img: Img, table: Table }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
