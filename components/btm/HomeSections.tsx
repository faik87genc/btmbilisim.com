import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Ban,
  CloudCog,
  Cpu,
  Eye,
  Factory,
  FileText,
  Fish,
  Gauge,
  Globe2,
  Headphones,
  KeyRound,
  LockKeyhole,
  MailWarning,
  MonitorCheck,
  Network,
  Quote,
  Route,
  ScanSearch,
  SearchCheck,
  Server,
  ShieldCheck,
  Usb,
  Users,
  Wifi,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { IconTile } from "@/components/ensa/IconTile";
import { Button } from "@/components/ensa/Button";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { CaseStoryCard } from "@/components/btm/CaseStoryCard";
import { liveCaseStories, liveTestimonials, references } from "@/lib/data/trust";

// Home/landing sections, filled with BTM's own services. Layout rules
// (identity v2, docs/kurumsal-kimlik-v2.md): one card (.card), one icon shape
// (IconTile), one heading (SectionHeading), one button (Button); brand blue is
// a signal, not decoration. Testimonials and references render nothing until
// real entries exist in lib/data/trust.ts.

const CARD = "card";

/** How an engagement runs — shared by the homepage and the about page. */
export const APPROACH_STEPS = [
  { icon: SearchCheck, title: "Keşif ve analiz", text: "Altyapınızı, güvenliğinizi ve IT maliyetlerinizi yerinde inceliyoruz." },
  { icon: Route, title: "Yol haritası", text: "Önceliklendirilmiş, kalem kalem bütçelenmiş bir eylem planı sunuyoruz." },
  { icon: Wrench, title: "Uygulama", text: "Kurulum ve geçişleri kendi ekibimizle, minimum kesintiyle yapıyoruz." },
  { icon: Headphones, title: "Sürekli destek", text: "İzleme, bakım ve dış kaynak IT müdürü hizmetiyle sistemi ayakta tutuyoruz." },
];

