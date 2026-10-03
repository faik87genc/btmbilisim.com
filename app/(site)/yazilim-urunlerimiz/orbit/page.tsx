import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
import {
  Building2,
  PackageSearch,
  Plug,
  Headset,
  Wallet,
  ShieldCheck,
  FileText,
  RefreshCw,
  Search,
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

const product = getProductBySlug("orbit")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}/` },
  ...ogMeta({ title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`, description: product.metaDescription, path: `/yazilim-urunlerimiz/${product.slug}/` }),
};

const stats = [
  { value: 5, suffix: "", label: "modül tek panelde" },
  { value: 100, suffix: "%", label: "işlem audit kaydında" },
  { value: 2, suffix: "+", label: "tenant ile izolasyon testi" },
];

const pillars = [
  {
    icon: PackageSearch,
    title: "Her varlık bir kayıt",
    description:
      "Cihaz, lisans, sözleşme ve sarf malzemesi aynı envanterde. Satın almadan hurdaya kadar tüm yaşam döngüsü ve cihaz geçmişi izlenir.",
  },
  {
    icon: Search,
    title: "Her işlem iz bırakır",
    description:
      "Zimmet, iade, stok hareketi ve ayar değişiklikleri denetim kaydına yazılır. Kim, ne zaman, neyi değiştirdi belli.",
  },
  {
    icon: Building2,
    title: "Her şirket kendi alanında",
    description:
      "Kullanıcılar, veriler ve formlar şirket bazında izole. Super Admin platformu, şirket yöneticisi kendi ekibini yönetir.",
  },
];

const modules = [
  {
    icon: PackageSearch,
    title: "Envanter & Zimmet",
    description:
      "Envanter yaşam döngüsü ve cihaz geçmişi, zimmet / iade kontrol listeleri, şirkete özel çok sayfalı form tasarımcısı, lisans ve sözleşme takibi.",
  },
  {
    icon: Plug,
    title: "Ağ & IPAM",
    description:
      "Ağ cihazları ve port haritası, otomatik düzenli şema / topoloji görünümü, IP adres yönetimi (IPAM), güvenli ping ve kontrollü ağ keşfi.",
  },
  {
    icon: Headset,
    title: "Servis & Ticket",
    description:
      "Ticket, dosya eki ve alt görevler, hazır cevaplar ve süre kaydı, arıza / garanti / bakım yönetimi.",
  },
  {
    icon: Wallet,
    title: "Tedarik & Stok",
    description:
      "Stok hareketleri, satın alma onayları, Excel içe aktarma: önizleme, kolon eşleştirme ve geri alma.",
  },
  {
    icon: ShieldCheck,
    title: "Yönetim & Güvenlik",
    description:
      "Çok şirketli (tenant) izolasyon, audit kayıtları ve raporlar, rol bazlı erişim ve Super Admin paneli, S3 / MinIO veya kalıcı yerel dosya depolama.",
  },
];

const highlights = [
  {
    icon: Building2,
    title: "Tenant izolasyonu",
    description:
      "Her sorgu şirket bazında filtrelenir, yöneticiler ayrıdır. İzolasyon entegrasyon testinde iki şirketle doğrulanır.",
  },
  {
    icon: FileText,
    title: "Zimmet / iade form tasarımcısı",
    description:
      "Her şirket kendi çok sayfalı zimmet formunu kurar: kontrol listeleri, özel alanlar ve teslim adımları.",
  },
  {
    icon: Plug,
    title: "Topoloji & IPAM",
    description:
      "Cihazlar, portlar ve IP blokları tek görünümde. Sürükle-bırak topoloji, otomatik düzen ve kaydedilen şema.",
  },
  {
    icon: RefreshCw,
    title: "Audit & raporlar",
    description:
      "Her kritik işlem audit kaydına yazılır. Raporlar ekranından envanter, lisans ve ticket kırılımları alınır.",
  },
];

