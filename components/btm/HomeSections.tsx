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
  KeyRound,
  LockKeyhole,
  MailWarning,
  MonitorCheck,
  Network,
  Quote,
  ScanSearch,
  Server,
  ShieldCheck,
  Usb,
  Users,
  Wifi,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { Button } from "@/components/ensa/Button";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { liveTestimonials, references } from "@/lib/data/trust";

// Home/landing sections, filled with BTM's own services. Layout rules (design
// review): one card radius (rounded-card), one heading (SectionHeading), one
// button (Button); orange only for primary actions and arrows; dotted texture
// on the hero only. Testimonials and references render nothing until real
// entries exist in lib/data/trust.ts.

const CARD = "rounded-card border border-navy-950/10 bg-white shadow-card";
const CARD_ON_WHITE = "rounded-card border border-navy-950/10 bg-paper-50";

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
              <div className={`${CARD_ON_WHITE} flex h-full flex-col p-6 md:p-7`}>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-navy-800 text-white">
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                  </div>
                </div>
                <ul className="mb-7 mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {s.chips.map((c) => (
                    <li key={c.label} className="flex items-center gap-2 rounded-control bg-white px-3 py-2 text-xs font-medium text-slate-700">
                      <c.icon className="h-3.5 w-3.5 shrink-0 text-navy-700" aria-hidden="true" />
                      {c.label}
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className="mt-auto flex items-center justify-between rounded-control bg-white px-4 py-3 text-sm font-semibold text-navy-800 ring-1 ring-navy-950/10 transition-colors hover:bg-paper-100"
                >
                  {s.cta} <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                </Link>
              </div>
            </MotionReveal>
          ))}

          {/* Social-engineering demo (was a dark band of its own) */}
          <MotionReveal className="md:col-span-2">
            <div className={`${CARD_ON_WHITE} grid gap-8 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center`}>
              <div>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-navy-800 text-white">
                    <Fish className="h-6 w-6" aria-hidden="true" />
                  </span>
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
                    <li key={c.label} className="inline-flex items-center gap-1.5 rounded-control bg-white px-3 py-1.5">
                      <c.icon className="h-3.5 w-3.5 text-navy-700" aria-hidden="true" /> {c.label}
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
              <figure className="rounded-card border border-navy-950/10 bg-white p-5">
                <figcaption className="flex items-center justify-between gap-3 border-b border-navy-950/10 pb-3">
                  <span className="flex items-center gap-2 font-display text-sm font-semibold text-navy-800">
                    <FileText className="h-4 w-4" aria-hidden="true" /> Rapor içeriği
                  </span>
                  <span className="rounded-control bg-paper-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-navy-950/10">
                    Örnek başlıklar
                  </span>
                </figcaption>
                <ol className="mt-3 space-y-2 text-sm text-slate-700">
                  {PHISHING_REPORT.map((r, i) => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-800 text-[11px] font-semibold text-white">
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

/**
 * References + testimonials in one light-grey section. Renders nothing until
 * lib/data/trust.ts has entries (and testimonials have recorded consent).
 */
export function TrustSection() {
  if (references.length === 0 && liveTestimonials.length === 0) return null;
  return (
    <section className="cv-auto bg-paper-50 py-20 md:py-24">
      <Container className="max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow={liveTestimonials.length ? "Müşteri Yorumları" : "Referanslarımız"}
          title={liveTestimonials.length ? "Müşterilerimiz ne diyor?" : "Bize güvenenler"}
        />
        {references.length > 0 && (
          <>
            <ul className="mt-10 flex flex-wrap justify-center gap-4">
              {references.slice(0, 12).map((r) => (
                <li key={r.name} className="flex h-24 w-[calc(50%-0.5rem)] items-center justify-center rounded-card border border-navy-950/10 bg-white p-4 sm:w-52 lg:w-60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.logo} alt={r.name} loading="lazy" className="max-h-12 w-auto object-contain grayscale transition hover:grayscale-0" />
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Button href="/referanslar/" variant="ghost-light">
                Tüm referansları inceleyin <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
              </Button>
            </div>
          </>
        )}
        {liveTestimonials.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liveTestimonials.map((t, i) => (
              <MotionReveal key={t.name + t.consent} delay={(i % 3) * 0.06} className="h-full">
                <figure className={`${CARD} flex h-full flex-col p-7`}>
                  <Quote className="h-7 w-7 text-navy-800/40" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">{t.text}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-950/10 pt-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">
                      {initials(t.name)}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink-900">{t.name}</span>
                      <span className="block text-xs text-slate-600">{t.role}</span>
                      <span className="block text-xs font-semibold text-navy-700">{t.company ?? t.sector}</span>
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
              <p.icon className="h-7 w-7 text-gold-300" aria-hidden="true" />
              <h3 className="mt-4 font-display text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-card bg-white/5 p-6 ring-1 ring-white/15 md:flex-row md:items-center md:p-7">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-white/10 text-white ring-1 ring-white/20">
              <Gauge className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-white">Bilgi güvenliği risk skorunuzu öğrenin</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-300">
                Siber güvenlik risk seviyenizi ve KVKK hazırlığınızı 8 soruda, yaklaşık 2 dakikada değerlendirin.
              </p>
            </div>
          </div>
          <Button href="/risk-skoru-testi/" className="shrink-0">
            Testi başlat <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
