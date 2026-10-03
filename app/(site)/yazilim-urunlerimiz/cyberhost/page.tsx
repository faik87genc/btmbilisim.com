import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
import {
  Activity,
  Bell,
  Building2,
  Check,
  FileText,
  KeyRound,
  Layers,
  Network,
  Palette,
  PackageSearch,
  RefreshCw,
  ShieldCheck,
  Users,
  Wallet,
  Wifi,
  Zap,
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

const product = getProductBySlug("cyberhost")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}/` },
  ...ogMeta({ title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`, description: product.metaDescription, path: `/yazilim-urunlerimiz/${product.slug}/` }),
};

const stats = [
  { value: 20, suffix: "+", label: "MikroTik modülü" },
  { value: 8, suffix: "", label: "captive portal teması" },
  { value: 6, suffix: "", label: "yetki seviyesi (RBAC)" },
];

const pillars = [
  {
    icon: Wifi,
    title: "Misafir ağı ilk saniyede karşılanır",
    description:
      "8 hazır captive portal temasından birini seçin, logo ve metinlerinizle özelleştirin, RouterOS'a tek tuşla gönderin. SMS, e-posta, WhatsApp, sosyal medya, voucher, QR, LDAP veya şifreyle giriş.",
  },
  {
    icon: FileText,
    title: "Her kayıt yasal olarak ispatlanabilir",
    description:
      "5651 logları HMAC-SHA256 hash zinciriyle birbirine bağlanır, günlük root hash TSA zaman damgasıyla mühürlenir. Kayıt silinemez; zincir kırılırsa anında tespit edilir.",
  },
  {
    icon: Building2,
    title: "Her firma kendi alanında",
    description:
      "Platform → Firma → Şube → Cihaz hiyerarşisi. Her firma yalnızca kendi verisine erişir; beyaz etiket ile logo, alan adı ve tema müşterinize özel markalanır.",
  },
];

const modules = [
  {
    icon: Palette,
    title: "Captive Portal",
    description:
      "8 profesyonel tema ile özelleştirilebilir giriş sayfası. SMS, e-posta, WhatsApp, sosyal medya, voucher, QR, LDAP ve şifre ile kimlik doğrulama. RouterOS'a tek tuşla push.",
  },
  {
    icon: FileText,
    title: "5651 Loglama",
    description:
      "HMAC-SHA256 hash zinciri ile değiştirilemez log kaydı. Her şube kendi bağımsız zincirine sahip; günlük root hash TSA zaman damgası ile mühürlenir.",
  },
  {
    icon: Building2,
    title: "Çoklu Kiracı (Multi-tenant)",
    description:
      "Platform → Firma → Şube → Cihaz hiyerarşisi. Her firma kendi verilerine erişir. Beyaz etiket (logo, domain, tema) ile müşterinize özel markalama.",
  },
  {
    icon: Network,
    title: "MikroTik Entegrasyonu",
    description:
      "20'den fazla RouterOS modülü: VLAN, Bridge VLAN, DHCP, Hotspot, Firewall, NAT, Mangle, Queue, PPPoE, Wireless, Address List. DB öncelikli mimari.",
  },
  {
    icon: Users,
    title: "RBAC & MFA",
    description:
      "Süper Admin'den sadece okuma yetkisine 6 seviyeli rol. Detaylı denetim kaydıyla kim ne yaptı takibi. TOTP ile çok faktörlü kimlik doğrulama.",
  },
  {
    icon: Activity,
    title: "İzleme & Alerting",
    description:
      "Anlık router izleme: CPU, RAM, disk, sıcaklık ve interface trafiği. Eşik bazlı uyarılar; Telegram, e-posta, Slack ve webhook bildirimleri.",
  },
  {
    icon: Layers,
    title: "Toplu İşlem (Bulk)",
    description:
      "Tek ekrandan tüm router'lara VLAN, DHCP, firewall ve hotspot dağıtımı. Çok lokasyonlu kurumlar ve MSP'ler için zaman kazandıran toplu yönetim.",
  },
  {
    icon: ShieldCheck,
    title: "Güvenlik & Lisans",
    description:
      "İstemci izolasyonu, firewall, SHA256 bütünlük koruması ve anti-tamper sistemi. Lisans süresi dolduğunda API erişimi engellenir.",
  },
  {
    icon: Wallet,
    title: "Yedekleme & Geri Yükleme",
    description:
      "RouterOS konfigürasyon yedeği (.backup) ve export (.rsc). Router bazında listeleme, oluşturma, silme ve geri yükleme.",
  },
  {
    icon: Zap,
    title: "Hızlı Kurulum",
    description:
      "Tek port (3001) üzerinde monolitik mimari. SQLite ile sıfır yapılandırma, 5 dakikada kurulum; üretimde PostgreSQL'e geçiş desteği.",
  },
];

