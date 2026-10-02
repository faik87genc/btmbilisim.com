import type { Metadata } from "next";
import {
  Activity,
  BadgeCheck,
  Camera,
  ClipboardCheck,
  Cpu,
  Factory,
  FileCheck2,
  Gauge,
  Layers,
  LineChart,
  Network,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Thermometer,
  Truck,
  Users,
  Video,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { MotionStagger, MotionStaggerItem } from "@/components/ensa/MotionStagger";
import { ParallaxGlobe } from "@/components/ensa/ParallaxGlobe";
import { CountUp } from "@/components/ensa/CountUp";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { FaqSection } from "@/components/ensa/FaqSection";
import { Button } from "@/components/ensa/Button";
import { ProductCard } from "@/components/ensa/ProductCard";
import { ProductJsonLd } from "@/components/ensa/ProductJsonLd";
import { getProductBySlug, products } from "@/lib/products";

const product = getProductBySlug("cyberquan")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}` },
};

const stats = [
  { value: 3, suffix: "", label: "cihaz tipi: sensör, PLC, kamera" },
  { value: 7, suffix: "", label: "rol bazlı yetki seviyesi" },
  { value: 14, suffix: "", label: "frontend modülü" },
];

const heroTags = [
  "IoT Sensörler",
  "PLC / Modbus",
  "IP Kamera / HLS",
  "Gerçek Zamanlı Dashboard",
  "Otomatik Alarmlar",
  "ISO & DPP",
];

const pillars = [
  {
    icon: Factory,
    title: "Üretim uçtan uca izlenir",
    description:
      "Lot bazlı takip: hammadde kabul, torna işleme, ısıl işlem, kalite kontrol ve sevkiyat. Her adımda sensör verisi, kamera görüntüsü ve fotoğraf kanıtı otomatik kaydedilir.",
  },
  {
    icon: ShieldAlert,
    title: "Sorun oluşmadan uyarı gelir",
    description:
      "Her cihaza min/max eşik tanımlanır; gelen telemetri eşiği aşınca sistem otomatik kritik veya uyarı alarmı üretir ve dashboard'da anlık kırmızı gösterir.",
  },
  {
    icon: Layers,
    title: "Sensör, PLC ve kamera tek panelde",
    description:
      "MQTT, Modbus TCP ve HLS tek birleşik cihaz modelinde toplanır. Ayrı sistemler yerine tüm üretim verisi aynı platformdan izlenir ve raporlanır.",
  },
];

const deviceLayers = [
  {
    icon: Thermometer,
    title: "IoT Sensör Entegrasyonu",
    description:
      "Sıcaklık, titreşim, nem, gürültü ve basınç. MQTT protokolüyle gerçek zamanlı veri toplama; eşik aşımında otomatik kritik/uyarı alarmı.",
  },
  {
    icon: Cpu,
    title: "PLC / Makine Verisi",
    description:
      "Modbus TCP ile PLC'lerden register okuma: makine sıcaklığı, devir hızı (RPM), basınç. Manuel veya periyodik okuma desteği.",
  },
  {
    icon: Video,
    title: "IP Kamera Sistemi",
    description:
      "HLS protokolüyle tarayıcıda canlı kamera izleme. Üretim hattı, fırın ve kalite istasyonu için lot bazlı kamera atama.",
  },
  {
    icon: Camera,
    title: "Webcam Fotoğraf Kanıtı",
    description:
      "Operatör, tarayıcı webcam (getUserMedia) ile fotoğraf çeker; kanıt ilgili lot dosyasına eklenir ve izlenebilirlik zincirinde görünür.",
  },
];

const architectureLayers = [
  {
    tier: "1",
    title: "IoT Cihaz Katmanı",
    description: "Sensörler, PLC, IP kameralar, webcam ve veri toplama gateway'i.",
  },
  {
    tier: "2",
    title: "Protokol Katmanı",
    description: "MQTT Broker, Modbus TCP, HLS Stream, HTTP REST API ve JWT Auth.",
  },
  {
    tier: "3",
    title: "Backend — Python FastAPI",
    description:
      "REST API, RBAC, telemetri işleme, eşik kontrolü, otomatik alarm ve kanıt yönetimi. SQLAlchemy ORM, Pydantic, async, multi-tenant.",
  },
  {
    tier: "4",
    title: "Veritabanı Katmanı",
    description:
      "PostgreSQL (tenant/kullanıcı), ClickHouse/SQLite (IoT/operasyonel), uploads/ (kanıt dosyaları) ve opsiyonel Redis.",
  },
  {
    tier: "5",
    title: "Frontend — React + TypeScript",
    description:
      "Dashboard, IoT panel, kamera, terminal, kalite, izlenebilirlik, satış ve ISO ekranları; TailwindCSS ile mobil uyumlu.",
  },
];

const flows = [
  {
    icon: ShieldAlert,
    title: "Sensör → Telemetri → Alarm",
    steps: "Sensör ölçüm → MQTT publish → Backend → Telemetri kayıt → Eşik kontrolü → Alarm",
    example:
      "Örnek: Gürültü sensörü 91 dB ölçtü, eşik 85 dB → kritik alarm oluştu ve dashboard'da kırmızı gösterildi.",
  },
  {
    icon: Camera,
    title: "Webcam → Fotoğraf → Kanıt → Lot",
    steps: "Lot seç → Webcam başlat → Fotoğraf çek → base64 encode → API'ye gönder → Kanıt",
    example:
      "Operatör webcam ile fotoğraf çeker; kanıt lot dosyasına eklenir ve izlenebilirlik zincirinde görünür.",
  },
  {
    icon: Cpu,
    title: "PLC Modbus Okuma → Telemetri",
    steps: "Cihaz seç → Modbus connect → Register oku → Telemetri kayıt → Eşik kontrolü → Panel",
    example:
      "PLC register'ları (sıcaklık, RPM, basınç) okunur, telemetriye kaydedilir ve dashboard'da canlı gösterilir.",
  },
];

const productionFlow = [
  "Satış Siparişi",
  "Lot Oluştur",
  "Hammadde",
  "Torna",
  "Isıl İşlem",
  "Kalite Kontrol",
  "Sevkiyat",
];

const modules = [
  { icon: LineChart, title: "Dashboard", description: "KPI'lar, grafikler, son aktiviteler ve özet panel." },
  { icon: Layers, title: "Lot Yönetimi", description: "Üretim lot listesi, detay, süreç adımları ve soy ağacı." },
  {
    icon: Factory,
    title: "Üretim Terminali",
    description: "Mobil uyumlu: lot seç, kamera, webcam ve adım ilerlet.",
  },
  { icon: Video, title: "Kamera Yönetimi", description: "IP kamera CRUD ve HLS canlı önizleme." },
  {
    icon: Activity,
    title: "IoT Dashboard",
    description: "Gerçek zamanlı cihaz durumu, telemetri ve alarm paneli.",
  },
  {
    icon: Gauge,
    title: "IoT Cihaz Yönetimi",
    description: "Sensör/PLC/kamera ekle, eşik ayarla ve Modbus oku.",
  },
  {
    icon: ClipboardCheck,
    title: "Kalite Kontrol",
    description: "Test sonuçları, NCR (uygunsuzluk) ve CAPA yönetimi.",
  },
  {
    icon: Truck,
    title: "Satış & Sevkiyat",
    description: "Sipariş CRUD, durum yönetimi ve sevkiyat takibi (takip no, lot bağlantısı).",
  },
  {
    icon: FileCheck2,
    title: "ISO Uyumluluk",
    description: "ISO 9001/14001 madde takibi, risk seviyesi ve denetim yönetimi.",
  },
  {
    icon: Network,
    title: "İzlenebilirlik",
    description: "Lot genealogy grafiği ile hammadde → ürün zinciri.",
  },
  {
    icon: QrCode,
    title: "Dijital Ürün Pasaportu (DPP)",
    description: "Malzeme, geri dönüşüm bilgisi ve QR kod ile AB regülasyon uyumu.",
  },
  {
    icon: Users,
    title: "Kullanıcı & Rol Yönetimi",
    description: "7 rollü RBAC, JWT auth ve sayfa bazlı erişim kontrolü.",
  },
];

const roles = [
  { role: "Admin", scope: "Tüm yetkiler; ayarlar ve kullanıcı yönetimi" },
  { role: "Satış", scope: "Siparişler, müşteriler, sevkiyat ve DPP" },
  { role: "Üretim", scope: "Terminal, lotlar, IoT cihaz ve kamera" },
  { role: "Kalite", scope: "Kalite kontrol, NCR/CAPA, ISO ve IoT" },
  { role: "Tedarikçi", scope: "Tedarikçi bilgileri ve izlenebilirlik" },
  { role: "Sevkiyat", scope: "Sevkiyatlar ve müşteriler" },
  { role: "Viewer", scope: "Tüm sayfaları görüntüleme (salt okuma)" },
];

const benefits = [
  {
    icon: LineChart,
    title: "Fire & hata azaltma",
    description:
      "Gerçek zamanlı sensör verisi ve eşik uyarılarıyla sorun oluşmadan müdahale; otomatik alarm sistemiyle fire oranında ciddi düşüş.",
  },
  {
    icon: Network,
    title: "Şeffaf üretim",
    description:
      "Her lot için tam izlenebilirlik — hammadde → üretim → sevkiyat. Kamera kayıtları ve fotoğraf kanıtlarıyla her adım belgelenir.",
  },
  {
    icon: Activity,
    title: "Hızlı müdahale",
    description:
      "Kritik alarm anında dashboard'da görünür; PLC'den okunan makine verisiyle anlık durum analizi yapılır.",
  },
  {
    icon: BadgeCheck,
    title: "ISO & regülasyon uyumu",
    description:
      "ISO 9001/14001 madde bazlı takip, denetim yönetimi ve risk değerlendirmesi; DPP ile AB regülasyon uyumu.",
  },
  {
    icon: ClipboardCheck,
    title: "Maliyet kontrolü",
    description:
      "Satış siparişi, sevkiyat takibi ve kalite maliyeti (NCR/CAPA) tek platformda; manuel kayıt ve raporlama süresinde belirgin azalma.",
  },
  {
    icon: ShieldCheck,
    title: "Güvenli & ölçeklenebilir",
    description:
      "Multi-tenant mimari, 7 rollü yetkilendirme ve JWT güvenlik. Bulut veya on-premise kurulum; sınırsız cihaz ekleme.",
  },
];

const techStack = [
  "Python 3.11+ / FastAPI",
  "SQLAlchemy ORM + Pydantic v2",
  "PostgreSQL / SQLite / ClickHouse",
  "paho-mqtt · pymodbus",
  "React 18 + TypeScript + Vite",
  "TailwindCSS + React Query",
  "hls.js · Recharts",
  "JWT (python-jose) + bcrypt",
  "Mosquitto (MQTT broker)",
  "FFmpeg (RTSP→HLS)",
];

export default function Page() {
  return (
    <>
      <ProductJsonLd product={product} />
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div className="hero-aurora" aria-hidden="true" />
        <ParallaxGlobe className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] text-gold-500/15" />
        <Container className="relative max-w-3xl">
          <MotionReveal blur>
            <span className="inline-block rounded-sm bg-paper-50/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gold-300">
              {product.code}
            </span>
          </MotionReveal>
          <MotionReveal delay={0.05} blur>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-paper-50 md:text-5xl">
              {product.name}
              <span className="mt-2 block text-2xl font-medium text-gold-300 md:text-3xl">
                Endüstriyel IoT & üretim izleme sistemi
              </span>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.12}>
            <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
              Sensör, PLC ve IP kamera entegrasyonuyla gerçek zamanlı üretim takibi, kalite kontrol,
              lot bazlı izlenebilirlik ve otomatik alarm sistemi. Üretiminizi tek panelde şeffaf,
              ölçülebilir ve güvenli hale getirin.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.16} className="mt-6 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-sm bg-paper-50/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gold-300"
              >
                {tag}
              </span>
            ))}
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <div className="mt-8">
              <Button href="/iletisim/" variant="primary">
                Demo Talep Edin
              </Button>
            </div>
          </MotionReveal>

          <MotionStagger className="mt-14 grid gap-6 border-t border-paper-50/10 pt-8 sm:grid-cols-3">
            {stats.map((s) => (
              <MotionStaggerItem key={s.label}>
                <div className="font-display text-4xl font-bold text-gold-300">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm text-slate-300">{s.label}</div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Neden CyberQuan"
            title="Sensörden sevkiyata, tüm üretim verisi tek panelde birleşir."
            description="Sensör, PLC ve kamera verileri ortak bir cihaz ve lot modeli üzerinde çalışır; veri bir kez toplanır, dashboard'dan izlenebilirliğe her ekranda kullanılır."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <MotionStaggerItem key={pillar.title}>
                <div className="group/f flex h-full flex-col gap-4 rounded-sm border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <pillar.icon
                    className="h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="IoT Cihaz Sistemi"
            title="Sensör, PLC ve kamera aynı platformda."
            description="Farklı cihaz tipleri tek birleşik modelde toplanır; her biri kendi protokolüyle bağlanır ve aynı telemetri/alarm akışına yazar."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2">
            {deviceLayers.map((layer) => (
              <MotionStaggerItem key={layer.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-sm border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <layer.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {layer.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-24">
        <div
          className="animate-glow-pulse pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Sistem Mimarisi"
            title="Cihazdan kullanıcıya beş katmanlı veri akışı."
            description="IoT cihazlardan toplanan veri, protokol katmanı ve FastAPI backend üzerinden işlenir, veritabanına yazılır ve React arayüzde canlı gösterilir."
          />
          <div className="mt-10 grid gap-4">
            {architectureLayers.map((layer, i) => (
              <MotionReveal key={layer.tier} delay={i * 0.05}>
                <div className="flex items-start gap-5 rounded-sm border border-paper-50/10 bg-paper-50/5 p-6 transition-colors duration-300 hover:border-gold-500/40">
                  <span className="font-display text-2xl font-bold text-gold-300">
                    {layer.tier}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-paper-50">
                      {layer.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Veri Akış Senaryoları"
            title="Sensör verisinden alarma, kameradan kanıta."
            description="Sistem, telemetri toplama, eşik kontrolü ve kanıt yönetimini otomatik akışlarla yürütür."
          />
          <MotionStagger className="mt-10 grid gap-5 lg:grid-cols-3">
            {flows.map((flow) => (
              <MotionStaggerItem key={flow.title}>
                <div className="flex h-full flex-col gap-4 rounded-sm border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <flow.icon className="h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
                  <h3 className="font-display text-base font-semibold text-ink-900">
                    {flow.title}
                  </h3>
                  <p className="rounded-sm bg-navy-950/5 px-3 py-2 font-mono text-[11px] leading-relaxed text-slate-600">
                    {flow.steps}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-500">{flow.example}</p>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>

          <MotionReveal delay={0.1}>
            <div className="mt-8 rounded-sm border border-navy-950/10 bg-navy-950 p-6">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-gold-300">
                Üretim Akışı
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                {productionFlow.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-sm bg-paper-50/10 px-3 py-1.5 text-sm text-paper-50">
                      {step}
                    </span>
                    {i < productionFlow.length - 1 && (
                      <span className="text-gold-300" aria-hidden="true">
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Modüller"
            title="Dashboard'dan Dijital Ürün Pasaportu'na kadar tek arayüz."
            description="React + TypeScript ile geliştirilmiş, mobil uyumlu modüller; her rol yalnızca yetkili olduğu ekranları görür."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <MotionStaggerItem key={mod.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-sm border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <mod.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {mod.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {mod.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Rol Bazlı Erişim"
            title="Yedi rol, JWT ile güvenli tek denetim izi."
            description="Her kullanıcı yalnızca sorumlu olduğu ekranlara erişir; multi-tenant mimari ile firmalar birbirinden izole çalışır."
          />
          <MotionReveal delay={0.05} className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-paper-50/10">
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-gold-300">
                    Rol
                  </th>
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-gold-300">
                    Erişim alanı
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.role} className="border-b border-paper-50/10">
                    <td className="px-4 py-3 font-medium text-paper-50">{r.role}</td>
                    <td className="px-4 py-3 text-slate-300">{r.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Müşteri Faydaları"
            title="İşletmeye sağladığı ölçülebilir değer."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <MotionStaggerItem key={item.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-sm border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <item.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Teknoloji Stack"
            title="FastAPI backend, React arayüz ve endüstriyel protokoller."
            description="Python FastAPI üzerinde MQTT, Modbus ve HLS entegrasyonları; React + TypeScript arayüz; PostgreSQL/ClickHouse veri altyapısı. Bulut veya on-premise kurulum."
          />
          <MotionReveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-block rounded-sm bg-paper-50/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gold-300"
              >
                {tech}
              </span>
            ))}
          </MotionReveal>
        </Container>
      </section>

      <FaqSection items={product.faq} />

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="CyberQuan'ı kendi üretim hattınızda deneyin."
            description="Cihaz entegrasyonundan ISO uyumluluğuna kadar tüm adımlarda yanınızdayız."
          />
          <div className="mt-8 flex justify-center">
            <Button href="/iletisim/" variant="primary">
              Demo Talep Edin
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Diğer Ürünlerimiz" title="Ürün ailemizin geri kalanı" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} delay={i * 0.08} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
