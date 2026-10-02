import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { AboutTeaser } from "@/components/ensa/AboutTeaser";
import { Container } from "@/components/ensa/Container";
import { FaqSection } from "@/components/ensa/FaqSection";
import { HeroSlider, type HeroSlide } from "@/components/ensa/HeroSlider";
import { HomeBlogSection } from "@/components/ensa/HomeBlogSection";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { OfferingCards } from "@/components/ensa/OfferingCards";
import { PartnerLogos } from "@/components/ensa/PartnerLogos";
import { PillarCard } from "@/components/ensa/PillarCard";
import { ProductCard } from "@/components/ensa/ProductCard";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { ServiceTicker } from "@/components/ensa/ServiceTicker";
import { Button } from "@/components/ensa/Button";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/site/Parts";
import { serviceCategoryList } from "@/lib/services";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";

const TITLE = "BTM Bilişim | Siber Güvenlik, Altyapı ve Yazılım Çözümleri";
const DESCRIPTION =
  "BTM Bilişim; siber güvenlik, sızma testi, ağ ve sunucu altyapısı, bulut yedekleme, lisanslama ve kurumsal yazılım ürünleriyle Gebze, Kocaeli ve Türkiye genelinde hizmet verir.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  // Alternative homepage design (slider). Same content as "/", kept out of the index.
  robots: { index: false, follow: true },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: absoluteUrl("/"), images: [DEFAULT_OG_IMAGE] },
};

// Latest posts are read from the DB (HomeBlogSection); 5-min backstop.
export const revalidate = 300;

