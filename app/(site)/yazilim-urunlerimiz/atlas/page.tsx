import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
import { LightboxImage } from "@/components/ensa/LightboxImage";
import { ImageCarousel } from "@/components/ensa/ImageCarousel";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Users,
  RefreshCw,
  PackageSearch,
  ShieldCheck,
  Building2,
  KeyRound,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { FaqSection } from "@/components/ensa/FaqSection";
import {
  ProductHeroSlider,
  type ProductHeroSlide,
} from "@/components/ensa/ProductHeroSlider";
import { HeroSlider, type HeroSlide } from "@/components/ensa/HeroSlider";
import { DemoRequest, demoWhatsAppHref } from "@/components/ensa/DemoRequest";
import { ProductCard } from "@/components/ensa/ProductCard";
import { ProductJsonLd } from "@/components/ensa/ProductJsonLd";
import { getProductBySlug, products } from "@/lib/products";

const product = getProductBySlug("atlas")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}/` },
  ...ogMeta({ title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`, description: product.metaDescription, path: `/yazilim-urunlerimiz/${product.slug}/` }),
};

const overviewFeatures = [
  {
    icon: LayoutDashboard,
    title: "Günün Özeti Bir Bakışta",
    description:
      "Ciro, tahsilat oranı, yeni kazanılan müşteriler ve çek portföyü aynı gösterge panelinde, güncel değerleriyle karşınızda.",
  },
  {
    icon: TrendingUp,
    title: "Öne Çıkan Ürün ve Cari Hesaplar",
    description:
      "Yakın dönemde en fazla satılan ürünler ve en yüksek ciroyu getiren cariler, siz uğraşmadan sıraya dizilir.",
  },
  {
    icon: Wallet,
    title: "Kasa, Banka ve Çek Durumu",
    description:
      "Kasadaki, bankadaki ve tahsile gönderilmiş çeklerdeki tutarlar tek kartta toplanır; elinizdeki nakdi net biçimde görürsünüz.",
  },
  {
    icon: RefreshCw,
    title: "ERP ile Eşzamanlı Veri",
    description:
      "Atlas, ERP veritabanınızla eşzamanlı çalışır; verileri ayrıca dışa aktarıp yeniden yüklemeniz gerekmez.",
  },
];

const erpFeatures = [
  {
    icon: PackageSearch,
    title: "Satınalma Analizi: Ürün ve Cari Kırılımı",
    description:
      "Satınalma hareketleri doğrudan ERP veritabanından okunur; ürüne, cariye ve tarih aralığına göre süzerek alım ve iadelerin net toplamına ulaşırsınız.",
  },
  {
    icon: Building2,
    title: "Birden Fazla Firma, Tek Panel",
    description:
      "ERP'de tanımlı bütün firmalarınıza aynı panelden erişin; raporları her firma için ayrı ayrı alın.",
  },
];

const supportedErps = [
  "SAP",
  "Oracle ERP",
  "Oracle NetSuite",
  "Microsoft Dynamics",
  "LOGO",
  "Mikro",
  "Canias ERP",
  "Harmony ERP",
  "Bilişim ERP",
  "NEBİM",
  "1C",
  "DİA",
  "NETSİS",
  "Uyumsoft",
  "Workcube",
  "IFS",
];

