"use client";

import { useState } from "react";
import { Loader2, Upload, Check, X } from "lucide-react";
import { uploadImage } from "@/app/admin/actions";

export function ImageUploadField({
  name,
  defaultValue = "",
  value: controlledValue,
  onChange,
}: {
  name: string;
  defaultValue?: string;
  /** Controlled mode: when provided, the parent owns the URL. */
  value?: string;
  /** Fires with the new URL after an upload, an import, or a clear. */
  onChange?: (url: string) => void;
}) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const url = isControlled ? controlledValue : internal;

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const update = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handleFile = async (file: File) => {
    setStatus("loading");
    setError("");
    // Checked here too: an oversized body is rejected before the action runs,
    // so the action's own size message would never arrive.
    if (file.size > 4 * 1024 * 1024) {
      setError("Görsel en fazla 4 MB olabilir. Daha küçük bir dosya seçin.");
      setStatus("error");
      return;
    }
    const formData = new FormData();
    formData.set("file", file);
    let result: Awaited<ReturnType<typeof uploadImage>>;
    try {
      result = await uploadImage(formData);
    } catch {
      setError("Görsel yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin.");
      setStatus("error");
      return;
    }
    if (result.error) {
      setError(result.error);
      setStatus("error");
      return;
    }
    update(result.url ?? "");
    setStatus("idle");
  };

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-3">
        <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-navy-950/15 bg-white px-4 py-2 text-sm text-ink-900 transition-colors hover:border-gold-500/50">
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Görsel Yükle
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
        {url && (
          <>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Check className="h-3.5 w-3.5 text-gold-500" /> Yüklendi
            </span>
            <button
              type="button"
              onClick={() => update("")}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-600"
            >
              <X className="h-3.5 w-3.5" /> Kaldır
            </button>
          </>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          className="mt-3 h-32 w-auto rounded-sm border border-navy-950/10 object-cover"
        />
      )}
    </div>
  );
}
