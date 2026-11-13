import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
import {
  FileSpreadsheet,
  Landmark,
  Coins,
  Plug,
  Building2,
  UserCog,
  Check,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { FaqSection } from "@/components/ensa/FaqSection";
import { LightboxImage } from "@/components/ensa/LightboxImage";
import {
  ProductHeroSlider,
  type ProductHeroSlide,
} from "@/components/ensa/ProductHeroSlider";
import { DemoRequest } from "@/components/ensa/DemoRequest";
import { ProductCard } from "@/components/ensa/ProductCard";
import { ProductJsonLd } from "@/components/ensa/ProductJsonLd";
import { getProductBySlug, products } from "@/lib/products";

const product = getProductBySlug("cek-senet-programi")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}/` },
  ...ogMeta({
    title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`,
    description: product.metaDescription,
    path: `/yazilim-urunlerimiz/${product.slug}/`,
  }),
};

const slides: ProductHeroSlide[] = [
  {
    eyebrow: product.code,
    titleLead: "Çek basım ve Logo",
    titleAccent: "entegrasyon yazılımı.",
    description:
      "Kurumsal çek senet programı: Excel listesinden çekleri içe aktarın, kontrol edin ve bankanıza özel tasarımlarla yazdırın. Çoklu firma desteği, Logo ERP entegrasyonu ve tam işlem kaydıyla çek basım sürecini tek ekrandan yönetin.",
    ctaLabel: "Demo Talep Edin",
    ctaHref: "/iletisim",
    image: "/products/cek-senet/cek-hazirlama.webp",
    imageAlt: "Çek hazırlama ekranı: Excel'den aktarılan çeklerin listesi",
    imageWidth: 1600,
    imageHeight: 765,
  },
];

const steps = [
  {
    title: "1. Excel'den aktarın",
    description:
      "Çek numarası, müşteri kodu, tutar ve vade tarihi kolonlarını içeren listeyi yükleyin. Müşteri unvanları ERP verisinden otomatik eşleşir.",
  },
  {
    title: "2. Kontrol edin ve seçin",
    description:
      "Liste; iş yeri, tutar, para birimi, vade ve duruma göre filtrelenir. Basılacak çekleri seçer, toplam tutarı anında görürsünüz.",
  },
  {
    title: "3. Yazdırın ve Logo'ya gönderin",
    description:
      "Bankanıza özel çek tasarımıyla toplu yazdırın. Hazırlanan çekleri tek adımda ERP'ye aktarın.",
  },
];

const features = [
  {
    icon: FileSpreadsheet,
    title: "Excel ile toplu aktarım",
    description:
      "Yüzlerce çeki elle girmeden, tek bir Excel listesiyle sisteme alın. Aktarılan kayıtlar yazdırmadan önce liste ekranında kontrol edilir.",
  },
  {
    icon: Landmark,
    title: "Bankaya özel çek tasarımı",
    description:
      "Her banka ve şube için ayrı çek şablonu tanımlanır. Tasarımlar sürümlü saklanır; değişiklikler geri izlenebilir.",
  },
  {
    icon: Coins,
    title: "Döviz kuru desteği",
    description:
      "USD ve EUR için güncel TCMB döviz satış kurunu ekranda görür, yabancı para cinsinden çekleri TL karşılığıyla takip edersiniz.",
  },
  {
    icon: Plug,
    title: "Logo ERP entegrasyonu",
    description:
      "Müşteri ve çek kayıtlarını Logo veritabanından okur, hazırlanan çekleri geri gönderir. Mükerrer veri girişi ortadan kalkar.",
  },
  {
    icon: Building2,
    title: "Çoklu firma yönetimi",
    description:
      "Birden fazla şirketi tek panelden yönetin. Her firmanın iş yeri, keşide yeri, yazıcı türü ve müşteri kodu şablonu ayrı tanımlanır.",
  },
  {
    icon: UserCog,
    title: "Rol ve yetki yönetimi",
    description:
      "Yönetici, operatör ve görüntüleyici rolleri; kullanıcı bazında yetkili firma seçimi. Herkes yalnızca kendi sorumluluğundaki kayıtları görür.",
  },
];

const statuses = [
  "Taslak",
  "Yazdırmaya hazır",
  "Yazdırılıyor",
  "Yazdırıldı",
  "Logo'ya gönderildi",
  "İptal",
];

const securityPoints = [
  "Tüm giriş, çıkış ve yazdırma işlemleri kullanıcı, tarih ve IP bilgisiyle kaydedilir",
  "Çek oluşturma, silme ve tasarım değişikliği iz bırakır",
  "Yazdırma işleri lisanslı masaüstü ajanında çalışır, onay adımı vardır",
  "Kullanıcılar yalnızca yetkili oldukları firmaları görür",
  "Başarısız yazdırma işleri nedeniyle birlikte kayda geçer",
  "Tasarım dosyaları sürümlü ve geri dönülebilir şekilde saklanır",
];

