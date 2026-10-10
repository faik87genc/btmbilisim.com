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
import { CountUp } from "@/components/ensa/CountUp";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { FaqSection } from "@/components/ensa/FaqSection";
import { DemoRequest } from "@/components/ensa/DemoRequest";
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
  { value: 5, suffix: "", label: "modül, tek arayüzde" },
  { value: 100, suffix: "%", label: "işlem kayıt altında" },
  { value: 2, suffix: "+", label: "tenant ile doğrulanan veri ayrımı" },
];

const pillars = [
  {
    icon: PackageSearch,
    title: "Tüm varlıklar tek envanterde",
    description:
      "Donanım, yazılım lisansı, sözleşme ve sarf malzemeleri ortak bir listede tutulur. Bir cihazın satın alındığı günden hurdaya ayrılana kadar geçtiği her aşama, geçmişiyle birlikte görünür.",
  },
  {
    icon: Search,
    title: "Yapılan her değişiklik kayıtlı",
    description:
      "Zimmet verme, iade alma, stok giriş-çıkışı ve ayar güncellemeleri denetim kaydına işlenir; bir değişikliği kimin, hangi tarihte yaptığı sorgulanabilir.",
  },
  {
    icon: Building2,
    title: "Şirketler birbirinden ayrı",
    description:
      "Her şirketin kullanıcıları, verileri ve formları yalnızca kendisine aittir. Platformun tamamından Super Admin sorumludur; şirket yöneticisi sadece kendi ekibini yönetir.",
  },
];

const modules = [
  {
    icon: PackageSearch,
    title: "Envanter ve Zimmet Yönetimi",
    description:
      "Cihaz geçmişi ile yaşam döngüsü takibi, zimmet ve iade kontrol listeleri, her şirkete özel çok sayfalı form tasarlama, lisans ile sözleşmelerin izlenmesi.",
  },
  {
    icon: Plug,
    title: "Ağ Yönetimi ve IPAM",
    description:
      "Ağ cihazlarının ve portların haritası, kendiliğinden yerleşen şema ve topoloji görünümü, IPAM ile IP adreslerinin yönetimi, güvenli ping ve denetimli ağ taraması.",
  },
  {
    icon: Headset,
    title: "Servis Masası ve Ticket",
    description:
      "Dosya eklenebilen ticket'lar ve alt görevler, şablon yanıtlar, harcanan sürenin kaydı; arıza, garanti ve bakım süreçlerinin takibi.",
  },
  {
    icon: Wallet,
    title: "Tedarik ve Stok Takibi",
    description:
      "Stok giriş-çıkışları, satın alma onay akışı ve Excel'den veri yükleme: önizleme, sütun eşleştirme, işlemi geri alma.",
  },
  {
    icon: ShieldCheck,
    title: "Yönetim ve Güvenlik",
    description:
      "Şirketler (tenant) arasında veri ayrımı, denetim kayıtları ve raporlar, rol tabanlı erişim, Super Admin paneli; dosyalar için S3 / MinIO ya da kalıcı yerel disk.",
  },
];

const highlights = [
  {
    icon: Building2,
    title: "Şirket bazlı veri ayrımı",
    description:
      "Tüm sorgular şirkete göre süzülür ve her şirketin yöneticisi ayrıdır. Bu ayrım, iki şirketle çalışan bir entegrasyon testiyle doğrulanır.",
  },
  {
    icon: FileText,
    title: "Zimmet ve iade formlarını kendiniz tasarlayın",
    description:
      "Şirketler çok sayfalı zimmet formlarını kendi ihtiyaçlarına göre oluşturur; kontrol listeleri, ek alanlar ve teslim adımları eklenebilir.",
  },
  {
    icon: Plug,
    title: "Topoloji ve IP yönetimi",
    description:
      "Cihazlar, portlar ve IP blokları aynı ekranda. Topolojiyi sürükleyip bırakarak düzenleyin, otomatik yerleşimden yararlanın, şemayı kaydedin.",
  },
  {
    icon: RefreshCw,
    title: "Denetim kaydı ve raporlama",
    description:
      "Kritik işlemlerin tamamı denetim kaydına düşer. Rapor ekranında envanter, lisans ve ticket verilerini istediğiniz kırılımda listeleyebilirsiniz.",
  },
];

