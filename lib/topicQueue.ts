// Content-calendar CSV → topic queue rows. Pure, dependency-free; runs in the
// browser (admin queue screen). Tolerates ";" or "," separators, a UTF-8 BOM,
// quoted fields and header spelling variants (Turkish with/without accents).

import { slugifyTr } from "@/lib/slug";
import { parseLinkList, wordCountFromText } from "@/lib/ai/brief";

export type TopicRow = {
  no: string;
  date: string;
  title: string;
  keyword: string;
  intent: string;
  cluster: string;
  slug: string;
  links: string[];
  format: string;
  priority: string;
  note: string;
  /** Bölge / sektör açısı, e.g. "Kocaeli OSB üretim firmaları". */
  audience: string;
  /** Parsed from the note/format ("3.000-4.500 kelime"), if present. */
  wordCount?: number;
};

type Field = Exclude<keyof TopicRow, "links" | "wordCount"> | "links";

// Header (slugified) → field. First matching alias wins.
const ALIASES: [Field, string[]][] = [
  ["no", ["no", "sira", "id", "#"]],
  ["date", ["tarih", "yayin-tarihi", "gun", "date"]],
  ["keyword", ["hedef-anahtar-kelime", "anahtar-kelime", "odak-anahtar-kelime", "odak-kelime", "birincil-anahtar-kelime", "keyword", "focus-keyword"]],
  ["title", ["baslik", "konu", "title", "onerilen-baslik", "h1"]],
  ["intent", ["arama-niyeti", "niyet", "intent"]],
  ["cluster", ["kume", "konu-kumesi", "cluster"]],
  ["slug", ["onerilen-slug", "slug", "url"]],
  ["links", ["baglanacak-mevcut-ic-sayfalar", "ic-linkler", "baglanacak-sayfalar", "ic-sayfalar", "internal-links"]],
  ["format", ["format", "icerik-formati"]],
  ["priority", ["oncelik", "priority"]],
  ["note", ["not", "notlar", "aciklama", "note"]],
  ["audience", ["bolge-sektor", "bolge-sektor-acisi", "bolge", "sektor", "hedef-kitle", "audience"]],
];

/** RFC-4180-ish split with a given delimiter. */
function parseDelimited(text: string, delim: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += ch;
      continue;
    }
    if (ch === '"' && cell === "") quoted = true;
    else if (ch === delim) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

export function parseTopicCsv(raw: string): { rows: TopicRow[]; error?: string } {
  const text = raw.replace(/^﻿/, "");
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const delim =
    (firstLine.match(/;/g)?.length ?? 0) >= (firstLine.match(/,/g)?.length ?? 0) ? ";" : ",";
  const table = parseDelimited(text, delim);
  if (table.length < 2) return { rows: [], error: "CSV boş ya da yalnızca başlık satırı var." };

  const header = table[0].map((h) => slugifyTr(h.trim()));
  const col = new Map<Field, number>();
  for (const [field, names] of ALIASES) {
    const idx = header.findIndex((h) => names.includes(h));
    if (idx !== -1 && ![...col.values()].includes(idx)) col.set(field, idx);
  }
  if (!col.has("title") && !col.has("keyword")) {
    return { rows: [], error: "Başlık veya anahtar kelime sütunu bulunamadı (ör. 'Baslik', 'Hedef anahtar kelime')." };
  }

  const get = (r: string[], f: Field) => {
    const i = col.get(f);
    return i === undefined ? "" : (r[i] ?? "").trim();
  };
  const rows = table.slice(1).map((r) => {
    const title = get(r, "title") || get(r, "keyword");
    const format = get(r, "format");
    const note = get(r, "note");
    return {
      no: get(r, "no"),
      date: get(r, "date"),
      title,
      keyword: get(r, "keyword") || title,
      intent: get(r, "intent"),
      cluster: get(r, "cluster"),
      slug: get(r, "slug").replace(/^\/+|\/+$/g, ""),
      links: parseLinkList(get(r, "links")),
      format,
      priority: get(r, "priority"),
      note,
      audience: get(r, "audience"),
      wordCount: wordCountFromText(`${note} ${format}`),
    };
  });
  return { rows: rows.filter((r) => r.title) };
}

/** /admin/blog/new/ URL that pre-fills (and optionally starts) the AI panel. */
export function draftUrl(row: TopicRow, autoStart: boolean): string {
  const q = new URLSearchParams();
  q.set("konu", row.title);
  q.set("kw", row.keyword);
  if (row.intent) q.set("niyet", row.intent);
  if (row.cluster) q.set("kume", row.cluster);
  if (row.slug) q.set("slug", row.slug);
  if (row.links.length) q.set("linkler", row.links.join(" "));
  if (row.format) q.set("format", row.format);
  if (row.note) q.set("not", row.note);
  if (row.audience) q.set("bolge", row.audience);
  if (row.wordCount) q.set("uzunluk", String(row.wordCount));
  if (autoStart) q.set("baslat", "1");
  return `/admin/blog/new/?${q.toString()}`;
}
