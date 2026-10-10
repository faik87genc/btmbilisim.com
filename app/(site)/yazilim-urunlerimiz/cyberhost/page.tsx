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
  { value: 20, suffix: "+", label: "RouterOS modülü arayüzde" },
  { value: 8, suffix: "", label: "hazır portal tasarımı" },
  { value: 6, suffix: "", label: "RBAC rolü" },
];

const pillars = [
  {
    icon: Wifi,
    title: "Misafir, bağlanır bağlanmaz markanızı görür",
    description:
      "Sekiz tasarımdan size uyanı alıp logonuzu ve karşılama yazınızı ekleyin; portal tek tıkla RouterOS'a yüklenir. Misafir dilerse SMS, e-posta, WhatsApp, sosyal hesap, voucher, QR, LDAP ya da şifreyle bağlanır.",
  },
  {
    icon: FileText,
    title: "5651 kayıtlarınız denetimde kendini kanıtlar",
    description:
      "Her log satırı HMAC-SHA256 ile bir önceki satıra zincirlenir; gün sonunda oluşan root hash'e TSA zaman damgası basılır. Silinen ya da oynanan bir satır zinciri bozar ve bu durum hemen görünür.",
  },
  {
    icon: Building2,
    title: "Müşterilerinizin verisi birbirine karışmaz",
    description:
      "Yapı dört basamaklıdır: platform, firma, şube, cihaz. Bir firma başka bir firmanın kaydını göremez; beyaz etiket desteğiyle her müşteri paneli kendi logosu, alan adı ve renkleriyle açar.",
  },
];

const modules = [
  {
    icon: Palette,
    title: "Captive Portal",
    description:
      "Sekiz tasarımdan türetilen, tamamen size göre düzenlenen karşılama sayfası. Giriş seçenekleri: SMS, e-posta, WhatsApp, sosyal hesap, voucher, QR, LDAP, şifre. Hazır sayfa RouterOS'a tek tıkla aktarılır.",
  },
  {
    icon: FileText,
    title: "5651 Loglama",
    description:
      "HMAC-SHA256 zinciriyle sonradan düzeltilemeyen kayıt. Şubelerin zincirleri birbirinden ayrıdır; her günün root hash değeri TSA damgasıyla kapatılır.",
  },
  {
    icon: Building2,
    title: "Çoklu Kiracı (Multi-tenant)",
    description:
      "Platform, firma, şube ve cihaz basamaklarından oluşan yapı. Firmalar yalnızca kendi kayıtlarıyla çalışır; logo, alan adı ve tema beyaz etiketle müşteriye göre değişir.",
  },
  {
    icon: Network,
    title: "MikroTik Entegrasyonu",
    description:
      "VLAN, Bridge VLAN, DHCP, Hotspot, Firewall, NAT, Mangle, Queue, PPPoE, Wireless ve Address List dahil yirmiyi aşkın RouterOS modülü. Ayarlar önce veritabanına yazılır (DB öncelikli).",
  },
  {
    icon: Users,
    title: "RBAC & MFA",
    description:
      "Süper Admin ile salt görüntüleme arasında altı rol basamağı. Hangi kullanıcının hangi değişikliği yaptığı denetim kaydında durur; girişte TOTP ile ikinci adım istenir.",
  },
  {
    icon: Activity,
    title: "İzleme & Alerting",
    description:
      "Router'ların CPU, RAM, disk, sıcaklık ve port trafiği canlı takip edilir. Belirlediğiniz eşik aşıldığında Telegram, e-posta, Slack ya da webhook üzerinden haber gelir.",
  },
  {
    icon: Layers,
    title: "Toplu İşlem (Bulk)",
    description:
      "VLAN, DHCP, firewall ve hotspot ayarını tek seferde bütün router'lara gönderin. Çok şubeli işletmeler ve MSP'ler aynı değişikliği cihaz cihaz yapmaktan kurtulur.",
  },
  {
    icon: ShieldCheck,
    title: "Güvenlik & Lisans",
    description:
      "İstemciler birbirinden yalıtılır; firewall, SHA256 dosya bütünlüğü kontrolü ve anti-tamper koruması devrededir. Lisans bittiğinde API çağrıları kabul edilmez.",
  },
  {
    icon: Wallet,
    title: "Yedekleme & Geri Yükleme",
    description:
      "Her router için .backup yedeği ve .rsc export dosyası alın; yedekleri cihaz bazında görüntüleyin, yenisini oluşturun, silin ya da geri dönün.",
  },
  {
    icon: Zap,
    title: "Hızlı Kurulum",
    description:
      "Arayüz ve servis 3001 numaralı tek portta, monolitik yapıda çalışır. SQLite sayesinde ayar gerektirmeden 5 dakika içinde ayağa kalkar; canlı ortamda PostgreSQL'e taşınabilir.",
  },
];

