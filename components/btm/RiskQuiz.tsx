"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

// "Bilgi Güvenliği Risk Skoru" self-check: 8 yes/partly/no questions, scored
// in the browser (nothing is sent anywhere). Each weak answer points to the
// service that closes that gap. It is an awareness tool, not an audit — the
// result text says so.

type Answer = 0 | 1 | 2; // 0 = evet, 1 = kısmen, 2 = hayır / bilmiyorum

const QUESTIONS: { q: string; hint: string; fix: { label: string; href: string } }[] = [
  {
    q: "Verileriniz düzenli yedekleniyor ve yedekten geri dönüş test ediliyor mu?",
    hint: "En az bir kopya farklı bir ortamda, bir kopya şirket dışında (3-2-1).",
    fix: { label: "Veri Yedekleme Çözümleri", href: "/bulut-yedekleme/veri-yedekleme-cozumleri/" },
  },
  {
    q: "Güvenlik duvarınız (firewall) güncel ve kuralları düzenli gözden geçiriliyor mu?",
    hint: "Varsayılan ayarlarla bırakılmış ya da kimsenin yönetmediği cihazlar risklidir.",
    fix: { label: "Firewall ve Ağ Güvenliği", href: "/siber-guvenlik/firewall-ve-ag-guvenligi/" },
  },
  {
    q: "Tüm bilgisayar ve sunucularda merkezi yönetilen antivirüs / EDR var mı?",
    hint: "Tek tek kurulmuş, lisansı biten veya izlenmeyen koruma yeterli değildir.",
    fix: { label: "EDR / Antivirüs Çözümleri", href: "/siber-guvenlik/edr-antivirus-cozumleri/" },
  },
  {
    q: "İşletim sistemi ve yazılım güncellemeleri düzenli olarak yapılıyor mu?",
    hint: "Desteği bitmiş sürümler (ör. eski Windows) yama almaz.",
    fix: { label: "IT Bakım ve Destek Hizmetleri", href: "/sistem-network/it-bakim-ve-destek-hizmetleri/" },
  },
  {
    q: "E-posta ve uzaktan erişim gibi kritik hesaplarda çok faktörlü doğrulama (MFA) açık mı?",
    hint: "Ele geçirilen şifrelerin çoğu MFA ile işe yaramaz hâle gelir.",
    fix: { label: "Microsoft 365 Çözümleri", href: "/bulut-yedekleme/microsoft-365-cozumleri/" },
  },
  {
    q: "Son 12 ayda sızma testi veya zafiyet taraması yaptırdınız mı?",
    hint: "Açıkları saldırganlardan önce görmenin yolu düzenli testtir.",
    fix: { label: "Sızma Testi (Penetrasyon Testi)", href: "/siber-guvenlik/sizma-testi-penetrasyon-testi/" },
  },
  {
    q: "Çalışanlarınıza oltalama (phishing) ve güvenlik farkındalığı eğitimi verildi mi?",
    hint: "Saldırıların önemli bir kısmı tek bir yanlış tıklamayla başlar.",
    fix: { label: "Siber Güvenlik Danışmanlığı", href: "/siber-guvenlik/siber-guvenlik-danismanligi/" },
  },
  {
    q: "KVKK kapsamında kişisel veri envanteriniz ve aydınlatma metinleriniz hazır mı?",
    hint: "Veri ihlalinde idari para cezası riski de doğar.",
    fix: { label: "KVKK Danışmanlığı", href: "/danismanlik/kvkk-danismanligi/" },
  },
];

const CHOICES: { value: Answer; label: string }[] = [
  { value: 0, label: "Evet" },
  { value: 1, label: "Kısmen" },
  { value: 2, label: "Hayır / Bilmiyorum" },
];

function band(score: number) {
  if (score <= 25)
    return {
      label: "Düşük risk",
      icon: ShieldCheck,
      tone: "text-navy-800 bg-paper-100 ring-navy-800/20",
      text: "Temel önlemleriniz büyük ölçüde yerinde. Düzenli test ve bakımla bu seviyeyi koruyabilirsiniz.",
    };
  if (score <= 55)
    return {
      label: "Orta risk",
      icon: ShieldQuestion,
      tone: "text-gold-800 bg-gold-100 ring-gold-500/30",
      text: "Bazı önemli açıklar var. Aşağıdaki başlıklar öncelikli olarak ele alınmalı.",
    };
  return {
    label: "Yüksek risk",
    icon: ShieldAlert,
    tone: "text-red-700 bg-red-50 ring-red-600/20",
    text: "Kritik önlemlerin birçoğu eksik görünüyor. Bir saldırı veya veri kaybı iş sürekliliğinizi doğrudan etkileyebilir.",
  };
}