// Product slides use `overlay: "light"` so their panel artwork stays legible;
// corporate photo slides use the default dark overlay.
const heroSlides: HeroSlide[] = [
  {
    image: "/hero/slider-1.jpg",
    imageAlt: "Şehir manzaralı kurumsal toplantı odası",
    eyebrow: "BTM Bilişim · Bilgi Teknolojileri Merkezi",
    titleLead: "Tek adres,",
    titleAccent: "altı uzmanlık.",
    description:
      "Siber güvenlik, sistem ve network, bulut ve yedekleme, yazılım, lisanslama ve danışmanlık süreçlerinizi ayrı tedarikçiler yerine tek bir ekiple yönetin.",
    primaryCta: { label: "Ücretsiz Keşif Talep Edin", href: "/iletisim/#teklif" },
    secondaryCta: { label: "Hizmetlerimizi İnceleyin", href: "/hizmetler/" },
  },
  {
    image: "/hero/pentforce-1.jpg",
    imageAlt: "BTM PentForce otonom yapay zekâ sızma testi platformu görseli",
    eyebrow: "BTM PentForce · Otonom AI Pentest",
    titleLead: "Sızma testini",
    titleAccent: "yapay zekâ yürütsün.",
    description:
      "Web, network, IoT/OT ve kaynak kod testini 38 fazlı metodolojiyle otonom çalıştırın; özel local AI ile air-gapped ortamlarda internetsiz tarama yapın.",
    primaryCta: { label: "PentForce'u İnceleyin", href: "/yazilim-urunlerimiz/pentforce/" },
    secondaryCta: { label: "Demo Talep Edin", href: "/iletisim/" },
    overlay: "light",
  },
  {
    image: "/hero/slider-2.jpg",
    imageAlt: "İş ortaklığını simgeleyen el sıkışma",
    eyebrow: "Uyum ve Güvenlik",
    titleLead: "Uyum ve güvenlik",
    titleAccent: "odaklı çalışıyoruz.",
    description:
      "Sızma testinden SIEM'e, firewall'dan ISO 27001 teknik kontrollerine kadar altyapınızı uçtan uca koruma altına alıyoruz.",
    primaryCta: { label: "Görüşme Talep Edin", href: "/iletisim/" },
    secondaryCta: { label: "Siber Güvenlik Çözümleri", href: "/siber-guvenlik/" },
  },
  {
    image: "/hero/orbit-1.jpg",
    imageAlt: "BTM Orbit IT operasyon ve envanter yönetim paneli",
    eyebrow: "BTM Orbit · IT Operasyon & Envanter",
    titleLead: "Tüm IT envanteriniz,",
    titleAccent: "tek merkezde.",
    description:
      "Donanım, yazılım ve lisans envanterinizi tek merkezden izleyin; IT talep, arıza ve bakım süreçlerini çok şirketli yapıyla uçtan uca yönetin.",
    primaryCta: { label: "Orbit'i İnceleyin", href: "/yazilim-urunlerimiz/orbit/" },
    secondaryCta: { label: "Demo Talep Edin", href: "/iletisim/" },
    overlay: "light",
  },
  {
    image: "/hero/fornet-1.jpg",
    imageAlt: "BTM FORNET Enterprise MSP merkezi altyapı ve erişim platformu görseli",
    eyebrow: "BTM FORNET Enterprise · MSP Platformu",
    titleLead: "Binlerce varlık,",
    titleAccent: "tek panelden.",
    description:
      "Çok kiracılı izole mimari, çok markalı VPN otomasyonu ve Guacamole + Vault tabanlı Zero-Trust yetkili erişimi tek platformda birleştirin.",
    primaryCta: { label: "FORNET'i İnceleyin", href: "/yazilim-urunlerimiz/fornet-enterprise/" },
    secondaryCta: { label: "Demo Talep Edin", href: "/iletisim/" },
    overlay: "light",
  },
  {
    image: "/hero/cyberhost-1.jpg",
    imageAlt: "BTM CyberHost Wi-Fi hotspot ve ağ yönetim platformu görseli",
    eyebrow: "BTM CyberHost · Wi-Fi & Ağ Yönetimi",
    titleLead: "Misafir Wi-Fi'yi",
    titleAccent: "5651 uyumlu yönetin.",
    description:
      "MikroTik uyumlu captive portal, HMAC-SHA256 hash zincirli değiştirilemez loglama ve çoklu şube yönetimini tek panelde toplayın.",
    primaryCta: { label: "CyberHost'u İnceleyin", href: "/yazilim-urunlerimiz/cyberhost/" },
    secondaryCta: { label: "Demo Talep Edin", href: "/iletisim/" },
    overlay: "light",
  },
  {
    image: "/hero/atlas-1.jpg",
    imageAlt: "BTM Atlas akıllı bütçe paneli arayüzü",
    eyebrow: "BTM Atlas · Bütçe ve Raporlama",
    titleLead: "Planlanan bütçe,",
    titleAccent: "gerçekleşenle yan yana.",
    description:
      "Atlas; gelir, gider ve satınalma bütçelerinizi ERP'nizden gelen canlı veriyle hesap kalemi düzeyinde karşılaştırır. Sapmayı anında görün.",
    primaryCta: { label: "Atlas'ı İnceleyin", href: "/yazilim-urunlerimiz/atlas/" },
    secondaryCta: { label: "Demo Talep Edin", href: "/iletisim/" },
    overlay: "light",
  },
  {
    image: "/hero/cyberquan-1.png",
    imageAlt: "BTM CyberQuan endüstriyel IoT ve üretim izleme platformu görseli",
    eyebrow: "BTM CyberQuan · Endüstriyel IoT İzleme",
    titleLead: "Üretim hattını",
    titleAccent: "sensörden panele izleyin.",
    description:
      "MQTT sensör, Modbus PLC ve IP kamera verisini tek panelde toplayın; lot bazlı izlenebilirlik ve otomatik eşik alarmını bir arada yönetin.",
    primaryCta: { label: "CyberQuan'ı İnceleyin", href: "/yazilim-urunlerimiz/cyberquan/" },
    secondaryCta: { label: "Demo Talep Edin", href: "/iletisim/" },
    overlay: "light",
  },
  {
    image: "/hero/otium-2.png",
    imageAlt: "BTM Otium izin talebi, onay akışı ve takvim ekranı",
    eyebrow: "BTM Otium · Onay Akışı & Takvim",
    titleLead: "İzin talebi, onay ve",
    titleAccent: "takvim tek ekranda.",
    description:
      "Çok adımlı onay akışı, ekip izin çakışması uyarıları ve departman bazlı raporlar — tüm izin operasyonunu tek ekrandan yönetin.",
    primaryCta: { label: "Otium'u İnceleyin", href: "/yazilim-urunlerimiz/otium/" },
    secondaryCta: { label: "Demo Talep Edin", href: "/iletisim/" },
    overlay: "light",
  },
  {
    image: "/hero/slider-4.jpg",
    imageAlt: "Ofis binası girişi",
    eyebrow: "Gebze Merkezli · Türkiye Geneli",
    titleLead: "Gebze'den Türkiye'ye,",
    titleAccent: "aynı standartta hizmet.",
    description:
      "Kocaeli ve İstanbul'da yerinde, Türkiye genelinde uzaktan destek modelleriyle aynı kalitede kurulum ve teknik destek sunuyoruz.",
    primaryCta: { label: "Görüşme Talep Edin", href: "/iletisim/" },
    secondaryCta: { label: "Hizmet Rehberi", href: "/hizmet-rehberi/" },
  },
];

