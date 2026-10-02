import { createHeadingSlugger } from "./headingSlug";

export type Heading = { level: number; text: string; id: string };

/** Strip inline Markdown marks from a heading's text for display + slugging. */
function cleanInline(s: string): string {
  return s
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
}

/**
 * Headings with the SAME ids `rehypeHeadingIds` assigns at render time (both
 * call `createHeadingSlugger`), so a table of contents built from this list
 * links correctly.
 */
export function extractHeadings(markdown: string): Heading[] {
  const slug = createHeadingSlugger();
  const out: Heading[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = cleanInline(m[2]);
    out.push({ level: m[1].length, text, id: slug(text) });
  }
  return out;
}

/** Table-of-contents entries (H2/H3), or [] when there are too few to bother. */
export function buildToc(markdown: string): Heading[] {
  const toc = extractHeadings(markdown).filter(
    (h) => h.level === 2 || h.level === 3,
  );
  return toc.length >= 3 ? toc : [];
}

export type FaqItem = { question: string; answer: string };

const FAQ_HEADING = /s[ıi]k[çc]a\s+sorulan|^sss$|\bf\.?a\.?q\.?\b/i;

/**
 * Pulls a "Sıkça Sorulan Sorular" section out of the body: the H2 whose text
 * matches, then each following H3 as a question and the prose beneath it as the
 * answer, until the next H2. Used to emit FAQPage structured data.
 */
export function extractFaq(markdown: string): FaqItem[] {
  const lines = markdown.split("\n");
  const items: FaqItem[] = [];
  let inSection = false;
  let inFence = false;
  let q: string | null = null;
  let buf: string[] = [];

  const flush = () => {
    if (q) {
      const answer = buf.join("\n").trim().replace(/\n{3,}/g, "\n\n");
      if (answer) items.push({ question: cleanInline(q), answer });
    }
    q = null;
    buf = [];
  };

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      if (inSection && q) buf.push(line);
      continue;
    }
    if (inFence) {
      if (inSection && q) buf.push(line);
      continue;
    }

    const h2 = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    const h3 = /^###\s+(.+?)\s*#*\s*$/.exec(line);

    if (h2) {
      if (inSection) {
        flush();
        inSection = false;
      }
      if (FAQ_HEADING.test(h2[1])) inSection = true;
      continue;
    }
    if (!inSection) continue;
    if (h3) {
      flush();
      q = h3[1];
      continue;
    }
    if (q) buf.push(line);
  }
  if (inSection) flush();
  return items;
}

/** Body with a matched FAQ section removed (it is re-rendered from FaqItems). */
export function stripFaqSection(markdown: string): string {
  const lines = markdown.split("\n");
  const kept: string[] = [];
  let skipping = false;
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence) {
      const h2 = /^##\s+(.+?)\s*#*\s*$/.exec(line);
      if (h2) {
        skipping = FAQ_HEADING.test(h2[1]);
        if (skipping) continue;
      }
    }
    if (!skipping) kept.push(line);
  }
  return kept.join("\n").trim();
}

function plainInline(s: string): string {
  return s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\\(.)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * build.py's extract_faq_pairs over Markdown: every H2–H4 ending in "?" whose
 * answer is a paragraph within the next two blocks. Feeds FAQPage JSON-LD only;
 * the questions stay in the body where the author put them.
 */
export function faqPairs(markdown: string): { q: string; a: string }[] {
  const blocks = markdown.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const pairs: { q: string; a: string }[] = [];
  blocks.forEach((b, i) => {
    const h = /^#{2,4}\s+(.+?)\s*$/.exec(b);
    if (!h || b.includes("\n") || !plainInline(h[1]).endsWith("?")) return;
    for (const next of blocks.slice(i + 1, i + 3)) {
      if (/^(#|[-*+]\s|\d+[.)]\s|!\[|\||>)/.test(next)) continue;
      pairs.push({ q: plainInline(h[1]), a: plainInline(next) });
      break;
    }
  });
  return pairs;
}
