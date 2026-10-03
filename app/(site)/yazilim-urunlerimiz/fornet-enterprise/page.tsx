import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
import {
  Activity,
  Boxes,
  Building2,
  Cctv,
  DatabaseBackup,
  Gauge,
  HardDrive,
  KeyRound,
  Layers,
  MonitorPlay,
  Network,
  Radio,
  ScrollText,
  Server,
  ShieldBan,
  ShieldHalf,
  Siren,
  Terminal,
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

const product = getProductBySlug("fornet-enterprise")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}/` },
  ...ogMeta({ title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`, description: product.metaDescription, path: `/yazilim-urunlerimiz/${product.slug}/` }),
};

const stats = [
  { value: 6, suffix: "+", label: "VPN & güvenlik markası entegrasyonu" },
  { value: 100, suffix: "%", label: "kiracı mikro-izolasyonu" },
  { value: 3, suffix: "", label: "protokolle tek tık erişim: SSH/RDP/VNC" },
];

const heroTags = [
  "Multi-Tenant",
  "Docker",
  "VPN Otomasyonu",
  "Apache Guacamole",
  "HashiCorp Vault",
  "Zero-Trust PAM",
  "VMware ESXi",
];

const pillars = [
  {
    icon: Gauge,
    title: "Binlerce varlık tek ekranda",
    description:
      "Sistem yöneticileri ve NOC ekipleri için dağınık varlıkları anlık veri akışıyla konsolide eden merkezi gösterge paneli. Kritik alarmlar, aktif tüneller ve donanım sağlığı tek yerde.",
  },
  {
    icon: ShieldHalf,
    title: "Her müşteri kriptografik olarak izole",
    description:
      "Çok kiracılı konteyner mimarisi. Her kurum ayrı Docker ağı ve disk seviyesinde izole volume'da barındırılır; çapraz kiracı sızıntısı yapısal olarak engellenir.",
  },
  {
    icon: KeyRound,
    title: "Şifreyi görmeden Zero-Trust erişim",
    description:
      "Guacamole + Vault ile tarayıcı üzerinden, yerel bilgisayara hiçbir şey kurmadan SSH/RDP/VNC bağlantısı. Parolalar Vault'ta; oturumlar video kaydı ve komut logu ile denetlenir.",
  },
];

const monitoringFeatures = [
  {
    icon: Activity,
    title: "Anlık Metrik Konsolidasyonu",
    description:
      "Ağdaki tüm uç noktalar, aktif VPN oturumları ve yedekleme havuzları dinamik olarak sayısallaştırılır ve tek panelde toplanır.",
  },
  {
    icon: Radio,
    title: "Keep-Alive Kontrolü",
    description:
      "Entegre heartbeat mekanizması, kopan VPN tünellerini saniyeler içinde yakalar ve raporlar.",
  },
  {
    icon: Siren,
    title: "Kritik Alarmlar",
    description:
      "Eşik değer ihlallerinde anında tetiklenen görsel uyarılarla NOC ekipleri sorunlara hızla müdahale eder.",
  },
  {
    icon: MonitorPlay,
    title: "Endpoint Takibi",
    description:
      "Canlı SIEM ve erişim ajanları ile endpoint cihazları sürekli izlenir, sağlık durumu görünür kılınır.",
  },
];

const isolationFeatures = [
  {
    icon: Network,
    title: "Ayrı Docker Ağları",
    description:
      "Her kiracı için izole bir sanal bridge network tahsis edilir; kurumların trafikleri birbirine asla temas etmez.",
  },
  {
    icon: HardDrive,
    title: "İzole Volume Mimarisi",
    description:
      "Veritabanları ve kalıcı depolama alanları disk seviyesinde ayrıştırılır; her kurumun verisi kendi katmanında kalır.",
  },
  {
    icon: ShieldBan,
    title: "Sızıntı Önleme",
    description:
      "Bellek veya ağ katmanında çapraz kiracı sızıntısı (cross-tenant leak) yapısal olarak engellenmiştir.",
  },
];

const vpnBrands = [
  "Check Point",
  "Fortinet",
  "Palo Alto",
  "Cisco AnyConnect",
  "Sophos",
  "OpenVPN",
];

const networkFeatures = [
  {
    icon: Boxes,
    title: "Konteyner Tabanlı VPN",
    description:
      "Her organizasyon için arka planda ayağa kalkan müstakil tünel servisleri. Karmaşık istemci kurulumlarına ve yerel IP çakışmalarına son verir.",
  },
  {
    icon: Server,
    title: "Dinamik Proxy Ataması",
    description:
      "Tüneller üzerinden iç ağlara erişim sağlayan özel SOCKS5 ve HTTP proxy kanalları otomatik atanır.",
  },
];

const pamFeatures = [
  {
    icon: Terminal,
    title: "PAM Connect",
    description:
      "Şifreleri görmeden SSH, RDP ve VNC protokolleriyle tek tıkla canlı bağlantı. Yerel bilgisayara hiçbir yazılım kurulmaz.",
  },
  {
    icon: ShieldBan,
    title: "Anlık Karantina (Isolate)",
    description:
      "Güvenlik ihlali şüphesi duyulan cihazı tek butonla ağdan izole etme gücü; olay anında yayılmayı durdurur.",
  },
  {
    icon: ScrollText,
    title: "Kapsamlı Denetim (Audit)",
    description:
      "Oturum video kayıtları, basılan komutların loglanması ve gerçek zamanlı izleme ile tam denetlenebilirlik.",
  },
  {
    icon: Cctv,
    title: "Cihaz Envanteri",
    description:
      "Tüm sunucu, firewall, switch ve istemci envanteri tek çatı altında; Zero-Trust kurallarıyla erişim yetkilendirmesi.",
  },
];

