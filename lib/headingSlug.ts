import { slugifyTr } from "./slug";

/**
 * A stateful heading slugger: ASCII, Turkish-aware, and de-duplicated within a
 * single document (second "Giriş" becomes `giris-1`). The SAME function backs
 * both the rendered heading `id`s and the table of contents, so in-page anchors
 * always resolve — and they stay clean enough to show in a search snippet.
 */
export function createHeadingSlugger(): (text: string) => string {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = slugifyTr(text) || "bolum";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  };
}
