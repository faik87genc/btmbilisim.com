import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Cpu,
  Eye,
  Fish,
  Gauge,
  LockKeyhole,
  MailWarning,
  MonitorCheck,
  Quote,
  ScanSearch,
  Server,
  ShieldCheck,
  Usb,
  Users,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { liveTestimonials, references } from "@/lib/data/trust";

// Home/landing sections modelled on invekor.com.tr, filled with BTM's own
// services. Testimonials and references render nothing until real entries
// exist in lib/data/trust.ts.

function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        tone === "dark" ? "bg-white/10 text-gold-300 ring-1 ring-white/15" : "bg-gold-500/10 text-gold-700 ring-1 ring-gold-500/25"
      }`}
    >
      {children}
    </span>
  );
}

const SHOWCASE = [
  {
    icon: LockKeyhole,
    title: "DLP (Veri Kaybı Önleme)",
    text: "Şirket içi hassas dosyaların, müşteri verilerinin ve ticari bilgilerin kurum dışına izinsiz çıkışını engelleyin; KVKK uyumunuzu teknik olarak destekleyin.",
    chips: [
      { icon: ShieldCheck, label: "KVKK uyumu" },
      { icon: ScanSearch, label: "Hassas veri keşfi" },
      { icon: Usb, label: "USB & web kontrolü" },
      { icon: Ban, label: "Ekran görüntüsü kısıtlama" },
    ],
    href: "/siber-guvenlik/dlp-veri-kaybi-onleme-cozumleri/",
    cta: "DLP çözümlerini inceleyin",
  },
  {
    icon: Cpu,
    title: "Kurumsal Antivirüs & EDR",
    text: "Fidye yazılımlarına ve yeni nesil saldırılara karşı sunucu ve son kullanıcı cihazlarında merkezi yönetilen, davranış analizli koruma sağlayın.",
    chips: [
      { icon: ShieldCheck, label: "Fidye yazılımı koruması" },
      { icon: Eye, label: "EDR & davranış analizi" },
      { icon: MonitorCheck, label: "Merkezi yönetim paneli" },
      { icon: Server, label: "Sunucu & istemci koruması" },
    ],
    href: "/siber-guvenlik/edr-antivirus-cozumleri/",
    cta: "Antivirüs & EDR çözümlerini inceleyin",
  },
];

export function SecurityShowcase() {
  return (
    <section className="bg-paper-50 py-20 md:py-24">
      <Container className="lg:max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Siber Güvenlik Vitrini</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-ink-900 md:text-5xl">
            Verileriniz ve sistemleriniz koruma altında
          </h2>
          <p className="mt-4 text-slate-500">
            Hassas veri sızıntılarını önleyen DLP sistemleri ve merkezi yönetilen uç nokta korumasıyla işinizi risklere karşı
            güçlendirin.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SHOWCASE.map((s, i) => (
            <MotionReveal key={s.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-navy-950/10 bg-white p-7 shadow-[0_18px_40px_-30px_rgba(7,43,85,0.35)]">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600">
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.text}</p>
                  </div>
                </div>
                <ul className="mb-7 mt-6 grid grid-cols-2 gap-2">
                  {s.chips.map((c) => (
                    <li key={c.label} className="flex items-center gap-2 rounded-md bg-paper-50 px-3 py-2 text-xs font-medium text-slate-600">
                      <c.icon className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                      {c.label}
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className="mt-auto flex items-center justify-between rounded-lg border border-gold-500/30 px-4 py-3 text-sm font-semibold text-gold-700 transition-colors hover:bg-gold-500/10"
                >
                  {s.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function PhishingDemoBand() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient py-16 md:py-20">
      <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-10 lg:max-w-6xl lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/15 backdrop-blur md:p-9">
          <Eyebrow tone="dark">
            <Fish className="h-3.5 w-3.5" aria-hidden="true" /> Sızma Testi Demosu
          </Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">Sosyal mühendislik testi demosu</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            Gerçekçi oltalama (phishing) senaryolarıyla çalışanlarınızın farkındalığını ölçün, riski somut verilerle görün.
            Küçük bir pilot grupla, ek altyapı gerektirmeden kampanyayı sizin için kurguluyoruz.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-white">
            {[
              { icon: MailWarning, label: "Gerçekçi senaryolar" },
              { icon: Users, label: "Pilot kullanıcı grubu" },
              { icon: Gauge, label: "Farkındalık skoru" },
              { icon: ShieldCheck, label: "Sonuç ve eğitim önerisi" },
            ].map((c) => (
              <li key={c.label} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15">
                <c.icon className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" /> {c.label}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/#teklif"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-navy-950 hover:bg-gold-400"
            >
              Demo talep edin <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/siber-guvenlik/sizma-testi-penetrasyon-testi/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-gold-300 hover:text-gold-300"
            >
              Hizmet detayları
            </Link>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_70%_80%,rgba(232,129,47,0.35),transparent_55%),linear-gradient(160deg,#04172e,#072b55)] ring-1 ring-white/15">
          <span className="absolute left-4 top-4 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
            ● Pilot kampanya
          </span>
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <Fish className="h-8 w-8 text-gold-300" aria-hidden="true" />
            </span>
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">Sosyal Mühendislik</p>
            <p className="mt-1 text-xs text-slate-300">Phishing • Farkındalık Skoru</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function RiskTestBand() {
  return (
    <section className="bg-white py-14">
      <Container className="lg:max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-navy-950/10 bg-paper-50 p-7 md:flex-row md:items-center md:p-9">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-800 text-white">
              <Gauge className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900">Bilgi güvenliği risk skoru</h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-500">
                Kurumunuzun siber güvenlik risk seviyesini ve KVKK hazırlığını 8 soruda, 2 dakikada değerlendirin.
              </p>
            </div>
          </div>
          <Link
            href="/risk-skoru-testi/"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-navy-950 hover:bg-gold-400"
          >
            Testi başlat <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("tr");
}

/** Renders nothing until lib/data/trust.ts has consented testimonials. */
export function Testimonials() {
  if (liveTestimonials.length === 0) return null;
  return (
    <section className="bg-paper-50 py-20 md:py-24">
      <Container className="lg:max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Müşteri Yorumları</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy-800 md:text-5xl">Müşterilerimiz ne diyor?</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {liveTestimonials.map((t, i) => (
            <MotionReveal key={t.name + t.company} delay={(i % 3) * 0.06} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-navy-950/10 bg-white p-7 shadow-[0_18px_40px_-30px_rgba(7,43,85,0.35)]">
                <Quote className="h-7 w-7 text-gold-500/60" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{t.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-950/10 pt-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink-900">{t.name}</span>
                    <span className="block text-xs text-slate-500">{t.role}</span>
                    <span className="block text-xs font-semibold text-navy-700">{t.company}</span>
                  </span>
                </figcaption>
              </figure>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Renders nothing until lib/data/trust.ts lists references. */
export function ReferenceStrip() {
  if (references.length === 0) return null;
  return (
    <section className="bg-white py-16 md:py-20">
      <Container className="lg:max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Referanslarımız</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy-800">Bize güvenenler</h2>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {references.slice(0, 12).map((r) => (
            <li key={r.name} className="flex h-24 items-center justify-center rounded-xl border border-navy-950/10 bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.logo} alt={r.name} loading="lazy" className="max-h-12 w-auto object-contain grayscale transition hover:grayscale-0" />
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Link
            href="/referanslar/"
            className="inline-flex items-center gap-2 rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-700"
          >
            Tüm referansları inceleyin <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
