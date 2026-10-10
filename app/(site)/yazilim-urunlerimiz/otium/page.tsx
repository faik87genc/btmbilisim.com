import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
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
import { CountUp } from "@/components/ensa/CountUp";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { FaqSection } from "@/components/ensa/FaqSection";
import { DemoRequest } from "@/components/ensa/DemoRequest";
import { ProductCard } from "@/components/ensa/ProductCard";
import { ProductJsonLd } from "@/components/ensa/ProductJsonLd";
import { getProductBySlug, products } from "@/lib/products";

const product = getProductBySlug("otium")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}/` },
  ...ogMeta({ title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`, description: product.metaDescription, path: `/yazilim-urunlerimiz/${product.slug}/` }),
};

const stats = [
  { value: 14, suffix: "", label: "önceden tanımlı izin türü" },
  { value: 100, suffix: "%", label: "onay adımı kayda geçer" },
  { value: 256, suffix: "-bit", label: "AES-GCM ile kişisel veri (PII) şifrelemesi" },
];

const problems = [
  "Kalan izinler elle hesaplanıyor; geçen yıldan devreden günler birbirine karışıyor.",
  "Kimin neyi onayladığı kayıt altında değil; sözlü verilen onaylar sonradan tartışmaya dönüşüyor.",
  "Grup şirketlerinin her biri için ayrı bir Excel dosyası güncelleniyor.",
  "Yıllık izin planını ve departman doluluk raporunu hazırlamak saatlerinizi alıyor.",
  "TC Kimlik No gibi kişisel bilgiler dosyalarda şifresiz bekliyor.",
];

