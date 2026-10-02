"use client";

import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  Wand2,
  ChevronDown,
  Copy,
  Check,
  ImagePlus,
} from "lucide-react";
import { generateBlogDraft, generateBlogImage } from "@/app/admin/actions";
import type { ArticleDraft } from "@/lib/ai/articleDraft";
import type { LinkSuggestion } from "@/lib/ai/linkTargets";
import type { ContentBrief } from "@/lib/ai/brief";

// Daily-article standard 1500–2500 words; the calendar also plans Ek-A
// control cards (1200–1800) and pillar guides (3000–4500).
const WORD_COUNTS = [
  { v: 1300, label: "Ek-A kontrol kartı (~1300)" },
  { v: 1500, label: "Standart (~1500)" },
  { v: 1800, label: "Orta (~1800)" },
  { v: 2200, label: "Uzun (~2200)" },
  { v: 2500, label: "Kapsamlı (~2500)" },
  { v: 3800, label: "Pillar rehber (~3800)" },
];
const DEFAULT_WORD_COUNT = 1800;

function nearestWordCount(n?: number): number {
  if (!n) return DEFAULT_WORD_COUNT;
  return WORD_COUNTS.reduce((best, w) =>
    Math.abs(w.v - n) < Math.abs(best.v - n) ? w : best,
  ).v;
}

const TONES = ["kurumsal ve akıcı", "teknik ve detaylı", "sade ve anlaşılır"];

// Order = default preference. On the free (Pollinations) backend "minimal" and
// "foto" hold up; "3d"/"infografik" need a paid backend to look good.
const IMAGE_STYLES: { v: string; label: string }[] = [
  { v: "minimal", label: "Minimal" },
  { v: "foto", label: "Fotoğraf" },
  { v: "3d", label: "3D render" },
  { v: "editoryal", label: "Editoryal" },
  { v: "vektor", label: "Vektör" },
  { v: "infografik", label: "İnfografik" },
];

type LastRun = {
  score: number;
  rounds: number;
  provider?: string;
  imagePrompts: ArticleDraft["imagePrompts"];
  linkSuggestions: LinkSuggestion[];
  log: string[];
};

