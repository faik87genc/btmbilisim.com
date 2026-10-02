"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownField({
  name,
  defaultValue = "",
  rows = 16,
  value: controlledValue,
  onValueChange,
}: {
  name: string;
  defaultValue?: string;
  rows?: number;
  /** Controlled mode: when provided (with `onValueChange`), the parent owns the value. */
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlledValue !== undefined && !!onValueChange;
  const value = isControlled ? controlledValue! : internal;

  const setValue = (next: string) => {
    if (isControlled) onValueChange!(next);
    else setInternal(next);
  };

  const [tab, setTab] = useState<"write" | "preview">("write");

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("write")}
          className={`rounded-sm px-3 py-1.5 text-sm ${
            tab === "write" ? "bg-navy-950 text-paper-50" : "bg-navy-950/5 text-ink-900"
          }`}
        >
          Yaz
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={`rounded-sm px-3 py-1.5 text-sm ${
            tab === "preview" ? "bg-navy-950 text-paper-50" : "bg-navy-950/5 text-ink-900"
          }`}
        >
          Önizle
        </button>
      </div>

      {tab === "write" ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={rows}
          className="form-input resize-y font-mono text-sm"
          placeholder="Markdown ile yazın: **kalın**, ## Başlık, - liste madde..."
        />
      ) : (
        <>
          <textarea name={name} value={value} readOnly hidden />
          <div className="prose-sm min-h-[200px] rounded-sm border border-navy-950/15 bg-white p-4">
            <article className="space-y-3 text-sm leading-relaxed text-ink-900 [&_h1]:font-display [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-gold-700 [&_a]:underline">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {value || "*Önizlemek için yazmaya başlayın.*"}
              </ReactMarkdown>
            </article>
          </div>
        </>
      )}
    </div>
  );
}
