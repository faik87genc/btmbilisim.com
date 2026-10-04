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
    summary: "IT danışmanlığı, ISO 27001 ve KVKK uyumu, Logo ERP ve dijital dönüşüm için tek muhatap.",
    intro:
      "Önce ihtiyacı ve riski netleştirir, sonra doğru adımı birlikte seçeriz. IT danışmanlığından bilgi güvenliği ve kişisel veri uyumuna, ERP'den dijital dönüşüme kadar beş alanda kurumunuza eşlik ediyoruz.",
    services: [
      {
        key: "it-danismanlik-hizmetleri",
        name: "IT Danışmanlık Hizmetleri",
        description:
          "Teknoloji yol haritası, altyapı ve siber güvenlik değerlendirmesi, sanal IT müdürü ve sözleşmeli IT desteği.",
      },
      {
        key: "iso-27001-bilgi-guvenligi-danismanligi",
        name: "ISO 27001 Bilgi Güvenliği Danışmanlığı",
        description:
          "Bilgi güvenliği yönetim sisteminin kurulması, risk değerlendirmesi ve belgelendirme denetimine hazırlık.",
      },
      {
        key: "kvkk-danismanligi",
        name: "KVKK Danışmanlığı",
        description:
          "Veri envanteri, aydınlatma ve rıza metinleri, VERBİS ve teknik tedbirlerle KVKK uyumu.",
      },
      {
        key: "logo-erp-destek-ve-danismanlik",
        name: "Logo ERP Destek ve Danışmanlık",
        description:
          "Logo Tiger, GO ve j-Platform'da kurulum, sürüm geçişi, entegrasyon ve kullanıcı eğitimi.",
      },
      {
        key: "yazilim-ve-dijital-donusum-danismanligi",
        name: "Yazılım ve Dijital Dönüşüm Danışmanlığı",
        description:
          "Hangi süreç dijitalleşmeli, hangi yazılım seçilmeli: tarafsız analiz ve teknik yol haritası.",
      },
    ],
    faq: [
      {
        question: "Danışmanlık alanlarınız neler?",
        answer:
          "IT danışmanlığı, ISO 27001 bilgi güvenliği danışmanlığı, KVKK danışmanlığı, Logo ERP destek ve danışmanlığı ile yazılım ve dijital dönüşüm danışmanlığı veriyoruz. Bunları tek tek ya da birlikte planlayabilirsiniz.",
      },
      {
        question: "Bir danışmanlık çalışması nasıl başlar?",
        answer:
          "Ücretsiz bir ön görüşmeyle mevcut durumunuzu ve beklentinizi dinleriz. Ardından kapsamı, takvimi ve çıktıları yazılı olarak netleştirip çalışmaya başlarız.",
      },
      {
        question: "ISO 27001 ve KVKK'yı birlikte ele almak mantıklı mı?",
        answer:
          "Çoğu kurum için evet. İki çerçeve de erişim yönetimi, kayıt tutma ve risk değerlendirmesi gibi ortak kontroller ister; birlikte planlandığında aynı iş iki kez yapılmaz.",
      },
    ],
  },
  {
    slug: "siber-guvenlik",
    title: "Siber Güvenlik Çözümleri",
    shortTitle: "Siber Güvenlik",
    eyebrow: "02 — Siber Güvenlik",
    summary: "Sızma testinden 5651 log yönetimine, saldırganın göreceği açıkları önce biz buluruz.",
    intro:
      "Saldırgan gözüyle test eder, bulduğumuzu önceliklendirir ve kapatırız. Sızma testi, zafiyet taraması, firewall, EDR, DLP ve SIEM dahil sekiz alanda ürün bağımsız güvenlik çözümleri sunuyoruz.",
    services: [
      {
        key: "siber-guvenlik-danismanligi",
        name: "Siber Güvenlik Danışmanlığı",
        description:
          "Güvenlik olgunluğunuzu ölçer, risklere göre sıralanmış ve bütçelenmiş bir iyileştirme planı çıkarırız.",
      },
      {
        key: "sizma-testi-penetrasyon-testi",
        name: "Sızma Testi (Penetrasyon Testi)",
        description:
          "Dış ağ, iç ağ, web uygulaması ve Active Directory testleri; doğrulanmış bulgular ve kapatma önerileri.",
      },
      {
        key: "guvenlik-acigi-ve-zafiyet-analizi",
        name: "Zafiyet Taraması ve Güvenlik Açığı Analizi",
        description:
          "Düzenli otomatik taramalar ve uzman doğrulamasıyla yamalanmamış açıkların görünür hale gelmesi.",
      },
      {
        key: "firewall-ve-ag-guvenligi",
        name: "Firewall ve Ağ Güvenliği",
        description:
          "Yeni nesil güvenlik duvarı, kural sadeleştirme, ağ segmentasyonu ve trafik izleme.",
      },
      {
        key: "edr-antivirus-cozumleri",
        name: "Kurumsal Antivirüs ve EDR Çözümleri",
        description:
          "Fidye yazılımına karşı davranış tabanlı uç nokta koruması ve merkezi yönetim.",
      },
      {
        key: "dlp-veri-kaybi-onleme-cozumleri",
        name: "DLP – Veri Kaybı Önleme Çözümleri",
        description:
          "E-posta, USB, bulut ve web üzerinden hassas veri çıkışını sınıflandırma ve politikayla durdurma.",
      },
      {
        key: "siem-ve-log-yonetimi",
        name: "SIEM ve 5651 Log Yönetimi",
        description:
          "Logların merkezde toplanması, olay korelasyonu, alarm ve 5651 uyumlu saklama.",
      },
      {
        key: "iso-27001-teknik-guvenlik-cozumleri",
        name: "ISO 27001 Teknik Güvenlik Çözümleri",
        description:
          "Standardın teknik kontrollerinin (erişim, şifreleme, kayıt, yedek) altyapıya uygulanması.",
      },
    ],
    faq: [
      {
        question: "Hangi sıklıkla sızma testi yaptırmalıyız?",
        answer:
          "Yılda en az bir kez ve her önemli değişiklikten sonra öneriyoruz: yeni bir uygulamayı yayına almak, altyapı taşımak ya da ağ yapısını değiştirmek gibi. Denetim veya müşteri şartı varsa sıklık ona göre belirlenir.",
      },
      {
        question: "Log yönetimine neden ihtiyacımız var?",
        answer:
          "Kayıtlar merkezde toplanıp ilişkilendirilmezse bir saldırı genellikle iş işten geçtikten sonra fark edilir. Ayrıca 5651 sayılı Kanun ve ISO 27001 belirli kayıtların saklanmasını zorunlu tutar.",
      },
      {
        question: "Kullandığımız güvenlik ürünlerini değiştirmemiz gerekir mi?",
        answer:
          "Hayır. Önce mevcut ürünlerinizi doğru yapılandırıp verimli kullanmanızı sağlarız. Yenisini yalnızca gerçek bir açığı kapatmak için ve gerekçesiyle öneririz.",
      },
    ],
  },
  {
    slug: "sistem-network",
    title: "Sistem & Network Çözümleri",
    shortTitle: "Sistem & Network",
    eyebrow: "03 — Sistem & Network",
    summary: "Ağ, sunucu, sanallaştırma, Wi-Fi ve kamera altyapısını kurar, 7/24 ayakta tutarız.",
    intro:
      "İşinizin üzerinde durduğu altyapıyı projelendirir, kurar ve izleriz. Kablolamadan sunucuya, sanallaştırmadan kurumsal Wi-Fi ve IP kameraya kadar on alanda yerinde ve uzaktan hizmet veriyoruz.",
    services: [
      {
        key: "sistem-ve-network-danismanligi",
        name: "Sistem ve Network Danışmanlığı",
        description:
          "Mevcut altyapının sağlık kontrolü ve büyümeyi taşıyacak mimarinin birlikte planlanması.",
      },
      {
        key: "ag-altyapisi-kurulum-ve-yonetimi",
        name: "Network (Ağ) Altyapısı Kurulumu ve Yönetimi",
        description:
          "Yapısal kablolama, switch, VLAN ve şubeler arası bağlantının kurulumu ve izlenmesi.",
      },
      {
        key: "sunucu-kurulum-ve-yonetimi",
        name: "Sunucu Kurulumu ve Yönetimi",
        description:
          "Fiziksel ve sanal sunucuların kurulumu, güncellemesi, yedeği ve performans takibi.",
      },
      {
        key: "veri-merkezi-cozumleri",
        name: "Veri Merkezi Çözümleri",
        description:
          "Sistem odası tasarımı, kabinet düzeni, enerji ve soğutma planlaması.",
      },
      {
        key: "sanallastirma-cozumleri",
        name: "Sanallaştırma Çözümleri",
        description:
          "VMware, Hyper-V veya Proxmox ile sunucu sayısını azaltan, esnek sanal altyapı.",
      },
      {
        key: "wifi-ve-kablosuz-ag-cozumleri",
        name: "Wi-Fi ve Kablosuz Ağ Çözümleri",
        description:
          "Kapsama ölçümü, erişim noktası planı, misafir ağı ve kimlik doğrulamalı kablosuz erişim.",
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
          "Şubeler ve uzaktan çalışanlar için çok faktörlü, kayıt altında güvenli bağlantı.",
      },
      {
        key: "sistem-entegrasyonu",
        name: "Sistem Entegrasyonu",
        description:
          "Ağ, sunucu, yazılım ve güvenlik bileşenlerinin tek bir bütün olarak çalışması.",
      },
      {
        key: "it-bakim-ve-destek-hizmetleri",
        name: "IT Destek ve Bakım Hizmetleri",
        description:
          "Sözleşmeli periyodik bakım, uzaktan izleme ve 7/24 arıza müdahalesi.",
      },
    ],
    faq: [
      {
        question: "Sunucularımızı yerinde mi tutmalıyız, buluta mı taşımalıyız?",
        answer:
          "Uygulamalarınıza, veri hassasiyetine ve maliyet beklentinize bağlı. Çoğu işletme için en iyi sonuç ikisinin karışımıdır; değerlendirmeyi yapıp hangi sistemin nerede kalacağını gerekçesiyle öneririz.",
      },
      {
        question: "Bakım sözleşmesinde neler var?",
        answer:
          "Düzenli kontrol ve güncellemeler, uzaktan izleme, yedeklerin doğrulanması ve arıza anında öncelikli müdahale. Kapsamı kullanıcı ve sistem sayınıza göre birlikte belirleriz.",
      },
      {
        question: "Sanallaştırmaya geçerken işler durur mu?",
        answer:
          "Geçişi planlı yapar, kritik sistemleri mesai dışında taşırız. Her adım için bir geri dönüş planı hazırlanır; kullanıcılar çoğu zaman değişikliği fark etmez.",
      },
    ],
  },
  {
    slug: "bulut-yedekleme",
    title: "Bulut, Yedekleme & İş Sürekliliği",
    shortTitle: "Bulut & Yedekleme",
    eyebrow: "04 — Bulut & İş Sürekliliği",
    summary: "Microsoft 365, Azure ve AWS'den 3-2-1 yedeklemeye, verinizi kayba karşı koruruz.",
    intro:
      "Verinizin nerede durduğu kadar, bir arızada ne kadar sürede geri geldiği de önemli. Bulut geçişi, yedekleme, felaket kurtarma ve veri kurtarma dahil sekiz alanda sürekliliği birlikte planlıyoruz.",
    services: [
      {
        key: "bulut-cozumleri",
        name: "Bulut Bilişim Çözümleri",
        description:
          "Hangi iş yükünün buluta uygun olduğunun belirlenmesi ve planlı, kesintisiz geçiş.",
      },
      {
        key: "microsoft-365-cozumleri",
        name: "Microsoft 365 Çözümleri",
        description:
          "E-posta ve Teams geçişi, cihaz yönetimi, güvenlik ayarları ve kullanıcı eğitimi.",
      },
      {
        key: "microsoft-azure-cozumleri",
        name: "Microsoft Azure Çözümleri",
        description:
          "Azure'da sanal sunucu, ağ ve yedek kurulumu; aylık maliyetin kontrol altında tutulması.",
      },
      {
        key: "aws-bulut-cozumleri",
        name: "AWS Bulut Çözümleri",
        description:
          "AWS'de güvenli mimari, hesap yapısı, yedekleme ve maliyet takibi.",
      },
      {
        key: "veri-yedekleme-cozumleri",
        name: "Veri Yedekleme (Backup) Çözümleri",
        description:
          "Şifreli, otomatik ve geri yükleme testi yapılan 3-2-1 yedekleme düzeni.",
      },
      {
        key: "felaket-kurtarma-disaster-recovery",
        name: "Felaket Kurtarma (Disaster Recovery)",
        description:
          "Kritik sistemler için hedef dönüş süresi, ikinci lokasyon ve tatbikatlı kurtarma planı.",
      },
      {
        key: "is-surekliligi-cozumleri",
        name: "İş Sürekliliği Çözümleri",
        description:
          "Kesinti anında kimin ne yapacağını ve hangi sistemin önce döneceğini belirleyen plan.",
      },
      {
        key: "veri-kurtarma-hizmetleri",
        name: "Veri Kurtarma Hizmetleri",
        description:
          "Arızalı disk, bozulan RAID veya silinen dosyalar için kontrollü kurtarma çalışması.",
      },
    ],
    faq: [
      {
        question: "Hangi bulut ortamlarında çalışıyorsunuz?",
        answer:
          "Microsoft 365, Microsoft Azure ve AWS ile çalışıyoruz. Platformu işinize, mevcut lisanslarınıza ve bütçenize göre birlikte seçeriz.",
      },
      {
        question: "Yedeklerimizin işe yaradığından nasıl emin olabiliriz?",
        answer:
          "Yedeği almak yetmez, geri yüklemeyi düzenli olarak denemek gerekir. Kurduğumuz yapılarda periyodik geri yükleme testleri yapar ve sonuçlarını raporlarız.",
      },
      {
        question: "Küçük bir işletmenin de felaket kurtarma planına ihtiyacı var mı?",
        answer:
          "Evet, ölçeği küçük olsa da. Hangi verinin ne kadar sürede geri gelmesi gerektiğini bilen sade bir plan, bir fidye yazılımı ya da donanım arızasında günlerce sürecek bir duruşu saatlere indirebilir.",
      },
    ],
  },
  {
    slug: "yazilim-dijital",
    title: "Yazılım & Dijital Çözümler",
    shortTitle: "Yazılım & Dijital",
    eyebrow: "05 — Yazılım & Dijital",
    summary: "Kendi yazılım ekibimizle özel yazılım, web, entegrasyon ve otomasyon geliştiririz.",
    intro:
      "Hazır paketlerin karşılamadığı ihtiyaçları kendi yazılım ekibimizle koda döküyoruz. Özel yazılımdan kurumsal web sitesine, ERP entegrasyonundan raporlama panolarına kadar yedi alanda geliştirme yapıyoruz.",
    services: [
      {
        key: "ozel-yazilim-gelistirme",
        name: "Özel Yazılım Geliştirme",
        description: "İş akışınıza göre tasarlanan, güvenli ve bakımı kolay kurumsal yazılımlar.",
      },
      {
        key: "web-uygulama-gelistirme",
        name: "Web Uygulama Geliştirme",
        description: "Tarayıcıdan çalışan portallar, müşteri ve bayi panelleri, iç süreç uygulamaları.",
      },
      {
        key: "web-tasarim-ve-kurumsal-web-sitesi",
        name: "Kurumsal Web Tasarım",
        description:
          "Mobil öncelikli, hızlı ve arama motoru dostu kurumsal web siteleri.",
      },
      {
        key: "api-ve-sistem-entegrasyonlari",
        name: "API ve Sistem Entegrasyonları",
        description:
          "Uygulamalar arasında elle veri taşımayı bitiren, kayıt altında API bağlantıları.",
      },
      {
        key: "erp-entegrasyonlari",
        name: "ERP Entegrasyonları",
        description: "ERP'nizin e-ticaret, CRM, banka ve e-fatura sistemleriyle otomatik konuşması.",
      },
      {
        key: "is-sureci-otomasyonlari",
        name: "İş Süreci Otomasyonları",
        description:
          "Onay, bildirim ve veri aktarımı gibi tekrar eden işlerin otomatik akışa dönmesi.",
      },
      {
        key: "raporlama-ve-dashboard-cozumleri",
        name: "Raporlama ve Dashboard Çözümleri",
        description:
          "Dağınık verinin tek ekranda toplandığı, yönetime hazır gösterge panoları.",
      },
    ],
    faq: [
      {
        question: "Bir özel yazılım projesi ne kadar sürer?",
        answer:
          "Kapsama göre değişir. İhtiyaç analiziyle ilk sürümün kapsamını küçük tutar, kullanılabilir bir versiyonu erken teslim eder ve sonraki özellikleri aşamalı ekleriz; takvimi analizden sonra netleştiririz.",
      },
      {
        question: "Kullandığımız ERP ile entegrasyon yapılabilir mi?",
        answer:
          "Çoğu ERP'nin API'si ya da veri aktarım yöntemi vardır. Logo başta olmak üzere mevcut sisteminizi inceleyip en güvenli ve sürdürülebilir entegrasyon yolunu öneririz.",
      },
      {
        question: "Hangi işler otomasyona uygun?",
        answer:
          "Kurala bağlı, sık tekrarlanan ve hata yapılmaya açık işler: onay akışları, sistemler arası veri aktarımı, düzenli raporlar ve bildirimler. Önce süreci birlikte çizer, otomasyonun gerçekten kazanç sağlayacağı yerden başlarız.",
      },
    ],
  },
  {
    slug: "lisanslama",
    title: "Lisanslama & Kurumsal Çözümler",
    shortTitle: "Lisanslama",
    eyebrow: "06 — Lisanslama",
    summary: "Microsoft, VMware, Veeam ve güvenlik ürünlerinde doğru lisans, doğru fiyat, zamanında yenileme.",
    intro:
      "Eksik lisans yasal risk, fazla lisans gereksiz maliyet demek. Microsoft'tan sanallaştırma ve yedeklemeye, güvenlik ürünlerinden kurumsal yazılımlara kadar lisanslarınızı ihtiyaca göre boyutlandırıp yenilemelerini takip ediyoruz.",
    services: [
      {
        key: "microsoft-lisanslama",
        name: "Microsoft Lisanslama",
        description:
          "Windows, Office ve sunucu ürünlerinde kullanıma uygun Microsoft lisans modelinin seçilmesi.",
      },
      {
        key: "microsoft-365-lisanslama",
        name: "Microsoft 365 Lisanslama",
        description: "Business ve Enterprise planlarının kullanıcı ihtiyacına göre karşılaştırılması ve tedariki.",
      },
      {
        key: "windows-server-sql-server-lisanslama",
        name: "Windows Server & SQL Server Lisanslama",
        description:
          "Çekirdek ve CAL hesaplamasıyla sunucu ve veritabanı lisanslarının doğru boyutlandırılması.",
      },
      {
        key: "vmware-lisanslama",
        name: "VMware Lisanslama",
        description: "Yeni abonelik modelinde VMware lisans planlaması, yenileme ve alternatif değerlendirmesi.",
      },
      {
        key: "veeam-lisanslama",
        name: "Veeam Lisanslama",
        description: "Korunan sunucu ve iş yükü sayısına göre Veeam yedekleme lisanslarının seçimi.",
      },
      {
        key: "siber-guvenlik-urunleri-lisanslama",
        name: "Siber Güvenlik Ürünleri Lisanslama",
        description:
          "Firewall, EDR, e-posta güvenliği ve SIEM ürünlerinde lisans boyutlandırma ve yenileme.",
      },
      {
        key: "kurumsal-yazilim-lisanslama",
        name: "Kurumsal Yazılım Lisanslama",
        description:
          "Tüm yazılım lisanslarınızın envanteri, yenileme takvimi ve tek noktadan tedariki.",
      },
    ],
    faq: [
      {
        question: "Bütün lisanslarımızı sizden almak zorunda mıyız?",
        answer:
          "Hayır. Mevcut tedarikçilerinizle çalışmaya devam ederken lisans envanterinizi ve yenileme takviminizi biz de takip edebiliriz. Tek noktadan tedarik ise yönetimi ve maliyet kontrolünü kolaylaştırır.",
      },
      {
        question: "Microsoft 365'te hangi plan bize uygun?",
        answer:
          "Kullanıcıların masaüstü Office'e, gelişmiş güvenliğe veya cihaz yönetimine ihtiyacı olup olmadığına bakarız. Herkese aynı planı almak yerine kullanıcı gruplarına göre karışık plan önermek çoğu zaman daha ekonomiktir.",
      },
      {
        question: "Yenileme tarihlerini kaçırmamak için ne yapıyorsunuz?",
        answer:
          "Tüm lisanslarınızı bitiş tarihleriyle birlikte listeler, yenilemeden önce sizi bilgilendirir ve kullanımı yeniden değerlendiririz. Böylece hem kesinti yaşanmaz hem de artık kullanılmayan lisanslar yenilenmez.",
      },
    ],
  },
];

export const serviceCategories: Record<string, ServiceCategory> =
  Object.fromEntries(serviceCategoryList.map((c) => [c.slug, c]));
