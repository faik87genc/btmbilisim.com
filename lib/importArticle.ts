// Browser-only: turns a pasted article (HTML export from an AI writing tool, or
// raw Markdown) into a structured draft the blog editor can pre-fill. Uses
// `DOMParser` + `turndown`, so only import this from a "use client" module.

import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

export type ImportedDraft = {
  format: "html" | "markdown";
  title: string;
  metaTitle: string;
  excerpt: string;
  content: string; // Markdown
  coverImageUrl: string; // remote until re-hosted
  images: string[]; // every remote image URL in the draft (cover + body)
  hasFaq: boolean;
  wordCount: number;
};

function looksLikeHtml(raw: string): boolean {
  return /<(!doctype|html|body|article|section|h1|h2|h3|p|div|ul|table)\b/i.test(
    raw,
  );
}

function trimToLength(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:]$/, "") + "…";
}

function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~[\]()!|-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function buildTurndown(): TurndownService {
  const td = new TurndownService({
    headingStyle: "atx",
    hr: "---",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    linkStyle: "inlined",
    emDelimiter: "*",
  });
  td.use(gfm);
  // Drop wrappers that add no meaning in Markdown but keep their content.
  td.addRule("unwrapFigure", {
    filter: ["figure", "picture"],
    replacement: (content) => content,
  });
  td.remove(["script", "style", "noscript"]);
  return td;
}

function fromHtml(raw: string): ImportedDraft {
  const doc = new DOMParser().parseFromString(raw, "text/html");
  const body = doc.body;

  const docTitle = doc.querySelector("title")?.textContent?.trim() || "";
  const h1 = body.querySelector("h1");
  const title = (h1?.textContent?.trim() || docTitle).trim();
  const metaTitle = docTitle && docTitle !== title ? docTitle : "";

  // Cover = the first image that sits before any real paragraph.
  let coverImageUrl = "";
  const firstImg = body.querySelector("img");
  if (firstImg) {
    const firstP = body.querySelector("p");
    const imgBeforeText =
      !firstP ||
      (firstImg.compareDocumentPosition(firstP) &
        Node.DOCUMENT_POSITION_FOLLOWING) !==
        0;
    if (imgBeforeText) {
      coverImageUrl = firstImg.getAttribute("src") || "";
      firstImg.closest("figure")?.remove();
      firstImg.remove();
    }
  }

  // Remove the tool's own inline table of contents (an early list of #anchors).
  body.querySelectorAll("ul, ol").forEach((list) => {
    const links = Array.from(list.querySelectorAll("a"));
    if (
      links.length >= 3 &&
      links.every((a) => (a.getAttribute("href") || "").startsWith("#"))
    ) {
      list.remove();
    }
  });

  if (h1) h1.remove();

  const hasFaq = Array.from(body.querySelectorAll("h2")).some((h) =>
    /s[ıi]k[çc]a\s+sorulan|^\s*sss\s*$/i.test(h.textContent || ""),
  );

  const excerptSource =
    body.querySelector("p")?.textContent ||
    body.textContent ||
    "";
  const excerpt = trimToLength(excerptSource);

  const images = Array.from(body.querySelectorAll("img"))
    .map((img) => img.getAttribute("src") || "")
    .filter((s) => /^https?:\/\//i.test(s));
  if (coverImageUrl) images.unshift(coverImageUrl);

  const content = buildTurndown()
    .turndown(body.innerHTML)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return {
    format: "html",
    title,
    metaTitle,
    excerpt,
    content,
    coverImageUrl,
    images: Array.from(new Set(images)),
    hasFaq,
    wordCount: countWords(content),
  };
}

function fromMarkdown(raw: string): ImportedDraft {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const h1Index = lines.findIndex((l) => /^#\s+\S/.test(l));
  const title = h1Index >= 0 ? lines[h1Index].replace(/^#\s+/, "").trim() : "";
  if (h1Index >= 0) lines.splice(h1Index, 1);
  const content = lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();

  const paraMatch = content
    .split(/\n{2,}/)
    .find((b) => b.trim() && !/^[#>|!\-*]/.test(b.trim()));
  const excerpt = trimToLength(
    (paraMatch || "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, ""),
  );

  const images = Array.from(
    content.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g),
  )
    .map((m) => m[1])
    .filter((s) => /^https?:\/\//i.test(s));

  const coverImageUrl =
    images.length && content.indexOf(`(${images[0]}`) < 400 ? images[0] : "";

  return {
    format: "markdown",
    title,
    metaTitle: "",
    excerpt,
    content,
    coverImageUrl,
    images: Array.from(new Set(images)),
    hasFaq: /^##\s+.*(s[ıi]k[çc]a\s+sorulan|sss)\b/im.test(content),
    wordCount: countWords(content),
  };
}

export function parseImport(raw: string): ImportedDraft {
  const trimmed = raw.trim();
  return looksLikeHtml(trimmed) ? fromHtml(trimmed) : fromMarkdown(trimmed);
}

/** Swap every occurrence of `from` URL with `to` in a Markdown string. */
export function replaceImageUrl(md: string, from: string, to: string): string {
  return md.split(from).join(to);
}
