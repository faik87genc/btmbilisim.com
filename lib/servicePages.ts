export type ServicePageContent = {
  /** Matches a `slug` in `serviceCategoryList` (lib/services.ts). */
  categorySlug: string;
  /** Matches a `services[].key` in that category. */
  serviceKey: string;
  /** URL segment: `/{categorySlug}/{slug}`. Kept identical to `serviceKey`. */
  slug: string;
  /** Page <h1> and, with the layout template, the <title>. */
  title: string;
  /** <meta name="description"> and the visible hero sub-headline. ~150-160 chars. */
  metaDescription: string;
  /** Body copy as Markdown (GFM). No FAQ section — that is rendered from `faq`. */
  content: string;
  faq: { question: string; answer: string }[];
};

/**
 * Editorial content for the sub-service detail pages (`/{category}/{service}`).
 *
 * These pages are normally served from the `service_pages` table (authored in
 * the admin panel). This list is the seed source for that table
 * (`scripts/seed-service-pages.ts`) and also the fallback the route renders when
 * the database has no matching row yet — mirroring how `lib/blog.ts`
 * `fallbackPosts` backs the blog. Once a row exists in the DB, it takes over.
 */
export const servicePagesContent: ServicePageContent[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Danışmanlık
  // ─────────────────────────────────────────────────────────────────────────
  {
    categorySlug: "danismanlik",
    serviceKey: "finansal-ve-stratejik-danismanlik",
    slug: "finansal-ve-stratejik-danismanlik",
    title: "Finansal ve Stratejik Danışmanlık",
    metaDescription:
      "Nakit akışı yönetimi, bütçeleme, kârlılık analizi ve büyüme stratejisi. BTM Bilişim ile finansal kararlarınızı veriye dayalı, sürdürülebilir bir zemine oturtun.",
    content: `Finansal ve stratejik danışmanlık hizmetimiz; nakit akışınızı, bütçe sürecinizi ve büyüme planınızı birbirine bağlı tek bir bütün olarak ele alır. Amacımız, günü kurtaran kararların yerine kurumunuzu orta ve uzun vadede ayakta tutacak bir finansal disiplin kurmaktır.

## Finansal yönetim neden kritik?

Birçok işletme kâğıt üzerinde kârlı göründüğü hâlde nakit sıkışıklığı yaşar; çünkü kâr ile nakit aynı şey değildir. Bütçe ile gerçekleşen arasındaki sapma çoğu zaman ay kapanışından günler sonra, karar penceresi kapandıktan sonra fark edilir. Doğru kurgulanmış bir finansal yönetim bu görme kaybını ortadan kaldırır ve yönetime zamanında, tekrar üretilebilir sayı sağlar.

## Kapsamımız

- Nakit akışı modellemesi ve 13 haftalık nakit projeksiyonu
- Yıllık gelir/gider bütçesinin hazırlanması ve hesap kalemi bazında takibi
- Bütçe–gerçekleşme sapma analizi ve raporlama düzeninin kurulması
- Ürün, müşteri ve kanal bazında maliyet ve kârlılık analizi
- Fiyatlama ve iskonto politikasının gözden geçirilmesi
- Yatırım ve finansman kararları için fizibilite ve senaryo analizi
- Şirket değerleme, ortaklık ve büyüme süreçlerine finansal hazırlık

## Nasıl çalışıyoruz?

1. **Mevcut durum analizi** — Mali tablolar, nakit döngüsü ve kullandığınız raporlama düzeni incelenir.
2. **Model kurulumu** — Kurumunuza özel bütçe ve nakit akışı modeli oluşturulur.
3. **Raporlama düzeni** — Yönetimin her ay aynı formatta, aynı sonucu veren raporu almasını sağlayan akış tanımlanır.
4. **İzleme ve revizyon** — Sapmalar birlikte yorumlanır, bütçe dönem içinde revize edilir.

## Excel'den panele geçiş

Bütçe–gerçekleşme takibini elle Excel'de yürütmek yavaş ve kırılgandır. Süreç olgunlaştığında aynı işi canlı ERP verisiyle yapan [Atlas Bütçe ve Raporlama Yazılımı](/yazilim-urunlerimiz/atlas/) ile panele taşıyabilir, sapmayı ay içinde hesap kalemi düzeyinde görebilirsiniz.

## Yatırımlarınız için hibe ve teşvik fırsatları

Büyüme veya Ar-Ge yatırımı planlıyorsanız, bu yatırımı kısmen KOSGEB ve TÜBİTAK destekleriyle finanse etmek mümkün olabilir. [KOSGEB, TÜBİTAK ve hibe teşvik danışmanlığı hizmetimizle](/danismanlik/kosgeb-tubitak-hibe-tesvik-danismanligi/) uygun olduğunuz destek programlarını birlikte değerlendirebiliriz.

## Kurumunuza kazandırdıkları

- Nakit sıkışıklığını önceden görüp önlem alma imkânı
- Yönetim kararlarının tahmine değil veriye dayanması
- Bütçe tartışmalarının rakamdan aksiyona kayması
- Bankalar ve yatırımcılarla hazırlıklı, güçlü bir masaya oturma

Finansal görünürlüğünüzü artırmak için mevcut bütçe ve nakit akışı sürecinizi kısa bir görüşmede birlikte değerlendirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Finansal danışmanlık için belirli bir şirket büyüklüğü gerekiyor mu?",
        answer:
          "Hayır. Hizmet, KOBİ'lerden orta ölçekli gruplara kadar farklı büyüklüklere uyarlanır. Küçük ekiplerde temel nakit akışı ve bütçe disiplinine, büyük yapılarda kârlılık kırılımı ve senaryo analizine odaklanırız.",
      },
      {
        question: "Mali müşavirimizin yerini mi alıyorsunuz?",
        answer:
          "Hayır. Mali müşaviriniz yasal kayıt ve beyan tarafını yürütür; biz bu verinin üzerine yönetim raporlaması, bütçe ve strateji katmanını kurarız. İki taraf birbirini tamamlar.",
      },
      {
        question: "Sonuçları ne kadar sürede görürüz?",
        answer:
          "İlk nakit akışı projeksiyonu ve bütçe taslağı genellikle 3-4 hafta içinde devreye girer. Sapma analizinin anlamlı hâle gelmesi için ise en az bir tam raporlama dönemi gerekir.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "kosgeb-tubitak-hibe-tesvik-danismanligi",
    slug: "kosgeb-tubitak-hibe-tesvik-danismanligi",
    title: "KOSGEB, TÜBİTAK ve Hibe Teşvik Danışmanlığı",
    metaDescription:
      "KOSGEB ve TÜBİTAK destek programları, yatırım teşvik belgesi başvurusu ve raporlama süreçlerinde uçtan uca danışmanlık. Fırsatları birlikte değerlendirin.",
    content: `Hibe ve teşvik danışmanlığı hizmetimiz; KOSGEB, TÜBİTAK ve yatırım teşvik mevzuatındaki destek programlarını kurumunuzun yatırım ve Ar-Ge planlarıyla eşleştirir, başvurudan raporlamaya kadar süreci sizin adınıza yürütür.

## Hibe ve teşvik danışmanlığı neden gerekli?

Destek programlarının sayısı, kapsamı ve şartları her yıl değişir; doğru programı seçmek, başvuru dokümanını mevzuata uygun hazırlamak ve süreci zamanında raporlamak ayrı bir uzmanlık gerektirir. Çoğu işletme ya uygun olduğu desteği bilmediği için başvurmaz ya da eksik hazırlanan bir başvuru yüzünden hak ettiği desteği kaçırır.

## Kapsamımız

- KOSGEB destek programlarına (KOBİ Gelişim Destek Programı, Girişimcilik Destek Programı, Ar-Ge ve İnovasyon Destek Programı, Dijital ve Yeşil Dönüşüm Destek Programı) uygunluk analizi ve başvuru danışmanlığı
- TÜBİTAK TEYDEB destek programları (1501 Sanayi Ar-Ge, 1507 KOBİ Ar-Ge Başlangıç, 1509 Uluslararası Ortaklı Ar-Ge) için proje önerisi hazırlığı
- Yatırım Teşvik Belgesi başvurusu ve teşvik unsurlarının (vergi indirimi, SGK primi desteği, faiz/kâr payı desteği vb.) değerlendirilmesi
- Bütçe ve iş planının destek programının şartlarına göre kurgulanması
- Başvuru dokümantasyonunun mevzuata uygun hazırlanması
- Onay sonrası dönemsel raporlama, harcama belgelendirme ve izleme ziyaretlerine eşlik
- Ret durumunda itiraz süreci ve yeniden başvuru değerlendirmesi

## Nasıl çalışıyoruz?

1. **Uygunluk analizi** — Faaliyet alanınız, ölçeğiniz ve yatırım/Ar-Ge planınıza göre hangi programlara uygun olduğunuz belirlenir.
2. **Başvuru hazırlığı** — Proje önerisi, bütçe ve gerekli dokümantasyon mevzuata uygun biçimde hazırlanır.
3. **Başvuru ve takip** — Başvuru yapılır, kurum ile yazışmalar ve ek bilgi talepleri sizin adınıza yürütülür.
4. **Raporlama ve izleme** — Destek onaylandıktan sonra dönemsel raporlama ve harcama belgelendirme süreçleri yönetilir.

## Finansmandan uygulamaya

Onaylanan bir destek ya da teşvikin bütçeye doğru yansıtılması için [finansal ve stratejik danışmanlık hizmetimizle](/danismanlik/finansal-ve-stratejik-danismanlik/) birlikte ilerleyebiliriz. Destek kapsamındaki yatırımın veya Ar-Ge projesinin zamanında ve bütçesi içinde tamamlanması için [proje danışmanlığı hizmetimiz](/danismanlik/proje-danismanligi/) devreye girer.

## Kurumunuza kazandırdıkları

- Uygun olduğunuz destek ve teşvik programlarının tamamının görülmesi
- Başvuru sürecinde mevzuata aykırılık nedeniyle ret riskinin azaltılması
- Onay sonrası raporlama yükümlülüklerinin zamanında ve eksiksiz yerine getirilmesi
- Hibe ve teşvik unsurlarının yatırım/Ar-Ge bütçesine doğru yansıtılması

Kurumunuzun hangi destek ve teşvik programlarına uygun olduğunu kısa bir ön değerlendirmeyle birlikte çıkaralım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "KOSGEB ve TÜBİTAK desteklerinden hangi işletmeler yararlanabilir?",
        answer:
          "Uygunluk, işletmenizin ölçeğine, faaliyet alanına ve başvurduğunuz programın şartlarına göre değişir. KOSGEB destekleri ağırlıklı olarak KOBİ'lere yöneliktir; TÜBİTAK Ar-Ge destekleri ise ölçekten bağımsız olarak Ar-Ge/inovasyon faaliyeti yürüten işletmelere açıktır. Ön değerlendirmede kurumunuz için uygun programları netleştiririz.",
      },
      {
        question: "Danışmanlık ücreti başvuru onaylanmazsa ne oluyor?",
        answer:
          "Ücretlendirme modelini görüşme sırasında netleştiriyoruz; hiçbir destek programı için onayı garanti edemeyiz, zira nihai karar ilgili kurumun değerlendirmesine bağlıdır. Amacımız başvuruyu mevzuata en uygun ve eksiksiz şekilde hazırlayarak başarı ihtimalini en üst düzeye çıkarmaktır.",
      },
      {
        question: "Onay sonrası süreçte de destek alabilir miyiz?",
        answer:
          "Evet. Dönemsel raporlama, harcama belgelendirme ve izleme ziyaretlerine hazırlık gibi onay sonrası yükümlülüklerin tamamında eşlik ediyoruz; bu adımların eksik yürütülmesi de desteğin iptaline yol açabilir.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "proje-danismanligi",
    slug: "proje-danismanligi",
    title: "Proje Danışmanlığı",
    metaDescription:
      "Kurumsal projelerinizin planlanması, kaynak yönetimi ve zamanında teslimi için metodolojik proje yönetimi danışmanlığı. BTM Bilişim ile projeleriniz kontrol altında.",
    content: `Proje danışmanlığı hizmetimiz, kurumsal projelerinizi baştan sona öngörülebilir hâle getirir. Kapsam, zaman, bütçe ve risk dört ayrı başlık değil; birlikte yönetilmesi gereken tek bir denge olarak ele alınır.

## Projeler neden rayından çıkar?

Gecikmelerin çoğu teknik değil yönetişim kaynaklıdır: net olmayan kapsam, sahipsiz görevler, geç fark edilen bağımlılıklar ve raporlanmayan riskler. Metodolojik bir proje yönetimi bu boşlukları kapatır; herkesin aynı planı, aynı önceliği ve aynı durumu görmesini sağlar.

## Kapsamımız

- Proje başlatma: kapsam, hedef, paydaş ve başarı ölçütlerinin tanımlanması
- İş kırılım yapısı, zaman çizelgesi ve kaynak planı
- Bütçe planlaması ve gerçekleşme takibi
- Risk ve sorun (issue) kaydının kurulması ve düzenli gözden geçirilmesi
- Haftalık ilerleme raporlaması ve yönlendirme komitesi toplantıları
- Tedarikçi ve alt yüklenici koordinasyonu
- Proje kapanışı, kazanılan dersler ve devreye alma dokümantasyonu

## Nasıl çalışıyoruz?

1. **Keşif** — Projenin gerekçesi, kısıtları ve paydaşları netleştirilir.
2. **Planlama** — Kapsam, takvim, bütçe ve risk planı birlikte oluşturulur.
3. **Yürütme ve kontrol** — İlerleme haftalık izlenir, sapmalar erken müdahaleyle yönetilir.
4. **Kapanış** — Teslimatlar kabul edilir, süreç ve dersler belgelenir.

## Yaklaşımımız

İhtiyaca göre klasik (şelale), çevik (Scrum/Kanban) veya hibrit bir yaklaşım kullanırız. Yöntem seçimi projeye bağlıdır; kurumunuza yapay bir metodoloji dayatmayız. Yazılım ağırlıklı projelerde [yazılım ve dijital dönüşüm danışmanlığımız](/danismanlik/yazilim-ve-dijital-donusum-danismanligi/) ile birlikte yürütülür.

Proje bir KOSGEB veya TÜBİTAK desteği kapsamında yürütülüyorsa, [hibe teşvik danışmanlığı hizmetimizle](/danismanlik/kosgeb-tubitak-hibe-tesvik-danismanligi/) raporlama ve izleme yükümlülüklerini de proje planına entegre ederiz.

## Kurumunuza kazandırdıkları

- Teslim tarihlerinin gerçekçi kurulması ve korunması
- Bütçe aşımlarının erken görülmesi
- Risklerin sürpriz olmaktan çıkması
- Yönetimin tek bir güvenilir durum raporuyla karar vermesi

Devam eden ya da başlamak üzere olan bir projeniz varsa mevcut planı birlikte gözden geçirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Kendi proje ekibimiz var, yine de danışmanlık alır mıyız?",
        answer:
          "Evet. Çoğu projede ekip zaten mevcuttur; biz yönetişim, planlama disiplini ve raporlama düzenini kurar, proje yöneticinize metodolojik destek veririz. İsterseniz geçici proje yöneticiliği de üstlenebiliriz.",
      },
      {
        question: "Hangi proje yönetimi metodolojisini kullanıyorsunuz?",
        answer:
          "Projeye göre klasik, çevik veya hibrit. Kapsamı net ve sabit projelerde şelale; belirsizliğin yüksek olduğu yazılım projelerinde çevik yaklaşımlar daha iyi sonuç verir.",
      },
      {
        question: "Raporlama ne sıklıkta yapılıyor?",
        answer:
          "Standart olarak haftalık ilerleme raporu ve iki haftada bir yönlendirme komitesi toplantısı öneririz. Kritik fazlarda bu sıklık artırılır.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "iso-27001-bilgi-guvenligi-danismanligi",
    slug: "iso-27001-bilgi-guvenligi-danismanligi",
    title: "ISO 27001 Bilgi Güvenliği Danışmanlığı",
    metaDescription:
      "ISO 27001 Bilgi Güvenliği Yönetim Sistemi kurulumu, risk analizi, dokümantasyon ve sertifikasyon denetimine hazırlık. BTM Bilişim ile belgelendirmeye hazır olun.",
    content: `ISO 27001 danışmanlığımız, kurumunuzda yalnızca sertifika almayı değil, işleyen bir Bilgi Güvenliği Yönetim Sistemi (BGYS) kurmayı hedefler. Denetimde sorulan şey belgelerin varlığı değil, bilgi güvenliğini nasıl yönettiğinizdir.

## ISO 27001 nedir?

ISO 27001, bilgi varlıklarınızı gizlilik, bütünlük ve erişilebilirlik açısından koruyan bir yönetim sistemi standardıdır. Bir ürün değil, bir işletim biçimidir: riski tanımlar, kontrolleri uygular, kanıt üretir ve düzenli olarak gözden geçirirsiniz.

## Kapsamımız

- BGYS kapsamının belirlenmesi ve bağlam analizi
- Bilgi varlıkları envanteri ve sınıflandırması
- Risk değerlendirme metodolojisi ve risk işleme planı
- Ek A kontrollerinin uygulanması ve Uygulanabilirlik Bildirgesi (SoA)
- Politika, prosedür ve kayıt setinin kurumunuza göre hazırlanması
- Farkındalık eğitimi ve iç denetim
- Yönetimin gözden geçirmesi ve belgelendirme denetimine eşlik

## Nasıl çalışıyoruz?

1. **Boşluk analizi** — Mevcut durumunuz standardın gereklilikleriyle karşılaştırılır.
2. **Kurulum** — Kapsam, risk analizi ve dokümantasyon birlikte oluşturulur.
3. **Uygulama** — Kontroller sahaya yerleştirilir, kayıtlar üretilmeye başlanır.
4. **Denetime hazırlık** — İç denetim ve yönetim gözden geçirmesi yapılır, aşama 1 ve aşama 2 denetimlerine eşlik edilir.

## Sık yapılan hatalar

Kapsamı ilk sertifikasyonda tüm kuruma yaymak, risk analizini tamamen dışarıya bırakmak ve kimsenin okumadığı otuz sayfalık politikalar yazmak en yaygın hatalardır. KVKK uyumuyla karıştırılması da bunlardan biri; ikisinin farkı için [KVKK danışmanlığı](/danismanlik/kvkk-danismanligi/) sayfamıza bakabilirsiniz. Teknik kontrollerin kurulumu için [ISO 27001 teknik güvenlik çözümlerimizle](/siber-guvenlik/iso-27001-teknik-guvenlik-cozumleri/) birlikte ilerleyebiliriz.

## Kurumunuza kazandırdıkları

- Müşteri ve ihale şartnamelerindeki bilgi güvenliği koşullarının karşılanması
- Veri ihlali riskinin ölçülüp yönetilir hâle gelmesi
- KVKK teknik ve idari tedbirleriyle örtüşen bir kontrol seti
- Denetimlerde savunulabilir, kanıta dayalı bir sistem

Belgelendirme hedefinizi ve takviminizi konuşmak için [bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "ISO 27001 belgesini siz mi veriyorsunuz?",
        answer:
          "Hayır. Belgeyi akredite bir belgelendirme kuruluşu verir. Biz sistemi kurar, dokümantasyonu hazırlar, iç denetimi yapar ve belgelendirme denetimine sizinle birlikte gireriz.",
      },
      {
        question: "Kurulum ne kadar sürer?",
        answer:
          "Kurumun büyüklüğüne ve mevcut olgunluğuna göre genellikle 3-6 ay. Kapsamı dar tutup kritik birimlerle başlamak süreci belirgin biçimde kısaltır.",
      },
      {
        question: "KVKK uyumumuz varsa ISO 27001 daha mı kolay olur?",
        answer:
          "Evet. KVKK için aldığınız teknik ve idari tedbirlerin büyük kısmı ISO 27001 Ek A kontrolleriyle örtüşür; iki süreci birlikte yürütmek tekrar eden işi azaltır.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "kvkk-danismanligi",
    slug: "kvkk-danismanligi",
    title: "KVKK Danışmanlığı",
    metaDescription:
      "Kişisel veri envanteri, aydınlatma ve açık rıza metinleri, VERBİS kaydı ve ihlal müdahale süreciyle KVKK uyumunu işleyen bir sürece dönüştürün.",
    content: `KVKK danışmanlığımız, uyumu tek seferlik bir metin yazma işi olmaktan çıkarıp işleyen bir sürece dönüştürür. Denetimde sorulan şey aydınlatma metninin varlığı değil, kişisel veriyi uçtan uca nasıl yönettiğinizdir.

## KVKK uyumu neden bir süreçtir?

Yeni bir yazılım, yeni bir tedarikçi ya da yeni bir kampanya, veri işleme envanterinizi değiştirir. Bu nedenle uyum, bir kez kurulup bırakılan değil; yılda en az bir kez gözden geçirilen canlı bir yapıdır. Sürecin ilk ve en görünür adımı, veri işleme faaliyetlerinizi doğru anlatan bir aydınlatma metnidir.

## Kapsamımız

- Departman bazında kişisel veri işleme envanterinin çıkarılması
- Her işleme faaliyeti için hukuki sebebin belirlenmesi
- Aydınlatma metinleri ve gerekli yerlerde açık rıza metinlerinin hazırlanması
- Saklama ve imha politikası ile periyodik imha takvimi
- VERBİS kayıt ve güncelleme desteği
- Veri işleyen sözleşmelerine KVKK eklerinin eklenmesi
- Veri ihlali müdahale prosedürü ve 72 saatlik bildirim akışı
- İlgili kişi başvuru kanalı ve 30 günlük yanıt süreci
- Çalışan farkındalık eğitimi

## Nasıl çalışıyoruz?

1. **Envanter ve mevcut durum** — Hangi veriyi, neden, nerede ve ne kadar süre işlediğiniz haritalanır.
2. **Politika ve metinler** — Süreçlerinize uygun politika seti ve bilgilendirme metinleri hazırlanır.
3. **Teknik ve idari tedbirler** — Yetki matrisi, loglama, yedekleme ve erişim kontrolleri gözden geçirilir.
4. **Farkındalık ve tatbikat** — Ekipler eğitilir, ihlal müdahale prosedürü masabaşı tatbikatla denenir.

## Kurumunuza kazandırdıkları

- İdari para cezası riskinin azaltılması
- İlgili kişi başvurularına düzenli, süresinde yanıt
- Tedarikçi ve iş ortağı sözleşmelerinde net veri sorumluluğu
- ISO 27001 kontrolleriyle örtüşen, denetime hazır bir yapı

Kurumunuzun uyum düzeyini bir saatlik bir değerlendirme görüşmesinde birlikte çıkarabiliriz. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Sadece aydınlatma metni hazırlatsak yeterli olmaz mı?",
        answer:
          "Hayır. Metin, arkasında bir veri envanteri ve saklama/imha düzeni yoksa denetimde ilk turda anlaşılır. Aydınlatma metni sürecin çıktısıdır, başlangıcı değil.",
      },
      {
        question: "VERBİS'e kayıt olmak zorunda mıyız?",
        answer:
          "Zorunluluk, yıllık çalışan sayısı, mali bilanço büyüklüğü ve işlenen verinin niteliğine göre değişir. Değerlendirme sırasında kurumunuzun kayıt yükümlülüğü olup olmadığını netleştiririz.",
      },
      {
        question: "Uyum sürecini ne kadar sürede tamamlarız?",
        answer:
          "Temel envanter, metinler ve politikalar genellikle 8-12 haftada devreye girer. Farkındalık eğitimi ve ihlal tatbikatı bu sürenin son ayında yapılır.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "bilgi-teknolojileri-it-danismanligi",
    slug: "bilgi-teknolojileri-it-danismanligi",
    title: "Bilgi Teknolojileri (IT) Danışmanlığı",
    metaDescription:
      "Teknoloji yol haritası, sistem seçimi, IT bütçesi ve altyapı değerlendirmesi. BTM Bilişim ile bilgi teknolojisi kararlarınızı iş hedeflerinize hizalayın.",
    content: `Bilgi teknolojileri danışmanlığımız, IT'yi bir masraf kalemi olmaktan çıkarıp iş hedeflerinize hizmet eden bir yatırım hâline getirmenize yardımcı olur. Mevcut altyapınızı değerlendirir, önceliklendirilmiş bir yol haritası çıkarırız.

## Ne zaman IT danışmanlığına ihtiyaç duyulur?

Büyüyen kullanıcı sayısı, birbirine konuşmayan sistemler, artan destek yükü, belirsiz IT bütçesi ve "bir sonraki yatırım ne olmalı?" sorusuna net cevap verilememesi tipik işaretlerdir. Bu noktada tarafsız, satıcıdan bağımsız bir değerlendirme kararları hızlandırır.

## Kapsamımız

- Mevcut altyapı, uygulama ve lisans envanterinin değerlendirilmesi
- Teknoloji yol haritası ve 12-24 aylık yatırım planı
- Satıcıdan bağımsız sistem/yazılım seçimi ve karşılaştırma
- IT bütçesi ve toplam sahip olma maliyeti (TCO) analizi
- Bulut mu, yerinde mi kararı için mimari değerlendirme
- Bilgi güvenliği ve yedekleme olgunluğunun gözden geçirilmesi
- IT organizasyonu, süreçleri ve dış kaynak stratejisi

## Nasıl çalışıyoruz?

1. **Değerlendirme** — Altyapı, uygulamalar, maliyetler ve ekip yapısı incelenir.
2. **Boşluk ve risk analizi** — İş hedefleriyle mevcut durum arasındaki fark ortaya konur.
3. **Yol haritası** — Önceliklendirilmiş, bütçelenmiş bir eylem planı sunulur.
4. **Uygulama desteği** — İsteğe bağlı olarak seçim, geçiş ve tedarikçi yönetiminde eşlik edilir.

## İlgili hizmetler

Yol haritası çıktıktan sonra uygulama tarafında [sistem ve network danışmanlığı](/sistem-network/sistem-ve-network-danismanligi/), [bulut çözümleri](/bulut-yedekleme/bulut-cozumleri/) ve [Logo ERP danışmanlığı](/danismanlik/logo-erp-destek-ve-danismanlik/) ile devam edebiliriz. Envanter ve talep yönetimini kalıcı hâle getirmek için [Orbit IT operasyon platformu](/yazilim-urunlerimiz/orbit/) değerlendirilebilir.

## Kurumunuza kazandırdıkları

- Yatırım kararlarının "acil ihtiyaç" yerine plana dayanması
- Gereksiz lisans ve altyapı maliyetlerinin görünür olması
- Sistem seçimlerinde tek bir tedarikçinin görüşüne bağımlı kalmama
- IT ile iş birimleri arasındaki dilin ortaklaşması

Mevcut IT tablonuzu ve önümüzdeki yıl planınızı birlikte gözden geçirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Belirli bir marka veya ürünü mü öneriyorsunuz?",
        answer:
          "Hayır. Değerlendirmeyi satıcıdan bağımsız yaparız; ihtiyaç, bütçe ve mevcut altyapıya göre alternatifleri karşılaştırır, kararı gerekçeleriyle size bırakırız.",
      },
      {
        question: "Küçük bir IT ekibimiz var, danışmanlık bizi ikame eder mi?",
        answer:
          "Hayır. Amaç ekibinizi güçlendirmektir: yol haritası, öncelik ve süreç disiplini sağlar, yoğun dönemlerde ya da uzmanlık gerektiren kararlarda destek oluruz.",
      },
      {
        question: "Çıktı olarak ne alıyoruz?",
        answer:
          "Mevcut durum raporu, risk ve boşluk analizi ve önceliklendirilmiş, bütçelenmiş bir teknoloji yol haritası. İsterseniz sunum formatında yönetime birlikte aktarırız.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "logo-erp-destek-ve-danismanlik",
    slug: "logo-erp-destek-ve-danismanlik",
    title: "Logo ERP Destek ve Danışmanlık",
    metaDescription:
      "Logo Tiger, GO ve j-Platform için kurulum, sürüm geçişi, süreç optimizasyonu, entegrasyon ve kullanıcı eğitimi. BTM Bilişim ile Logo ERP'nizden tam verim alın.",
    content: `Logo ERP destek ve danışmanlık hizmetimiz; Logo Tiger, GO ve j-Platform kullanan kurumların sistemlerini doğru kurgulaması, güncel tutması ve iş süreçleriyle hizalamasına odaklanır.

## Yaygın Logo ERP sorunları

Çoğu kurumda Logo, kurulduğu günkü ayarlarla çalışmaya devam eder: kullanılmayan modüller, elle yapılan tekrar işler, Excel'e alınıp dışarıda hesaplanan raporlar ve sürüm geçişi ertelendiği için alınamayan yeni özellikler. Bunların her biri hem zaman hem de veri güvenilirliği kaybıdır.

## Kapsamımız

- Logo Tiger / GO / j-Platform kurulumu ve sürüm yükseltme (upgrade)
- Firma, dönem, ambar ve hesap planı yapılandırması
- Malzeme, cari ve muhasebe entegrasyon parametrelerinin gözden geçirilmesi
- Elle yürütülen işlerin modül içi süreçlere taşınması
- Özel rapor, Logo Object ve dış uygulama entegrasyonları
- Kullanıcı yetkilendirme ve rol düzeninin kurulması
- Son kullanıcı ve kilit kullanıcı eğitimleri
- Dönemsel bakım ve öncelikli destek

## Nasıl çalışıyoruz?

1. **Sistem incelemesi** — Mevcut kurulum, sürüm, kullanılan modüller ve manuel işler çıkarılır.
2. **İyileştirme planı** — Hızlı kazanımlar ve orta vadeli düzenlemeler önceliklendirilir.
3. **Uygulama** — Yapılandırma, entegrasyon ve raporlar test ortamında kurulur, sonra canlıya alınır.
4. **Eğitim ve destek** — Kullanıcılar eğitilir, geçiş sonrası destek verilir.

## Entegrasyon ve raporlama

Logo verinizi bütçe ve yönetim raporlaması için kullanmak istiyorsanız, [Atlas Bütçe ve Raporlama Yazılımı](/yazilim-urunlerimiz/atlas/) Logo ile entegre çalışarak bütçe–gerçekleşme sapmasını hesap kalemi düzeyinde gösterir. Daha geniş sistem entegrasyonları için [ERP entegrasyonları hizmetimize](/yazilim-dijital/erp-entegrasyonlari/) bakabilirsiniz.

## Kurumunuza kazandırdıkları

- Tekrar eden manuel işlerin azalması
- Güncel sürümle gelen özelliklerin kullanılabilmesi
- Raporların sistemden, tek doğrulukla alınması
- Yetki karmaşasının ve veri hatalarının düşmesi

Mevcut Logo kurulumunuzu kısa bir değerlendirmeyle gözden geçirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Logo çözüm ortağı mısınız, lisans da satıyor musunuz?",
        answer:
          "Odağımız kurulum, danışmanlık, entegrasyon ve destektir. Lisans tedarikinde mevcut Logo iş ortağınızla çalışmaya devam edebilir ya da tedarik için sizi doğru kanala yönlendirebiliriz.",
      },
      {
        question: "Eski bir Logo sürümündeyiz, geçiş riskli mi?",
        answer:
          "Sürüm geçişi test ortamında prova edilerek yapılır; veri, özel raporlar ve entegrasyonlar önceden kontrol edilir. Canlıya geçiş genellikle mesai dışında, geri dönüş planıyla uygulanır.",
      },
      {
        question: "Sadece kullanıcı eğitimi alabilir miyiz?",
        answer:
          "Evet. Kilit kullanıcı ve son kullanıcı eğitimlerini bağımsız bir hizmet olarak, kurumunuzun kullandığı modüllere göre planlıyoruz.",
      },
    ],
  },
  {
    categorySlug: "danismanlik",
    serviceKey: "yazilim-ve-dijital-donusum-danismanligi",
    slug: "yazilim-ve-dijital-donusum-danismanligi",
    title: "Yazılım ve Dijital Dönüşüm Danışmanlığı",
    metaDescription:
      "Süreç dijitalleştirme, yazılım mimarisi, satın al/geliştir kararı ve dönüşüm yol haritasıyla dijital dönüşümü planlı bir programa dönüştürün.",
    content: `Yazılım ve dijital dönüşüm danışmanlığımız, "dijitalleşelim" hedefini ölçülebilir bir programa çevirir. Hangi sürecin, hangi sırayla, hangi araçla dijitalleştirileceğine iş etkisine göre karar veririz.

## Dijital dönüşüm nerede tıkanır?

Dönüşüm çoğu zaman araç alarak başlar, süreç tasarlanmadan uygulanır ve kullanıcı benimsemesi sağlanamadığı için yarım kalır. Doğru sıralama tersidir: önce süreç ve veri, sonra araç, en sonda ölçüm ve yaygınlaştırma.

## Kapsamımız

- Mevcut süreçlerin haritalanması ve dijitalleşme önceliklendirmesi
- Satın al / geliştir / uyarlama kararı için değerlendirme
- Yazılım mimarisi ve entegrasyon stratejisi
- Veri modeli ve raporlama ihtiyaçlarının tanımlanması
- Tedarikçi seçimi ve teklif değerlendirme desteği
- Pilot uygulama, başarı ölçütleri ve yaygınlaştırma planı
- Değişim yönetimi ve kullanıcı benimseme desteği

## Nasıl çalışıyoruz?

1. **Keşif** — İş hedefleri, mevcut süreçler ve sistemler incelenir.
2. **Fırsat haritası** — Dijitalleşecek süreçler etki/efor matrisine yerleştirilir.
3. **Yol haritası** — Fazlara bölünmüş, sahiplenmesi net bir program çıkarılır.
4. **Uygulama gözetimi** — Tedarikçi ve iç ekiplerle birlikte pilot ve yaygınlaştırma yönetilir.

## Uygulama tarafı

Karar aşamasından sonra geliştirme ihtiyacında [özel yazılım geliştirme](/yazilim-dijital/ozel-yazilim-gelistirme/), [iş süreci otomasyonları](/yazilim-dijital/is-sureci-otomasyonlari/) ve [raporlama ve dashboard çözümleri](/yazilim-dijital/raporlama-ve-dashboard-cozumleri/) hizmetlerimizle devam edilebilir. Program yönetimi için [proje danışmanlığı](/danismanlik/proje-danismanligi/) ile birlikte yürütülür.

## Kurumunuza kazandırdıkları

- Yatırımların iş etkisine göre sıralanması
- "Araç aldık ama kullanılmıyor" tablosunun önlenmesi
- Sistemler arası entegrasyonun baştan planlanması
- Dönüşümün ölçülebilir hedeflerle takip edilmesi

Dijital dönüşüm önceliklerinizi birlikte netleştirmek için [bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Dijital dönüşüm sadece büyük şirketler için mi?",
        answer:
          "Hayır. Ölçek küçüldükçe kapsam daralır ama mantık aynıdır: en çok zaman kaybettiren birkaç süreci seçip dijitalleştirmek, küçük ekiplerde bile hızlı geri dönüş sağlar.",
      },
      {
        question: "Yazılımı siz mi geliştiriyorsunuz?",
        answer:
          "Danışmanlık aşamasında bağımsız kalırız; satın alma da geçerli bir seçenektir. Geliştirme gerekiyorsa yazılım ekibimizle uçtan uca üstlenebilir ya da seçtiğiniz tedarikçiyi yönetebiliriz.",
      },
      {
        question: "İlk çıktı ne olur?",
        answer:
          "Süreç haritası, önceliklendirilmiş fırsat listesi ve fazlara bölünmüş bir dönüşüm yol haritası. Genellikle 4-6 haftada teslim edilir.",
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
      "Güvenlik olgunluk değerlendirmesi, risk analizi ve önceliklendirilmiş yol haritası. BTM Bilişim ile siber güvenlik yatırımlarınızı doğru sıraya koyun.",
    content: `Siber güvenlik danışmanlığımız, kurumunuzun güvenlik olgunluğunu tarafsız biçimde değerlendirir ve bütçenizi en çok riski azaltacak yerden başlayarak harcamanız için önceliklendirilmiş bir yol haritası çıkarır.

## Neden önce değerlendirme?

Güvenlik yatırımları çoğu zaman en son duyulan tehdide göre yapılır; oysa kurumun gerçek zayıf noktası başka yerdedir. Bir olgunluk değerlendirmesi, "neyimiz var, neyimiz eksik, en kritik açık nerede?" sorularına kanıtla cevap verir.

## Kapsamımız

- NIST CSF / ISO 27001 çerçevesine göre güvenlik olgunluk değerlendirmesi
- Varlık envanteri ve saldırı yüzeyinin çıkarılması
- Teknik kontrollerin (firewall, EDR, e-posta, yedekleme, kimlik) gözden geçirilmesi
- Politika, süreç ve yetkilendirme incelemesi
- Risklerin iş etkisine göre önceliklendirilmesi
- 12 aylık güvenlik yol haritası ve bütçe önerisi
- Yönetim ve teknik ekip için ayrı raporlama

## Nasıl çalışıyoruz?

1. **Keşif** — Mevcut kontroller, mimari ve süreçler incelenir; ekiplerle görüşülür.
2. **Boşluk analizi** — Bulgular çerçeveyle eşleştirilir, risk seviyeleri belirlenir.
3. **Yol haritası** — Hızlı kazanımlar ve orta vadeli projeler ayrı ayrı planlanır.
4. **Takip** — Belirli aralıklarla ilerleme yeniden değerlendirilir.

## Sonraki adımlar

Bulgulara göre [sızma testi](/siber-guvenlik/sizma-testi-penetrasyon-testi/), [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/), [EDR](/siber-guvenlik/edr-antivirus-cozumleri/) veya [DLP](/siber-guvenlik/dlp-veri-kaybi-onleme-cozumleri/) çözümleriyle devam edilir. Sürekli izleme ihtiyacı için [CyberWare](/yazilim-urunlerimiz/cyberware/) değerlendirilebilir.

## Kurumunuza kazandırdıkları

- Güvenlik bütçesinin en yüksek riskten başlayarak kullanılması
- Yönetime anlaşılır bir risk tablosu
- Denetim ve müşteri sorularına hazır kanıt
- Tek tedarikçiye bağımlı olmayan, gerekçeli kararlar

Güvenlik olgunluğunuzu ölçmek için [bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Danışmanlık sonunda ürün satışı mı geliyor?",
        answer:
          "Değerlendirme üründen bağımsızdır. Yol haritası bazen mevcut araçların doğru yapılandırılmasını, bazen yeni bir çözümü önerir; kararı gerekçeleriyle size bırakırız.",
      },
      {
        question: "KOBİ için de anlamlı mı?",
        answer:
          "Evet. Küçük kurumlarda kapsam daralır, değerlendirme birkaç gün sürer ve çıktı genellikle birkaç yüksek etkili, düşük maliyetli adıma odaklanır.",
      },
      {
        question: "Ne sıklıkla tekrarlanmalı?",
        answer:
          "Yılda bir kez ve önemli bir altyapı, uygulama ya da organizasyon değişikliğinden sonra yeniden değerlendirme öneririz.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "sizma-testi-penetrasyon-testi",
    slug: "sizma-testi-penetrasyon-testi",
    title: "Sızma Testi (Penetrasyon Testi)",
    metaDescription:
      "Web, mobil, ağ ve dış/iç altyapı sızma testleri. BTM Bilişim ile zafiyetleri gerçek saldırgan bakışıyla tespit edin, kanıtlı raporla kapatın, yeniden test edin.",
    content: `Sızma testi hizmetimiz, sistemlerinizi gerçek bir saldırganın bakış açısıyla, açıkları zincirleyerek hedefe ulaşmaya çalışan uzmanlarca test eder. Amaç açık saymak değil, iş etkisini göstermektir.

## Tarama mı, test mi?

Zafiyet taraması otomatik araçlarla bilinen açıkları listeler; hızlı ve geniştir ama bağlamı yoktur. Sızma testi ise bir uzmanın manuel çalışmasıdır: hangi açığın gerçekten sömürülebilir olduğunu ve nereye kadar gidilebildiğini gösterir. Yıllık tek seferlik testin yetersiz kaldığı durumlar için [PentForce otonom sızma testi platformumuza](/yazilim-urunlerimiz/pentforce/) göz atabilirsiniz.

## Test kapsamları

- **Dış ağ sızma testi** — İnternete açık servisler ve saldırı yüzeyi
- **İç ağ sızma testi** — İçeri sızmış bir saldırganın yanal hareketi
- **Web uygulaması testi** — OWASP Top 10 ve iş mantığı zafiyetleri
- **Mobil uygulama testi** — Android/iOS istemci ve API katmanı
- **API testi** — Kimlik doğrulama, yetkilendirme ve veri sızıntısı
- **Kablosuz ağ testi** — Wi-Fi yapılandırması ve erişim kontrolü
- **Sosyal mühendislik / kimlik avı simülasyonu** — Kullanıcı farkındalığı

## Nasıl çalışıyoruz?

1. **Kapsam ve yetkilendirme** — Hedefler, zaman penceresi ve kurallar yazılı olarak belirlenir.
2. **Keşif ve zafiyet tespiti** — Bilgi toplama, tarama ve manuel doğrulama yapılır.
3. **Sömürü ve zincirleme** — Doğrulanan açıklar kontrollü biçimde istismar edilir.
4. **Raporlama** — Bulgular CVSS ile önceliklendirilir, kanıt (ekran görüntüsü/log) ve çözüm önerisiyle sunulur.
5. **Yeniden test** — Kapatılan bulgular ücretsiz retest ile doğrulanır.

## Sürekli test yaklaşımı

Yılda bir testin yanında sürekli bir program için yapay zekâ destekli otonom pentest platformu [PentForce](/yazilim-urunlerimiz/pentforce/) ile dış yüzeyi düzenli tarayabilir, kritik yayınlarda hedefli test yaptırabilirsiniz.

## Kurumunuza kazandırdıkları

- Gerçekten sömürülebilir açıkların önce kapatılması
- Müşteri ve ihale şartnamelerindeki pentest koşulunun karşılanması
- Yönetime iş diliyle yazılmış risk özeti
- Düzeltmelerin retest ile kanıtlanması

Test kapsamınızı ve takviminizi konuşmak için [bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Test sistemlerimize zarar verir mi?",
        answer:
          "Test, önceden yazılı olarak belirlenen kurallar ve zaman penceresi içinde yapılır. Servis kesintisi riski olan adımlar mesai dışına alınır veya test ortamında yürütülür.",
      },
      {
        question: "Kara kutu mu, gri kutu mu test yapıyorsunuz?",
        answer:
          "Her ikisi de mümkün. Gri kutu (kısmi bilgi/hesap verilmesi) genellikle aynı sürede daha derin kapsam sağladığı için önerilir; ihtiyaca göre kara kutu da yaparız.",
      },
      {
        question: "Rapor kimin için yazılıyor?",
        answer:
          "Raporda hem yönetime yönelik bir yönetici özeti hem de teknik ekibe yönelik, adım adım yeniden üretim ve çözüm talimatı bulunur.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "guvenlik-acigi-ve-zafiyet-analizi",
    slug: "guvenlik-acigi-ve-zafiyet-analizi",
    title: "Güvenlik Açığı ve Zafiyet Analizi",
    metaDescription:
      "Düzenli zafiyet taraması, kimlik doğrulamalı analiz ve önceliklendirilmiş bulgu raporlama. BTM Bilişim ile açıkları büyümeden görün ve kapatma sürecini yönetin.",
    content: `Güvenlik açığı ve zafiyet analizi hizmetimiz, sistemlerinizdeki bilinen açıkları düzenli olarak tarar, doğrular ve iş etkisine göre önceliklendirilmiş raporlarla kapatma sürecinizi besler.

## Zafiyet yönetimi neden süreklidir?

Her hafta yeni zafiyetler yayımlanır; dün güvenli olan bir sunucu bugün açık hâle gelebilir. Tek seferlik tarama bir fotoğraftır. Değer, taramanın düzenli tekrarlanması ve bulguların gerçekten kapatılıp doğrulanmasındadır.

## Kapsamımız

- Dış ve iç ağ zafiyet taraması
- Kimlik doğrulamalı (authenticated) tarama ile derin tespit
- Sunucu, ağ cihazı, uç nokta ve uygulama kapsamı
- Yanlış pozitiflerin manuel elenmesi
- CVSS ve iş bağlamına göre önceliklendirme
- Yama ve sıkılaştırma önerileriyle bulgu raporu
- Dönemsel kıyas (trend) raporlaması ve kapatma takibi

## Nasıl çalışıyoruz?

1. **Kapsam belirleme** — Taranacak varlıklar ve tarama sıklığı tanımlanır.
2. **Tarama** — Otomatik araçlarla dış ve iç kapsam taranır.
3. **Doğrulama** — Kritik bulgular manuel olarak teyit edilir, yanlış pozitifler elenir.
4. **Raporlama ve takip** — Önceliklendirilmiş bulgular paylaşılır, sonraki taramada kapanma kontrol edilir.

## Sızma testinden farkı

Zafiyet analizi geniş ve sıktır, bilinen açıkları bulur. [Sızma testi](/siber-guvenlik/sizma-testi-penetrasyon-testi/) ise dar ve derindir, açıkları zincirleyerek iş etkisini gösterir. Sağlıklı bir program ikisini birlikte içerir; [siber güvenlik danışmanlığı](/siber-guvenlik/siber-guvenlik-danismanligi/) ile doğru dengeyi kurarız.

## Kurumunuza kazandırdıkları

- Kritik açıkların istismar edilmeden önce görülmesi
- Yama önceliğinin tahminle değil veriyle belirlenmesi
- Denetimler için düzenli tarama kaydı
- Zamanla azalan bir zafiyet trendi

Kapsamınızı ve tarama sıklığınızı planlamak için [bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Ne sıklıkla taramalıyız?",
        answer:
          "İnternete açık varlıklar için aylık, iç ağ için üç aylık tarama yaygın bir başlangıçtır. Kritik değişikliklerden sonra ek tarama yapılır.",
      },
      {
        question: "Tarama üretim sistemlerini yavaşlatır mı?",
        answer:
          "Tarama yoğunluğu ayarlanabilir ve hassas sistemler için düşük etkili profillerle ya da mesai dışında çalıştırılır. Kapsam belirlerken bunu birlikte planlarız.",
      },
      {
        question: "Bulguları biz mi kapatıyoruz?",
        answer:
          "Kapatma işini ekibiniz ya da bizim sistem/network ekibimiz üstlenebilir. Her bulgu için somut yama ve sıkılaştırma adımları rapora eklenir.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "firewall-ve-ag-guvenligi",
    slug: "firewall-ve-ag-guvenligi",
    title: "Firewall ve Ağ Güvenliği",
    metaDescription:
      "Yeni nesil güvenlik duvarı kurulumu, kural optimizasyonu, segmentasyon ve ağ trafiği izleme. BTM Bilişim ile ağ sınırınızı ve iç trafiğinizi kontrol altına alın.",
    content: `Firewall ve ağ güvenliği hizmetimiz, kurumsal ağınızın sınırını ve iç trafiğini kontrol altına alır. Yeni nesil güvenlik duvarlarını doğru kurgular, kural setinizi sadeleştirir ve trafiği sürekli izleriz.

## Yaygın sorunlar

Güvenlik duvarları zamanla "any-any" kurallarıyla dolar, kullanılmayan kurallar kalır ve gerçek trafik görünmez hâle gelir. İç ağ genellikle düzdür: bir cihaz ele geçince saldırgan yanal olarak her yere ulaşır. Segmentasyon ve kural hijyeni bu iki sorunu çözer.

## Kapsamımız

- Yeni nesil güvenlik duvarı (NGFW) kurulumu ve yapılandırması
- Kural seti denetimi, sadeleştirme ve gereksiz kuralların kaldırılması
- Ağ segmentasyonu ve VLAN tasarımı (kullanıcı, sunucu, misafir, OT/IoT)
- IPS/IDS, uygulama kontrolü ve web filtreleme politikaları
- Uzaktan erişim için güvenli VPN yapılandırması
- Loglama ve SIEM entegrasyonu
- Yüksek erişilebilirlik (HA) ve yedeklilik kurgusu

## Nasıl çalışıyoruz?

1. **Mevcut durum analizi** — Topoloji, kural setleri ve trafik akışları incelenir.
2. **Tasarım** — Segmentasyon planı ve politika seti hazırlanır.
3. **Uygulama** — Değişiklikler bakım penceresinde, geri dönüş planıyla devreye alınır.
4. **İzleme** — Trafik ve olaylar izlenir, kurallar dönemsel olarak gözden geçirilir.

## İlgili çözümler

Uç nokta tarafında [EDR / antivirüs çözümleri](/siber-guvenlik/edr-antivirus-cozumleri/), merkezi görünürlük için [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/) ile birlikte konumlandırılır. Ağ tasarımının tamamı için [sistem ve network çözümlerimize](/sistem-network/) bakabilirsiniz.

## Kurumunuza kazandırdıkları

- Ağ sınırında net, denetlenebilir bir kural seti
- Segmentasyonla sınırlanan yanal hareket riski
- Trafik ve tehditlerde görünürlük
- Uzaktan erişimin güvenli ve izlenebilir olması

Mevcut güvenlik duvarı kurulumunuzu birlikte gözden geçirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Mevcut güvenlik duvarımızı değiştirmemiz gerekir mi?",
        answer:
          "Zorunlu değil. Önce mevcut cihazın sürümü, kapasitesi ve lisansları değerlendirilir; çoğu zaman doğru yapılandırma ve kural hijyeni belirgin iyileşme sağlar.",
      },
      {
        question: "Segmentasyon operasyonu böler mi?",
        answer:
          "Segmentasyon kademeli uygulanır; önce izleme modunda trafik gözlemlenir, sonra kurallar sıkılaştırılır. Böylece kesinti riski en aza iner.",
      },
      {
        question: "Hangi markalarla çalışıyorsunuz?",
        answer:
          "Yaygın kurumsal NGFW ailelerinin çoğuyla çalışıyoruz. Marka bağımsız yaklaşır, mevcut yatırımınız ve ihtiyacınıza göre öneride bulunuruz.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "edr-antivirus-cozumleri",
    slug: "edr-antivirus-cozumleri",
    title: "EDR / Antivirüs Çözümleri",
    metaDescription:
      "Uç nokta tehdit tespiti ve müdahale (EDR), merkezi antivirüs yönetimi ve fidye yazılımı koruması. BTM Bilişim ile uç noktalarınızı görünür ve savunulabilir kılın.",
    content: `EDR ve antivirüs çözümlerimiz, kullanıcı bilgisayarları ve sunucularınızı yalnızca bilinen zararlılara karşı değil, davranışsal olarak yeni ve hedefli saldırılara karşı da korur.

## Antivirüs neden tek başına yetmez?

Klasik antivirüs imza tabanlıdır: bilmediği zararlıyı kaçırır. Fidye yazılımları ve "dosyasız" saldırılar tam olarak bunu hedefler. EDR, uç noktadaki süreç, komut ve ağ davranışını izleyerek şüpheli zinciri yakalar ve otomatik yanıt verebilir.

## Kapsamımız

- EDR/EPP çözümünün kurumsal yapıya uygun seçimi ve kurulumu
- Politika tasarımı: engelleme, karantina ve otomatik yanıt kuralları
- Fidye yazılımına karşı davranışsal koruma ve geri alma (rollback)
- Sunucu ve kritik iş istasyonları için sıkılaştırma
- Uyarıların önceliklendirilmesi ve olay müdahale akışı
- SIEM entegrasyonu ve merkezi raporlama
- Dağıtım, güncelleme ve sağlık kontrolünün yönetimi

## Nasıl çalışıyoruz?

1. **Değerlendirme** — Uç nokta envanteri, mevcut koruma ve riskli senaryolar çıkarılır.
2. **Pilot** — Seçilen çözüm bir grup cihazda izleme modunda denenir.
3. **Yaygınlaştırma** — Politikalar kademeli sıkılaştırılarak tüm filoya dağıtılır.
4. **Operasyon** — Uyarılar izlenir, aylık sağlık ve tehdit raporu paylaşılır.

## İlgili çözümler

Veri sızıntısı tarafında [DLP çözümleri](/siber-guvenlik/dlp-veri-kaybi-onleme-cozumleri/), merkezi olay görünürlüğü için [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/) ile birlikte kullanılır. Uçtan uca izleme için [CyberWare](/yazilim-urunlerimiz/cyberware/) değerlendirilebilir.

## Kurumunuza kazandırdıkları

- Bilinmeyen ve hedefli saldırılara karşı davranışsal koruma
- Fidye yazılımı olaylarında hızlı tespit ve geri alma
- Uç noktalarda tek panelden görünürlük
- Olaylara dair kanıt ve raporlama

Uç nokta koruma ihtiyacınızı konuşmak için [bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "EDR bilgisayarları yavaşlatır mı?",
        answer:
          "Modern EDR ajanları düşük kaynak kullanır. Pilot aşamasında performans etkisi ölçülür ve politikalar buna göre ayarlanır.",
      },
      {
        question: "Mevcut antivirüsümüzü kaldırmamız gerekir mi?",
        answer:
          "Genellikle evet; iki gerçek zamanlı koruma ajanı çakışabilir. Geçiş, eski ajanın kaldırılıp yenisinin dağıtılmasıyla planlı yapılır.",
      },
      {
        question: "7/24 izleme sağlıyor musunuz?",
        answer:
          "Uyarı önceliklendirme ve olay müdahale akışını kurarız. Sürekli izleme ihtiyacınız varsa yönetilen hizmet modelini birlikte tasarlarız.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "dlp-veri-kaybi-onleme-cozumleri",
    slug: "dlp-veri-kaybi-onleme-cozumleri",
    title: "DLP – Veri Kaybı Önleme Çözümleri",
    metaDescription:
      "Hassas verinin e-posta, USB, bulut ve web kanallarından sızmasını engelleyen DLP politikaları. BTM Bilişim ile veri sınıflandırma ve kaçak önlemeyi birlikte kurun.",
    content: `DLP (Data Loss Prevention) çözümlerimiz, kurumunuzun hassas verisinin izinsiz biçimde dışarı çıkmasını engeller. Finansal bilgi, müşteri verisi, sözleşme ve fikri mülkiyet gibi içeriklerin kanallarını politika ile kontrol altına alırız.

## DLP hangi sorunu çözer?

Veri sızıntılarının büyük kısmı dış saldırı değil, iç kaynaklıdır: yanlış alıcıya giden e-posta, kişisel buluta yüklenen dosya, USB'ye kopyalanan müşteri listesi. DLP bu kanalları izler, uyarır ve gerektiğinde durdurur.

## Kapsamımız

- Veri sınıflandırma şeması ve etiketleme politikası
- E-posta, web, bulut depolama ve USB/uç nokta kanallarında DLP kuralları
- Hazır şablonlar (KVKK kişisel verisi, kart verisi, IBAN, TCKN vb.) ve özel desenler
- Olay iş akışı: bilgilendirme, onaya gönderme, engelleme
- İstisna ve iş gerekçesi (justification) yönetimi
- Uyum ve denetim raporlaması
- Kullanıcı farkındalık bildirimleri

## Nasıl çalışıyoruz?

1. **Veri keşfi** — Hassas verinin nerede durduğu ve nasıl hareket ettiği belirlenir.
2. **Politika tasarımı** — Sınıflandırma ve kanal kuralları önce izleme modunda kurulur.
3. **Ayarlama** — Yanlış pozitifler azaltılır, kritik kurallar engellemeye alınır.
4. **Operasyon** — Olaylar incelenir, politika ve istisnalar dönemsel güncellenir.

## İlgili çözümler

Personel aktivitesiyle birlikte DLP için [CyberQuan](/yazilim-urunlerimiz/cyberquan/), KVKK uyum süreciyle bütünleşik ilerlemek için [KVKK danışmanlığı](/danismanlik/kvkk-danismanligi/) ile birlikte konumlandırılır.

## Kurumunuza kazandırdıkları

- Kişisel ve ticari verinin kanal bazında kontrolü
- Kaza kaynaklı sızıntıların erken durdurulması
- KVKK ve sözleşmesel veri koruma yükümlülüklerine kanıt
- Hangi verinin nereye gittiğine dair görünürlük

Veri sızıntısı risklerinizi birlikte değerlendirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "DLP çalışanları rahatsız eder mi?",
        answer:
          "İyi tasarlanmış DLP çoğunlukla sessizdir; yalnızca tanımlı hassas veri, tanımlı kanaldan çıkmaya çalışınca devreye girer. İzleme modunda başlayıp kuralları kademeli sıkılaştırırız.",
      },
      {
        question: "Bulut uygulamalarındaki veriyi de kapsar mı?",
        answer:
          "Evet. Microsoft 365, web yükleme ve senkronizasyon istemcileri kapsanabilir. Kapsam, kullandığınız servislere göre planlanır.",
      },
      {
        question: "Önce veri sınıflandırması şart mı?",
        answer:
          "Şart değil ama çok yardımcı olur. Hazır desenlerle hızlı başlayıp, sınıflandırma/etiketleme ile zamanla isabeti artırmak yaygın bir yoldur.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "siem-ve-log-yonetimi",
    slug: "siem-ve-log-yonetimi",
    title: "SIEM ve Log Yönetimi",
    metaDescription:
      "Merkezi log toplama, korelasyon, alarm ve uyum raporlaması. BTM Bilişim ile güvenlik olaylarını erken görün, denetim için gereken kaydı eksiksiz tutun.",
    content: `SIEM ve log yönetimi hizmetimiz, dağınık sistemlerinizin kayıtlarını tek merkezde toplar, ilişkilendirir ve anlamlı alarmlara dönüştürür. Böylece bir saldırıyı olduktan sonra değil, gelişirken fark edersiniz.

## Neden merkezi log?

Sunucu, güvenlik duvarı, EDR, kimlik sistemi ve uygulamalar ayrı ayrı log tutar. Bir olayın izini bu adaların hepsinde tek tek aramak yavaş ve eksiktir. SIEM, olayları birleştirip "şu kullanıcı, şu saatte, şu IP'den başarısız girişten sonra şu sunucuya erişti" gibi bir zinciri tek ekranda gösterir.

## Kapsamımız

- Log kaynaklarının envanteri ve entegrasyonu (sunucu, ağ, güvenlik, kimlik, uygulama)
- Merkezi toplama, normalize etme ve saklama politikası
- Korelasyon kuralları ve önceliklendirilmiş alarm setinin kurulması
- Use-case kütüphanesi: kaba kuvvet, ayrıcalık yükseltme, veri çıkışı, imkânsız seyahat vb.
- Panolar ve dönemsel güvenlik raporları
- Uyum raporlaması (ISO 27001, KVKK, denetim izi)
- Alarm bakımı ve yanlış pozitif azaltma

## Nasıl çalışıyoruz?

1. **Tasarım** — Hangi kaynakların, ne kadar süre ve hangi amaçla toplanacağı belirlenir.
2. **Entegrasyon** — Kaynaklar bağlanır, log formatları normalize edilir.
3. **Kural geliştirme** — Kuruma özel korelasyon kuralları ve alarm eşikleri yazılır.
4. **Operasyon** — Alarmlar izlenir, kurallar sürekli iyileştirilir.

## İlgili çözümler

Uç nokta telemetrisi için [EDR çözümleri](/siber-guvenlik/edr-antivirus-cozumleri/), sınır trafiği için [firewall ve ağ güvenliği](/siber-guvenlik/firewall-ve-ag-guvenligi/) ana besleyen kaynaklardır. Hazır bir olay panosu için [CyberWare](/yazilim-urunlerimiz/cyberware/) değerlendirilebilir.

## Kurumunuza kazandırdıkları

- Olayların erken aşamada tespiti
- Adli inceleme için eksiksiz, merkezi kayıt
- Denetim ve uyum süreçlerinde hazır raporlar
- Gürültü yerine önceliklendirilmiş, az sayıda anlamlı alarm

Log yönetimi ve SIEM ihtiyacınızı konuşmak için [bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "SIEM çok fazla alarm üretmez mi?",
        answer:
          "Kötü ayarlanmış SIEM üretir. Biz az sayıda, yüksek isabetli use-case ile başlar, yanlış pozitifleri düzenli olarak eleyerek alarm kalitesini yüksek tutarız.",
      },
      {
        question: "Logları ne kadar süre saklamalıyız?",
        answer:
          "İhtiyaç ve mevzuata göre değişir; sık erişilen sıcak veri için birkaç ay, denetim için daha uzun arşiv yaygın bir modeldir. Saklama politikasını birlikte belirleriz.",
      },
      {
        question: "Bulut ve şirket içi kaynakları birlikte toplayabilir miyiz?",
        answer:
          "Evet. Microsoft 365, Azure/AWS ve şirket içi sistemler aynı SIEM'de birleştirilebilir; korelasyon kuralları her iki tarafı da kapsayacak şekilde yazılır.",
      },
    ],
  },
  {
    categorySlug: "siber-guvenlik",
    serviceKey: "iso-27001-teknik-guvenlik-cozumleri",
    slug: "iso-27001-teknik-guvenlik-cozumleri",
    title: "ISO 27001 Teknik Güvenlik Çözümleri",
    metaDescription:
      "ISO 27001 Ek A kontrollerinin teknik uygulaması: erişim yönetimi, loglama, şifreleme, yedekleme ve sıkılaştırma. BTM Bilişim ile belgeyi sahada çalışır kılın.",
    content: `ISO 27001 teknik güvenlik çözümlerimiz, standardın Ek A kontrollerini kâğıt üzerinde değil sistemlerinizde hayata geçirir. Danışmanlık BGYS'yi tasarlar; bu hizmet o tasarımın teknik kısmını kurar.

## Hangi kontrolleri kapsar?

Ek A'nın teknik ağırlıklı maddeleri: erişim denetimi, ayrıcalıklı hesap yönetimi, loglama ve izleme, kriptografi, yedekleme, ağ güvenliği, zararlıya karşı koruma, zafiyet yönetimi ve güvenli yapılandırma. Bu hizmet bu maddelerin her biri için kanıt üretilebilir bir uygulama bırakır.

## Kapsamımız

- Kimlik ve erişim yönetimi, rol bazlı yetkilendirme, MFA
- Ayrıcalıklı hesap (admin) yönetimi ve erişim gözden geçirme süreci
- Merkezi loglama ve izleme (bkz. [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/))
- Disk/aktarım şifreleme ve anahtar yönetimi
- Yedekleme ve geri yükleme testleri
- Sunucu, uç nokta ve ağ cihazı sıkılaştırma (hardening) standartları
- Zafiyet yönetimi döngüsünün kurulması
- Kontrollere ait kayıt ve kanıt setinin oluşturulması

## Nasıl çalışıyoruz?

1. **SoA eşlemesi** — Uygulanabilirlik Bildirgesi'ndeki teknik kontroller listelenir.
2. **Boşluk tespiti** — Her kontrol için mevcut durum ve eksik belirlenir.
3. **Uygulama** — Kontroller kurulur, yapılandırılır ve kanıt üretecek şekilde işletilir.
4. **Denetime hazırlık** — İç denetim bulguları kapatılır, denetime teknik olarak eşlik edilir.

## İlgili hizmetler

Yönetim sistemi tarafı için [ISO 27001 bilgi güvenliği danışmanlığı](/danismanlik/iso-27001-bilgi-guvenligi-danismanligi/), örtüşen yükümlülükler için [KVKK danışmanlığı](/danismanlik/kvkk-danismanligi/) ile birlikte yürütülür.

## Kurumunuza kazandırdıkları

- Ek A kontrollerinin "yazıldı" değil "çalışıyor" seviyesine gelmesi
- Denetimde savunulabilir, kanıta dayalı teknik kayıt
- KVKK teknik tedbirleriyle tek seferde örtüşme
- Belgelendirme sonrası da sürdürülebilir bir kontrol seti

Teknik kontrol boşluklarınızı birlikte çıkaralım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Danışmanlık almadan sadece teknik uygulama alabilir miyiz?",
        answer:
          "Evet, mevcut bir SoA'nız ve BGYS'niz varsa doğrudan teknik uygulamayla ilerleyebiliriz. SoA yoksa önce kapsam ve kontrol seçiminin netleşmesi gerekir.",
      },
      {
        question: "Mevcut araçlarımız yeterli mi?",
        answer:
          "Çoğu zaman kısmen. Boşluk tespitinde mevcut güvenlik duvarı, yedekleme, kimlik ve log altyapınız değerlendirilir; eksik kalan kontroller için ekleme önerilir.",
      },
      {
        question: "Kanıt üretimi ne demek?",
        answer:
          "Her kontrolün denetçiye gösterilebilir bir çıktısı olması: erişim gözden geçirme kaydı, yedek geri yükleme test raporu, log örneği, sıkılaştırma kontrol listesi gibi.",
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
      "Altyapı değerlendirmesi, kapasite planlaması ve büyümeye uygun ağ/sunucu mimarisi. BTM Bilişim ile teknoloji operasyonunuzun temelini sağlam kurun.",
    content: `Sistem ve network danışmanlığımız, mevcut altyapınızın fotoğrafını çeker ve önümüzdeki 2-3 yıllık büyümeyi kaldıracak bir mimari önerir. Amaç, her yeni ihtiyaçta acil ve pahalı çözümlere başvurmak zorunda kalmamaktır.

## Ne zaman gerekir?

Sık yaşanan kesintiler, yavaşlayan uygulamalar, dolan disk ve lisans sınırları, belgelenmemiş bir ağ ve "bunu kuran arkadaş ayrıldı" durumu tipik işaretlerdir. Bağımsız bir değerlendirme, nereye yatırım yapılacağını netleştirir.

## Kapsamımız

- Ağ topolojisi, sunucu envanteri ve bağımlılıkların çıkarılması
- Kapasite ve performans analizi (CPU, bellek, disk, bant genişliği)
- Yüksek erişilebilirlik ve yedeklilik değerlendirmesi
- Bulut / şirket içi / hibrit mimari kararı
- Sanallaştırma ve konsolidasyon fırsatları
- Ağ ve sistem güvenliği olgunluğu
- Belgeleme, isimlendirme ve yönetişim standartları
- Önceliklendirilmiş yol haritası ve bütçe

## Nasıl çalışıyoruz?

1. **Envanter ve keşif** — Altyapı taranır, ekiplerle görüşülür, mevcut belgeler incelenir.
2. **Analiz** — Darboğazlar, tekil hata noktaları ve riskler belirlenir.
3. **Mimari önerisi** — Hedef durum ve oraya giden fazlar tanımlanır.
4. **Uygulama desteği** — İsteğe bağlı olarak geçiş projeleri yönetilir.

## Sonraki adımlar

Önerilere göre [ağ altyapısı kurulumu](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/), [sunucu kurulum ve yönetimi](/sistem-network/sunucu-kurulum-ve-yonetimi/), [sanallaştırma](/sistem-network/sanallastirma-cozumleri/) veya [bulut çözümleri](/bulut-yedekleme/bulut-cozumleri/) ile devam edilir. Envanteri kalıcı tutmak için [Orbit](/yazilim-urunlerimiz/orbit/) kullanılabilir.

## Kurumunuza kazandırdıkları

- Yatırımların plana dayanması, panik alımlarının azalması
- Tekil hata noktalarının görünür olması
- Belgelenmiş, devredilebilir bir altyapı
- Büyümeye hazır bir mimari

Altyapınızı birlikte gözden geçirmek için [iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Değerlendirme ne kadar sürer?",
        answer:
          "Orta ölçekli bir kurumda saha keşfi ve analiz genellikle 1-2 hafta, raporlama ve yol haritası bir hafta daha sürer.",
      },
      {
        question: "Bize belirli bir marka mı önereceksiniz?",
        answer:
          "Hayır. Öneriler marka bağımsızdır; mevcut yatırımınız, ekip yetkinliğiniz ve bütçenize göre alternatifler karşılaştırılır.",
      },
      {
        question: "Bulut mu yoksa şirket içi mi kararını nasıl veriyorsunuz?",
        answer:
          "Veri hassasiyeti, gecikme ihtiyacı, maliyet yapısı ve büyüme planına bakarız. Sonuç çoğu zaman hibrit bir modeldir; kritik veriler içeride, esnek yükler bulutta.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "ag-altyapisi-kurulum-ve-yonetimi",
    slug: "ag-altyapisi-kurulum-ve-yonetimi",
    title: "Ağ Altyapısı Kurulum ve Yönetimi",
    metaDescription:
      "Kurumsal LAN/WAN tasarımı, switch ve router yapılandırması, VLAN, SD-WAN ve sürekli ağ yönetimi. BTM Bilişim ile hızlı, kararlı ve yönetilebilir bir ağ kurun.",
    content: `Ağ altyapısı kurulum ve yönetimi hizmetimiz, kurumsal ağınızı baştan tasarlar veya mevcut ağınızı kararlı, güvenli ve yönetilebilir bir yapıya taşır.

## Sağlıklı bir ağın özellikleri

İyi bir ağ; segmentlere ayrılmış, belgelenmiş, izlenen ve tekil hata noktası olmayan bir ağdır. Kötü bir ağ ise "çalışıyor ama neden çalıştığını kimse bilmiyor" durumundadır. Hedefimiz birincisidir.

## Kapsamımız

- LAN/WAN tasarımı ve yeniden yapılandırma
- Switch, router ve kablosuz denetleyici kurulumu ve yapılandırması
- VLAN segmentasyonu, QoS ve trafik önceliklendirme
- Çok lokasyonlu bağlantılar, VPN ve SD-WAN
- DHCP, DNS ve IP adres planı (IPAM)
- Ağ izleme, alarm ve kapasite raporlaması
- Yapılandırma yedeği ve değişiklik yönetimi
- Kablolama ve saha kurulum koordinasyonu

## Nasıl çalışıyoruz?

1. **Tasarım** — İhtiyaçlar, lokasyonlar ve büyüme öngörüsüne göre ağ mimarisi çıkarılır.
2. **Kurulum** — Cihazlar yapılandırılır, segmentasyon ve politikalar uygulanır.
3. **Geçiş** — Değişiklikler bakım penceresinde, geri dönüş planıyla devreye alınır.
4. **Yönetim** — Ağ izlenir, yapılandırmalar yedeklenir, dönemsel sağlık raporu verilir.

## İlgili çözümler

Ağ sınırı güvenliği için [firewall ve VPN çözümleri](/sistem-network/firewall-ve-vpn-cozumleri/), kablosuz taraf için [Wi-Fi ve kablosuz ağ çözümleri](/sistem-network/wifi-ve-kablosuz-ag-cozumleri/) ile birlikte planlanır. Misafir ağı yönetimi için [CyberHost](/yazilim-urunlerimiz/cyberhost/) kullanılabilir.

## Kurumunuza kazandırdıkları

- Kararlı, öngörülebilir ağ performansı
- Segmentasyonla azalan güvenlik riski
- Belgelenmiş, devredilebilir yapılandırma
- Sorunların kullanıcıdan önce alarmla fark edilmesi

Ağ altyapınızı planlamak için [bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Mevcut ağ cihazlarımız kullanılabilir mi?",
        answer:
          "Genellikle evet. Cihazların yaşı, kapasitesi ve desteklenme durumu değerlendirilir; yeterli olanlar yeniden yapılandırılarak korunur.",
      },
      {
        question: "Birden fazla şubemiz var, hepsini bağlayabilir misiniz?",
        answer:
          "Evet. Site-to-site VPN ya da SD-WAN ile çok lokasyonlu bir omurga kurar, trafiği merkezi politikalarla yönetiriz.",
      },
      {
        question: "Kurulum sırasında ağımız kesilir mi?",
        answer:
          "Kritik geçişler mesai dışına planlanır ve geri dönüş adımları önceden hazırlanır. Mümkün olan yerlerde değişiklikler kademeli uygulanır.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "sunucu-kurulum-ve-yonetimi",
    slug: "sunucu-kurulum-ve-yonetimi",
    title: "Sunucu Kurulum ve Yönetimi",
    metaDescription:
      "Fiziksel ve sanal sunucu kurulumu, Windows/Linux yönetimi, Active Directory, yamalama ve izleme. BTM Bilişim ile sunucu ortamınızı kararlı ve güncel tutun.",
    content: `Sunucu kurulum ve yönetimi hizmetimiz, fiziksel ve sanal sunucu ortamınızı kurar, sıkılaştırır ve sürekli işletir. Windows ve Linux tarafında kurulumdan yamaya, yedekten izlemeye kadar operasyonu üstleniriz.

## Yaygın sorunlar

Elle kurulmuş, birbirinden farklı yapılandırılmış sunucular; ertelenen güncellemeler; izlenmeyen disk ve servisler; belgelenmemiş bağımlılıklar. Bunlar hem güvenlik hem de erişilebilirlik riskidir.

## Kapsamımız

- Fiziksel sunucu ve hipervizör kurulumu
- Windows Server ve Linux (RHEL/Ubuntu/Debian) kurulumu ve sıkılaştırma
- Active Directory, DNS, DHCP, dosya ve yazdırma servisleri
- Rol bazlı yetkilendirme ve ayrıcalıklı erişim düzeni
- Yamalama takvimi ve değişiklik yönetimi
- İzleme, alarm ve kapasite raporlaması
- Yedekleme entegrasyonu ve geri yükleme testleri
- Standart kurulum şablonları ve belgeleme

## Nasıl çalışıyoruz?

1. **Envanter** — Mevcut sunucular, roller ve bağımlılıklar çıkarılır.
2. **Standart** — Kurumunuza özel kurulum ve sıkılaştırma standardı tanımlanır.
3. **Uygulama** — Yeni sunucular şablonla kurulur, mevcutlar standarda çekilir.
4. **İşletme** — Yamalama, izleme ve yedek testleri düzenli olarak yürütülür.

## İlgili çözümler

Kaynak verimliliği için [sanallaştırma çözümleri](/sistem-network/sanallastirma-cozumleri/), veri güvenliği için [veri yedekleme çözümleri](/bulut-yedekleme/veri-yedekleme-cozumleri/) ve [felaket kurtarma](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) ile birlikte kurgulanır.

## Kurumunuza kazandırdıkları

- Standart, tekrarlanabilir ve belgeli sunucu kurulumları
- Güncel yamalarla azalan zafiyet yüzeyi
- Disk/servis sorunlarının alarmla erken görülmesi
- Test edilmiş, gerçekten çalışan yedekler

Sunucu ortamınızı birlikte değerlendirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Yönetimi tamamen siz mi üstleniyorsunuz?",
        answer:
          "İhtiyaca göre. Tüm operasyonu yönetilen hizmet olarak devralabilir ya da ekibinize belirli alanlarda (yamalama, izleme, olay desteği) destek verebiliriz.",
      },
      {
        question: "Windows ve Linux'u birlikte yönetebilir misiniz?",
        answer:
          "Evet. Karma ortamlar yaygındır; her iki tarafta da kurulum, sıkılaştırma, yamalama ve izleme sağlıyoruz.",
      },
      {
        question: "Eski sunuculardan yeni ortama geçiş yapıyor musunuz?",
        answer:
          "Evet. Fiziksel-sanal (P2V) ve sanal-sanal (V2V) taşımalar ile sürüm yükseltmelerini test ortamında prova ederek, geri dönüş planıyla yürütürüz.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "veri-merkezi-cozumleri",
    slug: "veri-merkezi-cozumleri",
    title: "Veri Merkezi Çözümleri",
    metaDescription:
      "Veri merkezi tasarımı, kabinet ve enerji/soğutma planlaması, yapılandırılmış kablolama ve taşıma projeleri. BTM Bilişim ile veri merkezinizi doğru kurgulayın.",
    content: `Veri merkezi çözümlerimiz; sunucu odanızın ya da hazır veri merkezindeki alanınızın tasarımı, kurulumu ve taşınmasında uçtan uca danışmanlık ve uygulama sağlar.

## Neden planlı bir veri merkezi?

Plansız büyüyen sunucu odaları; yetersiz soğutma, dağınık kablolama, tekil enerji hattı ve erişim kontrolü eksikliğiyle malulüdür. Bunların her biri erişilebilirlik ve güvenlik riskidir. Doğru tasarım bu riskleri baştan azaltır.

## Kapsamımız

- Sunucu odası / veri merkezi alanı tasarımı ve kapasite planlaması
- Kabinet düzeni, güç dağıtımı (PDU) ve topraklama
- Enerji yedekliliği: UPS, jeneratör devreye alma senaryoları
- Soğutma ve sıcak/soğuk koridor planlaması
- Yapılandırılmış kablolama ve etiketleme standardı
- Fiziksel erişim kontrolü, kamera ve çevre izleme (sıcaklık, nem, sızıntı)
- Colocation seçimi ve veri merkezi taşıma projeleri

## Nasıl çalışıyoruz?

1. **İhtiyaç analizi** — Mevcut ve hedef kapasite, kritiklik seviyesi ve kısıtlar belirlenir.
2. **Tasarım** — Yerleşim, enerji, soğutma ve kablolama planı hazırlanır.
3. **Uygulama** — Kurulum ve göç, hizmet kesintisini en aza indirecek şekilde planlanır.
4. **Devreye alma** — İzleme kurulur, belgeler ve işletim prosedürleri teslim edilir.

## İlgili çözümler

Sunucu tarafında [sunucu kurulum ve yönetimi](/sistem-network/sunucu-kurulum-ve-yonetimi/), süreklilik tarafında [iş sürekliliği çözümleri](/bulut-yedekleme/is-surekliligi-cozumleri/) ile bütünleşir. Bulut alternatifleri için [bulut çözümleri](/bulut-yedekleme/bulut-cozumleri/) değerlendirilebilir.

## Kurumunuza kazandırdıkları

- Enerji ve soğutmada yedeklilik, azalan kesinti riski
- Düzenli, izlenebilir ve büyütülebilir bir yerleşim
- Fiziksel güvenlik ve çevre izleme
- Taşıma projelerinde kontrollü, planlı geçiş

Veri merkezi ihtiyacınızı birlikte planlayalım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Küçük bir sunucu odamız var, bu hizmet bize göre mi?",
        answer:
          "Evet. Ölçek küçük olsa da enerji yedekliliği, soğutma, kablolama düzeni ve çevre izleme aynı prensiplerle, daha dar kapsamda uygulanır.",
      },
      {
        question: "Kendi veri merkezimiz mi olmalı, colocation mu?",
        answer:
          "Kapasite, büyüme hızı, uzman ekip ve maliyet yapısına bakarız. Çoğu orta ölçekli kurum için colocation ya da hibrit model daha ekonomiktir.",
      },
      {
        question: "Veri merkezi taşımasını yönetiyor musunuz?",
        answer:
          "Evet. Envanter, bağımlılık haritası, taşıma sırası, kesinti planı ve geri dönüş senaryosuyla taşımayı uçtan uca yönetiriz.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "sanallastirma-cozumleri",
    slug: "sanallastirma-cozumleri",
    title: "Sanallaştırma Çözümleri",
    metaDescription:
      "Sunucu ve masaüstü sanallaştırma (VMware, Hyper-V, Proxmox), konsolidasyon, HA ve yönetim. BTM Bilişim ile donanımdan tasarruf edin, esnekliği artırın.",
    content: `Sanallaştırma çözümlerimiz, fiziksel sunucu sayısını azaltıp kaynak kullanımını artırır; ortamınızı daha esnek, yedekli ve yönetilebilir hâle getirir.

## Sanallaştırma ne kazandırır?

Az sayıda güçlü sunucu üzerinde çok sayıda sanal makine çalıştırmak; donanım, enerji ve yer maliyetini düşürür. Anlık görüntü (snapshot), canlı göç ve otomatik yük dengeleme ile bakım ve arıza yönetimi kolaylaşır.

## Kapsamımız

- Hipervizör kurulumu ve yapılandırması (VMware vSphere, Microsoft Hyper-V, Proxmox VE)
- Fiziksel sunucuların sanala taşınması (P2V) ve konsolidasyon
- Yüksek erişilebilirlik (HA), canlı göç ve yük dengeleme
- Depolama entegrasyonu (SAN/NAS, hiper yakınsak altyapı)
- Masaüstü sanallaştırma (VDI) ve uzaktan çalışma senaryoları
- Yedekleme ve felaket kurtarma entegrasyonu
- Kaynak izleme, kapasite planlama ve lisans optimizasyonu

## Nasıl çalışıyoruz?

1. **Değerlendirme** — İş yükleri, kaynak kullanımı ve lisans durumu analiz edilir.
2. **Tasarım** — Küme boyutu, depolama ve yedeklilik mimarisi belirlenir.
3. **Uygulama** — Ortam kurulur, iş yükleri kademeli olarak taşınır.
4. **Optimizasyon** — Kaynaklar izlenir, aşırı/yetersiz tahsis düzeltilir.

## İlgili çözümler

Lisans tarafında [VMware lisanslama](/lisanslama/vmware-lisanslama/), koruma tarafında [veri yedekleme](/bulut-yedekleme/veri-yedekleme-cozumleri/) ve [felaket kurtarma](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) ile birlikte kurgulanır.

## Kurumunuza kazandırdıkları

- Daha az fiziksel sunucu, düşen enerji ve bakım maliyeti
- Bakım ve arızada kesintisiz iş yükü göçü
- Hızlı sunucu oluşturma ve test ortamları
- Kapasite ve lisansta görünürlük

Sanallaştırma yol haritanızı birlikte çıkaralım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Hangi platformu önerirsiniz?",
        answer:
          "Mevcut yatırımınıza, ekip yetkinliğinize ve bütçeye bakarız. VMware olgun ve yaygındır; Hyper-V Windows ağırlıklı ortamlarda ekonomik olabilir; Proxmox açık kaynak bir alternatiftir.",
      },
      {
        question: "Tüm sunucularımız sanallaştırılabilir mi?",
        answer:
          "Çoğu sanallaştırılabilir. Özel donanım anahtarı gerektiren ya da çok yüksek G/Ç isteyen birkaç istisna için fiziksel ya da geçişli bir model önerilir.",
      },
      {
        question: "Taşıma sırasında kesinti olur mu?",
        answer:
          "P2V taşımaların çoğu kısa bir kesme penceresiyle yapılır; kritik sistemler mesai dışına planlanır ve geri dönüş için kaynak sunucu bir süre korunur.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "wifi-ve-kablosuz-ag-cozumleri",
    slug: "wifi-ve-kablosuz-ag-cozumleri",
    title: "Wi-Fi ve Kablosuz Ağ Çözümleri",
    metaDescription:
      "Kurumsal Wi-Fi tasarımı, kapsama (site survey) ölçümü, denetleyici tabanlı yönetim, misafir ağı ve 802.1X güvenlik. BTM Bilişim ile her noktada kararlı kablosuz.",
    content: `Wi-Fi ve kablosuz ağ çözümlerimiz, ofis, depo, üretim alanı ve kampüs ortamlarında kesintisiz, güvenli ve yönetilebilir bir kablosuz ağ kurar.

## Kötü Wi-Fi'nin nedeni genellikle plansızlıktır

Rastgele konumlandırılmış erişim noktaları, kanal çakışmaları, kör noktalar ve tek bir SSID'de toplanmış misafir + kurumsal trafik. Doğru bir kapsama tasarımı ve segmentasyon bunların hepsini çözer.

## Kapsamımız

- Kapsama ve girişim ölçümü (site survey) — kurulum öncesi ve sonrası
- Erişim noktası konumlandırma, kanal ve güç planı
- Denetleyici tabanlı (on-prem veya bulut) merkezi yönetim
- SSID ayrımı: kurumsal, misafir, cihaz/IoT
- 802.1X / WPA3-Enterprise ile kimlik doğrulamalı erişim
- Misafir portalı, kullanım koşulları ve zaman/bant sınırı
- Yoğun ortam (toplantı salonu, etkinlik alanı) optimizasyonu
- Performans izleme ve sorun giderme

## Nasıl çalışıyoruz?

1. **Keşif ve ölçüm** — Alanın planı çıkarılır, sinyal ve girişim ölçülür.
2. **Tasarım** — Erişim noktası sayısı, konumu ve yapılandırması belirlenir.
3. **Kurulum** — Cihazlar monte edilir, politikalar ve SSID'ler yapılandırılır.
4. **Doğrulama** — Kurulum sonrası ölçümle kapsama teyit edilir, ince ayar yapılır.

## İlgili çözümler

Misafir erişimi ve hotspot yönetimi için [CyberHost](/yazilim-urunlerimiz/cyberhost/), kablolu omurga için [ağ altyapısı kurulum ve yönetimi](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/) ile birlikte planlanır.

## Kurumunuza kazandırdıkları

- Tüm çalışma alanlarında kararlı kapsama
- Misafir trafiğinin kurumsal ağdan izole olması
- Kimlik doğrulamalı, izlenebilir kablosuz erişim
- Sorunların merkezi panelden hızlı çözümü

Kablosuz ağ ihtiyacınızı birlikte planlayalım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Site survey şart mı?",
        answer:
          "Küçük, tek katlı ofislerde tahmine dayalı tasarım yeterli olabilir. Depo, üretim ve çok katlı binalarda ölçüm, doğru erişim noktası sayısı ve konumu için gereklidir.",
      },
      {
        question: "Misafir ağı kurumsal ağı riske atar mı?",
        answer:
          "Doğru kurgulandığında hayır. Misafir trafiği ayrı VLAN'da tutulur, kurumsal kaynaklara erişemez ve internet çıkışı politika ile sınırlandırılır.",
      },
      {
        question: "Mevcut erişim noktalarımız kullanılabilir mi?",
        answer:
          "Model ve yaşlarına bağlı. Yeni standartları (Wi-Fi 6/6E) desteklemeyen ya da denetleyiciye alınamayan cihazlar için değişim önerilir.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "firewall-ve-vpn-cozumleri",
    slug: "firewall-ve-vpn-cozumleri",
    title: "Firewall ve VPN Çözümleri",
    metaDescription:
      "Güvenlik duvarı kurulumu, site-to-site ve uzaktan erişim VPN, ZTNA ve çok faktörlü kimlik doğrulama. BTM Bilişim ile uzaktan erişimi güvenli ve yönetilebilir kılın.",
    content: `Firewall ve VPN çözümlerimiz, kurumsal ağınızın sınır güvenliğini ve uzaktan erişimini birlikte kurgular. Şubeler arası bağlantılar ve dışarıdan çalışan kullanıcılar için güvenli, izlenebilir erişim sağlarız.

## Uzaktan erişim neden dikkatli kurgulanmalı?

Aceleyle açılan VPN'ler çoğu zaman "içeri girildiğinde her yere erişim" anlamına gelir. Bu, bir hesap ele geçtiğinde tüm ağı riske atar. Doğru kurgu; en az ayrıcalık, çok faktörlü doğrulama ve erişimin kaynak/hedef bazında sınırlanmasıdır.

## Kapsamımız

- Yeni nesil güvenlik duvarı kurulumu ve politika tasarımı
- Site-to-site VPN ile şube ve veri merkezi bağlantıları
- Uzaktan erişim VPN (istemci tabanlı ve SSL)
- Sıfır güven ağ erişimi (ZTNA) yaklaşımı ve uygulamaya özel erişim
- Çok faktörlü kimlik doğrulama (MFA) entegrasyonu
- Erişim loglama ve SIEM entegrasyonu
- Yüksek erişilebilirlik ve yük devretme
- Dönemsel kural ve erişim gözden geçirmesi

## Nasıl çalışıyoruz?

1. **Analiz** — Kim, nereden, hangi kaynağa erişmeli sorusu netleştirilir.
2. **Tasarım** — Segment bazlı erişim politikaları ve VPN topolojisi hazırlanır.
3. **Uygulama** — Bağlantılar kurulur, MFA ve loglama devreye alınır.
4. **Gözden geçirme** — Kurallar ve kullanıcı erişimleri dönemsel olarak denetlenir.

## İlgili çözümler

Tehdit önleme ve trafik görünürlüğü için [firewall ve ağ güvenliği](/siber-guvenlik/firewall-ve-ag-guvenligi/), erişim kayıtlarının izlenmesi için [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/) ile birlikte konumlandırılır.

## Kurumunuza kazandırdıkları

- Uzaktan erişimde en az ayrıcalık ve MFA
- Şubeler arası şifreli, kararlı bağlantı
- Erişim olaylarında tam kayıt
- Kullanılmayan kuralların ve hesapların temizlenmesi

Uzaktan erişim ve sınır güvenliği kurgunuzu birlikte gözden geçirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "VPN yerine ZTNA'ya mı geçmeliyiz?",
        answer:
          "Duruma göre. ZTNA, uygulamaya özel erişim ve daha iyi denetim sağlar; ancak mevcut VPN'i MFA ve segmentasyonla güçlendirmek de birçok kurum için yeterli bir ilk adımdır.",
      },
      {
        question: "MFA'yı mevcut hesaplarımıza bağlayabilir misiniz?",
        answer:
          "Evet. Active Directory / Entra ID ve yaygın MFA sağlayıcılarıyla entegrasyon yaparız; kullanıcı deneyimi ve yedek erişim senaryoları birlikte planlanır.",
      },
      {
        question: "Şube bağlantılarında hat kesilirse ne olur?",
        answer:
          "Yüksek erişilebilirlik kurgusunda ikincil hat ya da 4G/5G yedeği tanımlanır; birincil hat düştüğünde trafik otomatik olarak yedeğe geçer.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "sistem-entegrasyonu",
    slug: "sistem-entegrasyonu",
    title: "Sistem Entegrasyonu",
    metaDescription:
      "Sunucu, depolama, ağ, yedekleme ve uygulama katmanlarını uyumlu çalıştıran uçtan uca sistem entegrasyonu projeleriyle parçaları tek bütün yapın.",
    content: `Sistem entegrasyonu hizmetimiz; farklı üreticilerin sunucu, depolama, ağ, sanallaştırma, yedekleme ve uygulama bileşenlerini birbiriyle uyumlu, yönetilebilir ve belgelenmiş tek bir altyapı hâline getirir.

## Entegrasyon projesi ne zaman gerekir?

Yeni bir veri merkezi ya da şube kurulumu, büyük bir donanım yenileme, sanallaştırma ya da depolama yatırımı, iki kurumun birleşmesi veya birbirinden bağımsız kurulmuş sistemlerin tek yönetime alınması ihtiyacı — bunların hepsi birden çok bileşenin birlikte planlanmasını gerektirir.

## Kapsamımız

- Uçtan uca çözüm tasarımı: sunucu, depolama (SAN/NAS), ağ, sanallaştırma, yedekleme
- Donanım tedarik koordinasyonu ve kurulum
- Bileşenler arası uyumluluk (firmware, sürüm, protokol) kontrolü
- Kimlik, DNS, zaman senkronizasyonu ve izleme entegrasyonu
- Mevcut sistemden yeni ortama veri ve iş yükü göçü
- Test senaryoları, devreye alma ve kabul süreci
- As-built dokümantasyon, işletim prosedürleri ve bilgi aktarımı

## Nasıl çalışıyoruz?

1. **Tasarım** — İhtiyaçlar, kısıtlar ve hedef mimari netleştirilir; bileşenler seçilir.
2. **Hazırlık** — Tedarik, saha hazırlığı ve göç planı yapılır.
3. **Kurulum ve entegrasyon** — Bileşenler kurulur, birbirine bağlanır ve uçtan uca test edilir.
4. **Devreye alma** — Kabul testleri geçilir, belgeler ve işletim bilgisi teslim edilir.

## İlgili hizmetler

Kapsamdaki alt bileşenler için [sunucu kurulum ve yönetimi](/sistem-network/sunucu-kurulum-ve-yonetimi/), [sanallaştırma çözümleri](/sistem-network/sanallastirma-cozumleri/), [ağ altyapısı kurulum ve yönetimi](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/) ve [veri merkezi çözümleri](/sistem-network/veri-merkezi-cozumleri/). Uygulama düzeyinde bağlantılar için [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/).

## Kurumunuza kazandırdıkları

- Tek elden tasarlanmış, birbiriyle uyumlu bir altyapı
- Bileşen sınırlarında sorumluluk boşluğunun olmaması
- Belgelenmiş, devredilebilir bir kurulum
- Devreye almanın kabul testleriyle güvence altına alınması

Planladığınız altyapı projesini birlikte değerlendirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Donanımı sizden mi almamız gerekiyor?",
        answer:
          "Zorunlu değil. Tedariki koordine edebilir ya da sizin aldığınız donanımla çalışabiliriz. Önemli olan bileşenlerin baştan uyumlu seçilmesidir.",
      },
      {
        question: "Farklı markaların ürünlerini bir arada kullanabilir miyiz?",
        answer:
          "Genellikle evet. Tasarım aşamasında firmware ve protokol uyumluluğu kontrol edilir; desteklenen kombinasyonlar seçilir ve riskli noktalar önceden belirtilir.",
      },
      {
        question: "Proje sonunda ne teslim ediliyor?",
        answer:
          "Kabul testi sonuçları, as-built (kurulmuş hâliyle) mimari dokümantasyon, yapılandırma kayıtları ve işletim prosedürleri ile ekibinize bilgi aktarımı.",
      },
    ],
  },
  {
    categorySlug: "sistem-network",
    serviceKey: "it-bakim-ve-destek-hizmetleri",
    slug: "it-bakim-ve-destek-hizmetleri",
    title: "IT Bakım ve Destek Hizmetleri",
    metaDescription:
      "SLA'lı yerinde ve uzaktan IT desteği, proaktif izleme, yamalama ve envanter yönetimi. BTM Bilişim ile IT operasyonunuzu dışarıya güvenle emanet edin.",
    content: `IT bakım ve destek hizmetlerimiz, kurumsal altyapınızın günlük operasyonunu üstlenir: kullanıcı destek taleplerinden sunucu bakımına, izlemeden yamaya kadar. Tanımlı hizmet seviyeleri (SLA) ile çalışırız.

## Ne kapsar?

Reaktif "bir şey bozulunca ara" modeli pahalıdır; kesintiler iş kaybına dönüşür. Proaktif bakım, sorunları kullanıcı fark etmeden yakalar ve kapatır.

## Kapsamımız

- Kullanıcı destek masası (helpdesk) — uzaktan ve yerinde
- Sunucu, ağ ve uç nokta için proaktif izleme ve alarm
- Yamalama, güncelleme ve yapılandırma yönetimi
- Yedekleme kontrolü ve düzenli geri yükleme testleri
- Donanım, yazılım ve lisans envanterinin takibi
- Yeni personel kurulumu ve ayrılan personel erişim kaldırma
- Aylık hizmet ve sağlık raporu, düzenli gözden geçirme toplantısı
- Tedarikçi ve garanti süreçlerinin yönetimi

## Hizmet modelleri

| Model | İçerik | Uygun olduğu durum |
| --- | --- | --- |
| Tam yönetilen | Tüm IT operasyonu bizde | İç IT ekibi olmayan kurumlar |
| Yardımcı ekip | Mevcut ekibe destek ve nöbet | Küçük IT ekibi olanlar |
| Proje + destek | Kurulum sonrası bakım | Belirli bir sistem için |

## Nasıl çalışıyoruz?

1. **Devralma** — Envanter, erişimler ve mevcut sorunlar dökümante edilir.
2. **Stabilizasyon** — Bilinen arızalar ve riskler kapatılır, izleme kurulur.
3. **Operasyon** — Talepler SLA içinde karşılanır, bakımlar takvime bağlanır.
4. **İyileştirme** — Aylık raporla tekrarlayan sorunlar kök nedeniyle ele alınır.

## İlgili çözümler

Talep ve envanter yönetimini şeffaflaştırmak için [Orbit IT operasyon platformu](/yazilim-urunlerimiz/orbit/) kullanılabilir. Altyapı yenileme ihtiyacı çıkarsa [sistem ve network danışmanlığı](/sistem-network/sistem-ve-network-danismanligi/) devreye girer.

## Kurumunuza kazandırdıkları

- Öngörülebilir IT maliyeti ve tanımlı yanıt süreleri
- Kesintilerin azalması, sorunların kök nedenle çözülmesi
- Personel giriş/çıkışında düzenli erişim yönetimi
- Yönetim için aylık, ölçülebilir hizmet raporu

Destek ihtiyacınızı ve mevcut kapsamınızı birlikte konuşalım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Yanıt süreniz nedir?",
        answer:
          "SLA'ya göre belirlenir. Tipik olarak kritik arızalarda hızlı müdahale, düşük öncelikli taleplerde aynı iş günü hedeflenir; kapsam sözleşmede netleştirilir.",
      },
      {
        question: "Kendi IT personelimiz var, yine de anlamlı mı?",
        answer:
          "Evet. Yardımcı ekip modelinde izin/yoğunluk dönemlerini kapatır, uzmanlık gerektiren konularda destek verir ve 7/24 nöbet ihtiyacını karşılarız.",
      },
      {
        question: "Sözleşme süresi ne kadar?",
        answer:
          "Genellikle yıllık, aylık raporlama ve dönemsel gözden geçirmeyle. İhtiyaç değiştikçe kapsam güncellenebilir.",
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
    title: "Bulut Çözümleri",
    metaDescription:
      "Bulut mimarisi tasarımı, göç planlaması, maliyet optimizasyonu ve hibrit kurgu. BTM Bilişim ile buluta plansız değil, ölçülü ve geri dönüşü hesaplanmış geçin.",
    content: `Bulut çözümlerimiz, iş yüklerinizi buluta taşımanın gerçekten mantıklı olduğu yerlerde, doğru mimariyle ve maliyeti kontrol altında tutarak taşınmanıza yardımcı olur.

## "Buluta geçelim" yeterli bir hedef değil

Her iş yükü buluta uygun değildir; bazıları taşındığında daha pahalıya çalışır. Doğru soru "hangi iş yükü, hangi bulut modelinde, hangi maliyetle daha iyi?" sorusudur. Bu hizmet o kararı veriye dayandırır.

## Kapsamımız

- Bulut hazırlık ve iş yükü değerlendirmesi (taşı / yeniden mimarile / yerinde bırak)
- Genel, özel ve hibrit bulut mimarisi tasarımı
- Göç planı, dalgalar hâlinde taşıma ve geri dönüş senaryoları
- Kimlik, ağ ve güvenlik temeli (landing zone)
- Maliyet modelleme ve optimizasyon (ölçeklendirme, rezervasyon, kapatma politikaları)
- İzleme, yedekleme ve felaket kurtarmanın bulutta kurulması
- Yönetişim: etiketleme, bütçe alarmı, erişim politikaları

## Nasıl çalışıyoruz?

1. **Değerlendirme** — İş yükleri, bağımlılıklar ve mevcut maliyet çıkarılır.
2. **Mimari** — Hedef bulut modeli, ağ ve güvenlik temeli tasarlanır.
3. **Göç** — İş yükleri önceliğe göre dalgalar hâlinde taşınır ve doğrulanır.
4. **Optimizasyon** — Kaynak boyutu ve maliyet düzenli olarak gözden geçirilir.

## Platforma özel hizmetler

Platform seçildiğinde [Microsoft Azure çözümleri](/bulut-yedekleme/microsoft-azure-cozumleri/), [AWS bulut çözümleri](/bulut-yedekleme/aws-bulut-cozumleri/) ve [Microsoft 365 çözümleri](/bulut-yedekleme/microsoft-365-cozumleri/) ile derinleşiriz. Lisans tarafı için [Microsoft lisanslama](/lisanslama/microsoft-lisanslama/) devreye girer.

## Kurumunuza kazandırdıkları

- Taşınacak ve taşınmayacak iş yüklerinin gerekçeli ayrımı
- Sürprizsiz, alarmlı bir bulut maliyeti
- Kimlik ve güvenliğin baştan doğru kurulması
- Esnek kapasite ve hızlı ortam oluşturma

Bulut yol haritanızı birlikte çıkaralım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Her şeyi buluta taşımalı mıyız?",
        answer:
          "Hayır. Değerlendirme sonunda genellikle hibrit bir tablo çıkar: bazı sistemler bulutta daha esnek ve ucuz, bazıları içeride kalmaya devam eder.",
      },
      {
        question: "Bulut maliyeti kontrolden çıkar mı?",
        answer:
          "Yönetişim kurulmazsa çıkabilir. Etiketleme, bütçe alarmı, otomatik kapatma ve doğru kaynak boyutlandırma ile maliyet öngörülebilir tutulur.",
      },
      {
        question: "Göç sırasında kesinti olur mu?",
        answer:
          "İş yükleri dalgalar hâlinde taşınır; her dalga test edilip doğrulanır. Kritik sistemler için mesai dışı geçiş ve geri dönüş planı hazırlanır.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "microsoft-365-cozumleri",
    slug: "microsoft-365-cozumleri",
    title: "Microsoft 365 Çözümleri",
    metaDescription:
      "Microsoft 365 kurulumu, e-posta göçü, Teams/SharePoint yapılandırması, güvenlik ve yedekleme. BTM Bilişim ile M365 ortamınızı güvenli ve verimli kullanın.",
    content: `Microsoft 365 çözümlerimiz; kurulum, e-posta göçü, iş birliği araçlarının yapılandırılması ve güvenlik sıkılaştırmasıyla M365 yatırımınızdan tam verim almanızı sağlar.

## M365 sadece e-posta değildir

Birçok kurum M365'i yalnızca Outlook için kullanır; Teams, SharePoint, OneDrive, Intune ve güvenlik özellikleri atıl kalır. Doğru yapılandırma, zaten ödediğiniz lisansın karşılığını almanızı sağlar.

## Kapsamımız

- Tenant kurulumu, alan adı ve DNS yapılandırması
- E-posta göçü (Exchange, Google Workspace, IMAP) — kesintisiz geçiş planı
- Exchange Online, kurallar, paylaşımlı kutular ve dağıtım grupları
- Teams, SharePoint ve OneDrive bilgi mimarisi ve paylaşım politikaları
- Kimlik güvenliği: MFA, koşullu erişim, parolasız oturum
- Intune ile cihaz yönetimi ve uygulama dağıtımı
- Defender for Office 365 ile e-posta tehdit koruması
- Üçüncü parti yedekleme ile M365 verisinin korunması

## Nasıl çalışıyoruz?

1. **Değerlendirme** — Mevcut e-posta, lisanslar ve güvenlik ayarları incelenir.
2. **Tasarım** — Göç planı, güvenlik temeli ve iş birliği yapısı hazırlanır.
3. **Uygulama** — Göç pilot grupla başlar, doğrulanır, kademeli tamamlanır.
4. **Sıkılaştırma ve eğitim** — Güvenlik politikaları uygulanır, kullanıcılar bilgilendirilir.

## İlgili hizmetler

Lisans planlaması için [Microsoft 365 lisanslama](/lisanslama/microsoft-365-lisanslama/), e-posta ve dosya sızıntısı kontrolü için [DLP çözümleri](/siber-guvenlik/dlp-veri-kaybi-onleme-cozumleri/) ile birlikte konumlandırılır.

## Kurumunuza kazandırdıkları

- Kesintisiz, planlı e-posta göçü
- Zaten sahip olduğunuz özelliklerin devreye alınması
- MFA ve koşullu erişimle güçlenen kimlik güvenliği
- M365 verisinin (Exchange, OneDrive, SharePoint) yedeklenmesi

Microsoft 365 kurulumunuzu ya da göç planınızı birlikte konuşalım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Microsoft 365 verisi zaten yedekli değil mi?",
        answer:
          "Microsoft altyapı düzeyinde dayanıklılık sağlar ama kullanıcı silmesi, fidye yazılımı ya da uzun süreli geri dönüş için ayrı bir yedekleme çözümü önerilir; paylaşılan sorumluluk modeli budur.",
      },
      {
        question: "E-posta göçünde posta kaybı olur mu?",
        answer:
          "Doğru planlanan göçte hayır. Geçiş öncesi tam senkron yapılır, kayıtlar doğrulanır ve DNS geçişi düşük trafikli saatte yapılır.",
      },
      {
        question: "Google Workspace'ten geçiş yapıyor musunuz?",
        answer:
          "Evet. E-posta, takvim, kişiler ve Drive içerikleri planlı biçimde taşınır; kullanıcılar için geçiş rehberi hazırlanır.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "microsoft-azure-cozumleri",
    slug: "microsoft-azure-cozumleri",
    title: "Microsoft Azure Çözümleri",
    metaDescription:
      "Azure landing zone kurulumu, sunucu ve uygulama göçü, ağ/kimlik güvenliği ve maliyet yönetimi. BTM Bilişim ile Azure'u kontrollü ve güvenli işletin.",
    content: `Microsoft Azure çözümlerimiz; Azure ortamınızın temelini doğru kurar, iş yüklerinizi taşır ve maliyeti kontrol altında tutarak işletmenize yardımcı olur.

## Sağlam bir Azure kurulumunun temeli

Abonelik yapısı, ağ, kimlik ve politika katmanı (landing zone) baştan doğru kurulmazsa; ilerleyen aşamada güvenlik açıkları, maliyet kaçakları ve yönetilemez bir kaynak yığını ortaya çıkar.

## Kapsamımız

- Azure landing zone: abonelik, yönetim grupları, adlandırma ve etiketleme
- Sanal ağ, hibrit bağlantı (VPN/ExpressRoute) ve ağ güvenliği
- Microsoft Entra ID, koşullu erişim ve rol bazlı yetkilendirme (RBAC)
- Sunucu göçü (Azure Migrate) ve yeniden platformlama
- Azure Backup ve Azure Site Recovery ile koruma
- İzleme (Azure Monitor, Log Analytics) ve alarm
- Maliyet yönetimi: bütçe, öneri, rezervasyon ve otomatik kapatma
- Güvenlik duruşu (Defender for Cloud) değerlendirmesi

## Nasıl çalışıyoruz?

1. **Değerlendirme** — Mevcut ortam, iş yükleri ve hedefler belirlenir.
2. **Temel kurulum** — Landing zone, kimlik ve ağ güvenliği oluşturulur.
3. **Göç** — İş yükleri dalgalar hâlinde taşınır, test edilir.
4. **Optimizasyon** — Maliyet, performans ve güvenlik düzenli gözden geçirilir.

## İlgili hizmetler

Genel bulut stratejisi için [bulut çözümleri](/bulut-yedekleme/bulut-cozumleri/), lisans/EA tarafı için [Microsoft lisanslama](/lisanslama/microsoft-lisanslama/) ile birlikte yürütülür. Felaket kurtarma için [Disaster Recovery hizmetimiz](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) Azure Site Recovery üzerine kurgulanabilir.

## Kurumunuza kazandırdıkları

- Yönetilebilir, denetlenebilir bir Azure yapısı
- Kimlik ve ağ güvenliğinin baştan doğru olması
- Bütçe alarmı ve önerilerle kontrol altında maliyet
- Yerinde sunuculara bulut tabanlı yedek ve DR

Azure ortamınızı birlikte değerlendirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Mevcut Azure aboneliğimizi düzeltebilir misiniz?",
        answer:
          "Evet. Mevcut ortam için bir değerlendirme yapar, landing zone, güvenlik ve maliyet açısından bir iyileştirme planı çıkarır ve kademeli olarak uygularız.",
      },
      {
        question: "Yerinde sunucularımızı Azure'a yedekleyebilir miyiz?",
        answer:
          "Evet. Azure Backup ile yedek, Azure Site Recovery ile felaket kurtarma senaryosu kurulabilir; RPO/RTO hedeflerine göre yapılandırılır.",
      },
      {
        question: "Maliyet tahmini alabilir miyiz?",
        answer:
          "Değerlendirme çıktısında iş yükü bazında aylık maliyet tahmini ve optimizasyon fırsatları (boyutlandırma, rezervasyon) yer alır.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "aws-bulut-cozumleri",
    slug: "aws-bulut-cozumleri",
    title: "AWS Bulut Çözümleri",
    metaDescription:
      "AWS hesap yapısı (Organizations), VPC tasarımı, iş yükü göçü, yedekleme ve maliyet optimizasyonu. BTM Bilişim ile AWS altyapınızı güvenli ve ölçülü kurun.",
    content: `AWS bulut çözümlerimiz; AWS üzerinde güvenli bir hesap yapısı kurar, iş yüklerinizi taşır ve maliyet ile güvenliği sürekli gözeterek ortamı işletir.

## İyi bir AWS temelinin bileşenleri

Çok hesaplı yapı (AWS Organizations), merkezi kimlik, VPC ve ağ tasarımı, günlük kayıt (CloudTrail) ve maliyet görünürlüğü baştan kurulmalıdır. Sonradan düzeltmek hem riskli hem pahalıdır.

## Kapsamımız

- AWS Organizations ile çok hesaplı yapı ve guardrail'ler
- VPC tasarımı, alt ağlar, VPN/Direct Connect ile hibrit bağlantı
- IAM Identity Center ile merkezi erişim ve en az ayrıcalık
- EC2, RDS, S3 ve konteyner iş yüklerinin kurulması ve göçü
- AWS Backup ile merkezi yedekleme, bölgeler arası kopya
- İzleme (CloudWatch) ve günlük kayıt (CloudTrail) kurulumu
- Maliyet yönetimi: bütçe, anomali tespiti, Savings Plans
- Güvenlik değerlendirmesi (Security Hub, GuardDuty)

## Nasıl çalışıyoruz?

1. **Değerlendirme** — İş yükleri, bağımlılıklar ve hedefler belirlenir.
2. **Temel** — Hesap yapısı, ağ ve kimlik güvenliği kurulur.
3. **Göç** — İş yükleri taşınır ve doğrulanır.
4. **Optimizasyon** — Maliyet ve güvenlik düzenli olarak gözden geçirilir.

## İlgili hizmetler

Bulut stratejisi için [bulut çözümleri](/bulut-yedekleme/bulut-cozumleri/), veri koruma için [veri yedekleme](/bulut-yedekleme/veri-yedekleme-cozumleri/) ve [felaket kurtarma](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) ile birlikte kurgulanır.

## Kurumunuza kazandırdıkları

- İzole, denetlenebilir hesap yapısı
- Merkezi kimlik ve en az ayrıcalık
- Bölgeler arası kopyalı, merkezi yedekleme
- Anomali alarmlarıyla kontrol altında maliyet

AWS ortamınızı birlikte planlayalım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Tek hesabımız var, çok hesaba geçmeli miyiz?",
        answer:
          "Ortam büyüdükçe evet. Üretim, test ve paylaşılan servisleri ayrı hesaplara koymak; yarıçapı sınırlar, maliyet takibini ve erişim yönetimini kolaylaştırır.",
      },
      {
        question: "Azure yerine neden AWS?",
        answer:
          "İkisi de olgun platformlardır. Seçim; mevcut yetkinliğe, kullanılan servislere, iş ortağı ilişkilerine ve maliyet modeline göre yapılır. Gerekirse çoklu bulut da mümkündür.",
      },
      {
        question: "Yerinde sistemlerle bağlantı kurulabilir mi?",
        answer:
          "Evet. Site-to-site VPN ya da Direct Connect ile hibrit bağlantı kurulur; DNS ve kimlik entegrasyonu birlikte planlanır.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "veri-yedekleme-cozumleri",
    slug: "veri-yedekleme-cozumleri",
    title: "Veri Yedekleme Çözümleri",
    metaDescription:
      "3-2-1 yedekleme kurgusu, sunucu/uygulama/M365 yedeği, değiştirilemez (immutable) kopya ve düzenli geri yükleme testi. BTM Bilişim ile yedekleriniz gerçekten çalışsın.",
    content: `Veri yedekleme çözümlerimiz, verinizin yalnızca alınmasını değil; doğru saklanmasını, korunmasını ve geri yüklenebilir olduğunun düzenli olarak kanıtlanmasını sağlar.

## "Yedeğimiz var" yeterli değil

Birçok kurum yedek aldığını düşünür ama geri yükleme testi hiç yapılmamıştır. Fidye yazılımı saldırılarında yedekler ilk hedeftir. Sağlam bir kurgu; birden çok kopya, kurum dışında bir nüsha ve değiştirilemez (immutable) depolama içerir.

## Kapsamımız

- 3-2-1(-1-0) stratejisinin kurumunuza uyarlanması
- Sunucu, sanal makine, veritabanı ve dosya yedekleme
- Microsoft 365 ve SaaS uygulama yedeği
- Kurum dışı / bulut kopya ve bölgeler arası çoğaltma
- Fidye yazılımına karşı değiştirilemez (immutable) ve hava boşluklu (air-gapped) kopya
- Saklama politikaları ve yasal saklama süreleri
- Otomatik doğrulama ve düzenli geri yükleme testleri
- Yedekleme başarısızlıklarında alarm ve raporlama

## Nasıl çalışıyoruz?

1. **Analiz** — Kritik veri, kabul edilebilir veri kaybı (RPO) ve geri dönüş süresi (RTO) belirlenir.
2. **Tasarım** — Yedekleme topolojisi, saklama ve kopya stratejisi hazırlanır.
3. **Kurulum** — Çözüm devreye alınır, işler zamanlanır, izleme kurulur.
4. **Kanıtlama** — Geri yükleme testleri planlı olarak yapılır ve raporlanır.

## İlgili çözümler

Kesinti senaryoları için [felaket kurtarma](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/), Veeam lisansı için [Veeam lisanslama](/lisanslama/veeam-lisanslama/), silinmiş/bozulmuş veri için [veri kurtarma hizmetleri](/bulut-yedekleme/veri-kurtarma-hizmetleri/) ile birlikte konumlandırılır.

## Kurumunuza kazandırdıkları

- Fidye yazılımına dayanıklı, değiştirilemez kopyalar
- Test edilmiş, güvenilir geri yükleme
- Net RPO/RTO hedefleri
- Yedek başarısızlıklarının alarmla anında görülmesi

Mevcut yedekleme kurgunuzu birlikte gözden geçirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Yedeklerimizin çalıştığından nasıl emin oluruz?",
        answer:
          "Otomatik doğrulama ve planlı geri yükleme testleriyle. Belirli aralıklarla örnek sistemler izole bir ortama geri yüklenir ve sonuç raporlanır.",
      },
      {
        question: "Immutable yedek ne işe yarar?",
        answer:
          "Belirlenen süre boyunca değiştirilemeyen ve silinemeyen kopyadır. Bir saldırgan yönetici erişimi elde etse bile bu kopyayı bozamaz; geri dönüş garantisi sağlar.",
      },
      {
        question: "Mevcut yedekleme yazılımımızı kullanabilir miyiz?",
        answer:
          "Genellikle evet. Mevcut çözüm değerlendirilir; eksikler (kurum dışı kopya, immutable depolama, test) tamamlanır. Gerekirse alternatif önerilir.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "felaket-kurtarma-disaster-recovery",
    slug: "felaket-kurtarma-disaster-recovery",
    title: "Felaket Kurtarma (Disaster Recovery)",
    metaDescription:
      "RPO/RTO hedefli DR planı, yedek site/bulut replikasyonu, otomatik yük devretme ve düzenli DR tatbikatıyla ciddi kesintide geri dönüşünüz öngörülebilir olsun.",
    content: `Felaket kurtarma hizmetimiz, ciddi bir kesinti (donanım kaybı, yangın, fidye yazılımı, veri merkezi arızası) durumunda operasyonunuzu tanımlı bir sürede ayağa kaldıracak planı ve altyapıyı kurar.

## Yedekleme ile DR farkı

Yedekleme veriyi korur; felaket kurtarma ise çalışır sistemi geri getirir. Yedeğiniz olsa bile, sıfırdan sunucu kurup yapılandırma ve veriyi yükleme günler alabilir. DR bu süreyi saatlere, hatta dakikalara indirir.

## Kapsamımız

- İş etki analizi (BIA) ve kritik sistemlerin önceliklendirilmesi
- Her sistem için RPO (kabul edilebilir veri kaybı) ve RTO (geri dönüş süresi) hedefleri
- İkincil site ya da buluta (Azure Site Recovery, replikasyon) yük devretme kurgusu
- Otomatik/planlı failover ve failback prosedürleri
- DNS, kimlik ve ağ geçiş senaryoları
- DR runbook'ları ve rol/sorumluluk tanımları
- Düzenli DR tatbikatı ve sonuç raporlaması

## Nasıl çalışıyoruz?

1. **Analiz** — Kritik süreçler, bağımlılıklar ve hedef süreler belirlenir.
2. **Tasarım** — Replikasyon yöntemi, ikincil ortam ve failover akışı kurgulanır.
3. **Kurulum** — Replikasyon devreye alınır, runbook'lar yazılır.
4. **Tatbikat** — Planlı senaryolarla failover denenir, eksikler kapatılır.

## İlgili çözümler

Veri koruma temeli için [veri yedekleme çözümleri](/bulut-yedekleme/veri-yedekleme-cozumleri/), süreç ve organizasyon tarafı için [iş sürekliliği çözümleri](/bulut-yedekleme/is-surekliligi-cozumleri/) ile bütünleşir.

## Kurumunuza kazandırdıkları

- Kesinti senaryolarında öngörülebilir geri dönüş süresi
- Fidye yazılımı sonrası temiz noktadan ayağa kalkabilme
- Denenmiş, belgelenmiş kurtarma prosedürleri
- Yönetime raporlanabilir DR tatbikat sonuçları

Felaket kurtarma hedeflerinizi birlikte belirleyelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "RPO ve RTO'yu kim belirler?",
        answer:
          "İş birimleriyle birlikte belirlenir. Her sistemin işe etkisi farklıdır; kritik uygulamalar için düşük RPO/RTO, ikincil sistemler için daha geniş hedefler tanımlanır.",
      },
      {
        question: "İkincil bir veri merkezimiz yok, DR mümkün mü?",
        answer:
          "Evet. Buluta replikasyon (ör. Azure Site Recovery) ile ayrı bir fiziksel site kurmadan felaket kurtarma senaryosu oluşturulabilir.",
      },
      {
        question: "Tatbikat operasyonu böler mi?",
        answer:
          "Hayır. Tatbikatlar izole bir ağda ya da planlı bir pencerede yapılır; üretim etkilenmeden failover süreci ve süreler ölçülür.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "is-surekliligi-cozumleri",
    slug: "is-surekliligi-cozumleri",
    title: "İş Sürekliliği Çözümleri",
    metaDescription:
      "İş etki analizi, süreklilik planları (BCP), kriz yönetimi ve tatbikat. BTM Bilişim ile kesinti anında ne yapılacağını herkesin bildiği bir organizasyon kurun.",
    content: `İş sürekliliği çözümlerimiz, teknolojinin ötesine geçer: bir kesinti anında hangi sürecin nasıl, kimin tarafından ve hangi öncelikle yürütüleceğini tanımlayan bir organizasyon kurar.

## İş sürekliliği neden sadece IT işi değil?

Felaket kurtarma sistemleri geri getirir; iş sürekliliği ise sistemler yokken bile işin nasıl devam edeceğini planlar: alternatif çalışma yöntemleri, manuel süreçler, iletişim akışı ve karar yetkileri.

## Kapsamımız

- İş etki analizi (BIA): kritik süreçler, bağımlılıklar, kesinti maliyeti
- Süreklilik stratejileri ve senaryo bazlı planlar (BCP)
- Kriz yönetimi organizasyonu, roller ve karar akışları
- İletişim planı: çalışan, müşteri, tedarikçi ve kamu
- Alternatif çalışma alanı ve uzaktan çalışma hazırlığı
- Tedarikçi ve kritik hizmet bağımlılıklarının yönetimi
- Masabaşı ve saha tatbikatları, plan bakımı
- ISO 22301 uyumlu dokümantasyon (isteğe bağlı)

## Nasıl çalışıyoruz?

1. **Analiz** — Süreçler haritalanır, kesinti etkileri ve hedef süreler belirlenir.
2. **Plan** — Senaryolara göre süreklilik ve kriz yönetimi planları yazılır.
3. **Hazırlık** — Roller atanır, iletişim şablonları ve alternatif yöntemler hazırlanır.
4. **Tatbikat** — Planlar denenir, bulgular plana işlenir.

## İlgili çözümler

Teknik geri dönüş için [felaket kurtarma](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/), bilgi güvenliği süreçleriyle örtüşme için [ISO 27001 danışmanlığı](/danismanlik/iso-27001-bilgi-guvenligi-danismanligi/) ile birlikte yürütülür.

## Kurumunuza kazandırdıkları

- Kesinti anında belirsizliğin ve panik kararların azalması
- Herkesin rolünü ve önceliğini bildiği bir organizasyon
- Müşteri ve tedarikçilere karşı hazırlıklı iletişim
- İhale ve denetimlerde talep edilen süreklilik kanıtı

İş sürekliliği hazırlığınızı birlikte değerlendirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Küçük bir kurumuz, bu bize fazla mı?",
        answer:
          "Kapsam ölçeğe göre daralır. Küçük kurumlarda bile en kritik 3-5 sürecin planı, iletişim listesi ve basit bir kriz akışı büyük fark yaratır.",
      },
      {
        question: "ISO 22301 belgesi almak zorunda mıyız?",
        answer:
          "Hayır. Belgelendirme isteğe bağlıdır. Çoğu kurum için işleyen bir plan ve düzenli tatbikat yeterlidir; belge yalnızca sözleşmesel bir zorunluluksa hedeflenir.",
      },
      {
        question: "Planı kim güncel tutacak?",
        answer:
          "Plan bakımı için basit bir takvim ve sahiplik tanımlarız. Organizasyon ya da süreç değiştikçe güncelleme yapılır; yıllık tatbikat bunu tetikler.",
      },
    ],
  },
  {
    categorySlug: "bulut-yedekleme",
    serviceKey: "veri-kurtarma-hizmetleri",
    slug: "veri-kurtarma-hizmetleri",
    title: "Veri Kurtarma Hizmetleri",
    metaDescription:
      "Silinen, bozulan veya erişilemeyen verinin kurtarılması: disk, RAID, sunucu, veritabanı ve sanal makine. BTM Bilişim ile veri kaybında hızlı ve kontrollü müdahale.",
    content: `Veri kurtarma hizmetimiz; kaza sonucu silinen, bozulan ya da erişilemez hâle gelen verinin kurtarılması için kontrollü, önceliklendirilmiş bir müdahale sağlar.

## İlk adım: durumu kötüleştirmemek

Veri kaybında en sık yapılan hata, panikle yapılan müdahalelerdir: aygıta yazmaya devam etmek, yanlış onarım araçları çalıştırmak, RAID'i yeniden kurmak. İlk yapılması gereken sistemi durdurmak ve mevcut durumu korumaktır.

## Kapsamımız

- Sabit disk ve SSD kurtarma (mantıksal hatalar)
- RAID dizisi yeniden yapılandırma ve kurtarma
- Sunucu ve NAS/SAN üzerindeki bölüm ve dosya sistemi kurtarma
- Veritabanı (SQL Server, MySQL, PostgreSQL) tutarlılık onarımı ve kurtarma
- Sanal makine (VMDK/VHDX) ve anlık görüntü kurtarma
- Yanlışlıkla silme, biçimlendirme ve şifreleme sonrası kurtarma
- Kurtarma sonrası bütünlük doğrulama ve güvenli teslim

## Nasıl çalışıyoruz?

1. **Değerlendirme** — Kayıp senaryosu, aygıt durumu ve kurtarma olasılığı belirlenir.
2. **Koruma** — Mümkünse birebir imaj alınır, çalışma kopya üzerinde yapılır.
3. **Kurtarma** — Uygun yöntemle veri çıkarılır ve yapı yeniden oluşturulur.
4. **Doğrulama ve teslim** — Kurtarılan veri kontrol edilir, güvenli biçimde teslim edilir.

## Kalıcı çözüm

Veri kurtarma acil bir müdahaledir; tekrarını önlemek için [veri yedekleme çözümleri](/bulut-yedekleme/veri-yedekleme-cozumleri/) ve kritik sistemlerde [felaket kurtarma](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/) kurulmalıdır.

## Kurumunuza kazandırdıkları

- Kritik veri kaybında hızlı, kontrollü müdahale
- Durumu kötüleştirmeyen, kanıt koruyan bir yaklaşım
- Kurtarma olasılığının baştan dürüst değerlendirilmesi
- Tekrarı önleyecek yedekleme önerileri

Bir veri kaybı durumundaysanız aygıtı kullanmayı durdurun ve [hemen bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Her veri kurtarılabilir mi?",
        answer:
          "Hayır. Fiziksel hasarın derecesine, üzerine yazılıp yazılmadığına ve şifreleme durumuna göre değişir. Değerlendirmede kurtarma olasılığını ve kapsamını açıkça belirtiriz.",
      },
      {
        question: "Kurtarma ne kadar sürer?",
        answer:
          "Mantıksal hatalarda çoğu zaman birkaç gün; RAID ve veritabanı senaryolarında daha uzun sürebilir. Aciliyet durumunda öncelikli çalışma planlanabilir.",
      },
      {
        question: "Verimizin gizliliği korunur mu?",
        answer:
          "Evet. Kurtarma sürecinde gizlilik taahhüdü verilir, veri yalnızca yetkili kişilere teslim edilir ve çalışma kopyaları iş sonunda güvenli biçimde imha edilir.",
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
      "İş süreçlerinize birebir uyan, entegre ve ölçeklenebilir özel yazılım geliştirme. BTM Bilişim ile paket çözümlerin dışında kalan ihtiyaçlarınızı yazılıma dönüştürün.",
    content: `Özel yazılım geliştirme hizmetimiz; hazır paketlerin karşılamadığı, kurumunuza özgü iş süreçlerini uçtan uca bir yazılıma dönüştürür. Analizden devreye almaya ve sonrasındaki bakıma kadar tek sorumlulukla çalışırız.

## Ne zaman özel yazılım?

Süreciniz hazır bir üründe "yaklaşık" karşılanıyor ama her ay çok sayıda manuel işlem, Excel dosyası ve e-posta ile yamanıyorsa; ya da rekabet avantajınız tam olarak bu süreçteyse, özel yazılım yatırımı geri döner.

## Kapsamımız

- İş analizi, süreç modelleme ve gereksinim dokümantasyonu
- Kullanıcı deneyimi (UX) ve arayüz tasarımı
- Web tabanlı uygulama geliştirme (modern, güvenli mimari)
- Mevcut sistemlerle API entegrasyonu (ERP, muhasebe, e-posta, ödeme)
- Rol bazlı yetkilendirme ve denetim izi
- Test, kullanıcı kabul süreci ve devreye alma
- Bakım, geliştirme ve ikinci/üçüncü seviye destek
- KVKK uyumlu veri işleme ve güvenlik önlemleri

## Nasıl çalışıyoruz?

1. **Keşif** — Süreç, kullanıcılar ve entegrasyon ihtiyaçları netleştirilir; kapsam ve öncelikler belirlenir.
2. **Tasarım** — Veri modeli, mimari ve arayüz akışları çıkarılır.
3. **Geliştirme** — İş, kısa döngülerle (sprint) geliştirilir; her döngüde çalışır bir parça gösterilir.
4. **Devreye alma ve destek** — Test ve kabul sonrası canlıya alınır, bakım sözleşmesiyle sürdürülür.

## Örnekler

Geliştirdiğimiz ürünler arasında çok firmalı İK izin platformu [Otium](/yazilim-urunlerimiz/otium/) ve IT operasyon platformu [Orbit](/yazilim-urunlerimiz/orbit/) yer alır. Yaklaşımı [dijital dönüşüm danışmanlığı](/danismanlik/yazilim-ve-dijital-donusum-danismanligi/) ile birlikte planlıyoruz.

## Kurumunuza kazandırdıkları

- Sürece "yaklaşık" değil "birebir" uyan bir araç
- Manuel işlerin ve kopuk Excel'lerin ortadan kalkması
- Sistemler arası otomatik veri akışı
- Kaynak kodun ve verinin sizde kalması

Fikrinizi ya da mevcut sürecinizi birlikte değerlendirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Proje sabit fiyat mı, zaman-malzeme mi?",
        answer:
          "İkisi de mümkün. Kapsamı net projelerde sabit fiyatlı fazlar; kapsamın gelişebileceği ürünlerde iki haftalık döngülerle ilerleyen bir model öneririz.",
      },
      {
        question: "Kaynak kod bize ait olacak mı?",
        answer:
          "Evet. Sözleşmede aksi kararlaştırılmadıkça kaynak kod ve veri size aittir; teslimatın parçası olarak depo erişimi ve dokümantasyon verilir.",
      },
      {
        question: "Geliştirme ne kadar sürer?",
        answer:
          "Kapsama bağlı. İlk kullanılabilir sürüm (MVP) genellikle 2-4 ay içinde devreye girer; sonrasında öncelik sırasına göre geliştirilir.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "web-uygulama-gelistirme",
    slug: "web-uygulama-gelistirme",
    title: "Web Uygulama Geliştirme",
    metaDescription:
      "Kurumsal portallar, müşteri panelleri, B2B sipariş ve bayi sistemleri. BTM Bilişim ile tarayıcıdan çalışan, güvenli ve entegre web uygulamaları geliştirin.",
    content: `Web uygulama geliştirme hizmetimiz; kurum içi portallardan müşteri ve bayi panellerine kadar, tarayıcıdan çalışan iş uygulamalarını modern ve güvenli bir mimariyle hayata geçirir.

## Web uygulaması ne zaman doğru seçim?

Birden çok lokasyondan erişilmesi gereken, sık güncellenen ve kurulum gerektirmemesi istenen iş süreçleri için web uygulaması idealdir: bayi sipariş sistemleri, servis takip portalları, onay akışları, müşteri self-servis panelleri.

## Kapsamımız

- Kurumsal portal ve intranet uygulamaları
- Müşteri / bayi / tedarikçi self-servis panelleri
- B2B sipariş, teklif ve servis takip sistemleri
- Onay akışları ve form tabanlı süreç uygulamaları
- ERP, muhasebe ve CRM entegrasyonları
- Rol bazlı erişim, çok kiracılı (multi-tenant) yapı
- Mobil uyumlu (responsive) arayüz
- Performans, güvenlik ve KVKK uyumu

## Nasıl çalışıyoruz?

1. **Analiz** — Kullanıcı rolleri, ekranlar ve entegrasyonlar tanımlanır.
2. **Tasarım** — Akışlar ve arayüz prototipi hazırlanıp doğrulanır.
3. **Geliştirme** — Kısa döngülerle geliştirilir, her döngüde test edilir.
4. **Yayın ve bakım** — Canlıya alınır, izleme kurulur, geliştirme sürdürülür.

## İlgili hizmetler

Daha geniş kapsamlı ihtiyaçlarda [özel yazılım geliştirme](/yazilim-dijital/ozel-yazilim-gelistirme/), sistemler arası bağlantı için [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/) ile birlikte yürütülür.

## Kurumunuza kazandırdıkları

- Kurulum gerektirmeyen, her yerden erişilebilir uygulamalar
- Bayi/müşteri işlemlerinin self-servise kayması, telefon/e-posta yükünün azalması
- ERP ve muhasebeyle otomatik veri akışı
- Mobil uyumlu, güvenli erişim

Web uygulaması ihtiyacınızı birlikte konuşalım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Mevcut ERP'mizle konuşabilir mi?",
        answer:
          "Evet. SAP, Logo, Mikro, Netsis ve diğer sistemlerle API ya da veri tabanı entegrasyonu kurarak sipariş, stok ve cari verisini çift yönlü akıtabiliriz.",
      },
      {
        question: "Uygulamayı biz mi barındıracağız?",
        answer:
          "Tercihe göre. Kendi sunucunuzda, bulut hesabınızda ya da bizim yöneteceğimiz bir ortamda barındırılabilir; yedekleme ve izleme kurgusu buna göre planlanır.",
      },
      {
        question: "Mobil uygulama da gerekir mi?",
        answer:
          "Çoğu senaryoda mobil uyumlu web arayüzü yeterlidir. Cihaz kamerası, çevrimdışı çalışma gibi ihtiyaçlar varsa ayrı bir mobil uygulama değerlendirilir.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "web-tasarim-ve-kurumsal-web-sitesi",
    slug: "web-tasarim-ve-kurumsal-web-sitesi",
    title: "Web Tasarım ve Kurumsal Web Sitesi",
    metaDescription:
      "Kurumsal kimliğinize uygun, hızlı, SEO uyumlu ve yönetilebilir web sitesi tasarımı ve geliştirmesi. BTM Bilişim ile sitenizi bir vitrin değil, bir kazanım kanalı yapın.",
    content: `Web tasarım ve kurumsal web sitesi hizmetimiz; markanızı doğru anlatan, arama motorlarında bulunan, hızlı açılan ve içeriğini kendiniz yönetebileceğiniz bir site kurar.

## İyi bir kurumsal site neye benzer?

Hızlı açılır (Core Web Vitals), mobilde kusursuz çalışır, arama motoru için teknik olarak temizdir, dönüşüm noktaları (teklif, iletişim, demo) nettir ve içerik güncellemesi için ajansa bağımlı bırakmaz.

## Kapsamımız

- Bilgi mimarisi, sayfa planı ve içerik yapısı
- Kurumsal kimliğe uygun arayüz tasarımı (UI/UX)
- Performans odaklı geliştirme (hızlı yükleme, iyi Core Web Vitals)
- Teknik SEO temeli: semantik yapı, meta veriler, site haritası, yapısal veri (schema.org)
- İçerik yönetimi: blog, hizmet ve proje sayfalarını panelden düzenleme
- Çok dilli yapı (isteğe bağlı)
- İletişim formu, harita, WhatsApp ve dönüşüm entegrasyonları
- Analitik ve arama konsolu kurulumu

## Nasıl çalışıyoruz?

1. **Keşif** — Hedef kitle, rakipler, mesaj ve dönüşüm hedefleri belirlenir.
2. **Tasarım** — Sayfa şablonları ve arayüz tasarlanıp onaylanır.
3. **Geliştirme** — Site hızlı ve SEO uyumlu biçimde kodlanır, içerik girilir.
4. **Yayın ve ölçüm** — Site yayınlanır, analitik ve arama konsolu kurulur, ilk optimizasyonlar yapılır.

## İlgili hizmetler

Panelden yönetilecek özel modüller için [web uygulama geliştirme](/yazilim-dijital/web-uygulama-gelistirme/), form verisinin sistemlere akması için [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/) ile birleşir.

## Kurumunuza kazandırdıkları

- Arama motorlarında bulunur, teknik olarak temiz bir site
- Hızlı açılan, mobilde sorunsuz bir deneyim
- İçeriği kendiniz güncelleyebilme
- Ölçülebilir teklif/iletişim dönüşümleri

Sitenizin yenilenmesi ya da sıfırdan kurulması için [bizimle iletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Mevcut içeriğimizi taşıyacak mısınız?",
        answer:
          "Evet. Mevcut metin, görsel ve sayfalar gözden geçirilip yeni yapıya taşınır; gerekli yerlerde SEO'yu koruyacak yönlendirmeler (301) kurulur.",
      },
      {
        question: "Siteyi güncellemek için size mi bağımlı olacağız?",
        answer:
          "Hayır. Blog, hizmet ve proje içerikleri için bir yönetim paneli teslim edilir; günlük güncellemeleri kendi ekibiniz yapabilir.",
      },
      {
        question: "SEO garantisi veriyor musunuz?",
        answer:
          "Sıralama garantisi kimse veremez. Biz teknik SEO temelini (hız, yapı, meta veriler, yapısal veri, site haritası) doğru kurar ve ölçüm altyapısını hazır teslim ederiz.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "api-ve-sistem-entegrasyonlari",
    slug: "api-ve-sistem-entegrasyonlari",
    title: "API ve Sistem Entegrasyonları",
    metaDescription:
      "Sistemleriniz arasında güvenli, izlenebilir veri akışı: REST/SOAP API, webhook, ETL ve entegrasyon katmanı. BTM Bilişim ile kopuk sistemleri birbirine bağlayın.",
    content: `API ve sistem entegrasyonları hizmetimiz, birbirinden habersiz çalışan sistemlerinizi güvenli ve izlenebilir bir veri akışıyla birbirine bağlar. Manuel veri kopyalama ve mutabakat işleri ortadan kalkar.

## Entegrasyon eksikliğinin maliyeti

Aynı veriyi iki sisteme elle girmek; hem zaman kaybı hem de hata kaynağıdır. Sipariş, cari, stok ve fatura verisinin sistemler arasında elle taşındığı her nokta, bir mutabakat toplantısı ve bir "hangisi doğru?" tartışması demektir.

## Kapsamımız

- REST ve SOAP API tasarımı, geliştirme ve dokümantasyonu
- Mevcut sistemlerin API'leriyle entegrasyon (ERP, CRM, e-ticaret, banka, kargo, e-fatura)
- Webhook ve olay tabanlı entegrasyonlar
- Toplu veri aktarımı (ETL) ve zamanlanmış senkronizasyon
- Merkezi entegrasyon katmanı / servis veri yolu yaklaşımı
- Kimlik doğrulama, yetkilendirme ve hız sınırlama
- Hata yönetimi, yeniden deneme ve izleme/alarm
- Veri eşleme (mapping) ve dönüşüm kuralları

## Nasıl çalışıyoruz?

1. **Analiz** — Hangi veri, hangi yönde, hangi sıklıkta akmalı belirlenir.
2. **Tasarım** — Arayüz sözleşmeleri, eşleme kuralları ve hata senaryoları tanımlanır.
3. **Geliştirme** — Entegrasyon kurulur, test ortamında uçtan uca doğrulanır.
4. **İzleme** — Canlıda akış izlenir, hatalar alarm üretir ve raporlanır.

## İlgili hizmetler

ERP'ye özel akışlar için [ERP entegrasyonları](/yazilim-dijital/erp-entegrasyonlari/), süreç otomasyonu için [iş süreci otomasyonları](/yazilim-dijital/is-sureci-otomasyonlari/) ile birlikte kurgulanır.

## Kurumunuza kazandırdıkları

- Aynı veriyi iki kez girme işinin bitmesi
- Sistemler arası tutarlılık ve azalan mutabakat yükü
- Hataların alarm ile anında görülmesi
- Yeni sistem eklendiğinde hazır bir entegrasyon deseni

Entegrasyon ihtiyaçlarınızı birlikte haritalayalım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Sistemimizin API'si yok, yine de entegre olur mu?",
        answer:
          "Genellikle evet. API yoksa veri tabanı görünümleri, dosya tabanlı aktarım ya da ekran/servis otomasyonu gibi alternatif yöntemlerle güvenli bir akış kurulabilir.",
      },
      {
        question: "Entegrasyon bozulursa nasıl anlarız?",
        answer:
          "Her akış izlenir; başarısız aktarım, gecikme ya da veri uyuşmazlığı durumunda alarm üretilir ve tekrar deneme mantığı devreye girer.",
      },
      {
        question: "Gerçek zamanlı mı olmalı?",
        answer:
          "İhtiyaca göre. Stok ve fiyat gibi kritik veriler için anlık; muhasebe kayıtları için saatlik ya da günlük toplu senkronizasyon çoğu zaman yeterli ve daha dayanıklıdır.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "erp-entegrasyonlari",
    slug: "erp-entegrasyonlari",
    title: "ERP Entegrasyonları",
    metaDescription:
      "SAP, Logo, Mikro, Netsis ve Dynamics için e-ticaret, CRM, banka, e-fatura ve özel uygulama entegrasyonlarıyla ERP'nizi tüm iş sistemlerinize bağlayın.",
    content: `ERP entegrasyonları hizmetimiz, ERP sisteminizi diğer iş uygulamalarınızla (e-ticaret, CRM, banka, e-fatura, lojistik, özel yazılımlar) çift yönlü ve güvenilir biçimde konuşturur.

## ERP genellikle bir ada olarak kalır

ERP kurulur ama e-ticaret siparişleri elle girilir, banka hareketleri Excel'den aktarılır, CRM ile cari bilgisi eşleşmez. Bu kopukluklar hem iş gücü hem de veri güvenilirliği kaybıdır.

## Kapsamımız

- **Desteklenen ERP'ler:** SAP, Logo (Tiger/GO/j-Platform), Mikro, Netsis, Microsoft Dynamics, DİA, Nebim ve diğerleri
- E-ticaret ve pazaryeri entegrasyonu (sipariş, stok, fiyat, kargo, iade)
- CRM entegrasyonu (cari, teklif, sipariş, bakiye)
- Banka ve POS mutabakatı, otomatik tahsilat eşleme
- e-Fatura / e-İrsaliye / e-Arşiv entegrasyonu
- Üretim, depo ve el terminali (WMS) entegrasyonları
- Bütçe ve raporlama sistemlerine veri aktarımı
- Eşleme kuralları, hata yönetimi ve izleme

## Nasıl çalışıyoruz?

1. **Analiz** — ERP tarafındaki nesneler ve karşı sistemdeki alanlar eşlenir.
2. **Tasarım** — Akış yönü, sıklık, tetikleyici ve hata senaryoları belirlenir.
3. **Geliştirme** — Entegrasyon test firması/dönemi üzerinde kurulur ve doğrulanır.
4. **Canlı geçiş** — Kontrollü açılır, ilk günler yakın izlenir.

## İlgili hizmetler

Logo tarafında derinlemesine ihtiyaçlar için [Logo ERP destek ve danışmanlık](/danismanlik/logo-erp-destek-ve-danismanlik/), bütçe–gerçekleşme raporlaması için [Atlas](/yazilim-urunlerimiz/atlas/) ile entegre çalışılır.

## Kurumunuza kazandırdıkları

- E-ticaret ve pazaryeri siparişlerinin ERP'ye otomatik düşmesi
- Banka ve POS mutabakatının otomatikleşmesi
- Stok ve fiyatın tüm kanallarda tutarlı olması
- e-Belge süreçlerinin ERP içinden yürümesi

Mevcut ERP entegrasyon ihtiyaçlarınızı birlikte çıkaralım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "ERP'mizin sürümü eski, sorun olur mu?",
        answer:
          "Genellikle çözülebilir. Eski sürümlerde API kısıtlıysa veri tabanı ya da dosya tabanlı yöntemlerle güvenli bir akış kurarız; riskler önceden belirtilir.",
      },
      {
        question: "Entegrasyon ERP'yi yavaşlatır mı?",
        answer:
          "Doğru tasarlandığında hayır. Yoğun işlemler mesai dışına ya da toplu pencerelere alınır, canlı sorgular sınırlandırılır ve ERP üzerindeki yük izlenir.",
      },
      {
        question: "Birden fazla sistemi aynı anda bağlayabilir misiniz?",
        answer:
          "Evet. Merkezi bir entegrasyon katmanı ile ERP'yi tek noktadan birden çok sisteme bağlamak, her biri için ayrı ikili entegrasyondan daha sürdürülebilirdir.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "is-sureci-otomasyonlari",
    slug: "is-sureci-otomasyonlari",
    title: "İş Süreci Otomasyonları",
    metaDescription:
      "Onay akışları, veri aktarımı, raporlama ve tekrarlayan görevlerin otomasyonu (workflow, RPA, entegrasyon). BTM Bilişim ile manuel emeği azaltın, hata payını düşürün.",
    content: `İş süreci otomasyonları hizmetimiz; tekrarlayan, kural bazlı ve manuel emek gerektiren işleri yazılıma devrederek ekiplerinizin zamanını katma değerli işlere ayırmasını sağlar.

## Hangi süreçler otomasyona uygun?

En iyi adaylar; sık tekrarlanan, net kuralları olan, birden çok sistem ya da kişi arasında gidip gelen süreçlerdir: onay akışları, veri girişi ve aktarımı, rapor hazırlama ve dağıtma, mutabakat, bildirim gönderme, dosya işleme.

## Kapsamımız

- Süreç keşfi ve otomasyon fırsatlarının önceliklendirilmesi (etki/efor)
- Onay ve iş akışı (workflow) uygulamaları
- Sistemler arası veri aktarımı ve senkronizasyon
- Robotik süreç otomasyonu (RPA) — API'si olmayan uygulamalar için
- Otomatik raporlama ve dağıtım
- E-posta, belge ve form tabanlı süreçlerin otomasyonu
- İzleme, istisna yönetimi ve insan onayı noktaları
- Otomasyon envanteri ve bakımı

## Nasıl çalışıyoruz?

1. **Keşif** — Süreçler haritalanır, süre ve hacim ölçülür, adaylar seçilir.
2. **Tasarım** — Akış, kurallar, istisnalar ve insan onay noktaları tanımlanır.
3. **Uygulama** — Otomasyon kurulur, gölge modda gerçek veriyle test edilir.
4. **Devreye alma** — Canlıya alınır, izlenir; kazanılan süre raporlanır.

## İlgili hizmetler

Sistemler arası bağlantı için [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/), daha kapsamlı ihtiyaçlar için [özel yazılım geliştirme](/yazilim-dijital/ozel-yazilim-gelistirme/) ile birlikte yürütülür. Programın bütünü için [dijital dönüşüm danışmanlığı](/danismanlik/yazilim-ve-dijital-donusum-danismanligi/).

## Kurumunuza kazandırdıkları

- Tekrarlayan işlerde belirgin zaman tasarrufu
- İnsan hatası kaynaklı düzeltmelerin azalması
- Süreçlerin denetlenebilir ve izlenebilir olması
- Yoğunluk dönemlerinde kapasitenin esnemesi

Otomasyona uygun süreçlerinizi birlikte tespit edelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Otomasyon çalışan yerine mi geçiyor?",
        answer:
          "Amaç kişileri değil, kişilerin zamanını yiyen tekrar işleri devralmaktır. Ekipler genellikle aynı sürede daha fazla ve daha nitelikli işe odaklanır.",
      },
      {
        question: "RPA mı, entegrasyon mu daha iyi?",
        answer:
          "Sistemde API varsa entegrasyon daha dayanıklıdır. RPA, API'si olmayan ya da değiştirilemeyen eski uygulamalar için pratik bir köprüdür; ikisi birlikte de kullanılır.",
      },
      {
        question: "İlk sonucu ne kadar sürede görürüz?",
        answer:
          "Küçük ve net bir süreç genellikle 2-4 haftada devreye girer. İlk otomasyonun kazandırdığı süre, sonraki adayların önceliklendirmesine veri sağlar.",
      },
    ],
  },
  {
    categorySlug: "yazilim-dijital",
    serviceKey: "raporlama-ve-dashboard-cozumleri",
    slug: "raporlama-ve-dashboard-cozumleri",
    title: "Raporlama ve Dashboard Çözümleri",
    metaDescription:
      "Farklı kaynaklardan gelen veriyi tek panelde toplayan, gerçek zamanlı yönetim panoları ve otomatik raporlar. BTM Bilişim ile kararlarınızı canlı veriyle alın.",
    content: `Raporlama ve dashboard çözümlerimiz; ERP, muhasebe, CRM, e-ticaret ve operasyon sistemlerinizdeki dağınık veriyi tek bir yerde toplar ve yönetimin karar alabileceği canlı panolara dönüştürür.

## Excel raporlamanın sınırı

Ay sonunda elle hazırlanan raporlar; geç gelir, kişiye bağımlıdır ve iki kişi aynı raporu farklı sonuçlarla üretebilir. Panelde toplanan canlı veri bu üç sorunu birden çözer. [Atlas Bütçe ve Raporlama Yazılımı](/yazilim-urunlerimiz/atlas/) bu işi canlı veriyle tek panelde yapar.

## Kapsamımız

- Veri kaynaklarının bağlanması (ERP, muhasebe, CRM, e-ticaret, üretim, Excel)
- Veri ambarı / veri modeli kurulumu ve tek doğruluk kaynağı
- Yönetim panoları: satış, tahsilat, nakit, stok, üretim, İK
- KPI tanımları ve hedef/gerçekleşen karşılaştırmaları
- Otomatik zamanlanmış raporlar (PDF/Excel) ve e-posta dağıtımı
- Rol bazlı erişim ile veri güvenliği
- Mobil uyumlu görünümler
- Uyarı eşikleri ve anomali bildirimleri

## Nasıl çalışıyoruz?

1. **İhtiyaç analizi** — Hangi kararlar, hangi metriklerle alınıyor belirlenir.
2. **Veri modeli** — Kaynaklar bağlanır, tanımlar ortaklaştırılır, tek doğruluk kaynağı kurulur.
3. **Pano tasarımı** — Panolar hazırlanır, kullanıcılarla doğrulanır.
4. **Devreye alma** — Yenileme sıklığı, erişim ve otomatik dağıtım kurulur.

## İlgili hizmetler

Bütçe–gerçekleşme özelinde hazır bir ürün olarak [Atlas](/yazilim-urunlerimiz/atlas/), veri akışı için [API ve sistem entegrasyonları](/yazilim-dijital/api-ve-sistem-entegrasyonlari/) ile birlikte konumlandırılır.

## Kurumunuza kazandırdıkları

- Raporların kişiye değil sisteme bağlı olması
- Aynı metriğin herkeste aynı sonucu vermesi
- Kapanışı beklemeden, dönem içinde görünürlük
- Yönetim toplantılarının veriyle başlaması

Raporlama ihtiyaçlarınızı birlikte netleştirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Hangi raporlama aracını kullanıyorsunuz?",
        answer:
          "İhtiyaca göre yaygın iş zekâsı araçları ya da web tabanlı özel panolar. Seçim; veri hacmi, kullanıcı sayısı, lisans maliyeti ve mevcut altyapıya göre yapılır.",
      },
      {
        question: "Veriler gerçek zamanlı mı olacak?",
        answer:
          "Metrik bazında ayarlanır. Operasyonel panolar için sık yenileme; finansal raporlar için günlük ya da kapanış bazlı yenileme çoğu zaman yeterlidir.",
      },
      {
        question: "Farklı sistemlerdeki tanımlar tutmuyor, bu sorun olur mu?",
        answer:
          "Bu, projenin ilk işidir. Ortak tanımlar (ör. 'net satış' neyi kapsar) netleştirilir ve tek doğruluk kaynağı bu tanımlar üzerine kurulur.",
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
      "Microsoft ürünleri için doğru lisans modeli, CSP/EA tedariki, uyumluluk (SAM) ve yenileme yönetimiyle fazla ödemeden eksiksiz lisanslayın.",
    content: `Microsoft lisanslama hizmetimiz; kurumunuzun gerçek ihtiyacına göre doğru lisans modelini belirler, tedarik eder ve yenileme takvimini yönetir. Amaç, ne eksik (uyumsuzluk riski) ne de fazla (gereksiz maliyet) lisanslamaktır.

## Microsoft lisanslama neden karmaşık?

Kullanıcı bazlı, cihaz bazlı ve çekirdek (core) bazlı modeller; CSP, Enterprise Agreement ve açık lisans kanalları; Software Assurance hakları; bulut ve şirket içi karışımı… Doğru kurgu ciddi tasarruf, yanlış kurgu hem para hem denetim riski demektir.

## Kapsamımız

- Mevcut lisans envanteri ve kullanım analizi
- İhtiyaca göre doğru model ve kanal seçimi (CSP, EA, MPSA)
- Microsoft 365, Windows, Windows Server, SQL Server, Azure için lisans planı
- Yazılım varlık yönetimi (SAM) ve uyumluluk kontrolü
- Denetim (audit) hazırlığı ve boşluk kapatma
- Yenileme takvimi ve büyüme/azalma senaryoları
- Maliyet optimizasyonu ve alternatif model karşılaştırması

## Nasıl çalışıyoruz?

1. **Envanter** — Sahip olunan lisanslar ve fiili kullanım karşılaştırılır.
2. **Analiz** — Eksik, fazla ve yanlış modelde olan kalemler tespit edilir.
3. **Plan** — Doğru model ve kanalla tedarik/geçiş planı hazırlanır.
4. **Yönetim** — Yenileme tarihleri izlenir, değişiklikler önceden planlanır.

## İlgili hizmetler

Ürün bazında derinleşmek için [Microsoft 365 lisanslama](/lisanslama/microsoft-365-lisanslama/) ve [Windows Server & SQL Server lisanslama](/lisanslama/windows-server-sql-server-lisanslama/); teknik kurulum için [Microsoft 365 çözümleri](/bulut-yedekleme/microsoft-365-cozumleri/) ve [Azure çözümleri](/bulut-yedekleme/microsoft-azure-cozumleri/).

## Kurumunuza kazandırdıkları

- Gereksiz lisans maliyetinin ortadan kalkması
- Denetimde uyumsuzluk sürprizinin önlenmesi
- Yenileme tarihlerinin kaçırılmaması
- Bulut/şirket içi geçişlerde lisans haklarının doğru kullanılması

Lisans yapınızı bir envanter çalışmasıyla birlikte gözden geçirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Mevcut tedarikçimizi değiştirmeden çalışabilir miyiz?",
        answer:
          "Evet. İsterseniz yalnızca doğru model belirleme ve uyumluluk danışmanlığı alır, tedariki mevcut kanalınızdan sürdürürsünüz; isterseniz tedariki de biz üstleniriz.",
      },
      {
        question: "Fazla lisansımız varsa ne olur?",
        answer:
          "Yenileme döneminde kullanılmayan kalemler kapsamdan çıkarılır ya da ihtiyaç duyulan başka ürünlere kaydırılır. Analiz, bu fırsatları net biçimde ortaya koyar.",
      },
      {
        question: "Microsoft denetimi geldi, yardımcı olur musunuz?",
        answer:
          "Evet. Denetim öncesi bir iç değerlendirme yapar, boşlukları önceden kapatır ve süreç boyunca sizinle birlikte çalışırız.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "microsoft-365-lisanslama",
    slug: "microsoft-365-lisanslama",
    title: "Microsoft 365 Lisanslama",
    metaDescription:
      "Business ve Enterprise planları, E3/E5 ve eklenti kararları, kullanıcı bazlı optimizasyon ve CSP tedariki. BTM Bilişim ile Microsoft 365'te doğru planı seçin.",
    content: `Microsoft 365 lisanslama hizmetimiz; kullanıcı profillerinize göre doğru plan karmasını belirler, gereksiz üst paketleri ayıklar ve tedarik ile yenilemeyi yönetir.

## Herkes aynı planda olmak zorunda değil

Bir üretim çalışanı, bir yönetici ve bir bilgi işçisi aynı Microsoft 365 özelliklerine ihtiyaç duymaz. Kullanıcıları profillerine göre farklı planlara yerleştirmek çoğu kurumda belirgin tasarruf sağlar.

## Kapsamımız

- Kullanıcı profili çıkarımı ve plan eşleştirmesi (Business Basic/Standard/Premium, E3, E5, F3)
- E5 yerine hedefli eklenti (güvenlik, uyum, telefon) karşılaştırması
- Frontline (F serisi) lisanslarıyla saha çalışanı optimizasyonu
- Mevcut atanmış ama kullanılmayan lisansların tespiti
- CSP üzerinden esnek aylık/yıllık tedarik
- Yenileme, taahhüt ve kullanıcı sayısı değişim yönetimi
- Güvenlik ve uyum ihtiyaçlarının lisans karşılığının netleştirilmesi

## Nasıl çalışıyoruz?

1. **Kullanım analizi** — Atanan lisanslar ve fiili kullanım (oturum, uygulama, özellik) incelenir.
2. **Profil eşleştirme** — Kullanıcı grupları tanımlanır, her gruba uygun plan belirlenir.
3. **Optimizasyon planı** — Yükseltme/düşürme ve eklenti kararları önerilir.
4. **Tedarik ve takip** — Lisanslar sağlanır, yenileme ve değişiklikler yönetilir.

## İlgili hizmetler

Teknik kurulum, göç ve güvenlik yapılandırması için [Microsoft 365 çözümleri](/bulut-yedekleme/microsoft-365-cozumleri/); genel Microsoft sözleşmesi için [Microsoft lisanslama](/lisanslama/microsoft-lisanslama/).

## Kurumunuza kazandırdıkları

- Kullanıcı başına doğru plan, azalan toplam maliyet
- E5 kararının veriyle verilmesi
- Kullanılmayan lisansların geri kazanılması
- Esnek, öngörülebilir yenileme

Microsoft 365 plan yapınızı birlikte gözden geçirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "E5'e geçmeli miyiz?",
        answer:
          "Duruma göre. E5'in güvenlik ve uyum bileşenlerini yoğun kullanacaksanız bütünsel olarak ekonomik olabilir; yalnızca birkaç özelliğe ihtiyaç varsa hedefli eklentiler daha uygundur. Analiz bunu netleştirir.",
      },
      {
        question: "Saha/üretim çalışanları için ucuz seçenek var mı?",
        answer:
          "Evet. Frontline (F1/F3) lisansları, paylaşımlı cihaz kullanan ve tam Office masaüstüne ihtiyaç duymayan çalışanlar için tasarlanmıştır.",
      },
      {
        question: "Kullanıcı sayımız dönemsel değişiyor, sorun olur mu?",
        answer:
          "CSP modelinde aylık esneklik mümkündür. Taahhütlü ve esnek lisansları birlikte kullanarak hem maliyet hem esneklik dengesi kurulur.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "windows-server-sql-server-lisanslama",
    slug: "windows-server-sql-server-lisanslama",
    title: "Windows Server & SQL Server Lisanslama",
    metaDescription:
      "Çekirdek bazlı lisanslama, CAL gereksinimleri, sanallaştırma ve yüksek erişilebilirlik senaryolarıyla sunucu lisanslarınızı doğru modelleyin.",
    content: `Windows Server ve SQL Server lisanslama hizmetimiz; çekirdek bazlı lisanslamanın, CAL gereksinimlerinin ve sanallaştırma senaryolarının doğru hesaplanmasını sağlar. Bu iki üründe yanlış model, en sık görülen uyumsuzluk ve maliyet hatasıdır.

## Nerede hata yapılıyor?

En yaygın hatalar: fiziksel çekirdeklerin eksik lisanslanması, sanal makine yoğunluğu arttığında Datacenter'a geçmemek, SQL Server'da pasif (yüksek erişilebilirlik) düğümün Software Assurance olmadan çalıştırılması ve CAL sayımının unutulması.

## Kapsamımız

- Fiziksel çekirdek sayımı ve minimum lisans kuralı kontrolü
- Windows Server Standard vs. Datacenter kararı (sanal makine yoğunluğuna göre)
- Windows Server / RDS CAL gereksinimlerinin belirlenmesi
- SQL Server: çekirdek bazlı vs. Server+CAL modeli karşılaştırması
- Yüksek erişilebilirlik (Always On, failover cluster) ve pasif düğüm hakları
- Software Assurance değeri ve bulut kullanım hakları (Azure Hybrid Benefit)
- Sanallaştırma ve konteyner senaryolarında lisans etkisi
- Denetim hazırlığı ve mevcut kurulumun uyumluluk kontrolü

## Nasıl çalışıyoruz?

1. **Envanter** — Fiziksel ana bilgisayarlar, çekirdekler, sanal makineler ve SQL örnekleri çıkarılır.
2. **Modelleme** — Her senaryo için en uygun lisans modeli hesaplanır.
3. **Boşluk analizi** — Eksik ve fazla lisanslar, SA ihtiyaçları raporlanır.
4. **Tedarik ve plan** — Doğru lisanslar sağlanır, yenileme ve büyüme senaryosu planlanır.

## İlgili hizmetler

Sanallaştırma tasarımı için [sanallaştırma çözümleri](/sistem-network/sanallastirma-cozumleri/), bulut lisans hakları için [Azure çözümleri](/bulut-yedekleme/microsoft-azure-cozumleri/) ve [Microsoft lisanslama](/lisanslama/microsoft-lisanslama/).

## Kurumunuza kazandırdıkları

- Çekirdek ve CAL sayımında hatasız, denetime dayanıklı bir yapı
- Standard/Datacenter kararının maliyet optimumunda verilmesi
- Pasif SQL düğümlerinin doğru lisanslanması
- Azure Hybrid Benefit ile bulutta lisans tasarrufu

Sunucu lisans yapınızı bir envanter çalışmasıyla doğrulayalım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Standard mı Datacenter mı almalıyız?",
        answer:
          "Bir fiziksel ana bilgisayarda çalıştırdığınız Windows sanal makine sayısı belirleyicidir. Yoğunluk arttıkça, belirli bir eşikten sonra Datacenter tek seferde daha ekonomik hâle gelir.",
      },
      {
        question: "Yedek (pasif) SQL sunucumuz için lisans gerekir mi?",
        answer:
          "Software Assurance kapsamında bir adet pasif failover örneği için ek lisans gerekmez. SA yoksa pasif düğüm de lisanslanmalıdır.",
      },
      {
        question: "Azure Hybrid Benefit nedir?",
        answer:
          "Software Assurance'lı Windows Server ve SQL Server lisanslarınızı Azure'da kullanarak sanal makine maliyetini önemli ölçüde düşürmenizi sağlayan bir haktır.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "vmware-lisanslama",
    slug: "vmware-lisanslama",
    title: "VMware Lisanslama",
    metaDescription:
      "VMware vSphere ve VCF abonelik modeli, çekirdek bazlı lisanslama, yenileme ve alternatif değerlendirmesi. BTM Bilişim ile sanallaştırma lisanslarınızı planlayın.",
    content: `VMware lisanslama hizmetimiz; değişen abonelik modeli ve çekirdek bazlı lisanslama kuralları içinde sanallaştırma altyapınızın lisans ihtiyacını doğru hesaplar, yenileme ve alternatif kararlarında yol gösterir.

## VMware lisanslamada son dönem değişiklikleri

VMware, kalıcı lisans ve çok sayıda ayrı ürün yerine abonelik tabanlı paketlere (ör. VMware vSphere Foundation, VMware Cloud Foundation) ve çekirdek bazlı, çekirdek başına minimumlu bir modele geçti. Bu, mevcut kurulumların yenileme maliyetini önemli ölçüde değiştirebiliyor.

## Kapsamımız

- Mevcut VMware envanteri, sürüm ve lisans/destek durumu tespiti
- Fiziksel çekirdek sayımı ve yeni modele göre lisans ihtiyacı hesaplama
- Paket karşılaştırması ve gereksinime göre doğru abonelik seçimi
- Yenileme maliyeti projeksiyonu ve bütçe planı
- Alternatif hipervizör değerlendirmesi (Hyper-V, Proxmox) — teknik ve maliyet karşılaştırması
- Göç senaryosu ve risk analizi (alternatif seçilirse)
- Destek ve yenileme takviminin yönetimi

## Nasıl çalışıyoruz?

1. **Envanter** — Ana bilgisayarlar, çekirdekler, çalışan sürümler ve sözleşme tarihleri çıkarılır.
2. **Modelleme** — Yeni abonelik modeline göre lisans ihtiyacı ve maliyet hesaplanır.
3. **Karar** — Yenileme mi, paket değişikliği mi, alternatife göç mü — seçenekler tablolanır.
4. **Uygulama** — Seçilen yolda tedarik ya da göç planı yürütülür.

## İlgili hizmetler

Sanallaştırma mimarisi ve olası göç için [sanallaştırma çözümleri](/sistem-network/sanallastirma-cozumleri/); yedekleme entegrasyonu için [Veeam lisanslama](/lisanslama/veeam-lisanslama/).

## Kurumunuza kazandırdıkları

- Yenileme maliyetinin sürpriz olmaktan çıkması
- Çekirdek bazlı modelde doğru, fazlasız lisanslama
- Gerekiyorsa alternatif hipervizör için gerçekçi bir iş senaryosu
- Destek sürekliliğinin korunması

VMware yenileme ya da alternatif kararınızı birlikte değerlendirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Mevcut kalıcı lisanslarımız ne olacak?",
        answer:
          "Kalıcı lisanslar çalışmaya devam eder ancak destek yalnızca abonelikle sürer. Envanter çalışmasında destek bitiş tarihlerinizi ve seçeneklerinizi netleştiririz.",
      },
      {
        question: "Alternatif hipervizöre geçmek mantıklı mı?",
        answer:
          "Kuruma göre değişir. Küçük/orta ortamlarda maliyet farkı belirginse ve iş yükleri uyumluysa değerlendirilebilir; göç eforu, ekip yetkinliği ve risk birlikte tartılır.",
      },
      {
        question: "Çekirdek başına minimum ne anlama geliyor?",
        answer:
          "Yeni modelde her fiziksel çekirdek için lisans gerekir ve işlemci başına bir taban çekirdek sayısı uygulanır; az çekirdekli sunucularda etkili maliyet artabilir.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "veeam-lisanslama",
    slug: "veeam-lisanslama",
    title: "Veeam Lisanslama",
    metaDescription:
      "Veeam Data Platform sürümleri, VUL (Veeam Universal License) instance hesaplama, sözleşme ve yenileme yönetimiyle yedekleme lisanslarınızı doğru boyutlandırın.",
    content: `Veeam lisanslama hizmetimiz; yedekleme ve kurtarma altyapınızın Veeam lisans ihtiyacını iş yükü türüne göre doğru hesaplar ve yenilemeyi yönetir.

## Veeam lisanslama mantığı

Güncel Veeam, taşınabilir bir birim modeline (Veeam Universal License – VUL) dayanır: lisans "instance" olarak tanımlanır ve korunan iş yükünün türüne göre farklı ağırlıkta tüketilir (ör. sanal makine, fiziksel sunucu, iş istasyonu, bulut/SaaS iş yükü). Sürümler (Foundation, Advanced, Premium) farklı özellik setleri sunar.

## Kapsamımız

- Korunan iş yüklerinin envanteri (VM, fiziksel sunucu, iş istasyonu, NAS, M365, bulut)
- İş yükü türlerine göre instance tüketiminin hesaplanması
- Doğru sürüm seçimi (Foundation / Advanced / Premium)
- Mevcut soket bazlı lisanslardan VUL'a geçişin değerlendirilmesi
- Microsoft 365 yedeği için ayrı lisans ihtiyacının belirlenmesi
- Yenileme, büyüme ve production/support senaryoları
- Lisans kullanımının izlenmesi ve fazla/eksik tespiti

## Nasıl çalışıyoruz?

1. **Envanter** — Yedeklenen tüm iş yükleri ve türleri çıkarılır.
2. **Hesaplama** — Instance tüketimi hesaplanır, sürüm ihtiyacı belirlenir.
3. **Plan** — Yeni lisans ya da yenileme için doğru paket ve adet önerilir.
4. **Yönetim** — Kullanım izlenir, yenileme tarihinden önce ihtiyaç güncellenir.

## İlgili hizmetler

Yedekleme mimarisi ve immutable kopya kurgusu için [veri yedekleme çözümleri](/bulut-yedekleme/veri-yedekleme-cozumleri/); kesinti senaryoları için [felaket kurtarma](/bulut-yedekleme/felaket-kurtarma-disaster-recovery/).

## Kurumunuza kazandırdıkları

- İş yükü türüne göre doğru, fazlasız lisans adedi
- Sürüm seçiminin gerçek özellik ihtiyacına dayanması
- M365 yedeği gibi ayrı kalemlerin atlanmaması
- Yenileme öncesi net bir büyüme projeksiyonu

Veeam lisans ihtiyacınızı bir envanterle netleştirelim. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Eski soket bazlı lisansımız var, ne yapmalıyız?",
        answer:
          "Soket lisansları bir süre destekle taşınabilir ancak yeni satın alma ve genişlemeler VUL üzerinden yapılır. Envanterde geçiş maliyetini ve zamanlamasını birlikte planlarız.",
      },
      {
        question: "Microsoft 365 yedeği aynı lisansa dahil mi?",
        answer:
          "M365 iş yükleri de VUL instance'ı tüketir ancak kapsamı ayrı planlanır. Kullanıcı sayınıza göre gereken instance miktarını hesaplarız.",
      },
      {
        question: "Hangi sürümü almalıyız?",
        answer:
          "İhtiyacınıza bağlı. Temel yedekleme için Foundation; kurtarma orkestrasyonu, gelişmiş izleme ve güvenlik özellikleri gerekiyorsa Advanced veya Premium değerlendirilir.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "siber-guvenlik-urunleri-lisanslama",
    slug: "siber-guvenlik-urunleri-lisanslama",
    title: "Siber Güvenlik Ürünleri Lisanslama",
    metaDescription:
      "Güvenlik duvarı, EDR/XDR, e-posta güvenliği, DLP ve SIEM ürünleri için doğru lisans modeli, boyutlandırma ve yenileme yönetimiyle lisanslarınızı tek elden yönetin.",
    content: `Siber güvenlik ürünleri lisanslama hizmetimiz; güvenlik duvarından EDR'ye, e-posta güvenliğinden SIEM'e kadar farklı üreticilerin lisans modellerini tek elden yönetmenizi sağlar.

## Güvenlik lisanslamasının zorluğu

Her üreticinin farklı bir sayım birimi vardır: kullanıcı, uç nokta, korunan posta kutusu, throughput (Mbps), günlük log hacmi (EPS/GB). Abonelikler farklı tarihlerde biter, farklı özellik paketlerine ("bundle") ayrılır. Bu dağınıklık hem maliyet kaçağı hem de koruma boşluğu yaratır.

## Kapsamımız

- Mevcut güvenlik ürünleri envanteri ve yenileme takvimi
- Ürün bazında doğru sayım birimi ve boyutlandırma (kullanıcı, uç nokta, Mbps, GB/gün)
- Özellik paketi karşılaştırması ve ihtiyaç fazlası modüllerin ayıklanması
- Güvenlik duvarı yenileme (donanım + abonelik + destek) planlaması
- EDR/XDR, e-posta güvenliği, DLP, SIEM lisans ihtiyacının belirlenmesi
- Çok yıllı taahhüt ve büyüme senaryolarının maliyet karşılaştırması
- Yenileme öncesi erken uyarı ve konsolidasyon fırsatları

## Nasıl çalışıyoruz?

1. **Envanter** — Tüm güvenlik ürünleri, sürümleri, adetleri ve bitiş tarihleri çıkarılır.
2. **Analiz** — Fazla/eksik lisans, çakışan işlevler ve konsolidasyon fırsatları belirlenir.
3. **Plan** — Ürün bazında doğru paket, adet ve yenileme takvimi önerilir.
4. **Yönetim** — Yenileme tarihleri izlenir, değişiklikler önceden planlanır.

## İlgili hizmetler

Hangi kontrollere ihtiyaç olduğunu belirlemek için [siber güvenlik danışmanlığı](/siber-guvenlik/siber-guvenlik-danismanligi/); teknik kurulum için [EDR](/siber-guvenlik/edr-antivirus-cozumleri/), [firewall ve ağ güvenliği](/siber-guvenlik/firewall-ve-ag-guvenligi/) ve [SIEM ve log yönetimi](/siber-guvenlik/siem-ve-log-yonetimi/).

## Kurumunuza kazandırdıkları

- Tüm güvenlik lisanslarının tek bir takvimde toplanması
- Çakışan/atıl modüllerin ayıklanmasıyla maliyet düşüşü
- Yenileme kaçırıp korumasız kalma riskinin ortadan kalkması
- Boyutlandırmanın gerçek trafiğe/log hacmine dayanması

Güvenlik lisans envanterinizi birlikte çıkaralım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Farklı markaların lisanslarını siz mi yönetiyorsunuz?",
        answer:
          "Evet. Amaç, farklı üreticilerin yenileme ve boyutlandırmasını tek bir noktadan izlenebilir hâle getirmektir; her ürün için tedariki mevcut kanalınızdan ya da bizden yapabilirsiniz.",
      },
      {
        question: "SIEM lisansını nasıl boyutlandırıyorsunuz?",
        answer:
          "Genellikle günlük log hacmi (GB/gün) ya da saniyedeki olay sayısı (EPS) üzerinden. Mevcut kaynakların ürettiği hacmi ölçer, büyüme payı ekleyerek planlarız.",
      },
      {
        question: "Güvenlik duvarı yenilemesinde nelere dikkat etmeliyiz?",
        answer:
          "Donanımın kapasitesi (gelecek 3-5 yıl), abonelik paketinin kapsamı (IPS, AV, web filtreleme, sandbox) ve destek seviyesi birlikte değerlendirilmelidir; sadece cihaz fiyatı yanıltıcıdır.",
      },
    ],
  },
  {
    categorySlug: "lisanslama",
    serviceKey: "kurumsal-yazilim-lisanslama",
    slug: "kurumsal-yazilim-lisanslama",
    title: "Kurumsal Yazılım Lisanslama",
    metaDescription:
      "Tüm yazılım lisanslarınızın tek noktadan yönetimi: envanter, uyumluluk (SAM), yenileme takvimi ve maliyet optimizasyonu. BTM Bilişim ile lisans yönetimini düzene sokun.",
    content: `Kurumsal yazılım lisanslama hizmetimiz; kurumunuzun ihtiyaç duyduğu tüm yazılım lisanslarını (işletim sistemi, üretkenlik, sanallaştırma, yedekleme, güvenlik, veritabanı, tasarım ve sektörel uygulamalar) tek bir envanter ve takvim altında yönetmenizi sağlar.

## Dağınık lisans yönetiminin bedeli

Lisanslar farklı kişiler tarafından, farklı zamanlarda, farklı kanallardan alınır. Sonuçta kimse tam olarak "neyimiz var, ne zaman bitiyor, fazlamız var mı?" sorusuna cevap veremez. Bu belirsizlik hem gereksiz maliyet hem de denetim riskidir.

## Kapsamımız

- Tüm yazılım varlıklarının merkezi envanteri
- Yazılım varlık yönetimi (SAM) süreci ve sorumluluk tanımları
- Kullanım ile lisans karşılaştırması: fazla, eksik ve atıl lisans tespiti
- Tek bir yenileme takvimi ve erken uyarı sistemi
- Üretici denetimlerine (audit) hazırlık ve boşluk kapatma
- Çok yıllı sözleşme ve taahhüt senaryolarının maliyet analizi
- Bulut abonelikleriyle şirket içi lisansların birlikte yönetimi
- Yeni alım ve yenilemelerde tarafsız model önerisi

## Nasıl çalışıyoruz?

1. **Envanter** — Tüm lisanslar, adetleri, kanalları ve bitiş tarihleri toplanır.
2. **Uyumluluk analizi** — Kurulu/kullanılan ile sahip olunan karşılaştırılır.
3. **Optimizasyon** — Fazla lisanslar sadeleştirilir, eksikler kapatılır, yenileme planı çıkarılır.
4. **Sürekli yönetim** — Takvim izlenir, değişiklikler ve alımlar bu düzen içinde yürür.

## İlgili hizmetler

Ürün bazında derinlik için [Microsoft lisanslama](/lisanslama/microsoft-lisanslama/), [VMware lisanslama](/lisanslama/vmware-lisanslama/), [Veeam lisanslama](/lisanslama/veeam-lisanslama/) ve [siber güvenlik ürünleri lisanslama](/lisanslama/siber-guvenlik-urunleri-lisanslama/). Envanteri kalıcı takip için [Orbit](/yazilim-urunlerimiz/orbit/).

## Kurumunuza kazandırdıkları

- "Neyimiz var?" sorusuna anında cevap
- Yenileme tarihlerinin tek takvimde toplanması
- Atıl ve mükerrer lisansların maliyetten çıkması
- Üretici denetimlerine hazırlıklı, savunulabilir bir yapı

Lisans yönetiminizi düzene sokmak için bir envanter çalışmasıyla başlayalım. [İletişime geçin.](/iletisim/)`,
    faq: [
      {
        question: "Küçük bir kurumuz, bu hizmet bize göre mi?",
        answer:
          "Evet. Az sayıda üründe bile yenileme takibi ve uyumluluk kontrolü değerlidir; kapsam ölçeğe göre daralır ve genellikle tek bir envanter çalışması yeterli olur.",
      },
      {
        question: "Envanteri nasıl çıkarıyorsunuz?",
        answer:
          "Satın alma kayıtları, üretici portalları ve gerektiğinde bir keşif/discovery aracıyla. Kurulu yazılım ile sahip olunan lisans karşılaştırması bu verinin üzerine kurulur.",
      },
      {
        question: "Tedarikçimizi değiştirmemiz gerekir mi?",
        answer:
          "Hayır. Hizmet tarafsızdır; mevcut tedarikçilerinizle çalışmaya devam edebilirsiniz. Biz doğru model, uyumluluk ve yenileme yönetimi katmanını sağlarız.",
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

