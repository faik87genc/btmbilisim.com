// Deterministic clean-up of a model draft — the cheap fixes that should never
// cost another model round. Pure (no server-only), so it is unit-testable.

import { slugifyTr } from "@/lib/slug";
import type { ArticleDraft } from "./articleDraft";
import { sanitizeInternalLinks } from "./linkTargets";

export type PolishReport = {
  /** Internal links that pointed at non-existent pages and were unwrapped. */
  removedLinks: string[];
  /** Human-readable notes for the pipeline log. */
  notes: string[];
};

export function polishDraft(
  draft: ArticleDraft,
  opts: { knownSlugs: ReadonlySet<string>; titleSuffix: string },
): { draft: ArticleDraft; report: PolishReport } {
  const notes: string[] = [];

  // metaTitle: the layout appends the brand; drop it if the model added it.
  let metaTitle = draft.metaTitle.trim();
  const brand = opts.titleSuffix.replace(/^\s*\|\s*/, "").trim();
  const stripped = metaTitle
    .replace(new RegExp(`\\s*[|–-]\\s*${brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i"), "")
    .trim();
  if (stripped !== metaTitle) {
    metaTitle = stripped;
    notes.push("meta başlıktaki marka soneki kaldırıldı");
  }

  // slug: normalised, no years, max 6 words.
  const slugWords = slugifyTr(draft.slug || draft.title)
    .split("-")
    .filter((w) => w && !/^(19|20)\d{2}$/.test(w));
  const slug = slugWords.slice(0, 6).join("-");

  // content: never an in-body H1 (the page title is the H1).
  let content = draft.content.replace(/^#\s+(?=\S)/gm, "## ");
  if (content !== draft.content) notes.push("gövdedeki H1 başlık H2'ye çevrildi");

  const linkFix = sanitizeInternalLinks(content, opts.knownSlugs);
  content = linkFix.content;
  if (linkFix.removed.length) {
    notes.push(`olmayan sayfaya giden ${linkFix.removed.length} link kaldırıldı`);
  }

  return {
    draft: {
      ...draft,
      metaTitle,
      metaDescription: draft.metaDescription.replace(/\s+/g, " ").trim(),
      slug,
      content: content.trim(),
    },
    report: { removedLinks: linkFix.removed, notes },
  };
}
