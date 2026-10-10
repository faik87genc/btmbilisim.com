// Splits a service page's Markdown (lib/servicePages.ts) into blocks so the
// page can show its scope as cards and its process as numbered steps. Only the
// presentation changes: every heading and sentence is still rendered, in the
// original order. A section is only lifted out when it parses cleanly;
// anything irregular stays plain Markdown.

export type CardItem = { title: string | null; body: string };

export type ServiceBlock =
  | { kind: "prose"; md: string }
  | { kind: "scope"; heading: string; lead: string; items: CardItem[] }
  | { kind: "steps"; heading: string; lead: string; items: CardItem[] };

const SCOPE_RE = /kapsam/i;
const STEPS_RE = /s[üu]re[çc]|ad[ıi]m|ak[ıi][şs]|s[ıi]ra|yol\b|y[öo]ntem|yakla[şs][ıi]m|i[şs]leyi[şs]|[çc]al[ıi][şs]ma (şekli|düzeni|şeklimiz)/i;

/** "**Title** — rest", "**Title:** rest", "**Title**: rest" → title + body. */
function splitLead(text: string): CardItem {
  const m = /^\*\*(.+?)\*\*\s*(?:[—–:-]\s*)?([\s\S]*)$/.exec(text.trim());
  if (m) {
    const title = m[1].replace(/[:.]\s*$/, "").trim();
    return { title, body: m[2].trim() };
  }
  return { title: null, body: text.trim() };
}

/** List items of a block that is only a list (+ an optional intro before it). */
function listItems(lines: string[], ordered: boolean): { lead: string; items: string[] } | null {
  const itemRe = ordered ? /^\d+[.)]\s+(.*)$/ : /^[-*+]\s+(.*)$/;
  const lead: string[] = [];
  const items: string[] = [];
  let inList = false;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    const m = itemRe.exec(line);
    if (m) {
      inList = true;
      items.push(m[1]);
      continue;
    }
    if (!line.trim()) continue;
    if (!inList) {
      lead.push(line);
      continue;
    }
    // Continuation of the previous item (indented), else something after the
    // list — then the section is not a clean list.
    if (/^\s{2,}\S/.test(raw) && items.length) {
      items[items.length - 1] += " " + line.trim();
      continue;
    }
    return null;
  }
  return items.length ? { lead: lead.join("\n"), items } : null;
}

/** H3 subsections (optional intro before the first H3). */
function h3Items(lines: string[]): { lead: string; items: CardItem[] } | null {
  const lead: string[] = [];
  const items: CardItem[] = [];
  for (const line of lines) {
    const h = /^###\s+(.+?)\s*#*\s*$/.exec(line);
    if (h) {
      items.push({ title: h[1].replace(/^\d+[.)]\s*/, "").trim(), body: "" });
      continue;
    }
    if (items.length) items[items.length - 1].body += line + "\n";
    else lead.push(line);
  }
  if (!items.length) return null;
  return { lead: lead.join("\n").trim(), items: items.map((i) => ({ ...i, body: i.body.trim() })) };
}

export function serviceBlocks(md: string): ServiceBlock[] {
  const lines = md.split("\n");
  const sections: { heading: string | null; lines: string[] }[] = [{ heading: null, lines: [] }];
  let fence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) fence = !fence;
    const h2 = !fence && /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (h2) sections.push({ heading: h2[1], lines: [] });
    else sections[sections.length - 1].lines.push(line);
  }

  const blocks: ServiceBlock[] = [];
  let scopeDone = false;
  let stepsDone = false;
  const pushProse = (text: string) => {
    const last = blocks[blocks.length - 1];
    if (last?.kind === "prose") last.md += "\n\n" + text;
    else blocks.push({ kind: "prose", md: text });
  };

  for (const s of sections) {
    const raw = (s.heading ? `## ${s.heading}\n` : "") + s.lines.join("\n");
    if (!s.heading) {
      if (raw.trim()) pushProse(raw.trim());
      continue;
    }
    if (!scopeDone && SCOPE_RE.test(s.heading)) {
      const byH3 = h3Items(s.lines);
      const byList = byH3 ? null : listItems(s.lines, false);
      const items = byH3?.items ?? byList?.items.map(splitLead) ?? [];
      if (items.length >= 3 && items.length <= 12) {
        blocks.push({ kind: "scope", heading: s.heading, lead: (byH3?.lead ?? byList?.lead ?? "").trim(), items });
        scopeDone = true;
        continue;
      }
    }
    if (!stepsDone) {
      // A clean numbered list under a process heading, or one whose every
      // item starts with a bold step name.
      const list = listItems(s.lines, true);
      const items = list?.items.map(splitLead) ?? [];
      const isSteps = STEPS_RE.test(s.heading) || items.every((i) => i.title);
      if (list && isSteps && items.length >= 3 && items.length <= 8) {
        blocks.push({ kind: "steps", heading: s.heading, lead: list.lead.trim(), items });
        stepsDone = true;
        continue;
      }
    }
    pushProse(raw.trim());
  }
  return blocks;
}