const security = [
  "Veriler şirket bazında ayrılır; ayrım iki tenant üzerinde sınanır",
  "Active Directory / LDAP desteği kaldırıldı; AD parolası ya da LDAP yapılandırması tutulmaz",
  "Vault alanlarının şifrelemesi uygulama katmanında yapılır",
  "Production ortamında entrypoint, prisma db push komutuna izin vermez",
  "NEXTAUTH_SECRET, CRON_SECRET ve vault anahtarı birbirinden bağımsız oluşturulur",
  "Gitleaks ile secret taraması, CI hattında atlanamayan bir adımdır",
  "Private registry kullanımı, HTTPS ve dış ağa kapalı PostgreSQL portu",
  "Yedekler düzenli alınır, geri yükleme ayrı bir ortamda sınanır",
];

const techStack = [
  "Next.js (App Router)",
  "TypeScript",
  "PostgreSQL 15",
  "Prisma 5",
  "NextAuth.js",
  "React + Tailwind CSS",
  "Docker / Docker Swarm",
  "S3 / MinIO depolama desteği",
  "SMTP",
  "Health endpoint + isteğe bağlı Sentry",
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
              <DemoRequest product="Orbit" tone="dark" />
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
            eyebrow="Tek Portalın Getirdikleri"
            title="Ayrı ayrı tutulan dosyalar, farklı yönetim panelleri ve e-posta arşivleri tek bir portalda birleşir."
            description="Bütün modüller aynı envanteri ve aynı kullanıcı yapısını paylaşır; bir kez kaydettiğiniz bilgi her ekranda hazır olur."
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
            eyebrow="Modül Yapısı"
            title="Envanter, ağ, servis masası ve tedarik aynı veri modelini kullanır."
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
          <SectionHeading
            tone="dark"
            eyebrow="Temel Özellikler"
            title="Orbit'i ayakta tutan dört yapı taşı."
          />
          <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2">
            {highlights.map((item) => (
              <MotionStaggerItem key={item.title}>
                <div className="group/f flex h-full items-start gap-4 card-v2-dark p-6 transition-colors duration-200 hover:border-gold-300/40">
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
            eyebrow="Mimari"
            title="Sürprizsiz, sade ve uzun ömürlü teknolojiler."
            description="TypeScript ile yazılmış bir App Router uygulaması; veritabanı tarafında PostgreSQL ve Prisma. Canlı ortam Docker Swarm üzerinde tek manager node ile ya da S3 desteğiyle birden çok node üzerinde çalışabilir. Rolling update'ler start-first sırasıyla ilerler; dağıtım başarısız olursa servis pause durumuna alınır."
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

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Güvenlik Önlemleri"
            title="Canlıya geçmeden önce kurulum ve CI hattı şu kuralları uygular."
          />
          <MotionStagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {security.map((item) => (
              <MotionStaggerItem
                key={item}
                as="div"
                className="card-v2 flex items-start gap-3 p-4"
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
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <MotionReveal direction="right">
              <SectionHeading
                tone="dark"
                eyebrow="Kurulum"
                title="Sunucunuzda çalışır, tek komutla kurulur."
                description="Docker Swarm manager sunucusuna repoyu klonlayın, ortam değişkenleri dosyasını düzenleyin ve deploy scriptini başlatın. Script, image'a commit SHA'sını etiket olarak verip registry'ye gönderir, ardından stack'i güncelleyip rolling update tamamlanana kadar bekler."
              />
            </MotionReveal>
            <MotionReveal delay={0.1} direction="left" blur>
              <div className="card-v2-dark p-6">
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
{`# 1 — repoyu klonla
git clone <repo-adresi> && cd it-portal

# 2 — .env dosyasını oluştur
cp .env.production.example .env

# 3 — derle, registry'ye gönder, stack'i dağıt
./deploy-swarm.sh`}
                </pre>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gold-300">
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
            title="Orbit'i kendi sunucularınızda çalıştırarak tanıyın."
            description="Kurulum, şirket tanımları ve ilk yapılandırma boyunca ekibimiz size eşlik eder."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="Orbit" tone="dark" align="center" />
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