const architecture = `CyberHost Platform
  ├── Firma A (kendi logosu, alan adı ve teması)
  │     ├── Şube 1 → MikroTik router
  │     │     ├── VLAN / Bridge VLAN / DHCP / PPPoE
  │     │     ├── Hotspot + Captive Portal + Voucher
  │     │     ├── Firewall (Filter + NAT + Mangle + Address List)
  │     │     ├── Queue (Simple + Tree) / Wireless
  │     │     ├── İzleme (CPU/RAM/Disk/Isı/Trafik)
  │     │     └── 5651 kayıtları + TSA arşivi
  │     └── Şube 2 → MikroTik router ...
  ├── Firma B ...
  └── Ortak servisler
        ├── RBAC (6 rol) + MFA (TOTP) + Audit Log
        ├── SMS / E-posta (her firmaya ayrı)
        ├── LDAP/AD (tüm platformda)
        ├── Uyarılar (Telegram/E-posta/Slack/Webhook)
        └── Tekli ya da çoklu router çalışması`;

const portalThemes = [
  { name: "Safir Premium", style: "Gece mavisi zemin, kırmızı vurgular", use: "Otel, kurumsal" },
  { name: "Fildişi Zarif", style: "Krem zemin, altın detaylar", use: "Kafe, restoran, butik" },
  { name: "Obsidyen Karanlık", style: "Simsiyah zemin, kırmızı vurgular", use: "Gece kulübü, bar" },
  { name: "Neon Nights", style: "Koyu mor zemin, cyan neon çizgiler", use: "Eğlence mekânı, etkinlik" },
  { name: "Mor İhtişam", style: "Mor geçişli zemin, mor vurgular", use: "AVM, alışveriş merkezi" },
  { name: "Citrus Fresh", style: "Turuncudan sarıya geçiş", use: "Plaj, havuz, yazlık" },
  { name: "Okyanus Derin", style: "Lacivert ve turkuaz tonlar", use: "Hastane, sağlık" },
  { name: "Orman Premium", style: "Koyu yeşil zemin, açık yeşil vurgular", use: "Doğa oteli, kamp" },
];

const authMethods = [
  { title: "SMS Doğrulama", description: "Misafirin cep telefonuna tek seferlik kod gider." },
  { title: "E-posta Doğrulama", description: "Girilen adrese onay linki ya da kod iletilir." },
  { title: "WhatsApp", description: "Kod, WhatsApp mesajı olarak ulaşır." },
  { title: "Sosyal Medya", description: "Google, Facebook veya X hesabıyla bağlanma." },
  { title: "Voucher", description: "Süreye, kotaya ya da hıza göre tanımlanan kâğıt veya dijital kupon." },
  { title: "QR Kod", description: "Kodu telefonla okutan misafir hemen internete çıkar." },
  { title: "Şifre", description: "Herkese verilen sabit Wi-Fi şifresiyle bağlanma." },
  { title: "LDAP/AD", description: "Çalışanlar şirketin Active Directory hesabıyla girer." },
];

const mikrotikModules = [
  "Interface VLAN tanımları",
  "Bridge VLAN (Tagged/Untagged)",
  "DHCP Server, Lease ve Static kayıtları",
  "Hotspot ve kullanıcıları",
  "Captive Portal, sekiz tasarımla",
  "Firewall Filter, NAT ve Mangle",
  "Address List yönetimi",
  "Queue Simple ve Queue Tree",
  "PPPoE Secret, Profile ve Session",
  "Wireless Registration ve Access List",
  "IP Pool / DHCP Network",
  "Sistem ve interface izleme",
];

const complianceItems = [
  "Yeni log satırı, HMAC-SHA256 ile kendinden önceki satıra kilitlenir",
  "Gün kapanırken root hash değerine TSA zaman damgası eklenir",
  "Kayıtlar silinemez ve düzeltilemez; zincirdeki her kopukluk o an fark edilir",
  "DHCP, hotspot, sistem ve istemci kayıtları ayrı tutulur",
  "Şubelerin her birinin kendine ait hash zinciri vardır",
  "Geçmiş kayıtlar aranabilir, doğrulanabilir ve arşivden açılabilir",
];

