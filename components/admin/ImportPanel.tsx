"use client";

import { useState } from "react";
import { Loader2, Sparkles, ChevronDown } from "lucide-react";
import { importRemoteImage } from "@/app/admin/actions";
import {
  parseImport,
  replaceImageUrl,
  type ImportedDraft,
} from "@/lib/importArticle";

export type ImportResult = {
  title: string;
  metaTitle: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
};

export function ImportPanel({
  onApply,
}: {
  onApply: (result: ImportResult) => void;
}) {
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState("");
  const [draft, setDraft] = useState<ImportedDraft | null>(null);
  const [rehost, setRehost] = useState(true);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const parse = () => {
    setError("");
    try {
      const d = parseImport(raw);
      if (!d.content.trim()) {
        setError("İçerik bulunamadı. HTML veya Markdown yapıştırdığından emin ol.");
        setDraft(null);
        return;
      }
      setDraft(d);
    } catch {
      setError("Ayrıştırma başarısız. Geçerli bir HTML/Markdown yapıştır.");
    }
  };

  const apply = async () => {
    if (!draft) return;
    setBusy(true);
    setError("");
    let { content, coverImageUrl } = draft;
    const warnings: string[] = [];

    if (rehost && draft.images.length) {
      const unique = Array.from(new Set(draft.images));
      for (let i = 0; i < unique.length; i++) {
        setProgress(`Görsel taşınıyor ${i + 1}/${unique.length}…`);
        const res = await importRemoteImage(unique[i]);
        if (res.url) {
          content = replaceImageUrl(content, unique[i], res.url);
          if (coverImageUrl === unique[i]) coverImageUrl = res.url;
        } else {
          warnings.push(res.error || "bir görsel taşınamadı");
        }
      }
    }

    setProgress("");
    setBusy(false);
    if (warnings.length) {
      setError(
        `${warnings.length} görsel taşınamadı (özgün adres korundu). ${warnings[0]}`,
      );
    }
    onApply({
      title: draft.title,
      metaTitle: draft.metaTitle,
      excerpt: draft.excerpt,
      content,
      coverImageUrl,
    });
    setOpen(false);
    setDraft(null);
    setRaw("");
  };

  return (
    <div className="rounded-md border border-navy-950/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-ink-900"
      >
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold-500" />
          Hazır makale içe aktar (HTML / Markdown)
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-3 border-t border-navy-950/10 p-4">
          <p className="text-xs leading-relaxed text-slate-500">
            AI içerik aracından aldığın HTML veya Markdown çıktısını buraya
            yapıştır. Başlık, özet, kapak görseli ve içerik otomatik ayrıştırılır;
            gövdedeki görseller isteğe bağlı olarak siteye taşınır (üçüncü taraf
            adrese bağımlı kalmazsın).
          </p>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={8}
            placeholder="<h1>…</h1> …  ·  # Başlık …"
            className="form-input resize-y font-mono text-xs"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={parse}
              disabled={!raw.trim() || busy}
              className="rounded-sm bg-navy-950 px-4 py-2 text-sm font-medium text-paper-50 disabled:opacity-40"
            >
              Ayrıştır
            </button>
            <label className="flex items-center gap-2 text-xs text-ink-900">
              <input
                type="checkbox"
                checked={rehost}
                onChange={(e) => setRehost(e.target.checked)}
              />
              Görselleri siteye taşı (önerilir)
            </label>
          </div>

          {draft && (
            <div className="space-y-2 rounded-sm border border-navy-950/10 bg-slate-50 p-3 text-xs">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600">
                <span>Biçim: {draft.format === "html" ? "HTML" : "Markdown"}</span>
                <span>{draft.wordCount} kelime</span>
                <span>{draft.images.length} görsel</span>
                {draft.hasFaq && (
                  <span className="text-emerald-600">SSS bölümü bulundu</span>
                )}
              </div>
              <div className="text-ink-900">
                <span className="font-medium">Başlık:</span>{" "}
                {draft.title || "—"}
              </div>
              <div className="text-slate-600">
                <span className="font-medium text-ink-900">Özet:</span>{" "}
                {draft.excerpt || "—"}
              </div>
              {draft.coverImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={draft.coverImageUrl}
                  alt=""
                  className="h-24 w-auto rounded-sm border border-navy-950/10 object-cover"
                />
              )}
              <button
                type="button"
                onClick={apply}
                disabled={busy}
                className="mt-1 flex items-center gap-2 rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 disabled:opacity-50"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {busy ? progress || "Aktarılıyor…" : "Forma aktar"}
              </button>
            </div>
          )}

          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