const capacity = [
  {
    icon: KeyRound,
    title: "HashiCorp Vault Entegrasyonu",
    description:
      "Kritik cihaz parolaları ve VPN anahtarları ana veritabanında asla açık metin tutulmaz. Sadece Vault yolları saklanır; güncellemeler Check-And-Set (CAS) mekanizmasıyla korunur.",
  },
  {
    icon: DatabaseBackup,
    title: "Otomatik Yapılandırma & Versiyon Kontrolü",
    description:
      "Tüm ağ cihazlarının konfigürasyon yedekleri marka bazlı mekanizmalarla düzenli periyotlarla otomatik çekilir, versiyonlanır ve merkezi kalıcı depolamada saklanır.",
  },
  {
    icon: Layers,
    title: "VMware ESXi Entegrasyonu",
    description:
      "Sanal makinelerin güç döngüsü işlemleri (Power, Reboot), kaynak tüketim grafikleri ve dinamik envanter takibi arayüze gömülüdür.",
  },
];

const useCases = [
  "Managed Service Provider (MSP)",
  "NOC / SOC Operasyon Merkezleri",
  "Sistem Entegratörleri",
  "Kurumsal BT Operasyon Ekipleri",
  "Veri Merkezi Operasyonları",
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
                MSP merkezi altyapı, erişim ve güvenlik platformu
              </span>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.12}>
            <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
              Binlerce dağınık varlığı tek panelden izleyen; çok kiracılı konteyner mimarisiyle her
              müşteriyi kriptografik olarak izole eden, çok markalı VPN otomasyonu ve Zero-Trust
              yetkili erişim (PAM) sunan üretime hazır MSP platformu.
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
              <DemoRequest product="FORNET ENTERPRISE" tone="dark" align="center" />
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
            eyebrow="Neden FORNET ENTERPRISE"
            title="İzleme, izolasyon ve yetkili erişim tek platformda birleşir."
            description="Merkezi gösterge paneli, çok kiracılı güvenlik ve PAM aynı konteyner mimarisi üzerinde çalışır; MSP ve NOC/SOC ekipleri tüm müşteri altyapısını tek yerden yönetir."
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
            eyebrow="01 · Merkezi İzleme Mimarisi"
            title="Binlerce varlık, anlık veri akışıyla tek gösterge panelinde."
            description="NOC ekiplerinin dağınık varlıkları tek ekrandan izlemesi için tasarlandı; kritik alarmlar, aktif tüneller ve donanım sağlığı konsolide edilir."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2">
            {monitoringFeatures.map((f) => (
              <MotionStaggerItem key={f.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <f.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {f.description}
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
            eyebrow="02 · Çoklu Kiracı Güvenliği"
            title="Her kurum, kendine özel kriptografik katmanlarda barındırılır."
            description="Farklı müşteri veya departmanlara hizmet verirken kesin siber izolasyon kuralları işletilir; yapılandırmalar ve trafikler birbirine asla temas etmez."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {isolationFeatures.map((f) => (
              <MotionStaggerItem key={f.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-paper-50/10 bg-paper-50/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
                  <f.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-300 transition-colors duration-300 group-hover/f:text-paper-50"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-paper-50">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {f.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="03 · Gelişmiş Ağ Altyapısı"
            title="Çok markalı VPN yönetimini tek merkezde otomatikleştirin."
            description="Farklı lokasyonlardaki heterojen ağ yapılarını birleştiren akıllı tünelleme katmanı; dünyanın en çok tercih edilen güvenlik üreticileriyle yerleşik entegrasyon."
          />
          <MotionReveal delay={0.05} className="mt-8 flex flex-wrap gap-2">
            {vpnBrands.map((brand) => (
              <span
                key={brand}
                className="inline-block rounded-sm bg-navy-950/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-600"
              >
                {brand}
              </span>
            ))}
          </MotionReveal>
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2">
            {networkFeatures.map((f) => (
              <MotionStaggerItem key={f.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <f.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {f.description}
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
            eyebrow="04 · Yetkili Erişim Yönetimi (PAM)"
            title="Cihaz envanteri ve güvenli oturumlar, tarayıcı üzerinden."
            description="Tüm envanteri tek çatı altında toplayan; Apache Guacamole ve HashiCorp Vault ile Zero-Trust kurallarına göre erişim yetkilendiren yetkili erişim katmanı."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2">
            {pamFeatures.map((f) => (
              <MotionStaggerItem key={f.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <f.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {f.description}
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
            eyebrow="05 · Teknik Kapasite"
            title="Şifre yönetiminden sanallaştırmaya ileri düzey yetenekler."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {capacity.map((f) => (
              <MotionStaggerItem key={f.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-paper-50/10 bg-paper-50/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
                  <f.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-300 transition-colors duration-300 group-hover/f:text-paper-50"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-paper-50">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {f.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>

          <MotionReveal delay={0.1} className="mt-12">
            <h3 className="font-display text-base font-semibold text-paper-50">
              Hedef Kullanım Alanları
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {useCases.map((uc) => (
                <span
                  key={uc}
                  className="inline-flex items-center gap-2 rounded-card border border-paper-50/10 bg-paper-50/5 px-3 py-1.5 text-sm text-slate-300"
                >
                  <Building2 className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
                  {uc}
                </span>
              ))}
            </div>
          </MotionReveal>
        </Container>
      </section>

      <FaqSection items={product.faq} />

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="FORNET ENTERPRISE'ı kendi altyapınızda deneyin."
            description="Çok kiracılı kurulumdan VPN otomasyonu ve PAM yapılandırmasına kadar tüm adımlarda yanınızdayız."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="FORNET ENTERPRISE" tone="dark" align="center" />
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
