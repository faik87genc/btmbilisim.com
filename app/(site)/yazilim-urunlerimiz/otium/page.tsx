import type { Metadata } from "next";
import {
  Building2,
  Mail,
  RefreshCw,
  Users,
  FileText,
  ShieldCheck,
  KeyRound,
  MessageCircle,
  CalendarDays,
  Check,
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

const product = getProductBySlug("otium")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}` },
};

const stats = [
  { value: 14, suffix: "", label: "hazır izin türü" },
  { value: 100, suffix: "%", label: "onay adımı denetim logunda" },
  { value: 256, suffix: "-bit", label: "AES-GCM ile PII şifreleme" },
];

const problems = [
  "İzin bakiyeleri elle takip ediliyor, devreden izin günleri karışıyor.",
  "Onay akışının kaydı tutulmuyor; “ben sana söylemiştim” tartışmaları çıkıyor.",
  "Aynı holding altındaki her şirket için ayrı ayrı Excel tablosu tutuluyor.",
  "Yıllık izin çizelgesi ve departman doluluk raporları saatler alıyor.",
  "TC Kimlik No gibi hassas veriler dosyalarda düz metin olarak duruyor.",
];

const coreFeatures = [
  {
    icon: Building2,
    title: "Çok Firmalı Yapı (Multi-Tenant)",
    description:
      "Her firma yalnızca kendi verisini, temasını ve logosunu görür. Tek bir global admin hesabı tüm firmaları tek panelden yönetir ve aralarında anında geçiş yapar.",
  },
  {
    icon: Mail,
    title: "E-posta ile Tek Tıkla Onay",
    description:
      "Amir, sisteme giriş yapmadan e-postadaki Onayla / Reddet butonuyla karar verebilir. Link imzalıdır, 7 gün geçerlidir ve e-posta botları tarafından tetiklenemez.",
  },
  {
    icon: RefreshCw,
    title: "Hak Ediş ve Devreden Bakiye Otomasyonu",
    description:
      "Kullanılabilir izin = bu yılki kanuni hak ediş + geçen yıldan devreden gün. Kullanım her zaman önce devredenden düşer; devreden günler yanmaz.",
  },
  {
    icon: Users,
    title: "Esnek Yetkilendirme",
    description:
      "personel, İK, admin ve global admin rollerinin yanında departman kapsamlı özel yetkiler: bir şefe yalnızca kendi ekibinin izinlerini onaylama veya raporlarını görme yetkisi tanımlanabilir.",
  },
  {
    icon: FileText,
    title: "Raporlar ve Denetim Logu",
    description:
      "Yıllık izin çizelgesi, departman analizi ve izin listeleri Excel (.xls) ve PDF olarak iner. Her işlem önem düzeyli (low / normal / high) bir denetim kaydı bırakır; high kayıtlar asla silinmez.",
  },
  {
    icon: CalendarDays,
    title: "Kurumsal Görevlendirme Formu",
    description:
      "“Geçici / Dış Görevlendirme” talebinde ek form açılır; onaydan sonra hem personel hem amir, bilgilerle otomatik doldurulmuş kurumsal görevlendirme formunu PDF olarak indirir.",
  },
];

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "KVKK / PII Şifreleme",
    description:
      "TC Kimlik No, PII_ENCRYPTION_KEY ayarlandığında uygulama katmanında AES-256-GCM ile şifrelenip yazılır — canlı veritabanında da pg_dump yedeklerinde de düz metin durmaz.",
  },
  {
    icon: KeyRound,
    title: "Hesap Koruması",
    description:
      "İlk girişte e-posta doğrulama zorunludur; 6 haneli kod veritabanına yazılmaz, imzalı ve 10 dk geçerli token içinde taşınır. Yeni personel ilk girişte kendi şifresini belirler.",
  },
  {
    icon: FileText,
    title: "Yüklenen İzin Belgeleri",
    description:
      "Rapor/mazeret belgeleri PDF/JPEG/PNG olarak (en fazla 5 MB) kalıcı diske yazılır; veritabanında yalnızca tahmin edilemeyen bir referans tutulur ve belgeyi sadece yetkili kişiler indirir.",
  },
  {
    icon: MessageCircle,
    title: "Bildirimler",
    description:
      "İzin talebi / onay / ret / iptal durumlarında e-posta (SMTP) ve Meta WhatsApp Cloud API üzerinden onaylı şablonlarla bildirim. Yapılandırılmadıkça hiçbir gerçek mesaj gönderilmez.",
  },
];

const leaveTypes = [
  "Yıllık",
  "Hastalık / Rapor",
  "Mazeret",
  "Evlilik",
  "Doğum / Analık",
  "Babalık",
  "Vefat",
  "Süt",
  "Refakat",
  "Evlat Edinme",
  "Yol",
  "İdari",
  "Ücretsiz",
  "Geçici / Dış Görevlendirme",
];

const techStack = [
  "TypeScript",
  "React + Vite",
  "TanStack Query",
  "Tailwind CSS",
  "Node.js + Express 5",
  "PostgreSQL",
  "Drizzle ORM",
  "OpenAPI + Zod",
  "Docker Compose",
  "Caddy (otomatik HTTPS)",
  "GitHub Actions",
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
            eyebrow="Neyi Çözüyor?"
            title="İzin süreci hâlâ WhatsApp mesajları ve Excel tablolarıyla yürüyor."
            description="Otium bu işi kurumsallaştırır: her talep imzalı bir kayıt bırakır, bakiyeler otomatik hesaplanır, raporlar tek tıkla iner ve hassas veriler şifreli saklanır."
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {problems.map((problem) => (
              <MotionStaggerItem
                key={problem}
                as="div"
                className="flex items-start gap-3 rounded-sm border border-navy-950/10 bg-white p-4 transition-colors duration-300 hover:border-gold-500/40"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-ink-900">
                  {problem}
                </span>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Öne Çıkan Özellikler"
            title="İzin talebinden onaya, hak edişten raporlamaya tek platform."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature) => (
              <MotionStaggerItem key={feature.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-sm border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <feature.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {feature.description}
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
          className="animate-glow-pulse pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <MotionReveal direction="right">
              <SectionHeading
                tone="dark"
                eyebrow="Hak Ediş ve Devreden Bakiye"
                title="Bütün ekranlarda tek ve tutarlı bir bakiye formülü."
                description="Kullanım önce devreden günlerden düşülür, devreden günler yanmaz. Başlamış bir izin iptal edilirse geçmiş günler kullanılmış sayılır; izin otomatik düne kadar kısaltılır, yalnızca gelecekteki iş günleri bakiyeye iade edilir."
              />
            </MotionReveal>
            <MotionReveal delay={0.1} direction="left" blur>
              <div className="rounded-sm border border-paper-50/10 bg-paper-50/5 p-8">
                <div className="font-mono text-sm leading-relaxed text-gold-300">
                  kalan = hak ediş + devreden
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&minus; kullanılan &minus; bekleyen
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Yıllık kanuni hak ediş her yıl otomatik işlenir; geçen yıldan
                  kalan günler devreden bakiye olarak taşınır ve her zaman önce o
                  günler harcanır.
                </p>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Güvenlik ve Uyum"
            title="Hassas veriler yetkili ellerde ve şifreli kalır."
          />
          <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2">
            {securityFeatures.map((feature) => (
              <MotionStaggerItem key={feature.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-sm border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <feature.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {feature.description}
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
            eyebrow="Türkiye Mevzuatına Uygun"
            title="Her yeni firma geniş bir varsayılan izin türü setiyle başlar."
          />
          <MotionReveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
            {leaveTypes.map((type) => (
              <span
                key={type}
                className="inline-block rounded-sm bg-paper-50/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gold-300"
              >
                {type}
              </span>
            ))}
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Teknoloji"
            title="Uçtan uca TypeScript, Docker ile tek komutta ayağa kalkar."
            description="Frontend ve API tek bir Caddy servisi üzerinden HTTPS ile dışarı açılır; API container'ı doğrudan dışarıya açık değildir. backup servisi varsayılan olarak 6 saatte bir .sql.gz yedeği alır."
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

      <FaqSection items={product.faq} />

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="Otium'u kendi firma yapınızla test edin."
            description="Kurulumdan çok firmalı yapılandırmaya kadar tüm adımlarda yanınızdayız."
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