export function AiGeneratePanel({
  focusKeyword,
  prefill,
  onApply,
  onSetCover,
  onInsertImage,
}: {
  focusKeyword: string;
  /** Topic-queue prefill; `autoStart` runs generation once on mount. */
  prefill?: {
    topic: string;
    keywords: string;
    angle: string;
    wordCount?: number;
    autoStart: boolean;
    brief?: ContentBrief;
  };
  onApply: (draft: ArticleDraft, focusKeyword?: string) => void;
  /** Set the post cover image from a generated hero image URL. */
  onSetCover?: (url: string) => void;
  /**
   * Insert an inline image (markdown) into the post body under `afterHeading`.
   * `replaceUrl` — when regenerating — is the previous image URL for that slot,
   * whose markdown line should be swapped out instead of stacking a duplicate.
   */
  onInsertImage?: (
    markdown: string,
    afterHeading?: string,
    replaceUrl?: string,
  ) => void;
}) {
  const [open, setOpen] = useState(Boolean(prefill));
  const [topic, setTopic] = useState(prefill?.topic ?? "");
  const [keywords, setKeywords] = useState(prefill?.keywords || focusKeyword);
  const [angle, setAngle] = useState(prefill?.angle ?? "");
  const [audience, setAudience] = useState(prefill?.brief?.audience ?? "");
  const [wordCount, setWordCount] = useState(nearestWordCount(prefill?.wordCount));
  const [tone, setTone] = useState(TONES[0]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [last, setLast] = useState<LastRun | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [imgBusy, setImgBusy] = useState<number | null>(null);
  const [imgDone, setImgDone] = useState<Set<number>>(new Set());
  const [imgUrls, setImgUrls] = useState<Record<number, string>>({});
  const [imgError, setImgError] = useState("");
  const [imgNote, setImgNote] = useState("");
  const [imgStyle, setImgStyle] = useState(IMAGE_STYLES[0].v);

  const run = async () => {
    setBusy(true);
    setError("");
    setLast(null);
    const res = await generateBlogDraft({
      topic: topic.trim(),
      keywords: keywords.trim(),
      angle: angle.trim() || undefined,
      wordCount,
      tone,
      brief: { ...prefill?.brief, audience: audience.trim() || undefined },
    });
    setBusy(false);
    if (res.error || !res.draft) {
      setError(res.error || "Taslak üretilemedi.");
      return;
    }
    onApply(res.draft, res.focusKeyword);
    setImgDone(new Set());
    setImgUrls({});
    setImgError("");
    setLast({
      score: res.score ?? 0,
      rounds: res.rounds ?? 1,
      provider: res.provider,
      imagePrompts: res.draft.imagePrompts,
      linkSuggestions: res.linkSuggestions ?? [],
      log: res.log ?? [],
    });
  };

  // One-click start from the topic queue. Strip the query afterwards so a
  // page refresh can't silently start (and bill) a second generation.
  const autoStarted = useRef(false);
  useEffect(() => {
    if (!prefill?.autoStart || autoStarted.current) return;
    autoStarted.current = true;
    try {
      window.history.replaceState(null, "", window.location.pathname);
    } catch {
      /* ignore */
    }
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  const makeImage = async (
    img: NonNullable<ArticleDraft["imagePrompts"]>[number],
    i: number,
  ) => {
    setImgBusy(i);
    setImgError("");
    setImgNote("");
    const res = await generateBlogImage({
      prompt: img.prompt,
      kind: img.role === "hero" ? "hero" : "inline",
      style: imgStyle,
    });
    setImgBusy(null);
    if (res.error || !res.url) {
      setImgError(res.error || "Görsel üretilemedi.");
      return;
    }
    if (res.note) setImgNote(res.note);
    if (img.role === "hero") {
      onSetCover?.(res.url);
    } else {
      onInsertImage?.(
        `![${img.alt}](${res.url})`,
        img.afterHeading || undefined,
        imgUrls[i], // swap out the previous take on regenerate
      );
    }
    setImgUrls((prev) => ({ ...prev, [i]: res.url! }));
    setImgDone((prev) => new Set(prev).add(i));
  };

  const copyPrompt = async (text: string, i: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  const scoreTone =
    !last || last.score >= 90
      ? "text-emerald-700"
      : last.score >= 75
        ? "text-amber-700"
        : "text-red-700";

  return (
    <div className="rounded-md border border-gold-500/40 bg-gold-50/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-ink-900"
      >
        <span className="flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-gold-600" />
          Konu + anahtar kelimeden yazı üret (AI)
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-3 border-t border-gold-500/30 p-4">
          <p className="text-xs leading-relaxed text-slate-600">
            Konuyu ve hedef aramaları yaz. Sistem SEO kurallarına uygun (giriş
            paragrafı, H2 yapısı, karşılaştırma tablosu, süreç listesi, doğal
            anahtar kelime, dahili linkler, SSS, meta) bir taslak üretir; sonra
            kendi SEO puanını kontrol edip eksikleri kapatır.
          </p>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink-900">
              Konu
            </span>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ör. Kurumlar için sızma testi"
              className="form-input"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink-900">
              Anahtar kelimeler{" "}
              <span className="font-normal text-slate-500">
                (virgülle ayır — ilki odak kelime)
              </span>
            </span>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="ör. sızma testi, pentest hizmeti, penetrasyon testi"
              className="form-input"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink-900">
              Açı / vurgu{" "}
              <span className="font-normal text-slate-500">(isteğe bağlı)</span>
            </span>
            <input
              type="text"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              placeholder="ör. KOBİ'ler için pratik yol haritası"
              className="form-input"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink-900">
              Bölge / sektör açısı{" "}
              <span className="font-normal text-slate-500">(isteğe bağlı)</span>
            </span>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="ör. Kocaeli OSB üretim firmaları"
              className="form-input"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink-900">
                Uzunluk
              </span>
              <select
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="form-input"
              >
                {WORD_COUNTS.map((w) => (
                  <option key={w.v} value={w.v}>
                    {w.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-ink-900">
                Ton
              </span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="form-input"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={run}
            disabled={busy || topic.trim().length < 3}
            className="flex items-center gap-2 rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {busy ? "Yazılıyor… (1–3 dk)" : "Taslak üret"}
          </button>

          {prefill?.brief && Object.values(prefill.brief).some((v) => (Array.isArray(v) ? v.length : v)) && (
            <div className="rounded-sm border border-slate-200 bg-white/70 p-2 text-[11px] leading-snug text-slate-600">
              <p className="mb-0.5 font-medium text-ink-900">Takvim brief&apos;i (AI&apos;ya iletilir)</p>
              {prefill.brief.intent && <p>Niyet: {prefill.brief.intent}</p>}
              {prefill.brief.cluster && <p>Küme: {prefill.brief.cluster}</p>}
              {prefill.brief.slug && <p>Slug: /{prefill.brief.slug}/</p>}
              {prefill.brief.requiredLinks && prefill.brief.requiredLinks.length > 0 && (
                <p>Zorunlu iç linkler: {prefill.brief.requiredLinks.join(", ")}</p>
              )}
              {prefill.brief.format && <p>Format: {prefill.brief.format}</p>}
              {prefill.brief.note && <p>Not: {prefill.brief.note}</p>}
            </div>
          )}

          {error && <p className="text-xs text-red-600">{error}</p>}

          {last && (
            <div className="space-y-2 rounded-sm border border-emerald-500/30 bg-emerald-50/60 p-3">
              <p className="text-xs font-medium text-ink-900">
                Taslak forma aktarıldı ·{" "}
                <span className={scoreTone}>SEO {last.score}/100</span> ·{" "}
                {last.rounds} tur
                {last.provider && (
                  <span className="font-normal text-slate-500">
                    {" "}
                    · {last.provider}
                  </span>
                )}
                <span className="font-normal text-slate-500">
                  {" "}
                  · kapak görselini eklemeyi unutma
                </span>
              </p>
              {last.log.length > 0 && (
                <p className="text-[11px] leading-snug text-slate-500">
                  {last.log.join(" · ")}
                </p>
              )}
              {last.linkSuggestions.length > 0 && (
                <div className="space-y-1">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    İç link önerileri (gerçek sayfalar)
                  </p>
                  <ul className="space-y-1">
                    {last.linkSuggestions.map((l, i) => (
                      <li
                        key={l.slug}
                        className="flex items-start gap-2 rounded-sm bg-white/70 p-1.5 text-[11px] leading-snug text-slate-700"
                      >
                        <span className="min-w-0 flex-1">
                          <a
                            href={`/${l.slug}/`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[#1a0dab] underline underline-offset-2"
                          >
                            /{l.slug}/
                          </a>{" "}
                          — {l.title}
                          {l.inContent ? (
                            <span className="ml-1 rounded-sm bg-emerald-100 px-1 text-emerald-700">
                              yazıda var
                            </span>
                          ) : null}
                          {l.reason && (
                            <span className="block text-slate-400">{l.reason}</span>
                          )}
                        </span>
                        {!l.inContent && (
                          <button
                            type="button"
                            onClick={() =>
                              copyPrompt(`[${l.anchor}](/${l.slug}/)`, 1000 + i)
                            }
                            className="shrink-0 text-slate-400 hover:text-slate-700"
                            aria-label="Markdown linkini kopyala"
                            title="Markdown linkini kopyala"
                          >
                            {copied === 1000 + i ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {last.imagePrompts && last.imagePrompts.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      Görsel önerileri
                    </p>
                    <label className="flex items-center gap-1 text-[11px] text-slate-500">
                      stil:
                      <select
                        value={imgStyle}
                        onChange={(e) => setImgStyle(e.target.value)}
                        disabled={imgBusy !== null}
                        className="rounded-sm border border-slate-300 bg-white px-1 py-0.5 text-[11px]"
                      >
                        {IMAGE_STYLES.map((s) => (
                          <option key={s.v} value={s.v}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  {last.imagePrompts.map((img, i) => (
                    <div
                      key={i}
                      className="rounded-sm bg-white/70 p-2 text-[11px] leading-snug text-slate-700"
                    >
                      <div className="flex items-start gap-2">
                        <span className="shrink-0 rounded-sm bg-slate-200 px-1 font-medium text-slate-600">
                          {img.role === "hero" ? "kapak" : "gövde"}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block">{img.prompt}</span>
                          <span className="mt-0.5 block text-slate-400">
                            alt: {img.alt}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => copyPrompt(img.prompt, i)}
                          className="shrink-0 text-slate-400 hover:text-slate-700"
                          aria-label="Görsel istemini kopyala"
                        >
                          {copied === i ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => makeImage(img, i)}
                        disabled={imgBusy !== null}
                        className="mt-1.5 flex items-center gap-1.5 rounded-sm border border-gold-500/50 bg-gold-50 px-2 py-1 text-[11px] font-medium text-ink-900 disabled:opacity-50"
                      >
                        {imgBusy === i ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : imgDone.has(i) ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <ImagePlus className="h-3 w-3 text-gold-600" />
                        )}
                        {imgBusy === i
                          ? "Üretiliyor…"
                          : imgDone.has(i)
                            ? img.role === "hero"
                              ? "Kapak olarak eklendi"
                              : "Yazıya eklendi"
                            : img.role === "hero"
                              ? "Üret & kapak yap"
                              : "Üret & yazıya ekle"}
                      </button>
                      {imgUrls[i] && (
                        <div className="mt-1.5 flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imgUrls[i]}
                            alt=""
                            className="h-14 w-24 shrink-0 rounded-sm border border-slate-200 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => makeImage(img, i)}
                            disabled={imgBusy !== null}
                            className="text-[11px] text-slate-500 underline underline-offset-2 hover:text-ink-900 disabled:opacity-50"
                          >
                            Beğenmedin mi? Yeniden üret
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {imgError && (
                    <p className="text-[11px] text-red-600">{imgError}</p>
                  )}
                  {imgNote && (
                    <p className="text-[11px] text-amber-700">{imgNote}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