const atlasSlides: ProductHeroSlide[] = [
  {
    eyebrow: product.code,
    titleLead: "Bütçe Planından Karara:",
    titleAccent: "Tüm Süreç Tek Yazılımda",
    description:
      "Bütçe rakamlarınızı elle yazabilir, Excel'den ya da Logo gibi muhasebe yazılımlarından birkaç saniyede aktarabilirsiniz. Atlas, planladığınız tutarla gerçekleşen arasındaki farkı anında gösterir; sapmaların nedenini raporlarla inceler, finansal kararlarınızı somut rakamlara dayandırırsınız.",
    ctaLabel: "Atlas'ı Tanıyın",
    ctaHref: "/iletisim",
    image: "/products/atlas/gosterge-paneli.png",
    imageAlt: "Atlas ana gösterge paneli ekran görüntüsü",
    imageWidth: 1685,
    imageHeight: 1172,
  },
  {
    eyebrow: `${product.code} · RAPORLAMA`,
    titleLead: "Analiz ve",
    titleAccent: "Raporlama Araçları",
    description:
      "Bütçe ile gerçekleşmeyi her hesap kalemi için yan yana koyun, size uygun sapma eşiğini tanımlayın; özelleştirilebilir rapor kartlarını PDF veya Excel olarak dışa aktarın.",
    ctaLabel: "Rapor Örneklerini İnceleyin",
    ctaHref: "/iletisim",
    image: "/products/atlas/finansal-raporlar.png",
    imageAlt: "Atlas özelleştirilebilir rapor kartları ekranı",
    imageWidth: 1672,
    imageHeight: 951,
  },
  {
    eyebrow: `${product.code} · YETKİLENDİRME`,
    titleLead: "Kullanıcı Yetkileri ve",
    titleAccent: "Veri Güvenliği",
    description:
      "Yeni kullanıcı tanımlayın, her birine rol ve erişim izni atayın. Veri trafiği TLS şifrelemesiyle korunur; işlem yapılmayan oturumlar kendiliğinden kapanır, yetkisiz erişim olasılığı düşer.",
    ctaLabel: "Yetkilendirmeyi Görün",
    ctaHref: "/iletisim",
    image: "/products/atlas/kullanici-yonetimi.png",
    imageAlt: "Atlas kullanıcı ve rol yönetimi ekranı",
    imageWidth: 1701,
    imageHeight: 786,
  },
];

// Decorative full-bleed banner (distinct from `atlasSlides` above, which are
// framed real product screenshots) — purely atmospheric/marketing imagery, so
// it never risks being mistaken for actual software UI.
const atlasBannerSlides: HeroSlide[] = [
  {
    image: "/hero/atlas-alt-1.jpg",
    imageAlt: "Atlas bütçe panelini depoda ve ofiste kullanan ekip",
    eyebrow: "Atlas · Saha ve Ofis",
    titleLead: "Depoda ya da merkezde:",
    titleAccent: "herkes aynı rakamı görür.",
    description:
      "Atlas gösterge paneli depodaki ekibe de merkez ofise de aynı güncel bilgiyi sunar; kararlar tek ve ortak bir kaynağa dayanır.",
    primaryCta: { label: "Demo Talep Edin", href: demoWhatsAppHref("Atlas") },
    secondaryCta: { label: "Tüm Ürünler", href: "/yazilim-urunlerimiz/" },
    overlay: "light",
  },
  {
    image: "/hero/atlas-alt-2.jpg",
    imageAlt: "Yapay zeka temalı finansal karar alma konsept görseli",
    eyebrow: "Atlas · Veriyle Karar",
    titleLead: "Tablolarla boğuşmayın,",
    titleAccent: "kararlara odaklanın.",
    description:
      "Atlas ham rakamları kendiliğinden anlamlı bütçe göstergelerine çevirir; ekibinizin zamanı rapor hazırlamaya değil, karar vermeye kalır.",
    primaryCta: { label: "Demo Talep Edin", href: demoWhatsAppHref("Atlas") },
    secondaryCta: { label: "Tüm Ürünler", href: "/yazilim-urunlerimiz/" },
    overlay: "light",
  },
];

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Şifreli Veri İletimi",
    description: "Sunucu ile kullanıcı arasındaki bütün trafik TLS ile korunur.",
  },
  {
    icon: KeyRound,
    title: "Otomatik Oturum Kapatma",
    description:
      "Belirlenen süre dolduğunda oturum kendiliğinden kapanır; açık unutulan ekranlar risk oluşturmaz.",
  },
  {
    icon: Users,
    title: "Rol ve Yetki Yönetimi",
    description:
      "Yeni kullanıcı açın, rol ve erişim izinlerini belirleyin, gerektiğinde hesabı devre dışı bırakın.",
  },
];

