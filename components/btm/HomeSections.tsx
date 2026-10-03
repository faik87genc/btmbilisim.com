import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Building,
  CloudCog,
  Factory,
  Globe2,
  GraduationCap,
  HeartPulse,
  Hotel,
  KeyRound,
  Landmark,
  Network,
  Radar,
  Store,
  Warehouse,
  Wifi,
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
    <section className="cv-auto bg-paper-50 py-20 md:py-24">
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
    <section className="cv-auto relative overflow-hidden bg-brand-gradient py-16 md:py-20">
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
    <section className="cv-auto bg-white py-14">
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
    <section className="cv-auto bg-paper-50 py-20 md:py-24">
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
    <section className="cv-auto bg-white py-16 md:py-20">
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

const PENTEST_SCOPE = [
  { icon: Globe2, title: "Dış Ağ (İnternet) Testi", text: "İnternete açık servis ve sunucularınızı saldırgan gözüyle tarıyoruz." },
  { icon: Network, title: "İç Ağ ve Sistem Testi", text: "Şirket içi ağda yetki yükseltme ve yanal hareket risklerini ölçüyoruz." },
  { icon: KeyRound, title: "Active Directory Testi", text: "Kimlik doğrulama ve yetki yapılandırmasındaki zayıflıkları buluyoruz." },
  { icon: AppWindow, title: "Web Uygulama Testi", text: "OWASP Top 10 başta olmak üzere uygulama açıklarını doğruluyoruz." },
  { icon: Wifi, title: "Kablosuz Ağ Testi", text: "Wi-Fi şifreleme, misafir ağ ayrımı ve sahte erişim noktası riskleri." },
  { icon: CloudCog, title: "Bulut Güvenliği", text: "Azure, AWS ve Microsoft 365 yapılandırma hatalarını tespit ediyoruz." },
  { icon: Factory, title: "IoT / OT Testi", text: "Üretim ağları, PLC ve SCADA ortamlarında güvenli modda test." },
  { icon: Fish, title: "Sosyal Mühendislik", text: "Oltalama senaryolarıyla çalışan farkındalığını ölçüyoruz." },
];

/** Dark pentest-scope grid (idea from szutestteknoloji.com.tr, reworked). */
export function PentestScope() {
  return (
    <section className="cv-auto relative overflow-hidden bg-navy-950 py-20 md:py-24">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative lg:max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">
              <Radar className="h-3.5 w-3.5" aria-hidden="true" /> Sızma Testi Kapsamımız
            </Eyebrow>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Açıkları saldırganlardan <span className="text-gold-300">önce</span> bulun.
            </h2>
            <p className="mt-4 text-slate-300">
              Ağdan uygulamaya, buluttan üretim hattına kadar her katmanı test ediyor; bulguları önceliklendirilmiş bir
              raporla ve kapatma önerileriyle teslim ediyoruz.
            </p>
          </div>
          <Link
            href="/siber-guvenlik/sizma-testi-penetrasyon-testi/"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-gold-300 hover:text-gold-300"
          >
            Sızma testi hizmeti <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {PENTEST_SCOPE.map((p) => (
            <li key={p.title} className="group bg-navy-950/90 p-6 transition-colors hover:bg-navy-900">
              <p.icon className="h-7 w-7 text-gold-300 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
              <h3 className="mt-4 font-display text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const SECTORS = [
  { icon: Factory, title: "Üretim & OSB", text: "OT/IT ağ ayrımı, IP kamera, üretim izleme.", href: "/yazilim-urunlerimiz/cyberquan/" },
  { icon: Warehouse, title: "Lojistik & Depo", text: "Geniş alan Wi-Fi, kamera ve envanter takibi.", href: "/sistem-network/wifi-ve-kablosuz-ag-cozumleri/" },
  { icon: HeartPulse, title: "Sağlık", text: "KVKK uyumu, hasta verisi güvenliği, yedekleme.", href: "/danismanlik/kvkk-danismanligi/" },
  { icon: GraduationCap, title: "Eğitim", text: "5651 uyumlu misafir Wi-Fi ve içerik filtreleme.", href: "/yazilim-urunlerimiz/cyberhost/" },
  { icon: Hotel, title: "Turizm & Otel", text: "Misafir internet, loglama ve kesintisiz ağ.", href: "/yazilim-urunlerimiz/cyberhost/" },
  { icon: Landmark, title: "Finans & Kurumsal", text: "Sızma testi, SIEM ve bütçe raporlama.", href: "/yazilim-urunlerimiz/atlas/" },
  { icon: Store, title: "Perakende & Mağaza", text: "Çok şubeli ağ, kamera ve merkezi yönetim.", href: "/kurulum-hizmeti/" },
  { icon: Building, title: "Site & Apartman", text: "Kamera sistemleri, kayıt ve uzaktan izleme.", href: "/apartman-ve-site-kamera-sistemleri-kurulumu/" },
];

/** Sector solutions grid (idea from lidernetwork.com.tr, reworked). */
export function Sectors() {
  return (
    <section className="cv-auto bg-white py-20 md:py-24">
      <Container className="lg:max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Sektörel Çözümler</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-navy-800 md:text-5xl">
            Her sektöre özel bilişim çözümleri
          </h2>
          <p className="mt-4 text-slate-500">
            İşletmenizin sektörüne göre öncelikleri biliyor, çözümü ona göre kuruyoruz.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {SECTORS.map((s, i) => (
            <MotionReveal key={s.title} as="li" delay={(i % 4) * 0.05} className="h-full">
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-navy-950/10 bg-paper-50 p-5 transition-all hover:-translate-y-1 hover:border-gold-500/50 hover:bg-white hover:shadow-[0_20px_44px_-28px_rgba(7,43,85,0.45)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-white transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink-900">{s.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{s.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-700">
                  Çözümü inceleyin <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </MotionReveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