const homeFaq = [
  {
    question: "BTM Bilişim hangi alanlarda hizmet veriyor?",
    answer:
      "Danışmanlık, siber güvenlik, sistem & network, bulut & yedekleme, yazılım & dijital çözümler ve lisanslama olmak üzere altı uzmanlık alanında hizmet veriyoruz. Bunlara ek olarak Atlas, Orbit, PentForce gibi kurumsal yazılım ürünlerimiz ve güvenlik kamerası (IP kamera) kurulum hizmetimiz de var.",
  },
  {
    question: "Hangi bölgelere yerinde hizmet veriyorsunuz?",
    answer:
      "Merkezimiz Gebze'dedir. Gebze, Darıca, Dilovası, Çayırova ve Kocaeli genelinin yanı sıra Tuzla ve İstanbul Anadolu yakasına yerinde hizmet veriyoruz. Uzaktan yürütülebilen işler için Türkiye'nin her yerinden çalışıyoruz.",
  },
  {
    question: "Kendi ürünleriniz mi var, yoksa özel yazılım da geliştiriyor musunuz?",
    answer:
      "İkisi de. Atlas (bütçe/raporlama), Orbit (IT operasyon), PentForce (otonom pentest) gibi hazır ürünlerimiz var; bunun yanında ihtiyacınıza özel yazılım ve entegrasyon çözümleri de geliştiriyoruz.",
  },
  {
    question: "Keşif ve teklif için ücret alıyor musunuz?",
    answer:
      "İlk keşif görüşmesi ve teklif hazırlığı ücretsizdir. Altyapınızı inceledikten sonra ihtiyaca göre kalem kalem bir teklif sunarız.",
  },
  {
    question: "Bir projeye nasıl başlayabiliriz?",
    answer:
      "İletişim sayfamızdan kısaca ihtiyacınızı iletmeniz yeterli. Ekibimiz talebinizi değerlendirip sizi doğru uzmanlık alanına yönlendirir; ardından kapsamı birlikte netleştirip bir çalışma planı çıkarırız.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <HeroSlider slides={heroSlides} />

      <AboutTeaser />

      <section className="bg-navy-900 py-20 md:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Öne Çıkan Ürünler"
              title="İşinizi ileri taşıyan dijital ürünler."
              description="Finans, siber güvenlik ve bilişim altyapısı alanlarında geliştirdiğimiz kurumsal yazılımlar."
              tone="dark"
            />
            <MotionReveal delay={0.1}>
              <Button href="/yazilim-urunlerimiz/" variant="ghost-dark">
                Tüm ürünleri gör
              </Button>
            </MotionReveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} delay={(i % 3) * 0.06} tone="dark" />
            ))}
          </div>
        </Container>
      </section>

      <ServiceTicker />

      <OfferingCards />

      <section className="bg-paper-50 py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Hizmet Alanlarımız"
            title="Altı uzmanlık alanı, tek sorumlu ekip."
            description="Her hizmet kategorisi kendi uzmanlarıyla yürütülür; siz tek bir muhatapla çalışırsınız."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategoryList.map((category, i) => (
              <PillarCard
                key={category.slug}
                index={String(i + 1).padStart(2, "0")}
                title={category.title}
                summary={category.summary}
                count={`${category.services.length} alt hizmet`}
                href={`/${category.slug}/`}
                delay={i * 0.08}
                tone="light"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-navy-950/10 bg-paper-100 py-10">
        <Container className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-balance font-display text-lg font-semibold text-ink-900 md:text-xl">
              Ağ, sunucu, kamera ve yedekleme hizmetlerimizin tamamı
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Kurulumdan bakıma, sahada verdiğimiz hizmetlerin ayrıntılı sayfaları Hizmet Rehberi&apos;nde.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/hizmet-rehberi/" variant="ghost-light">
              Hizmet Rehberi
            </Button>
            <Button href="/iletisim/" variant="primary">
              Ekibimizle Konuşun
            </Button>
          </div>
        </Container>
      </section>

      {/* #teklif: header "Teklif Al", article CTAs and AI-written posts link here. */}
      <section id="teklif" className="scroll-mt-28 bg-navy-950 py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <SectionHeading
                tone="dark"
                eyebrow="Hızlı Teklif"
                title="İhtiyacınızı anlatın, aynı gün dönelim."
                description="Birkaç bilgiyle kapsamınızı anlayalım; keşif randevusu ve teklif için en kısa sürede sizinle iletişime geçelim."
              />
              <p className="mt-6 text-sm text-slate-300">
                Hemen konuşmak isterseniz:{" "}
                <a href={site.phone.href} className="font-medium text-paper-50 hover:text-gold-300">
                  {site.phone.display}
                </a>{" "}
                ·{" "}
                <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="font-medium text-paper-50 hover:text-gold-300">
                  WhatsApp
                </a>
              </p>
            </div>
            <QuoteForm />
          </div>
        </Container>
      </section>

      <PartnerLogos />

      <FaqSection items={homeFaq} />

      <section className="bg-navy-950 py-20">
        <Container>
          <MotionReveal className="mx-auto max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-300">
              <span className="h-px w-8 bg-gold-300" />
              Hemen Başlayalım
              <span className="h-px w-8 bg-gold-300" />
            </div>
            <h2 className="text-balance font-display text-4xl font-bold leading-tight tracking-tight text-paper-50 md:text-5xl">
              Altyapınızı konuşalım.
            </h2>
            <p className="mt-4 text-balance text-lg text-slate-300">
              İhtiyacınızı kısaca anlatın, doğru uzmanlık alanına yönlendirelim.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/iletisim/" variant="primary">
                İletişime Geçin
              </Button>
              <Button href={site.phone.href} variant="ghost-dark">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone.display}
              </Button>
            </div>
          </MotionReveal>
        </Container>
      </section>

      <HomeBlogSection />
    </>
  );
}