const coreFeatures = [
  {
    icon: Building2,
    title: "Çok Firmalı Mimari (Multi-Tenant)",
    description:
      "Firmalar yalnızca kendi verilerine, temalarına ve logolarına erişir. Global admin ise bütün firmaları aynı panelden yönetir ve tek tıkla firmalar arasında geçiş yapar.",
  },
  {
    icon: Mail,
    title: "E-postadan Tek Tıkla Karar",
    description:
      "Yönetici, uygulamaya girmeden e-postadaki Onayla veya Reddet butonuna basarak talebi sonuçlandırır. Bağlantı imzalıdır, 7 gün geçerlidir; e-posta güvenlik botlarının otomatik tıklamaları onu çalıştıramaz.",
  },
  {
    icon: RefreshCw,
    title: "Hak Ediş ve Devir Otomasyonu",
    description:
      "Kullanılabilir gün sayısı, bu yılın kanuni hakkı ile önceki yıldan aktarılan günlerin toplamıdır. İzin kullanıldıkça ilk olarak aktarılan günler düşülür ve bu günler yanmaz.",
  },
  {
    icon: Users,
    title: "Rol ve Departman Bazlı Yetki",
    description:
      "Personel, İK, admin ve global admin rollerine ek olarak departmana özel yetkiler verilebilir; örneğin bir şef yalnızca kendi ekibinin izinlerini onaylar ya da o ekibin raporlarını görür.",
  },
  {
    icon: FileText,
    title: "Raporlama ve Denetim Kaydı",
    description:
      "İzin çizelgesi, departman analizi ve izin listelerini Excel (.xls) ya da PDF biçiminde indirebilirsiniz. Yapılan her işlem low / normal / high önem seviyesiyle kayda geçer; high seviyeli kayıtlar silinemez.",
  },
  {
    icon: CalendarDays,
    title: "Görevlendirme Formu",
    description:
      "Talep türü olarak “Geçici / Dış Görevlendirme” seçildiğinde ek bir form açılır. Talep onaylanınca çalışan ve yöneticisi, bilgileri hazır yerleştirilmiş görevlendirme belgesini PDF olarak alabilir.",
  },
];

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "KVKK Uyumlu Kişisel Veri Şifreleme",
    description:
      "PII_ENCRYPTION_KEY tanımlı olduğunda TC Kimlik No, uygulama katmanında AES-256-GCM ile şifrelenerek kaydedilir; ne canlı veritabanında ne de pg_dump yedeklerinde açık metin olarak bulunur.",
  },
  {
    icon: KeyRound,
    title: "Hesap Güvenliği",
    description:
      "İlk oturum açılışında e-posta adresinin doğrulanması şarttır. 6 haneli kod veritabanında tutulmaz; 10 dakika geçerli, imzalı bir token içinde taşınır. Yeni çalışanlar şifrelerini ilk girişte kendileri oluşturur.",
  },
  {
    icon: FileText,
    title: "İzin Belgesi Yükleme",
    description:
      "Sağlık raporu ve mazeret belgeleri PDF, JPEG veya PNG biçiminde (en çok 5 MB) kalıcı diskte saklanır. Veritabanında sadece tahmin edilemeyen bir referans bulunur; belgeye yalnızca yetkisi olanlar erişir.",
  },
  {
    icon: MessageCircle,
    title: "Bildirim Kanalları",
    description:
      "Talep, onay, ret ve iptal adımlarında SMTP ile e-posta, Meta WhatsApp Cloud API ile de onaylı şablon mesajları gönderilir. Ayarlar yapılmadan dışarıya hiçbir gerçek bildirim çıkmaz.",
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
              <DemoRequest product="Otium" tone="dark" />
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
            eyebrow="Hangi Sorunu Çözer?"
            title="İzinleri hâlâ WhatsApp yazışmaları ve Excel dosyalarıyla mı yönetiyorsunuz?"
            description="Otium izin yönetimine düzen getirir: talepler imzalı kayıtlarla izlenir, bakiyeler kendiliğinden hesaplanır, raporlar tek tıkla hazırlanır, kişisel veriler şifrelenerek tutulur."
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {problems.map((problem) => (
              <MotionStaggerItem
                key={problem}
                as="div"
                className="card-v2 flex items-start gap-3 p-4"
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

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Temel Özellikler"
            title="Talep, onay, hak ediş ve raporlama aynı yazılımda."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature) => (
              <MotionStaggerItem key={feature.title}>
                <div className="group/f flex h-full items-start gap-4 card-v2 card-v2-link p-6">
                  <feature.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-950">
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
        <Container className="relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <MotionReveal direction="right">
              <SectionHeading
                tone="dark"
                eyebrow="Bakiye Hesabı"
                title="Her ekranda aynı formül, aynı bakiye."
                description="İlk olarak önceki yıldan aktarılan günler harcanır ve bu günler kaybolmaz. Başlamış bir izni iptal ettiğinizde geride kalan günler kullanılmış kabul edilir: izin bir önceki güne kadar kısaltılır, bakiyeye yalnızca ileri tarihli iş günleri geri eklenir."
              />
            </MotionReveal>
            <MotionReveal delay={0.1} direction="left" blur>
              <div className="rounded-card border border-paper-50/10 bg-paper-50/5 p-8">
                <div className="font-mono text-sm leading-relaxed text-gold-300">
                  kalan = hak ediş + devreden
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&minus; kullanılan &minus; bekleyen
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Kanuni yıllık hak, her yıl sistem tarafından hesaba eklenir.
                  Önceki yıldan artan günler devreden bakiyeye aktarılır ve izin
                  kullanımında ilk sırada bu günler düşülür.
                </p>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Güvenlik ve KVKK"
            title="Kişisel veriler şifrelenir, yalnızca yetkililer görür."
          />
          <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2">
            {securityFeatures.map((feature) => (
              <MotionStaggerItem key={feature.title}>
                <div className="group/f flex h-full items-start gap-4 card-v2 card-v2-link p-6">
                  <feature.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-950">
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
            eyebrow="Türk Mevzuatına Göre Hazır"
            title="Sisteme eklenen her firma, kapsamlı bir hazır izin türü listesiyle açılır."
          />
          <MotionReveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
            {leaveTypes.map((type) => (
              <span
                key={type}
                className="inline-block rounded-[6px] bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-300"
              >
                {type}
              </span>
            ))}
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Teknoloji Altyapısı"
            title="Baştan sona TypeScript; Docker ile tek komutla kurulur."
            description="Frontend ile API, tek bir Caddy servisinin arkasından HTTPS üzerinden yayınlanır; API container'ına dışarıdan doğrudan erişilemez. backup servisi ön tanımlı ayarla her 6 saatte bir .sql.gz yedeği üretir."
          />
          <MotionReveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="chip-v2"
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
            title="Otium'u kendi şirket yapınızla deneyin."
            description="Kurulum, firma tanımları ve ilk yapılandırma dahil her adımda ekibimiz sizinle birlikte."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="Otium" tone="dark" align="center" />
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Diğer Yazılımlarımız" title="Yazılım ekibimizin geliştirdiği diğer ürünler" />
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
