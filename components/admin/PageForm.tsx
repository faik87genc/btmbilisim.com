"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { savePage, improveBlogDraft } from "@/app/admin/actions";
import { slugifyTr } from "@/lib/slug";
import { replaceOrInsertImageAfterHeading } from "@/lib/markdownImages";
import { MarkdownField } from "./MarkdownField";
import { ImageUploadField } from "./ImageUploadField";
import { SeoAssistant } from "./SeoAssistant";
import { ImportPanel, type ImportResult } from "./ImportPanel";
import { AiGeneratePanel } from "./AiGeneratePanel";
import { NewsRewritePanel, type NewsApplyResult } from "./NewsRewritePanel";
import type { ArticleDraft } from "@/lib/ai/articleDraft";
import type { Page } from "@/lib/db/schema";
import { site } from "@/lib/site";
import { analyzeBlogPost } from "@/lib/seo/analyzeBlogPost";
import type { AdminSeoContext } from "@/lib/adminSeoContext";
import type { ContentBrief } from "@/lib/ai/brief";

/** Topic-queue prefill for the AI panel (see /admin/konu-kuyrugu/). */
export type AiPrefill = {
  topic: string;
  keywords: string;
  angle: string;
  wordCount?: number;
  /** Start generating immediately (one click from the queue). */
  autoStart: boolean;
  /** Calendar row fields (niyet, küme, slug, zorunlu linkler, format, not). */
  brief?: ContentBrief;
};