const roles = [
  { role: "Süper Admin", scope: "Sistemin tamamı ve lisans dahil her şey", who: "Platformu işleten taraf" },
  { role: "Platform Admin", scope: "Platformdaki bütün firmalar", who: "Operasyon ekibi" },
  { role: "Firma Admin", scope: "Yalnızca kendi firması ve bağlı şubeler", who: "Müşterideki yetkili" },
  { role: "Şube Admin", scope: "Yalnızca sorumlu olduğu şube", who: "Şube sorumlusu" },
  { role: "Operatör", scope: "Voucher basma, rapor alma gibi günlük işler", who: "Resepsiyon, personel" },
  { role: "Sadece Oku", scope: "Ekranları görür, değişiklik yapamaz", who: "Denetçi, raporlama" },
];

const securityHighlights = [
  {
    icon: ShieldCheck,
    title: "Dosya bütünlüğü ve anti-tamper",
    description:
      "Önemli dosyaların SHA256 özeti sürekli kontrol edilir; izinsiz bir değişiklik görülürse uygulama kendini durdurur. Lisans süresi bittiğinde API isteklerinin hiçbiri yanıtlanmaz.",
  },
  {
    icon: KeyRound,
    title: "TOTP ile MFA, eksiksiz audit log",
    description:
      "Google Authenticator veya Microsoft Authenticator ile ikinci doğrulama adımı. Kullanıcıların panelde yaptığı her işlem ayrıntılarıyla denetim kaydına geçer.",
  },
];

