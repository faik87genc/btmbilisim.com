"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Wand2, Upload, Check, RotateCcw } from "lucide-react";
import { draftUrl, parseTopicCsv, type TopicRow } from "@/lib/topicQueue";
import { slugifyTr } from "@/lib/slug";

const CSV_KEY = "iso27001_admin_topic_csv";
const DONE_KEY = "iso27001_admin_topic_done";

function load(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
function save(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode / quota — the queue still works for this session */
  }
}

function todayTr(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Istanbul" });
}

const rowKey = (r: TopicRow) => r.slug || slugifyTr(r.title);

/**
 * Topic queue: paste or pick the content-calendar CSV (kept only in this
 * browser), see what's due, and start an AI draft for a row with one click.
 * Nothing here writes to the database.
 */
export function TopicQueue({
  existing,
}: {
  existing: { slug: string; title: string; published: boolean }[];
}) {
  const [csv, setCsv] = useState("");
  const [done, setDone] = useState<Set<string>>(new Set());
  const [showDone, setShowDone] = useState(false);
  const [editing, setEditing] = useState(false);

  // localStorage is browser-only: hydrate after mount.
  useEffect(() => {
    const c = load(CSV_KEY);
    const d = load(DONE_KEY);
    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from localStorage */
    setCsv(c);
    setEditing(!c);
    setDone(new Set(d ? d.split("\n").filter(Boolean) : []));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const parsed = useMemo(() => (csv ? parseTopicCsv(csv) : { rows: [] as TopicRow[] }), [csv]);
  const bySlug = useMemo(() => new Map(existing.map((e) => [e.slug, e])), [existing]);
  const today = todayTr();

  const rows = parsed.rows.filter((r) => showDone || !done.has(rowKey(r)));
  const nextDue = parsed.rows.find((r) => !done.has(rowKey(r)) && !bySlug.has(r.slug));

  const toggleDone = (r: TopicRow) => {
    const next = new Set(done);
    const k = rowKey(r);
    if (next.has(k)) next.delete(k);
    else next.add(k);
    setDone(next);
    save(DONE_KEY, [...next].join("\n"));
  };

  const onFile = (f: File | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      setCsv(text);
      save(CSV_KEY, text);
      setEditing(false);
    };
    reader.readAsText(f, "utf-8");
  };

  return (
    <div className="space-y-5">
      {editing ? (
        <div className="space-y-2 rounded-md border border-navy-950/10 bg-white p-4">
          <p className="text-sm text-slate-600">
            İçerik takvimi CSV&apos;sini seç veya yapıştır (<code>;</code> ayraçlı; sütunlar:
            No;Tarih;Baslik;Hedef anahtar kelime;Arama niyeti;Kume;Onerilen slug;Baglanacak
            mevcut ic sayfalar;Format;Oncelik;Not). Dosya sadece bu tarayıcıda saklanır.
          </p>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-navy-950/15 px-3 py-1.5 text-sm">
            <Upload className="h-4 w-4" /> CSV dosyası seç
            <input
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </label>
          <textarea
            rows={6}
            className="form-input font-mono text-xs"
            placeholder="…veya CSV içeriğini buraya yapıştır"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              save(CSV_KEY, csv);
              setEditing(false);
            }}
            disabled={!csv.trim()}
            className="rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950 disabled:opacity-50"
          >
            Kuyruğu yükle
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-slate-600">
            {parsed.rows.length} konu · {done.size} tamamlandı
          </span>
          <button type="button" onClick={() => setEditing(true)} className="underline underline-offset-2">
            CSV&apos;yi değiştir
          </button>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
            Tamamlananları da göster
          </label>
        </div>
      )}

      {parsed.error && <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">{parsed.error}</p>}

      {nextDue && !editing && (
        <div className="rounded-md border border-gold-500/50 bg-gold-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Sıradaki konu</p>
          <p className="mt-1 font-semibold text-ink-900">{nextDue.title}</p>
          <p className="text-xs text-slate-600">
            {nextDue.date} · {nextDue.keyword} · {nextDue.intent}
          </p>
          <Link
            href={draftUrl(nextDue, true)}
            className="mt-3 inline-flex items-center gap-2 rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-navy-950"
          >
            <Wand2 className="h-4 w-4" /> Taslağı başlat (AI)
          </Link>
        </div>
      )}

      {rows.length > 0 && (
        <div className="overflow-x-auto rounded-md border border-navy-950/10 bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2">Tarih</th>
                <th className="px-3 py-2">Başlık / anahtar kelime</th>
                <th className="px-3 py-2">Durum</th>
                <th className="px-3 py-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const k = rowKey(r);
                const taken = r.slug ? bySlug.get(r.slug) : undefined;
                const isDone = done.has(k);
                return (
                  <tr key={`${r.no}-${k}`} className="border-t border-navy-950/5 align-top">
                    <td className={`whitespace-nowrap px-3 py-2 ${r.date === today ? "font-semibold text-gold-600" : ""}`}>
                      {r.date || r.no}
                      {r.priority && <span className="ml-1 text-slate-400">{r.priority}</span>}
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-medium text-ink-900">{r.title}</div>
                      <div className="text-slate-500">
                        {r.keyword}
                        {r.cluster && ` · ${r.cluster}`}
                        {r.slug && <span className="font-mono"> · /{r.slug}/</span>}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      {taken ? (
                        <span className="rounded-sm bg-amber-100 px-1.5 py-0.5 text-amber-800">
                          URL {taken.published ? "yayında" : "taslakta"}
                        </span>
                      ) : isDone ? (
                        <span className="rounded-sm bg-emerald-100 px-1.5 py-0.5 text-emerald-800">tamam</span>
                      ) : (
                        <span className="text-slate-400">bekliyor</span>
                      )}
                    </td>
                    <td className="space-x-2 whitespace-nowrap px-3 py-2">
                      <Link href={draftUrl(r, true)} className="inline-flex items-center gap-1 text-gold-600 underline underline-offset-2">
                        <Wand2 className="h-3.5 w-3.5" /> Başlat
                      </Link>
                      <Link href={draftUrl(r, false)} className="text-slate-500 underline underline-offset-2">
                        Doldur
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleDone(r)}
                        className="inline-flex items-center gap-1 text-slate-500"
                        aria-label={isDone ? "Tamamlandı işaretini kaldır" : "Tamamlandı olarak işaretle"}
                      >
                        {isDone ? <RotateCcw className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