/** `Date` -> `datetime-local` input value, in TR wall-clock time (site's TZ). */
function toDatetimeLocalValue(date: Date): string {
  const tr = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${tr.getFullYear()}-${pad(tr.getMonth() + 1)}-${pad(tr.getDate())}T${pad(tr.getHours())}:${pad(tr.getMinutes())}`;
}

function parseTags(raw: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(/[,\n]/)) {
    const t = part.trim().replace(/\s+/g, " ");
    if (!t) continue;
    const key = t.toLocaleLowerCase("tr-TR");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out;
}

const field = "form-input";
const labelText = "mb-1.5 block text-sm font-medium text-ink-900";
const hint = "mt-1 text-xs text-slate-500";

/** `defaultKind` fixes the toggle for a section that only ever creates one
 * kind (e.g. the /admin/sayfalar/new screen) — undefined shows both options. */
export function PageForm({
  page,
  defaultKind,
  seoContext,
  aiPrefill,
}: {
  page?: Page;
  defaultKind?: Page["kind"];
  /** Other rows + policy names for the pre-publish checks (server-provided). */
  seoContext?: AdminSeoContext;
  aiPrefill?: AiPrefill;
}) {
  const [kind, setKind] = useState<Page["kind"]>(page?.kind ?? defaultKind ?? "blog");
  const [title, setTitle] = useState(page?.title ?? "");
  const [slug, setSlug] = useState(page?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(page?.slug));
  const [excerpt, setExcerpt] = useState(page?.excerpt ?? "");
  const [content, setContent] = useState(page?.content ?? "");
  const [metaTitle, setMetaTitle] = useState(page?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    page?.metaDescription ?? "",
  );
  const [focusKeyword, setFocusKeyword] = useState(page?.focusKeyword ?? "");
  const [tagsRaw, setTagsRaw] = useState((page?.tags ?? []).join(", "));
  const [coverImageUrl, setCoverImageUrl] = useState(page?.coverImageUrl ?? "");
  const [ogImageUrl, setOgImageUrl] = useState(page?.ogImageUrl ?? "");
  const [authorName, setAuthorName] = useState(page?.authorName ?? "");
  type PublishMode = "draft" | "now" | "schedule";
  const [publishMode, setPublishMode] = useState<PublishMode>(() => {
    if (!page?.published) return "draft";
    const isFuture = Boolean(
      page.publishedAt && page.publishedAt.getTime() > new Date().getTime(),
    );
    return isFuture ? "schedule" : "now";
  });
  const [scheduledLocal, setScheduledLocal] = useState(
    page?.publishedAt ? toDatetimeLocalValue(page.publishedAt) : "",
  );
  const [imported, setImported] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState("");
  const [saveState, formAction, saving] = useActionState(savePage, {});

  const effectiveSlug = slugTouched ? slug : slugifyTr(title);
  const tags = useMemo(() => parseTags(tagsRaw), [tagsRaw]);

  const applyImport = (r: ImportResult) => {
    if (r.title) setTitle(r.title);
    if (r.metaTitle) setMetaTitle(r.metaTitle);
    if (r.excerpt) setExcerpt(r.excerpt);
    if (r.content) setContent(r.content);
    if (r.coverImageUrl) setCoverImageUrl(r.coverImageUrl);
    if (!slugTouched && r.title) setSlug("");
    setImported(true);
  };

  const applyDraft = (d: ArticleDraft, draftFocusKeyword?: string) => {
    setTitle(d.title);
    setMetaTitle(d.metaTitle);
    setMetaDescription(d.metaDescription);
    setExcerpt(d.excerpt);
    setContent(d.content);
    setTagsRaw(d.tags.join(", "));
    if (draftFocusKeyword && !focusKeyword.trim()) {
      setFocusKeyword(draftFocusKeyword);
    }
    if (d.slug) {
      setSlug(slugifyTr(d.slug));
      setSlugTouched(true);
    }
  };

  const applyNews = (r: NewsApplyResult) => {
    setTitle(r.title);
    setMetaTitle(r.metaTitle);
    setMetaDescription(r.metaDescription);
    setExcerpt(r.excerpt);
    setContent(r.content);
    setTagsRaw(r.tags.join(", "));
    if (r.slug) {
      setSlug(slugifyTr(r.slug));
      setSlugTouched(true);
    }
    setImported(true);
  };

  const handleImprove = async (failing: string[]) => {
    setAiBusy(true);
    setAiError("");
    const res = await improveBlogDraft({
      focusKeyword,
      keywords: focusKeyword.trim() ? [focusKeyword.trim()] : [],
      title,
      metaTitle,
      metaDescription,
      excerpt,
      tags,
      content,
      failing,
    });
    setAiBusy(false);
    if (res.error || !res.draft) {
      setAiError(res.error || "İyileştirme başarısız.");
      return;
    }
    applyDraft(res.draft);
  };

  const seoInput = useMemo(
    () => ({
      title,
      metaTitle,
      slug: effectiveSlug,
      excerpt,
      metaDescription,
      focusKeyword,
      content,
      coverImageUrl,
      ogImageUrl,
      tags,
      // Migrated guides are kind "page" but carry tags — they are articles.
      kind: (kind === "blog" || tags.length > 0 ? "blog" : "page") as "blog" | "page",
      existingPages: seoContext?.existingPages,
      currentSlug: page?.slug ?? null,
      authorName,
      forbiddenNames: seoContext?.forbiddenNames,
      titleSuffix: site.titleSuffix,
    }),
    [
      title,
      metaTitle,
      effectiveSlug,
      excerpt,
      metaDescription,
      focusKeyword,
      content,
      coverImageUrl,
      ogImageUrl,
      tags,
      kind,
      seoContext,
      page?.slug,
      authorName,
    ],
  );
  const analysis = useMemo(() => analyzeBlogPost(seoInput), [seoInput]);
  const redPolicy = analysis.checks.filter(
    (c) => c.group === "compliance" && c.status === "bad",
  );

  // What Google sees: meta title (or H1) + the site.titleSuffix (" | BTM Bilişim").
  const titleLen = analysis.stats.effectiveTitle.length;
  const descLen = (metaDescription || excerpt).length;

  return (
    <form
      action={formAction}
      className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start"
    >
      <div className="space-y-5">
        {page && <input type="hidden" name="id" value={page.id} />}
        <input type="hidden" name="kind" value={kind} />

        {!defaultKind && (
          <div className="flex gap-2">
            {(
              [
                ["blog", "Blog Yazısı"],
                ["page", "Sayfa"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  kind === k
                    ? "border-gold-500 bg-gold-500 text-navy-950"
                    : "border-navy-950/15 bg-white text-slate-600 hover:border-gold-500/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <AiGeneratePanel
          focusKeyword={focusKeyword}
          prefill={aiPrefill}
          onApply={applyDraft}
          onSetCover={setCoverImageUrl}
          onInsertImage={(md, afterHeading, replaceUrl) =>
            setContent((c) =>
              replaceOrInsertImageAfterHeading(c, md, afterHeading, replaceUrl),
            )
          }
        />

        <NewsRewritePanel onApply={applyNews} onSetCover={setCoverImageUrl} />

        <ImportPanel onApply={applyImport} />
        {imported && (
          <p className="rounded-sm bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            İçe aktarıldı. Alanları kontrol et, odak anahtar kelimeyi gir ve
            sağdaki SEO panelini yeşile taşı.
          </p>
        )}
        {aiError && (
          <p className="rounded-sm bg-red-50 px-3 py-2 text-xs text-red-700">
            {aiError}
          </p>
        )}

        <label className="block">
          <span className={labelText}>Başlık (sayfadaki H1)</span>
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={field}
          />
        </label>

        <label className="block">
          <span className={labelText}>
            URL (slug){" "}
            <span className="font-normal text-slate-500">
              — boş bırakırsan başlıktan üretilir
            </span>
          </span>
          <input
            type="text"
            name="slug"
            value={slugTouched ? slug : slugifyTr(title)}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className={`${field} font-mono text-sm`}
          />
          <span className={hint}>
            {site.domain}/
            {effectiveSlug || "…"}
          </span>
          {page && effectiveSlug !== page.slug && (
            <span className="mt-1 block text-xs text-amber-600">
              URL değişiyor — eski adres ({page.slug}) yeni adrese 301
              yönlendirilecek.
            </span>
          )}
        </label>

        <label className="block">
          <span className={labelText}>Özet (liste kartında görünür)</span>
          <textarea
            name="excerpt"
            required
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className={`${field} resize-none`}
          />
        </label>

        <fieldset className="space-y-4 rounded-md border border-navy-950/10 bg-slate-50/60 p-4">
          <legend className="px-1 text-sm font-semibold text-ink-900">SEO</legend>

          <label className="block">
            <span className={labelText}>Odak anahtar kelime</span>
            <input
              type="text"
              name="focusKeyword"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder="ör. iso 27001 belgesi nasıl alınır"
              className={field}
            />
            <span className={hint}>
              Bu yazının sıralanmasını istediğin arama. Sağdaki kontroller buna
              göre çalışır.
            </span>
          </label>

          <label className="block">
            <span className={labelText}>
              Meta başlık{" "}
              <span
                className={`font-normal ${
                  titleLen > 60 ? "text-red-600" : "text-slate-500"
                }`}
              >
                {titleLen}/60 (marka dahil)
              </span>
            </span>
            <input
              type="text"
              name="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={title || "Boş = başlık kullanılır"}
              className={field}
            />
            <span className={hint}>
              Aramada görünen &lt;title&gt;. Sonuna otomatik “{site.titleSuffix}”
              eklenir.
            </span>
          </label>

          <label className="block">
            <span className={labelText}>
              Meta açıklama{" "}
              <span
                className={`font-normal ${
                  descLen > 160 || (descLen > 0 && descLen < 140) ? "text-red-600" : "text-slate-500"
                }`}
              >
                {descLen} (hedef 140–160)
              </span>
            </span>
            <textarea
              name="metaDescription"
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder={excerpt || "Boş = özet kullanılır"}
              className={`${field} resize-none`}
            />
          </label>

          <label className="block">
            <span className={labelText}>Etiketler (virgülle ayır)</span>
            <input
              type="text"
              name="tags"
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="Siber Güvenlik, Yedekleme, IP Kamera"
              className={field}
            />
            {tags.length > 0 && (
              <span className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-navy-950/5 px-2.5 py-0.5 text-xs text-ink-900"
                  >
                    {t}
                  </span>
                ))}
              </span>
            )}
          </label>

          <label className="block">
            <span className={labelText}>
              Yazar{" "}
              <span className="font-normal text-slate-500">
                — boş = kurum adına
              </span>
            </span>
            <input
              type="text"
              name="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Boş bırak — kişi adı yazma (ör. Uzman Ekibimiz)"
              className={field}
            />
          </label>

          <div>
            <span className={labelText}>
              Sosyal paylaşım görseli (OG){" "}
              <span className="font-normal text-slate-500">
                — boş = kapak görseli
              </span>
            </span>
            <ImageUploadField
              name="ogImageUrl"
              value={ogImageUrl}
              onChange={setOgImageUrl}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-ink-900">
            <input
              type="checkbox"
              name="noindex"
              defaultChecked={page?.noindex}
            />
            Arama motorlarından gizle (noindex)
          </label>
        </fieldset>

        <div>
          <span className={labelText}>Kapak Görseli</span>
          <ImageUploadField
            name="coverImageUrl"
            value={coverImageUrl}
            onChange={setCoverImageUrl}
          />
        </div>

        <div>
          <span className={labelText}>İçerik</span>
          <MarkdownField
            name="content"
            value={content}
            onValueChange={setContent}
            rows={22}
          />
        </div>

        <fieldset className="space-y-3 rounded-md border border-navy-950/10 bg-slate-50/60 p-4">
          <legend className="px-1 text-sm font-semibold text-ink-900">Yayın</legend>
          <input type="hidden" name="publishMode" value={publishMode} />
          <input type="hidden" name="published" value={publishMode !== "draft" ? "on" : ""} />

          <div className="flex flex-wrap gap-2">
            {(
              [
                ["draft", "Taslak"],
                ["now", "Şimdi Yayınla"],
                ["schedule", "İleri Tarihte Yayınla"],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => setPublishMode(m)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  publishMode === m
                    ? "border-gold-500 bg-gold-500 text-navy-950"
                    : "border-navy-950/15 bg-white text-slate-600 hover:border-gold-500/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {publishMode === "schedule" && (
            <label className="block max-w-xs">
              <span className={labelText}>Yayın tarihi/saati</span>
              <input
                type="datetime-local"
                name="publishedAt"
                required
                value={scheduledLocal}
                onChange={(e) => setScheduledLocal(e.target.value)}
                className={field}
              />
              {scheduledLocal &&
                (new Date(`${scheduledLocal}:00+03:00`).getTime() <=
                new Date().getTime() ? (
                  <span className="mt-1 block text-xs text-red-600">
                    Seçilen an geçmişte kaldı — kaydedince hemen yayınlanır.
                  </span>
                ) : (
                  <span className={hint}>
                    Bu saate kadar taslak kalır, saat gelince otomatik
                    yayınlanır (site en fazla 5 dk sonra günceller).
                  </span>
                ))}
            </label>
          )}

          {publishMode === "now" &&
            page?.published &&
            page.publishedAt &&
            page.publishedAt.getTime() <= new Date().getTime() && (
              <p className={hint}>
                Yayın tarihi değişmez —{" "}
                {page.publishedAt.toLocaleString("tr-TR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Europe/Istanbul",
                })}{" "}
                itibarıyla yayında.
              </p>
            )}
        </fieldset>

        {saveState?.error && (
          <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">
            {saveState.error}
          </p>
        )}

        {redPolicy.length > 0 && publishMode !== "draft" && (
          <div
            role="alert"
            className="space-y-1 rounded-sm border border-red-300 bg-red-50 px-3 py-2.5 text-sm text-red-800"
          >
            <p className="font-semibold">
              Yayından önce kontrol et: {redPolicy.length} içerik kuralı ihlali
              şüphesi
            </p>
            <ul className="ml-1 space-y-0.5 text-xs">
              {redPolicy.map((c) => (
                <li key={c.id}>• {c.label}</li>
              ))}
            </ul>
            <p className="text-xs text-red-700">
              Kaydetmeni engellemez — ama yayına almadan önce sağdaki “İçerik
              kuralları” kutusundaki cümleleri düzelt.
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm bg-gold-500 px-5 py-2.5 text-sm font-medium text-navy-950 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
          {page && (
            <Link
              prefetch={false}
              href={`/api/draft/?slug=${encodeURIComponent(page.slug)}`}
              target="_blank"
              className="text-sm text-slate-500 underline underline-offset-2 hover:text-ink-900"
            >
              Taslağı önizle →
            </Link>
          )}
        </div>
      </div>

      <div className="lg:sticky lg:top-6">
        <SeoAssistant
          input={seoInput}
          analysis={analysis}
          onImprove={handleImprove}
          busy={aiBusy}
        />
      </div>
    </form>
  );
}
