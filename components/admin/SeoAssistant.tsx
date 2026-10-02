"use client";

import { useMemo } from "react";
import {
  Loader2,
  Wand2,
  ImagePlus,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import {
  analyzeBlogPost,
  isWriterFixable,
  NON_WRITER_CHECK_IDS,
  QUALITY_GATE_CHECK_IDS,
  type BlogSeoInput,
  type CheckStatus,
  type SeoAnalysis,
} from "@/lib/seo/analyzeBlogPost";
import { site } from "@/lib/site";

const TITLE_SUFFIX = site.titleSuffix;
const BASE_URL = site.baseUrl;

const STATUS_DOT: Record<CheckStatus, string> = {
  good: "bg-emerald-500",
  warn: "bg-amber-500",
  bad: "bg-red-500",
  na: "bg-slate-300",
};

const GROUP_LABEL: Record<string, string> = {
  meta: "Meta & URL",
  content: "İçerik",
  links: "Linkler & Görseller",
  taxonomy: "Taksonomi & çakışma",
};

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 55) return "text-amber-600";
  return "text-red-600";
}

function scoreRing(score: number): string {
  if (score >= 80) return "#059669";
  if (score >= 55) return "#d97706";
  return "#dc2626";
}

export function SeoAssistant({
  input,
  analysis: precomputed,
  onImprove,
  busy = false,
  /** URL segment shown in the SERP preview — "" (flat /slug/) for posts and pages alike. */
  pathPrefix = "",
}: {
  input: BlogSeoInput;
  /** Pass when the parent already ran the analysis (avoids a second pass per keystroke). */
  analysis?: SeoAnalysis;
  /** Called with the failing check descriptions so AI can target them. */
  onImprove?: (failing: string[]) => void;
  busy?: boolean;
  pathPrefix?: string;
}) {
  const analysis = useMemo(
    () => precomputed ?? analyzeBlogPost({ ...input, titleSuffix: TITLE_SUFFIX }),
    [precomputed, input],
  );
  const { score, checks, stats } = analysis;

  const failingChecks = checks.filter(
    (c) => c.status === "bad" || c.status === "warn",
  );
  // Only checks a rewrite can actually fix go to the AI. Cover / OG / in-content
  // image checks need a real uploaded image — surfaced separately below.
  const writerFailing = failingChecks
    .filter((c) => isWriterFixable(c.id))
    .sort((a, b) => Number(b.status === "bad") - Number(a.status === "bad"))
    .map((c) => (c.detail ? `${c.label} — ${c.detail}` : c.label));
  const policy = checks.filter((c) => c.group === "compliance");
  const policyIssues = policy.filter((c) => c.status === "bad" || c.status === "warn");
  const assetFailing = failingChecks.filter((c) =>
    NON_WRITER_CHECK_IDS.has(c.id),
  );
  // Pre-publish quality gate (money-page links, thin content, cannibalisation).
  const gate = checks.filter(
    (c) => QUALITY_GATE_CHECK_IDS.includes(c.id) && c.status !== "na",
  );
  const gateIssues = gate.filter((c) => c.status === "bad" || c.status === "warn");
  const gateRed = gateIssues.some((c) => c.status === "bad");

  const serpTitle = stats.effectiveTitle || "Sayfa başlığı gelir…";
  const serpDesc =
    stats.effectiveDescription ||
    "Meta açıklama / özet buraya gelir. Aramada bu metin görünür.";
  const serpUrl = pathPrefix
    ? `${BASE_URL} › ${pathPrefix} › ${input.slug || "yazi-url"}`
    : `${BASE_URL} › ${input.slug || "sayfa-url"}`;

  const groups = ["meta", "content", "links", "taxonomy"] as const;
  const dash = 2 * Math.PI * 26;
  const filled = (score / 100) * dash;

  return (
    <div className="space-y-5 rounded-md border border-navy-950/10 bg-white p-4">
      {/* Score */}
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke={scoreRing(score)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${dash}`}
          />
        </svg>
        <div>
          <div className={`text-2xl font-bold ${scoreColor(score)}`}>
            {score}
            <span className="text-base font-medium text-slate-400">/100</span>
          </div>
          <div className="text-xs text-slate-500">
            SEO hazırlık puanı · {stats.wordCount} kelime ·{" "}
            {stats.readingTimeMin} dk okuma
          </div>
        </div>
      </div>

      {onImprove && writerFailing.length > 0 && stats.wordCount > 50 && (
        <button
          type="button"
          onClick={() => onImprove(writerFailing)}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-sm border border-gold-500/50 bg-gold-50 px-3 py-2 text-xs font-medium text-ink-900 disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Wand2 className="h-3.5 w-3.5 text-gold-600" />
          )}
          {busy
            ? "İyileştiriliyor…"
            : `AI ile ${writerFailing.length} metin eksiğini gider`}
        </button>
      )}

      {/* Pre-publish quality gate: warns, never blocks */}
      {gateIssues.length > 0 ? (
        <div
          className={`space-y-2 rounded-sm border px-3 py-2.5 ${
            gateRed ? "border-red-300 bg-red-50" : "border-amber-400/50 bg-amber-50"
          }`}
        >
          <p
            className={`flex items-center gap-1.5 text-xs font-semibold ${
              gateRed ? "text-red-800" : "text-amber-800"
            }`}
          >
            <TriangleAlert className="h-3.5 w-3.5" />
            Yayın öncesi kalite — {gateIssues.length} uyarı
          </p>
          <ul className="space-y-1.5 text-[11px] leading-snug">
            {gateIssues.map((c) => (
              <li key={c.id} className="flex gap-2">
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[c.status]}`}
                  aria-hidden="true"
                />
                <span>
                  <span className="font-medium text-ink-900">{c.label}</span>
                  {c.detail && <span className="text-slate-600"> — {c.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        gate.length > 0 && (
          <p className="flex items-center gap-1.5 rounded-sm border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            Yayın öncesi kalite temiz (hizmet sayfası linkleri, içerik derinliği, çakışma).
          </p>
        )
      )}

      {assetFailing.length > 0 && (
        <div className="space-y-1.5 rounded-sm border border-amber-400/50 bg-amber-50 px-3 py-2.5">
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-900">
            <ImagePlus className="h-3.5 w-3.5 text-amber-600" />
            {assetFailing.length} madde görsel gerektiriyor — AI metinle çözemez
          </p>
          <ul className="ml-1 space-y-0.5 text-[11px] leading-snug text-slate-600">
            {assetFailing.map((c) => (
              <li key={c.id}>• {c.label}</li>
            ))}
          </ul>
          <p className="text-[11px] leading-snug text-slate-500">
            Kapak görselini aşağıdaki “Kapak görseli” alanına yükle. Hazır görsel
            önerileri “Taslak üret” panelinde — tek tıkla üretip
            ekleyebilirsin.
          </p>
        </div>
      )}

      {/* Content-policy scan: warns, never blocks */}
      {policyIssues.length > 0 ? (
        <div className="space-y-2 rounded-sm border border-red-300 bg-red-50 px-3 py-2.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-red-800">
            <ShieldAlert className="h-3.5 w-3.5" />
            İçerik kuralları — {policyIssues.filter((c) => c.status === "bad").length} kırmızı,{" "}
            {policyIssues.filter((c) => c.status === "warn").length} sarı
          </p>
          <ul className="space-y-1.5 text-[11px] leading-snug">
            {policyIssues.map((c) => (
              <li key={c.id} className="flex gap-2">
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[c.status]}`}
                  aria-hidden="true"
                />
                <span>
                  <span className="font-medium text-ink-900">{c.label}</span>
                  {c.detail && <span className="text-slate-600"> — {c.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-slate-500">
            Yayını engellemez. Bulunan ifadeyi cümle olarak yeniden yaz; eğitim
            amaçlı genel anlatımsa bilerek bırakabilirsin.
          </p>
        </div>
      ) : (
        <p className="flex items-center gap-1.5 rounded-sm border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          <ShieldCheck className="h-3.5 w-3.5" />
          İçerik kuralları taraması temiz (vaat, unvan, TÜRKAK/TSE, vishing, atıflar).
        </p>
      )}

      {/* Google SERP preview */}
      <div>
        <div className="mb-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
          Google önizleme
        </div>
        <div className="rounded-sm border border-navy-950/10 bg-slate-50 p-3">
          <div className="truncate text-xs text-slate-600">{serpUrl}</div>
          <div className="truncate text-[15px] leading-tight text-[#1a0dab]">
            {serpTitle}
          </div>
          <div className="mt-0.5 line-clamp-2 text-xs leading-snug text-slate-700">
            {serpDesc}
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-4">
        {groups.map((g) => {
          const items = checks.filter((c) => c.group === g);
          if (!items.length) return null;
          return (
            <div key={g}>
              <div className="mb-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                {GROUP_LABEL[g]}
              </div>
              <ul className="space-y-1.5">
                {items.map((c) => (
                  <li key={c.id} className="flex gap-2 text-xs">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[c.status]}`}
                      aria-hidden="true"
                    />
                    <span>
                      <span
                        className={
                          c.status === "na"
                            ? "text-slate-400"
                            : "font-medium text-ink-900"
                        }
                      >
                        {c.label}
                      </span>
                      {c.detail && c.status !== "good" && (
                        <span className="text-slate-500"> — {c.detail}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] leading-relaxed text-slate-400">
        Puan bir rehberdir, garanti değil. Önce “bad” (kırmızı) maddeleri
        kapat, sonra sarıları. Anahtar kelimeyi doğal kullan — okuyucu için yaz.
      </p>
    </div>
  );
}