const monitoring = [
  {
    icon: Activity,
    title: "Donanım kaynakları",
    description: "İşlemci yükü, bellek, disk doluluğu ve cihaz sıcaklığı canlı olarak görünür.",
  },
  {
    icon: RefreshCw,
    title: "Port trafiği",
    description: "Her port için o anki TX/RX hızı ve toplam aktarılan veri raporlanır.",
  },
  {
    icon: Bell,
    title: "Uyarı kuralları",
    description: "CPU > %90 ya da RAM > %80 gibi eşikler koyun; aşıldığında kural tetiklenir.",
  },
  {
    icon: Network,
    title: "Haber kanalları",
    description: "Uyarılar Telegram, e-posta, Slack veya webhook ile size ulaşır.",
  },
  {
    icon: PackageSearch,
    title: "Metrik geçmişi",
    description: "Ölçümler zaman serisi olarak tutulur, geriye dönük grafiklerle incelenir.",
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
  { label: "Kurulum süresi", value: "5 dakikanın altında" },
  { label: "Kullanıcı sayısı", value: "Limit yok, roller RBAC ile atanır" },
  { label: "Router sayısı", value: "Limit yok, hepsi tek panelden" },
];

const tiers = ["Professional", "MSP", "Enterprise"] as const;

const tierMatrix: { feature: string; included: [boolean, boolean, boolean] }[] = [
  { feature: "Hotspot + Captive Portal (8 tema)", included: [true, true, true] },
  { feature: "5651 loglama + TSA", included: [true, true, true] },
  { feature: "Voucher: süre, kota, hız, birden çok cihaz", included: [true, true, true] },
  { feature: "SMS ya da e-postayla giriş", included: [true, true, true] },
  {
    feature: "Firewall + NAT + Mangle + VLAN + DHCP + PPPoE",
    included: [true, true, true],
  },
  { feature: "Wireless yönetimi", included: [false, true, true] },
  { feature: "Çoklu kiracı (multi-tenant)", included: [false, true, true] },
  { feature: "Birden çok router, toplu işlem (bulk)", included: [false, true, true] },
  { feature: "Router izleme ve uyarılar", included: [false, true, true] },
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
                Misafir Wi-Fi ve MikroTik ağlarını yöneten platform
              </span>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.12}>
            <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
              Otel lobisinde, kafede, AVM koridorunda ya da hastane bekleme salonunda misafirlerinize
              internet açıyorsanız CyberHost bu işin tamamını üstlenir. MikroTik RouterOS cihazlarınıza
              doğrudan bağlanır; captive portal (8 tasarım), 5651 kayıtları, çoklu kiracı yapısı, RBAC,
              MFA, cihaz izleme ve uyarılar tek bir yönetim ekranından yürür.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.18}>
            <div className="mt-8">
              <DemoRequest product="CyberHost" tone="dark" />
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
            eyebrow="Neden CyberHost"
            title="Hotspot, 5651 arşivi ve şube ağları için ayrı araç aramayın."
            description="Giriş sayfası, doğrulama yöntemleri, firewall kuralları ve log arşivi ortak bir veritabanını paylaşır. Bir ayarı merkezde tanımlarsınız, istediğiniz şubelere dağıtırsınız."
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
            eyebrow="Modüller"
            title="On modül, bir yönetim ekranı."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <MotionStaggerItem key={mod.title}>
                <div className="group/f flex h-full items-start gap-4 card-v2 card-v2-link p-6">
                  <mod.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-950">
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
        <Container className="relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <MotionReveal direction="right">
              <SectionHeading
                tone="dark"
                eyebrow="Sistem Mimarisi"
                title="Platform, firma, şube, cihaz: dört basamak."
                description="Firmalar şubelerini, şubeler kendi router'larını görür. RBAC, MFA, SMS/e-posta, LDAP ve uyarı servisleri ise bu basamakların hepsine ortak hizmet verir."
              />
            </MotionReveal>
            <MotionReveal delay={0.1} direction="left" blur>
              <div className="card-v2-dark p-6">
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
                  {architecture}
                </pre>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gold-300">
                  Tekli veya çoklu router · Önce veritabanı, sonra cihaz
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
            title="Sekiz hazır tasarım, her biri bir mekân tipine göre."
            description="Renkleri, logoyu ve yazıları dilediğiniz gibi değiştirin. Bitirdiğiniz sayfa tek tıkla router'a yüklenir."
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portalThemes.map((theme) => (
              <MotionStaggerItem key={theme.name}>
                <div className="card-v2 card-v2-link flex h-full flex-col p-5">
                  <h3 className="font-display text-base font-semibold text-navy-950">
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
              title="Misafir hangi yolla bağlanmak isterse."
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

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="MikroTik Modülleri"
            title="RouterOS ayarlarını tarayıcıdan yönetin."
            description="Yirmiyi aşkın modül VLAN, queue, PPPoE ve wireless erişim listeleri gibi konuları kapsar. Yaptığınız değişiklik önce veritabanına kaydedilir, sonra router'a gönderilir."
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mikrotikModules.map((mod) => (
              <MotionStaggerItem
                key={mod}
                as="div"
                className="card-v2 flex items-start gap-3 p-4"
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
            title="Denetçi sorduğunda kayıtlar hazır ve dokunulmamış."
            description="CyberHost, 5651 sayılı Kanun kapsamında tutulması gereken erişim kayıtlarını sonradan oynanamayacak biçimde saklar."
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
            title="Kim neyi görür, kim neyi değiştirir."
            description="Kullanıcılar sadece kendilerine verilen basamakta çalışır; tıkladıkları her işlem audit log'da iz bırakır."
          />
          <MotionReveal delay={0.05} className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-navy-950/10">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-gold-700">
                    Rol
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-gold-700">
                    Yetki
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-gold-700">
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
                <div className="group/f flex h-full items-start gap-4 card-v2 card-v2-link p-6">
                  <item.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-950">
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

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="İzleme & Uyarı"
            title="Sorunu müşteriniz değil, siz önce görün."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {monitoring.map((item) => (
              <MotionStaggerItem key={item.title}>
                <div className="group/f flex h-full items-start gap-4 card-v2 card-v2-link p-6">
                  <item.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-950">
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
            title="Sade, kanıtlanmış bileşenler; tek port."
            description="Sunucu tarafı Node.js + Express ve Prisma ORM, arayüz React + Vite ile yazıldı. Router'larla node-routeros üzerinden SSL/TLS şifreli konuşur. Test ortamında SQLite yeter, canlıda PostgreSQL kullanılır."
          />
          <MotionReveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-block rounded-[6px] bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-300"
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

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Sürümler"
            title="İhtiyacınıza göre üç paket."
            description="Tek noktada hizmet veren işletmeye Professional, çok sayıda şube ya da müşteri yöneten ekibe MSP, kendi kimlik altyapısını ve markasını kullanmak isteyen kuruma Enterprise uygundur."
          />
          <MotionReveal delay={0.05} className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-navy-950/10">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-gold-700">
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
            title="CyberHost'u kendi router'larınızla görün."
            description="Kurulumu, portal tasarımını ve 5651 arşiv ayarlarını yazılım ekibimizle birlikte yapalım."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="CyberHost" tone="dark" align="center" />
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
