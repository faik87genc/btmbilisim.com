"use client";

import { useState } from "react";
import {
  Loader2,
  Newspaper,
  ChevronDown,
  ImagePlus,
  Check,
} from "lucide-react";
import { generateNewsDraft, generateBlogImage } from "@/app/admin/actions";
import type { NewsDraft } from "@/lib/ai/newsDraft";

export type NewsApplyResult = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  excerpt: string;
  tags: string[];
  content: string;
};

function toApply(d: NewsDraft): NewsApplyResult {
  return {
    title: d.title,
    metaTitle: d.metaTitle,
    metaDescription: d.metaDescription,
    slug: d.slug,
    excerpt: d.excerpt,
    tags: d.tags,
    content: d.content,
  };
}

export function NewsRewritePanel({
  onApply,
  onSetCover,
}: {
  onApply: (result: NewsApplyResult) => void;
  onSetCover?: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<NewsDraft | null>(null);
  const [meta, setMeta] = useState<{ sourceName?: string; chars?: number }>({});
  const [imgBusy, setImgBusy] = useState(false);
  const [imgDone, setImgDone] = useState(false);
  const [imgNote, setImgNote] = useState("");

  const run = async () => {
    setBusy(true);
    setError("");
    setDraft(null);
    setImgDone(false);
    setImgNote("");
    const res = await generateNewsDraft({
      url: url.trim() || undefined,
      sourceText: url.trim() ? undefined : text.trim() || undefined,
      sourceName: sourceName.trim() || undefined,
    });
    setBusy(false);
    if (res.error || !res.draft) {
      setError(res.error || "Haber yeniden yazılamadı.");
      return;
    }
    setDraft(res.draft);
    setMeta({ sourceName: res.sourceName, chars: res.sourceChars });
  };

  const apply = () => {
    if (!draft) return;
    onApply(toApply(draft));
    setOpen(false);
  };

  const makeCover = async () => {
    if (!draft) return;
    setImgBusy(true);
    setImgNote("");
    const res = await generateBlogImage({
      prompt: draft.heroImagePrompt,
      kind: "hero",
      style: "foto",
    });
    setImgBusy(false);
    if (res.error || !res.url) {
      setImgNote(res.error || "Kapak üretilemedi.");
      return;
    }
    if (res.note) setImgNote(res.note);
    onSetCover?.(res.url);
    setImgDone(true);
  };

  const canRun = !busy && (url.trim().length > 8 || text.trim().length > 200);

  return (
    <div className="rounded-md border border-navy-950/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-ink-900"
      >
        <span className="flex items-center gap-2">
          <Newspaper className="h-4 w-4 text-gold-500" />
          Haber kaynağından özgün haber üret (AI)
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-3 border-t border-navy-950/10 p-4">
          <p className="text-xs leading-relaxed text-slate-500">
            Bir haber adresi ver (KVKK Kurumu, BTK, Resmî Gazete, TSE…) ya da
            haber metnini yapıştır. AI, bilgiyi alıp <strong>kısa ve özgün</strong>{" "}
            bir haber olarak yeniden yazar; sonuna kaynak atfı ekler. Yayınlamadan
            önce tarih/tutar gibi bilgileri kontrol et.
          </p>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink-900">
              Haber URL&apos;si
            </span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.kvkk.gov.tr/Icerik/…"
              className="form-input"
            />
          </label>

          <div className="text-center text-[11px] uppercase tracking-wider text-slate-400">
            — veya —
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink-900">
              Haber metnini yapıştır{" "}
              <span className="font-normal text-slate-500">
                (URL çekilemezse)
              </span>
            </span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={7}
              disabled={url.trim().length > 0}
              placeholder="Haberin tam metnini buraya yapıştır…"
              className="form-input resize-y text-xs disabled:opacity-50"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-ink-900">
              Kaynak adı{" "}
              <span className="font-normal text-slate-500">
                (isteğe bağlı — atıf satırında kullanılır)
              </span>
            </span>
            <input
              type="text"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="ör. KVKK Kurumu"
              className="form-input"
            />
          </label>

          <button
            type="button"
            onClick={run}
            disabled={!canRun}
            className="flex items-center gap-2 rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {busy ? "Yeniden yazılıyor…" : "Getir & yeniden yaz"}
          </button>

          {error && <p className="text-xs text-red-600">{error}</p>}

          {draft && (
            <div className="space-y-2 rounded-sm border border-emerald-500/30 bg-emerald-50/60 p-3 text-xs">
              <p className="font-medium text-ink-900">
                Özgün haber hazır
                {meta.sourceName && (
                  <span className="font-normal text-slate-500">
                    {" "}
                    · kaynak: {meta.sourceName}
                  </span>
                )}
                {meta.chars ? (
                  <span className="font-normal text-slate-500">
                    {" "}
                    · {meta.chars.toLocaleString("tr-TR")} karakter işlendi
                  </span>
                ) : null}
              </p>
              <div className="text-ink-900">
                <span className="font-medium">Başlık:</span> {draft.title}
              </div>
              <div className="text-slate-600">
                <span className="font-medium text-ink-900">Özet:</span>{" "}
                {draft.excerpt}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {draft.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-navy-950/5 px-2 py-0.5 text-[11px] text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={apply}
                  className="rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950"
                >
                  Forma aktar
                </button>
                {onSetCover && (
                  <button
                    type="button"
                    onClick={makeCover}
                    disabled={imgBusy}
                    className="flex items-center gap-1.5 rounded-sm border border-gold-500/50 bg-gold-50 px-3 py-2 text-xs font-medium text-ink-900 disabled:opacity-50"
                  >
                    {imgBusy ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : imgDone ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <ImagePlus className="h-3.5 w-3.5 text-gold-600" />
                    )}
                    {imgBusy
                      ? "Üretiliyor…"
                      : imgDone
                        ? "Kapak eklendi"
                        : "Kapak görseli üret"}
                  </button>
                )}
              </div>
              {imgNote && <p className="text-[11px] text-amber-700">{imgNote}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