const architecture = `CyberHost Platform
  ├── Firma A (Beyaz etiket: logo, domain, tema)
  │     ├── Şube 1 → Router (MikroTik)
  │     │     ├── VLAN / Bridge VLAN / DHCP / PPPoE
  │     │     ├── Hotspot + Captive Portal + Voucher
  │     │     ├── Firewall (Filter + NAT + Mangle + Address List)
  │     │     ├── Queue (Simple + Tree) / Wireless
  │     │     ├── Monitoring (CPU/RAM/Disk/Isı/Trafik)
  │     │     └── 5651 Log + TSA Arşiv
  │     └── Şube 2 → Router (MikroTik) ...
  ├── Firma B ...
  └── Sistem Servisleri
        ├── RBAC (6 rol) + MFA (TOTP) + Audit Log
        ├── SMS / E-posta (firma bazlı)
        ├── LDAP/AD (sistem geneli)
        ├── Alerting (Telegram/E-posta/Slack/Webhook)
        └── Tek / Çoklu Router Modu`;

const portalThemes = [
  { name: "Safir Premium", style: "Koyu lacivert + kırmızı aksan", use: "Otel, kurumsal" },
  { name: "Fildişi Zarif", style: "Krem tonları + altın aksan", use: "Kafe, restoran, butik" },
  { name: "Obsidyen Karanlık", style: "Tam siyah + kırmızı aksan", use: "Gece kulübü, bar" },
  { name: "Neon Nights", style: "Koyu mor + cyan neon", use: "Eğlence mekânı, etkinlik" },
  { name: "Mor İhtişam", style: "Mor gradyan + mor aksan", use: "AVM, alışveriş merkezi" },
  { name: "Citrus Fresh", style: "Turuncu + sarı gradyan", use: "Plaj, havuz, yazlık" },
  { name: "Okyanus Derin", style: "Lacivert + turkuaz", use: "Hastane, sağlık" },
  { name: "Orman Premium", style: "Koyu yeşil + yeşil aksan", use: "Doğa oteli, kamp" },
];

const authMethods = [
  { title: "SMS Doğrulama", description: "Telefon numarasına tek kullanımlık şifre gönderimi." },
  { title: "E-posta Doğrulama", description: "E-posta adresine bağlantı veya kod gönderimi." },
  { title: "WhatsApp", description: "WhatsApp mesajı ile doğrulama kodu." },
  { title: "Sosyal Medya", description: "Google, Facebook ve X hesabıyla giriş." },
  { title: "Voucher", description: "Süre, kota veya hız bazlı basılı/dijital voucher." },
  { title: "QR Kod", description: "Karekod okutarak anında bağlantı." },
  { title: "Şifre", description: "Statik Wi-Fi şifresi ile giriş." },
  { title: "LDAP/AD", description: "Kurumsal Active Directory ile kimlik doğrulama." },
];

const mikrotikModules = [
  "VLAN Yönetimi (Interface VLAN)",
  "Bridge VLAN (Tagged/Untagged)",
  "DHCP Server + Lease + Static",
  "Hotspot + Kullanıcı Yönetimi",
  "Captive Portal (8 Tema)",
  "Firewall Filter + NAT + Mangle",
  "Address Listeleri",
  "Queue Simple + Tree",
  "PPPoE Secret + Profile + Session",
  "Wireless Registration + Access List",
  "IP Pool / DHCP Network",
  "Sistem + Interface Monitoring",
];

