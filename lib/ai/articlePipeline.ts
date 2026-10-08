import "server-only";
import {
  analyzeBlogPost,
  isWriterFixable,
  type SeoAnalysis,
  type SeoCheck,
} from "@/lib/seo/analyzeBlogPost";
import { slugifyTr } from "@/lib/slug";
import { generateArticle, improveArticle } from "./generateArticle";
import type { ArticleDraft } from "./articleDraft";
import { liveLinkTargets } from "./siteContext";
import {
  finalizeLinkSuggestions,
  isKnownSlug,
  linkedSlugs,
  type LinkSuggestion,
  type LinkTarget,
} from "./linkTargets";
import { polishDraft } from "./polishDraft";
import type { ContentBrief } from "./brief";
import { site } from "@/lib/site";

const TITLE_SUFFIX = site.titleSuffix;

const TARGET_SCORE = clampInt(process.env.BLOG_AI_TARGET_SCORE, 90, 50, 100);
const MAX_REPAIRS = clampInt(process.env.BLOG_AI_MAX_REPAIRS, 1, 0, 3);

function clampInt(
  raw: string | undefined,
  fallback: number,
  min: number,
  max: number,
): number {
  const n = Number.parseInt(raw ?? "", 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export type ArticlePipelineResult = {
  draft: ArticleDraft;
  analysis: SeoAnalysis;
  /** Writer-controllable SEO score of the returned draft (0–100). */
  score: number;
  /** How many model calls ran (1 = first draft passed, no repair). */
  rounds: number;
  /** AI provider that produced the draft, e.g. "Gemini (gemini-2.5-flash)". */
  provider: string;
  /** 3–5 verified internal-link candidates (real, live slugs). */
  linkSuggestions: LinkSuggestion[];
  /** Human-readable trace for the panel / logs. */
  log: string[];
};

/** Map a generated draft onto the shape {@link analyzeBlogPost} expects. */
function toSeoInput(draft: ArticleDraft, focusKeyword: string, targets: LinkTarget[]) {
  return {
    kind: "blog" as const,
    title: draft.title,
    metaTitle: draft.metaTitle,
    slug: slugifyTr(draft.slug || draft.title),
    excerpt: draft.excerpt,
    metaDescription: draft.metaDescription,
    focusKeyword,
    content: draft.content,
    tags: draft.tags,
    titleSuffix: TITLE_SUFFIX,
    existingPages: targets.map((t) => ({ slug: t.slug, title: t.title })),
  };
}

/** Failing checks the writer can actually fix, as "Label — detail" strings. */
function writerFailings(analysis: SeoAnalysis): string[] {
  return analysis.checks
    .filter(
      (c: SeoCheck) =>
        (c.status === "bad" || c.status === "warn") && isWriterFixable(c.id),
    )
    // Hard failures (compliance, missing FAQ…) first so they survive the cap.
    .sort((a, b) => Number(b.status === "bad") - Number(a.status === "bad"))
    .map((c) => (c.detail ? `${c.label} — ${c.detail}` : c.label));
}

function hasHardFail(analysis: SeoAnalysis): boolean {
  return analysis.checks.some((c) => c.status === "bad" && isWriterFixable(c.id));
}

/**
 * Generate an article, apply the free deterministic fixes (brand suffix,
 * slug, dead internal links), score it against the on-page SEO + compliance
 * checklist, and run up to {@link MAX_REPAIRS} corrective rewrites until it
 * clears the target score with no hard failures. Returns the best draft seen,
 * preferring drafts without hard (red) failures.
 */
export async function runArticlePipeline(opts: {
  topic: string;
  keywords: string[];
  wordCount: number;
  tone: string;
  angle?: string;
  brief?: ContentBrief;
}): Promise<ArticlePipelineResult> {
  const keywords = opts.keywords.map((k) => k.trim()).filter(Boolean);
  const focusKeyword = keywords[0] ?? opts.topic.trim();
  const relevance = [opts.topic, ...keywords].join(" ");
  const log: string[] = [];

  // One DB read for the whole run (catalogue, link checks, suggestions).
  const linkTargets = await liveLinkTargets();
  const knownSlugs = new Set(linkTargets.map((t) => t.slug));

  // Calendar brief: mandatory links only if the page really exists (a planned
  // article may not be published yet); the planned slug wins over the model's.
  const brief: ContentBrief = { ...opts.brief };
  const wanted = brief.requiredLinks ?? [];
  brief.requiredLinks = wanted.filter((h) => isKnownSlug(h.replace(/^\/+|\/+$/g, ""), knownSlugs));
  const notYet = wanted.filter((h) => !brief.requiredLinks!.includes(h));
  if (notYet.length) log.push(`henüz yayında olmayan iç link atlandı: ${notYet.join(", ")}`);
  if (brief.slug && knownSlugs.has(brief.slug)) {
    log.push(`planlanan slug /${brief.slug}/ zaten kullanımda — modelin önerisi kullanılacak`);
    brief.slug = undefined;
  }

  const polish = (d: ArticleDraft) => {
    const { draft, report } = polishDraft(d, { knownSlugs, titleSuffix: TITLE_SUFFIX });
    if (report.notes.length) log.push(`otomatik düzeltme: ${report.notes.join("; ")}`);
    return brief.slug ? { ...draft, slug: brief.slug } : draft;
  };

  const first = await generateArticle({
    topic: opts.topic,
    keywords,
    angle: opts.angle,
    wordCount: opts.wordCount,
    tone: opts.tone,
    brief,
    linkTargets,
  });
  let provider = first.provider;
  let draft = polish(first.draft);
  log.push(`sağlayıcı: ${provider}`);
  let analysis = analyzeBlogPost(toSeoInput(draft, focusKeyword, linkTargets));
  let rounds = 1;
  log.push(`1. taslak: SEO ${analysis.controllableScore}/100`);

  let best = { draft, analysis };
  const better = (a: SeoAnalysis, b: SeoAnalysis) =>
    Number(!hasHardFail(a)) - Number(!hasHardFail(b)) ||
    a.controllableScore - b.controllableScore;

  for (let i = 0; i < MAX_REPAIRS; i++) {
    const inBody = linkedSlugs(draft.content);
    const missingReq = (brief.requiredLinks ?? []).filter(
      (h) => !inBody.has(h.replace(/^\/+|\/+$/g, "")),
    );
    const failings = [
      ...(missingReq.length
        ? [`Zorunlu iç link eksik — metnin doğal bir yerine ekle: ${missingReq.join(", ")}`]
        : []),
      ...writerFailings(analysis),
    ];
    if (
      analysis.controllableScore >= TARGET_SCORE &&
      !hasHardFail(analysis) &&
      missingReq.length === 0
    ) {
      break;
    }
    if (failings.length === 0) break;

    const repairResult = await improveArticle({
      focusKeyword,
      keywords,
      title: draft.title,
      metaTitle: draft.metaTitle,
      metaDescription: draft.metaDescription,
      excerpt: draft.excerpt,
      tags: draft.tags,
      content: draft.content,
      failing: failings.slice(0, 20),
      requiredLinks: brief.requiredLinks,
      audience: brief.audience,
      linkTargets,
    });
    provider = repairResult.provider;
    const repaired = polish(repairResult.draft);
    const repairedAnalysis = analyzeBlogPost(toSeoInput(repaired, focusKeyword, linkTargets));
    rounds++;
    log.push(
      `${i + 2}. tur (düzeltme, ${provider}): SEO ${repairedAnalysis.controllableScore}/100`,
    );

    draft = repaired;
    analysis = repairedAnalysis;
    if (better(repairedAnalysis, best.analysis) >= 0) {
      best = { draft: repaired, analysis: repairedAnalysis };
    }
  }

  const linkSuggestions = finalizeLinkSuggestions({
    suggested: [
      ...(brief.requiredLinks ?? []).map((h) => ({
        slug: h,
        anchor: "",
        reason: "Takvimde zorunlu iç link.",
      })),
      ...(best.draft.internalLinkSuggestions ?? []),
    ],
    targets: linkTargets,
    brief: relevance,
    content: best.draft.content,
    selfSlug: best.draft.slug,
  });

  return {
    draft: best.draft,
    analysis: best.analysis,
    score: best.analysis.controllableScore,
    rounds,
    provider,
    linkSuggestions,
    log,
  };
}
