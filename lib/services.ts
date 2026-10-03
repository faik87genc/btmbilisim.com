export type ServiceCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  intro: string;
  summary: string;
  services: { key: string; name: string; description: string }[];
  faq: { question: string; answer: string }[];
};

export const serviceCategoryList: ServiceCategory[] = [
  {
    slug: "danismanlik",
    title: "Kurumsal Danışmanlık Hizmetleri",
    shortTitle: "Danışmanlık",
    eyebrow: "01 — Danışmanlık",
    summary: "IT danışmanlığından ISO 27001 ve KVKK uyumuna, dijital dönüşümden hibe süreçlerine kadar yanınızdayız.",
    intro:
      "Tüm süreçlerimizin temelinde IT danışmanlığı var. Teknoloji, güvenlik, uyum ve finans tarafında kurumunuzun yanında duran sekiz uzmanlık alanı.",
    services: [
      {
        key: "it-danismanlik-hizmetleri",
        name: "IT Danışmanlık Hizmetleri",
        description:
          "Teknoloji yol haritası, altyapı ve siber güvenlik değerlendirmesi, sanal IT müdürü ve sözleşmeli IT desteği.",
      },
      {
        key: "finansal-ve-stratejik-danismanlik",
        name: "Finansal ve Stratejik Danışmanlık",
        description:
          "Nakit akışı yönetimi, bütçeleme ve stratejik planlama süreçlerinde uçtan uca danışmanlık.",
      },
      {
        key: "kosgeb-tubitak-hibe-tesvik-danismanligi",
        name: "KOSGEB, TÜBİTAK ve Hibe Teşvik Danışmanlığı",
        description:
          "KOSGEB ve TÜBİTAK destek programları ile yatırım teşvik başvurularında uçtan uca danışmanlık.",
      },
      {
        key: "proje-danismanligi",
        name: "Proje Danışmanlığı",
        description:
          "Kurumsal projelerin planlanması, kaynak yönetimi ve zamanında teslimi için metodolojik proje yönetimi.",
      },
      {
        key: "iso-27001-bilgi-guvenligi-danismanligi",
        name: "ISO 27001 Bilgi Güvenliği Danışmanlığı",
        description:
          "Bilgi güvenliği yönetim sistemi kurulumu, risk analizi ve sertifikasyon sürecine hazırlık.",
      },
      {
        key: "kvkk-danismanligi",
        name: "KVKK Danışmanlığı",
        description:
          "Kişisel veri envanteri çıkarma, aydınlatma metinleri hazırlama ve uyum süreçlerinin yönetimi.",
      },
      {
        key: "logo-erp-destek-ve-danismanlik",
        name: "Logo ERP Destek ve Danışmanlık",
        description:
          "Logo ERP sistemlerinde kurulum, entegrasyon, süreç optimizasyonu ve kullanıcı eğitimi.",
      },
      {
        key: "yazilim-ve-dijital-donusum-danismanligi",
        name: "Yazılım ve Dijital Dönüşüm Danışmanlığı",
        description:
          "Özel yazılım geliştirme ve dijital dönüşüm süreçlerinde teknik mimari danışmanlığı.",
      },
    ],
    faq: [
      {
        question: "Hangi danışmanlık hizmetlerini sunuyorsunuz?",
        answer:
          "Finansal ve stratejik danışmanlıktan KOSGEB/TÜBİTAK hibe ve teşvik danışmanlığına, proje yönetiminden ISO 27001 ve KVKK uyumluluğuna kadar sekiz farklı alanda hizmet veriyoruz. İhtiyacınıza göre tek bir hizmeti ya da birkaçını bir arada alabilirsiniz.",
      },
      {
        question: "Danışmanlık süreci nasıl işliyor?",
        answer:
          "İlk görüşmede ihtiyacınızı ve mevcut durumunuzu netleştiririz; ardından kapsamı belirleyip somut bir çalışma planı sunarız. Süreç boyunca ilgili uzmanlık ekibimiz sizinle birebir çalışır.",
      },
      {
        question: "ISO 27001 ve KVKK danışmanlığını ayrı ayrı mı almalıyız?",
        answer:
          "Hayır, ihtiyacınıza göre ayrı ayrı ya da birlikte sunulabilir. Çoğu kurum, bilgi güvenliği yönetim sistemi kurulumu ile KVKK uyum sürecini eş zamanlı yürütmeyi tercih eder.",
      },
    ],
  },
  {
    slug: "siber-guvenlik",
    title: "Siber Güvenlik Çözümleri",
    shortTitle: "Siber Güvenlik",
    eyebrow: "02 — Siber Güvenlik",
    summary: "Sızma testinden SIEM'e, kurumunuzu uçtan uca siber tehditlere karşı koruruz.",
    intro:
      "Sızma testinden güvenlik operasyon merkezi altyapısına kadar, kurumunuzu uçtan uca siber tehditlere karşı koruyan sekiz çözüm alanı.",
    services: [
      {
        key: "siber-guvenlik-danismanligi",
        name: "Siber Güvenlik Danışmanlığı",
        description:
          "Kurumunuzun güvenlik olgunluğunu değerlendirir, önceliklendirilmiş bir yol haritası çıkarırız.",
      },
      {
        key: "sizma-testi-penetrasyon-testi",
        name: "Sızma Testi (Penetrasyon Testi)",
        description:
          "Uygulama, ağ ve altyapı seviyesinde sızma testleri ile zafiyet tespiti ve raporlama.",
      },
      {
        key: "guvenlik-acigi-ve-zafiyet-analizi",
        name: "Güvenlik Açığı ve Zafiyet Analizi",
        description:
          "Sistemlerinizdeki zafiyetleri tarar, önceliklendirilmiş bulgu raporları sunarız.",
      },
      {
        key: "firewall-ve-ag-guvenligi",
        name: "Firewall ve Ağ Güvenliği",
        description:
          "Güvenlik duvarı yapılandırması ve ağ trafiğinin sürekli izlenmesi.",
      },
      {
        key: "edr-antivirus-cozumleri",
        name: "EDR / Antivirüs Çözümleri",
        description:
          "Uç nokta tehdit tespiti ve otomatik müdahale sağlayan koruma çözümleri.",
      },
      {
        key: "dlp-veri-kaybi-onleme-cozumleri",
        name: "DLP – Veri Kaybı Önleme Çözümleri",
        description:
          "Hassas verinizin kurum dışına sızmasını engelleyen politika ve izleme sistemleri.",
      },
      {
        key: "siem-ve-log-yonetimi",
        name: "SIEM ve Log Yönetimi",
        description:
          "Güvenlik olaylarının merkezi toplanması, korelasyonu ve raporlanması.",
      },
      {
        key: "iso-27001-teknik-guvenlik-cozumleri",
        name: "ISO 27001 Teknik Güvenlik Çözümleri",
        description:
          "ISO 27001 uyumluluğu için gerekli teknik kontrollerin kurulumu ve yönetimi.",
      },
    ],
    faq: [
      {
        question: "Sızma testi ne sıklıkla yapılmalı?",
        answer:
          "Genel kabul gören yaklaşım, kritik sistemler için yılda en az bir kez, önemli bir altyapı değişikliği sonrasında ise ayrıca sızma testi yapılmasıdır. Kurumunuzun risk profiline göre bu sıklığı birlikte belirleriz.",
      },
      {
        question: "SIEM ve log yönetimi neden önemli?",
        answer:
          "Güvenlik olaylarını merkezi olarak toplayıp korele etmek, bir saldırıyı erken aşamada fark etmenizi sağlar. SIEM altyapısı hem günlük izleme hem de denetim/uyum süreçleri için kayıt tutar.",
      },
      {
        question: "Mevcut güvenlik altyapımızı değiştirmeden sizinle çalışabilir miyiz?",
        answer:
          "Evet, mevcut firewall, EDR veya SIEM yatırımlarınızı değerlendirip üzerine inşa ederiz; sıfırdan değişim şart değildir.",
      },
    ],
  },
  {
    slug: "sistem-network",
    title: "Sistem & Network Çözümleri",
    shortTitle: "Sistem & Network",
    eyebrow: "03 — Sistem & Network",
    summary: "Ağ altyapınızdan sunucularınıza kadar operasyonunuzun temelini kurar ve yönetiriz.",
    intro:
      "Ağ altyapısından sunucu ve veri merkezi yönetimine kadar, teknoloji operasyonunuzun temelini oluşturan on çözüm alanı.",
    services: [
      {
        key: "sistem-ve-network-danismanligi",
        name: "Sistem ve Network Danışmanlığı",
        description:
          "Altyapınızın mevcut durumunu analiz eder, büyümeye uygun mimari öneririz.",
      },
      {
        key: "ag-altyapisi-kurulum-ve-yonetimi",
        name: "Ağ Altyapısı Kurulum ve Yönetimi",
        description:
          "Kurumsal ağ altyapısının kurulumu, yapılandırılması ve sürekli yönetimi.",
      },
      {
        key: "sunucu-kurulum-ve-yonetimi",
        name: "Sunucu Kurulum ve Yönetimi",
        description:
          "Fiziksel ve sanal sunucu altyapısının kurulumu ve işletilmesi.",
      },
      {
        key: "veri-merkezi-cozumleri",
        name: "Veri Merkezi Çözümleri",
        description:
          "Veri merkezi tasarımı, kapasite planlaması ve işletme danışmanlığı.",
      },
      {
        key: "sanallastirma-cozumleri",
        name: "Sanallaştırma Çözümleri",
        description:
          "Sunucu ve masaüstü sanallaştırma altyapısının kurulumu ve yönetimi.",
      },
      {
        key: "wifi-ve-kablosuz-ag-cozumleri",
        name: "Wi-Fi ve Kablosuz Ağ Çözümleri",
        description:
          "Kurumsal kablosuz ağ planlaması, kurulumu ve güvenliği.",
      },
      {
        key: "ip-kamera-guvenlik-kamerasi-sistemleri",
        name: "IP Kamera ve Güvenlik Kamerası Sistemleri",
        description:
          "Fabrika, depo, işyeri ve siteler için IP kamera projelendirme, kurulum, kayıt ve uzaktan izleme.",
      },
      {
        key: "firewall-ve-vpn-cozumleri",
        name: "Firewall ve VPN Çözümleri",
        description:
          "Güvenlik duvarı ve uzaktan erişim (VPN) altyapısının kurulumu.",
      },
      {
        key: "sistem-entegrasyonu",
        name: "Sistem Entegrasyonu",
        description:
          "Farklı sistemlerinizin birbiriyle sorunsuz çalışmasını sağlayan entegrasyon projeleri.",
      },
      {
        key: "it-bakim-ve-destek-hizmetleri",
        name: "IT Bakım ve Destek Hizmetleri",
        description:
          "Altyapınız için sürekli izleme, bakım ve teknik destek hizmeti.",
      },
    ],
    faq: [
      {
        question: "Sunucu altyapımızı bulutla mı yoksa yerinde mi yönetmeliyiz?",
        answer:
          "Bu, veri hassasiyetinize, maliyet yapınıza ve büyüme planınıza bağlı. Sistem ve network danışmanlığı kapsamında mevcut altyapınızı analiz edip size uygun mimariyi öneririz.",
      },
      {
        question: "IT bakım ve destek hizmeti hangi sıklıkla sağlanıyor?",
        answer:
          "Sürekli izleme ve düzenli bakım standart hizmetimizin parçasıdır; kritik arızalarda hızlı müdahale sağlıyoruz. Destek kapsamı ve yanıt süreleri ihtiyacınıza göre netleştirilir.",
      },
      {
        question: "Sanallaştırma altyapısına geçiş operasyonumuzu etkiler mi?",
        answer:
          "Geçiş süreci kesintiyi en aza indirecek şekilde planlanır; kritik sistemler için genellikle mesai dışı saatlerde veya kademeli olarak uygulanır.",
      },
    ],
  },
  {
    slug: "bulut-yedekleme",
    title: "Bulut, Yedekleme & İş Sürekliliği",
    shortTitle: "Bulut & Yedekleme",
    eyebrow: "04 — Bulut & İş Sürekliliği",
    summary: "Microsoft 365'ten felaket kurtarmaya, verinizin ve operasyonunuzun sürekliliğini sağlarız.",
    intro:
      "Bulut geçişinden felaket kurtarmaya kadar, verinizin ve operasyonunuzun sürekliliğini garanti altına alan sekiz çözüm alanı.",
    services: [
      {
        key: "bulut-cozumleri",
        name: "Bulut Çözümleri",
        description:
          "İhtiyacınıza uygun bulut mimarisinin planlanması ve geçiş sürecinin yönetimi.",
      },
      {
        key: "microsoft-365-cozumleri",
        name: "Microsoft 365 Çözümleri",
        description:
          "Microsoft 365 kurulumu, lisans yönetimi ve güvenlik yapılandırması.",
      },
      {
        key: "microsoft-azure-cozumleri",
        name: "Microsoft Azure Çözümleri",
        description:
          "Azure altyapı kurulumu, maliyet optimizasyonu ve yönetimi.",
      },
      {
        key: "aws-bulut-cozumleri",
        name: "AWS Bulut Çözümleri",
        description:
          "AWS üzerinde altyapı kurulumu, mimari tasarım ve yönetim.",
      },
      {
        key: "veri-yedekleme-cozumleri",
        name: "Veri Yedekleme Çözümleri",
        description:
          "Otomatik, düzenli ve doğrulanabilir yedekleme sistemlerinin kurulumu.",
      },
      {
        key: "felaket-kurtarma-disaster-recovery",
        name: "Felaket Kurtarma (Disaster Recovery)",
        description:
          "Kesinti senaryolarına karşı felaket kurtarma planı ve altyapısının kurulumu.",
      },
      {
        key: "is-surekliligi-cozumleri",
        name: "İş Sürekliliği Çözümleri",
        description:
          "Operasyonlarınızın kesintisiz devam etmesi için süreç ve altyapı planlaması.",
      },
      {
        key: "veri-kurtarma-hizmetleri",
        name: "Veri Kurtarma Hizmetleri",
        description:
          "Kayıp veya bozulmuş verilerin kurtarılması için teknik müdahale.",
      },
    ],
    faq: [
      {
        question: "Hangi bulut platformlarıyla çalışıyorsunuz?",
        answer:
          "Microsoft Azure, AWS ve Microsoft 365 üzerinde kurulum, geçiş ve yönetim hizmeti veriyoruz. İhtiyacınıza uygun platformu birlikte değerlendiririz.",
      },
      {
        question: "Yedekleme sistemimiz gerçekten çalışıyor mu, nasıl emin oluruz?",
        answer:
          "Düzenli, doğrulanabilir yedekleme kurguluyoruz; yani yedekler yalnızca alınmakla kalmaz, geri yükleme testleriyle çalışırlığı periyodik olarak kontrol edilir.",
      },
      {
        question: "Felaket kurtarma planı olmadan iş sürekliliği sağlanabilir mi?",
        answer:
          "Kısmen sağlanabilir, ancak ciddi bir kesinti senaryosunda geri dönüş süreniz uzar. Felaket kurtarma planı bu süreyi öngörülebilir ve kısa tutmanın temel yoludur.",
      },
    ],
  },
  {
    slug: "yazilim-dijital",
    title: "Yazılım & Dijital Çözümler",
    shortTitle: "Yazılım & Dijital",
    eyebrow: "05 — Yazılım & Dijital",
    summary: "Özel yazılımdan iş süreci otomasyonuna, ihtiyacınıza özel dijital çözümler geliştiririz.",
    intro:
      "Özel yazılım geliştirmeden iş süreci otomasyonuna kadar, ihtiyacınıza özel yedi dijital çözüm alanı.",
    services: [
      {
        key: "ozel-yazilim-gelistirme",
        name: "Özel Yazılım Geliştirme",
        description: "İhtiyacınıza özel, uçtan uca yazılım geliştirme.",
      },
      {
        key: "web-uygulama-gelistirme",
        name: "Web Uygulama Geliştirme",
        description: "Kurumsal ihtiyaçlara özel web tabanlı uygulamalar.",
      },
      {
        key: "web-tasarim-ve-kurumsal-web-sitesi",
        name: "Web Tasarım ve Kurumsal Web Sitesi",
        description:
          "Kurumsal kimliğinize uygun, performanslı web sitesi tasarımı ve geliştirmesi.",
      },
      {
        key: "api-ve-sistem-entegrasyonlari",
        name: "API ve Sistem Entegrasyonları",
        description:
          "Farklı sistemleriniz arasında güvenli veri akışı sağlayan API entegrasyonları.",
      },
      {
        key: "erp-entegrasyonlari",
        name: "ERP Entegrasyonları",
        description: "ERP sisteminizi diğer iş uygulamalarınızla entegre ediyoruz.",
      },
      {
        key: "is-sureci-otomasyonlari",
        name: "İş Süreci Otomasyonları",
        description:
          "Tekrarlayan iş süreçlerini otomatikleştirerek verimliliği artırıyoruz.",
      },
      {
        key: "raporlama-ve-dashboard-cozumleri",
        name: "Raporlama ve Dashboard Çözümleri",
        description:
          "Yönetim kararlarını destekleyen gerçek zamanlı raporlama panoları.",
      },
    ],
    faq: [
      {
        question: "Özel yazılım geliştirme ne kadar sürer?",
        answer:
          "Kapsam ve entegrasyon ihtiyacına göre değişir; ilk görüşmede gereksinimlerinizi netleştirip gerçekçi bir zaman çizelgesi sunarız.",
      },
      {
        question: "Mevcut ERP sistemimizle entegrasyon mümkün mü?",
        answer:
          "Evet, API ve sistem entegrasyonu hizmetimiz kapsamında mevcut ERP'nizle (SAP, Oracle, LOGO, Mikro ve diğerleri) veri akışı kurabiliriz.",
      },
      {
        question: "İş süreci otomasyonu hangi süreçler için uygundur?",
        answer:
          "Tekrarlayan, kural bazlı ve manuel emek gerektiren süreçler (onay akışları, veri aktarımı, raporlama gibi) otomasyona en uygun olanlardır.",
      },
    ],
  },
  {
    slug: "lisanslama",
    title: "Lisanslama & Kurumsal Çözümler",
    shortTitle: "Lisanslama",
    eyebrow: "06 — Lisanslama",
    summary: "Microsoft'tan Veeam'e, kurumsal lisanslarınızı tek noktadan tedarik eder ve yönetiriz.",
    intro:
      "Microsoft'tan güvenlik ürünlerine kadar, kurumunuzun ihtiyaç duyduğu tüm yazılım lisanslarını tek noktadan tedarik eder ve yönetiriz.",
    services: [
      {
        key: "microsoft-lisanslama",
        name: "Microsoft Lisanslama",
        description:
          "Microsoft ürünleri için uygun lisans modelinin belirlenmesi ve tedariki.",
      },
      {
        key: "microsoft-365-lisanslama",
        name: "Microsoft 365 Lisanslama",
        description: "İşletmenize uygun Microsoft 365 plan ve lisans yönetimi.",
      },
      {
        key: "windows-server-sql-server-lisanslama",
        name: "Windows Server & SQL Server Lisanslama",
        description:
          "Sunucu ve veritabanı lisanslarının doğru modelde tedariki.",
      },
      {
        key: "vmware-lisanslama",
        name: "VMware Lisanslama",
        description: "Sanallaştırma altyapınız için VMware lisans tedariki ve yönetimi.",
      },
      {
        key: "veeam-lisanslama",
        name: "Veeam Lisanslama",
        description: "Yedekleme ve kurtarma altyapınız için Veeam lisans tedariki.",
      },
      {
        key: "siber-guvenlik-urunleri-lisanslama",
        name: "Siber Güvenlik Ürünleri Lisanslama",
        description:
          "Güvenlik yazılımlarınız için doğru lisans modelinin belirlenmesi.",
      },
      {
        key: "kurumsal-yazilim-lisanslama",
        name: "Kurumsal Yazılım Lisanslama",
        description:
          "Kurumunuzun ihtiyaç duyduğu tüm yazılım lisanslarının tek noktadan yönetimi.",
      },
    ],
    faq: [
      {
        question: "Lisans tedarikini sadece sizin üzerinizden mi yapmalıyız?",
        answer:
          "Hayır, mevcut tedarikçinizle çalışmaya devam edebilirsiniz; biz doğru lisans modelini belirleme ve yönetim danışmanlığı sunuyoruz.",
      },
      {
        question: "Microsoft 365 lisans planları arasında nasıl karar veririz?",
        answer:
          "Kullanıcı sayınız, ihtiyaç duyduğunuz uygulamalar (Teams, SharePoint, güvenlik özellikleri vb.) ve bütçenize göre en uygun planı birlikte belirleriz.",
      },
      {
        question: "VMware veya Veeam lisanslarımızın yenileme takibini siz mi yapıyorsunuz?",
        answer:
          "Evet, kurumsal yazılım lisanslama hizmetimiz kapsamında yenileme tarihlerini takip eder, süresi dolmadan önce sizi bilgilendiririz.",
      },
    ],
  },
];

export const serviceCategories: Record<string, ServiceCategory> =
  Object.fromEntries(serviceCategoryList.map((c) => [c.slug, c]));