const complianceItems = [
  "HMAC-SHA256 hash zinciri ile her log kaydı bir öncekine bağlanır",
  "Günlük root hash TSA zaman damgası ile mühürlenir",
  "Log kaydı silinemez, değiştirilemez — zincir kırılması anında tespit edilir",
  "DHCP, hotspot, sistem ve istemci logları ayrı ayrı kaydedilir",
  "Her şube kendi bağımsız hash zincirine sahiptir",
  "Detaylı log sorgulama, doğrulama ve arşiv görüntüleme",
];

const roles = [
  { role: "Süper Admin", scope: "Tam yetki, tüm sistem, lisans yönetimi", who: "Platform sahibi" },
  { role: "Platform Admin", scope: "Tüm firmaları yönetme", who: "Operasyon ekibi" },
  { role: "Firma Admin", scope: "Kendi firması ve şubeleri", who: "Müşteri firma yöneticisi" },
  { role: "Şube Admin", scope: "Kendi şubesi", who: "Şube müdürü" },
  { role: "Operatör", scope: "Günlük işlemler (voucher, rapor)", who: "Resepsiyon, çalışan" },
  { role: "Sadece Oku", scope: "Görüntüleme, işlem yapamaz", who: "Denetim, raporlama" },
];

const securityHighlights = [
  {
    icon: ShieldCheck,
    title: "Bütünlük koruması & anti-tamper",
    description:
      "Kritik dosyalar SHA256 ile korunur. Yetkisiz değişiklik tespit edilirse sistem kapanır; lisans süresi dolduğunda tüm API istekleri engellenir.",
  },
  {
    icon: KeyRound,
    title: "MFA (TOTP) & denetim kaydı",
    description:
      "Google Authenticator ve Microsoft Authenticator ile çok faktörlü doğrulama. Tüm kullanıcı işlemleri detaylı audit log ile kayıt altına alınır.",
  },
];

const monitoring = [
  {
    icon: Activity,
    title: "Router kaynak izleme",
    description: "CPU yükü, RAM kullanımı, disk doluluk oranı ve sıcaklık anlık izlenir.",
  },
  {
    icon: RefreshCw,
    title: "Interface trafiği",
    description: "Anlık TX/RX hızları ve toplam veri miktarı port bazında raporlanır.",
  },
  {
    icon: Bell,
    title: "Alert engine",
    description: "Eşik bazlı akıllı uyarı kuralları tanımlayın (CPU > %90, RAM > %80 vb.).",
  },
  {
    icon: Network,
    title: "Bildirim kanalları",
    description: "Telegram, e-posta, Slack ve webhook entegrasyonlarıyla anında haberdar olun.",
  },
  {
    icon: PackageSearch,
    title: "Geçmiş verisi",
    description: "Tüm metrikler zaman serisi olarak saklanır ve grafiklerle görselleştirilir.",
  },
];

const techStack = [
  "Node.js + Express (ESM)",
  "Prisma ORM",
  "SQLite (dev) / PostgreSQL (prod)",
  "React + Vite",
  "shadcn/ui + Tailwind CSS",
  "RouterOS API (node-routeros)",
  "JWT + LDAP/AD",
  "MFA (TOTP)",
  "HMAC-SHA256 + TSA",
  "SSL/TLS",
];

const deployment = [
  { label: "Platform", value: "Windows, Linux, macOS" },
  { label: "Bağımlılık", value: "Node.js 18+" },
  { label: "Veritabanı", value: "SQLite (geliştirme) / PostgreSQL (üretim)" },
  { label: "Port", value: "3001 (backend + frontend tek port)" },
  { label: "Kurulum süresi", value: "5 dakikadan kısa" },
  { label: "Kullanıcı sayısı", value: "Sınırsız (RBAC ile yönetim)" },
  { label: "Router sayısı", value: "Sınırsız (çoklu router yönetimi)" },
];

const tiers = ["Professional", "MSP", "Enterprise"] as const;

