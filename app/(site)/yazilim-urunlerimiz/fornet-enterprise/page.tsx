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
  { value: 6, suffix: "+", label: "destekli VPN ve güvenlik markası" },
  { value: 100, suffix: "%", label: "kiracı bazında mikro-izolasyon" },
  { value: 3, suffix: "", label: "protokolde tek tıkla erişim: SSH/RDP/VNC" },
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
    title: "Binlerce varlığı tek ekrana sığdırın",
    description:
      "Sistem yöneticileri ve NOC ekipleri için dağınık varlıkları anlık veri akışıyla bir araya getiren merkezî gösterge paneli. Önemli alarmlar, açık tüneller ve donanım durumu aynı yerde görünür.",
  },
  {
    icon: ShieldHalf,
    title: "Her müşteri kriptografik olarak ayrışır",
    description:
      "Çok kiracılı konteyner yapısı. Her kurum kendi Docker ağında ve disk düzeyinde ayrılmış volume içinde tutulur; kiracılar arası sızıntı tasarımdan ötürü gerçekleşemez.",
  },
  {
    icon: KeyRound,
    title: "Parolayı görmeden Zero-Trust erişim",
    description:
      "Guacamole + Vault ile tarayıcıdan, yerel bilgisayara tek bir şey kurmadan SSH/RDP/VNC bağlantısı. Parolalar Vault içinde durur; oturumlar video kaydı ve komut kaydıyla izlenir.",
  },
];

const monitoringFeatures = [
  {
    icon: Activity,
    title: "Anlık Metriklerin Toplanması",
    description:
      "Ağdaki bütün uç noktalar, açık VPN oturumları ve yedekleme havuzları canlı olarak sayıya dökülür ve aynı panelde birleştirilir.",
  },
  {
    icon: Radio,
    title: "Bağlantı Canlılığı Denetimi",
    description:
      "Yerleşik heartbeat düzeneği, kopan VPN tünellerini birkaç saniye içinde fark eder ve bildirir.",
  },
  {
    icon: Siren,
    title: "Önemli Alarmlar",
    description:
      "Eşik aşımlarında anında beliren görsel uyarılar sayesinde NOC ekipleri sorunlara vakit kaybetmeden el atar.",
  },
  {
    icon: MonitorPlay,
    title: "Uç Nokta İzleme",
    description:
      "Canlı SIEM ve erişim ajanları aracılığıyla uç nokta cihazları kesintisiz gözlenir, durumları görünür kalır.",
  },
];

const isolationFeatures = [
  {
    icon: Network,
    title: "Kiracıya Özel Docker Ağları",
    description:
      "Her kiracıya kendine ait bir sanal bridge ağı verilir; kurumların trafiği birbirine hiçbir noktada değmez.",
  },
  {
    icon: HardDrive,
    title: "Ayrılmış Volume Düzeni",
    description:
      "Veritabanları ve kalıcı depolama alanları disk düzeyinde ayrı tutulur; her kurumun verisi yalnızca kendi katmanında yer alır.",
  },
  {
    icon: ShieldBan,
    title: "Sızıntıya Karşı Koruma",
    description:
      "Bellek ya da ağ katmanındaki kiracılar arası sızıntı (cross-tenant leak) tasarım gereği olanaksız kılınmıştır.",
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
      "Her kurum için arka planda kendiliğinden başlayan bağımsız tünel servisleri. Zahmetli istemci kurulumlarını ve yerel IP çakışmalarını ortadan kaldırır.",
  },
  {
    icon: Server,
    title: "Dinamik Proxy Dağıtımı",
    description:
      "Tüneller üzerinden iç ağlara ulaşım sağlayan özel SOCKS5 ve HTTP proxy kanalları kendiliğinden tanımlanır.",
  },
];

const pamFeatures = [
  {
    icon: Terminal,
    title: "PAM Connect",
    description:
      "Parolaları görmeden SSH, RDP ve VNC protokolleriyle tek tıkla canlı bağlantı. Yerel bilgisayara hiçbir yazılım yüklenmez.",
  },
  {
    icon: ShieldBan,
    title: "Anında Karantina (Isolate)",
    description:
      "Güvenlik ihlalinden kuşkulanılan cihazı tek düğmeyle ağdan koparma yetkisi; olay sırasında yayılmayı durdurur.",
  },
  {
    icon: ScrollText,
    title: "Baştan Sona Denetim (Audit)",
    description:
      "Oturum video kayıtları, girilen komutların kaydı ve anlık izleme ile eksiksiz denetlenebilirlik.",
  },
  {
    icon: Cctv,
    title: "Cihaz Envanteri",
    description:
      "Sunucu, firewall, switch ve istemci envanterinin tamamı tek yapıda toplanır; erişim yetkisi Zero-Trust kurallarına göre verilir.",
  },
];

const capacity = [
  {
    icon: KeyRound,
    title: "HashiCorp Vault Entegrasyonu",
    description:
      "Önemli cihaz parolaları ve VPN anahtarları ana veritabanında hiçbir zaman açık metin olarak durmaz. Yalnızca Vault yolları tutulur; güncellemeler Check-And-Set (CAS) düzeneğiyle güvenceye alınır.",
  },
  {
    icon: DatabaseBackup,
    title: "Otomatik Yapılandırma ve Sürüm Takibi",
    description:
      "Bütün ağ cihazlarının yapılandırma yedekleri markaya özel yöntemlerle belirli aralıklarla kendiliğinden alınır, sürümlenir ve merkezî kalıcı depolamada tutulur.",
  },
  {
    icon: Layers,
    title: "VMware ESXi Entegrasyonu",
    description:
      "Sanal makinelerin güç işlemleri (Power, Reboot), kaynak kullanım grafikleri ve canlı envanter takibi doğrudan arayüze yerleştirilmiştir.",
  },
];