const security = [
  "Şirket bazlı veri izolasyonu, iki tenant ile test edilir",
  "Active Directory / LDAP kaldırıldı — AD parolası veya LDAP ayarı saklanmaz",
  "Vault alanları uygulama tarafında şifrelenir",
  "Production'da prisma db push entrypoint tarafından reddedilir",
  "NEXTAUTH_SECRET, CRON_SECRET ve vault anahtarı ayrı üretilir",
  "CI'da Gitleaks secret taraması zorunlu adımdır",
  "Private registry, HTTPS ve internete kapalı PostgreSQL portu",
  "Yedek alınır ve izole ortamda geri yükleme denenir",
];

const techStack = [
  "Next.js (App Router)",
  "TypeScript",
  "PostgreSQL 15",
  "Prisma 5",
  "NextAuth.js",
  "React + Tailwind CSS",
  "Docker / Docker Swarm",
  "S3 / MinIO uyumlu depolama",
  "SMTP",
  "Health endpoint'leri + opsiyonel Sentry",
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
                {product.tagline}
              </span>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.12}>
            <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
              {product.description}
            </p>
          </MotionReveal>
          <MotionReveal delay={0.18}>
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
            eyebrow="Neden Tek Portal"
            title="Beş ayrı dosya, üç farklı panel ve arşiv maili tek bir yerde toplanır."
            description="Modüller ortak bir envanter ve kullanıcı modeli üzerinde çalışır; veri bir kez girilir, her ekranda kullanılır."
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
            eyebrow="Modüller"
            title="Envanterden ağa, ticket'tan tedariğe tek model."
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

      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-24">
        <div
          className="animate-glow-pulse pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Öne Çıkanlar"
            title="Portalın üzerine kurulduğu dört sütun."
          />
          <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2">
            {highlights.map((item) => (
              <MotionStaggerItem key={item.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-sm border border-paper-50/10 bg-paper-50/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
                  <item.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-300 transition-colors duration-300 group-hover/f:text-paper-50"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-paper-50">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {item.description}
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
            eyebrow="Teknik Mimari"
            title="Tanıdık, sıkıcı ve dayanıklı bir stack."
            description="App Router üzerinde TypeScript, PostgreSQL ve Prisma. Production, Docker Swarm ile tek manager node'da ya da S3 destekli çok node'da çalışır; rolling update start-first stratejisiyle yapılır, başarısız deploy'da servis pause olur."
          />
          <MotionReveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-block rounded-sm bg-navy-950/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-slate-500"
              >
                {tech}
              </span>
            ))}
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Güvenlik"
            title="Kurulum adımları ve CI, üretime çıkmadan önce bunları zorunlu kılar."
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {security.map((item) => (
              <MotionStaggerItem
                key={item}
                as="div"
                className="flex items-start gap-3 rounded-sm border border-navy-950/10 bg-white p-4 transition-colors duration-300 hover:border-gold-500/40"
              >
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-ink-900">{item}</span>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <MotionReveal direction="right">
              <SectionHeading
                tone="dark"
                eyebrow="Kurulum"
                title="Kendi sunucunuzda, tek komutla."
                description="Docker Swarm manager sunucuda repoyu alın, ortam dosyasını doldurun ve deploy scriptini çalıştırın. Script image'ı commit SHA ile etiketler, registry'ye push eder, stack'i günceller ve rolling update bitene kadar bekler."
              />
            </MotionReveal>
            <MotionReveal delay={0.1} direction="left" blur>
              <div className="rounded-sm border border-paper-50/10 bg-paper-50/5 p-6">
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
{`# 1 — repoyu al
git clone <repo-adresi> && cd it-portal

# 2 — ortam dosyasını hazırla
cp .env.production.example .env

# 3 — build + push + stack deploy
./deploy-swarm.sh`}
                </pre>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-gold-300">
                  Node.js 22 · Docker Engine 24+ · Compose v2 · 4 GB RAM
                </p>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <FaqSection items={product.faq} />

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="Orbit'i kendi altyapınızda deneyin."
            description="Kurulumdan çok şirketli yapılandırmaya kadar tüm adımlarda yanınızdayız."
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