export function RiskQuiz() {
  const [answers, setAnswers] = useState<(Answer | null)[]>(() => QUESTIONS.map(() => null));
  const [done, setDone] = useState(false);
  const [missing, setMissing] = useState<number[]>([]);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const restarted = useRef(false);

  // Move focus with the view change (the form/result swap would otherwise drop it to <body>).
  useEffect(() => {
    if (done) resultHeading.current?.focus();
    else if (restarted.current) formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, [done]);
  const answered = answers.filter((a) => a !== null).length;

  const score = Math.round((answers.reduce<number>((s, a) => s + (a ?? 2), 0) / (QUESTIONS.length * 2)) * 100);
  const result = band(score);
  const gaps = QUESTIONS.filter((_, i) => (answers[i] ?? 2) > 0);

  if (done) {
    return (
      <div className="card-v2 p-6 md:p-8">
        <h2 ref={resultHeading} tabIndex={-1} className="mb-5 font-display text-2xl font-bold tracking-[-0.02em] text-navy-950 outline-none">
          Risk skorunuz: {score} / 100
        </h2>
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-paper-100">
            <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--paper-100)" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke={score > 55 ? "#b42318" : score > 25 ? "var(--gold-600)" : "var(--navy-800)"}
                strokeWidth="3"
                strokeDasharray={`${(score / 100) * 97.4} 97.4`}
                strokeLinecap="round"
              />
            </svg>
            <span className="font-display text-3xl font-semibold text-ink-900">{score}</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className={`inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1 text-sm font-semibold ring-1 ${result.tone}`}>
              <result.icon className="h-4 w-4" aria-hidden="true" /> {result.label}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{result.text}</p>
            <p className="mt-1 text-xs text-slate-500">
              Skor 0–100 arasıdır; yüksek skor yüksek risk demektir. Bu test farkındalık amaçlıdır, denetim yerine geçmez.
            </p>
          </div>
        </div>

        {gaps.length > 0 && (
          <div className="mt-7">
            <h3 className="font-display text-lg font-semibold text-ink-900">Öncelikli başlıklar</h3>
            <ul className="mt-3 divide-y divide-navy-950/5">
              {gaps.map((g) => (
                <li key={g.q} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <span className="text-sm text-slate-600">{g.q}</span>
                  <Link href={g.fix.href} className="inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-navy-950">
                    {g.fix.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/#teklif"
            className="press inline-flex h-12 items-center gap-2 rounded-[10px] bg-gold-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-700"
          >
            Ücretsiz keşif talep edin <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => {
              restarted.current = true;
              setAnswers(QUESTIONS.map(() => null));
              setMissing([]);
              setDone(false);
            }}
            className="press inline-flex h-12 items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-6 text-sm font-semibold text-navy-950 transition-colors hover:border-gold-600/40"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Testi tekrarla
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      className="card-v2 p-6 md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const empty = answers.flatMap((a, i) => (a === null ? [i] : []));
        setMissing(empty);
        if (empty.length) {
          formRef.current?.querySelector<HTMLInputElement>(`input[name="q${empty[0]}"]`)?.focus();
          return;
        }
        setDone(true);
      }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold tabular-nums text-navy-950">
          {answered} / {QUESTIONS.length} soru yanıtlandı
        </span>
        <span className="h-2 w-40 overflow-hidden rounded-full bg-paper-100" aria-hidden="true">
          <span className="block h-full rounded-full bg-gold-600 transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} />
        </span>
      </div>
      <ol className="space-y-6">
        {QUESTIONS.map((item, i) => (
          <li key={item.q}>
            <fieldset aria-describedby={`q${i}-hint`}>
              <legend className="font-display text-base font-semibold text-ink-900">
                <span className="mr-2 text-gold-600">{i + 1}.</span>
                {item.q}
              </legend>
              <p id={`q${i}-hint`} className="mt-1 text-xs text-slate-500">
                {item.hint}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHOICES.map((c) => (
                  <label
                    key={c.value}
                    className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-4 py-2 text-sm text-ink-900 transition-colors hover:border-gold-600/40 has-[:checked]:border-gold-600 has-[:checked]:bg-gold-600 has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy-800"
                  >
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={c.value}
                     
                      className="sr-only"
                      checked={answers[i] === c.value}
                      onChange={() => setAnswers((a) => a.map((v, j) => (j === i ? c.value : v)))}
                    />
                    {answers[i] === c.value && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                    {c.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      {missing.length > 0 && (
        <p role="alert" className="mt-6 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-[#B42318]">
          Lütfen şu soruları yanıtlayın: {missing.map((i) => i + 1).join(", ")}.
        </p>
      )}
      <button
        type="submit"
        className="press mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-gold-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-700 sm:w-auto"
      >
        Risk skorumu hesapla <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="mt-3 text-xs text-slate-500">Yanıtlarınız yalnızca tarayıcınızda değerlendirilir; hiçbir yere gönderilmez.</p>
    </form>
  );
}