export default function Page() {
  return (
    <>
      <ProductJsonLd product={product} />
      <ProductHeroSlider slides={atlasSlides} />

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Gösterge Paneli"
            title="Finansal tablonuzun özeti tek ekranda."
            description="ERP'den gelen bilgiler anında işlenir; satış, tahsilat ve nakit durumunuz panelde özet hâlinde görünür."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="grid gap-5">
              {overviewFeatures.map((feature, i) => (
                <MotionReveal key={feature.title} delay={i * 0.08}>
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
                </MotionReveal>
              ))}
            </div>
            <MotionReveal delay={0.16}>
              <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_48px_-28px_rgb(11_18_32/0.35)]">
                <LightboxImage
                  src="/products/atlas/gosterge-paneli.png"
                  alt="Atlas ana gösterge paneli ekran görüntüsü"
                  width={1685}
                  height={1172}
                  priority
                />
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Plan ve Gerçekleşme"
            title="Her hesap kaleminde plan ile gerçekleşeni yan yana görün."
            description="Gelir ve gider bütçelerini hesap grubu düzeyinde, ay ay ya da yıl bazında kıyaslayın; hangi sapma oranının kabul edilebilir olduğuna siz karar verin. Faaliyet grubu, yıl ve ay filtreleriyle raporu ihtiyaç duyduğunuz ayrıntıda hazırlayın."
          />
          <MotionReveal delay={0.05} className="mt-10 mx-auto max-w-2xl">
            <ImageCarousel
              tone="light"
              frameHeight="h-80 sm:h-96"
              images={[
                {
                  src: "/products/atlas/gelir-butcesi-yillik.png",
                  alt: "Atlas yıllık gelir bütçesi ekranı",
                  width: 1692,
                  height: 1180,
                  label: "Yıllık Gelir Bütçesi",
                },
                {
                  src: "/products/atlas/gider-butcesi-yillik.png",
                  alt: "Atlas yıllık gider bütçesi ekranı",
                  width: 1698,
                  height: 1096,
                  label: "Yıllık Gider Bütçesi",
                },
                {
                  src: "/products/atlas/gelir-butcesi-aylik.png",
                  alt: "Atlas aylık gelir bütçesi kıyaslama ekranı",
                  width: 1693,
                  height: 887,
                  label: "Aylık Gelir Bütçesi Kıyası",
                },
                {
                  src: "/products/atlas/gider-butcesi-aylik.png",
                  alt: "Atlas aylık gider bütçesi kıyaslama ekranı",
                  width: 1670,
                  height: 1166,
                  label: "Aylık Gider Bütçesi Kıyası",
                },
              ]}
            />
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="ERP Bağlantıları"
            title="ERP'nizden ayrılmadan bütçenizi izleyin."
            description="Atlas belirli bir ERP'ye bağlı kalmadan çalışmak üzere geliştirildi. Aşağıdaki yaygın kurumsal sistemler, entegrasyon kurabildiğimiz ERP'lere örnektir."
          />
          <MotionReveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
            {supportedErps.map((erp) => (
              <span
                key={erp}
                className="inline-block rounded-[6px] bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-300"
              >
                {erp}
              </span>
            ))}
          </MotionReveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="grid content-start gap-5">
              {erpFeatures.map((feature, i) => (
                <MotionReveal key={feature.title} delay={i * 0.08}>
                  <div className="group/f flex h-full items-start gap-4 card-v2-dark p-6 transition-colors duration-200 hover:border-gold-300/40">
                    <feature.icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold-300 transition-colors duration-300 group-hover/f:text-paper-50"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-base font-semibold text-paper-50">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
            <div className="grid gap-6">
              <MotionReveal delay={0.16}>
                <div className="overflow-hidden rounded-[20px] border border-white/10 bg-navy-900 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]">
                  <LightboxImage
                    src="/products/atlas/detayli-satinalmalar.png"
                    alt="Atlas satınalma detay raporu ekranı"
                    width={1692}
                    height={1177}
                  />
                </div>
                <p className="mt-3 text-xs uppercase tracking-wider text-slate-400">
                  Satınalma Detayları
                </p>
              </MotionReveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <MotionReveal delay={0.2}>
                  <div className="overflow-hidden rounded-[20px] border border-white/10 bg-navy-900 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]">
                    <LightboxImage
                      src="/products/atlas/satinalma-butcesi-karsilastirma.png"
                      alt="Atlas satınalma bütçesi filtre seçenekleri"
                      width={1712}
                      height={456}
                    />
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wider text-slate-400">
                    Satınalma Bütçesini Filtreleme
                  </p>
                </MotionReveal>
                <MotionReveal delay={0.24}>
                  <div className="overflow-hidden rounded-[20px] border border-white/10 bg-navy-900 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]">
                    <LightboxImage
                      src="/products/atlas/coklu-firma.png"
                      alt="Atlas firma seçim ekranı"
                      width={580}
                      height={340}
                    />
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wider text-slate-400">
                    Firma Seçimi
                  </p>
                </MotionReveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Veri Girişi Seçenekleri"
            title="Tek tek kaydedin ya da Excel'den yükleyin."
            description="Gelir, gider ve satınalma bütçeleri formlar üzerinden tek tek girilebilir; dilerseniz hazır Excel şablonunu doldurup tamamını birkaç saniyede sisteme alabilirsiniz."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <MotionReveal>
              <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_48px_-28px_rgb(11_18_32/0.35)]">
                <LightboxImage
                  src="/products/atlas/manuel-veri-girisi.png"
                  alt="Atlas elle veri giriş formu"
                  width={1699}
                  height={534}
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                Elle Giriş — Gelir, gider ve satınalma formları
              </p>
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_48px_-28px_rgb(11_18_32/0.35)]">
                <LightboxImage
                  src="/products/atlas/toplu-veri-aktarimi.png"
                  alt="Atlas Excel ile toplu yükleme ekranı"
                  width={1708}
                  height={576}
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                Toplu Yükleme — Hazır Excel şablonu ile aktarım
              </p>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <MotionReveal>
              <SectionHeading
                tone="dark"
                eyebrow="Rapor Kartları"
                title="Görmek istediğiniz rakamları kartlarla kendiniz düzenleyin."
                description="Aylık gelir, giderlerin dağılımı ve nakit akışı kişiselleştirilebilir kartlarda listelenir; her görünümü PDF ya da Excel dosyası olarak indirebilirsiniz."
              />
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <div className="overflow-hidden rounded-[20px] border border-white/10 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)]">
                <LightboxImage
                  src="/products/atlas/finansal-raporlar.png"
                  alt="Atlas özelleştirilebilir rapor kartları ekranı"
                  width={1672}
                  height={951}
                />
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Güvenlik ve Yetkilendirme"
            title="Bilgilerinize yalnızca yetki verdiğiniz kişiler ulaşır."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="grid gap-5">
              {securityFeatures.map((feature, i) => (
                <MotionReveal key={feature.title} delay={i * 0.08}>
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
                </MotionReveal>
              ))}
            </div>
            <MotionReveal delay={0.16}>
              <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_48px_-28px_rgb(11_18_32/0.35)]">
                <LightboxImage
                  src="/products/atlas/kullanici-yonetimi.png"
                  alt="Atlas kullanıcı ve rol yönetimi ekranı"
                  width={1701}
                  height={786}
                />
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <HeroSlider slides={atlasBannerSlides} size="tall" headingLevel={2} />

      <FaqSection items={product.faq} />

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="Atlas'ı kendi verilerinizle deneyin."
            description="Kurulum, ERP bağlantısı ve ilk raporlar dahil her aşamada ekibimiz sizinle birlikte çalışır."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="Atlas" tone="dark" align="center" />
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
