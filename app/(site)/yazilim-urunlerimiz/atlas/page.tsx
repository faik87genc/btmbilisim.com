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
import { Button } from "@/components/ensa/Button";
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
    title: "Tek Ekranda Genel Bakış",
    description:
      "Günlük ciro, tahsilat oranı, yeni müşteri sayısı ve çek portföyünüzü tek bir gösterge panelinde anlık olarak izleyin.",
  },
  {
    icon: TrendingUp,
    title: "En Çok Satan Ürünler ve Cariler",
    description:
      "Son dönem satış hacmine göre öne çıkan ürünleri ve en çok ciro yapılan cari hesapları otomatik sıralanmış olarak görün.",
  },
  {
    icon: Wallet,
    title: "Nakit ve Çek Pozisyonu",
    description:
      "Kasa, banka ve tahsile verilen çek tutarlarını tek kartta özetleyerek anlık nakit pozisyonunuzu netleştirin.",
  },
  {
    icon: RefreshCw,
    title: "Canlı Veri Senkronizasyonu",
    description:
      "Panel, kullandığınız ERP veritabanınızla senkronize çalışır; ayrı bir veri aktarımı yapmanıza gerek kalmaz.",
  },
];

const erpFeatures = [
  {
    icon: PackageSearch,
    title: "Ürün ve Cari Bazlı Satınalma Raporu",
    description:
      "ERP veritabanınızdan çekilen satınalma hareketlerini ürün, cari ve tarih aralığına göre filtreleyip alım/iade net tutarlarını görün.",
  },
  {
    icon: Building2,
    title: "Çoklu Firma Desteği",
    description:
      "ERP tarafında tanımlı birden fazla firmayı tek panelden yönetin, raporlarınızı firma bazında ayırın.",
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
    titleLead: "Uçtan Uca Akıllı Bütçe Yönetimi:",
    titleAccent: "Veriden Karara Tek Platform",
    description:
      "Bütçenizi ister manuel girin, ister Excel veya muhasebe sisteminizden (Logo vb.) saniyeler içinde entegre edin. Planlanan ve gerçekleşen verilerinizi anlık karşılaştırın, sapmaları analiz edin ve finansal kararlarınızı veriye dayalı raporlarla güvenle alın.",
    ctaLabel: "Finansal Kontrolü Ele Al",
    ctaHref: "/iletisim",
    image: "/products/atlas/gosterge-paneli.png",
    imageAlt: "Atlas gösterge paneli",
    imageWidth: 1685,
    imageHeight: 1172,
  },
  {
    eyebrow: `${product.code} · ANALİZ`,
    titleLead: "Akıllı Analizler &",
    titleAccent: "Raporlama",
    description:
      "Planlanan ve gerçekleşen bütçenizi hesap kalemi düzeyinde karşılaştırın, sapma yüzdesini kendiniz belirleyin; esnek rapor kartlarıyla PDF ve Excel çıktısı alın.",
    ctaLabel: "Raporları Görüntüle",
    ctaHref: "/iletisim",
    image: "/products/atlas/finansal-raporlar.png",
    imageAlt: "Atlas esnek rapor kartları",
    imageWidth: 1672,
    imageHeight: 951,
  },
  {
    eyebrow: `${product.code} · GÜVENLİK`,
    titleLead: "Sistem Yönetimi &",
    titleAccent: "Güvenlik",
    description:
      "Kullanıcı ekleyip rollerini ve erişim yetkilerini düzenleyin; tüm veri alışverişi TLS ile şifrelenir, oturumlar otomatik sonlanarak yetkisiz erişim riskini azaltır.",
    ctaLabel: "Kontrol Paneline Git",
    ctaHref: "/iletisim",
    image: "/products/atlas/kullanici-yonetimi.png",
    imageAlt: "Atlas kullanıcı yönetimi ekranı",
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
    imageAlt: "Depo ve ofis ortamında Atlas bütçe panelinin kullanımı",
    eyebrow: "Atlas · Her Ortamda Kontrol",
    titleLead: "Sahada da,",
    titleAccent: "ofiste de aynı kontrol.",
    description:
      "Depodan merkez ofise, Atlas'ın gösterge paneli her ekipte aynı güncel veriyi gösterir — kararlarınız hep aynı kaynaktan beslenir.",
    primaryCta: { label: "Demo Talep Edin", href: "/iletisim/" },
    secondaryCta: { label: "Diğer Ürünlerimiz", href: "/yazilim-urunlerimiz/" },
    overlay: "light",
  },
  {
    image: "/hero/atlas-alt-2.jpg",
    imageAlt: "Yapay zeka destekli finansal karar verme konsepti",
    eyebrow: "Atlas · Veriye Dayalı Gelecek",
    titleLead: "Rakamları değil,",
    titleAccent: "kararları yönetin.",
    description:
      "Atlas, ham veriyi otomatik olarak anlamlı bütçe içgörülerine dönüştürür; ekibiniz raporlamayla değil, kararla vakit geçirsin.",
    primaryCta: { label: "Demo Talep Edin", href: "/iletisim/" },
    secondaryCta: { label: "Diğer Ürünlerimiz", href: "/yazilim-urunlerimiz/" },
    overlay: "light",
  },
];

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Şifreli Bağlantı",
    description: "Tüm veri alışverişi TLS ile şifrelenerek iletilir.",
  },
  {
    icon: KeyRound,
    title: "Oturum Güvenliği",
    description:
      "Oturumlar belirli bir süre sonunda otomatik sonlanır, yetkisiz erişim riskini azaltır.",
  },
  {
    icon: Users,
    title: "Yetki Bazlı Kullanıcı Yönetimi",
    description:
      "Kullanıcı ekleyin, rollerini ve erişim yetkilerini düzenleyin, ihtiyaç halinde hesapları pasifleştirin.",
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
            eyebrow="Genel Bakış"
            title="Kurumunuzun finansal nabzı tek panelde."
            description="Gösterge paneli, ERP'nizden gelen veriyi anlık olarak işleyerek satış, tahsilat ve nakit pozisyonunuzu özetler."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="grid gap-5">
              {overviewFeatures.map((feature, i) => (
                <MotionReveal key={feature.title} delay={i * 0.08}>
                  <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
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
                </MotionReveal>
              ))}
            </div>
            <MotionReveal delay={0.16}>
              <div className="overflow-hidden rounded-card border border-navy-950/10 shadow-[0_24px_60px_-30px_rgba(10,18,32,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
                <LightboxImage
                  src="/products/atlas/gosterge-paneli.png"
                  alt="Atlas gösterge paneli"
                  width={1685}
                  height={1172}
                  priority
                />
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Bütçe / Gerçekleşme Karşılaştırması"
            title="Planlanan ile gerçekleşeni hesap kalemi düzeyinde karşılaştırın."
            description="Gelir ve gider bütçelerinizi hesap grubu bazında aylık ve yıllık olarak karşılaştırın; kabul edilebilir sapma yüzdesini kendiniz belirleyin. Faaliyet grubuna, yıla ve aya göre filtreleyerek istediğiniz kırılımda rapor alın."
          />
          <MotionReveal delay={0.05} className="mt-10 mx-auto max-w-2xl">
            <ImageCarousel
              tone="light"
              frameHeight="h-80 sm:h-96"
              images={[
                {
                  src: "/products/atlas/gelir-butcesi-yillik.png",
                  alt: "Atlas gelir bütçesi yıllık raporu",
                  width: 1692,
                  height: 1180,
                  label: "Gelir Bütçesi Yıllık",
                },
                {
                  src: "/products/atlas/gider-butcesi-yillik.png",
                  alt: "Atlas gider bütçesi yıllık raporu",
                  width: 1698,
                  height: 1096,
                  label: "Gider Bütçesi Yıllık",
                },
                {
                  src: "/products/atlas/gelir-butcesi-aylik.png",
                  alt: "Atlas gelir bütçesi aylık karşılaştırma raporu",
                  width: 1693,
                  height: 887,
                  label: "Gelir Bütçesi Aylık Karşılaştırma",
                },
                {
                  src: "/products/atlas/gider-butcesi-aylik.png",
                  alt: "Atlas gider bütçesi aylık karşılaştırma raporu",
                  width: 1670,
                  height: 1166,
                  label: "Gider Bütçesi Aylık Karşılaştırma",
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
            eyebrow="ERP Entegrasyonları"
            title="Kullandığınız ERP ile aynı ekranda çalışın."
            description="Atlas, kullandığınız ERP'den bağımsız çalışacak şekilde tasarlanmıştır. Aşağıdaki gibi yaygın kurumsal ERP sistemleriyle entegre olabiliriz."
          />
          <MotionReveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
            {supportedErps.map((erp) => (
              <span
                key={erp}
                className="inline-block rounded-sm bg-paper-50/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gold-300"
              >
                {erp}
              </span>
            ))}
          </MotionReveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="grid gap-5">
              {erpFeatures.map((feature, i) => (
                <MotionReveal key={feature.title} delay={i * 0.08}>
                  <div className="group/f flex h-full items-start gap-4 rounded-card border border-paper-50/10 bg-paper-50/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
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
                <div className="overflow-hidden rounded-card border border-paper-50/10 bg-navy-900 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50">
                  <LightboxImage
                    src="/products/atlas/detayli-satinalmalar.png"
                    alt="Atlas detaylı satınalmalar raporu"
                    width={1692}
                    height={1177}
                  />
                </div>
                <p className="mt-3 text-xs uppercase tracking-wider text-slate-400">
                  Detaylı Satınalmalar
                </p>
              </MotionReveal>
              <div className="grid gap-6 sm:grid-cols-2">
                <MotionReveal delay={0.2}>
                  <div className="overflow-hidden rounded-card border border-paper-50/10 bg-navy-900 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50">
                    <LightboxImage
                      src="/products/atlas/satinalma-butcesi-karsilastirma.png"
                      alt="Atlas satınalma bütçesi filtreleri"
                      width={1712}
                      height={456}
                    />
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wider text-slate-400">
                    Satınalma Bütçesi Filtreleri
                  </p>
                </MotionReveal>
                <MotionReveal delay={0.24}>
                  <div className="overflow-hidden rounded-card border border-paper-50/10 bg-navy-900 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50">
                    <LightboxImage
                      src="/products/atlas/coklu-firma.png"
                      alt="Atlas çoklu firma seçimi"
                      width={580}
                      height={340}
                    />
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wider text-slate-400">
                    Çoklu Firma Seçimi
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
            eyebrow="Esnek Veri Girişi"
            title="Verinizi elle girin ya da toplu aktarın."
            description="Gelir, gider ve satınalma bütçelerinizi tek tek kaydedin; ya da Excel şablonuyla saniyeler içinde toplu olarak içeri aktarın."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <MotionReveal>
              <div className="overflow-hidden rounded-card border border-navy-950/10 shadow-[0_24px_60px_-30px_rgba(10,18,32,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
                <LightboxImage
                  src="/products/atlas/manuel-veri-girisi.png"
                  alt="Atlas manuel veri girişi ekranı"
                  width={1699}
                  height={534}
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                Manuel Veri Girişi — Gelir, gider ve satınalma bütçesi formları
              </p>
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <div className="overflow-hidden rounded-card border border-navy-950/10 shadow-[0_24px_60px_-30px_rgba(10,18,32,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
                <LightboxImage
                  src="/products/atlas/toplu-veri-aktarimi.png"
                  alt="Atlas toplu veri aktarımı ekranı"
                  width={1708}
                  height={576}
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                Toplu Veri Aktarımı — Excel şablonuyla hızlı içeri aktarım
              </p>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <MotionReveal>
              <SectionHeading
                tone="dark"
                eyebrow="Esnek Rapor Kartları"
                title="Rakamlarınızı kart halinde, ihtiyacınıza göre düzenleyin."
                description="Aylık gelir, gider dağılımı ve nakit akışını kart bazlı, özelleştirilebilir bir düzende görüntüleyin; PDF ve Excel çıktısı alın."
              />
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <div className="overflow-hidden rounded-card border border-paper-50/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50">
                <LightboxImage
                  src="/products/atlas/finansal-raporlar.png"
                  alt="Atlas esnek rapor kartları"
                  width={1672}
                  height={951}
                />
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Kurumsal Güvenlik"
            title="Verileriniz yetkili ellerde kalır."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="grid gap-5">
              {securityFeatures.map((feature, i) => (
                <MotionReveal key={feature.title} delay={i * 0.08}>
                  <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
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
                </MotionReveal>
              ))}
            </div>
            <MotionReveal delay={0.16}>
              <div className="overflow-hidden rounded-card border border-navy-950/10 shadow-[0_24px_60px_-30px_rgba(10,18,32,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
                <LightboxImage
                  src="/products/atlas/kullanici-yonetimi.png"
                  alt="Atlas kullanıcı yönetimi ekranı"
                  width={1701}
                  height={786}
                />
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      <HeroSlider slides={atlasBannerSlides} size="tall" />

      <FaqSection items={product.faq} />

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="Atlas'ı kendi ERP veritabanınızla test edin."
            description="Kurulum sürecinden entegrasyona kadar tüm adımlarda yanınızdayız."
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
