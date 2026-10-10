export type ServicePageContent = {
  /** Matches a `slug` in `serviceCategoryList` (lib/services.ts). */
  categorySlug: string;
  /** Matches a `services[].key` in that category. */
  serviceKey: string;
  /** URL segment: `/{categorySlug}/{slug}`. Kept identical to `serviceKey`. */
  slug: string;
  /** Page <h1> and, with the layout template, the <title>. */
  title: string;
  /** Full <title> when it should differ from `title` (keyword + location). */
  metaTitle?: string;
  /** Sidebar "related services" as "category/key" paths, when the default
   * (siblings in the same category) is not the best fit. */
  related?: string[];
  /** <meta name="description"> and the visible hero sub-headline. ~150-160 chars. */
  metaDescription: string;
  /** Body copy as Markdown (GFM). No FAQ section — that is rendered from `faq`. */
  content: string;
  faq: { question: string; answer: string }[];
};

/**
 * Editorial content for the sub-service detail pages (`/{category}/{service}`),
 * rendered by app/(site)/[slug]/[service]/page.tsx. This list is the source of
 * truth: edit the copy here (title, metaTitle, metaDescription, content, faq).
 */
export const servicePagesContent: ServicePageContent[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Danışmanlık
  // ─────────────────────────────────────────────────────────────────────────
  {
    categorySlug: "danismanlik",
    serviceKey: "iso-27001-bilgi-guvenligi-danismanligi",
    slug: "iso-27001-bilgi-guvenligi-danismanligi",
    title: "ISO 27001 Bilgi Güvenliği Danışmanlığı",
    metaDescription:
      "ISO 27001 danışmanlığı: BGYS kapsamı, varlık envanteri, risk analizi, SoA, politika seti, iç denetim ve belgelendirme denetimine eşlik. Baş denetçi deneyimi.",
    content: `ISO 27001 belgesini duvara asmak kolaydır; zor olan, denetçi masaya oturduğunda bilgi güvenliğini gerçekten nasıl yönettiğinizi gösterebilmektir. ISO 27001 bilgi güvenliği danışmanlığımızda amaç, kurumunuzun kendi ekibiyle yaşatabileceği bir Bilgi Güvenliği Yönetim Sistemi (BGYS) kurmaktır. Çalışmayı ISO 27001 baş denetçi deneyimiyle, denetimde hangi kanıtın aranacağını bilerek yürütürüz.

## Standart size ne getirir?

ISO 27001, bilgi varlıklarınızın gizliliğini, bütünlüğünü ve erişilebilirliğini korumak için uluslararası kabul görmüş bir çerçevedir. Bir yazılım ya da cihaz değildir; riskleri belirleyip kontrolleri seçtiğiniz, bunların işlediğini kayıtla gösterdiğiniz ve düzenli aralıklarla gözden geçirdiğiniz bir yönetim döngüsüdür.

## Danışmanlık kapsamı

- Kurumun bağlamı, ilgili taraflar ve BGYS kapsamının çizilmesi
- Bilgi varlıklarının listelenmesi ve sınıflandırılması
- Risk değerlendirme yöntemi, risk kaydı ve risk işleme planı
- Ek A kontrollerinin seçimi ve Uygulanabilirlik Bildirgesi (SoA)
- Kurumunuzun gerçek işleyişine göre yazılmış politika, prosedür ve kayıt şablonları
- Çalışan farkındalık eğitimi ve iç denetim
- Yönetimin gözden geçirmesi; aşama 1 ve aşama 2 belgelendirme denetimlerine eşlik

## Proje akışı

1. **Mevcut durum analizi** — Bugünkü uygulamalarınızı standardın maddeleriyle karşılaştırır, eksikleri listeleriz.
2. **Sistem tasarımı** — Kapsamı, risk analizini ve doküman setini ekibinizle birlikte hazırlarız.
3. **Hayata geçirme** — Kontroller işletmeye alınır, kayıtlar düzenli üretilmeye başlar.
4. **Belgelendirmeye hazırlık** — İç denetim ve yönetim gözden geçirmesini tamamlar, belgelendirme kuruluşunun denetimlerinde yanınızda oluruz.

## Kaçınmanız gereken tuzaklar

İlk belgelendirmede kapsamı tüm şirkete yaymak süreci gereksiz uzatır; kritik birimlerle başlamak daha gerçekçidir. Risk analizini tamamen danışmana bırakmak, sistemi sahiplenilmeyen bir belgeye dönüştürür. Kimsenin okumadığı uzun politikalar da denetimde değil, günlük işte başarısız olur. KVKK uyumu ile ISO 27001 sık karıştırılır; farkları ve ortak noktaları için [KVKK danışmanlığı](/danismanlik/kvkk-danismanligi/) sayfamıza bakabilirsiniz.

## Teknik tarafı kim kuracak?

Erişim yönetimi, loglama, şifreleme ve yedekleme gibi Ek A'nın teknik kontrollerini sistemlerinize uygulamak için [ISO 27001 teknik güvenlik çözümlerimizle](/siber-guvenlik/iso-27001-teknik-guvenlik-cozumleri/) aynı projede ilerleyebiliriz. Böylece doküman ile sahadaki uygulama birbirinden kopmaz.

## Elde ettikleriniz

Müşteri ve ihale şartnamelerindeki bilgi güvenliği koşullarını karşılayan, KVKK tedbirleriyle örtüşen, riskleri ölçülebilir hâle getiren ve denetimde kanıtla savunulabilen bir sistem.

Hedeflediğiniz belgelendirme tarihini ve kapsamı ücretsiz ilk görüşmede konuşalım. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Belgeyi sizden mi alacağız?",
        answer:
          "Hayır, ISO 27001 belgesini akredite bir belgelendirme kuruluşu düzenler. Biz sistemi kurar, dokümanları hazırlar, iç denetimi yapar ve belgelendirme denetimlerinde sizinle birlikte bulunuruz.",
      },
      {
        question: "Kurulum süresini ne belirler?",
        answer:
          "Kurumun büyüklüğü, kapsamdaki lokasyon ve süreç sayısı ve mevcut güvenlik uygulamalarınızın olgunluğu belirleyicidir. Kapsamı dar tutup kritik birimlerle başlamak süreyi belirgin biçimde kısaltır; mevcut durum analizinden sonra size bir takvim sunarız.",
      },
      {
        question: "KVKK çalışmamız ISO 27001'i kolaylaştırır mı?",
        answer:
          "Evet. KVKK için aldığınız teknik ve idari tedbirlerin önemli kısmı Ek A kontrolleriyle örtüşür. İki çalışmayı birlikte yürütmek aynı işin iki kez yapılmasını önler.",
      },
      {
        question: "Belge aldıktan sonra ne olacak?",
        answer:
          "Belgelendirme kuruluşu her yıl gözetim denetimi yapar. Sistemin canlı kalması için iç denetim, risk güncellemesi ve yönetim gözden geçirmesini düzenli sürdürmeniz gerekir; isterseniz bu dönemde de destek veririz.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "kvkk-danismanligi",
    slug: "kvkk-danismanligi",
    title: "KVKK Danışmanlığı",
    metaDescription:
      "KVKK danışmanlığı: kişisel veri envanteri, hukuki sebep analizi, aydınlatma ve açık rıza metinleri, VERBİS kaydı, saklama-imha politikası ve ihlal müdahalesi.",
    content: `Web sitenize bir aydınlatma metni koymak KVKK uyumu demek değildir. Kurul ya da bir veri sahibi soru sorduğunda, hangi kişisel veriyi hangi amaçla topladığınızı, kimlerle paylaştığınızı ve ne zaman sildiğinizi gösterebilmeniz gerekir. KVKK danışmanlığımız bu soruların cevabını departman departman çıkarır ve uyumu, ekibinizin sürdürebileceği bir çalışma düzenine dönüştürür.

## Uyum neden bir kez yapılıp bitmez?

Yeni bir İK yazılımı, değişen bir kargo firması ya da başlatılan bir pazarlama kampanyası veri akışlarınızı değiştirir. Bu yüzden envanter ve metinler en az yılda bir gözden geçirilmeli, her yeni süreçte güncellenmelidir. Aydınlatma metni bu çalışmanın sonucudur; başlangıç noktası veri envanteridir.

## Çalışmanın kapsamı

- Her departman için kişisel veri işleme envanteri ve her faaliyetin dayandığı hukuki sebep
- Aydınlatma metinleri; gerekli durumlarda açık rıza metinleri
- Saklama ve imha politikası ile periyodik imha takvimi
- VERBİS kaydı ve güncelleme desteği
- Tedarikçi ve veri işleyen sözleşmelerine KVKK maddeleri
- Veri ihlali müdahale prosedürü ve Kurul'a 72 saat içinde bildirim akışı
- İlgili kişi başvuru kanalı ve 30 günlük yanıt süreci
- Çalışan farkındalık eğitimi

## Kimler öncelikli?

Müşteri, personel veya hasta verisi işleyen her ölçekteki işletme; kişisel veriyi bulutta veya üçüncü taraf yazılımlarda tutan şirketler; VERBİS ve açık rıza süreçlerini netleştirmek isteyen kurumlar ve bir ihlal yaşadıktan sonra düzenini yeniden kurması gereken ekipler.

## Proje adımları

1. **Haritalama** — Hangi veriyi, hangi amaçla, nerede ve ne süreyle işlediğinizi birim yöneticileriyle görüşerek çıkarırız.
2. **Metinler ve politikalar** — Envantere dayanarak aydınlatma metinlerini, rıza formlarını ve politika setini hazırlarız.
3. **Teknik ve idari tedbirler** — Yetki matrisi, loglama, yedekleme ve erişim kontrollerini gözden geçiririz.
4. **Eğitim ve tatbikat** — Çalışanları bilgilendirir, ihlal prosedürünü masa başı bir senaryoyla deneriz.

## Teknik tarafı tamamlayan hizmetler

KVKK'nın teknik tedbirlerini ağ, sunucu ve yedekleme altyapınıza uygulamak için [IT danışmanlık hizmetlerimiz](/danismanlik/it-danismanlik-hizmetleri/), kurumsal bilgi güvenliğini standarda bağlamak için [ISO 27001 danışmanlığı](/danismanlik/iso-27001-bilgi-guvenligi-danismanligi/), kişisel verinin e-posta veya USB ile dışarı çıkmasını engellemek için [DLP çözümleri](/siber-guvenlik/dlp-veri-kaybi-onleme-cozumleri/) bu çalışmayla birlikte planlanabilir.

## Ne kazanırsınız?

İdari para cezası riskinin azalması, veri sahibi başvurularına süresinde verilen cevaplar, tedarikçilerle sorumlulukların yazılı olarak netleşmesi ve ISO 27001 ile örtüşen, denetime hazır bir yapı.

Mevcut uyum düzeyinizi ücretsiz bir ön görüşmede birlikte değerlendirelim. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Yalnızca aydınlatma metni hazırlatmak yeterli mi?",
        answer:
          "Yeterli değildir. Arkasında bir veri envanteri ve saklama-imha düzeni olmayan metin, ilk incelemede tutarsızlık gösterir. Aydınlatma metni envanterden türetilmelidir.",
      },
      {
        question: "VERBİS kaydı bizim için zorunlu mu?",
        answer:
          "Yükümlülük çalışan sayısına, yıllık mali bilanço büyüklüğüne ve işlenen verinin niteliğine göre değişir. Ön değerlendirmede kurumunuzun kayıt yükümlülüğü olup olmadığını netleştiririz.",
      },
      {
        question: "Uyum projesi ne kadar sürer?",
        answer:
          "Süre birim sayısına, veri akışlarının karmaşıklığına ve mevcut dokümanlarınıza bağlıdır. Haritalama aşamasından sonra adım adım bir takvim çıkarır, eğitimi ve ihlal tatbikatını projenin sonuna planlarız.",
      },
      {
        question: "Veri ihlali yaşarsak ne yapmalıyız?",
        answer:
          "İhlalin kapsamını belirleyip yayılmasını durdurmanız ve Kurul'a bildirim için yasal süreyi kaçırmamanız gerekir. Hazırladığımız müdahale prosedürü kimin neyi, hangi sırayla yapacağını önceden tanımlar.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "it-danismanlik-hizmetleri",
    slug: "it-danismanlik-hizmetleri",
    title: "IT Danışmanlık Hizmetleri",
    related: ["sistem-network/sistem-ve-network-danismanligi","siber-guvenlik/siber-guvenlik-danismanligi","sistem-network/it-bakim-ve-destek-hizmetleri","danismanlik/iso-27001-bilgi-guvenligi-danismanligi","danismanlik/kvkk-danismanligi"],
    metaTitle: "IT Danışmanlık Hizmetleri ve Firması | BTM Bilişim",
    metaDescription:
      "IT danışmanlık firması BTM Bilişim: teknoloji yol haritası, altyapı ve siber güvenlik değerlendirmesi, dış kaynak IT müdürü. 2010'dan beri Türkiye genelinde.",
    content: `IT danışmanlık hizmetlerimiz, işletmenizin bilgi teknolojilerini (BT) iş hedeflerinize hizmet eden, güvenli ve ölçülebilir bir yapıya dönüştürür. BTM Bilişim'de yaptığımız her işin temelinde IT danışmanlığı vardır: önce ihtiyacı ve riski netleştirir, sonra altyapıyı, güvenliği ve yazılımı buna göre kurar ve yönetiriz. 2010'dan bu yana farklı ölçekte kurumların ağ, sunucu, güvenlik, bulut ve yazılım projelerini sahada bizzat yürütüyoruz.

## IT danışmanlık nedir?

IT danışmanlık (bilgi teknolojileri danışmanlığı, BT danışmanlık ya da bilişim danışmanlığı), bir kurumun teknoloji altyapısını, yazılımlarını, güvenliğini ve IT süreçlerini bağımsız bir gözle değerlendirip; iş hedefleriyle uyumlu, bütçelenmiş ve önceliklendirilmiş bir yol haritası çıkarma ve bu yol haritasının uygulanmasına eşlik etme hizmetidir.

İyi bir IT danışmanı yalnızca "hangi cihazı alalım?" sorusunu cevaplamaz. Şu soruların cevabını birlikte bulur:

- Mevcut altyapımız büyümemizi taşır mı, darboğaz nerede?
- Siber güvenlik açısından en büyük riskimiz ne ve önce neyi kapatmalıyız?
- Verilerimiz bir fidye yazılımı saldırısında ya da donanım arızasında geri gelir mi?
- IT bütçemiz doğru yere mi harcanıyor, hangi lisans ve hizmetler gereksiz?
- Bulut mu, yerinde sunucu mu, yoksa ikisinin birleşimi mi bize uygun?
- KVKK ve ISO 27001 gereksinimlerini teknik olarak nasıl karşılarız?

## Kimler için uygun?

- **Kendi IT ekibi olmayan KOBİ'ler:** Bilişim işleri bir çalışanın "yan görevi" olan, arıza oldukça çözüm arayan işletmeler
- **Küçük IT ekibi olan kurumlar:** Günlük destek yükü altında strateji, güvenlik ve projeye zaman ayıramayan ekipler
- **Fabrika ve OSB işletmeleri:** Üretim (OT) ağı ile ofis ağının ayrılması, kesintisiz üretim ve kamera altyapısı ihtiyacı olan tesisler
- **Çok şubeli işletmeler:** Şubeler arası bağlantı, merkezi yönetim ve standart kurulum isteyen yapılar
- **Büyüyen veya yeniden yapılanan şirketler:** Taşınma, birleşme, yeni tesis ya da yeni ERP geçişi öncesinde doğru kararı vermek isteyenler
- **Denetime hazırlanan kurumlar:** ISO 27001, KVKK veya müşteri güvenlik denetimleri öncesinde teknik eksiklerini görmek isteyenler

## IT danışmanlık hizmetlerimizin kapsamı

### 1. IT stratejisi ve teknoloji yol haritası

Mevcut durumunuzu çıkarır, 12-24 aylık, bütçelenmiş ve önceliklendirilmiş bir teknoloji yol haritası hazırlarız. Yatırımlar "acil ihtiyaç" baskısıyla değil, plana göre yapılır.

### 2. Altyapı değerlendirmesi (IT check-up)

Ağ, sunucu, sanallaştırma, depolama, yedekleme, lisans ve kullanıcı cihazlarınızın envanterini ve sağlığını inceleriz. Tek arıza noktalarını, ömrünü tamamlamış donanımları ve performans darboğazlarını raporlarız. Uygulama tarafında [ağ altyapısı kurulum ve yönetimi](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/) ile [sunucu kurulum ve yönetimi](/sistem-network/sunucu-kurulum-ve-yonetimi/) hizmetlerimizle devam ederiz.

### 3. Siber güvenlik danışmanlığı

[Siber güvenlik danışmanlığı](/siber-guvenlik/siber-guvenlik-danismanligi/) kapsamında saldırgan gözüyle bakarız: dışarıya açık servisler, zayıf parolalar, yamalanmamış sistemler, yetki karmaşası ve yedeklerin güvenliği. İhtiyaç olduğunda [sızma testi](/siber-guvenlik/sizma-testi-penetrasyon-testi/) ile bulguları doğrular, firewall, EDR ve DLP gibi koruma katmanlarını ürün bağımsız olarak kurgularız. Ayrıntılar için [siber güvenlik çözümlerimiz](/siber-guvenlik/).

### 4. Yedekleme ve iş sürekliliği

3-2-1 kuralına uygun, şifreli ve düzenli olarak geri yükleme testi yapılan bir yedekleme mimarisi kurarız. Kritik sistemler için kabul edilebilir kesinti süresini (RTO) ve veri kaybını (RPO) birlikte belirler, [felaket kurtarma](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) planına dönüştürürüz.

### 5. Bulut ve Microsoft 365 danışmanlığı

Hangi iş yükünün bulutta, hangisinin yerinde kalması gerektiğini maliyet, performans ve güvenlik açısından değerlendiririz. [Microsoft 365](/bulut-yedekleme/microsoft-365-cozumleri/), Azure ve AWS geçişlerini planlar ve uygularız.

### 6. Lisans ve maliyet optimizasyonu

Microsoft, sanallaştırma, yedekleme ve güvenlik lisanslarınızı gerçek kullanımla karşılaştırır; eksik (yasal risk) ve fazla (gereksiz maliyet) lisansları ortaya çıkarırız. Doğru lisans modeli için [lisanslama hizmetlerimiz](/lisanslama/).

### 7. ISO 27001 ve KVKK teknik uyum

ISO 27001 baş denetçi bakış açısıyla, standardın ve KVKK'nın teknik kontrollerini (erişim yönetimi, loglama, yedekleme, şifreleme, zafiyet yönetimi) altyapınıza uygularız. Belgelendirme sürecinin tamamı için kardeş kuruluşumuzun [ISO 27001 danışmanlığı](https://www.iso27001danismanlik.com/) ekibiyle birlikte çalışırız.

### 8. Yazılım ve sistem seçimi

ERP, CRM, yedekleme, güvenlik veya sanallaştırma platformu seçerken satıcıdan bağımsız karşılaştırma yaparız. İhtiyaca özel çözüm gerekiyorsa yazılım ekibimizle [özel yazılım geliştirme](/yazilim-dijital/ozel-yazilim-gelistirme/) tarafında devreye gireriz.

### 9. Sanal IT müdürü (vCIO) ve dış kaynak IT departmanı

Tam zamanlı bir IT müdürü istihdam etmeden, düzenli toplantılar, raporlama, bütçe ve tedarikçi yönetimiyle IT'nizin yönetimini üstleniriz. Günlük destek ve izleme için [IT bakım ve destek hizmetlerimiz](/sistem-network/it-bakim-ve-destek-hizmetleri/) ile uzaktan ve yerinde destek veririz.

## Sektörlere göre IT danışmanlık

- **Üretim ve OSB:** Üretim (OT) ağının ofis ağından ayrılması, makine ve PLC erişimlerinin güvenliği, kesintisiz üretim için yedekli altyapı ve [kamera sistemleri](/sistem-network/ip-kamera-guvenlik-kamerasi-sistemleri/).
- **Lojistik ve depo:** Geniş alanlarda kararlı kablosuz ağ, el terminalleri, depo yönetim yazılımı entegrasyonu ve şubeler arası güvenli bağlantı.
- **Sağlık:** Hasta verisinin KVKK'ya uygun korunması, erişim yetkileri, şifreli yedekleme ve kesinti planı.
- **Finans ve profesyonel hizmetler:** Sıkı erişim kontrolü, loglama, sızma testi ve denetime hazır dokümantasyon.
- **Eğitim, turizm ve perakende:** 5651 uyumlu misafir interneti, çok şubeli merkezi yönetim ve yoğun kullanıcıya dayanıklı ağ.

## Tipik IT danışmanlık projeleri

- Taşınma veya yeni tesis öncesi ağ, sunucu ve güvenlik altyapısının sıfırdan projelendirilmesi
- Eskiyen sunucuların sanallaştırma veya buluta taşınması ve lisansların yeniden yapılandırılması
- Fidye yazılımı riskine karşı yedekleme, EDR ve erişim yönetiminin elden geçirilmesi
- ISO 27001 veya müşteri denetimi öncesi teknik eksik analizi ve kapatılması
- Kendi IT ekibi olmayan işletmelere aylık sözleşmeli kurumsal IT danışmanlığı ve destek

## IT danışmanlık sürecimiz

1. **Ücretsiz ön görüşme** — İşletmenizi, öncelik ve sorunlarınızı dinleriz; kapsam ve takvimi netleştiririz.
2. **Keşif ve envanter** — Altyapınızı yerinde ve uzaktan inceler, cihaz, yazılım, lisans ve erişim envanterini çıkarırız.
3. **Risk ve boşluk analizi** — Güvenlik, süreklilik, performans ve maliyet açısından mevcut durum ile hedef arasındaki farkı ortaya koyarız.
4. **Yol haritası ve teklif** — Önceliklendirilmiş, kalem kalem bütçelenmiş bir eylem planı sunar, yönetime birlikte aktarırız.
5. **Uygulama** — Kurulum, geçiş ve sıkılaştırma işlerini kendi ekibimizle, minimum kesintiyle yaparız.
6. **Sürekli iyileştirme** — Düzenli raporlama, izleme ve periyodik gözden geçirmelerle yol haritasını güncel tutarız.

## Hizmet modellerimiz

- **Proje bazlı danışmanlık:** Belirli bir ihtiyaç için (ör. altyapı yenileme, buluta geçiş, güvenlik değerlendirmesi) başı ve sonu belli çalışma
- **Aylık sözleşmeli IT danışmanlığı:** Sanal IT müdürü, düzenli gözden geçirme ve öncelikli destek içeren sürekli hizmet
- **Denetim öncesi hızlı değerlendirme:** ISO 27001, KVKK veya müşteri denetimi öncesinde teknik eksiklerin kısa sürede raporlanması

## Bu çalışmanın size somut çıktıları

- Mevcut durum raporu: envanter, ağ şeması ve sistem sağlık değerlendirmesi
- Önceliklendirilmiş risk listesi ve her risk için önerilen aksiyon
- Bütçelenmiş 12-24 aylık teknoloji yol haritası
- Yedekleme, erişim ve güvenlik politikaları için uygulanabilir öneriler
- Yönetime sunulabilir özet

## Neden BTM Bilişim? Bir IT danışmanlık firmasından fazlası

- **2010'dan bu yana sahada:** Danışmanlığını yaptığımız projeleri kendimiz kurar ve yönetiriz; öneriler teoride kalmaz.
- **Güvenlik önce:** Sızma testi ve ISO 27001 denetim deneyimi her öneriye yansır.
- **Satıcıdan bağımsız:** Tek bir markaya bağlı değiliz; ihtiyaca ve bütçeye göre alternatifleri karşılaştırırız.
- **Tek muhatap:** Danışmanlık, kurulum, güvenlik, yedekleme, lisans ve yazılım tek ekipte.
- **Kendi yazılım ürünlerimiz:** Envanter ve IT operasyonu için [Orbit](/yazilim-urunlerimiz/orbit/), güvenlik testleri için [PentForce](/yazilim-urunlerimiz/pentforce/) gibi ürünlerimizi projelerde kullanabilirsiniz.
- **Hızlı ulaşım:** Telefon veya WhatsApp ile doğrudan uzman ekibe ulaşırsınız; çağrı merkezi yoktur.

## IT danışmanlık firması seçerken nelere dikkat edilmeli?

- Danışmanlığın yanında uygulamayı da yapabiliyor mu, yoksa raporu verip çekiliyor mu?
- Belirli bir markanın bayisi olarak mı, yoksa bağımsız olarak mı öneri yapıyor?
- Siber güvenlik konusunda gerçek test ve denetim deneyimi var mı?
- Çıktılar yazılı, ölçülebilir ve önceliklendirilmiş mi?
- Arıza anında ulaşılabilir mi, yerinde müdahale edebiliyor mu?

## Hizmet bölgelerimiz

Gebze, Darıca, Çayırova, Dilovası ve Kocaeli genelinde ve İstanbul Anadolu yakasında (Tuzla, Pendik, Kartal) yerinde; Türkiye'nin her yerinde uzaktan IT danışmanlık hizmeti veriyoruz.

IT altyapınızı birlikte değerlendirelim; ilk görüşme ve keşif ücretsizdir. [Hemen teklif isteyin](/#teklif) ya da [bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "IT danışmanlık hizmeti ne işe yarar?",
        answer:
          "IT danışmanlık; altyapınızı, güvenliğinizi ve IT maliyetlerinizi bağımsız bir gözle değerlendirip iş hedeflerinize uygun, önceliklendirilmiş bir yol haritası çıkarır ve bu planın uygulanmasına eşlik eder. Sonuç olarak arızalar azalır, güvenlik riskleri kapanır ve teknoloji yatırımları plana dayanır.",
      },
      {
        question: "IT danışmanlık ücretleri neye göre belirlenir?",
        answer:
          "Ücret; kullanıcı ve cihaz sayısına, lokasyon sayısına, kapsamın genişliğine (yalnızca değerlendirme mi, uygulama da mı) ve hizmet modeline (proje bazlı veya aylık sözleşmeli) göre belirlenir. İlk görüşme ve keşif ücretsizdir; teklif kalem kalem hazırlanır.",
      },
      {
        question: "Kendi IT çalışanımız var, yine de IT danışmanlığına ihtiyacımız olur mu?",
        answer:
          "Çoğu zaman evet. IT ekipleri günlük destek yükü altında strateji, güvenlik ve projeye zaman ayıramaz. Danışmanlık ekibinizi ikame etmez; yol haritası, güvenlik uzmanlığı ve yoğun dönemlerde ek kapasite sağlayarak güçlendirir.",
      },
      {
        question: "IT danışmanlık ile IT destek hizmeti arasındaki fark nedir?",
        answer:
          "IT destek, arızaların ve kullanıcı taleplerinin günlük olarak çözülmesidir. IT danışmanlık ise neyin, neden ve hangi sırayla yapılacağına karar vermektir. BTM Bilişim'de ikisini birlikte sunuyoruz: danışmanlıkla planı çıkarır, destek ve bakımla sistemi ayakta tutarız.",
      },
      {
        question: "Yerinde mi, uzaktan mı hizmet veriyorsunuz?",
        answer:
          "Her ikisi de. Gebze, Kocaeli ve İstanbul Anadolu yakasında yerinde; Türkiye genelinde uzaktan çalışıyoruz. Keşif ve kurulum gibi işleri yerinde, izleme ve günlük desteği çoğunlukla uzaktan yürütüyoruz.",
      },
      {
        question: "KOBİ'ler de IT danışmanlık hizmeti alabilir mi?",
        answer:
          "Evet, en çok fayda gören işletmeler genellikle kendi IT ekibi olmayan KOBİ'lerdir. Hizmeti kullanıcı sayınıza ve ihtiyacınıza göre ölçeklendiriyor; küçük bir işletme için de büyük bir kurum için de önceliği risk ve bütçeye göre belirliyoruz.",
      },
      {
        question: "Acil bir IT arızasında ne yapmalıyım?",
        answer:
          "Bizi telefonla arayın ya da WhatsApp'tan yazın. Sözleşmeli müşterilerimize öncelikli müdahale ediyor, sorunu önce uzaktan, gerekirse yerinde çözüyoruz. Arızanın ardından kök nedeni inceleyip tekrarlamaması için önlem öneriyoruz.",
      },
      {
        question: "IT danışmanlık süreci ne kadar sürer?",
        answer:
          "Küçük ve orta ölçekli bir işletmede keşif, analiz ve yol haritası genellikle birkaç hafta içinde tamamlanır. Uygulama süresi yol haritasındaki işlerin kapsamına bağlıdır; aylık sözleşmeli modelde danışmanlık süreklidir.",
      },
      {
        question: "Bir IT firması hangi hizmetleri sunar?",
        answer:
          "Kapsamlı bir IT firması; IT danışmanlığı, ağ ve sunucu altyapısı, siber güvenlik ve sızma testi, bulut ve yedekleme, lisanslama, yazılım ve sürekli teknik destek hizmetlerini bir arada sunar. BTM Bilişim olarak bu hizmetlerin tamamını tek ekiple, danışmanlıktan uygulamaya kadar yürütüyoruz.",
      },
      {
        question: "Bir IT firmasıyla çalışmanın avantajları nelerdir?",
        answer:
          "Tek muhatapla çalışırsınız, arızalar ve güvenlik riskleri azalır, teknoloji yatırımları plana dayanır ve tam zamanlı bir IT ekibi istihdam etmenin maliyetine katlanmazsınız. İhtiyaç anında uzman kadroya, sözleşmeli müşterilerimiz için 7/24 teknik desteğe ulaşırsınız.",
      },
      {
        question: "IT firmasıyla uzun vadeli destek anlaşması yapılabilir mi?",
        answer:
          "Evet. Aylık sözleşmeli IT danışmanlık ve destek modelimizde düzenli bakım, uzaktan izleme, öncelikli müdahale ve periyodik gözden geçirme toplantıları yer alır. Kapsamı kullanıcı ve sistem sayınıza göre birlikte belirleriz.",
      },
      {
        question: "Belirli bir marka veya ürünü mü öneriyorsunuz?",
        answer:
          "Hayır. Önerilerimizi satıcıdan bağımsız yaparız; tüm önde gelen markalarla çalışabiliyoruz. İhtiyaç, bütçe ve mevcut altyapıya göre alternatifleri karşılaştırır, kararı gerekçeleriyle size bırakırız.",
      },
      {
        question: "Siber güvenlik ve KVKK de IT danışmanlığın kapsamında mı?",
        answer:
          "Evet. Güvenlik her değerlendirmenin parçasıdır. KVKK ve ISO 27001'in teknik kontrollerini altyapınıza uygular, gerekirse sızma testiyle doğrularız. Belgelendirme sürecinin tamamı için kardeş kuruluşumuzun ISO 27001 danışmanlığı ekibiyle birlikte çalışırız.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "logo-erp-destek-ve-danismanlik",
    slug: "logo-erp-destek-ve-danismanlik",
    title: "Logo ERP Destek ve Danışmanlık",
    metaDescription:
      "Logo ERP destek ve danışmanlık: Logo Tiger, GO ve j-Platform kurulumu, sürüm yükseltme, parametre düzenleme, entegrasyon, özel rapor ve kullanıcı eğitimi.",
    content: `Logo Tiger, GO veya j-Platform kullanıyor ama raporları hâlâ Excel'de hazırlıyorsanız, programdan aldığınız verim olması gerekenin altındadır. Logo ERP destek ve danışmanlık hizmetimiz, mevcut kurulumunuzu iş süreçlerinizle yeniden hizalar, sürümünüzü güncel tutar ve kullanıcılarınızın sistemi doğru kullanmasını sağlar. Kendi yazılım ekibimiz olduğu için entegrasyon ve özel geliştirme ihtiyaçlarını da aynı ekip karşılar.

## Sahada en sık karşılaştıklarımız

Birçok firmada Logo, ilk kurulduğu günün ayarlarıyla yıllarca çalışır. Satın alınmış ama kullanılmayan modüller, aynı bilginin iki farklı ekranda elle girilmesi, dışarı aktarılıp başka bir dosyada hesaplanan raporlar ve sürekli ertelenen sürüm geçişi yüzünden kullanılamayan yeni özellikler. Her biri zaman kaybına ve rakamların güvenilirliğinin sorgulanmasına yol açar. Sorunların çoğu yeni bir program gerektirmez; doğru parametreler, sade bir yetki yapısı ve iyi eğitilmiş kilit kullanıcılarla çözülür.

## Destek kapsamı

- Logo Tiger, GO ve j-Platform kurulumu ve sürüm yükseltmesi
- Firma, dönem, ambar ve hesap planı yapılandırması
- Malzeme, cari ve muhasebe bağlantı parametrelerinin kontrolü
- Elle yürütülen işlerin ilgili modüllere taşınması
- Özel raporlar, Logo Object ile geliştirmeler ve dış uygulama bağlantıları
- Kullanıcı yetkileri ve rol yapısının düzenlenmesi
- Kilit kullanıcı ve son kullanıcı eğitimleri
- Periyodik bakım ve öncelikli destek

## Çalışma sıramız

1. **İnceleme** — Kurulumu, sürümü, kullanılan modülleri ve dışarıda yürüyen işleri listeleriz.
2. **Öncelik listesi** — Hemen yapılabilecek düzeltmeleri ve planlama gerektiren değişiklikleri ayırırız.
3. **Uygulama** — Ayar, entegrasyon ve raporları önce test ortamında kurar, onayınızdan sonra canlıya alırız.
4. **Eğitim ve geçiş sonrası destek** — Kullanıcıları yeni düzene göre eğitir, ilk dönemde yakından takip ederiz.

## Logo verinizi raporlamaya taşımak

Bütçe ile gerçekleşeni hesap kalemi düzeyinde karşılaştırmak istiyorsanız, kendi geliştirdiğimiz [Atlas bütçe ve raporlama yazılımı](/yazilim-urunlerimiz/atlas/) Logo ile entegre çalışır. Logo'yu e-ticaret, üretim, depo ya da CRM sistemlerine bağlamak için [ERP entegrasyonları](/yazilim-dijital/erp-entegrasyonlari/) hizmetimizden yararlanabilirsiniz.

## Sonuçta ne değişir?

Tekrar eden elle girişler azalır, güncel sürümün özellikleri kullanılabilir hâle gelir, yönetim raporları tek kaynaktan ve aynı rakamlarla alınır, yetki karmaşasından doğan veri hataları düşer. Kocaeli ve İstanbul Anadolu yakasında yerinde, diğer illerde uzaktan destek veriyoruz.

Logo kurulumunuzu ücretsiz bir ön incelemeyle birlikte değerlendirelim. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Logo lisansı da satıyor musunuz?",
        answer:
          "Odağımız kurulum, danışmanlık, entegrasyon ve destektir. Lisans tarafında mevcut Logo iş ortağınızla çalışmaya devam edebilir ya da tedarik için sizi uygun kanala yönlendirebiliriz.",
      },
      {
        question: "Eski bir sürümden geçiş verilerimizi riske atar mı?",
        answer:
          "Geçişi önce test ortamında prova ederiz; veri, özel raporlar ve entegrasyonlar bu aşamada kontrol edilir. Canlı geçiş genellikle mesai dışında ve geri dönüş planıyla yapılır.",
      },
      {
        question: "Sadece eğitim hizmeti alabilir miyiz?",
        answer:
          "Evet. Kilit kullanıcı ve son kullanıcı eğitimlerini, kullandığınız modüllere göre ayrı bir hizmet olarak planlayabiliriz.",
      },
      {
        question: "Logo'ya özel rapor veya ekran geliştirebiliyor musunuz?",
        answer:
          "Evet. Yazılım ekibimiz özel raporlar, Logo Object ile geliştirmeler ve diğer uygulamalarla bağlantılar hazırlar. İhtiyacı önce birlikte tanımlar, test ortamında onayınıza sunarız.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "yazilim-ve-dijital-donusum-danismanligi",
    slug: "yazilim-ve-dijital-donusum-danismanligi",
    title: "Yazılım ve Dijital Dönüşüm Danışmanlığı",
    metaDescription:
      "Yazılım ve dijital dönüşüm danışmanlığı: süreç haritalama, satın al ya da geliştir kararı, entegrasyon mimarisi, tedarikçi seçimi ve fazlı yol haritası.",
    content: `Dijital dönüşüm projelerinin önemli bir kısmı yazılım yetersiz olduğu için değil, yanlış sırayla ilerlendiği için sonuç vermez. Yazılım ve dijital dönüşüm danışmanlığımızda önce hangi sürecin size en çok zaman ve para kaybettirdiğini bulur, sonra bunun için hazır bir ürün mü alınmalı, mevcut sistem mi uyarlanmalı yoksa yazılım mı geliştirilmeli sorusunu gerekçeleriyle cevaplarız. Satıcıdan bağımsız olduğumuz için öneri, belirli bir ürünü satma kaygısı taşımaz.

## Projeler genelde nerede yarım kalır?

Tipik senaryo şöyledir: bir yazılım satın alınır, mevcut iş akışı hiç sorgulanmadan ekrana taşınır, kullanıcılar eski alışkanlıklarına döner ve sistem yarı kullanılır hâlde kalır. Sağlıklı sıra bunun tersidir: önce süreç ve veri netleşir, araç bundan sonra seçilir, en sonda ölçülerek yaygınlaştırılır. Kullanıcıları tasarım aşamasına dahil etmek, benimsemeyi en çok artıran adımdır; bu yüzden her sürecin sahibiyle ayrı görüşür, gerçek iş akışını onların anlatımıyla kayda geçiririz.

## Danışmanlığın kapsamı

- Mevcut iş süreçlerinin haritalanması ve dijitalleşme önceliklerinin belirlenmesi
- Satın alma, uyarlama veya geliştirme seçeneklerinin karşılaştırılması
- Yazılım mimarisi ve sistemler arası entegrasyon planı
- Veri modeli ve raporlama ihtiyaçlarının tanımı
- Tedarikçi seçimi ve gelen tekliflerin teknik değerlendirmesi
- Pilot uygulama, başarı ölçütleri ve yaygınlaştırma planı
- Kullanıcıların yeni düzene geçişi için değişim yönetimi

## Nasıl ilerliyoruz?

1. **Keşif** — İş hedeflerinizi, mevcut süreçleri ve kullandığınız sistemleri yerinde inceleriz.
2. **Fırsat listesi** — Dijitalleşmeye aday süreçleri beklenen etki ve gereken emeğe göre sıralarız.
3. **Yol haritası** — Fazlara bölünmüş, her fazın sorumlusu ve ölçütü belli bir program çıkarırız.
4. **Uygulama gözetimi** — Pilotu ve yaygınlaştırmayı tedarikçiniz ya da kendi ekiplerinizle birlikte yönetiriz.

## Karar verildikten sonra

Hazır ürün ihtiyacı karşılamıyorsa, kendi yazılım ekibimizle [özel yazılım geliştirme](/yazilim-dijital/ozel-yazilim-gelistirme/) tarafına geçebiliriz. Onay, talep ve bildirim gibi tekrar eden adımlar için [iş süreci otomasyonları](/yazilim-dijital/is-sureci-otomasyonlari/), yönetimin aynı rakamlara bakması için [raporlama ve dashboard çözümleri](/yazilim-dijital/raporlama-ve-dashboard-cozumleri/) bu programın tipik parçalarıdır. Atlas, Orbit ve Otium gibi kendi ürünlerimiz de uygun olduğu yerde seçenekler arasında değerlendirilir.

## Size kazandırdıkları

Yatırımların iş etkisine göre sıralanması, alınıp kullanılmayan yazılımların önlenmesi, entegrasyonun baştan planlanması ve dönüşümün ölçülebilir hedeflerle izlenmesi.

Dijitalleştirmek istediğiniz süreçleri ücretsiz ilk görüşmede konuşalım. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Dijital dönüşüm yalnızca büyük şirketlere mi uygun?",
        answer:
          "Hayır. Ölçek küçüldükçe kapsam daralır ama yöntem aynıdır. En çok zaman kaybettiren birkaç süreci seçip dijitalleştirmek küçük ekiplerde de kısa sürede fark yaratır.",
      },
      {
        question: "Yazılımı siz mi geliştireceksiniz?",
        answer:
          "Danışmanlık aşamasında tarafsız kalırız; hazır ürün almak da geçerli bir sonuçtur. Geliştirme gerekirse yazılım ekibimizle işi baştan sona üstlenebilir ya da seçtiğiniz tedarikçiyi sizin adınıza yönetebiliriz.",
      },
      {
        question: "Çalışmanın ilk çıktısı nedir?",
        answer:
          "Süreç haritası, önceliklendirilmiş fırsat listesi ve fazlara ayrılmış bir dönüşüm yol haritası. Teslim süresi incelenecek süreç ve birim sayısına göre keşif görüşmesinde netleşir.",
      },
      {
        question: "Maliyeti neler etkiler?",
        answer:
          "İncelenecek süreç ve departman sayısı, mevcut sistemlerin çeşitliliği ve uygulama aşamasında gözetim isteyip istemediğiniz belirleyicidir. İlk görüşme ve keşif ücretsizdir, teklif bunun ardından hazırlanır.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Siber Güvenlik
  // ─────────────────────────────────────────────────────────────────────────
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "siber-guvenlik-danismanligi",
    slug: "siber-guvenlik-danismanligi",
    title: "Siber Güvenlik Danışmanlığı",
    metaDescription:
      "Siber güvenlik danışmanlığı: NIST CSF ve ISO 27001 temelli olgunluk ölçümü, risk sıralaması ve bütçeli güvenlik planı. Kocaeli ve İstanbul'da 2010'dan beri.",
    content: `Hangi güvenlik ürününü almanız gerektiğini konuşmadan önce, kurumunuzun bugün nerede durduğunu bilmeniz gerekir. Siber güvenlik danışmanlığında BTM Bilişim olarak mevcut kontrollerinizi bağımsız bir gözle ölçer, açıkları iş etkisine göre sıralar ve sınırlı bütçenin önce en tehlikeli boşluğa gitmesini sağlayan bir plan hazırlarız. ISO 27001 baş denetçi deneyimimiz, değerlendirmeyi denetçinin soracağı sorularla yapmamızı sağlar.

## Tipik başlangıç noktası

Çoğu firmada güvenlik harcaması o hafta haberlerde çıkan saldırıya göre şekillenir. Yeni bir cihaz alınır ama yedekler aynı ağda, yönetici parolaları ortak, eski bir sunucu internete açık kalır. Ölçmeden yapılan yatırım, asıl riski yerinde bırakır. Danışmanlığın ilk işi bu tabloyu kanıtlarla görünür kılmaktır.

## Değerlendirmenin kapsamı

- NIST CSF veya ISO 27001 maddelerine göre olgunluk puanlaması
- Donanım, yazılım, hesap ve bulut servislerinden oluşan varlık listesi; dışarıdan görünen saldırı yüzeyi
- Güvenlik duvarı, uç nokta koruması, e-posta güvenliği, kimlik yönetimi ve yedekleme ayarlarının incelenmesi
- Yetki dağılımı, parola ve erişim politikaları ile süreçlerin gözden geçirilmesi
- Her bulgu için olasılık ve iş etkisine dayalı risk derecesi
- Bütçe tahminli, önceliklendirilmiş güvenlik planı
- Yönetim kurulu için kısa özet, BT ekibi için teknik ek

## Çalışma adımları

1. **Görüşme ve inceleme** — BT sorumlusu ve birim yöneticileriyle konuşur, mimariyi ve ayarları yerinde ya da uzaktan inceleriz.
2. **Eşleştirme** — Bulgular seçilen çerçeveye işlenir, eksik kalan kontroller derecelendirilir.
3. **Plan** — Birkaç haftada bitecek hızlı düzeltmeler ile bütçe isteyen projeler ayrı listelenir.
4. **Ara kontrol** — Belirlenen dönemlerde ilerleme yeniden puanlanır.

## Plan sonrasında hangi hizmetler gelir?

Bulguların yönüne göre dış ve iç ağ için [sızma testi](/siber-guvenlik/sizma-testi-penetrasyon-testi/), olay görünürlüğü için [merkezi log ve SIEM](/siber-guvenlik/siem-ve-log-yonetimi/), uç noktalar için [EDR ve kurumsal antivirüs](/siber-guvenlik/edr-antivirus-cozumleri/), veri sızıntısı riski için [DLP](/siber-guvenlik/dlp-veri-kaybi-onleme-cozumleri/) gündeme gelir. Sürekli izleme isteyen kurumlar kendi geliştirdiğimiz [CyberWare](/yazilim-urunlerimiz/cyberware/) ürününü inceleyebilir. Güvenliği ağ, sunucu ve bulut yatırımlarıyla tek bir takvimde ele almak isterseniz [IT danışmanlık hizmetlerimiz](/danismanlik/it-danismanlik-hizmetleri/) bu çalışmayı kapsar.

## Elinize geçenler

Satıcıdan bağımsız hazırlanmış bir risk tablosu, gerekçesi yazılı öneriler ve müşteri ya da denetçi güvenlik anketlerine verebileceğiniz kanıtlar. Hangi adımı kiminle uygulayacağınız tamamen sizin kararınızdır.

İlk görüşme ve keşif ücretsizdir. [Güvenlik değerlendirmesi için bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Değerlendirme sonunda bize ürün mü satıyorsunuz?",
        answer:
          "Hayır. Rapor satıcıdan bağımsız hazırlanır; çoğu zaman öneri, elinizdeki aracı doğru ayarlamaktır. Yeni bir çözüm gerekiyorsa alternatifleri gerekçeleriyle sunar, seçimi size bırakırız.",
      },
      {
        question: "Küçük bir işletme için bu çalışma fazla değil mi?",
        answer:
          "Kapsam işletmenin büyüklüğüne göre daraltılır. Küçük ekiplerde çıktı genellikle az sayıda, maliyeti düşük ama riski belirgin azaltan adımdan oluşur.",
      },
      {
        question: "Değerlendirmeyi hangi sıklıkla yenilemeliyiz?",
        answer:
          "Yılda bir kez yenilemenizi öneririz. Yeni bir uygulamaya geçiş, taşınma ya da birleşme gibi büyük değişikliklerden sonra ara değerlendirme yapmak da yararlıdır.",
      },
      {
        question: "Çalışma sırasında sistemlerimiz etkilenir mi?",
        answer:
          "Değerlendirme inceleme ve görüşmeye dayanır, üretim sistemlerine müdahale içermez. Aktif test gerekiyorsa bu ayrı bir sızma testi olarak planlanır.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "sizma-testi-penetrasyon-testi",
    slug: "sizma-testi-penetrasyon-testi",
    title: "Sızma Testi (Penetrasyon Testi)",
    metaTitle: "Sızma Testi (Penetrasyon Testi) Hizmeti | BTM Bilişim",
    metaDescription:
      "Sızma testi (penetrasyon testi): dış ve iç ağ, web, mobil, API ve Wi-Fi için manuel test, CVSS puanlı, kanıtlı rapor ve net kapatma önerileri.",
    content: `Bir zafiyet listesi, saldırganın sizden ne alabileceğini söylemez. Penetrasyon testinde uzmanlarımız sistemlerinize yetkili bir saldırgan gibi yaklaşır, bulduğu küçük açıkları birbirine bağlayarak kritik veriye ya da yönetici hesabına ulaşıp ulaşamadığını dener. Sonuçta elinize "kaç açık var" değil, "hangi yoldan nereye kadar girilebiliyor" sorusunun kanıtlı cevabı geçer.

## Otomatik tarama ile manuel test arasındaki fark

Tarayıcı yazılımlar bilinen açıkları hızla listeler ama hangisinin gerçekten kullanılabildiğini ve birleşince ne doğurduğunu bilemez. Manuel testte uzman yanlış alarmları ayıklar, iş mantığındaki hataları arar ve etkiyi gösterir. Geniş ve sık kontrol için [zafiyet taraması ve güvenlik açığı analizi](/siber-guvenlik/guvenlik-acigi-ve-zafiyet-analizi/), derin doğrulama için sızma testi birbirini tamamlar.

## Test türleri ve kapsam

- **Dış ağ** — İnternetten erişilen servisler, VPN ve e-posta sunucuları
- **İç ağ** — İçeride bir cihazı ele geçirmiş saldırganın yetki yükseltme ve yayılma imkânları
- **Web uygulaması** — OWASP Top 10 maddeleri, oturum yönetimi ve iş akışı hataları
- **Mobil uygulama** — Android ve iOS istemcisi ile arkasındaki servisler
- **API** — Yetki kontrolü, kimlik doğrulama ve gereğinden fazla veri dönmesi
- **Kablosuz ağ** — Wi-Fi şifreleme, misafir ağı ayrımı ve erişim politikası
- **Kimlik avı simülasyonu** — Çalışanların sahte e-postalara tepkisinin ölçülmesi

## Kimler yaptırmalı?

ISO 27001, KVKK veya PCI DSS gereği ya da müşteri şartnamesi nedeniyle düzenli test yaptırması gereken kurumlar; müşteri portalı, e-ticaret sitesi veya API yayınlayan firmalar; yeni bir sistemi canlıya almadan önce güvence isteyen ekipler ve fidye yazılımı riskini somut olarak görmek isteyen yöneticiler.

## Testin akışı

1. **Yazılı yetki** — Hedef adresler, test saatleri ve yasak işlemler imzalı bir belgeyle belirlenir.
2. **Bilgi toplama ve doğrulama** — Otomatik araçların bulguları elle teyit edilir.
3. **İstismar** — Doğrulanan açıklar kontrollü biçimde kullanılır, mümkünse zincirlenir.
4. **Rapor** — Her bulgu CVSS puanı, ekran görüntüsü veya log kanıtı ve çözüm adımıyla yazılır.

## Yılda bir testin ötesi

Sık yayın yapan ekipler için kendi geliştirdiğimiz yapay zekâ destekli otonom test platformu [PentForce](/yazilim-urunlerimiz/pentforce/), dış yüzeyi düzenli aralıklarla kontrol eder; manuel test kritik sürümlere ayrılır. Bulguların kalıcı çözümü ve önceliklendirilmesi için [siber güvenlik danışmanlığı](/siber-guvenlik/siber-guvenlik-danismanligi/) ile ilerleyebilirsiniz.

Hedeflerinizi ve uygun test penceresini birlikte belirleyelim. [Kapsam görüşmesi için bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Penetrasyon testini ne zaman ve ne sıklıkla yaptırmalıyız?",
        answer:
          "Genel öneri yılda en az bir kez ve yeni uygulama yayını, altyapı taşıma ya da şirket birleşmesi gibi büyük değişikliklerden sonradır. Bir denetim ya da müşteri sözleşmesi sıklık belirliyorsa ona uyulur.",
      },
      {
        question: "Fiyatı hangi etkenler belirliyor?",
        answer:
          "Test edilecek IP adresi, uygulama ve API sayısı, test türleri, size verilecek bilgi düzeyi (kara veya gri kutu) ve rapor beklentisi fiyatı belirler. Kapsam görüşmesinden sonra kalemleri ayrı ayrı gösteren bir teklif hazırlarız.",
      },
      {
        question: "Test sırasında sistemlerimiz çöker mi?",
        answer:
          "Testi yazılı kurallar ve onaylanmış saat aralığında yürütürüz. Kesinti riski taşıyan adımlar mesai dışına alınır ya da test ortamında denenir.",
      },
      {
        question: "Kara kutu mu gri kutu mu seçmeliyiz?",
        answer:
          "Gri kutuda size ait bir kullanıcı hesabı veya kısmi bilgi verilir; aynı sürede daha derine inildiği için çoğu kuruma bunu öneririz. Gerçek bir dış saldırganı taklit etmek istiyorsanız kara kutu test de yapılır.",
      },
      {
        question: "Raporu kim okuyacak?",
        answer:
          "Rapor iki bölümden oluşur. Yönetim için iş riskini anlatan kısa bir özet, BT ekibi için her bulgunun nasıl tekrar üretileceğini ve nasıl kapatılacağını gösteren teknik ayrıntı bulunur.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "guvenlik-acigi-ve-zafiyet-analizi",
    slug: "guvenlik-acigi-ve-zafiyet-analizi",
    title: "Zafiyet Taraması ve Güvenlik Açığı Analizi",
    metaDescription:
      "Zafiyet taraması ve güvenlik açığı analizi: dış ve iç ağda düzenli, kimlik doğrulamalı tarama, yanlış pozitif ayıklama, CVSS sıralaması ve kapatma takibi.",
    content: `Yazılım üreticileri her ay yeni güvenlik açıkları duyurur; geçen ay temiz çıkan bir sunucu bu ay saldırıya açık olabilir. Zafiyet taraması ve güvenlik açığı analizi hizmetimiz, ağınızdaki bilinen açıkları planlı aralıklarla bulur, gerçek olanları ayıklar ve ekibinizin önce neyi yamalaması gerektiğini açıkça yazar.

## Tek tarama neden yetmez?

Bir kez yapılan tarama yalnızca o günün durumunu gösterir. Fayda, taramanın bir takvime bağlanmasından ve her bulgunun kapatılıp kapatılmadığının bir sonraki turda kontrol edilmesinden gelir. Bu döngü kurulmadığında aynı açık aylarca raporda kalır. Yeni eklenen sunucular, unutulan test makineleri ve süresi dolan sertifikalar da ancak düzenli taramayla fark edilir; bu yüzden her turda varlık listesini de güncelleriz.

## Hizmetin kapsamı

- İnternete açık adresler ve iç ağ segmentleri için periyodik tarama
- Sunuculara yetkili hesapla bağlanarak yapılan (authenticated) derin tarama
- Sunucu, ağ cihazı, kullanıcı bilgisayarı ve web uygulamalarının dahil edilmesi
- Yanlış pozitiflerin uzman tarafından elle ayıklanması
- CVSS puanı ve varlığın iş için önemine göre sıralama
- Her açık için yama veya yapılandırma önerisi
- Dönemden döneme açık sayısını gösteren eğilim raporu ve kapatma listesi

## Süreç nasıl işler?

1. **Varlık listesi** — Hangi IP aralıkları ve sistemlerin hangi sıklıkla taranacağına birlikte karar veririz.
2. **Tarama** — Dış ve iç tarafı ayrı profillerle tararız; hassas sistemler için düşük yoğunluk kullanırız.
3. **Ayıklama** — Kritik ve yüksek bulguları elle teyit ederiz.
4. **Rapor ve takip** — Sıralı listeyi paylaşırız, sonraki turda kapanan ve açık kalan maddeleri işaretleriz.

## Sızma testiyle nasıl birlikte kullanılır?

Tarama geniş bir alanı sık aralıklarla kontrol eder ve bilinen açıkları yakalar. [Sızma testi](/siber-guvenlik/sizma-testi-penetrasyon-testi/) daha dar bir hedefe odaklanır ve açıkları birleştirerek bir saldırganın gerçekte ne elde edeceğini gösterir. İkisinin oranını, bütçenize ve risk profilinize göre [siber güvenlik danışmanlığı](/siber-guvenlik/siber-guvenlik-danismanligi/) kapsamında belirleriz.

## Ne kazanırsınız?

Kritik açıkları kötüye kullanılmadan görürsünüz, yama sırası tahmine değil veriye dayanır, ISO 27001 ve müşteri denetimlerinde düzenli tarama kaydı sunabilirsiniz. Eğilim raporu, BT ekibinin emeğinin yönetime ölçülebilir biçimde yansımasını da sağlar. Kapatma işini kendi ekibinize bırakabilir ya da sistem ekibimize devredebilirsiniz.

Kaç varlığın hangi aralıkla taranacağını birlikte planlayalım. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Taramayı hangi aralıkla yapmalıyız?",
        answer:
          "Birçok kurum internete açık sistemleri ayda bir, iç ağı üç ayda bir tarayarak başlar. Önemli bir güncelleme ya da yeni sistem kurulumundan sonra ek tarama yapılır.",
      },
      {
        question: "Tarama canlı sistemleri yavaşlatır mı?",
        answer:
          "Tarama yoğunluğu ayarlanabilir. Hassas sistemleri düşük etkili profillerle veya mesai dışında tararız; bunu kapsam belirlerken sizinle netleştiririz.",
      },
      {
        question: "Açıkları kim kapatacak?",
        answer:
          "Kendi BT ekibiniz kapatabilir ya da sistem ve network ekibimiz bu işi üstlenebilir. Raporda her açık için uygulanacak yama veya ayar adımı yazılıdır.",
      },
      {
        question: "Zafiyet taraması ile sızma testinin farkı nedir?",
        answer:
          "Tarama otomatik araçlarla bilinen açıkları geniş bir alanda bulur. Sızma testinde bir uzman bu açıkları elle kullanarak ne kadar ilerleyebildiğini gösterir; ikisi birbirinin yerine geçmez.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "firewall-ve-ag-guvenligi",
    slug: "firewall-ve-ag-guvenligi",
    title: "Firewall ve Ağ Güvenliği",
    metaDescription:
      "Firewall ve ağ güvenliği: yeni nesil güvenlik duvarı kurulumu, kural temizliği, VLAN segmentasyonu, IPS, güvenli VPN ve log entegrasyonu. Marka bağımsız.",
    content: `Güvenlik duvarınız, ağınıza neyin girip çıkabileceğine karar veren tek noktadır; yıllar içinde biriken gelişigüzel kurallarla bu nokta işlevini kaybeder. Firewall ve ağ güvenliği hizmetinde yeni nesil güvenlik duvarınızı kurar ya da mevcut cihazınızı elden geçirir, kural tablosunu anlaşılır hâle getirir ve iç ağınızı bölümlere ayırırız. Satıcıdan bağımsız çalıştığımız için önde gelen markaların tümüyle uyumluyuz.

## Sahada sık gördüğümüz tablo

Kimin, neden açtığı bilinmeyen "her yerden her yere izin ver" kuralları, kapatılan projelerden kalan erişimler ve hiç bakılmayan loglar. İç ağ çoğu zaman tek parçadır; misafir telefonu, muhasebe bilgisayarı ve üretim makinesi aynı segmenttedir. Böyle bir ağda tek bir cihazın ele geçirilmesi bütün şirkete yayılmak için yeterlidir. Çözüm genellikle yeni cihaz değil, kural hijyeni ve doğru bölümlemedir.

## Hizmet kapsamı

- Yeni nesil güvenlik duvarı (NGFW) seçimi, kurulumu ve yapılandırması
- Mevcut kural tablosunun denetimi; kullanılmayan ve fazla geniş kuralların temizlenmesi
- VLAN tasarımı ile kullanıcı, sunucu, misafir ve OT/IoT ağlarının ayrılması
- Saldırı önleme (IPS), uygulama kontrolü ve web filtreleme politikaları
- Uzaktan çalışanlar ve şubeler için güvenli VPN
- Logların merkezi sisteme ve SIEM'e aktarılması
- Kritik lokasyonlarda yüksek erişilebilirlik (HA) kurgusu

## Uygulama yaklaşımımız

1. **İnceleme** — Topolojiyi, kural tablosunu ve gerçek trafik akışlarını çıkarırız.
2. **Tasarım** — Segment planını ve hedef politika setini yazılı olarak hazırlarız.
3. **Geçiş** — Değişiklikleri önceden belirlenmiş bakım penceresinde, geri alma planı hazır şekilde devreye alırız.
4. **Sürekli kontrol** — Trafiği ve olayları izler, kuralları belirli aralıklarla gözden geçiririz.

## Güvenlik duvarı tek başına yeterli mi?

Ağ sınırı korumasını uç noktalarda [EDR ve antivirüs çözümleri](/siber-guvenlik/edr-antivirus-cozumleri/), olayları tek ekranda görmek için [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/) tamamlar. Kablolama, anahtarlar ve kablosuz ağ dahil altyapının tamamı için [sistem ve network hizmetlerimize](/sistem-network/) göz atabilirsiniz.

## Sonuçta neye sahip olursunuz?

Her kuralın sahibinin ve gerekçesinin bilindiği, denetime gösterilebilir bir yapılandırma; bir cihaz ele geçirilse bile sınırlı kalan bir iç ağ; uzaktan erişimin kim tarafından, ne zaman yapıldığını gösteren kayıtlar. Kocaeli ve İstanbul Anadolu yakasında yerinde, diğer illerde uzaktan çalışıyoruz.

Mevcut güvenlik duvarınızın yapılandırmasını ücretsiz keşifle birlikte inceleyelim. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Elimizdeki güvenlik duvarını yenilemek zorunda mıyız?",
        answer:
          "Her zaman değil. Önce cihazın yazılım sürümüne, kapasitesine ve lisans durumuna bakarız. Çoğu durumda kural temizliği ve doğru yapılandırma belirgin bir iyileşme sağlar.",
      },
      {
        question: "Ağı bölümlere ayırmak işleri aksatır mı?",
        answer:
          "Segmentasyonu aşamalı uygularız. Önce kurallar yalnızca izleme modunda çalışır ve gerçek trafik gözlemlenir, ardından sıkılaştırılır; böylece beklenmedik kesinti olasılığı düşer.",
      },
      {
        question: "Hangi firewall markalarıyla çalışıyorsunuz?",
        answer:
          "Satıcıdan bağımsızız ve yaygın kurumsal NGFW markalarının tümüyle çalışabiliyoruz. Öneriyi mevcut yatırımınıza, kullanıcı sayınıza ve bütçenize göre yaparız.",
      },
      {
        question: "Sorun çıkarsa destek alabilir miyiz?",
        answer:
          "Evet. Sözleşmeli müşterilerimize 7/24 teknik destek veriyoruz; arızaya önce uzaktan, gerekirse yerinde müdahale ediyoruz.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "edr-antivirus-cozumleri",
    slug: "edr-antivirus-cozumleri",
    title: "Kurumsal Antivirüs ve EDR Çözümleri",
    metaDescription:
      "Kurumsal antivirüs ve EDR çözümleri: davranış tabanlı tehdit tespiti, fidye yazılımı koruması ve geri alma, merkezi politika yönetimi. Marka bağımsız öneri.",
    content: `Fidye yazılımı çeteleri, imza veritabanında henüz olmayan araçlar ve Windows'un kendi komutlarıyla çalışır; klasik antivirüs bu tür saldırıları çoğu zaman görmez. Kurumsal antivirüs ve EDR çözümlerimiz, bilgisayar ve sunucularınızda neler olduğunu davranış düzeyinde izler, şüpheli bir zinciri erken yakalar ve gerekirse cihazı otomatik olarak ağdan ayırır.

## Neden yalnızca antivirüs değil?

İmza tabanlı koruma, daha önce tanımlanmış zararlıları durdurur. Dosya bırakmadan bellekte çalışan saldırılar, çalınan parolalarla yapılan girişler ya da meşru yönetim araçlarının kötüye kullanımı bu modele uymaz. EDR; süreçleri, komut satırlarını ve ağ bağlantılarını birlikte değerlendirir, olayın hangi bilgisayarda nasıl başladığını geriye dönük olarak gösterir. Bir uyarı geldiğinde ekibiniz yalnızca "zararlı bulundu" bilgisini değil, öncesinde ve sonrasında çalışan süreçleri de görür; bu da müdahale süresini kısaltır.

## Bu hizmet neleri kapsar? Kapsam

- Kurumunuzun büyüklüğüne ve altyapısına uygun EDR/EPP ürününün seçimi
- Engelleme, karantina ve otomatik yanıt politikalarının yazılması
- Fidye yazılımına karşı davranış koruması ve değişen dosyaları geri alma (rollback)
- Sunucular ve kritik iş istasyonları için ek sıkılaştırma
- Uyarı önceliklendirme ve olay müdahale akışının kurulması
- SIEM ile entegrasyon ve merkezi raporlama
- Ajan dağıtımı, sürüm güncellemesi ve sağlık kontrolü

Hiçbir markanın bayisi değiliz; önde gelen antivirüs ve EDR ürünlerinin tümüyle çalışır, karşılaştırmayı ihtiyacınıza ve bütçenize göre yaparız.

## Geçiş adım adım

1. **Envanter** — Korunacak cihazları, mevcut koruma ürününü ve riskli kullanım senaryolarını listeleriz.
2. **Deneme grubu** — Seçilen ürünü sınırlı sayıda cihazda yalnızca izleme modunda çalıştırır, performansı ölçeriz.
3. **Yaygınlaştırma** — Eski ajanı kaldırıp yenisini tüm cihazlara dağıtır, politikaları kademeli sıkılaştırırız.
4. **İşletme** — Uyarıları takip eder, aylık sağlık ve tehdit özeti paylaşırız.

## Uç nokta korumasının yanında

Hassas verinin dışarı çıkışını denetlemek için [DLP çözümleri](/siber-guvenlik/dlp-veri-kaybi-onleme-cozumleri/), EDR uyarılarını diğer kaynaklarla ilişkilendirmek için [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/) kullanılır. Kendi geliştirdiğimiz [CyberWare](/yazilim-urunlerimiz/cyberware/) ise uçtan uca izleme için bir seçenektir.

## Kazanımlar

Bilinmeyen zararlılara karşı davranış tabanlı koruma, fidye yazılımı olayında hızlı tespit ve dosyaların geri alınabilmesi, tüm cihazları tek konsoldan görme ve bir olay sonrası neyin nasıl olduğunu gösteren kanıt.

Kaç cihazı, hangi ürünle korumanın mantıklı olduğunu birlikte değerlendirelim. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "EDR ajanı bilgisayarları yavaşlatır mı?",
        answer:
          "Güncel EDR ajanları az kaynak tüketir. Deneme grubunda performans etkisini ölçer, gerekirse tarama ve istisna ayarlarını buna göre düzenleriz.",
      },
      {
        question: "Mevcut antivirüsü kaldırmamız gerekiyor mu?",
        answer:
          "Çoğu durumda evet, çünkü iki gerçek zamanlı koruma ajanı birbirini engelleyebilir. Eski ürünü kaldırıp yenisini dağıtma işini planlı ve korumasız an bırakmadan yaparız.",
      },
      {
        question: "Uyarıları kim takip edecek?",
        answer:
          "Uyarı önceliklendirme ve müdahale akışını kurar, ekibinize devrederiz. Sürekli takip isterseniz yönetilen hizmet modelini birlikte tasarlarız; sözleşmeli müşterilerimize 7/24 teknik destek veriyoruz.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "dlp-veri-kaybi-onleme-cozumleri",
    slug: "dlp-veri-kaybi-onleme-cozumleri",
    title: "DLP – Veri Kaybı Önleme Çözümleri",
    metaDescription:
      "DLP veri kaybı önleme: e-posta, USB, bulut ve web kanallarından hassas veri sızıntısını izleyen ve engelleyen politikalar, veri sınıflandırma ve raporlama.",
    content: `Müşteri listesinin kişisel bir bulut hesabına yüklenmesi, teklif dosyasının yanlış alıcıya gitmesi ya da ayrılan bir çalışanın USB belleğe aldığı sözleşmeler: veri kayıplarının önemli bir kısmı dışarıdan değil, içeriden ve çoğu zaman dikkatsizlikten doğar. DLP (Data Loss Prevention) çözümlerimiz, hassas verinin hangi kanaldan çıkmaya çalıştığını görür, kullanıcıyı uyarır ve gerektiğinde aktarımı durdurur.

## Hangi veriyi korumalısınız?

Kişisel veriler (TCKN, iletişim bilgisi), kart ve IBAN gibi finansal bilgiler, sözleşmeler, fiyat listeleri, teknik çizimler ve kaynak kod. İlk adım, bu verinin nerede tutulduğunu ve kimlerin elinde dolaştığını bilmektir. Ne olduğu bilinmeyen veri korunamaz. Keşif aşamasında genellikle beklenmedik yerler çıkar: paylaşılan klasörlerde unutulmuş personel dosyaları, e-posta eklerinde dolaşan müşteri listeleri, kişisel cihazlara senkronize edilen belgeler.

## Çözüm kapsamı

- Veri sınıflandırma şeması ve etiketleme kuralları
- E-posta, web yükleme, bulut depolama ve USB/uç nokta için kanal politikaları
- KVKK kişisel verisi, kart numarası, IBAN, TCKN gibi hazır şablonlar ve kuruma özel desenler
- Olay akışı: kullanıcıyı bilgilendirme, yönetici onayına gönderme veya engelleme
- İş gerekçesi girilerek istisna talep edilmesi
- Denetim ve uyum raporları
- Kullanıcıya anlık farkındalık bildirimleri

Belirli bir markaya bağlı değiliz; önde gelen DLP ürünlerinin tümüyle çalışabildiğimiz için seçimi mevcut altyapınıza ve bütçenize göre yaparız.

## Devreye alma

1. **Keşif** — Hassas verinin bulunduğu klasörleri, uygulamaları ve olağan akışları tespit ederiz.
2. **İzleme modu** — Politikaları önce yalnızca kayıt tutacak şekilde açar, gerçek kullanımı görürüz.
3. **İnce ayar** — Yanlış alarmları azaltır, kritik kuralları engelleme moduna alırız.
4. **İşletme** — Olayları inceler, istisnaları ve kuralları belirli aralıklarla güncelleriz.

## DLP ile birlikte düşünülmesi gerekenler

Personel aktivitesi takibiyle veri koruma aynı panelde olsun istiyorsanız kendi ürünümüz [CyberQuan](/yazilim-urunlerimiz/cyberquan/) uygun bir seçenektir. KVKK'nın teknik tedbir yükümlülüklerini ve veri envanterini birlikte ele almak için [KVKK danışmanlığı](/danismanlik/kvkk-danismanligi/) ile paralel ilerlemenizi öneririz.

## Ne elde edersiniz?

Hassas verinin hangi kanaldan, kim tarafından, nereye gönderildiğini gösteren kayıt; kazayla yapılan paylaşımların daha gerçekleşmeden durdurulması ve KVKK ile müşteri sözleşmelerindeki veri koruma maddeleri için sunabileceğiniz kanıt. Kurallar sizin iş akışınıza göre yazıldığı için çalışanlar meşru işlerini yapmaya devam eder.

Verinizin en çok hangi kanaldan risk altında olduğunu birlikte çıkaralım. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "DLP çalışanların işini zorlaştırır mı?",
        answer:
          "Doğru ayarlanmış bir DLP günlük işte fark edilmez; yalnızca tanımlı hassas veri, tanımlı bir kanaldan çıkarken devreye girer. İzleme moduyla başlayıp kuralları aşamalı sıkılaştırdığımız için kullanıcılar ani bir engelle karşılaşmaz.",
      },
      {
        question: "Microsoft 365 gibi bulut servislerini de kapsar mı?",
        answer:
          "Evet. Microsoft 365, tarayıcı üzerinden yüklemeler ve dosya senkronizasyon istemcileri kapsama alınabilir. Hangi servislerin dahil olacağını kullandığınız uygulamalara göre belirleriz.",
      },
      {
        question: "Önce veri sınıflandırması yapmak zorunlu mu?",
        answer:
          "Zorunlu değil ama isabeti artırır. Hazır şablonlarla hızlı bir başlangıç yapıp, sınıflandırma ve etiketlemeyi zamanla ekleyerek yanlış alarmları azaltmak sık tercih edilen yoldur.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "siem-ve-log-yonetimi",
    slug: "siem-ve-log-yonetimi",
    title: "SIEM ve 5651 Log Yönetimi",
    metaDescription:
      "SIEM ve 5651 log yönetimi: yasal log saklama ve zaman damgası, merkezi toplama, korelasyon kuralları, anlamlı alarmlar ve ISO 27001, KVKK uyum raporları.",
    content: `Bir saldırgan çoğu zaman ağınızda günlerce dolaşır; izleri güvenlik duvarında, kimlik sunucusunda ve kullanıcı bilgisayarında ayrı ayrı durur ama kimse bunları yan yana koymaz. SIEM ve log yönetimi hizmetimiz bu kayıtları tek bir platformda toplar, birbiriyle ilişkilendirir ve yalnızca gerçekten bakılması gereken olaylar için alarm üretir. 5651 sayılı Kanun'un log saklama yükümlülüğünü de aynı çalışmada karşılarız.

## Dağınık loglar neden yetersiz?

Her sistem kendi kaydını tutar; bir olay sonrasında beş ayrı konsolda saat eşleştirmeye çalışmak hem uzun sürer hem de parçaları kaçırır. SIEM bu zinciri tek ekranda gösterir: örneğin art arda başarısız girişlerin ardından aynı hesabın gece saatinde bir dosya sunucusuna bağlanması. Bir olay yaşandığında da "ne oldu, ne zaman başladı, hangi sistemlere dokunuldu" sorularını saatler yerine dakikalar içinde cevaplayabilirsiniz.

## Kapsam

- 5651 uyumlu internet erişim kayıtlarının saklanması ve zaman damgasıyla imzalanması
- Sunucu, ağ cihazı, güvenlik ürünü, kimlik sistemi ve uygulama loglarının bağlanması
- Toplama, normalize etme ve saklama süresi politikası
- Kuruma özel korelasyon kuralları ve önem derecesine göre alarm seti
- Kaba kuvvet denemesi, yetki yükseltme, olağandışı veri çıkışı, imkânsız seyahat gibi senaryolar
- Yönetim panoları ve dönemsel güvenlik raporları
- ISO 27001, KVKK ve denetim izi raporları
- Alarm bakımı ve yanlış pozitiflerin azaltılması

## Kurulumdan işletmeye

1. **Planlama** — Hangi kaynağın, hangi amaçla ve ne kadar süre saklanacağını belirleriz.
2. **Bağlantı** — Kaynakları entegre eder, farklı log formatlarını ortak yapıya çeviririz.
3. **Kural yazımı** — Altyapınıza uygun senaryoları ve eşikleri tanımlarız.
4. **İzleme ve iyileştirme** — Alarmları takip eder, gürültü yapan kuralları düzenleriz.

## Hangi kaynaklar en değerli?

Uç noktalardaki süreç ve komut verisi için [EDR çözümleri](/siber-guvenlik/edr-antivirus-cozumleri/), ağ sınırındaki trafik için [firewall ve ağ güvenliği](/siber-guvenlik/firewall-ve-ag-guvenligi/) SIEM'i en çok besleyen iki kaynaktır. Hazır olay panosu arayan kurumlar kendi geliştirdiğimiz [CyberWare](/yazilim-urunlerimiz/cyberware/) ürününü inceleyebilir.

## Getirileri

Olayları erken aşamada görmek, adli inceleme gerektiğinde eksiksiz ve merkezi bir kayda sahip olmak, denetçiye hazır rapor sunmak ve ekibinizin yüzlerce gereksiz uyarı yerine az sayıda anlamlı alarma odaklanması. 5651 kayıtları da ayrı bir cihaza gerek kalmadan aynı yapı içinde tutulur.

Hangi sistemlerin loglanması gerektiğini birlikte belirleyelim. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "SIEM bizi alarm yağmuruna boğar mı?",
        answer:
          "Kötü ayarlanmış bir SIEM bunu yapar. Az sayıda, isabeti yüksek senaryoyla başlar ve yanlış pozitifleri düzenli olarak ayıklayarak alarm kalitesini koruruz.",
      },
      {
        question: "Logları ne kadar süre saklamamız gerekiyor?",
        answer:
          "5651 gibi mevzuat bazı kayıtlar için asgari süre belirler; geri kalanı iş ihtiyacınıza bağlıdır. Sık sorgulanan veriyi kısa süre hızlı depoda, denetim için gerekenleri daha uzun süre arşivde tutan bir politika hazırlarız.",
      },
      {
        question: "Bulut ve şirket içi sistemler aynı yerde toplanabilir mi?",
        answer:
          "Evet. Microsoft 365, Azure, AWS ve şirket içi sunucular tek bir SIEM'e bağlanabilir. Korelasyon kurallarını her iki ortamı birlikte kapsayacak şekilde yazarız.",
      },
      {
        question: "5651 kapsamında yükümlü müyüz?",
        answer:
          "Çalışanlarına veya misafirlerine internet erişimi sağlayan birçok kurum bu kapsamdadır. Keşif görüşmesinde durumunuzu birlikte değerlendirir, gerekli kayıt ve imzalama düzenini kurarız.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "iso-27001-teknik-guvenlik-cozumleri",
    slug: "iso-27001-teknik-guvenlik-cozumleri",
    title: "ISO 27001 Teknik Güvenlik Çözümleri",
    metaDescription:
      "ISO 27001 teknik güvenlik çözümleri: Ek A kontrollerinin sistemlerde uygulanması; erişim yönetimi, MFA, loglama, şifreleme, yedekleme ve kanıt üretimi.",
    content: `Politika belgeleri hazırdır, Uygulanabilirlik Bildirgesi imzalanmıştır; ama denetçi bir yönetici hesabının son erişim gözden geçirmesini ya da yedekten geri dönüş testinin raporunu istediğinde cevap yoktur. ISO 27001 teknik güvenlik çözümlerimiz, standardın Ek A'sındaki teknik kontrolleri sistemlerinizde fiilen kurar ve her biri için denetime gösterilebilir kayıt bırakır. Yönetim sistemi tasarımı danışmanlığın işidir; bu hizmet o tasarımın sahadaki karşılığıdır. ISO 27001 baş denetçi deneyimimiz, kontrolü denetçinin bakacağı yerden kurmamızı sağlar.

## Teknik kontrollerin kapsamı

- Rol bazlı yetkilendirme, kimlik ve erişim yönetimi, çok faktörlü doğrulama (MFA)
- Yönetici hesaplarının ayrılması ve dönemsel erişim gözden geçirme süreci
- Merkezi loglama ve izleme; ayrıntısı için [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/)
- Disk ve veri aktarımı şifreleme, anahtar yönetimi
- Yedekleme kurgusu ve belgelenmiş geri yükleme testleri
- Sunucu, uç nokta ve ağ cihazları için sıkılaştırma standartları
- Tarama, önceliklendirme ve kapatmadan oluşan zafiyet yönetimi döngüsü
- Her kontrol için kayıt ve kanıt dosyası

## Uygulama sırası

1. **Bildirge eşlemesi** — SoA'daki teknik kontrolleri tek tek listeleriz.
2. **Eksik tespiti** — Her kontrol için bugünkü durumu ve eksik kalan kısmı yazarız.
3. **Kurulum** — Kontrolleri yapılandırır, düzenli kayıt üretecek şekilde işletmeye alırız.
4. **Denetime hazırlık** — İç denetim bulgularını kapatır, belgelendirme denetiminde teknik sorulara sizinle birlikte cevap veririz.

## Kâğıttaki kontrol ile çalışan kontrol

"Erişimler yılda bir gözden geçirilir" cümlesi politikada yazıyorsa, denetçi bu gözden geçirmenin tarihli kaydını görmek ister. Bizim hedefimiz her teknik maddenin böyle somut bir çıktısı olmasıdır: erişim listesi onayı, geri yükleme test raporu, log örneği, sıkılaştırma kontrol listesi.

## Birlikte yürütülen hizmetler

BGYS kapsamı, risk analizi ve dokümantasyon için [ISO 27001 bilgi güvenliği danışmanlığı](/danismanlik/iso-27001-bilgi-guvenligi-danismanligi/), kişisel veriye ilişkin teknik tedbirler için [KVKK danışmanlığı](/danismanlik/kvkk-danismanligi/) aynı takvimde ilerleyebilir. Kurulan kontrolleri teslim öncesinde [sızma testi](/siber-guvenlik/sizma-testi-penetrasyon-testi/) ile sınayabiliriz.

## Kazanımlarınız

Ek A maddelerinin yalnızca yazılı değil işler durumda olması, denetimde savunulabilir teknik kayıtlar, KVKK teknik tedbirleriyle örtüşen tek bir kontrol seti ve belge alındıktan sonra da kendi kendine işleyen bir düzen. Gözetim denetimlerinde aynı kanıtları her yıl yeniden üretmek için ayrı bir proje başlatmanız gerekmez.

Teknik kontrollerdeki eksiklerinizi ücretsiz keşifle birlikte çıkaralım. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Yalnızca teknik uygulama hizmeti alabilir miyiz?",
        answer:
          "Evet. Elinizde kapsamı belirlenmiş bir BGYS ve SoA varsa doğrudan teknik kurulumla başlarız. SoA henüz yoksa önce kapsamın ve kontrol seçiminin netleşmesi gerekir.",
      },
      {
        question: "Mevcut araçlarımızı kullanabilir miyiz?",
        answer:
          "Çoğu zaman büyük kısmını kullanabilirsiniz. Eksik tespitinde güvenlik duvarı, yedekleme, kimlik ve log altyapınızı değerlendirir, yalnızca karşılanmayan kontroller için ekleme öneririz.",
      },
      {
        question: "Denetçi teknik tarafta neler ister?",
        answer:
          "Kontrolün yazılı olmasının yanında çalıştığını gösteren kayıt ister. Erişim gözden geçirme tutanağı, yedek geri yükleme test raporu, log örnekleri ve sıkılaştırma kontrol listeleri tipik örneklerdir.",
      },
      {
        question: "Bu çalışma ne kadar sürer?",
        answer:
          "Süre, kapsamdaki sistem sayısına ve mevcut kontrollerin olgunluğuna bağlıdır. Eksik tespitinden sonra kontrol bazında bir iş planı ve takvim çıkarırız.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Sistem & Network
  // ─────────────────────────────────────────────────────────────────────────
  {
    categorySlug: "sistem-network",
    serviceKey: "sistem-ve-network-danismanligi",
    slug: "sistem-ve-network-danismanligi",
    title: "Sistem ve Network Danışmanlığı",
    metaDescription:
      "Sistem ve network danışmanlığı: sunucu ve ağ envanteri, darboğaz analizi, bulut ya da yerinde mimari kararı ve bütçeli, fazlara bölünmüş yol haritası.",
    content: `Altyapınız yıllar içinde parça parça büyüdüyse, hangi sunucunun neyi çalıştırdığını, hangi switch'in kritik olduğunu ve bir arızanın kaç kişiyi etkileyeceğini çoğu zaman kimse tam bilemez. Sistem ve network danışmanlığında bu tabloyu netleştiriyor, ardından şirketinizin büyüme planına uyan bir hedef mimari ve uygulanabilir bir yatırım sırası öneriyoruz. 2010'dan beri Gebze merkezli çalışan ekibimiz Kocaeli ve İstanbul Anadolu yakasında sahaya gelir, diğer illerde uzaktan çalışır.

## Danışmanlığa ihtiyaç duyduğunuzu gösteren belirtiler

Her ay tekrar eden kesintiler, sabahları yavaş açılan ERP ekranları, sürekli dolan diskler ve lisans sınırına dayanan sunucular ilk işaretlerdir. Ağ şemasının olmaması ya da altyapıyı kuran kişinin işten ayrılmış olması da riski büyütür. Bu durumda yeni donanım almadan önce bağımsız bir gözle bakmak, paranın doğru yere harcanmasını sağlar.

## Değerlendirme kapsamı

- Sunucu, ağ cihazı ve uygulama bağımlılıklarının çıkarıldığı güncel envanter
- İşlemci, bellek, disk ve hat kullanımına dayalı kapasite ölçümü
- Tek noktadan arıza riski taşıyan bileşenlerin ve yedeklilik açıklarının tespiti
- Şirket içi, bulut veya hibrit seçenekleri için gerekçeli karşılaştırma
- Sanallaştırma ile sunucu sayısını azaltma imkânlarının incelenmesi
- Ağ ve sistem güvenliğinin, ISO 27001 baş denetçi deneyimiyle gözden geçirilmesi
- İsimlendirme, belgeleme ve değişiklik yönetimi için kurallar
- Maliyet tahminiyle önceliklendirilmiş, aşamalı uygulama planı

## Çalışmanın akışı

İlk görüşme ve ön keşif ücretsizdir. Sonrasında altyapınızı tarar, IT sorumlunuz ve kilit kullanıcılarla konuşur, mevcut dokümanları okuruz. Bulguları darboğazlar ve riskler başlığında toplar, hedef mimariyi ve oraya hangi adımlarla gidileceğini bir rapor halinde sunarız. İsterseniz geçiş projelerini de biz yürütürüz; isterseniz plan kendi ekibinize ya da başka bir tedarikçiye devredilir. Önerilerimiz satıcıdan bağımsızdır, belirli bir markaya yönlendirme yapmayız.

## Rapordan uygulamaya geçiş

Plan netleştiğinde işler genellikle [kurumsal ağ kurulumu](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/), [sunucuların yenilenmesi ve yönetimi](/sistem-network/sunucu-kurulum-ve-yonetimi/), [sanallaştırma projeleri](/sistem-network/sanallastirma-cozumleri/) ya da [bulut geçişi](/bulut-yedekleme/bulut-cozumleri/) olarak ayrı projelere bölünür. Envanterin sonraki yıllarda da güncel kalması için kendi geliştirdiğimiz IT operasyon platformu [Orbit](/yazilim-urunlerimiz/orbit/) kullanılabilir. Altyapı kararlarının güvenlik ve bütçe planlamasıyla birlikte ele alınması gerekiyorsa çalışmayı daha geniş [IT danışmanlığı](/danismanlik/it-danismanlik-hizmetleri/) kapsamına taşırız.

## Sonunda elinizde ne olur?

Hangi bileşenin ne zaman yenileneceğini gösteren bir takvim, kritik risklerin listesi, belgelenmiş bir altyapı ve yönetim kuruluna sunulabilecek gerekçeli bir bütçe. Böylece acil durumda yapılan pahalı alımlar yerini planlı yatırımlara bırakır.

Mevcut altyapınızı birlikte inceleyelim. [Ücretsiz keşif için bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Bu çalışma iş akışımızı aksatır mı?",
        answer:
          "Hayır. Tarama ve ölçümler çalışan sistemlere müdahale etmeden yapılır; görüşmeler ekibinizin uygun olduğu saatlere planlanır. Kesinti gerektiren bir test varsa önceden sizinle konuşulur.",
      },
      {
        question: "Değerlendirme süresi neye bağlı?",
        answer:
          "Lokasyon sayısı, sunucu ve ağ cihazı adedi ile mevcut belgelerin durumu süreyi belirler. Keşif görüşmesinden sonra size net bir takvim veririz.",
      },
      {
        question: "Önerdiğiniz ürünleri sizden almak zorunda mıyız?",
        answer:
          "Hayır. Satıcıdan bağımsız çalışırız; rapordaki seçenekler mevcut yatırımınız, ekibinizin bilgi birikimi ve bütçenize göre karşılaştırılır. Uygulamayı kimin yapacağına siz karar verirsiniz.",
      },
      {
        question: "Bulut ile şirket içi arasında nasıl seçim yapıyorsunuz?",
        answer:
          "Verinin hassasiyetine, uygulamaların gecikmeye duyarlılığına, maliyetin zaman içindeki seyrine ve büyüme beklentinize bakarız. Pek çok kurumda sonuç, kritik verinin içeride kaldığı karma bir yapı olur.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "ag-altyapisi-kurulum-ve-yonetimi",
    slug: "ag-altyapisi-kurulum-ve-yonetimi",
    title: "Network (Ağ) Altyapısı Kurulumu ve Yönetimi",
    metaTitle: "Network Kurulumu ve Ağ Altyapısı | BTM Bilişim",
    metaDescription:
      "Ağ altyapısı kurulum ve yönetimi: LAN/WAN tasarımı, switch ve router yapılandırması, VLAN ayrımı, şube bağlantıları, izleme ve değişiklik yönetimi.",
    content: `Kurumsal ağ, her şeyin üzerinde koştuğu zemindir; zayıf olduğunda ERP, telefon, kamera ve bulut uygulamaları aynı anda etkilenir. Ağ altyapısı kurulum ve yönetimi hizmetinde yeni bir ağı sıfırdan tasarlıyor ya da yıllar içinde karmaşıklaşmış mevcut ağınızı düzenli, ölçülebilir ve kolay yönetilen bir yapıya dönüştürüyoruz.

## Ağ sorunları nereden kaynaklanır?

Sahada en sık gördüğümüz tablo, tüm cihazların tek bir düz ağda çalıştığı, hangi portun nereye gittiğinin bilinmediği ve yapılandırma yedeğinin alınmadığı ağlardır. Böyle bir ağda bir döngü ya da arızalı bir cihaz bütün ofisi durdurabilir, saldırgan da içeri girdiğinde her şeye ulaşır. Doğru tasarım; segmentlere ayrılmış, belgelenmiş ve sürekli izlenen bir ağ demektir. Ofis büyüdükçe eklenen ucuz, yönetilemeyen switch'ler, yanlış bağlanmış bir kablonun yarattığı döngüler ve kapasitesi dolmuş tek bir internet hattı da yavaşlığın tipik sebepleri arasındadır. Bunları ölçmeden yeni cihaz almak, sorunu çoğu zaman sadece başka bir yere taşır.

## Kurulum ve yönetim kapsamı

- LAN ve WAN mimarisinin tasarlanması veya yeniden düzenlenmesi
- Switch, router ve kablosuz denetleyicilerin kurulup yapılandırılması
- VLAN ile bölümlendirme, QoS ve ses/görüntü trafiğine öncelik
- Şubeler arası VPN veya SD-WAN bağlantıları
- IP adres planı, DHCP ve DNS düzeni
- Sürekli izleme, alarm ve kapasite raporları
- Yapılandırma yedekleri ve kayıt altına alınan değişiklikler
- Yapısal kablolama ve saha işlerinin koordinasyonu

## Projeyi nasıl yürütüyoruz?

Önce lokasyonlarınızı, kullanıcı sayınızı ve önümüzdeki dönemdeki büyüme beklentinizi dinleriz; buna göre bir mimari çizilir. Cihazlar yapılandırılırken bölümlendirme ve erişim politikaları da uygulanır. Canlı ortama geçiş, mesai dışındaki bakım penceresinde ve her adım için bir geri alma planıyla yapılır. Kurulumdan sonra ağı izlemeye devam eder, yapılandırmaları düzenli yedekler ve belirli aralıklarla durum raporu paylaşırız. 7/24 teknik destek hattımız arıza anında ulaşılabilir durumdadır.

## Birlikte planlanan diğer katmanlar

İnternet çıkışının ve şube bağlantılarının korunması için [güvenlik duvarı ve VPN çözümleri](/sistem-network/firewall-ve-vpn-cozumleri/), kablosuz kullanıcılar için [kurumsal Wi-Fi çözümleri](/sistem-network/wifi-ve-kablosuz-ag-cozumleri/) aynı tasarımın parçası olarak ele alınır. Misafirlerin internet erişimini kayıt altına almak için kendi ürünümüz [CyberHost](/yazilim-urunlerimiz/cyberhost/) kullanılabilir. Güvenlik kameraları için ayrı segment ve PoE gücü gerekiyorsa [IP kamera sistemleri](/sistem-network/ip-kamera-guvenlik-kamerasi-sistemleri/) projesiyle birlikte kurgularız.

## Teslimde size bıraktıklarımız

Güncel ağ şeması, IP planı, port ve cihaz listesi, yedeklenmiş yapılandırmalar ve izleme panelinin erişimi. Böylece ağınız tek bir kişiye bağımlı kalmaz; sorunlar da çoğu zaman kullanıcılar fark etmeden alarmla görülür. Markadan bağımsız çalıştığımız için mevcut cihaz yatırımınızı mümkün olduğunca koruruz.

Ağınızı birlikte planlayalım. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Elimizdeki switch ve router'lar yeni tasarımda kullanılabilir mi?",
        answer:
          "Çoğu durumda evet. Cihazların yaşı, port kapasitesi ve üreticinin güncelleme desteği incelenir; yeterli olanlar yeniden yapılandırılarak tasarıma dahil edilir.",
      },
      {
        question: "Farklı şehirlerdeki şubelerimizi tek ağda toplayabilir misiniz?",
        answer:
          "Evet. Lokasyonları site-to-site VPN ya da SD-WAN ile merkeze bağlar, erişim ve trafik kurallarını tek noktadan yönetiriz. Yerinde iş gereken şubeler için uzaktan yönlendirmeli kurulum planlanır.",
      },
      {
        question: "Geçiş günü çalışanlarımız internetsiz kalır mı?",
        answer:
          "Kritik değişiklikleri mesai dışına alır ve her adımın geri alma yolunu önceden hazırlarız. Mümkün olan yerlerde geçiş bölüm bölüm yapılır, böylece etki sınırlı kalır.",
      },
      {
        question: "Kurulumdan sonra ağı kim yönetecek?",
        answer:
          "Tercih sizin. Yönetimi sürekli hizmet olarak üstlenebilir ya da belgeleri ve yetkileri kendi IT ekibinize devredip yalnızca gerektiğinde destek verebiliriz.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "sunucu-kurulum-ve-yonetimi",
    slug: "sunucu-kurulum-ve-yonetimi",
    title: "Sunucu Kurulumu ve Yönetimi",
    metaDescription:
      "Sunucu kurulum ve yönetimi: Windows Server ve Linux kurulumu, Active Directory, güvenlik sıkılaştırması, yama takvimi, izleme ve test edilen yedekler.",
    content: `Sunucular dosyalarınızı, ERP veritabanınızı ve kullanıcı hesaplarınızı taşır; biri durduğunda işin bir bölümü de durur. Sunucu kurulum ve yönetimi hizmetinde fiziksel ve sanal sunucularınızı ortak bir standarda göre kuruyor, güvenlik ayarlarını sıkılaştırıyor ve günlük işletimini üstleniyoruz. Windows Server ve Linux ortamlarında aynı disiplinle çalışırız.

## Sık karşılaştığımız tablo

Her biri farklı zamanda, farklı kişi tarafından kurulmuş sunucular; aylarca ertelenmiş güncellemeler; kimsenin izlemediği diskler ve servisler; bir sunucu kapanınca hangi uygulamanın etkileneceğini bilmeyen bir ekip. Bu durum hem saldırılara açık kapı bırakır hem de beklenmedik kesintilere yol açar. Garantisi bitmiş disklerin RAID uyarı verdiğini kimsenin görmemesi, Active Directory'de yıllar önce ayrılmış çalışanların hesaplarının hâlâ açık durması ve yönetici parolasının herkesçe bilinmesi de denetimlerde sık rastladığımız bulgulardır.

## Kimlere uygun?

- Yeni sunucu almayı ya da eskiyen sunucusunu yenilemeyi düşünen işletmeler
- ERP, veritabanı ve dosya paylaşımını kendi binasında çalıştıran kurumlar
- Fiziksel sunucularını sanal ortama taşımak isteyen firmalar
- Sunucu odası, yedekleme ve UPS düzenini toparlamak isteyen IT ekipleri

## Hizmet kapsamı

- Fiziksel sunucu ve hipervizör kurulumu
- Windows Server ile RHEL, Ubuntu ve Debian kurulumu, güvenlik sıkılaştırması
- Active Directory, DNS, DHCP, dosya ve yazıcı servisleri
- Yetki rollerinin ve yönetici hesaplarının düzenlenmesi
- Planlı yama takvimi ve kayıt altına alınan değişiklikler
- Disk, servis ve performans izleme, alarm
- Yedekleme yazılımıyla entegrasyon ve periyodik geri yükleme denemesi
- Tekrar kullanılabilir kurulum şablonları ve belgeler

## Çalışma yöntemimiz

İşe mevcut sunucuları, üzerlerindeki rolleri ve birbirleriyle bağımlılıklarını listeleyerek başlarız. Ardından kurumunuza özel bir kurulum ve güvenlik standardı yazılır; ISO 27001 baş denetçi deneyimimiz bu standardın denetime hazır olmasına yardımcı olur. Yeni sunucular şablondan kurulur, eskiler adım adım bu standarda çekilir. İşletme döneminde yamalar takvime göre uygulanır, alarmlar 7/24 takip edilir ve yedeklerin gerçekten geri dönüp dönmediği düzenli olarak denenir.

## Yanında düşünülmesi gerekenler

Donanım sayısını azaltmak ve esneklik kazanmak için [sanallaştırma çözümleri](/sistem-network/sanallastirma-cozumleri/) değerlendirilir. Sunuculardaki verinin korunması için [veri yedekleme](/bulut-yedekleme/veri-yedekleme-cozumleri/), büyük bir arızada işin ne kadar sürede ayağa kalkacağı için de [felaket kurtarma planı](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) aynı projede ele alınır.

## Elde ettiğiniz sonuç

Belgelenmiş, birbirinin aynı kurulmuş sunucular; güncel yamalarla daralan saldırı yüzeyi; disk dolmadan gelen uyarılar ve denenmiş, güvenilir yedekler.

Sunucu ortamınızı birlikte gözden geçirelim. [İletişime geçin](/iletisim/).`,
    faq: [
      {
        question: "Sunucu yönetimini tamamen size devredebilir miyiz?",
        answer:
          "Evet. Tüm işletimi yönetilen hizmet olarak üstlenebiliriz. İç IT ekibiniz varsa yalnızca yama, izleme veya arıza desteği gibi belirli alanlarda da çalışabiliriz.",
      },
      {
        question: "Hem Windows hem Linux sunucularımız var, sorun olur mu?",
        answer:
          "Olmaz. Karma ortamlar çok yaygındır; iki tarafta da kurulum, sıkılaştırma, güncelleme ve izleme hizmeti veriyoruz.",
      },
      {
        question: "Eski sunucudan yenisine geçişte veri kaybı riski var mı?",
        answer:
          "Taşımalar önce test ortamında prova edilir, geçiş öncesinde yedek alınır ve eski sunucu bir süre kapatılmadan bekletilir. Bir sorun çıkarsa geri dönüş planı hazırdır.",
      },
      {
        question: "Güncellemeler mesai saatinde mi yapılıyor?",
        answer:
          "Yeniden başlatma gerektiren güncellemeler sizinle belirlenen bakım pencerelerinde uygulanır. Kritik bir güvenlik açığı çıktığında acil uygulama için önce sizinle iletişime geçeriz.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "veri-merkezi-cozumleri",
    slug: "veri-merkezi-cozumleri",
    title: "Veri Merkezi Çözümleri",
    metaDescription:
      "Veri merkezi çözümleri: sunucu odası tasarımı, kabinet yerleşimi, UPS ve soğutma planı, yapısal kablolama, çevre izleme ve colocation taşıma projeleri.",
    content: `Sunucu odası çoğu işletmede zamanla büyüyen bir depoya dönüşür: kablolar birbirine karışır, klima tek başına yük taşır, UPS'in hangi cihazı beslediği bilinmez. Veri merkezi çözümlerimizde kendi binanızdaki sunucu odasını ya da bir veri merkezinde kiraladığınız alanı baştan planlıyor, kuruyor veya yeni bir yere taşıyoruz.

## Plansız sunucu odasının riskleri

Tek bir enerji hattına bağlı kabinetler, yetersiz ya da yedeksiz soğutma, etiketsiz kablolar ve kapısı herkese açık bir oda; bunların her biri bir gün kesintiye dönüşebilir. Isınan bir oda donanım ömrünü kısaltır, karışık kablolama da arıza anında müdahaleyi uzatır. Tasarım aşamasında alınan önlemler bu riskleri kurulumdan önce ortadan kaldırır. Örneğin UPS'in gerçekte kaç dakika dayandığı, klima arızalandığında odanın ne kadar sürede kritik sıcaklığa çıktığı ve jeneratör devreye girene kadar hangi cihazların ayakta kalacağı, bir kesinti yaşanmadan önce bilinmelidir. Bu hesapları projenin başında yapar, sonuçları sizinle paylaşırız.

## Proje kapsamı

- Alanın ve kabinetlerin kapasiteye göre yerleşim planı
- Güç dağıtımı (PDU), topraklama ve hat ayrımı
- UPS ve jeneratör senaryolarıyla enerji yedekliliği
- Klima kapasitesi ve sıcak/soğuk koridor düzeni
- Etiketlemesi standart hale getirilmiş yapısal kablolama
- Kartlı giriş, [kamera ile izleme](/sistem-network/ip-kamera-guvenlik-kamerasi-sistemleri/) ve sıcaklık, nem, su kaçağı sensörleri
- Colocation alternatiflerinin karşılaştırılması ve taşıma yönetimi

## Uygulama adımları

İlk olarak bugünkü ve birkaç yıl sonraki kapasite ihtiyacınızı, sistemlerinizin ne kadar kritik olduğunu ve binanın kısıtlarını belirleriz. Ardından yerleşim, enerji, soğutma ve kablolama planı çizilir. Kurulum ya da taşıma, iş akışınızı en az etkileyecek saatlere bölünerek yapılır. Proje sonunda izleme sistemi devreye alınır; yerleşim planı, kablolama listesi ve işletim talimatları size teslim edilir.

## Kendi alanınız mı, kiralık alan mı?

Her kurum için kendi veri merkezini işletmek mantıklı değildir. Büyüme hızınız, IT ekibinizin büyüklüğü ve toplam maliyet birlikte değerlendirildiğinde bazen colocation, bazen [bulut çözümleri](/bulut-yedekleme/bulut-cozumleri/), bazen de ikisinin karışımı daha uygun çıkar. Satıcıdan bağımsız olduğumuz için seçenekleri tarafsız karşılaştırırız. Kabinetlere yerleşecek sunucuların kurulumu için [sunucu kurulum ve yönetimi](/sistem-network/sunucu-kurulum-ve-yonetimi/), ikinci lokasyon ve kesintisiz çalışma ihtiyacı için [iş sürekliliği çözümleri](/bulut-yedekleme/is-surekliligi-cozumleri/) ile birlikte planlama yaparız.

## Proje sonunda kazandıklarınız

Yedekli enerji ve soğutmaya sahip, büyümeye yer bırakan düzenli bir yerleşim; yetkisiz girişe kapalı ve sensörlerle izlenen bir oda; arıza anında dakikalar içinde bulunabilen kablolar.

Sunucu odanızı ya da taşıma projenizi konuşalım. [Ücretsiz keşif isteyin](/#teklif) ya da sorularınız için [bize yazın](/iletisim/).`,
    faq: [
      {
        question: "Birkaç kabinetlik küçük bir odamız var, bu hizmet bize uygun mu?",
        answer:
          "Evet. Enerji yedekliliği, soğutma, kablolama düzeni ve çevre izleme küçük odalarda da aynı mantıkla uygulanır; sadece kapsam daha dardır.",
      },
      {
        question: "Taşıma sırasında sistemlerimiz ne kadar kapalı kalır?",
        answer:
          "Bu, sistem sayısına ve bağımlılıklara göre değişir. Taşıma sırasını ve kesinti pencerelerini önceden planlar, kritik sistemleri mesai dışına alır ve her adım için geri dönüş senaryosu hazırlarız.",
      },
      {
        question: "Elektrik ve klima işlerini de siz mi yapıyorsunuz?",
        answer:
          "Kapasite hesabını, yerleşimi ve teknik şartnameyi biz hazırlarız; elektrik ve mekanik uygulamayı yapan ekiplerle koordinasyonu üstleniriz. Böylece IT ihtiyaçlarıyla bina altyapısı birbirine uyar.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "sanallastirma-cozumleri",
    slug: "sanallastirma-cozumleri",
    title: "Sanallaştırma Çözümleri",
    metaDescription:
      "Sanallaştırma çözümleri: VMware vSphere, Hyper-V ve Proxmox kurulumu, P2V taşıma, yüksek erişilebilirlik, VDI ve kapasite ile lisans optimizasyonu.",
    content: `Her uygulama için ayrı bir fiziksel sunucu almak; donanım, elektrik, soğutma ve bakım masrafını katlar. Sanallaştırma çözümlerimizle iş yüklerinizi daha az sayıda güçlü sunucuya topluyor, arıza ve bakım anlarında çalışmaya devam edebilen esnek bir altyapı kuruyoruz.

## Sanal ortama geçmenin pratik faydaları

Bir sanal makine dakikalar içinde oluşturulabilir, güncelleme öncesinde anlık görüntüsü alınabilir ve bakım gerektiğinde başka bir fiziksel sunucuya çalışırken taşınabilir. Donanım arızasında sanal makineler kümedeki diğer sunucuda yeniden başlatılır. Test ortamı kurmak için ayrı makine almanız gerekmez. Yeni bir ERP sürümünü canlıya almadan önce kopyası üzerinde denemek ya da eski bir uygulamayı ayrı bir sanal makinede izole şekilde çalıştırmak da bu sayede kolaylaşır. Donanım yenileme döneminde ise sanal makineler yeni sunuculara kesinti olmadan taşınabilir, işletim sistemlerini yeniden kurmanız gerekmez.

## Hizmetin kapsamı

- VMware vSphere, Microsoft Hyper-V veya Proxmox VE kurulumu ve ayarları
- Fiziksel sunucuların sanala taşınması (P2V) ve birleştirme
- Yüksek erişilebilirlik, canlı taşıma ve kaynak dengeleme
- SAN, NAS veya hiper yakınsak depolama entegrasyonu
- Uzaktan çalışma için masaüstü sanallaştırma (VDI)
- Yedekleme ve felaket kurtarma araçlarıyla bağlantı
- Kaynak izleme, kapasite planlaması ve lisans optimizasyonu

## Platform seçimini neye göre yapıyoruz?

Satıcıdan bağımsız çalıştığımız için tek bir ürünü öne çıkarmayız. VMware geniş ekosistemi ve olgunluğuyla öne çıkar; ancak son dönemdeki lisans değişiklikleri maliyet hesabını değiştirdi. Windows ağırlıklı ortamlarda Hyper-V ekonomik olabilir, Proxmox ise açık kaynak bir seçenek sunar. Mevcut lisanslarınız, ekibinizin hangi platformu bildiği ve yedekleme yazılımınızın desteği karar sürecine birlikte girer. Lisans tarafında [VMware lisanslama](/lisanslama/vmware-lisanslama/) desteği de veririz.

## Geçiş nasıl ilerliyor?

İlk adımda sunucularınızın gerçek kaynak kullanımını ölçer, lisans durumunu çıkarırız. Bu verilere göre küme büyüklüğü, depolama ve yedeklilik yapısı belirlenir. Ortam kurulduktan sonra iş yükleri, önce kritik olmayanlardan başlayarak kademeli olarak taşınır. Geçişten sonra kaynak tahsisleri izlenir; gereğinden fazla ya da az kaynak verilmiş makineler düzeltilir.

## Korumayı unutmayın

Sanallaştırma, tek bir depolama veya küme sorununun çok sayıda sunucuyu birden etkileyebileceği anlamına da gelir. Bu yüzden projeye [veri yedekleme çözümleri](/bulut-yedekleme/veri-yedekleme-cozumleri/) ve [felaket kurtarma](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) planını baştan dahil ederiz. Sonuçta daha az donanım, daha düşük enerji tüketimi ve kapasiteyi açıkça gösteren bir yönetim paneli elde edersiniz.

Mevcut sunucularınızın sanallaştırmaya uygunluğunu birlikte değerlendirelim. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Hangi sanallaştırma platformunu seçmeliyiz?",
        answer:
          "Tek doğru cevap yoktur. Mevcut lisanslarınızı, ekibinizin deneyimini, bütçenizi ve yedekleme yazılımınızın desteklediği platformları karşılaştırıp gerekçeli bir öneri sunarız.",
      },
      {
        question: "Her sunucu sanallaştırılabilir mi?",
        answer:
          "Büyük çoğunluğu evet. Donanım kilidi kullanan yazılımlar veya çok yüksek disk performansı isteyen birkaç sistem için fiziksel kalma ya da özel bir yapılandırma önerebiliriz.",
      },
      {
        question: "VMware'den başka bir platforma geçiş yapıyor musunuz?",
        answer:
          "Evet. Lisans maliyeti nedeniyle platform değiştirmek isteyen kurumlar için sanal makinelerin taşınmasını, yedekleme uyumluluğunu ve geçiş takvimini planlıyoruz.",
      },
      {
        question: "Taşıma sırasında iş durur mu?",
        answer:
          "Çoğu taşıma kısa bir kesinti penceresinde tamamlanır ve kritik sistemler mesai dışına planlanır. Kaynak sunucu bir süre korunur, böylece gerekirse geri dönülebilir.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "wifi-ve-kablosuz-ag-cozumleri",
    slug: "wifi-ve-kablosuz-ag-cozumleri",
    title: "Wi-Fi ve Kablosuz Ağ Çözümleri",
    metaDescription:
      "Wi-Fi ve kablosuz ağ çözümleri: kapsama ölçümü, erişim noktası yerleşimi, merkezi yönetim, ayrı misafir ağı ve 802.1X ile WPA3-Enterprise güvenliği.",
    content: `Toplantı odasında kopan görüntülü görüşmeler, depoda el terminallerinin bağlantıyı kaybetmesi, misafirlerin şirket ağına bağlanması; bunların çoğu Wi-Fi cihazının kalitesinden değil, kablosuz ağın planlanmamış olmasından kaynaklanır. Wi-Fi ve kablosuz ağ çözümlerimizle ofis, üretim alanı, depo ve kampüslerde ölçüme dayalı, güvenli ve tek panelden yönetilen bir kablosuz ağ kuruyoruz.

## Kablosuz ağ neden sorun çıkarır?

Göz kararı konumlandırılmış erişim noktaları birbirinin kanalına girer, metal raflar ve beton duvarlar kör noktalar yaratır. Misafir, çalışan ve IoT cihazlarının aynı ağda olması hem performansı düşürür hem de güvenlik açığı oluşturur. Kurulum öncesi yapılan ölçüm ve doğru ağ ayrımı bu sorunları baştan engeller. Erişim noktası sayısını artırmak her zaman çözüm değildir; fazla ve yüksek güçte çalışan cihazlar birbirini bozarak performansı daha da düşürebilir. Depolarda raf dolulukları, üretim alanlarında ise makinelerin yaydığı parazit sinyali değiştirdiği için tasarımın bu koşullara göre yapılması gerekir.

## Kurulum kapsamı

- Kurulum öncesi ve sonrası sinyal ile girişim ölçümü (site survey)
- Erişim noktası sayısı, yeri, kanal ve güç planı
- Yerinde veya bulut tabanlı denetleyiciyle merkezi yönetim
- Çalışan, misafir ve IoT cihazları için ayrı ağlar
- 802.1X ve WPA3-Enterprise ile kullanıcı bazlı kimlik doğrulama
- Misafir giriş sayfası, süre ve bant genişliği sınırları
- Toplantı salonu gibi kalabalık alanlar için ayar
- Performans izleme ve arıza giderme

## Projenin adımları

Önce kat planlarınız üzerinden alanı inceler, yerinde sinyal ve parazit ölçümü yaparız. Bu ölçümlere göre kaç erişim noktası gerektiği ve nereye yerleşeceği belirlenir. Montaj ve yapılandırmadan sonra ikinci bir ölçüm yapılır; kapsama hedeflere ulaşmıyorsa konum ve güç ayarları düzeltilir. Kocaeli ve İstanbul Anadolu yakasındaki lokasyonlarda ölçümü ekibimiz yerinde yapar.

## Misafir erişimi ve kablolu omurga

Misafirlerin internet kullanımını kayıt altına almak ve yasal yükümlülükleri karşılamak için kendi geliştirdiğimiz hotspot yazılımı [CyberHost](/yazilim-urunlerimiz/cyberhost/) kullanılabilir. Kablosuz ağın performansı arkasındaki switch ve kablolamaya bağlı olduğu için tasarımı [ağ altyapısı kurulum ve yönetimi](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/) hizmetimizle birlikte ele alırız. Markadan bağımsız çalıştığımız için cihaz seçimi bütçenize ve ihtiyacınıza göre yapılır.

## Sonuçta neler değişir?

Tüm çalışma alanlarında tutarlı sinyal, kurumsal ağdan tamamen ayrılmış misafir trafiği, kimin hangi cihazla bağlandığını gösteren kayıtlar ve sorunları uzaktan çözmeye imkân veren merkezi bir panel.

Kablosuz ağınızı ölçümle planlayalım. [Ücretsiz keşif isteyin](/#teklif) veya [bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Kapsama ölçümü yapılmadan kurulum olmaz mı?",
        answer:
          "Tek katlı, küçük ofislerde tahmine dayalı bir plan yeterli olabilir. Depo, üretim alanı ve çok katlı binalarda ise doğru sayıda erişim noktasını doğru yere koymak için ölçüm yapılmalıdır.",
      },
      {
        question: "Misafir Wi-Fi şirket ağımızı tehlikeye atar mı?",
        answer:
          "Doğru kurulduğunda atmaz. Misafir trafiği ayrı bir VLAN'da tutulur, şirket sunucularına ve cihazlarına erişemez, internet çıkışı da kurallarla sınırlandırılır.",
      },
      {
        question: "Eski erişim noktalarımızı kullanmaya devam edebilir miyiz?",
        answer:
          "Modeline ve yaşına bağlıdır. Güncel standartları desteklemeyen ya da merkezi yönetime alınamayan cihazlar için değişim öneririz; uygun olanlar yeni yapıya dahil edilir.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "ip-kamera-guvenlik-kamerasi-sistemleri",
    slug: "ip-kamera-guvenlik-kamerasi-sistemleri",
    title: "IP Kamera ve Güvenlik Kamerası Sistemleri",
    metaTitle: "Güvenlik Kamerası ve IP Kamera Kurulumu | BTM Bilişim",
    metaDescription:
      "Gebze, Tuzla, Kocaeli ve İstanbul'da fabrika, depo, işyeri ve siteler için IP kamera projelendirme, kurulum, NVR kayıt, uzaktan izleme ve bakım. Keşif ücretsiz.",
    content: `IP kamera ve güvenlik kamerası sistemlerimiz; fabrika, OSB, depo, işyeri, apartman ve siteler için keşiften kuruluma, kayıttan uzaktan izlemeye kadar uçtan uca planlanır. Kamera sistemini ayrı bir cihaz yığını olarak değil, ağ altyapınızın güvenli bir parçası olarak kuruyoruz.

## Kamera sistemleri neden beklenen faydayı sağlamaz?

En sık karşılaştığımız sorunlar kamera modelinden değil plansızlıktan kaynaklanır: kör noktalar, gece görüntüsünün işe yaramaması, yetersiz kayıt süresi, elektrik kesintisinde kapanan kayıt cihazı ve internete varsayılan şifreyle açılmış kameralar. Doğru projelendirme ve ağ tasarımı bu sorunların hepsini kurulumdan önce çözer.

## Kapsamımız

- Yerinde keşif, kamera yerleşim planı ve görüş açısı hesabı
- IP kamera, gece görüşlü, PTZ ve dış ortam (IP66/67) kamera seçimi
- PoE switch, kablolama ve kamera ağının kurumsal ağdan ayrılması (VLAN)
- NVR kayıt cihazı, disk kapasitesi ve kayıt süresi planlaması
- Mobil uygulama ve web üzerinden güvenli uzaktan izleme
- UPS ile kayıt ve ağ cihazlarının elektrik kesintisinde çalışmaya devam etmesi
- Varsayılan şifrelerin değiştirilmesi, firmware güncelleme ve erişim yetkileri
- Periyodik bakım, arıza tespiti ve teknik servis

## Nasıl çalışıyoruz?

1. **Keşif** — Alan yerinde incelenir; kritik noktalar, ışık koşulları ve kablo güzergâhları belirlenir.
2. **Projelendirme** — Kamera sayısı, modeli, konumu ve kayıt kapasitesi kalem kalem tekliflendirilir.
3. **Kurulum** — Kablolama, montaj, NVR ve ağ yapılandırması yapılır; görüş açıları ayarlanır.
4. **Teslim** — Uzaktan izleme kurulur, kullanıcılar eğitilir, kamera yerleşim planı dokümante edilir.

## Hangi alanlarda kuruyoruz?

- **Fabrika ve OSB:** Geniş alan, üretim hattı ve çevre güvenliği; Gebze, Dilovası ve TOSB bölgeleri
- **Depo ve lojistik:** Rampa, raf koridorları ve giriş-çıkış noktaları
- **İşyeri ve mağaza:** Kasa, giriş ve çok şubeli merkezi izleme
- **Apartman ve site:** Otopark, giriş kapıları ve ortak alanlar

## Rehber yazılarımız

- [Kamera sistemi projelendirme rehberi](/gebze-kamera-projelendirme/)
- [IP kamera ile analog sistemlerin karşılaştırması](/ip-kamera-teknolojisi-vs-analog-karsilastirma/)
- [NVR, DVR ve bulut kayıt farkları](/kamera-kayit-sistemleri-depolama-cozumleri/)
- [Kamera sistemlerinde ağ altyapısı nasıl olmalı?](/kocaeli-kamera-sistemleri-ag-altyapisi-rehberi/)
- [Kamera sistemi için UPS ve güç yedekleme](/kamera-sistemi-ups-ve-yedekleme/)

## İlgili çözümler

Kamera ağı için [ağ altyapısı kurulum ve yönetimi](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/), geniş alanlarda [Wi-Fi ve kablosuz ağ çözümleri](/sistem-network/wifi-ve-kablosuz-ag-cozumleri/), uzaktan erişimin güvenliği için [firewall ve VPN çözümleri](/sistem-network/firewall-ve-vpn-cozumleri/) ile birlikte planlanır.

## Kurumunuza kazandırdıkları

- Kritik noktalarda kör nokta bırakmayan kapsama
- Gece ve düşük ışıkta kullanılabilir görüntü
- İhtiyaca uygun kayıt süresi ve elektrik kesintisinde kesintisiz kayıt
- İnternete güvenli şekilde açılmış, yetkilendirilmiş uzaktan izleme

Kamera sisteminizi birlikte planlayalım; keşif ve teklif ücretsizdir. [Teklif isteyin.](/#teklif)`,
    faq: [
      {
        question: "Kamera kurulum fiyatı neye göre değişir?",
        answer:
          "Kamera sayısı ve modeli, kablo mesafesi, NVR ve disk kapasitesi, montaj koşulları ve PoE switch ihtiyacına göre değişir. Yerinde keşiften sonra kalem kalem teklif veriyoruz; keşif ücretsizdir.",
      },
      {
        question: "IP kamera mı, analog (AHD) kamera mı seçmeliyim?",
        answer:
          "Yeni kurulumlarda genellikle IP kamerayı öneriyoruz: daha yüksek çözünürlük, PoE ile tek kablodan güç ve veri, merkezi yönetim ve genişletme kolaylığı sağlar. Mevcut koaksiyel kablolaması olan küçük sistemlerde AHD hâlâ ekonomik bir seçenek olabilir.",
      },
      {
        question: "Kayıtlar kaç gün saklanır?",
        answer:
          "Kamera sayısına, çözünürlüğe, kayıt moduna (sürekli veya hareketle) ve disk kapasitesine bağlıdır. İhtiyacınız olan saklama süresini baştan belirliyor, NVR ve disk kapasitesini buna göre hesaplıyoruz.",
      },
      {
        question: "Kameraları cep telefonundan izleyebilir miyim?",
        answer:
          "Evet. Mobil uygulama veya web arayüzü üzerinden uzaktan izleme kuruyoruz. Bunu yaparken varsayılan şifreleri değiştiriyor, cihazları doğrudan internete açmak yerine güvenli erişim yöntemleri kullanıyoruz.",
      },
      {
        question: "Kurulumdan sonra bakım ve servis veriyor musunuz?",
        answer:
          "Evet. Periyodik bakım, lens temizliği, disk ve kayıt kontrolü, firmware güncellemesi ve arıza durumunda teknik servis hizmeti veriyoruz.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "firewall-ve-vpn-cozumleri",
    slug: "firewall-ve-vpn-cozumleri",
    title: "Kurumsal VPN ve Uzaktan Erişim Çözümleri",
    metaDescription:
      "Firewall ve VPN çözümleri: güvenlik duvarı kurulumu, şubeler arası VPN, uzaktan erişim, ZTNA, çok faktörlü kimlik doğrulama ve erişim kayıtlarının izlenmesi.",
    content: `Evden çalışan personel, sahadaki ekipler ve farklı illerdeki şubeler şirket sistemlerine her gün dışarıdan bağlanıyor. Firewall ve VPN çözümlerimizde ağınızın internet sınırını ve bu uzaktan bağlantıları tek bir güvenlik kurgusu içinde tasarlıyor; kimin, nereden, hangi sisteme eriştiğini görünür ve denetlenebilir hale getiriyoruz.

## Hızlı açılan VPN'in gizli riski

Acil bir ihtiyaçla kurulan VPN'ler genellikle bağlanan kullanıcıya tüm ağı açar. Tek bir parola çalındığında saldırgan muhasebe sunucusundan kamera kayıtlarına kadar her şeye ulaşabilir. Güvenli bir yapı; her kullanıcıya yalnızca işi için gereken sistemleri açar, girişte ikinci bir doğrulama ister ve her bağlantıyı kayda alır. Güncellenmeyen güvenlik duvarı yazılımları da son yıllarda saldırganların en çok kullandığı giriş noktalarından biri oldu; bu nedenle cihaz yazılımlarının takibi kurgunun ayrılmaz parçasıdır.

## Çözüm kapsamı

- Yeni nesil güvenlik duvarı kurulumu ve kural tasarımı
- Şube ve veri merkezi arasında site-to-site VPN
- İstemci tabanlı veya SSL uzaktan erişim VPN'i
- Uygulama bazlı erişim için sıfır güven (ZTNA) yaklaşımı
- Çok faktörlü kimlik doğrulama (MFA) entegrasyonu
- Erişim kayıtlarının toplanması ve SIEM'e aktarılması
- Yedek hat ve otomatik yük devretme
- Kuralların ve kullanıcı yetkilerinin dönemsel gözden geçirilmesi

## Tasarım ve uygulama süreci

İlk soru basittir: kim, hangi konumdan, hangi kaynağa erişmeli? Bu sorunun cevabı kullanıcı grupları ve sistemler bazında bir erişim matrisine dönüştürülür. Ardından ağ segmentleri ve VPN topolojisi tasarlanır, bağlantılar kurulur, MFA ve kayıt tutma devreye alınır. ISO 27001 baş denetçi deneyimimiz sayesinde kurallar, denetimde sorulacak sorulara cevap verecek şekilde belgelenir. Satıcıdan bağımsız çalıştığımız için cihaz seçimi ihtiyacınıza göre yapılır.

## Güvenliğin diğer katmanları

Saldırı önleme, uygulama kontrolü ve trafik görünürlüğü gibi daha derin koruma ihtiyaçları için [firewall ve ağ güvenliği](/siber-guvenlik/firewall-ve-ag-guvenligi/) hizmetimiz devreye girer. VPN ve güvenlik duvarı kayıtlarının merkezi olarak saklanıp şüpheli girişlerin fark edilmesi için [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/) ile birlikte çalışırız. Kamera kayıtlarına dışarıdan izleme gerekiyorsa [IP kamera sistemleri](/sistem-network/ip-kamera-guvenlik-kamerasi-sistemleri/) cihazları internete doğrudan açılmadan, VPN üzerinden erişilecek şekilde kurulur.

## Elde ettiğiniz yapı

Şifreli ve kesintiye dayanıklı şube bağlantıları, ikinci doğrulama olmadan açılmayan uzaktan erişim, her oturum için kayıt ve kullanılmayan kurallardan arındırılmış bir güvenlik duvarı. Arıza ya da şüpheli bir durumda 7/24 teknik destek hattımıza ulaşabilirsiniz.

Uzaktan erişim yapınızı birlikte değerlendirelim. [İletişime geçin](/iletisim/).`,
    faq: [
      {
        question: "VPN'i bırakıp ZTNA'ya geçmemiz gerekir mi?",
        answer:
          "Her kurum için şart değildir. ZTNA uygulama bazında daha ince kontrol sağlar; ancak mevcut VPN'i MFA ve segmentasyonla güçlendirmek pek çok işletme için iyi bir başlangıçtır. Seçimi kullanıcı profilinize göre birlikte yaparız.",
      },
      {
        question: "MFA'yı mevcut kullanıcı hesaplarımızla kullanabilir miyiz?",
        answer:
          "Evet. Active Directory veya Entra ID ile yaygın MFA uygulamalarını entegre ederiz. Telefonu kaybolan kullanıcı gibi durumlar için yedek giriş yöntemleri de planlanır.",
      },
      {
        question: "Şubenin internet hattı kesilirse bağlantı kopar mı?",
        answer:
          "Yedek hat ya da 4G/5G modem tanımlandığında birincil hat düştüğünde trafik otomatik olarak yedeğe geçer. Hangi şubede yedek hat gerektiğini iş kritikliğine göre birlikte belirleriz.",
      },
      {
        question: "Mevcut güvenlik duvarımızın kurallarını denetleyebilir misiniz?",
        answer:
          "Evet. Kural tabanını inceler, gereksiz veya fazla geniş tanımlanmış kuralları ve kullanılmayan hesapları raporlarız. Düzeltmeler sizin onayınızla ve planlı şekilde uygulanır.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "sistem-entegrasyonu",
    slug: "sistem-entegrasyonu",
    title: "Sistem Entegrasyonu",
    metaDescription:
      "Sistem entegrasyonu: farklı markaların sunucu, depolama, ağ, sanallaştırma ve yedekleme bileşenlerini test edilmiş, belgelenmiş tek altyapıda birleştirir.",
    content: `Sunucuyu bir firmadan, depolamayı başka birinden, ağ cihazlarını üçüncü bir tedarikçiden aldığınızda sorun çıktığında herkes topu bir diğerine atar. Sistem entegrasyonu hizmetinde bu bileşenleri tek bir tasarım altında topluyor, birbiriyle uyumlu çalıştığını test ediyor ve tek bir sorumluluk noktası olarak projeyi uçtan uca yürütüyoruz.

## Hangi durumlarda entegrasyon projesi gerekir?

Yeni bir şube ya da sunucu odası açılması, toplu donanım yenilemesi, depolama veya sanallaştırma yatırımı, iki şirketin birleşmesi ya da ayrı ayrı kurulmuş sistemlerin tek yönetime alınması gibi durumlarda bileşenleri tek tek değil, birlikte planlamak gerekir. Aksi halde sürüm uyumsuzlukları, performans sorunları ve sorumluluk boşlukları ortaya çıkar. Sık gördüğümüz bir örnek, yeni alınan depolama ünitesinin mevcut switch'lerin desteklemediği bir bağlantı hızı gerektirmesi ya da yedekleme yazılımının kurulan hipervizör sürümünü henüz desteklememesidir. Bu tür sürprizler sipariş verilmeden önce yapılan bir uyumluluk kontrolüyle önlenir ve bütçeniz plansız ek alımlara harcanmaz.

## Entegrasyon kapsamı

- Sunucu, SAN/NAS depolama, ağ, sanallaştırma ve yedeklemeyi kapsayan çözüm tasarımı
- Donanım tedarikinin koordinasyonu ve kurulum
- Firmware, sürüm ve protokol uyumluluk kontrolü
- Kimlik yönetimi, DNS, zaman senkronizasyonu ve izleme bağlantıları
- Eski sistemden yeni ortama veri ve iş yükü taşıma
- Test senaryoları, devreye alma ve kabul süreci
- Kurulmuş haliyle dokümantasyon ve ekibinize bilgi aktarımı

## Projenin aşamaları

Tasarım aşamasında ihtiyaçlarınız, mevcut kısıtlar ve hedef mimari netleşir; bileşenler satıcıdan bağımsız olarak, uyumluluk listeleri kontrol edilerek seçilir. Hazırlıkta tedarik takvimi, saha hazırlığı ve taşıma planı oluşturulur. Kurulumda bileşenler birbirine bağlanır ve senaryolarla uçtan uca test edilir; örneğin bir depolama yolu koptuğunda sanal makinelerin çalışmaya devam edip etmediği denenir. Son aşamada kabul testleri sizinle birlikte yapılır ve belgeler teslim edilir.

## Alt bileşenlerde derinleşmek

Projenin her katmanı için ayrı hizmetlerimiz de vardır: [sunucu kurulum ve yönetimi](/sistem-network/sunucu-kurulum-ve-yonetimi/), [sanallaştırma çözümleri](/sistem-network/sanallastirma-cozumleri/), [kurumsal ağ altyapısı](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/) ve [veri merkezi çözümleri](/sistem-network/veri-merkezi-cozumleri/). Altyapının üzerindeki uygulamaların birbirine veri aktarması gerekiyorsa yazılım ekibimiz [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/) ile bu katmanı da üstlenir.

## Teslim edilen sonuç

Tek elden tasarlanmış ve test edilmiş bir altyapı, bileşenler arasında sorumluluk boşluğu kalmaması, kabul testi sonuçları ve ekibinizin devralabileceği eksiksiz belgeler. Devreye almadan sonra 7/24 teknik destekle yanınızda oluruz.

Planladığınız altyapı projesini konuşalım. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Donanımı sizden satın almak zorunda mıyız?",
        answer:
          "Hayır. Tedariki biz koordine edebiliriz ya da sizin aldığınız donanımla çalışırız. Önemli olan, bileşenlerin sipariş öncesinde uyumluluk açısından kontrol edilmesidir.",
      },
      {
        question: "Farklı markaların ürünleri birlikte sorunsuz çalışır mı?",
        answer:
          "Çoğu zaman evet. Tasarımda üreticilerin uyumluluk listeleri ve firmware sürümleri kontrol edilir; riskli kombinasyonlar önceden size bildirilir ve alternatif sunulur.",
      },
      {
        question: "Proje bitince elimize hangi belgeler geçiyor?",
        answer:
          "Kurulmuş haliyle mimari çizimler, yapılandırma kayıtları, kabul testi sonuçları ve işletim talimatları teslim edilir. Ekibinize de sistemi nasıl yöneteceklerine dair bilgi aktarımı yapılır.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "it-bakim-ve-destek-hizmetleri",
    slug: "it-bakim-ve-destek-hizmetleri",
    title: "IT Destek ve Bakım Hizmetleri",
    metaDescription:
      "IT bakım ve destek hizmetleri: SLA'lı yerinde ve uzaktan kullanıcı desteği, 7/24 izleme, yama yönetimi, yedek kontrolü, envanter takibi ve aylık rapor.",
    content: `Yazıcının çalışmaması, e-postanın gitmemesi, sunucunun bir sabah açılmaması; küçük görünen her arıza, çalışanlarınızın zamanından ve müşterilerinize verdiğiniz hizmetten çalar. IT bakım ve destek hizmetlerimizle kullanıcı taleplerinden sunucu bakımına kadar günlük IT işlerini üstleniyor, yanıt sürelerini sözleşmede tanımlanan hizmet seviyelerine (SLA) bağlıyoruz.

## Arızayı beklemek neden pahalıya gelir?

Yalnızca bir şey bozulduğunda destek çağırmak ilk bakışta ucuz görünür. Ancak dolan bir disk, süresi geçen bir sertifika ya da hiç denenmemiş bir yedek, en yoğun gününüzde kesintiye dönüşür. Düzenli bakım ve izleme bu sorunları kullanıcılar fark etmeden yakalar. Ayrıca her talebin kayda girmesi, hangi bilgisayarın ya da uygulamanın en çok sorun çıkardığını gösterir; yenileme bütçesini tahmine değil bu verilere göre planlayabilirsiniz.

## Kimler için uygun?

- Kendi IT personeli olmayan veya tek kişilik IT ekibiyle çalışan KOBİ'ler
- Fabrika, depo ve çok şubeli yapısı nedeniyle kesintiye tahammülü olmayan işletmeler
- Arıza odaklı destekten planlı bakıma geçmek isteyen kurumlar
- Mesai dışında da ulaşılabilecek 7/24 teknik destek ihtiyacı olanlar

## Destek kapsamı

- Uzaktan ve yerinde kullanıcı destek masası
- Sunucu, ağ ve bilgisayarlar için sürekli izleme ve alarm
- Yama, güncelleme ve yapılandırma yönetimi
- Yedeklerin kontrolü ve düzenli geri yükleme denemeleri
- Donanım, yazılım ve lisans envanteri takibi
- İşe başlayan personelin kurulumu, ayrılanın erişimlerinin kapatılması
- Aylık hizmet raporu ve gözden geçirme toplantısı
- Üretici, garanti ve servis süreçlerinin takibi

## Size uyan çalışma modeli

İç IT ekibi olmayan kurumlar için tüm operasyonu biz yönetiriz. Küçük bir IT ekibiniz varsa onların yanında yardımcı ekip olarak çalışır, izin ve yoğunluk dönemlerini ve uzmanlık isteyen konuları kapatırız. Belirli bir sistemi biz kurduysak, kurulum sonrası bakımını ayrı bir sözleşmeyle sürdürebiliriz. Kocaeli ve İstanbul Anadolu yakasında yerinde, diğer bölgelerde uzaktan hizmet veriyoruz.

## İşleyiş ve raporlama

Başlangıçta envanter, erişim bilgileri ve bilinen sorunlar kayda geçirilir. İlk haftalarda biriken arızalar ve riskler kapatılır, izleme kurulur. Sonrasında talepler SLA içinde karşılanır, bakım işleri takvime bağlanır ve aylık raporla tekrarlayan sorunların kök nedenine inilir. Talep ve envanter kayıtlarını şeffaf tutmak için kendi geliştirdiğimiz [Orbit IT operasyon platformu](/yazilim-urunlerimiz/orbit/) kullanılabilir. Altyapıda köklü bir yenileme gerekirse [sistem ve network danışmanlığı](/sistem-network/sistem-ve-network-danismanligi/) ile planlama yapılır; uzun vadeli teknoloji ve bütçe kararları için de [IT danışmanlığı](/danismanlik/it-danismanlik-hizmetleri/) desteği veririz.

Destek ihtiyacınızı ve mevcut durumunuzu konuşalım. [İletişime geçin](/iletisim/).`,
    faq: [
      {
        question: "Bir arıza bildirdiğimizde ne kadar sürede dönüş yapıyorsunuz?",
        answer:
          "Yanıt ve çözüm süreleri arızanın önceliğine göre sözleşmede tanımlanır. Kritik arızalar öncelikli ele alınır; düşük öncelikli talepler için hedef süreler birlikte belirlenir.",
      },
      {
        question: "Kendi IT çalışanımız var, bu hizmet yine de işimize yarar mı?",
        answer:
          "Evet. Yardımcı ekip modelinde mevcut çalışanınızın yerine geçmez, onu destekleriz: izin dönemlerini, mesai dışı nöbeti ve uzmanlık gerektiren konuları üstleniriz.",
      },
      {
        question: "Sözleşme hangi süreyle yapılıyor?",
        answer:
          "Genellikle yıllık yapılır ve aylık raporlarla takip edilir. İhtiyaçlarınız değiştikçe kapsam ve kullanıcı sayısı dönem içinde güncellenebilir.",
      },
      {
        question: "Ücreti ne belirler?",
        answer:
          "Kullanıcı ve cihaz sayısı, sunucu adedi, lokasyon sayısı, yerinde destek ihtiyacı ve istenen yanıt süreleri fiyatı belirler. Ücretsiz keşiften sonra kapsamı netleştirip teklif hazırlarız.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Bulut, Yedekleme & İş Sürekliliği
  // ─────────────────────────────────────────────────────────────────────────
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "bulut-cozumleri",
    slug: "bulut-cozumleri",
    title: "Bulut Bilişim Çözümleri",
    metaDescription:
      "Bulut çözümleri: iş yükü analizi, hibrit mimari, göç planı ve maliyet yönetişimi. Hangi sistemin buluta uygun olduğuna verilerle karar verin.",
    content: `Bulut projeleri genellikle tek bir cümleyle başlar: "Sunucuları buluta alalım." Oysa bazı uygulamalar bulutta daha esnek ve ekonomik çalışırken bazıları içeride kaldığında daha az sorun çıkarır. Biz önce envanterinize bakar, her sistem için ayrı bir karar çıkarır, ardından seçilen platformda güvenli bir temel kurup taşımayı adım adım yürütürüz.

## Karar neye göre verilir?

Bir iş yükünü taşımadan önce şu sorulara yanıt ararız: Uygulama hangi veritabanlarına ve servislere bağlı? Lisansı bulutta kullanılabiliyor mu? Gecikmeye ne kadar duyarlı? Aylık trafiği ve depolama büyümesi ne kadar? Bu yanıtlar her sistemi üç gruptan birine yerleştirir: olduğu gibi taşınacaklar, yeniden tasarlanması gerekenler ve şirket içinde kalmaya devam edecekler. Çoğu kurumda sonuç hibrit bir yapıdır: örneğin e-posta ve dosya paylaşımı bulutta, üretim hattına bağlı yazılımlar fabrikada kalır.

## Hizmet kapsamı

- Envanter, bağımlılık haritası ve buluta hazırlık değerlendirmesi
- Genel, özel veya hibrit model için hedef mimari
- Kimlik, ağ ve erişim kurallarını içeren başlangıç ortamı (landing zone)
- Önceliklere göre gruplanmış taşıma takvimi ve her grup için geri alma adımları
- Kaynak boyutlandırma, rezervasyon ve kullanılmayan kaynakların kapatılması
- Etiket standardı, bütçe uyarıları ve yetki politikaları
- Bulutta izleme, yedek ve felaket kurtarma kurgusu

## Taşıma süreci nasıl ilerler?

İlk aşamada mevcut maliyetinizi ve sistemler arası bağımlılıkları çıkarırız. İkinci aşamada hedef modeli, ağ bağlantısını ve güvenlik temelini tasarlarız. Taşıma, riski düşük sistemlerle başlar; her grup test edilip kullanıcı onayı alındıktan sonra bir sonrakine geçilir. Canlıya alımın ardından kaynak kullanımı ve fatura belirli aralıklarla incelenir, gereksiz kapasite küçültülür.

## Platform ve lisans tarafı

Platform netleştiğinde ayrıntıya [Azure üzerinde kurulum ve göç](/bulut-yedekleme/microsoft-azure-cozumleri/), [AWS altyapı hizmetimiz](/bulut-yedekleme/aws-bulut-cozumleri/) ya da [Microsoft 365 kurulum ve göç](/bulut-yedekleme/microsoft-365-cozumleri/) sayfalarında ineriz. Bulutta kullanılacak sunucu ve kullanıcı lisanslarının doğru kurgulanması için [Microsoft lisans danışmanlığı](/lisanslama/microsoft-lisanslama/) aynı planın parçası olur.

## Elinize ne geçer?

Her sistem için gerekçesiyle yazılmış bir taşı ya da bırak kararı, faturası önceden tahmin edilebilen ve uyarılarla izlenen bir bulut ortamı, ilk günden doğru kurulmuş kimlik ve ağ katmanı ve ihtiyaç anında dakikalar içinde yeni test ortamı açabilme esnekliği. Bu çalışmayı 2010'dan beri sürdürdüğümüz [IT danışmanlığı](/danismanlik/it-danismanlik-hizmetleri/) yaklaşımıyla yürütürüz: önce ihtiyaç ve risk, sonra uygulama, sonra bakım. Satıcıdan bağımsız olduğumuz için tek bir platformu öne çıkarmayız.

Bulut yol haritanızı birlikte çizmek için [ücretsiz keşif görüşmesi isteyin](/iletisim/).`,
    faq: [
      {
        question: "Tüm sunucularımızı buluta taşımak zorunda mıyız?",
        answer:
          "Hayır. Değerlendirme çoğu zaman karma bir tablo ortaya koyar. Esneklikten fayda gören sistemler buluta geçer, bulutta daha pahalıya çalışacak olanlar şirket içinde kalır.",
      },
      {
        question: "Bulut faturasının beklenmedik şekilde büyümesini nasıl önlersiniz?",
        answer:
          "Kaynaklara etiket verir, bütçe eşikleri için uyarı tanımlar ve mesai dışında gerekmeyen ortamları otomatik kapatırız. Kapasite de gerçek kullanıma göre periyodik olarak yeniden boyutlandırılır.",
      },
      {
        question: "Taşıma sırasında kullanıcılar etkilenir mi?",
        answer:
          "Sistemler küçük gruplar hâlinde taşınır ve her grup ayrı ayrı test edilir. Kritik uygulamaların geçişi mesai dışına planlanır ve sorun çıkarsa eski ortama dönüş adımları hazır bekler.",
      },
      {
        question: "Maliyeti neler belirler?",
        answer:
          "Taşınacak sistem sayısı, uygulamaların yeniden tasarım gerektirip gerektirmediği ve hibrit bağlantı ihtiyacı çalışmanın süresini ve kapsamını belirler. İlk görüşme ve keşif ücretsizdir; teklif bu keşfin çıktısına göre hazırlanır.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "microsoft-365-cozumleri",
    slug: "microsoft-365-cozumleri",
    title: "Microsoft 365 Çözümleri",
    metaDescription:
      "Microsoft 365 kurulumu, Exchange ve Google Workspace göçü, Teams ve SharePoint düzeni, MFA, Intune ve yedekleme ile lisansınızın tamamını kullanın.",
    content: `Pek çok şirket Microsoft 365 aboneliğini yıllardır ödüyor ama yalnızca Outlook ve Word kullanıyor. Teams kanalları dağınık, dosyalar hâlâ ortak klasörde, kullanıcılar tek parolayla giriş yapıyor ve cihazlar kimsenin kontrolünde değil. Biz ortamınızı devralır, eksik yapılandırmaları tamamlar ve aboneliğinizde zaten bulunan özellikleri iş akışınıza uygun biçimde devreye alırız.

## En sık karşılaştığımız tablo

Alan adı kayıtları yarım bırakılmış, SPF ve DKIM tanımlanmamış, eski sunucudan kalan posta kutuları taşınmamış. SharePoint siteleri izin karmaşasına dönmüş, dış paylaşım herkese açık. Yönetici hesaplarında çok faktörlü doğrulama yok. Bu sorunların büyük kısmı ek lisans almadan, doğru ayarlarla çözülür. Ayrıldığı hâlde hesabı açık kalan eski çalışanlar ve kimseye atanmamış ama faturalanan lisanslar da ilk incelemede sıkça çıkan bulgulardır; bunları listeleyip temizlemek hem güvenliği hem maliyeti hemen iyileştirir.

## Kurulum ve göç kapsamı

- Tenant açılışı, alan adı doğrulama, SPF/DKIM/DMARC kayıtları
- Exchange sunucusu, Google Workspace ya da IMAP kaynaklı posta taşıma
- Paylaşımlı posta kutuları, dağıtım listeleri ve posta akış kuralları
- Teams ekip yapısı, SharePoint site düzeni ve OneDrive paylaşım sınırları
- MFA, koşullu erişim ve parolasız oturum açma
- Intune ile dizüstü ve mobil cihaz kaydı, uygulama dağıtımı
- Defender for Office 365 ile kimlik avı ve zararlı ek filtrelemesi
- Posta kutusu, OneDrive ve SharePoint verisi için ayrı yedek

## Proje adımları

Önce mevcut posta altyapınızı, lisans dağılımınızı ve güvenlik ayarlarınızı inceleriz. Ardından göç takvimini, klasör ve site yapısını, kimlik kurallarını içeren bir tasarım belgesi hazırlarız. Taşıma küçük bir pilot kullanıcı grubuyla başlar; sorunsuz geçtiği doğrulandıktan sonra kalan kullanıcılar dalgalar hâlinde aktarılır. Son aşamada güvenlik politikaları sıkılaştırılır ve çalışanlara kısa bir kullanım rehberi verilir.

## Lisans ve veri sızıntısı tarafı

Hangi kullanıcının hangi plana ihtiyaç duyduğu [Microsoft 365 lisans planlaması](/lisanslama/microsoft-365-lisanslama/) çalışmasında netleşir. Hassas belgelerin e-posta veya paylaşım bağlantısıyla dışarı çıkmasını sınırlamak istiyorsanız [veri kaybı önleme (DLP)](/siber-guvenlik/dlp-veri-kaybi-onleme-cozumleri/) kurallarını aynı projede kurgularız.

## Proje sonunda

Posta kaybı yaşanmadan tamamlanmış bir geçiş, rolüne göre yetkilendirilmiş kullanıcılar, MFA ile korunan hesaplar ve geri yüklenebilir bir M365 yedeği. Kurulum sonrasında 7/24 teknik destek ekibimiz ortamınızı izlemeye devam eder.

Mevcut tenantınızı birlikte gözden geçirmek için [bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Microsoft verilerimizi zaten yedeklemiyor mu?",
        answer:
          "Microsoft altyapının ayakta kalmasından sorumludur, verinin geri getirilmesinden değil. Yanlışlıkla silinen bir klasör, fidye yazılımıyla şifrelenen dosyalar ya da uzun süre önceki bir sürüme dönme ihtiyacı için ayrı bir yedekleme ürünü kullanmanızı öneririz.",
      },
      {
        question: "Posta taşıma sırasında e-postalar kaybolur mu?",
        answer:
          "Planlı bir göçte kaybolmaz. Kesme gününden önce eski ve yeni kutular senkronize edilir, öğe sayıları karşılaştırılır ve MX kaydı trafiğin en düşük olduğu saatte değiştirilir.",
      },
      {
        question: "Google Workspace kullanıyoruz, geçiş mümkün mü?",
        answer:
          "Evet. Gmail, takvim, kişi listeleri ve Drive dosyaları Microsoft 365 tarafına aktarılır. Kullanıcılara ilk günler için kısa bir geçiş rehberi hazırlarız.",
      },
      {
        question: "Proje ne kadar sürer?",
        answer:
          "Süre kullanıcı sayısına, taşınacak veri hacmine ve kaynak sistemin türüne bağlıdır. Keşif sonrası her dalganın tarihini gösteren bir takvim paylaşırız.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "microsoft-azure-cozumleri",
    slug: "microsoft-azure-cozumleri",
    title: "Microsoft Azure Çözümleri",
    metaDescription:
      "Microsoft Azure çözümleri: landing zone, Azure Migrate ile sunucu göçü, Entra ID kimlik güvenliği, Site Recovery ve maliyet takibi tek planda.",
    content: `Azure'da ilk sanal makineyi açmak birkaç dakika sürer; asıl zorluk, altı ay sonra kimin neyi açtığını, faturanın neden büyüdüğünü ve hangi kaynağın internete açık olduğunu bilmektir. Azure hizmetimiz bu yüzden temelden başlar: abonelik düzenini, ağı ve kimliği kurar, ardından sunucularınızı taşır ve ortamı maliyet ile güvenlik açısından düzenli olarak gözden geçiririz.

## Temel kurulmazsa ne olur?

Tek abonelikte biriken test ve üretim kaynakları, adlandırma kuralı olmayan disklerin unutulup ödenmeye devam etmesi, herkesin Owner rolüyle çalışması, şirket ağıyla güvensiz bağlantılar. Bunları sonradan toparlamak, baştan doğru kurmaktan çok daha zahmetlidir. Örneğin sanal ağ adres aralıkları şirket ağınızla çakışacak şekilde seçildiyse, VPN kurmak için çalışan sunucuların IP adreslerini değiştirmek gerekebilir; bu da planlı bir kesinti demektir.

## Azure hizmet kapsamı

- Yönetim grupları, abonelik ayrımı, adlandırma ve etiket kuralları
- Sanal ağlar, site-to-site VPN veya ExpressRoute ile şirket bağlantısı
- Microsoft Entra ID, koşullu erişim ve rol tabanlı yetki (RBAC)
- Azure Migrate ile değerlendirme, sunucu taşıma ve gerekirse PaaS servislerine geçiş
- Azure Backup ile yedek, Site Recovery ile ikincil bölgeye kopya
- Azure Monitor ve Log Analytics üzerinde uyarı kuralları
- Bütçe uyarıları, Advisor önerileri, rezervasyon ve zamanlı kapatma
- Defender for Cloud ile güvenlik puanının incelenmesi

## Çalışma sırası

Önce mevcut sunucularınızı, uygulama bağımlılıklarını ve hedeflerinizi çıkarırız. Ardından landing zone, kimlik ve ağ katmanını kurarız. Sunucular küçük gruplar hâlinde taşınır; her grup test edilip onaylandıktan sonra bir sonrakine geçilir. Canlıya geçişten sonra kaynak boyutları, fatura ve güvenlik puanı periyodik olarak gözden geçirilir.

## Diğer hizmetlerle bağlantısı

Hangi sistemlerin Azure'a gideceğine karar vermediyseniz önce [bulut stratejisi çalışması](/bulut-yedekleme/bulut-cozumleri/) yaparız. Windows Server ve SQL lisanslarınızın Azure'da yeniden kullanımı ve kurumsal sözleşme seçenekleri [Microsoft lisans danışmanlığı](/lisanslama/microsoft-lisanslama/) ile netleşir. Şirket içindeki sunucularınız için Site Recovery tabanlı bir [felaket kurtarma kurgusu](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) da kurabiliriz.

## Size bıraktığımız ortam

Denetçiye gösterilebilir, kimin neye yetkili olduğu belli bir yapı; bütçe aşımında haber veren uyarılar; doğru kurulmuş kimlik ve ağ güvenliği; ve şirket içi sunucularınız için bulutta duran bir yedek ve kurtarma seçeneği. ISO 27001 baş denetçi deneyimimiz, yetki ve kayıt tasarımında denetim gözüyle bakmamızı sağlar.

Azure aboneliğinizi birlikte incelemek için [ücretsiz keşif isteyin](/iletisim/).`,
    faq: [
      {
        question: "Başkasının kurduğu Azure ortamını düzenleyebilir misiniz?",
        answer:
          "Evet. Önce ortamı yetki, ağ, maliyet ve güvenlik açısından inceleriz. Ardından önceliklendirilmiş bir düzeltme listesi hazırlar ve çalışan sistemleri kesmeden adım adım uygularız.",
      },
      {
        question: "Şirketteki sunucuları Azure'a yedekleyebilir miyiz?",
        answer:
          "Evet. Azure Backup ile düzenli yedek, Site Recovery ile ikincil bölgede çalışmaya hazır kopya kurulabilir. Ne kadar veri kaybını ve ne kadar beklemeyi kabul edebileceğiniz yapılandırmayı belirler.",
      },
      {
        question: "Taşımadan önce aylık maliyeti görebilir miyiz?",
        answer:
          "Değerlendirme raporunda her iş yükü için tahmini aylık tutar ve boyut küçültme ya da rezervasyonla elde edilebilecek tasarruf seçenekleri yer alır.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "aws-bulut-cozumleri",
    slug: "aws-bulut-cozumleri",
    title: "AWS Bulut Çözümleri",
    metaDescription:
      "AWS bulut çözümleri: Organizations ile hesap düzeni, VPC ve hibrit bağlantı, IAM Identity Center, AWS Backup ve maliyet anomali uyarıları.",
    content: `AWS'de tek bir hesapla başlamak kolaydır, ancak ortam büyüdükçe üretim ve test kaynakları birbirine karışır, kimin hangi anahtarla eriştiği izlenemez hâle gelir ve fatura kalemleri anlamını yitirir. AWS hizmetimiz, iş yüklerinizi taşımadan önce hesap düzenini, ağ tasarımını ve erişim modelini oturtur; taşıma sonrasında ise maliyet ve güvenlik bulgularını düzenli olarak takip eder.

## Baştan kurulması gerekenler

Ayrı hesaplara bölünmüş ortamlar ve bunları yöneten Organizations yapısı, tek noktadan kimlik yönetimi, planlı IP aralıklarıyla VPC tasarımı, tüm hesaplarda açık CloudTrail kaydı ve faturanın hesap bazında görünmesi. Bu katmanlar sonradan eklenmeye çalışıldığında çalışan sistemlere dokunmak gerekir. Sık rastladığımız bir risk de geliştiricilerin bilgisayarlarında duran, süresi olmayan erişim anahtarlarıdır; merkezi kimliğe geçişle bu anahtarlar kısa ömürlü oturumlarla değiştirilir.

## AWS hizmet kapsamı

- Organizations ile hesap ayrımı ve servis kontrol politikaları (SCP)
- VPC, alt ağ planı, site-to-site VPN veya Direct Connect bağlantısı
- IAM Identity Center ile tek giriş ve en düşük yetki ilkesi
- EC2, RDS, S3 ve konteyner tabanlı uygulamaların kurulumu ya da taşınması
- AWS Backup ile politika tabanlı yedek ve başka bölgeye kopya
- CloudWatch metrikleri, alarmlar ve CloudTrail kayıtlarının merkezde toplanması
- Budgets, Cost Anomaly Detection ve Savings Plans ile maliyet kontrolü
- Security Hub ve GuardDuty bulgularının incelenmesi

## Projeyi nasıl yürütürüz?

Uygulamalarınızı, bağımlılıklarını ve iş hedeflerini çıkarmakla başlarız. Ardından hesap yapısını, ağı ve kimlik katmanını kurarız. Taşınan her sistem test edilir, performansı ve erişimi doğrulandıktan sonra trafik yeni ortama yönlendirilir. İşletme döneminde maliyet raporları ve güvenlik bulguları belirli aralıklarla sizinle birlikte değerlendirilir.

## Tamamlayıcı hizmetler

AWS'in sizin için doğru platform olup olmadığını henüz bilmiyorsanız [bulut stratejisi ve iş yükü değerlendirmesi](/bulut-yedekleme/bulut-cozumleri/) ile başlarız. Verilerin korunması için [yedekleme mimarisi](/bulut-yedekleme/veri-yedekleme-cozumleri/), bölge çapında bir sorun için [felaket kurtarma planı](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) aynı projeye dahil edilebilir.

## Sonuçta sahip olduğunuz yapı

Birbirinden izole, kayıtları denetlenebilir hesaplar; tek noktadan yönetilen ve gereğinden fazla yetki vermeyen erişim; başka bölgeye kopyalanan merkezi yedekler; olağan dışı harcamada sizi uyaran bir maliyet düzeni. Satıcıdan bağımsız çalıştığımız için gerekirse AWS ile Azure'u birlikte kullanan bir yapı da tasarlarız.

AWS ortamınızı planlamak için [bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Tek AWS hesabıyla çalışıyoruz, ayırmamız gerekir mi?",
        answer:
          "Ortam büyüdükçe önerilir. Üretim, test ve ortak servisleri ayrı hesaplara almak bir hatanın etkisini sınırlar, yetkileri sadeleştirir ve faturayı daha okunur kılar.",
      },
      {
        question: "AWS mi Azure mı seçmeliyiz?",
        answer:
          "İki platform da olgundur. Ekibinizin deneyimi, kullandığınız uygulamalar, mevcut Microsoft lisanslarınız ve maliyet modeli kararı belirler. Bazı kurumlar için ikisini birlikte kullanmak da mantıklı olabilir.",
      },
      {
        question: "Şirket içindeki sistemlerle bağlantı kurulur mu?",
        answer:
          "Evet. Site-to-site VPN veya Direct Connect ile ofisiniz ve veri merkeziniz AWS'e bağlanır. İsim çözümleme ve Active Directory entegrasyonu bağlantıyla birlikte planlanır.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "veri-yedekleme-cozumleri",
    slug: "veri-yedekleme-cozumleri",
    title: "Veri Yedekleme (Backup) Çözümleri",
    metaDescription:
      "Veri yedekleme çözümleri: 3-2-1 kurgusu, sunucu ve Microsoft 365 yedeği, immutable kopya, bulut nüshası ve düzenli geri yükleme testleriyle güvence.",
    content: `Yedeğin değeri, ona ihtiyaç duyduğunuz gün ortaya çıkar. Sık gördüğümüz durum şudur: yazılım her gece "başarılı" raporu gönderir ama kimse son bir yılda tek bir sunucuyu geri yüklemeyi denememiştir. Fidye yazılımları da önce yedek sunucusunu bulup siler. Bu hizmet; verinizi doğru sıklıkla almayı, saldırgan erişemeyeceği bir yerde saklamayı ve geri dönebildiğinizi düzenli testlerle göstermeyi kapsar.

## İyi bir yedekleme kurgusunun özellikleri

En az üç kopya, iki farklı ortam ve bir nüshanın şirket dışında durması; buna ek olarak değiştirilemeyen ya da ağdan tamamen ayrılmış bir kopya ve hatasız tamamlandığı doğrulanmış işler. Bunun yanında her sistem için iki sorunun yanıtı yazılı olmalıdır: En fazla kaç saatlik veri kaybı kabul edilebilir (RPO) ve sistem ne kadar sürede geri gelmelidir (RTO)? Muhasebe veritabanı için bu yanıt birkaç saat olabilirken arşiv dosya sunucusu için bir gün de kabul edilebilir; yedekleme sıklığı ve depolama maliyeti bu farka göre ayarlanır.

## Yedekleme kapsamı

- 3-2-1-1-0 kuralının altyapınıza göre uyarlanması
- Fiziksel sunucu, sanal makine, veritabanı ve dosya paylaşımı yedeği
- Microsoft 365 posta kutuları, OneDrive, SharePoint ve diğer SaaS verileri
- Bulut veya ikinci lokasyonda kopya, bölgeler arası çoğaltma
- Immutable depolama ve ağdan ayrılmış (air-gapped) nüsha
- Yasal gerekliliklere uygun saklama süreleri
- Otomatik doğrulama, periyodik geri yükleme testi, hata alarmları ve raporlar

## Uygulama adımları

Önce hangi verinin kritik olduğunu ve her sistem için RPO/RTO hedefini sizinle birlikte belirleriz. Ardından yedekleme topolojisini, depolama hedeflerini ve saklama kurallarını tasarlarız. Kurulumda işler zamanlanır, başarısız iş olduğunda e-posta veya mesajla uyarı gelecek şekilde izleme bağlanır. Son ve en önemli adım testtir: seçilen sistemler izole bir ağda geri yüklenir ve sonuç raporlanır.

## Bağlantılı hizmetler

Bir sunucunun değil tüm merkezin çalışamaz hâle geldiği durumlar için [felaket kurtarma planı](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) gerekir. Veeam kullanıyorsanız doğru sürüm ve adet için [Veeam lisans hesaplaması](/lisanslama/veeam-lisanslama/) yaparız. Yedeği olmayan ya da bozulmuş veriler için [veri kurtarma hizmetimiz](/bulut-yedekleme/veri-kurtarma-hizmetleri/) devreye girer.

## Teslim ettiklerimiz

Fidye yazılımının silemeyeceği kopyalar, sistem bazında yazılı kurtarma hedefleri, test edilmiş ve raporlanmış geri yükleme senaryoları ve başarısız işleri aynı gün fark etmenizi sağlayan uyarılar. Satıcıdan bağımsız olduğumuz için mevcut yazılımınızla da çalışabiliriz.

Yedekleme düzeninizi birlikte incelemek için [ücretsiz keşif isteyin](/iletisim/).`,
    faq: [
      {
        question: "Yedeklerin gerçekten çalıştığını nasıl anlarız?",
        answer:
          "Otomatik doğrulamanın yanında planlı geri yükleme testi yaparız. Örnek sunucular üretimden ayrı bir ortamda açılır, uygulamanın çalıştığı kontrol edilir ve sonuç size raporlanır.",
      },
      {
        question: "Immutable yedek neden önemli?",
        answer:
          "Tanımlanan süre dolana kadar bu kopya değiştirilemez ve silinemez. Saldırgan yönetici yetkisi ele geçirse bile bu nüshayı bozamaz, bu da fidye yazılımı sonrasında temiz bir noktaya dönmenizi mümkün kılar.",
      },
      {
        question: "Kullandığımız yedekleme yazılımını değiştirmemiz gerekir mi?",
        answer:
          "Çoğu durumda gerekmez. Mevcut ürünü inceler, eksik kalan kısımları (şirket dışı kopya, değiştirilemez depolama, test) tamamlarız. Ürün ihtiyacı karşılamıyorsa gerekçesiyle alternatif öneririz.",
      },
      {
        question: "Maliyeti ne belirler?",
        answer:
          "Korunan sunucu ve kullanıcı sayısı, toplam veri hacmi, saklama süresi ve kopyanın tutulacağı yer başlıca etkenlerdir. Keşif sonrasında bu kalemleri ayrı ayrı gösteren bir teklif hazırlarız.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "felaket-kurtarma-disaster-recovery",
    slug: "felaket-kurtarma-disaster-recovery",
    title: "Felaket Kurtarma (Disaster Recovery)",
    metaDescription:
      "Felaket kurtarma (disaster recovery): RPO/RTO hedefleri, ikincil site veya buluta replikasyon, failover runbook'ları ve izole ortamda DR tatbikatları.",
    content: `Sunucu odasında yangın, tüm sanal makineleri şifreleyen bir fidye yazılımı ya da veri merkezinde uzun süren bir elektrik kesintisi. Böyle bir günde asıl soru "verimiz var mı?" değil, "işimiz ne zaman tekrar çalışır?" olur. Felaket kurtarma hizmetimiz, kritik sistemlerinizin önceden belirlenmiş bir sürede başka bir ortamda ayağa kalkmasını sağlayan altyapıyı ve yazılı prosedürleri kurar.

## Yedek varken neden DR gerekir?

Yedek, verinin bir kopyasıdır. Yalnızca yedekten dönmeye kalktığınızda önce donanım bulmanız, işletim sistemini kurmanız, ağı yapılandırmanız ve terabaytlarca veriyi geri yüklemeniz gerekir; bu günler sürebilir. DR ortamında sistemler sürekli kopyalanır ve hazırda bekler, geçiş saatler ya da dakikalar içinde yapılabilir. Her sistemi aynı hızda geri getirmek pahalıdır; bu nedenle ERP veya üretim planlama gibi uygulamalar için sıcak bekleyen bir kopya, ikincil sistemler için daha ekonomik bir yöntem seçmek çoğu zaman en dengeli çözümdür.

## DR projesinin kapsamı

- İş etki analizi ile hangi uygulamanın önce döneceğinin belirlenmesi
- Her sistem için kabul edilebilir veri kaybı (RPO) ve dönüş süresi (RTO)
- İkincil veri merkezine veya Azure Site Recovery gibi bulut hedeflerine replikasyon
- Planlı ve acil failover, ardından ana merkeze failback adımları
- DNS, Active Directory ve ağ yönlendirmesinin geçiş senaryoları
- Kimin hangi adımı atacağını gösteren runbook'lar
- Periyodik tatbikat ve yönetime sunulacak sonuç raporu

## Kurulum aşamaları

Önce iş birimlerinizle görüşerek kritik süreçleri, aralarındaki bağımlılıkları ve hedef süreleri çıkarırız. Ardından replikasyon teknolojisini, ikincil ortamın kapasitesini ve geçiş sırasını tasarlarız. Kurulumda kopyalama başlatılır ve her uygulama için adım adım runbook yazılır. Son olarak üretimi etkilemeyen bir tatbikatla geçiş denenir; ölçülen süreler hedeflerle karşılaştırılır, eksikler kapatılır.

## Yedekleme ve süreklilikle ilişkisi

DR'nin altında sağlam bir [yedekleme mimarisi](/bulut-yedekleme/veri-yedekleme-cozumleri/) olmalıdır; fidye yazılımında temiz bir noktaya dönmek ancak böyle mümkündür. Teknoloji dışındaki konular, yani personelin nerede çalışacağı ve müşteriye nasıl haber verileceği, [iş sürekliliği planı](/bulut-yedekleme/is-surekliligi-cozumleri/) kapsamında ele alınır.

## Proje sonunda elinizde olanlar

Sistem bazında yazılı ve ölçülmüş dönüş süreleri, şifrelenme olayından sonra temiz bir kopyadan açılabilen sunucular, kişiye bağlı kalmayan belgelenmiş prosedürler ve yönetim kuruluna ya da denetçiye sunulabilecek tatbikat raporları.

Kurtarma hedeflerinizi birlikte belirlemek için [bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "RPO ve RTO değerlerine kim karar verir?",
        answer:
          "Bu değerler iş birimleriyle birlikte belirlenir, çünkü her sistemin kesintisi işi farklı etkiler. Muhasebe veya üretim planlama gibi kritik uygulamalara dar hedefler, arşiv gibi sistemlere daha geniş hedefler verilir.",
      },
      {
        question: "İkinci bir veri merkezimiz yok, yine de DR kurulabilir mi?",
        answer:
          "Evet. Sunucular Azure Site Recovery gibi bir hizmetle buluta kopyalanabilir. Böylece ayrı bir fiziksel lokasyon kiralamadan felaket anında çalışacak bir ortamınız olur.",
      },
      {
        question: "Tatbikat yaparken sistemler durur mu?",
        answer:
          "Durmaz. Tatbikat üretimden yalıtılmış bir ağda ya da önceden duyurulmuş bir bakım penceresinde yapılır. Bu sırada geçişin kaç dakika sürdüğü ölçülür ve kayda geçirilir.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "is-surekliligi-cozumleri",
    slug: "is-surekliligi-cozumleri",
    title: "İş Sürekliliği Çözümleri",
    metaDescription:
      "İş sürekliliği çözümleri: iş etki analizi, BCP planları, kriz ekibi, iletişim planı ve tatbikatla kesinti anında kimin ne yapacağı önceden belli olsun.",
    content: `Bir kesinti yalnızca sunucuları değil, insanları da etkiler. Sistemler kapalıyken siparişler nasıl alınacak, maaş ödemesi geciktirilecek mi, müşteriye kim ve hangi cümlelerle bilgi verecek? Bu soruların yanıtı kriz anında aranırsa, kararlar aceleyle ve çoğu zaman yanlış verilir. İş sürekliliği hizmetimiz bu yanıtları önceden yazılı hâle getirir ve ekibinizin bunları uygulayabildiğini tatbikatla sınar.

## Teknolojiden fazlası

Felaket kurtarma sistemleri yeniden çalıştırmaya odaklanır. İş sürekliliği ise sistemler henüz dönmemişken işin nasıl süreceğini planlar: kâğıt formlarla geçici sipariş alma, başka bir ofisten veya evden çalışma, kritik tedarikçiye alternatif bulma, karar yetkisinin kimde olduğu. Bu yüzden çalışmaya IT ekibinin yanında operasyon, finans ve insan kaynakları da katılır. Basit bir örnek: kriz ekibinin telefon listesi yalnızca e-posta sunucusunda duruyorsa, o sunucu kapandığında kimse kimseye ulaşamaz. Planın basılı ve çevrim dışı bir kopyası bu yüzden önemlidir.

## Çalışmanın kapsamı

- İş etki analizi: kritik süreçler, bağımlılıklar ve kesintinin saatlik maliyeti
- Yangın, siber saldırı, tedarikçi kaybı gibi senaryolara göre süreklilik planları (BCP)
- Kriz ekibi, roller, karar yetkileri ve toplanma akışı
- Çalışanlar, müşteriler, tedarikçiler ve gerekirse kamu kurumları için iletişim şablonları
- Alternatif çalışma yeri ve uzaktan çalışma hazırlığı
- Kritik tedarikçi ve hizmet sağlayıcı bağımlılıklarının yönetimi
- Masa başı ve sahada tatbikat, planın güncel tutulması
- İsteğe bağlı olarak ISO 22301 yapısına uygun dokümantasyon

## Adım adım ilerleyiş

İlk olarak süreçlerinizi haritalar, her birinin ne kadar süre durabileceğini birlikte belirleriz. Sonra senaryo bazlı süreklilik ve kriz yönetimi planlarını yazarız. Hazırlık aşamasında roller kişilere atanır, iletişim listeleri ve şablonlar hazırlanır. Son olarak bir tatbikat düzenlenir; aksayan noktalar plana işlenir.

## Diğer çalışmalarla bağlantısı

Sistemlerin teknik olarak geri getirilmesi [felaket kurtarma (DR) hizmetimizin](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) konusudur ve iki plan birbirine referans verir. Bilgi güvenliği yönetim sistemi kuruyorsanız süreklilik kontrollerini [ISO 27001 danışmanlığı](/danismanlik/iso-27001-bilgi-guvenligi-danismanligi/) ile aynı çatı altında ele alırız; ISO 27001 baş denetçi deneyimimiz burada doğrudan işe yarar.

## Hazırlığın size kazandırdıkları

Kriz anında daha az doğaçlama, rolünü bilen bir ekip, müşteri ve tedarikçilere tutarlı mesajlar ve ihale ya da müşteri denetimlerinde gösterebileceğiniz yazılı süreklilik kanıtı.

Hazırlık seviyenizi değerlendirmek için [ücretsiz ön görüşme isteyin](/iletisim/).`,
    faq: [
      {
        question: "Küçük bir şirketiz, bu çalışma bize ağır gelmez mi?",
        answer:
          "Kapsam şirketin büyüklüğüne göre küçültülür. Küçük bir işletmede bile en kritik birkaç sürecin yazılı planı, güncel bir telefon listesi ve basit bir kriz akışı büyük fark yaratır.",
      },
      {
        question: "ISO 22301 belgesi almak şart mı?",
        answer:
          "Şart değil. Çoğu şirket için uygulanan bir plan ve düzenli tatbikat yeterlidir. Belgelendirmeyi yalnızca bir müşteri sözleşmesi veya ihale şartı gerektiriyorsa hedefleriz.",
      },
      {
        question: "Plan hazırlandıktan sonra eskimez mi?",
        answer:
          "Eskimemesi için her bölümün bir sahibi olur ve gözden geçirme takvimi belirlenir. Organizasyon, tedarikçi ya da sistem değiştiğinde plan güncellenir; tatbikatlar da güncelleme ihtiyacını ortaya çıkarır.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "veri-kurtarma-hizmetleri",
    slug: "veri-kurtarma-hizmetleri",
    title: "Veri Kurtarma Hizmetleri",
    metaDescription:
      "Veri kurtarma hizmetleri: silinen dosyalar, bozulan RAID, NAS, SQL veritabanı ve sanal makine diskleri için imaj alarak kontrollü kurtarma çalışması.",
    content: `Bir RAID dizisi çöktüğünde, önemli bir klasör yanlışlıkla silindiğinde ya da veritabanı açılmaz hâle geldiğinde atılan ilk adımlar sonucu belirler. Veri kurtarma hizmetimiz, aygıta daha fazla zarar vermeden durumu tespit eder, mümkünse birebir kopya alır ve verinizi bu kopya üzerinden kontrollü biçimde geri çıkarır.

## Şu anda veri kaybı yaşıyorsanız

Diske yazmayı hemen bırakın, sistemi kapatın. Onarım aracı çalıştırmayın, RAID'i yeniden oluşturmaya ya da diskleri farklı sırayla takmaya çalışmayın, dosya sistemini biçimlendirmeyin. Bu müdahaleler, kurtarılabilir durumdaki veriyi kalıcı olarak kaybettirebilir. Ardından bize ulaşın; ilk değerlendirmeyi birlikte yapalım. Görüşmede olayın nasıl başladığını, aygıtın marka ve modelini, RAID seviyesini ve kayıptan sonra yapılan işlemleri sorarız; bu bilgiler kurtarma şansını tahmin etmenin temelidir.

## Kurtarma kapsamı

- Mantıksal hata yaşayan HDD ve SSD'lerden veri çıkarma
- Çöken RAID dizilerinin parametrelerini bulup yapıyı yeniden kurma
- Sunucu, NAS ve SAN üzerinde silinen bölüm ve bozulan dosya sistemi kurtarma
- SQL Server, MySQL ve PostgreSQL veritabanlarında tutarlılık onarımı
- VMDK ve VHDX sanal diskleri ile snapshot zincirlerinin kurtarılması
- Yanlışlıkla silme, biçimlendirme ve şifreleme sonrası dosya kurtarma
- Kurtarılan verinin bütünlük kontrolü ve güvenli teslimi

## Müdahale sırası

Önce ne olduğunu dinler, aygıtın durumunu inceler ve verinin hangi ölçüde geri alınabileceğini size açıkça söyleriz. İkinci adımda, mümkün olan her durumda aygıtın birebir imajını alırız; tüm çalışma bu kopya üzerinde yapılır, orijinal diske dokunulmaz. Ardından duruma uygun araç ve yöntemle veri çıkarılır, klasör ya da veritabanı yapısı yeniden oluşturulur. Son olarak dosyaların açılabildiği kontrol edilir ve veri yalnızca yetkili kişiye teslim edilir.

## Bir daha yaşamamak için

Kurtarma bir acil durum müdahalesidir ve her zaman sonuç vermeyebilir. Kalıcı çözüm, test edilmiş bir [yedekleme düzeni](/bulut-yedekleme/veri-yedekleme-cozumleri/) ve kritik sistemler için bir [felaket kurtarma planıdır](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/). Kurtarma tamamlandığında olayın nedenine yönelik önerilerimizi de yazılı olarak paylaşırız.

## Bizden bekleyebilecekleriniz

Kritik bir kayıpta hızlı ve sakin bir müdahale, delili ve orijinal aygıtı koruyan bir çalışma yöntemi, kurtarma şansının baştan dürüstçe söylenmesi ve benzer bir olayı önlemek için somut adımlar. 7/24 teknik destek hattımız acil durumlarda da ulaşılabilir.

Veri kaybı yaşıyorsanız aygıtı kullanmayı bırakın ve [hemen bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Kaybolan her veri geri getirilebilir mi?",
        answer:
          "Hayır. Sonuç; verinin üzerine yazılıp yazılmadığına, aygıttaki hasarın türüne ve şifreleme olup olmadığına bağlıdır. İlk değerlendirmede neyin kurtarılabileceğini ve neyin zor olduğunu açıkça söyleriz.",
      },
      {
        question: "Kurtarma işlemi ne kadar sürer?",
        answer:
          "Basit silme ve mantıksal hatalar genellikle birkaç gün içinde sonuçlanır. Çok diskli RAID ve büyük veritabanlarında süre uzayabilir; acil durumlarda öncelikli çalışma planlanabilir.",
      },
      {
        question: "Verilerimizin gizliliği nasıl korunur?",
        answer:
          "Çalışma öncesinde gizlilik taahhüdü verilir. Kurtarılan veri yalnızca sizin belirlediğiniz kişilere teslim edilir ve iş bittiğinde elimizdeki çalışma kopyaları güvenli biçimde imha edilir.",
      },
      {
        question: "Fiziksel olarak hasar görmüş diskle de ilgileniyor musunuz?",
        answer:
          "Hizmetimiz mantıksal hatalar, RAID, dosya sistemi ve veritabanı senaryolarına odaklanır. Fiziksel hasar şüphesi varsa ilk değerlendirmede bunu belirtir ve aygıtı açmadan nasıl ilerlenebileceğini sizinle konuşuruz.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Yazılım & Dijital
  // ─────────────────────────────────────────────────────────────────────────
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "ozel-yazilim-gelistirme",
    slug: "ozel-yazilim-gelistirme",
    title: "Özel Yazılım Geliştirme",
    metaDescription:
      "Özel yazılım geliştirme: hazır paketlerin karşılamadığı iş süreçleriniz için analiz, arayüz tasarımı, entegrasyon, test ve bakımı kapsayan kurumsal yazılım.",
    content: `Bazı süreçler hiçbir hazır programa tam oturmaz: teklif hazırlama kuralları size özeldir, onay zinciri birkaç departmanı dolaşır ya da veriler üç farklı sistemden toplanır. Özel yazılım geliştirme hizmetimizde bu süreçleri sizin işleyişinize göre tasarlanmış bir uygulamaya dönüştürüyoruz. İhtiyaç analizinden canlıya almaya ve sonrasındaki bakıma kadar tek bir ekip sorumluluk alır.

## Hazır paket mi, size özel yazılım mı?

Kullandığınız program işin büyük kısmını görüyor ama aradaki boşluklar her ay Excel dosyaları, e-posta zincirleri ve elle veri girişiyle kapatılıyorsa, ya da rakiplerinizden ayrıştığınız nokta tam da bu süreçse, özel yazılım mantıklı bir yatırımdır. Tersine, sektörünüzde standart hale gelmiş bir işi yeniden yazmak çoğu zaman gereksizdir; bunu ilk görüşmede açıkça söyleriz.

## Geliştirme kapsamı

- İş analizi, süreç haritası ve yazılı gereksinim dokümanı
- Kullanıcı deneyimi ve ekran tasarımı
- Güvenli mimariyle web tabanlı uygulama geliştirme
- ERP, muhasebe, e-posta ve ödeme sistemleriyle API bağlantıları
- Rol bazlı yetkilendirme ve kim, neyi, ne zaman değiştirdi kaydı
- Test, kullanıcı kabulü ve devreye alma
- KVKK'ya uygun veri işleme ve saklama kuralları
- Bakım, yeni özellik geliştirme ve teknik destek

## Projeyi nasıl ilerletiyoruz?

Keşif aşamasında süreci, kullanıcıları ve bağlanılacak sistemleri birlikte çıkarır, ilk sürümde olması gerekenlerle sonraya kalabilecekleri ayırırız. Tasarımda veri modeli, mimari ve ekran akışları netleşir. Geliştirme kısa döngülerle yapılır; her döngünün sonunda çalışan bir bölümü size gösterir, geri bildiriminizi bir sonraki adıma yansıtırız. Testler ve kabulün ardından uygulama canlıya alınır, bakım sözleşmesiyle geliştirilmeye devam eder.

## BTM Bilişim'i farklı kılan noktalar

Analiz, kodlama, test ve bakımı dışarıya devretmeden kendi yazılım ekibimizle yaparız; proje boyunca muhatabınız değişmez. Güvenlik sonradan eklenen bir katman değil, ilk günden tasarımın parçasıdır: yetki kontrolleri, kayıt tutma ve OWASP önerileri baştan uygulanır, teslim öncesinde uygulama [sızma testi](/siber-guvenlik/sizma-testi-penetrasyon-testi/) ile sınanabilir. 2010'dan beri sürdürdüğümüz altyapı ve IT danışmanlığı deneyimi sayesinde yazılımın çalışacağı sunucu, ağ ve yedekleme tarafını da aynı planda düşünürüz.

## Kendi ürünlerimizden örnekler

Aynı ekip; çok firmalı İK izin yönetimi platformu [Otium](/yazilim-urunlerimiz/otium/), IT operasyon platformu [Orbit](/yazilim-urunlerimiz/orbit/) ve Atlas, PentForce gibi toplam 9 kurumsal ürünü geliştirdi ve hâlâ geliştiriyor. Yazılımın şirketinizin genel dijitalleşme planına nasıl oturacağını [dijital dönüşüm danışmanlığı](/danismanlik/yazilim-ve-dijital-donusum-danismanligi/) ile birlikte ele alırız.

Fikrinizi ya da yazılıma dökmek istediğiniz süreci anlatın, birlikte değerlendirelim. [İletişime geçin](/iletisim/).`,
    faq: [
      {
        question: "Fiyatlandırma nasıl yapılıyor?",
        answer:
          "Kapsamı net projelerde aşamalara bölünmüş sabit fiyat; ihtiyaçların zamanla şekilleneceği ürünlerde kısa döngüler üzerinden ilerleyen bir model öneririz. Fiyatı ekran ve süreç sayısı, entegrasyonlar ve yetki yapısının karmaşıklığı belirler.",
      },
      {
        question: "Kaynak kodun sahibi kim olacak?",
        answer:
          "Sözleşmede aksi belirtilmedikçe kaynak kod ve veriler size aittir. Teslimatla birlikte kod deposuna erişim ve teknik dokümantasyon verilir.",
      },
      {
        question: "İlk sürümü ne zaman kullanmaya başlarız?",
        answer:
          "Süre, ilk sürüme alınan özelliklere bağlıdır. Keşif aşamasının sonunda kapsamı ve takvimi birlikte netleştirir, en çok değer üreten bölümü öne alırız.",
      },
      {
        question: "Yazılım bittikten sonra destek veriyor musunuz?",
        answer:
          "Evet. Bakım sözleşmesiyle hata düzeltmeleri, güvenlik güncellemeleri ve yeni özellik talepleri aynı ekip tarafından karşılanır.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "web-uygulama-gelistirme",
    slug: "web-uygulama-gelistirme",
    title: "Web Uygulama Geliştirme",
    metaDescription:
      "Web uygulama geliştirme: bayi ve müşteri portalları, B2B sipariş sistemleri, onay akışları ve ERP entegrasyonlu, tarayıcıdan çalışan güvenli iş uygulamaları.",
    content: `Bayileriniz siparişlerini telefonla, müşterileriniz servis taleplerini e-postayla, çalışanlarınız izin ve satın alma onaylarını kâğıt formlarla iletiyorsa, bu işlerin her biri tarayıcıdan çalışan bir uygulamaya taşınabilir. Web uygulama geliştirme hizmetimizde kurulum gerektirmeyen, her cihazdan güvenle erişilen ve mevcut sistemlerinizle konuşan iş uygulamaları geliştiriyoruz.

## Web uygulaması hangi işler için uygundur?

Farklı şehirlerden ve cihazlardan kullanılan, sık güncellenen ve kullanıcının bilgisayarına program kurulmasını istemediğiniz süreçler için web uygulaması en pratik yoldur. Güncelleme tek bir sunucuda yapılır ve herkes aynı anda yeni sürüme geçer. Kamera, çevrimdışı çalışma veya cihaz donanımına derin erişim gerektiren durumlarda ise ayrı bir mobil uygulama gündeme gelebilir. Karar verirken kullanıcı sayısına, hangi cihazlardan bağlanılacağına ve verinin şirket dışına ne ölçüde açılacağına birlikte bakarız; dışarıya açılan her ekran için oturum güvenliği, parola politikası ve gerekirse ikinci doğrulama adımı planlanır.

## Hangi uygulamaları geliştiriyoruz? — kapsam

- Kurum içi portal ve intranet uygulamaları
- Müşteri, bayi ve tedarikçi self-servis panelleri
- B2B sipariş, teklif ve servis takip sistemleri
- Form ve onay akışına dayalı süreç uygulamaları
- ERP, muhasebe ve CRM ile çift yönlü veri bağlantısı
- Rol bazlı erişim ve birden çok firmayı ayıran (multi-tenant) yapı
- Telefon, tablet ve masaüstüne uyum sağlayan arayüz
- Performans, güvenlik ve KVKK gereklilikleri

## Geliştirme süreci

İlk adımda kullanıcı rollerini, ekranları ve bağlanılacak sistemleri listeleriz. Ardından tıklanabilir bir prototip hazırlanır; böylece kodlamaya başlamadan önce akışın sizin ve kullanıcılarınızın beklentisine uyduğunu görürsünüz. Geliştirme kısa döngülerle ilerler ve her döngü test edilir. Yayına alındıktan sonra uygulamanın hızı ve hataları izlenir, yeni ihtiyaçlar sırayla eklenir. Uygulamayı kendi sunucunuzda, bulut hesabınızda ya da bizim yönettiğimiz bir ortamda barındırabilirsiniz.

## Neden kendi yazılım ekibimizle?

Uygulamayı geliştiren ekip, altyapı ve güvenlik tarafında da 2010'dan beri sahada çalışan bir şirketin parçasıdır. Bu yüzden yetkilendirme, kayıt tutma, yedekleme ve sunucu güvenliği sonradan düşünülmez. Kapsam büyüyüp birden çok sistemi kapsayan bir projeye dönüşürse [özel yazılım geliştirme](/yazilim-dijital/ozel-yazilim-gelistirme/) yaklaşımıyla, farklı uygulamalar arasında veri taşınması gerekiyorsa [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/) ile birlikte ilerleriz.

## İşinize yansıyan sonuçlar

Telefon ve e-posta ile gelen taleplerin kendi kendine işlem yapılan bir panele taşınması, siparişlerin ERP'ye elle girilmeden düşmesi, her işlemin kim tarafından yapıldığının kayıt altında olması ve kullanıcıların herhangi bir cihazdan güvenle bağlanabilmesi.

Aklınızdaki web uygulamasını konuşalım. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Uygulama mevcut ERP sistemimizle veri alışverişi yapabilir mi?",
        answer:
          "Evet. Logo, SAP, Mikro, Netsis gibi sistemlerle API ya da veritabanı üzerinden bağlantı kurarak sipariş, stok ve cari bilgisinin iki yönlü akmasını sağlarız.",
      },
      {
        question: "Uygulama nerede çalışacak?",
        answer:
          "Kendi sunucunuzda, kendi bulut hesabınızda ya da bizim yönettiğimiz bir ortamda barındırılabilir. Yedekleme ve izleme düzeni seçtiğiniz ortama göre kurulur.",
      },
      {
        question: "Ayrıca mobil uygulama yaptırmamız gerekir mi?",
        answer:
          "Çoğu iş uygulamasında telefona uyumlu web arayüzü yeterlidir. Çevrimdışı çalışma, barkod okuma veya kamera kullanımı gibi ihtiyaçlar varsa mobil uygulama seçeneğini birlikte değerlendiririz.",
      },
      {
        question: "Maliyeti hangi unsurlar belirler?",
        answer:
          "Kullanıcı rolleri ve ekran sayısı, entegre edilecek sistemler, yetki yapısının karmaşıklığı ve barındırma tercihi maliyeti belirler. Keşif görüşmesinden sonra kapsamı yazılı hale getirip teklif sunarız.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "web-tasarim-ve-kurumsal-web-sitesi",
    slug: "web-tasarim-ve-kurumsal-web-sitesi",
    title: "Kurumsal Web Tasarım",
    metaTitle: "Web Tasarım Hizmetleri | BTM Bilişim",
    metaDescription:
      "Kurumsal web sitesi tasarımı: mobil öncelikli, hızlı açılan, teknik SEO altyapısı hazır, KVKK uyumlu ve içeriğini kendinizin yönetebileceği web siteleri.",
    content: `Size bir tavsiye üzerine ulaşan potansiyel müşteri bile aramadan önce çoğu zaman telefonundan web sitenize bakar. Sayfa geç açılıyorsa, hizmetlerinizi anlatmıyorsa ya da teklif isteyecek bir buton bulamıyorsa o fırsat sessizce kaybolur. Web tasarım ve kurumsal web sitesi hizmetimizde markanızı net anlatan, arama motorlarında bulunabilen ve size gerçek talep getiren bir site kuruyoruz.

## İyi bir kurumsal sitenin ölçütleri

Telefonda birkaç saniye içinde açılır, Core Web Vitals değerleri iyidir. Ziyaretçi ne iş yaptığınızı ilk ekranda anlar ve teklif, arama veya WhatsApp gibi iletişim yollarına tek dokunuşla ulaşır. Sayfa yapısı arama motorlarının anlayacağı şekilde temizdir. Yeni bir hizmet ya da haber eklemek için ajansa yazmanız gerekmez.

## Web sitesi projesinin kapsamı

- Bilgi mimarisi, sayfa planı ve içerik kurgusu
- Kurumsal kimliğinize uygun arayüz ve kullanıcı deneyimi tasarımı
- Hızlı yüklenen, performans odaklı kodlama
- Teknik SEO: başlık yapısı, meta veriler, site haritası ve schema.org yapısal verisi
- Blog, hizmet ve referans sayfalarını düzenleyebileceğiniz yönetim paneli
- İsteğe bağlı çok dilli yapı
- Teklif formu, harita, WhatsApp ve dönüşüm takibi entegrasyonları
- Google Analytics ve Search Console kurulumu

## Bizimle çalışmanın farkı

Tasarım, kodlama, yayın ve bakımı dışarıya iş vermeden kendi yazılım ekibimizle yaparız; sitenizi yapan ekiple sonra konuşan ekip aynıdır. Siber güvenlik tarafındaki deneyimimiz siteye doğrudan yansır: güvenlik başlıkları ayarlanır, bileşenler güncel tutulur, yönetim paneli korunur; dilerseniz yayın öncesinde [sızma testi](/siber-guvenlik/sizma-testi-penetrasyon-testi/) de yapılır. Ziyaretçilerin büyük bölümü mobilden geldiği için tasarıma telefon ekranından başlar, ardından tablet ve masaüstüne genişletir, her ekranda test ederiz. Çerez onayı, aydınlatma metni ve form verilerinin güvenli saklanması gibi KVKK gereklilikleri de projenin başında kurgulanır.

## Proje adımları

Önce hedef kitlenizi, rakiplerinizi ve sitenin hangi eylemi doğurması gerektiğini konuşuruz. Sayfa şablonları tasarlanıp onayınıza sunulur. Onaydan sonra site kodlanır, içerikler girilir ve eski siteden gelen adresler için yönlendirmeler kurulur. Yayından sonra analitik veriler izlenir ve ilk iyileştirmeler yapılır.

## Siteyi büyütmek istediğinizde

Bayi girişi veya müşteri paneli gibi özel modüller gerektiğinde [web uygulama geliştirme](/yazilim-dijital/web-uygulama-gelistirme/) ile siteyi genişletiriz. Formlardan gelen taleplerin CRM veya ERP'ye kendiliğinden aktarılması için [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/) devreye girer.

Mevcut sitenizi yenilemek ya da sıfırdan başlamak için [bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Eski sitemizdeki içerikler ve Google sıralamamız ne olacak?",
        answer:
          "Mevcut metin, görsel ve sayfalar gözden geçirilerek yeni yapıya aktarılır. Değişen adresler için 301 yönlendirmeleri kurulur, böylece arama motorlarındaki birikim mümkün olduğunca korunur.",
      },
      {
        question: "Sitede değişiklik yapmak için size bağımlı kalır mıyız?",
        answer:
          "Hayır. Blog, hizmet ve referans içeriklerini düzenleyebileceğiniz bir yönetim paneli teslim edilir ve ekibinize kısa bir kullanım eğitimi verilir.",
      },
      {
        question: "Google'da ilk sıraya çıkacağımızı garanti ediyor musunuz?",
        answer:
          "Hayır, sıralama garantisi kimse veremez. Biz hız, sayfa yapısı, meta veriler, yapısal veri ve site haritası gibi teknik temeli doğru kurar, ölçüm araçlarını hazır şekilde teslim ederiz.",
      },
      {
        question: "Web sitesi fiyatını ne belirler?",
        answer:
          "Sayfa sayısı, özel tasarım ihtiyacı, çok dilli yapı, entegrasyonlar ve içeriklerin kimin tarafından hazırlanacağı fiyatı belirler. İlk görüşme ücretsizdir; ihtiyaçlarınızı dinledikten sonra teklif hazırlarız.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "api-ve-sistem-entegrasyonlari",
    slug: "api-ve-sistem-entegrasyonlari",
    title: "API Entegrasyon Hizmetleri",
    metaDescription:
      "API ve sistem entegrasyonları: REST/SOAP API, webhook ve zamanlanmış veri aktarımıyla ERP, CRM, e-ticaret ve banka sistemleriniz arasında izlenen veri akışı.",
    content: `E-ticaret sitenize gelen sipariş muhasebeye elle giriliyor, CRM'deki müşteri bilgisi ERP'deki cari kartla tutmuyor, banka hareketleri her sabah Excel'e aktarılıyorsa, sistemleriniz birbiriyle konuşmuyor demektir. API ve sistem entegrasyonları hizmetimizde bu uygulamalar arasında güvenli, kayıt altında ve hata durumunda haber veren bir veri akışı kuruyoruz.

## Bağlantısız sistemlerin bedeli

Aynı bilgiyi iki ayrı ekrana yazmak hem personelin zamanını alır hem de yazım hatalarına kapı açar. Ay sonunda rakamlar tutmadığında hangi sistemin doğru olduğunu bulmak için saatler harcanır. Stok bilgisinin geç güncellenmesi ise elde olmayan ürünün satılmasına yol açabilir. Entegrasyon kurulmadan yapılan geçici çözümler de zamanla sorun yaratır: bir personelin bilgisayarında çalışan makrolar, kimsenin sahiplenmediği aktarım dosyaları ve o kişi ayrıldığında duran süreçler. Doğru kurulmuş bir entegrasyon belgelenir, izlenir ve kişiden bağımsız çalışır.

## Entegrasyon kapsamı

- REST ve SOAP API tasarımı, geliştirilmesi ve dokümantasyonu
- ERP, CRM, e-ticaret, banka, kargo ve e-fatura sistemlerinin API'lerine bağlantı
- Webhook ile olay anında tetiklenen akışlar
- Zamanlanmış toplu veri aktarımı ve senkronizasyon
- Tüm bağlantıları tek merkezden yöneten entegrasyon katmanı
- Kimlik doğrulama, yetkilendirme ve istek sınırlama
- Alan eşleştirme ve veri dönüştürme kuralları
- Hatalı aktarımlar için yeniden deneme, alarm ve raporlama

## Çalışma şeklimiz

Önce hangi verinin, hangi sistemden hangisine, hangi sıklıkla gitmesi gerektiğini birlikte belirleriz. Ardından iki tarafın alanları eşleştirilir, hata senaryoları yazılır: karşı sistem yanıt vermezse ne olacak, aynı kayıt iki kez gelirse nasıl ayıklanacak gibi. Entegrasyon önce test ortamında uçtan uca denenir, sonra canlıya alınır. Canlıda her akış izlenir; başarısız bir aktarım olduğunda sorumlu kişiye bildirim gider. Entegrasyonun teknik dokümanı ve akış şeması da size teslim edilir.

## API'si olmayan sistemler ne olacak?

Her yazılımın hazır bir API'si yoktur. Bu durumda veritabanı görünümleri, dosya tabanlı aktarım ya da güvenli bir ara servis gibi alternatif yollar kullanılır. Her yöntemin riskini ve bakım ihtiyacını başlamadan önce açıkça paylaşırız. Kendi yazılım ekibimiz bu bağlantıları geliştirirken, sistemlerin çalıştığı sunucu ve ağ tarafını da bildiği için güvenlik duvarı ve erişim kurallarını da aynı projede düzenler.

## İlgili çalışmalar

ERP merkezli bağlantılar için [ERP entegrasyonları](/yazilim-dijital/erp-entegrasyonlari/), veri akışının üzerine onay ve görev kuralları eklenecekse [iş süreci otomasyonları](/yazilim-dijital/is-sureci-otomasyonlari/) ile birlikte çalışırız.

Sistemleriniz arasındaki veri akışını birlikte haritalayalım. [İletişime geçin](/iletisim/).`,
    faq: [
      {
        question: "Kullandığımız programın API'si yok, entegrasyon yine de mümkün mü?",
        answer:
          "Çoğu zaman mümkündür. Veritabanı görünümleri, dosya aktarımı veya ara servis gibi alternatif yöntemlerle güvenli bir akış kurulabilir; yöntemin sınırlarını baştan konuşuruz.",
      },
      {
        question: "Bir aktarım hata verirse bundan nasıl haberimiz olur?",
        answer:
          "Her akış izlenir. Aktarım başarısız olduğunda, geciktiğinde ya da veriler uyuşmadığında belirlenen kişilere bildirim gider ve sistem işlemi otomatik olarak yeniden dener.",
      },
      {
        question: "Verinin anlık mı aktarılması gerekir?",
        answer:
          "İhtiyaca bağlıdır. Stok ve fiyat gibi bilgilerde anlık aktarım önemlidir; muhasebe kayıtlarında saatlik veya günlük toplu aktarım genellikle yeterlidir ve daha az sorun çıkarır.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "erp-entegrasyonlari",
    slug: "erp-entegrasyonlari",
    title: "ERP Entegrasyonları",
    metaDescription:
      "ERP entegrasyonları: SAP, Logo, Mikro, Netsis ve Dynamics'i e-ticaret, pazaryeri, CRM, banka, POS ve e-fatura sistemlerine çift yönlü bağlayan çözümler.",
    content: `ERP, şirketin muhasebe, stok ve satış kayıtlarının toplandığı merkezdir; ancak çevresindeki uygulamalarla bağlantısı yoksa bu merkez yalnız kalır. ERP entegrasyonları hizmetimizde ERP'nizi e-ticaret siteniz, pazaryerleri, CRM, banka, e-belge ve depo sistemleriyle çift yönlü ve izlenebilir şekilde konuşturuyoruz.

## Tipik tablo: ERP var ama veriler elle taşınıyor

Pazaryerinden gelen siparişler her gün bir personel tarafından ERP'ye yazılıyor, banka ekstreleri tahsilatlarla elle eşleştiriliyor, satış ekibi CRM'de güncel bakiyeyi göremiyor. Bu düzen hem iş gücü tüketir hem de raporların güvenilirliğini zayıflatır; yoğun dönemlerde ise siparişlerin gecikmesine yol açar. Kampanya günlerinde pazaryerine giden stok bilgisinin saatlerce güncellenmemesi, iptal edilen siparişler ve olumsuz mağaza puanı olarak geri döner. Muhasebe ekibi de ay sonunda farkları kapatmakla uğraşırken asıl işi olan analiz ve kontrol geri planda kalır.

## Çalıştığımız sistemler ve kapsam

- SAP, Logo (Tiger, GO, j-Platform), Mikro, Netsis, Microsoft Dynamics, DİA, Nebim ve benzeri ERP'ler
- E-ticaret ve pazaryeri bağlantıları: sipariş, stok, fiyat, kargo ve iade
- CRM tarafında cari, teklif, sipariş ve bakiye senkronizasyonu
- Banka ve POS hareketlerinin tahsilatlarla otomatik eşleştirilmesi
- e-Fatura, e-İrsaliye ve e-Arşiv süreçleri
- Üretim, depo ve el terminali (WMS) sistemleri
- Bütçe ve raporlama araçlarına veri aktarımı
- Eşleştirme kuralları, hata yönetimi ve izleme

## Projenin adımları

Önce ERP tarafındaki stok kartı, cari, sipariş ve fatura gibi nesnelerin karşı sistemdeki alanlarla nasıl eşleşeceğini belirleriz. Ardından akışın yönü, sıklığı, neyin tetikleyeceği ve hata durumunda ne olacağı yazılır. Geliştirme ERP'nin test firması veya test dönemi üzerinde yapılır, böylece canlı kayıtlarınız etkilenmez. Canlıya geçiş kontrollü yapılır ve ilk günler yakından izlenir. Ağır işlemler ERP'yi yavaşlatmaması için mesai dışına planlanır.

## Logo ve raporlama tarafı

Logo kullanan şirketler için entegrasyonun ötesinde parametre, kullanıcı ve performans konularında [Logo ERP destek ve danışmanlık](/danismanlik/logo-erp-destek-ve-danismanlik/) hizmeti veriyoruz. ERP'deki gerçekleşen rakamları bütçeyle karşılaştırmak isteyen yöneticiler için kendi geliştirdiğimiz bütçe ve raporlama yazılımı [Atlas](/yazilim-urunlerimiz/atlas/) ERP'den doğrudan veri alarak çalışır.

## Entegrasyon sonrası değişenler

Siparişler ERP'ye kendiliğinden düşer, banka mutabakatı dakikalar içinde tamamlanır, stok ve fiyat bilgisi tüm satış kanallarında aynı olur, e-belgeler ERP içinden kesilir. Personeliniz veri taşımak yerine istisnai durumlarla ilgilenir.

ERP'nizin hangi sistemlere bağlanması gerektiğini birlikte çıkaralım. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "ERP sürümümüz eski, entegrasyon yapılabilir mi?",
        answer:
          "Çoğu durumda yapılabilir. Eski sürümlerde API desteği sınırlıysa veritabanı veya dosya tabanlı güvenli yöntemler kullanılır; bu yöntemlerin riskleri ve sürüm yükseltme seçeneği önceden konuşulur.",
      },
      {
        question: "Entegrasyon ERP'nin performansını düşürür mü?",
        answer:
          "Doğru kurgulandığında düşürmez. Toplu işlemler mesai dışına veya belirli zaman aralıklarına alınır, anlık sorgular sınırlanır ve ERP üzerindeki yük izlenir.",
      },
      {
        question: "ERP'yi aynı anda birçok sisteme bağlayabilir misiniz?",
        answer:
          "Evet. Her sistem için ayrı ayrı bağlantı yazmak yerine merkezi bir entegrasyon katmanı kurmak, bakımı kolaylaştırır ve yeni bir sistem eklemeyi hızlandırır.",
      },
      {
        question: "Proje süresi ve maliyeti neye bağlı?",
        answer:
          "Bağlanacak sistem sayısı, aktarılacak veri türleri, karşı sistemlerin API olgunluğu ve özel iş kurallarının sayısı belirleyicidir. Analizden sonra kapsamı yazılı hale getirip takvim ve teklif sunarız.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "is-sureci-otomasyonlari",
    slug: "is-sureci-otomasyonlari",
    title: "İş Süreci Otomasyonları",
    metaDescription:
      "İş süreci otomasyonları: onay akışları, sistemler arası veri aktarımı, otomatik raporlama ve RPA ile tekrarlayan manuel işleri yazılıma devredin.",
    content: `Her ay aynı raporu farklı sistemlerden toplayıp hazırlayan, faturaları tek tek kontrol edip başka bir ekrana aktaran ya da onay için e-posta zincirlerini takip eden çalışanlarınız varsa, bu işlerin önemli bölümü yazılıma bırakılabilir. İş süreci otomasyonları hizmetimizde kuralı belli, sık tekrarlanan işleri otomatik hale getiriyor; ekibinizin zamanını karar ve müşteri ilişkisi gerektiren işlere açıyoruz.

## Otomasyon için iyi adaylar

Sık tekrarlanan, kuralları açık ve birden çok kişi ya da sistem arasında gidip gelen işler en hızlı sonucu verir: satın alma ve izin onayları, veri girişi ve aktarımı, periyodik raporların hazırlanıp gönderilmesi, mutabakat kontrolleri, belge ve form işleme, hatırlatma bildirimleri. Her seferinde farklı yorum gerektiren işler ise otomasyona uygun değildir; bunları baştan ayırırız. Bozuk bir süreci olduğu gibi otomatikleştirmek de hatayı sadece hızlandırır, bu yüzden gerekirse önce adımları sadeleştiririz.

## Otomasyon kapsamı

- Süreçlerin incelenmesi, fayda ve zorluk dengesine göre önceliklendirme
- Onay ve iş akışı uygulamaları
- Sistemler arasında veri aktarımı ve senkronizasyon
- API'si olmayan uygulamalar için robotik süreç otomasyonu (RPA)
- Raporların otomatik üretilmesi ve dağıtılması
- E-posta, belge ve form kaynaklı süreçlerin otomasyonu
- İstisnaların yönetimi ve insan onayı gereken noktalar
- Otomasyon envanteri ve bakımı

## Uygulama adımları

İşe süreçleri haritalayarak başlarız: her adım ne kadar sürüyor, ayda kaç kez tekrarlanıyor, nerede hata çıkıyor. Bu verilerle önce en kolay ve en faydalı süreç seçilir. Tasarımda kurallar, istisnalar ve bir insanın onay vermesi gereken noktalar yazılır. Otomasyon kurulduktan sonra bir süre mevcut yöntemle yan yana, gerçek veriyle çalıştırılır; sonuçlar tutarlı olduğunda devreye alınır ve kazanılan süre raporlanır.

## RPA mı, entegrasyon mu?

Bir sistemin API'si varsa doğrudan entegrasyon daha dayanıklı bir çözümdür; ekran değiştiğinde bozulmaz. RPA ise değiştirilemeyen eski uygulamalar için pratik bir köprüdür. Çoğu projede ikisi birlikte kullanılır. Sistemler arası bağlantılar için [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/), otomasyonun ötesine geçen ihtiyaçlar için [özel yazılım geliştirme](/yazilim-dijital/ozel-yazilim-gelistirme/) hizmetlerimizle çalışırız. Otomasyonları daha geniş bir dijitalleşme planının parçası olarak ele almak isterseniz [dijital dönüşüm danışmanlığı](/danismanlik/yazilim-ve-dijital-donusum-danismanligi/) ile başlayabiliriz.

## Ekibinize etkisi

Tekrarlayan işlere harcanan saatler azalır, elle veri girişinden kaynaklanan düzeltmeler seyrekleşir, her adım kayıt altına alındığı için süreç denetlenebilir hale gelir ve yoğun dönemlerde ek personel almadan işler yetişir.

Otomasyona uygun süreçlerinizi birlikte belirleyelim. [İletişime geçin](/iletisim/).`,
    faq: [
      {
        question: "Otomasyon çalışanlarımızın yerini mi alacak?",
        answer:
          "Hedef kişilerin yerini almak değil, zamanlarını tüketen tekrar işleri üstlenmektir. Ekipler genellikle bu sayede daha nitelikli işlere ve müşteriye ayırdıkları zamana odaklanır.",
      },
      {
        question: "Hangi süreçle başlamalıyız?",
        answer:
          "Sık tekrarlanan, kuralları net ve hatası maliyetli olan bir süreçle başlamak en doğrusudur. Keşif aşamasında süreçlerinizi ölçüp size önceliklendirilmiş bir liste sunarız.",
      },
      {
        question: "Otomasyon hata yaparsa ne olur?",
        answer:
          "Kurallara uymayan durumlar otomatik olarak işlenmez, bir kişinin onayına düşer. Tüm adımlar kayıt altında tutulur ve beklenmeyen bir durumda sorumlu kişiye bildirim gider.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "raporlama-ve-dashboard-cozumleri",
    slug: "raporlama-ve-dashboard-cozumleri",
    title: "Raporlama ve Dashboard Çözümleri",
    metaDescription:
      "Raporlama ve dashboard çözümleri: ERP, muhasebe, CRM ve e-ticaret verisini tek veri modelinde toplayan yönetim panoları ve otomatik zamanlanmış raporlar.",
    content: `Yönetim toplantısına gelen satış raporu bir kişinin hazırladığı Excel dosyasıysa, o kişi izindeyken rapor da gelmez; aynı rakamı iki departman farklı hesapladığında toplantı veriyi tartışmakla geçer. Raporlama ve dashboard çözümlerimizde ERP, muhasebe, CRM, e-ticaret ve üretim sistemlerinizdeki veriyi tek bir modelde topluyor, yöneticilerin dönem kapanışını beklemeden bakabileceği panolara dönüştürüyoruz.

## Elle hazırlanan raporların üç sorunu

Geç gelirler, çünkü ay kapanmadan hazırlanamazlar. Kişiye bağlıdırlar, çünkü formülleri ve kaynakları yalnızca hazırlayan bilir. Tutarsızdırlar, çünkü net satış veya tahsilat gibi kavramlar herkes tarafından farklı tanımlanır. Ortak bir veri modeli üzerinde çalışan panolar bu üç sorunu birlikte çözer. Excel dosyalarının e-postayla dolaşması bir güvenlik sorunudur da; maaş veya müşteri bazlı kârlılık gibi hassas rakamlar yanlış kişiye gidebilir. Panolarda ise her kullanıcı yalnızca kendi yetkisindeki veriyi görür ve kimin neye baktığı kayıt altında tutulur.

## Çözüm kapsamı

- ERP, muhasebe, CRM, e-ticaret, üretim ve Excel kaynaklarının bağlanması
- Tek doğruluk kaynağı olacak veri modeli veya veri ambarı
- Satış, tahsilat, nakit, stok, üretim ve İK panoları
- KPI tanımları ve hedef ile gerçekleşenin karşılaştırılması
- Zamanlanmış PDF ve Excel raporlarının e-postayla dağıtımı
- Kullanıcının yalnızca yetkili olduğu veriyi gördüğü rol bazlı erişim
- Telefon ve tablette okunabilen görünümler
- Eşik aşıldığında uyarı gönderen bildirimler

## Proje nasıl ilerler?

İlk soru hangi grafiğin çizileceği değil, hangi kararın hangi rakama bakılarak alındığıdır. Bunu netleştirdikten sonra veri kaynaklarını bağlar, departmanlarla birlikte ortak tanımları yazarız. Panolar hazırlanır ve gerçek kullanıcılarla gözden geçirilir; okunmayan grafikler çıkarılır, eksik olanlar eklenir. Son aşamada verinin ne sıklıkla yenileneceği, kimin neyi göreceği ve hangi raporların otomatik gönderileceği ayarlanır. Araç seçimi veri hacmine, kullanıcı sayısına ve lisans maliyetine göre yapılır; belirli bir ürüne bağlı değiliz.

## Hazır ürün seçeneği: Atlas

Bütçe hazırlama ve bütçe ile gerçekleşenin karşılaştırılması ihtiyacınız ağır basıyorsa, kendi yazılım ekibimizin geliştirdiği [Atlas Bütçe ve Raporlama Yazılımı](/yazilim-urunlerimiz/atlas/) bu işi ERP'den gelen canlı veriyle tek panelde yapar ve sıfırdan proje gerektirmez. Farklı sistemlerden verinin düzenli akması için [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/) altyapısını birlikte kurarız.

## Yönetime kazandırdıkları

Raporlar kişiye değil sisteme bağlı hale gelir, aynı metrik herkese aynı sonucu verir, dönem içinde sapmalar zamanında görülür ve toplantılar rakamları doğrulamakla değil kararlarla geçer.

Raporlama ihtiyacınızı birlikte netleştirelim. [Bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Hangi raporlama araçlarıyla çalışıyorsunuz?",
        answer:
          "Yaygın iş zekâsı araçlarıyla ya da web tabanlı özel panolarla çalışıyoruz. Seçimi veri hacmi, kullanıcı sayısı, lisans maliyeti ve mevcut altyapınıza göre birlikte yaparız.",
      },
      {
        question: "Panolardaki veriler ne sıklıkla güncellenir?",
        answer:
          "Her metrik için ayrı belirlenir. Operasyon panoları sık yenilenirken finansal raporlarda günlük veya kapanış bazlı güncelleme çoğu zaman yeterlidir.",
      },
      {
        question: "Departmanlarımız aynı kavramı farklı hesaplıyor, bu engel olur mu?",
        answer:
          "Engel değil, projenin ilk işidir. Net satış gibi kavramların neyi kapsadığı birlikte yazılır ve tüm panolar bu ortak tanımların üzerine kurulur.",
      },
      {
        question: "Atlas ile özel dashboard projesi arasındaki fark nedir?",
        answer:
          "Atlas bütçe ve gerçekleşen takibi için hazır bir üründür ve hızlı devreye girer. Birçok farklı kaynağı ve departmana özel metrikleri kapsayan ihtiyaçlarda ise size özel bir pano projesi daha uygundur.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Lisanslama & Kurumsal Çözümler
  // ─────────────────────────────────────────────────────────────────────────
  {
    categorySlug: "lisanslama",
    serviceKey: "microsoft-lisanslama",
    slug: "microsoft-lisanslama",
    title: "Microsoft Lisanslama",
    metaDescription:
      "Microsoft lisanslama: CSP, EA ve MPSA kanal seçimi, envanter ve SAM uyumluluk kontrolü, denetim hazırlığı ve yenileme takibiyle doğru adette lisans.",
    content: `Microsoft lisanslarında iki tür hata sık görülür: bazı kurumlar kullanmadıkları ürünler için yıllarca ödeme yapar, bazıları ise farkında olmadan eksik lisansla çalışır ve bunu ancak bir denetim mektubu geldiğinde öğrenir. Microsoft lisanslama hizmetimiz elinizdekini fiili kullanımla karşılaştırır, size uygun modeli ve satın alma kanalını belirler, ardından yenileme tarihlerini sizin yerinize takip eder.

## Karmaşıklık nereden geliyor?

Aynı ürün kullanıcı başına, cihaz başına ya da işlemci çekirdeği başına lisanslanabilir. Satın alma CSP, Enterprise Agreement veya MPSA üzerinden yapılabilir ve her kanalın taahhüt süresi, esnekliği ve fiyatlaması farklıdır. Software Assurance bazı hakları ancak sözleşme sürdükçe verir. Bulut abonelikleri ile şirket içi kalıcı lisanslar aynı ortamda karıştığında hangi hakkın nerede geçerli olduğunu izlemek uzmanlık ister. Örneğin şirket içindeki bir SQL Server lisansını Azure'a taşımak ancak belirli koşullar sağlanıyorsa mümkündür; bu ayrıntı gözden kaçarsa aynı lisans iki kez ödenir.

## Danışmanlık kapsamı

- Sahip olunan lisansların ve gerçek kullanımın envanteri
- CSP, EA ve MPSA arasında ihtiyaca uygun kanal seçimi
- Microsoft 365, Windows, Windows Server, SQL Server ve Azure için lisans planı
- Yazılım varlık yönetimi (SAM) ve uyumluluk kontrolü
- Üretici denetimine hazırlık ve eksiklerin önceden kapatılması
- Kullanıcı sayısı artış ve azalışlarına göre yenileme senaryoları
- Alternatif modellerin maliyet karşılaştırması

## Çalışmanın adımları

Önce satın alma kayıtlarınızı, üretici portalındaki hakları ve kurulu yazılımları bir araya getiririz. Bu veriyle hangi kalemlerin eksik, hangilerinin fazla ya da yanlış modelde olduğunu gösteren bir rapor hazırlarız. Raporun ardından doğru model ve kanala geçiş için bir tedarik planı öneririz. Sonrasında yenileme tarihleri takvimimizde izlenir; kullanıcı sayınız değişmeden önce size seçenekleri sunarız.

## Ürün bazında ayrıntı

Kullanıcı planları için [Microsoft 365 lisans optimizasyonu](/lisanslama/microsoft-365-lisanslama/), sunucu ve veritabanı tarafında [Windows Server ve SQL Server lisans hesabı](/lisanslama/windows-server-sql-server-lisanslama/) sayfalarımıza bakabilirsiniz. Lisansın teknik karşılığı olan kurulum ve göç işleri [Microsoft 365 kurulum hizmetimiz](/bulut-yedekleme/microsoft-365-cozumleri/) ve [Azure altyapı hizmetimiz](/bulut-yedekleme/microsoft-azure-cozumleri/) ile yürür.

## Somut çıktılar

Gereksiz kalemlerden arındırılmış bir lisans listesi, denetimde savunabileceğiniz belgeli bir uyumluluk durumu, kaçırılmayan yenileme tarihleri ve şirket içinden buluta geçerken mevcut haklarınızın boşa gitmemesi. Satıcıdan bağımsız çalıştığımız için öneri yaparken tek bir kanalı zorlamayız.

Lisans durumunuzu bir envanter çalışmasıyla netleştirmek için [ücretsiz ön görüşme isteyin](/iletisim/).`,
    faq: [
      {
        question: "Şu anki bayimizle çalışmaya devam edebilir miyiz?",
        answer:
          "Evet. İsterseniz yalnızca model belirleme ve uyumluluk danışmanlığını bizden alır, satın almayı mevcut kanalınızdan sürdürürsünüz. Tedarik sürecini de bize devretmek isterseniz onu da üstlenebiliriz.",
      },
      {
        question: "Kullanmadığımız lisanslar varsa ne yapılır?",
        answer:
          "Yenileme döneminde bu kalemler sözleşmeden düşürülür ya da ihtiyaç duyduğunuz başka bir ürüne kaydırılır. Envanter raporu hangi kalemlerin atıl olduğunu tek tek gösterir.",
      },
      {
        question: "Microsoft'tan denetim yazısı aldık, ne yapmalıyız?",
        answer:
          "Önce acele etmeden iç bir değerlendirme yaparız. Eksikleri denetim verisi paylaşılmadan önce belirler, kapatılması gerekenleri planlar ve süreç boyunca yanınızda oluruz.",
      },
      {
        question: "Hangi kanalın bize uygun olduğunu nasıl anlarız?",
        answer:
          "Kullanıcı sayınız, sayının ne kadar dalgalandığı, uzun süreli taahhüde hazır olup olmadığınız ve bulut kullanım planınız belirleyicidir. Envanter sonrası seçenekleri yan yana koyarak karar vermenize yardımcı oluruz.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "microsoft-365-lisanslama",
    slug: "microsoft-365-lisanslama",
    title: "Microsoft 365 Lisanslama",
    metaTitle: "Microsoft 365 Lisans Satın Alma ve Plan Seçimi | BTM Bilişim",
    metaDescription:
      "Microsoft 365 lisanslama: Business, E3, E5 ve F3 planlarını kullanıcı profiline göre eşleştirin, atıl lisansları bulun, CSP ile esnek tedarik edin.",
    content: `Microsoft 365'te en yaygın tasarruf fırsatı, herkese aynı planı vermekten vazgeçmektir. Muhasebe müdürü, depo sorumlusu ve satış temsilcisinin ihtiyaçları birbirinden çok farklıdır; buna rağmen çoğu şirkette tüm kullanıcılar en pahalı pakette durur ya da tam tersi, güvenlik gerektiren kullanıcılar temel planda kalır. Bu hizmet, kullanıcılarınızı gerçek kullanıma göre gruplar ve her gruba uygun planı belirler.

## Kullanım verisi ne söylüyor?

Microsoft 365 yönetim merkezi, kimin hangi uygulamayı ne sıklıkla açtığını gösterir. Bu veriye bakınca genellikle üç şey ortaya çıkar: masaüstü Office'i hiç açmayan ama tam paket kullanan kişiler, ayrılmış çalışanlara hâlâ atanmış lisanslar ve yalnızca bir güvenlik özelliği için üst pakete taşınmış gruplar. Her üçü de düzeltilebilir. Ters yönde bir risk de vardır: yönetici hesapları veya hassas veriye erişen kullanıcılar, koşullu erişim gibi koruma özelliklerini içermeyen bir planda kalmış olabilir.

## Plan çalışmasının kapsamı

- Kullanıcı profillerinin çıkarılması ve Business Basic, Standard, Premium, E3, E5, F3 eşleştirmesi
- Tam E5 ile güvenlik, uyum veya telefon eklentilerinin maliyet karşılaştırması
- Sahada ve üretimde çalışanlar için Frontline (F serisi) planları
- Atanmış fakat kullanılmayan lisansların bulunması
- CSP üzerinden aylık veya yıllık esnek satın alma
- Taahhüt dönemi, yenileme ve kullanıcı sayısı değişikliklerinin yönetimi
- Güvenlik ve uyum ihtiyacının hangi lisansla karşılandığının netleştirilmesi

## İzlediğimiz yol

İlk olarak atanmış lisansları ve oturum, uygulama ve özellik kullanım raporlarını inceleriz. Ardından kullanıcıları benzer ihtiyaçlara göre gruplar, her grup için önerilen planı gerekçesiyle yazarız. Üçüncü adımda hangi kullanıcının yükseltileceği, hangisinin daha uygun bir plana alınacağı ve hangi eklentinin gerektiği bir eylem listesine dönüşür. Son olarak lisansları sağlar, yenileme ve sayı değişikliklerini takvimimizde izleriz.

## Lisansın ötesi

Plan seçimi tek başına yeterli değildir; satın aldığınız özelliklerin açılması ve yapılandırılması gerekir. Kurulum, posta göçü ve güvenlik ayarları için [Microsoft 365 kurulum ve göç hizmetimiz](/bulut-yedekleme/microsoft-365-cozumleri/), Windows Server veya SQL gibi diğer ürünlerle birlikte genel sözleşme kurgusu için [Microsoft lisans danışmanlığı](/lisanslama/microsoft-lisanslama/) sayfalarına göz atabilirsiniz.

## Çalışmanın sonucu

Her kullanıcının işine uygun planda olduğu bir dağılım, E5 kararının tahmine değil veriye dayanması, boşta kalan lisansların geri kazanılması ve yenileme döneminde sürpriz yaşamamanız.

Mevcut plan dağılımınızı incelemek için [bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Tüm kullanıcıları E5'e taşımalı mıyız?",
        answer:
          "Her zaman değil. E5'in güvenlik ve uyum bileşenlerini gerçekten kullanacaksanız toplamda ekonomik olabilir. Yalnızca bir iki özelliğe ihtiyacınız varsa hedefli eklentiler genellikle daha uygun düşer; kullanım analizi bunu gösterir.",
      },
      {
        question: "Depo ve üretim çalışanları için daha uygun bir seçenek var mı?",
        answer:
          "Evet. F1 ve F3 gibi Frontline planları, ortak cihaz kullanan ve masaüstü Office uygulamalarına ihtiyaç duymayan çalışanlar için tasarlanmıştır.",
      },
      {
        question: "Kullanıcı sayımız mevsime göre değişiyor, bu sorun olur mu?",
        answer:
          "CSP modelinde aylık esneklik seçeneği bulunur. Kalıcı kadro için taahhütlü, geçici kadro için esnek lisans kullanarak maliyet ile esneklik arasında denge kurabilirsiniz.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "windows-server-sql-server-lisanslama",
    slug: "windows-server-sql-server-lisanslama",
    title: "Windows Server & SQL Server Lisanslama",
    metaDescription:
      "Windows Server ve SQL Server lisanslama: çekirdek sayımı, CAL ihtiyacı, Standard veya Datacenter kararı, pasif düğüm hakları ve Azure Hybrid Benefit.",
    content: `Sunucu lisanslarında hata genellikle kurulum günü değil, altyapı büyüdükçe ortaya çıkar. Yeni bir fiziksel sunucu eklenir, sanal makine sayısı artar, bir SQL kümesi kurulur; ama lisans hesabı ilk günkü hâliyle kalır. Bu hizmet, Windows Server ve SQL Server için çekirdek, CAL ve sanallaştırma kurallarını güncel altyapınıza göre yeniden hesaplar ve eksik ya da fazla kalemleri raporlar.

## Denetimlerde sık çıkan bulgular

Fiziksel çekirdeklerin tamamının lisanslanmaması, bir host üzerindeki Windows sanal makineleri çoğaldığı hâlde Standard sürümde kalınması, SQL Server'da yüksek erişilebilirlik için bekleyen düğümün Software Assurance olmadan çalıştırılması ve uzak masaüstü kullanıcıları için RDS CAL alınmaması. Bu bulguların çoğu, doğru envanterle önceden tespit edilebilir. Sanal makinelerin hostlar arasında taşınması da hesaba katılmalıdır; bir makinenin geçebileceği her host, lisans açısından ayrıca değerlendirilir.

## Hesaplama kapsamı

- Fiziksel host ve çekirdek sayımı, minimum lisans kurallarının kontrolü
- Sanal makine yoğunluğuna göre Standard ile Datacenter karşılaştırması
- Windows Server CAL ve RDS CAL ihtiyacının belirlenmesi
- SQL Server için çekirdek bazlı model ile Server+CAL modelinin kıyası
- Always On ve failover cluster yapılarında pasif düğüm hakları
- Software Assurance'ın değeri ve Azure Hybrid Benefit kullanımı
- Sanallaştırma ve konteyner ortamlarının lisansa etkisi
- Mevcut kurulumun uyumluluk kontrolü ve denetime hazırlık

## Yöntemimiz

Hostları, çekirdek sayılarını, sanal makineleri ve SQL örneklerini çıkararak başlarız. Her senaryo için olası lisans modellerini hesaplar, maliyetleri yan yana koyarız. Ardından eksik ve fazla kalemleri, SA gereken noktaları gösteren bir boşluk raporu hazırlarız. Son olarak doğru lisansları temin eder, önümüzdeki dönemdeki büyüme için bir plan çıkarırız. Yeni bir host veya SQL örneği eklemeyi düşündüğünüzde, satın almadan önce lisans etkisini birlikte hesaplarız.

## Bağlantılı konular

Host ve sanal makine yerleşimi lisans maliyetini doğrudan etkilediği için [sanallaştırma altyapısı](/sistem-network/sanallastirma-cozumleri/) tasarımıyla birlikte düşünülmelidir. Lisanslarınızı bulutta kullanmak istiyorsanız [Azure göç ve kurulum hizmetimiz](/bulut-yedekleme/microsoft-azure-cozumleri/), diğer Microsoft ürünleriyle birlikte genel kurgu için [Microsoft lisans danışmanlığı](/lisanslama/microsoft-lisanslama/) devreye girer.

## Elde edeceğiniz tablo

Çekirdek ve CAL hesabı belgelenmiş, denetimde savunulabilir bir lisans durumu; maliyet açısından en uygun noktada verilmiş Standard veya Datacenter kararı; doğru lisanslanmış SQL yedek düğümleri ve bulutta mevcut lisanslarınızdan yararlanarak elde edilen tasarruf.

Sunucu lisanslarınızı doğrulamak için [ücretsiz keşif isteyin](/iletisim/).`,
    faq: [
      {
        question: "Standard mı yoksa Datacenter mı daha uygun?",
        answer:
          "Belirleyici olan, bir fiziksel host üzerinde kaç Windows sanal makine çalıştırdığınızdır. Sanal makine sayısı arttıkça belirli bir noktadan sonra Datacenter, birden fazla Standard lisansına göre daha ekonomik hâle gelir.",
      },
      {
        question: "Bekleyen (pasif) SQL sunucusu için de lisans almalı mıyız?",
        answer:
          "Software Assurance varsa bir pasif failover örneği için ek lisans gerekmez. SA yoksa bekleyen düğüm de lisanslanmalıdır.",
      },
      {
        question: "Azure Hybrid Benefit ne işe yarar?",
        answer:
          "Software Assurance kapsamındaki Windows Server ve SQL Server lisanslarınızı Azure'daki sanal makinelerde kullanmanıza izin veren bir haktır. Bu sayede bulutta lisans bedelini ikinci kez ödemezsiniz.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "vmware-lisanslama",
    slug: "vmware-lisanslama",
    title: "VMware Lisanslama",
    metaDescription:
      "VMware lisanslama: vSphere Foundation ve Cloud Foundation abonelikleri, çekirdek bazlı hesap, yenileme bütçesi ve Hyper-V veya Proxmox alternatif analizi.",
    content: `VMware kullanan pek çok kurum, son yenileme teklifini gördüğünde ne olduğunu anlamakta zorlanıyor. Kalıcı lisans ve ayrı ayrı satılan ürünler yerine artık abonelik paketleri ve çekirdek bazlı bir hesap var. VMware lisanslama hizmetimiz, bu yeni modele göre gerçek ihtiyacınızı hesaplar ve yenileme, paket değiştirme ya da başka bir hipervizöre geçme seçeneklerini rakamlarla önünüze koyar.

## Model nasıl değişti?

VMware, ürün yelpazesini VMware vSphere Foundation ve VMware Cloud Foundation gibi abonelik paketlerinde topladı. Lisans artık fiziksel çekirdek başına hesaplanıyor ve işlemci başına bir taban çekirdek sayısı uygulanıyor. Bu, özellikle az çekirdekli sunucularda ve kullanılmayan bileşenleri de içeren paketlerde yenileme maliyetini belirgin biçimde etkileyebiliyor. Bu yüzden yenileme teklifini onaylamadan önce sunucu donanımınızı, hangi bileşenleri gerçekten kullandığınızı ve sözleşme bitiş tarihlerini masaya koymak gerekir.

## Değerlendirme kapsamı

- Hostlar, sürümler, mevcut lisans ve destek durumunun envanteri
- Fiziksel çekirdek sayımı ve yeni modele göre ihtiyaç hesabı
- Paketlerin karşılaştırılması ve size uyan aboneliğin seçimi
- Önümüzdeki dönemler için yenileme maliyeti ve bütçe planı
- Hyper-V ve Proxmox gibi alternatiflerin teknik ve maliyet analizi
- Alternatif seçilirse göç planı ve risk değerlendirmesi
- Destek ve yenileme tarihlerinin takibi

## Karar süreci

Önce hostlarınızı, çekirdek sayılarını, çalışan sürümleri ve sözleşme bitiş tarihlerini toplarız. Bu veriyle yeni abonelik modelinde ödemeniz gereken tutarı hesaplarız. Ardından üç yolu yan yana koyarız: aynı yapıyla yenilemek, daha uygun bir pakete geçmek ya da alternatif bir hipervizöre taşınmak. Hangi yolu seçerseniz seçin, tedarik veya göç planını birlikte uygularız.

## Göz önünde bulundurulacaklar

Hipervizör değişikliği yalnızca lisans maliyetiyle değerlendirilmemelidir; ekibinizin yeni platforma alışma süresi, yedekleme yazılımının uyumu ve kritik uygulamaların desteklenip desteklenmediği de hesaba katılmalıdır. Mimari ve göç tarafı için [sanallaştırma çözümlerimiz](/sistem-network/sanallastirma-cozumleri/), yedekleme ürününüzün yeni ortamda nasıl lisanslanacağı için [Veeam lisans hizmetimiz](/lisanslama/veeam-lisanslama/) bu çalışmanın parçası olur.

## Çalışmanın size sağladıkları

Önceden bilinen bir yenileme bütçesi, çekirdek bazlı modelde fazlası olmayan bir lisans adedi, alternatif düşünüyorsanız gerçek verilere dayanan bir karşılaştırma ve destek kesintisi yaşamadan geçen bir dönem. Satıcıdan bağımsız olduğumuz için hangi yolun sizin için uygun olduğunu tarafsız biçimde değerlendiririz.

VMware yenileme kararınızı birlikte vermek için [bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Elimizdeki kalıcı VMware lisansları geçersiz mi oldu?",
        answer:
          "Kalıcı lisanslar çalışmaya devam eder, ancak güncelleme ve destek almak için abonelik gerekir. Envanter çalışmasında destek bitiş tarihlerinizi ve bu tarihten sonraki seçeneklerinizi netleştiririz.",
      },
      {
        question: "Başka bir hipervizöre geçmek mantıklı mı?",
        answer:
          "Kuruma göre değişir. Maliyet farkı belirginse ve iş yükleriniz uyumluysa değerlendirmeye değer. Göç eforu, ekibin yetkinliği ve operasyonel risk maliyet farkıyla birlikte tartılmalıdır.",
      },
      {
        question: "İşlemci başına taban çekirdek kuralı ne demek?",
        answer:
          "Yeni modelde her fiziksel çekirdek lisanslanır ve her işlemci için belirli bir en düşük çekirdek sayısı üzerinden hesap yapılır. Bu yüzden az çekirdekli işlemcilerde ödenen tutar, fiili çekirdek sayısının gerektirdiğinden yüksek olabilir.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "veeam-lisanslama",
    slug: "veeam-lisanslama",
    title: "Veeam Lisanslama",
    metaDescription:
      "Veeam lisanslama: Veeam Universal License (VUL) instance hesabı, Foundation, Advanced ve Premium sürüm seçimi, soketten geçiş ve yenileme takibi.",
    content: `Veeam lisansı alırken en sık sorulan soru "kaç adet almalıyız?" olur ve yanıtı, korunan iş yüklerinin türüne göre değişir. Bir sanal makine, fiziksel bir sunucu, bir dizüstü bilgisayar ya da bir Microsoft 365 kullanıcısı lisanstan farklı oranlarda pay alır. Veeam lisanslama hizmetimiz yedeklediğiniz her şeyi listeler, gereken lisans miktarını hesaplar, uygun sürümü belirler ve yenilemeyi takip eder.

## VUL modelinin temeli

Veeam'in güncel lisansı Veeam Universal License (VUL) adı verilen taşınabilir bir birime dayanır. Lisans "instance" olarak satılır ve korunan iş yükünün türüne göre farklı miktarda tüketilir. Bu esneklik sayesinde aynı lisans havuzu sanal makineden buluttaki bir iş yüküne kaydırılabilir. Foundation, Advanced ve Premium sürümleri ise farklı özellik setleri içerir; doğru sürüm, ihtiyaç duyduğunuz kurtarma ve izleme özelliklerine göre seçilir. Sık yapılan hata, dizüstü bilgisayarları veya dosya paylaşımlarını hesaba katmadan yalnızca sanal makine sayısına göre lisans almaktır.

## Lisans hesabının kapsamı

- Sanal makine, fiziksel sunucu, iş istasyonu, NAS, Microsoft 365 ve bulut iş yüklerinin envanteri
- Her iş yükü türüne göre instance tüketiminin hesaplanması
- Foundation, Advanced veya Premium arasından sürüm seçimi
- Eski soket bazlı lisanslardan VUL'a geçişin değerlendirilmesi
- Microsoft 365 yedeği için gereken lisansın ayrıca planlanması
- Yenileme, büyüme ve destek senaryoları
- Lisans kullanımının izlenmesi, fazla veya eksik adetlerin tespiti

## Çalışma düzeni

Yedeklenen tüm iş yüklerini ve türlerini çıkarmakla başlarız. Bu listeden instance ihtiyacını hesaplar, özellik gereksinimlerinize göre sürümü belirleriz. Ardından yeni alım ya da yenileme için paket ve adet önerisi hazırlarız. Sonrasında kullanım düzenli izlenir; yenileme tarihi yaklaşmadan önce ihtiyacınızı yeniden gözden geçiririz.

## Lisansla birlikte düşünülmesi gerekenler

Lisans adedi doğru olsa bile yedekleme mimarisi eksikse koruma zayıf kalır. Değiştirilemez kopya, şirket dışı nüsha ve geri yükleme testleri için [yedekleme mimarisi hizmetimize](/bulut-yedekleme/veri-yedekleme-cozumleri/), sistemlerin başka bir lokasyonda ayağa kaldırılması için [felaket kurtarma çalışmamıza](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) göz atabilirsiniz.

## Elde ettikleriniz

İş yükü türüne göre hesaplanmış, fazlası olmayan bir lisans adedi; gerçek ihtiyacınıza dayanan bir sürüm seçimi; Microsoft 365 yedeği gibi kolayca unutulan kalemlerin hesaba katılması ve yenileme öncesinde net bir büyüme tahmini.

Veeam lisans ihtiyacınızı netleştirmek için [ücretsiz keşif isteyin](/iletisim/).`,
    faq: [
      {
        question: "Soket bazlı eski lisanslarımızla ne yapmalıyız?",
        answer:
          "Soket lisansları destek sürdükçe kullanılmaya devam edebilir, ancak yeni alımlar ve genişlemeler VUL üzerinden yapılır. Envanter sırasında geçişin maliyetini ve zamanlamasını sizinle birlikte planlarız.",
      },
      {
        question: "Microsoft 365 yedeği aynı lisansla mı karşılanıyor?",
        answer:
          "Microsoft 365 iş yükleri de VUL instance tüketir, ancak ihtiyacı ayrıca hesaplanır. Korunacak kullanıcı sayınıza göre gereken miktarı belirleriz.",
      },
      {
        question: "Hangi Veeam sürümünü seçmeliyiz?",
        answer:
          "Temel yedekleme ve geri yükleme için Foundation çoğu zaman yeterlidir. Kurtarma orkestrasyonu, gelişmiş izleme ya da ek güvenlik özellikleri gerekiyorsa Advanced veya Premium değerlendirilir.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "siber-guvenlik-urunleri-lisanslama",
    slug: "siber-guvenlik-urunleri-lisanslama",
    title: "Siber Güvenlik Ürünleri Lisanslama",
    metaDescription:
      "Siber güvenlik ürünleri lisanslama: firewall, EDR/XDR, e-posta güvenliği, DLP ve SIEM için doğru boyutlandırma, tek yenileme takvimi ve paket analizi.",
    content: `Bir kurumun güvenlik altyapısı genellikle farklı yıllarda, farklı ihtiyaçlarla alınmış ürünlerden oluşur: bir markanın güvenlik duvarı, başka bir markanın uç nokta koruması, ayrı bir e-posta filtresi ve bir log toplama aracı. Her biri farklı tarihte biter ve farklı birimlerle sayılır. Siber güvenlik ürünleri lisanslama hizmetimiz bu dağınık yapıyı tek bir envanterde toplar, her ürünü doğru boyutlandırır ve yenilemeleri sizin yerinize izler.

## Neden bu kadar karışık?

Uç nokta koruması cihaz sayısıyla, e-posta güvenliği posta kutusu sayısıyla, güvenlik duvarı bant genişliğiyle, SIEM ise günlük log hacmi veya saniyedeki olay sayısıyla lisanslanır. Üreticiler özellikleri farklı paketlere böler ve aynı işlevi iki ayrı ürüne ödemek kolaylaşır. Bir aboneliğin sessizce sona ermesi ise imza güncellemelerinin durması, yani korumanın fark edilmeden zayıflaması anlamına gelir. Tersine, kapasitesi aşılmış bir güvenlik duvarı da tüm özellikler açıldığında ağı yavaşlatır ve ekipler çözüm olarak korumayı kapatmaya yönelir.

## Lisans yönetimi kapsamı

- Tüm güvenlik ürünlerinin envanteri ve bitiş tarihlerinin çıkarılması
- Her ürün için doğru sayım birimiyle boyutlandırma: kullanıcı, uç nokta, Mbps, GB/gün
- Paket karşılaştırması ve kullanılmayan modüllerin ayıklanması
- Güvenlik duvarında donanım, abonelik ve destek yenilemesinin birlikte planlanması
- EDR/XDR, e-posta güvenliği, DLP ve SIEM ihtiyacının belirlenmesi
- Çok yıllı taahhüt ve büyüme seçeneklerinin maliyet karşılaştırması
- Yenilemeden önce erken uyarı ve ürün birleştirme fırsatları

## İş akışımız

Önce kullandığınız tüm güvenlik ürünlerini, sürümlerini, adetlerini ve bitiş tarihlerini listeleriz. Ardından fazla veya eksik lisansları, aynı işi yapan ürünleri ve birleştirme fırsatlarını belirleriz. Bu bulgulardan ürün bazında paket, adet ve tarih öneren bir plan çıkarırız. Sonrasında yenilemeleri takvimimizde izler, değişiklikleri önceden sizinle planlarız.

## Teknik tarafla bağlantı

Hangi kontrollere gerçekten ihtiyacınız olduğu [siber güvenlik danışmanlığımızda](/siber-guvenlik/siber-guvenlik-danismanligi/) netleşir; ISO 27001 baş denetçi deneyimimiz bu önceliklendirmede yol gösterir. Ürünlerin kurulumu ve yapılandırması [uç nokta koruması (EDR)](/siber-guvenlik/edr-antivirus-cozumleri/), [güvenlik duvarı ve ağ güvenliği](/siber-guvenlik/firewall-ve-ag-guvenligi/) ve [SIEM ile log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/) hizmetlerimizle yapılır.

## Kazanımlarınız

Bütün güvenlik lisanslarının tek bir takvimde görünmesi, çakışan veya atıl modüllerden kurtulma, yenileme kaçırıp korumasız kalma riskinin ortadan kalkması ve boyutlandırmanın tahmine değil ölçülen trafik ve log hacmine dayanması.

Güvenlik lisans envanterinizi çıkarmak için [bize ulaşın](/iletisim/).`,
    faq: [
      {
        question: "Farklı üreticilerin lisanslarını tek elden takip edebilir misiniz?",
        answer:
          "Evet. Satıcıdan bağımsız çalıştığımız için farklı markaların yenileme ve boyutlandırmasını tek bir listede izleriz. Her ürünün tedarikini mevcut kanalınızdan ya da bizden yapabilirsiniz.",
      },
      {
        question: "SIEM lisansının boyutunu nasıl belirliyorsunuz?",
        answer:
          "Çoğu üründe ölçü günlük log hacmi ya da saniyedeki olay sayısıdır. Mevcut kaynaklarınızın ürettiği hacmi bir süre ölçer, beklenen büyümeyi ekleyerek gerekli kapasiteyi hesaplarız.",
      },
      {
        question: "Güvenlik duvarı yenilerken nelere bakmalıyız?",
        answer:
          "Cihazın önümüzdeki yıllardaki trafiği kaldırıp kaldırmayacağına, abonelik paketinin IPS, web filtreleme ve sandbox gibi hangi özellikleri içerdiğine ve destek seviyesine birlikte bakılmalıdır. Yalnızca cihaz fiyatına göre karar vermek yanıltıcı olur.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "kurumsal-yazilim-lisanslama",
    slug: "kurumsal-yazilim-lisanslama",
    title: "Kurumsal Yazılım Lisanslama",
    metaDescription:
      "Kurumsal yazılım lisanslama: tüm lisansların merkezi envanteri, SAM uyumluluk kontrolü, tek yenileme takvimi, denetim hazırlığı ve maliyet sadeleştirme.",
    content: `"Elimizde hangi yazılımın kaç lisansı var ve hangisi ne zaman bitiyor?" Birçok şirkette bu sorunun tek bir yanıtı yoktur. Lisanslar farklı departmanlar tarafından, farklı bayilerden ve farklı yıllarda alınmıştır; faturalar muhasebede, anahtarlar bir çalışanın e-postasında, yenileme tarihleri kimsenin takviminde değildir. Kurumsal yazılım lisanslama hizmetimiz işletim sisteminden ofis yazılımına, sanallaştırmadan yedeklemeye, güvenlikten veritabanına ve tasarım ya da sektörel uygulamalara kadar tüm lisanslarınızı tek bir envanter ve takvim altında toplar.

## Dağınıklığın maliyeti

Kimse neyin fazla olduğunu bilmediği için ayrılan çalışanların lisansları ödenmeye devam eder. Bir ürün yanlışlıkla iki kez alınır. Yenileme tarihi kaçırılır ve yazılım destek dışı kalır. Üretici denetim yazısı geldiğinde ise sahip olunan lisansları kanıtlayacak belge bulunamaz. Bunların hepsi düzenli bir envanterle önlenebilir. İşe başlayan ve ayrılan çalışanlar için lisans atama ve geri alma adımlarının insan kaynakları süreciyle bağlanması da bu düzenin parçasıdır.

## Hizmet kapsamı

- Tüm yazılım varlıklarının merkezi envanteri
- Yazılım varlık yönetimi (SAM) süreci ve sorumluların belirlenmesi
- Kurulu ve kullanılan yazılımla sahip olunan lisansların karşılaştırılması
- Tek yenileme takvimi ve tarihten önce uyarı
- Üretici denetimlerine hazırlık ve eksiklerin kapatılması
- Çok yıllı sözleşme ve taahhüt seçeneklerinin maliyet analizi
- Bulut abonelikleri ile şirket içi lisansların birlikte takibi
- Yeni alımlarda tarafsız model önerisi

## Nasıl ilerleriz?

Satın alma kayıtlarından, üretici portallarından ve gerekirse bir keşif aracından tüm lisansları, adetlerini ve bitiş tarihlerini toplarız. Ardından kurulu yazılımları sahip olunan haklarla karşılaştırırız. Fazla lisanslar sadeleştirilir, eksikler kapatılır ve bir yenileme planı hazırlanır. Sonrasında tüm alımlar ve değişiklikler bu düzen içinde yürür, takvim bizim tarafımızdan izlenir.

## Ürün bazında uzmanlık

Ayrıntılı hesap gerektiren ürünler için [Microsoft lisans danışmanlığı](/lisanslama/microsoft-lisanslama/), [VMware abonelik hesabı](/lisanslama/vmware-lisanslama/), [Veeam instance hesabı](/lisanslama/veeam-lisanslama/) ve [güvenlik ürünleri lisans yönetimi](/lisanslama/siber-guvenlik-urunleri-lisanslama/) sayfalarımıza bakabilirsiniz. Envanteri kalıcı olarak izlemek için kendi yazılım ekibimizin geliştirdiği [Orbit](/yazilim-urunlerimiz/orbit/) ürününü kullanabilirsiniz. Lisans kararlarını genel teknoloji planınızla uyumlu vermek için [IT danışmanlığı](/danismanlik/it-danismanlik-hizmetleri/) desteği de alabilirsiniz.

## Ne kazanırsınız?

Lisans durumunuzu dakikalar içinde gösterebilen bir envanter, tek bir yerde toplanmış yenileme tarihleri, maliyetten çıkarılmış atıl ve mükerrer lisanslar ve denetimde belgeyle savunulabilir bir yapı.

Lisans düzeninizi kurmak için [ücretsiz ön görüşme isteyin](/iletisim/).`,
    faq: [
      {
        question: "Küçük bir şirketiz, bu hizmete ihtiyacımız var mı?",
        answer:
          "Az sayıda ürün kullanan şirketlerde bile yenileme takibi ve uyumluluk kontrolü işe yarar. Kapsam ölçeğe göre daralır ve çoğu zaman tek bir envanter çalışması ile düzenli takvim takibi yeterli olur.",
      },
      {
        question: "Lisans envanterini nasıl çıkarıyorsunuz?",
        answer:
          "Satın alma kayıtlarını ve üretici portallarını inceleriz, gerektiğinde ağınızdaki kurulu yazılımları tarayan bir keşif aracı kullanırız. Karşılaştırma bu iki verinin üzerine kurulur.",
      },
      {
        question: "Mevcut tedarikçilerimizi bırakmamız gerekir mi?",
        answer:
          "Gerekmez. Hizmet tarafsızdır ve mevcut tedarikçilerinizle çalışmaya devam edebilirsiniz. Biz model seçimi, uyumluluk ve yenileme takibi katmanını üstleniriz.",
      },
    ],
  },
];

/**
 * Look up editorial content for a sub-service page. Accepts either the URL
 * `slug` or the `serviceKey` (they are kept identical) as the second argument.
 */
export function getServicePageContent(
  categorySlug: string,
  slugOrKey: string,
): ServicePageContent | null {
  return (
    servicePagesContent.find(
      (p) =>
        p.categorySlug === categorySlug &&
        (p.slug === slugOrKey || p.serviceKey === slugOrKey),
    ) ?? null
  );
}

/** All `{ category, service }` param pairs — used for `generateStaticParams`. */
export function servicePageParams(): { category: string; service: string }[] {
  return servicePagesContent.map((p) => ({
    category: p.categorySlug,
    service: p.slug,
  }));
}