const useCases = [
  "Yönetilen Hizmet Sağlayıcılar (MSP)",
  "NOC / SOC Operasyon Merkezleri",
  "Sistem Entegratörü Firmalar",
  "Kurumsal BT Operasyon Ekipleri",
  "Veri Merkezi İşletmeleri",
];

export default function Page() {
  return (
    <>
      <ProductJsonLd product={product} />
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,black,transparent_85%)]" aria-hidden="true" />
        <Container className="relative">
          <div className="max-w-3xl">
          <MotionReveal blur>
            <span className="inline-block rounded-[6px] bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-300">
              {product.code}
            </span>
          </MotionReveal>
          <MotionReveal delay={0.05} blur>
            <h1 className="mt-5 text-balance font-display text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.025em] text-white md:text-[2.75rem]">
              {product.name}
              <span className="mt-2 block text-2xl font-medium text-gold-300 md:text-3xl">
                MSP&apos;ler için merkezî altyapı, erişim ve güvenlik platformu
              </span>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.12}>
            <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
              Binlerce dağınık varlığı tek panelden izleyen; çok kiracılı konteyner yapısıyla her
              müşteriyi kriptografik olarak ayıran; çok markalı VPN otomasyonunu ve Zero-Trust
              yetkili erişimi (PAM) bir arada sunan, üretime hazır bir MSP platformu.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.16} className="mt-6 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-[6px] bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-300"
              >
                {tag}
              </span>
            ))}
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <div className="mt-8">
              <DemoRequest product="FORNET ENTERPRISE" tone="dark" />
            </div>
          </MotionReveal>

          <MotionStagger className="mt-14 grid gap-6 border-t border-paper-50/10 pt-8 sm:grid-cols-3">
            {stats.map((s) => (
              <MotionStaggerItem key={s.label}>
                <div className="font-display text-4xl font-semibold text-gold-300">
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
            eyebrow="Neden FORNET ENTERPRISE"
            title="İzleme, ayrıştırma ve yetkili erişim aynı platformda buluşur."
            description="Merkezî gösterge paneli, çok kiracılı güvenlik ve PAM aynı konteyner yapısı üzerinde işler; MSP ile NOC/SOC ekipleri bütün müşteri altyapısını tek noktadan yönetir."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <MotionStaggerItem key={pillar.title}>
                <div className="group/f flex h-full flex-col gap-4 card-v2 card-v2-link p-6">
                  <pillar.icon
                    className="h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-950">
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

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="01 · Merkezî İzleme Yapısı"
            title="Binlerce varlık, anlık veri akışıyla tek gösterge panelinde toplanır."
            description="NOC ekiplerinin dağınık varlıkları tek ekrandan takip etmesi için kurgulandı; önemli alarmlar, açık tüneller ve donanım durumu bir araya getirilir."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2">
            {monitoringFeatures.map((f) => (
              <MotionStaggerItem key={f.title}>
                <div className="group/f flex h-full items-start gap-4 card-v2 card-v2-link p-6">
                  <f.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-950">
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
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="02 · Çok Kiracılı Güvenlik"
            title="Her kurum, yalnızca kendisine ait kriptografik katmanlarda tutulur."
            description="Farklı müşteri ya da departmanlara hizmet verilirken kesin ayrıştırma kuralları uygulanır; yapılandırmalar ve trafik birbirine hiçbir yerde değmez."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {isolationFeatures.map((f) => (
              <MotionStaggerItem key={f.title}>
                <div className="group/f flex h-full items-start gap-4 card-v2-dark p-6 transition-colors duration-200 hover:border-gold-300/40">
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
            eyebrow="03 · İleri Düzey Ağ Altyapısı"
            title="Çok markalı VPN yönetimini tek merkezden otomatiğe bağlayın."
            description="Farklı lokasyonlardaki birbirinden farklı ağ yapılarını tek çatıda toplayan akıllı tünelleme katmanı; sektörde en çok yeğlenen güvenlik üreticileriyle yerleşik uyum."
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
                <div className="group/f flex h-full items-start gap-4 card-v2 card-v2-link p-6">
                  <f.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-950">
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

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="04 · Yetkili Erişim Yönetimi (PAM)"
            title="Cihaz envanteri ve güvenli oturumlar, doğrudan tarayıcıdan."
            description="Bütün envanteri tek yapıda toplayan; Apache Guacamole ve HashiCorp Vault ile Zero-Trust kurallarına göre erişim yetkisi veren yetkili erişim katmanı."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2">
            {pamFeatures.map((f) => (
              <MotionStaggerItem key={f.title}>
                <div className="group/f flex h-full items-start gap-4 card-v2 card-v2-link p-6">
                  <f.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-950">
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
            title="Parola yönetiminden sanallaştırmaya uzanan ileri yetenekler."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {capacity.map((f) => (
              <MotionStaggerItem key={f.title}>
                <div className="group/f flex h-full items-start gap-4 card-v2-dark p-6 transition-colors duration-200 hover:border-gold-300/40">
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
              Kimler İçin Uygun
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
            title="FORNET ENTERPRISE'ı kendi altyapınızda görün."
            description="Çok kiracılı kurulumdan VPN otomasyonuna ve PAM yapılandırmasına kadar her adımda yanınızda oluruz."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="FORNET ENTERPRISE" tone="dark" align="center" />
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Diğer Ürünlerimiz" title="Ürün ailemizdeki öteki çözümler" />
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