/** Numbered step cards (01–04) in one row from lg up. */
export function ApproachSteps({ headingLevel = 3 }: { headingLevel?: 3 | 4 }) {
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {APPROACH_STEPS.map((s, i) => (
        <li key={s.title} className="card relative flex h-full flex-col p-6 md:p-7">
          <span className="flex items-center justify-between gap-3">
            <IconTile icon={s.icon} />
            <span className="font-display text-sm font-bold tabular-nums tracking-[0.04em] text-slate-500">
              <span className="visually-hidden">Adım </span>
              {String(i + 1).padStart(2, "0")}
            </span>
          </span>
          <H className="mt-5 font-display text-[1.1875rem] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-950">
            {s.title}
          </H>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-500">{s.text}</p>
        </li>
      ))}
    </ol>
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

// What the phishing-simulation report contains — section names only, no
// sample figures (nothing here may look like a real customer's result).
const PHISHING_REPORT = [
  "Kullanılan senaryo ve gönderim takvimi",
  "Açılma, tıklama ve bilgi girişi oranları",
  "Departman bazında risk kırılımı",
  "Bildirim (raporlama) davranışı",
  "Eğitim ve iyileştirme önerileri",
];

/** DLP + EDR cards and the social-engineering (phishing) demo card. */
export function SecurityShowcase() {
  return (
    <section className="cv-auto bg-white py-20 md:py-24">
      <Container className="max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="Siber Güvenlik Vitrini"
          title="Verileriniz ve sistemleriniz koruma altında"
          description="Hassas veri sızıntılarını önleyen DLP sistemleri, merkezi yönetilen uç nokta koruması ve çalışan farkındalığını ölçen testlerle işinizi risklere karşı güçlendirin. Tüm önde gelen markalarla uyumlu çalışıyor, ihtiyacınıza göre ürün bağımsız öneri yapıyoruz."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SHOWCASE.map((s, i) => (
            <MotionReveal key={s.title} delay={i * 0.08} className="h-full">
              <div className={`card flex h-full flex-col p-6 md:p-7`}>
                <div className="flex items-start gap-4">
                  <IconTile icon={s.icon} size="lg" />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                  </div>
                </div>
                <ul className="mb-7 mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {s.chips.map((c) => (
                    <li key={c.label} className="flex items-center gap-2 rounded-control bg-paper-50 px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-line">
                      <c.icon className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                      {c.label}
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className="mt-auto flex items-center justify-between rounded-control bg-white px-4 py-3 text-sm font-semibold text-navy-950 ring-1 ring-line transition-colors hover:text-gold-700 hover:ring-gold-600/40"
                >
                  {s.cta} <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                </Link>
              </div>
            </MotionReveal>
          ))}

          {/* Social-engineering demo (was a dark band of its own) */}
          <MotionReveal className="md:col-span-2">
            <div className={`card grid gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center`}>
              <div>
                <div className="flex items-start gap-4">
                  <IconTile icon={Fish} size="lg" />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-900">Sosyal mühendislik testi demosu</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Gerçekçi oltalama (phishing) senaryolarıyla çalışanlarınızın farkındalığını ölçün, riski somut
                      verilerle görün. Küçük bir pilot grupla, ek altyapı gerektirmeden kampanyayı sizin için kurguluyoruz.
                    </p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                  {[
                    { icon: MailWarning, label: "Gerçekçi senaryolar" },
                    { icon: Users, label: "Pilot kullanıcı grubu" },
                    { icon: Gauge, label: "Farkındalık skoru" },
                    { icon: ShieldCheck, label: "Sonuç ve eğitim önerisi" },
                  ].map((c) => (
                    <li key={c.label} className="inline-flex items-center gap-1.5 rounded-control bg-paper-50 px-3 py-1.5 ring-1 ring-line">
                      <c.icon className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" /> {c.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/#teklif">
                    Demo talep edin <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button href="/siber-guvenlik/sizma-testi-penetrasyon-testi/" variant="ghost-light">
                    Hizmet detayları
                  </Button>
                </div>
              </div>
              <figure className="rounded-card bg-paper-50 p-5 ring-1 ring-line">
                <figcaption className="flex items-center justify-between gap-3 border-b border-line pb-3">
                  <span className="flex items-center gap-2 font-display text-sm font-semibold text-navy-950">
                    <FileText className="h-4 w-4" aria-hidden="true" /> Rapor içeriği
                  </span>
                  <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-line">
                    Örnek başlıklar
                  </span>
                </figcaption>
                <ol className="mt-3 space-y-2 text-sm text-slate-700">
                  {PHISHING_REPORT.map((r, i) => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gold-100 font-display text-[11px] font-bold text-gold-700">
                        {i + 1}
                      </span>
                      {r}
                    </li>
                  ))}
                </ol>
              </figure>
            </div>
          </MotionReveal>
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

/** Reference logos in colour (same as /referanslar/), white bordered cards. */
function ReferenceLogos() {
  return (
    <ul className="flex flex-wrap gap-4">
      {references.slice(0, 12).map((r) => (
        <li
          key={r.name}
          className="card flex h-24 w-[calc(50%-0.5rem)] items-center justify-center p-4 sm:w-52 lg:w-60"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.logo} alt={r.name} loading="lazy" className="max-h-12 w-auto object-contain" />
        </li>
      ))}
    </ul>
  );
}

/**
 * References + testimonials on the one cool ground (tint-50). Renders nothing
 * until lib/data/trust.ts has entries (and testimonials / case stories have
 * recorded consent). `variant="strip"` is the logos only, with a link — for
 * pages that already have their own headings (about page): no extra <h2>.
 */
export function TrustSection({ variant = "full" }: { variant?: "full" | "strip" }) {
  if (variant === "strip") {
    if (references.length === 0) return null;
    return (
      <section aria-label="Referanslarımız" className="cv-auto bg-tint-50 py-16 md:py-20">
        <Container className="max-w-7xl">
          <MotionReveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="eyebrow">Referanslarımız</p>
              <Button href="/referanslar/" variant="ghost-light">
                Tüm referanslar <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-8">
              <ReferenceLogos />
            </div>
          </MotionReveal>
        </Container>
      </section>
    );
  }

  if (references.length === 0 && liveTestimonials.length === 0 && liveCaseStories.length === 0) return null;
  const story = liveCaseStories[0];
  return (
    <section className="cv-auto bg-tint-50 py-20 md:py-24">
      <Container className="max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={liveTestimonials.length ? "Müşteri Yorumları" : "Referanslarımız"}
            title={liveTestimonials.length ? "Müşterilerimiz ne diyor?" : "Bize güvenenler"}
          />
          {references.length > 0 && (
            <Button href="/referanslar/" variant="ghost-light">
              Tüm referanslar <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
        {story && (
          <MotionReveal className="mt-12">
            <CaseStoryCard story={story} />
          </MotionReveal>
        )}
        {references.length > 0 && (
          <MotionReveal className={story ? "mt-8" : "mt-12"}>
            <ReferenceLogos />
          </MotionReveal>
        )}
        {liveTestimonials.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liveTestimonials.map((t, i) => (
              <MotionReveal key={t.name + t.consent} delay={(i % 3) * 0.05} className="h-full">
                <figure className={`${CARD} flex h-full flex-col p-7`}>
                  <Quote className="h-7 w-7 text-gold-600/40" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">{t.text}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-100 font-display text-sm font-bold text-gold-700">
                      {initials(t.name)}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink-900">{t.name}</span>
                      <span className="block text-xs text-slate-600">{t.role}</span>
                      <span className="block text-xs font-semibold text-gold-700">{t.company ?? t.sector}</span>
                    </span>
                  </figcaption>
                </figure>
              </MotionReveal>
            ))}
          </div>
        )}
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

/** Dark pentest-scope grid with the risk-score test CTA. */
export function PentestScope() {
  return (
    <section className="cv-auto bg-navy-950 py-20 md:py-24">
      <Container className="max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            tone="dark"
            eyebrow="Sızma Testi Kapsamımız"
            title="Açıkları saldırganlardan önce bulun."
            description="Ağdan uygulamaya, buluttan üretim hattına kadar her katmanı test ediyor; bulguları önceliklendirilmiş bir raporla ve kapatma önerileriyle teslim ediyoruz."
          />
          <Button href="/siber-guvenlik/sizma-testi-penetrasyon-testi/" variant="ghost-dark">
            Sızma testi hizmeti <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {PENTEST_SCOPE.map((p) => (
            <li key={p.title} className="bg-navy-950 p-6 transition-colors hover:bg-navy-900">
              <IconTile icon={p.icon} tone="dark" />
              <h3 className="mt-4 font-display text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.text}</p>
            </li>
          ))}
        </ul>
        <div className="card-dark mt-8 flex flex-col items-start justify-between gap-5 p-6 md:flex-row md:items-center md:p-7">
          <div className="flex items-start gap-4">
            <IconTile icon={Gauge} tone="dark" size="lg" />
            <div>
              <h3 className="font-display text-xl font-semibold text-white">Bilgi güvenliği risk skorunuzu öğrenin</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-300">
                Siber güvenlik risk seviyenizi ve KVKK hazırlığınızı 8 soruda, yaklaşık 2 dakikada değerlendirin.
              </p>
            </div>
          </div>
          <Button href="/risk-skoru-testi/" variant="inverse" className="shrink-0">
            Testi başlat <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