const frame =
  "overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_48px_-28px_rgb(11_18_32/0.35)]";

export default function Page() {
  return (
    <>
      <ProductJsonLd product={product} />
      <ProductHeroSlider slides={slides} />

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Nasıl Çalışır"
            title="Excel listesinden basılı çeke üç adımda."
            description="Çek hazırlama ekranı; aktarma, kontrol, yazdırma ve ERP'ye gönderme adımlarını tek sayfada toplar."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <MotionReveal key={step.title} delay={i * 0.08}>
                <div className="card-v2 h-full p-6">
                  <h3 className="font-display text-base font-semibold text-navy-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
          <MotionReveal delay={0.1} className="mt-10">
            <div className={frame}>
              <LightboxImage
                src="/products/cek-senet/cek-hazirlama.webp"
                alt="Çek hazırlama ekranı"
                width={1600}
                height={765}
              />
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Çek hazırlama ekranı. Gizlilik gereği firma, müşteri ve tutar
              bilgileri bulanıklaştırılmıştır.
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Özellikler"
            title="Çek basımının tüm adımları tek yazılımda."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <MotionReveal key={feature.title} delay={i * 0.06}>
                <div className="group/f flex h-full items-start gap-4 card-v2 card-v2-link p-6">
                  <feature.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-400"
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
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <MotionReveal>
              <SectionHeading
                tone="dark"
                eyebrow="Bankaya Özel Tasarım"
                title="Her bankanın çek formatı için ayrı şablon."
                description="Banka ve şube bazında çek şablonlarını yükleyin, sürümleriyle birlikte saklayın. Tasarım değişikliği masaüstü tasarımcıdan yapılır ve web uygulamasında otomatik güncellenir."
              />
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <div className="overflow-hidden rounded-[20px] border border-white/10 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]">
                <LightboxImage
                  src="/products/cek-senet/rapor-tasarimlari.webp"
                  alt="Banka bazında çek tasarım şablonları ekranı"
                  width={1600}
                  height={692}
                />
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Genel Bakış"
            title="Süreci tek bakışta izleyin."
            description="Bekleyen ve yazdırılan çek sayısı, aktif firmalar, tanımlı şablonlar ve sistem durumu açılış ekranında. Sık kullanılan işlemlere tek tıkla ulaşın."
          />
          <MotionReveal delay={0.05} className="mt-10">
            <div className={frame}>
              <LightboxImage
                src="/products/cek-senet/genel-bakis.webp"
                alt="Genel bakış açılış ekranı"
                width={1600}
                height={720}
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.1} className="mt-6">
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <span
                  key={status}
                  className="inline-block rounded-[6px] bg-gold-100 px-2.5 py-1 text-xs font-semibold text-gold-700"
                >
                  {status}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Her çek bu durumlardan birinde izlenir.
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Ekran Görüntüleri"
            title="Çek senet programını yakından görün."
            description="Logo verileri, banka hesapları, firma ve kullanıcı yönetimi. Görüntülerde firma, müşteri ve tutar bilgileri gizlilik gereği bulanıklaştırılmıştır."
          />
          <MotionReveal delay={0.05} className="mt-10">
            <div className={frame}>
              <LightboxImage
                src="/products/cek-senet/logo-musteriler.webp"
                alt="Logo müşteri kayıtları ekranı"
                width={1600}
                height={759}
              />
            </div>
            <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
              Logo müşterileri
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <MotionReveal>
              <SectionHeading
                tone="dark"
                eyebrow="Güvenlik ve İzlenebilirlik"
                title="Kim, ne zaman, neyi yaptı: hepsi kayıtta."
              />
              <ul className="mt-8 grid gap-3">
                {securityPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold-300"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <div className="overflow-hidden rounded-[20px] border border-white/10 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]">
                <LightboxImage
                  src="/products/cek-senet/islem-kayitlari.webp"
                  alt="İşlem kayıtları ekranı"
                  width={1600}
                  height={751}
                />
              </div>
              <p className="mt-3 text-xs text-slate-400">
                İşlem kayıtları tarih, kullanıcı, firma ve işlem türüne göre
                filtrelenir.
              </p>
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
            title="Çek basım sürecinizi hızlandırın."
            description="Kurulum, banka şablonları ve Logo entegrasyonu için yanınızdayız."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="Çek Senet Programı" tone="dark" align="center" />
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Diğer Yazılımlarımız"
            title="Yazılım ekibimizin geliştirdiği diğer ürünler"
          />
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