const tierMatrix: { feature: string; included: [boolean, boolean, boolean] }[] = [
  { feature: "Hotspot + Captive Portal (8 tema)", included: [true, true, true] },
  { feature: "5651 loglama + TSA", included: [true, true, true] },
  { feature: "Voucher (süre / kota / hız / çoklu cihaz)", included: [true, true, true] },
  { feature: "SMS / e-posta doğrulama", included: [true, true, true] },
  {
    feature: "Firewall + NAT + Mangle + VLAN + DHCP + PPPoE",
    included: [true, true, true],
  },
  { feature: "Wireless yönetimi", included: [false, true, true] },
  { feature: "Çoklu kiracı (multi-tenant)", included: [false, true, true] },
  { feature: "Çoklu router + toplu işlem (bulk)", included: [false, true, true] },
  { feature: "Router izleme + alerting", included: [false, true, true] },
  { feature: "Yedekleme & geri yükleme", included: [false, true, true] },
  { feature: "RBAC (6 rol) + audit log", included: [false, true, true] },
  { feature: "LDAP/AD entegrasyonu", included: [false, false, true] },
  { feature: "MFA (TOTP)", included: [false, false, true] },
  { feature: "PostgreSQL", included: [false, false, true] },
  { feature: "Beyaz etiket (logo / domain / tema)", included: [false, false, true] },
  { feature: "SAML/SSO + API erişimi", included: [false, false, true] },
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
                Wi-Fi hotspot ve ağ yönetim platformu
              </span>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.12}>
            <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
              CyberHost; otel, kafe, AVM, hastane ve kurumsal mekânlar için geliştirilmiş kapsamlı
              bir Wi-Fi hotspot ve ağ yönetim platformudur. MikroTik RouterOS cihazlarıyla tam
              uyumlu çalışır; merkezi yönetim, 5651 yasal loglama, 8 temalı captive portal, çoklu
              kiracı mimarisi, RBAC, MFA, izleme ve alerting özelliklerini tek panelde toplar.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.18}>
            <div className="mt-8">
              <DemoRequest product="CyberHost" tone="dark" align="center" />
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
            eyebrow="Neden CyberHost"
            title="Misafir ağı, yasal loglama ve çoklu şube yönetimi tek panelde birleşir."
            description="Portal tasarımı, kimlik doğrulama, firewall kuralları ve 5651 arşivi aynı veri modeli üzerinde çalışır; ayar bir kez yapılır, her şubeye uygulanır."
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
            eyebrow="Temel Özellikler"
            title="Captive portaldan yedeklemeye kadar on modül."
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

      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-24">
        <div
          className="animate-glow-pulse pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <MotionReveal direction="right">
              <SectionHeading
                tone="dark"
                eyebrow="Sistem Mimarisi"
                title="Platformdan cihaza kadar dört katmanlı hiyerarşi."
                description="Her firma kendi şubelerini, her şube kendi router'ını yönetir. Sistem servisleri (RBAC, MFA, SMS/e-posta, LDAP, alerting) tüm katmanların üzerinde ortak çalışır."
              />
            </MotionReveal>
            <MotionReveal delay={0.1} direction="left" blur>
              <div className="rounded-card border border-paper-50/10 bg-paper-50/5 p-6">
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
                  {architecture}
                </pre>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-gold-300">
                  Tek / çoklu router modu · DB öncelikli mimari
                </p>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Captive Portal"
            title="Mekânınıza uyan giriş deneyimini sekiz temadan seçin."
            description="Her tema renk, logo ve metin düzeyinde tamamen özelleştirilebilir; hazırladığınız portal RouterOS'a tek tuşla gönderilir."
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portalThemes.map((theme) => (
              <MotionStaggerItem key={theme.name}>
                <div className="flex h-full flex-col rounded-card border border-navy-950/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <h3 className="font-display text-base font-semibold text-ink-900">
                    {theme.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{theme.style}</p>
                  <p className="mt-4 border-t border-navy-950/10 pt-3 font-mono text-[11px] uppercase tracking-wider text-gold-800">
                    {theme.use}
                  </p>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>

          <div className="mt-16">
            <SectionHeading
              eyebrow="Kimlik Doğrulama"
              title="Sekiz farklı yöntemle misafir girişi."
            />
            <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {authMethods.map((method) => (
                <MotionStaggerItem key={method.title}>
                  <div className="flex h-full flex-col gap-2 rounded-card border border-navy-950/10 bg-white p-5 transition-colors duration-300 hover:border-gold-500/40">
                    <h3 className="font-display text-sm font-semibold text-ink-900">
                      {method.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {method.description}
                    </p>
                  </div>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </div>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="MikroTik Modülleri"
            title="RouterOS'un yönettiğiniz her katmanı arayüzde karşılığını bulur."
            description="VLAN'dan queue'ya, PPPoE'den wireless erişim listelerine kadar 20'den fazla modül; değişiklikler önce veritabanına yazılır, ardından cihaza uygulanır."
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mikrotikModules.map((mod) => (
              <MotionStaggerItem
                key={mod}
                as="div"
                className="flex items-start gap-3 rounded-card border border-navy-950/10 bg-white p-4 transition-colors duration-300 hover:border-gold-500/40"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-ink-900">{mod}</span>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="5651 Uyumluluğu"
            title="Loglarınız kanunun aradığı bütünlükle saklanır."
            description="CyberHost, 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi kanununa uyumlu, değiştirilemez bir loglama altyapısı sunar."
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {complianceItems.map((item) => (
              <MotionStaggerItem
                key={item}
                as="div"
                className="flex items-start gap-3 rounded-card border border-paper-50/10 bg-paper-50/5 p-4 transition-colors duration-300 hover:border-gold-500/40"
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-slate-300">{item}</span>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Yetkilendirme & Güvenlik"
            title="Altı rol, tek denetim izi."
            description="Her kullanıcı yalnızca sorumlu olduğu katmanı görür; yaptığı her işlem audit log'a yazılır."
          />
          <MotionReveal delay={0.05} className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-navy-950/10">
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-gold-800">
                    Rol
                  </th>
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-gold-800">
                    Yetki
                  </th>
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-gold-800">
                    Kullanım alanı
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.role} className="border-b border-navy-950/10 bg-white">
                    <td className="px-4 py-3 font-medium text-ink-900">{r.role}</td>
                    <td className="px-4 py-3 text-slate-500">{r.scope}</td>
                    <td className="px-4 py-3 text-slate-500">{r.who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MotionReveal>

          <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2">
            {securityHighlights.map((item) => (
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

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="İzleme & Uyarı"
            title="Router'ınız yavaşlamadan önce haberiniz olsun."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {monitoring.map((item) => (
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
            eyebrow="Teknik Altyapı"
            title="Tek porttan çalışan, sıkıcı ve dayanıklı bir stack."
            description="Node.js + Express üzerinde Prisma ORM, React + Vite arayüz ve node-routeros ile SSL/TLS korumalı RouterOS API bağlantısı. Geliştirmede SQLite ile sıfır yapılandırma, üretimde PostgreSQL."
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

          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deployment.map((item) => (
              <MotionStaggerItem key={item.label}>
                <div className="h-full rounded-card border border-paper-50/10 bg-paper-50/5 p-5 transition-colors duration-300 hover:border-gold-500/40">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-gold-300">
                    {item.label}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-paper-50">{item.value}</div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Sürümler"
            title="Tek şubeden MSP ölçeğine kadar üç sürüm."
            description="Professional tek lokasyonlu işletmeler, MSP çok şubeli operasyonlar, Enterprise ise kurumsal kimlik ve beyaz etiket ihtiyacı olan yapılar için tasarlandı."
          />
          <MotionReveal delay={0.05} className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-navy-950/10">
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-gold-800">
                    Özellik
                  </th>
                  {tiers.map((tier) => (
                    <th
                      key={tier}
                      className="px-4 py-3 text-center font-mono text-[11px] uppercase tracking-wider text-gold-800"
                    >
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tierMatrix.map((row) => (
                  <tr key={row.feature} className="border-b border-navy-950/10 bg-white">
                    <td className="px-4 py-3 text-ink-900">{row.feature}</td>
                    {row.included.map((has, i) => (
                      <td key={tiers[i]} className="px-4 py-3 text-center">
                        {has ? (
                          <>
                            <Check
                              className="mx-auto h-4 w-4 text-gold-500"
                              aria-hidden="true"
                            />
                            <span className="sr-only">
                              {tiers[i]} sürümünde var
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-slate-400" aria-hidden="true">
                              —
                            </span>
                            <span className="sr-only">
                              {tiers[i]} sürümünde yok
                            </span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </MotionReveal>
        </Container>
      </section>

      <FaqSection items={product.faq} />

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="CyberHost'u kendi MikroTik altyapınızda deneyin."
            description="Kurulumdan captive portal tasarımına ve 5651 arşivine kadar tüm adımlarda yanınızdayız."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="CyberHost" tone="dark" align="center" />
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
