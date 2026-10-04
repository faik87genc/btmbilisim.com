import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
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
import { DemoRequest } from "@/components/ensa/DemoRequest";
import { ProductCard } from "@/components/ensa/ProductCard";
import { ProductJsonLd } from "@/components/ensa/ProductJsonLd";
import { getProductBySlug, products } from "@/lib/products";

const product = getProductBySlug("cyberquan")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}/` },
  ...ogMeta({ title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`, description: product.metaDescription, path: `/yazilim-urunlerimiz/${product.slug}/` }),
};

const stats = [
  { value: 3, suffix: "", label: "bağlanabilen cihaz türü (sensör, PLC, kamera)" },
  { value: 7, suffix: "", label: "ayrı kullanıcı rolü" },
  { value: 14, suffix: "", label: "ekran modülü" },
];

const heroTags = [
  "IoT Sensörler",
  "PLC / Modbus",
  "IP Kamera / HLS",
  "Canlı Dashboard",
  "Eşik Alarmları",
  "ISO & DPP",
];

const pillars = [
  {
    icon: Factory,
    title: "Lotun yolculuğu baştan sona kayıtlı",
    description:
      "Hammadde girişinden tornaya, ısıl işlemden kalite kontrole ve sevkiyata kadar her lot ayrı izlenir. O adımda üretilen sensör ölçümleri, kamera kayıtları ve fotoğraflar lota kendiliğinden bağlanır.",
  },
  {
    icon: ShieldAlert,
    title: "Değer sınırı aştığı an haberiniz olur",
    description:
      "Cihaz başına alt ve üst sınır belirlersiniz. Ölçüm bu aralığın dışına çıktığında sistem kendiliğinden uyarı ya da kritik alarm açar, ilgili kart dashboard'da kırmızıya döner.",
  },
  {
    icon: Layers,
    title: "Üç ayrı sistem yerine bir ekran",
    description:
      "MQTT ile gelen sensör verisi, Modbus TCP ile okunan makine değerleri ve HLS kamera yayını ortak bir cihaz yapısında buluşur. İzleme de raporlama da aynı yerden yapılır.",
  },
];

const deviceLayers = [
  {
    icon: Thermometer,
    title: "IoT Sensör Entegrasyonu",
    description:
      "Sıcaklık, titreşim, nem, gürültü ve basınç sensörleri MQTT üzerinden anlık veri gönderir. Tanımlı sınır aşılırsa uyarı veya kritik alarm kendiliğinden oluşur.",
  },
  {
    icon: Cpu,
    title: "PLC / Makine Verisi",
    description:
      "PLC register'ları Modbus TCP ile okunur; makine sıcaklığı, devir (RPM) ve basınç bilgisi gelir. Okumayı elle başlatabilir ya da belirli aralıklarla tekrarlatabilirsiniz.",
  },
  {
    icon: Video,
    title: "IP Kamera Sistemi",
    description:
      "Kamera yayınları HLS ile doğrudan tarayıcıda açılır. Hat, fırın ya da kalite istasyonundaki kamerayı ilgili lota bağlayabilirsiniz.",
  },
  {
    icon: Camera,
    title: "Webcam Fotoğraf Kanıtı",
    description:
      "Operatör ek bir uygulama kurmadan, tarayıcının webcam erişimiyle (getUserMedia) fotoğraf alır. Fotoğraf lota kanıt olarak eklenir ve izlenebilirlik ekranında yerini alır.",
  },
];

const architectureLayers = [
  {
    tier: "1",
    title: "IoT Cihaz Katmanı",
    description: "Sahadaki sensörler, PLC'ler, IP kameralar, webcam ve verileri toplayan gateway.",
  },
  {
    tier: "2",
    title: "Protokol Katmanı",
    description: "Cihazlarla konuşan katman: MQTT Broker, Modbus TCP, HLS Stream, HTTP REST API, JWT Auth.",
  },
  {
    tier: "3",
    title: "Backend — Python FastAPI",
    description:
      "Telemetriyi işleyen, sınırları denetleyen, alarmları ve kanıtları yöneten REST API ile RBAC burada çalışır. Async yapı, multi-tenant, SQLAlchemy ORM ve Pydantic.",
  },
  {
    tier: "4",
    title: "Veritabanı Katmanı",
    description:
      "Firma ve kullanıcı bilgisi PostgreSQL'de, IoT ve operasyon verisi ClickHouse ya da SQLite'ta, kanıt dosyaları uploads/ klasöründe durur; Redis isteğe bağlıdır.",
  },
  {
    tier: "5",
    title: "Frontend — React + TypeScript",
    description:
      "Dashboard, IoT, kamera, terminal, kalite, izlenebilirlik, satış ve ISO ekranları. TailwindCSS sayesinde telefonda da düzgün görünür.",
  },
];

const flows = [
  {
    icon: ShieldAlert,
    title: "Sensör → Telemetri → Alarm",
    steps: "Sensör ölçüm → MQTT publish → Backend → Telemetri kayıt → Eşik kontrolü → Alarm",
    example:
      "Örneğin sınırı 85 dB olan gürültü sensörü 91 dB okuyunca kritik alarm açılır ve dashboard'daki kart kırmızı yanar.",
  },
  {
    icon: Camera,
    title: "Webcam → Fotoğraf → Kanıt → Lot",
    steps: "Lot seç → Webcam başlat → Fotoğraf çek → base64 encode → API'ye gönder → Kanıt",
    example:
      "Çekilen kare lotun kanıtları arasına girer; lotun geçmişine bakan herkes o fotoğrafı görür.",
  },
  {
    icon: Cpu,
    title: "PLC Modbus Okuma → Telemetri",
    steps: "Cihaz seç → Modbus connect → Register oku → Telemetri kayıt → Eşik kontrolü → Panel",
    example:
      "Sıcaklık, RPM ve basınç register'ları telemetri olarak saklanır ve panelde anlık izlenir.",
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
  { icon: LineChart, title: "Dashboard", description: "Göstergeler, grafikler ve son hareketler bir bakışta." },
  { icon: Layers, title: "Lot Yönetimi", description: "Lotların listesi, ayrıntısı, geçtiği adımlar ve soy ağacı." },
  {
    icon: Factory,
    title: "Üretim Terminali",
    description: "Atölyede telefon veya tabletten lot seçme, kamera, webcam ve adım ilerletme.",
  },
  { icon: Video, title: "Kamera Yönetimi", description: "IP kameraları ekleme, düzenleme, silme ve HLS ile canlı izleme." },
  {
    icon: Activity,
    title: "IoT Dashboard",
    description: "Cihazların o anki durumu, gelen ölçümler ve açık alarmlar.",
  },
  {
    icon: Gauge,
    title: "IoT Cihaz Yönetimi",
    description: "Sensör, PLC veya kamera tanımlama, sınır belirleme, Modbus okuma.",
  },
  {
    icon: ClipboardCheck,
    title: "Kalite Kontrol",
    description: "Test kayıtları, uygunsuzluk (NCR) bildirimleri ve CAPA takibi.",
  },
  {
    icon: Truck,
    title: "Satış & Sevkiyat",
    description: "Siparişlerin açılıp güncellenmesi, durumları ve takip numarası ile lota bağlanan sevkiyatlar.",
  },
  {
    icon: FileCheck2,
    title: "ISO Uyumluluk",
    description: "ISO 9001 ve 14001 maddelerinin durumu, risk derecesi ve denetim planı.",
  },
  {
    icon: Network,
    title: "İzlenebilirlik",
    description: "Hammaddeden bitmiş ürüne uzanan zinciri gösteren lot soy ağacı grafiği.",
  },
  {
    icon: QrCode,
    title: "Dijital Ürün Pasaportu (DPP)",
    description: "Malzeme ve geri dönüşüm bilgisini QR kodla sunarak AB düzenlemelerine uyum.",
  },
  {
    icon: Users,
    title: "Kullanıcı & Rol Yönetimi",
    description: "Yedi rollü RBAC, JWT ile oturum ve her sayfa için ayrı erişim izni.",
  },
];

const roles = [
  { role: "Admin", scope: "Sınırsız erişim, ayarlar ve kullanıcılar" },
  { role: "Satış", scope: "Sipariş, müşteri, sevkiyat ve DPP ekranları" },
  { role: "Üretim", scope: "Üretim terminali, lotlar, IoT cihazları, kameralar" },
  { role: "Kalite", scope: "Kalite kontrol, NCR/CAPA, ISO ve IoT ekranları" },
  { role: "Tedarikçi", scope: "Tedarikçi kayıtları ve izlenebilirlik" },
  { role: "Sevkiyat", scope: "Sevkiyat ve müşteri ekranları" },
  { role: "Viewer", scope: "Her sayfayı görür, hiçbir şeyi değiştiremez" },
];

const benefits = [
  {
    icon: LineChart,
    title: "Daha az fire, daha az hata",
    description:
      "Sensör değerleri sınırı aştığında alarm hemen geldiği için hatalı parçalar çoğalmadan makineye müdahale edebilirsiniz; bu da fireyi aşağı çeker.",
  },
  {
    icon: Network,
    title: "Her lotun hesabı verilebilir",
    description:
      "Hammaddeden sevkiyata kadar bir lotun nereden geçtiği bellidir. Kamera kayıtları ve fotoğraflar her adımın belgesi olarak saklanır.",
  },
  {
    icon: Activity,
    title: "Beklemeden aksiyon",
    description:
      "Kritik alarm ekrana düştüğü anda PLC'den gelen makine değerlerine bakarak durumu yerinde değerlendirirsiniz.",
  },
  {
    icon: BadgeCheck,
    title: "ISO ve AB düzenlemelerine hazırlık",
    description:
      "ISO 9001 ve 14001 maddeleri tek tek izlenir, denetimler ve risk değerlendirmeleri planlanır. Dijital Ürün Pasaportu, AB tarafındaki yükümlülüklere uyum için kullanılır.",
  },
  {
    icon: ClipboardCheck,
    title: "Maliyetler göz önünde",
    description:
      "Siparişler, sevkiyatlar ve NCR/CAPA kaynaklı kalite maliyetleri aynı sistemde toplanır; elle kayıt tutmak ve rapor derlemek için harcanan zaman kısalır.",
  },
  {
    icon: ShieldCheck,
    title: "Büyüdükçe genişleyen, güvenli yapı",
    description:
      "Multi-tenant mimari, yedi rollü yetki yapısı ve JWT oturum güvenliği. Bulutta ya da kendi sunucunuzda çalışır, cihaz sayısında sınır yoktur.",
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
        <Container className="relative">
          <div className="max-w-3xl">
          <MotionReveal blur>
            <span className="inline-block rounded-sm bg-paper-50/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gold-300">
              {product.code}
            </span>
          </MotionReveal>
          <MotionReveal delay={0.05} blur>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-paper-50 md:text-5xl">
              {product.name}
              <span className="mt-2 block text-2xl font-medium text-gold-300 md:text-3xl">
                Fabrikanız için IoT tabanlı üretim takibi
              </span>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.12}>
            <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
              Sahadaki sensörleri, PLC&apos;leri ve IP kameraları birbirine bağlayan CyberQuan, hattınızda
              olup biteni anında gösterir. Kalite kontrol kayıtları, lot geçmişi ve sınır aşımı
              alarmları aynı ekranda; üretimde neyin ne zaman, nerede olduğunu tahmin etmek yerine görürsünüz.
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
              <DemoRequest product="CyberQuan" tone="dark" align="center" />
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
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Neden CyberQuan"
            title="Hat başındaki ölçümden sevkiyata kadar aynı kayıt."
            description="Cihazlar ve lotlar ortak bir yapı üzerinde tanımlıdır. Sahadan gelen bir değer bir kere kaydedilir; dashboard, kalite ve izlenebilirlik ekranları aynı veriyi kullanır."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <MotionStaggerItem key={pillar.title}>
                <div className="group/f flex h-full flex-col gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
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
            eyebrow="Bağlanan Cihazlar"
            title="Dört veri kaynağı, ortak bir alarm mantığı."
            description="Her cihaz türü kendine uygun protokolle bağlanır, ama ölçümler ve alarmlar aynı yolu izler."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2">
            {deviceLayers.map((layer) => (
              <MotionStaggerItem key={layer.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
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
            title="Sahadan ekrana beş katman."
            description="Ölçüm cihazdan çıkar, protokol katmanını geçer, FastAPI tarafında işlenir, veritabanına kaydedilir ve React arayüzünde anlık olarak belirir."
          />
          <div className="mt-10 grid gap-4">
            {architectureLayers.map((layer, i) => (
              <MotionReveal key={layer.tier} delay={i * 0.05}>
                <div className="flex items-start gap-5 rounded-card border border-paper-50/10 bg-paper-50/5 p-6 transition-colors duration-300 hover:border-gold-500/40">
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
            eyebrow="Örnek Akışlar"
            title="Arka planda neler oluyor?"
            description="Ölçüm toplama, sınır denetimi ve kanıt ekleme, kimse elle tetiklemeden aşağıdaki sırayla ilerler."
          />
          <MotionStagger className="mt-10 grid gap-5 lg:grid-cols-3">
            {flows.map((flow) => (
              <MotionStaggerItem key={flow.title}>
                <div className="flex h-full flex-col gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
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
            <div className="mt-8 rounded-card border border-navy-950/10 bg-navy-950 p-6">
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
            title="Fabrikanın her masası için bir ekran."
            description="React + TypeScript ile yazılan modüller telefonda da çalışır. Kullanıcı, rolünün izin verdiği ekranlardan fazlasını görmez."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <MotionStaggerItem key={mod.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
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
            title="Satıştan sevkiyata, herkese kendi ekranı."
            description="Yedi rol, JWT ile korunan oturumlar üzerinden çalışır. Multi-tenant yapı sayesinde farklı firmaların verileri birbirinden ayrı kalır."
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
            eyebrow="Size Kazandırdıkları"
            title="Üretim müdürünün masasına ne gelir?"
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <MotionStaggerItem key={item.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
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
            title="Açık, yaygın teknolojiler üzerine kurulu."
            description="Sunucu tarafı Python FastAPI; MQTT, Modbus ve HLS bağlantıları bu katmanda. Arayüz React + TypeScript, veri PostgreSQL ve ClickHouse üzerinde. Bulutta ya da kendi sunucularınızda (on-premise) kurulabilir."
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
            title="CyberQuan'ı kendi hattınızın verisiyle görün."
            description="Sensör ve PLC bağlantılarını, kamera atamalarını ve ISO ekranlarını yazılım ekibimizle birlikte kuralım."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="CyberQuan" tone="dark" align="center" />
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Diğer Ürünlerimiz" title="BTM yazılım ekibinden diğer çözümler" />
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
