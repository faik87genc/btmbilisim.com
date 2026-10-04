export type Product = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  metaDescription: string;
  features: string[];
  faq: { question: string; answer: string }[];
};

export const products: Product[] = [
  {
    slug: "atlas",
    code: "BTM / ATLAS",
    name: "Atlas",
    tagline: "Bütçe planlama ve sapma raporlama yazılımı",
    category: "Finans Yazılımı",
    description:
      "Planladığınız gelir ve gider rakamlarını ERP'nizden anlık akan satınalma kayıtlarıyla yan yana koyan; her hesap kaleminde planın nerede aşıldığını ya da geride kaldığını gösteren kurumsal bütçe yazılımı.",
    metaDescription:
      "Atlas bütçe yazılımı: SAP, Oracle, LOGO, Mikro gibi ERP'lerden veriyi anlık çeker, plan ile fiili harcama arasındaki farkı her hesap kaleminde raporlar.",
    features: [
      "Plan ile fiili gelir/gider arasındaki farkın raporlanması",
      "SAP, Oracle, LOGO, Mikro ve benzeri ERP'lere bağlantı",
      "Tek tek kayıt ya da Excel dosyasıyla toplu yükleme",
      "Birden çok şirket, rol tabanlı kullanıcı yetkileri",
    ],
    faq: [
      {
        question: "Atlas'a geçerken mevcut ERP yazılımımızı bırakmak zorunda mıyız?",
        answer:
          "Hayır. Atlas, kullandığınız ERP'nin yanında çalışır; SAP, Oracle, LOGO, Mikro ve yaygın diğer sistemlere bağlanarak veriyi oradan okur. ERP tarafında bir değişiklik yapmanız gerekmez.",
      },
      {
        question: "Rakamları elle mi gireceğiz?",
        answer:
          "Gerek yok; satınalma ve harcama verisi ERP'den anlık olarak aktarılır. ERP dışında kalan kalemler için tek tek giriş yapabilir ya da bir Excel dosyasını toplu olarak yükleyebilirsiniz.",
      },
      {
        question: "Grup şirketlerimizin bütçelerini aynı ekranda görebilir miyiz?",
        answer:
          "Evet. Atlas'ta birden çok şirket tanımlanır ve her kullanıcıya yalnızca sorumlu olduğu şirket veya bölümü gösteren roller atanır.",
      },
    ],
  },
  {
    slug: "cek-senet-programi",
    code: "BTM / TAHSİLAT",
    name: "Çek Senet Programı",
    tagline: "Çek, senet ve vade takip yazılımı",
    category: "Finans Yazılımı",
    description:
      "Elinizdeki ve verdiğiniz çek ile senetleri, yaklaşan vadeleri ve tahsil edilemeyecek kâğıt riskini aynı ekranda izlemenizi sağlayan; vade gelmeden sizi uyaran tahsilat takip yazılımı.",
    metaDescription:
      "Çek senet programı: portföydeki her kâğıdın vadesini, ciro geçmişini ve tahsilat riskini tek ekranda izleyin; vade yaklaşınca otomatik uyarı alın.",
    features: [
      "Vade takvimi, yaklaşan ödemeler için otomatik uyarılar",
      "Her kâğıdın ciro ve tahsil hareketlerinin kaydı",
      "Portföyün risk puanına göre sınıflandırılması",
      "Banka hesaplarıyla karşılıklı kontrol (mutabakat)",
    ],
    faq: [
      {
        question: "Tüm çek ve senetleri tek bir listede görebilir miyiz?",
        answer:
          "Evet. Vade takvimi, ciro ve tahsil hareketleri ile risk puanına göre ayrılmış portföy aynı ekranda yer alır; ayrı tablolar tutmanız gerekmez.",
      },
      {
        question: "Vadesi gelen bir kâğıdı gözden kaçırmamak için ne yapıyor?",
        answer:
          "Program vade tarihlerini sizin yerinize izler ve tarih yaklaştığında otomatik hatırlatma gönderir. Böylece tahsilatın ya da ödemenin gecikme ihtimali düşer.",
      },
      {
        question: "Banka kayıtlarıyla eşleştirme yapılabiliyor mu?",
        answer:
          "Evet. Mutabakat ekranında programdaki çek ve senet hareketleri banka hesap kayıtlarınızla karşılaştırılır, tutmayan satırlar ayrıca görünür.",
      },
    ],
  },
  {
    slug: "cyberware",
    code: "BTM / SOC",
    name: "CyberWare",
    tagline: "Uç nokta ve ağ güvenliği izleme yazılımı",
    category: "Siber Güvenlik Çözümleri",
    description:
      "Bilgisayarlarınızdaki ve ağınızdaki hareketleri kesintisiz takip eden, olağan dışı davranışı yakalayınca müdahale ekibine kendiliğinden haber veren kurumsal güvenlik izleme yazılımı.",
    metaDescription:
      "CyberWare: uç noktaları ve ağ trafiğini anlık izler, olağan dışı davranışı yakalar, olayı SOC ekibine otomatik iletir. Kurumsal güvenlik izleme yazılımı.",
    features: [
      "Tehditlerin anlık olarak izlenmesi",
      "Uç noktalarda davranış tabanlı analiz",
      "Olay anında ekibe otomatik uyarı",
      "SOC ekibine ayrılmış olay ekranı",
    ],
    faq: [
      {
        question: "CyberWare olayları ne kadar hızlı görüyor?",
        answer:
          "Uç noktalardan ve ağdan gelen veriyi sürekli işler; olağan dışı bir davranış oluştuğu anda kayda geçer ve görünür hâle gelir.",
      },
      {
        question: "Şüpheli bir durumda kime, nasıl haber veriliyor?",
        answer:
          "Tanımlı ekip üyelerine otomatik uyarı gider. SOC ekibi ise olayların tek yerde toplandığı ayrı bir ekrandan takip ve müdahale yapar.",
      },
      {
        question: "Kullandığımız antivirüs ve güvenlik duvarını kaldırmamız gerekir mi?",
        answer:
          "Hayır. CyberWare mevcut güvenlik ürünlerinizin yerine değil, onların yanına konumlanacak ve görünürlüğü artıracak şekilde kurgulanabilir.",
      },
    ],
  },
  {
    slug: "cyberquan",
    code: "BTM / IIoT",
    name: "CyberQuan",
    tagline: "Endüstriyel IoT üretim takip platformu",
    category: "Endüstriyel IoT & Üretim İzleme",
    description:
      "Sahadaki sensörleri, PLC'leri ve IP kameraları tek ekrana bağlayarak hattın her adımını görünür kılan; lot geçmişi, kalite kayıtları, eşik aşımı alarmları ve ISO/DPP gerekliliklerini bir arada yöneten endüstriyel IoT (IIoT) platformu.",
    metaDescription:
      "CyberQuan IIoT platformu: MQTT sensör, Modbus PLC ve HLS kamera verisini tek ekranda toplar; lot geçmişi, eşik alarmı ve ISO/DPP kayıtlarını yönetir.",
    features: [
      "Sensörler için MQTT, PLC için Modbus, kameralar için HLS bağlantısı",
      "Anlık telemetri, değer sınırı aşılınca otomatik alarm",
      "Her lotun adım adım geçmişi, fotoğraf ve görüntü kanıtıyla",
      "NCR/CAPA kalite süreçleri, ISO takibi ve Dijital Ürün Pasaportu (DPP)",
    ],
    faq: [
      {
        question: "Hangi cihazları ve iletişim protokollerini bağlayabiliriz?",
        answer:
          "Sensör verisi MQTT ile, PLC ve makine verisi Modbus TCP ile, IP kamera yayını HLS/RTSP ile alınır. Fotoğraf kanıtı için tarayıcıdaki webcam (getUserMedia) kullanılabilir. Bütün cihazlar tek bir listeden yönetilir; OPC UA desteği için altyapı hazır durumdadır.",
      },
      {
        question: "Alarm kuralları nasıl tanımlanıyor?",
        answer:
          "Her cihaza bir alt ve üst sınır girersiniz. Ölçülen değer bu aralığın dışına çıktığında platform, uyarı ya da kritik düzeyde alarm üretip ekranda hemen gösterir. Sözgelimi gürültü sensörü için 85 dB sınırı belirlerseniz, bu değer aşıldığında kritik alarm oluşur.",
      },
      {
        question: "Bir ürünün geçmişini geriye doğru izleyebilir miyiz?",
        answer:
          "Evet. Lot; hammaddenin teslim alınmasından tornalama, ısıl işlem ve kalite kontrolden sevkiyata kadar her aşamada kayıt altındadır. Her aşamanın sensör ölçümleri, kamera kayıtları ve fotoğrafları lota iliştirilir; genealogy (soy ağacı) görünümü hangi hammaddenin hangi ürüne dönüştüğünü gösterir.",
      },
      {
        question: "ISO denetimleri ve AB gereklilikleri için neler var?",
        answer:
          "ISO 9001 ve 14001 maddelerine göre takip, denetim kayıtları ve risk değerlendirmesi yapılır. Dijital Ürün Pasaportu (DPP) modülü malzeme ve geri dönüşüm bilgisini QR kodla erişilebilir kılarak AB düzenlemelerine uyumu destekler.",
      },
      {
        question: "Kullanıcı yetkileri ve birden çok firma nasıl ayrılıyor?",
        answer:
          "Oturumlar JWT ile doğrulanır; Admin, Satış, Üretim, Kalite, Tedarikçi, Sevkiyat ve Viewer olmak üzere 7 rol vardır ve herkes yalnızca rolüne açık ekranları görür. Multi-tenant yapı sayesinde ister bulutta ister kendi sunucunuzda (on-premise) kurulsun, her firmanın verisi diğerlerinden ayrı tutulur.",
      },
    ],
  },
  {
    slug: "cyberhost",
    code: "BTM / WIFI",
    name: "CyberHost",
    tagline: "Misafir Wi-Fi ve MikroTik yönetim platformu",
    category: "Sistem & Network Çözümleri",
    description:
      "MikroTik RouterOS cihazlarınızı merkezden yöneten; 8 farklı temaya sahip giriş (captive portal) sayfası, 5651'e uygun ve sonradan değiştirilemeyen kayıt tutma, çok kiracılı yapı ve router sağlık takibini bir araya getiren misafir Wi-Fi platformu.",
    metaDescription:
      "CyberHost: MikroTik routerları merkezden yönetin; 8 temalı giriş sayfası, 5651'e uygun değiştirilemez kayıt ve çok şubeli yapı sunan misafir Wi-Fi platformu.",
    features: [
      "8 temalı giriş sayfası, 8 farklı oturum açma yöntemi",
      "5651'e uygun, HMAC-SHA256 hash zinciriyle mühürlenen kayıtlar",
      "20'yi aşkın RouterOS modülü, tüm cihazlara toplu ayar dağıtımı",
      "Çok kiracılı yapı, 6 rollü RBAC, MFA ve router sağlık takibi",
    ],
    faq: [
      {
        question: "CyberHost ile hangi router markasını kullanmamız gerekiyor?",
        answer:
          "Platform MikroTik RouterOS için geliştirildi ve bu cihazlarla tam uyumludur. VLAN, DHCP, hotspot, firewall, NAT, mangle, queue, PPPoE ve wireless gibi 20'yi aşkın RouterOS modülünü cihaza tek tek bağlanmadan panelden ayarlarsınız.",
      },
      {
        question: "5651 kayıtları nasıl tutuluyor, sonradan oynanabilir mi?",
        answer:
          "Hayır. Her kayıt HMAC-SHA256 ile bir önceki kayda zincirlenir; günün sonunda oluşan kök hash TSA zaman damgasıyla mühürlenir. Bir kaydın silinmesi ya da değiştirilmesi zinciri bozar ve bu durum hemen fark edilir. Her şubenin zinciri diğerlerinden bağımsızdır.",
      },
      {
        question: "Misafirler ağa nasıl bağlanıyor?",
        answer:
          "Sekiz seçenek var: SMS, e-posta, WhatsApp, sosyal medya hesabı, voucher, QR kod, sabit şifre ve LDAP/AD. Giriş ekranı için 8 hazır tema bulunur; renkleri, logoyu ve yazıları kendi markanıza göre düzenleyebilirsiniz.",
      },
      {
        question: "Çok sayıda şubeyi tek yerden yönetmek mümkün mü?",
        answer:
          "Evet. Platform, firma, şube ve cihaz şeklinde kademeli bir yapı kurulur; bütün lokasyonlar aynı panelde görünür. VLAN, DHCP, firewall ve hotspot ayarlarını toplu işlemle tüm router'lara tek seferde gönderebilirsiniz.",
      },
      {
        question: "Router'larda bir sorun çıkarsa haberimiz olur mu?",
        answer:
          "Olur. İşlemci, bellek, disk, sıcaklık ve arayüz trafiği sürekli ölçülür; belirlediğiniz sınır aşılınca Telegram, e-posta, Slack ya da webhook ile uyarı gelir. Ölçümler zaman serisi olarak saklandığı için geçmişe dönük inceleme de yapabilirsiniz.",
      },
    ],
  },
  {
    slug: "pentforce",
    code: "BTM / AI PENTEST",
    name: "PentForce",
    tagline: "Yapay zekâ destekli otonom sızma testi platformu",
    category: "Siber Güvenlik Çözümleri",
    description:
      "Web uygulamaları, ağ altyapısı, IoT/OT ve SCADA protokolleri, kaynak kod incelemesi ve otomatik istismar adımlarını içeren 38 fazlık test sürecini insan müdahalesi beklemeden yürüten; kendi yerel yapay zekâ modeliyle internet bağlantısı olmayan (air-gapped) ağlarda da çalışan sızma testi platformu.",
    metaDescription:
      "PentForce: 38 faz ve 130'u aşkın araçla web, ağ, IoT/OT, bulut ve kaynak kod testini kendiliğinden yürüten, internetsiz ağlarda da çalışan AI pentest aracı.",
    features: [
      "38 fazlık test akışı, 130'u aşkın entegre güvenlik aracı",
      "Web, ağ, IoT/OT, bulut (CSPM) ve kaynak kod (SAST) testleri",
      "Metasploit tabanlı otomatik istismar ve payload evasion (FUD)",
      "Yerel yapay zekâ modeliyle internetsiz (air-gapped) kullanım",
    ],
    faq: [
      {
        question: "İnternete çıkışı olmayan bir ağda PentForce'u kullanabilir miyiz?",
        answer:
          "Evet. Yerel yapay zekâ modeli ve önceden indirilmiş template'ler sayesinde ne internet ne de API anahtarı gerekir. Bağlantınız varken cache_templates ile araçları önbelleğe alır, offline_bundle ile bir USB paketi hazırlar, bu paketi kapalı ağa götürüp testi tamamen yerelde yürütürsünüz.",
      },
      {
        question: "PentForce hangi alanları test ediyor?",
        answer:
          "22 fazı web uygulamalarına ayrılmış toplam 38 fazda; ağ altyapısı, IoT/OT ve SCADA protokolleri, kaynak kod (SAST), bulut yapılandırması (CSPM), Active Directory, istismar sonrası adımlar ve WAF/IPS/IDS atlatma denemeleri yer alır. Bu işler için 130'u aşkın araç kullanılır.",
      },
      {
        question: "Tespit edilen açıklar otomatik olarak istismar ediliyor mu?",
        answer:
          "Evet. Yapay zekâ ajanı Metasploit entegrasyonu üzerinden duruma uyan istismar senaryosunu (EternalBlue, Log4Shell, Tomcat deploy, SSH brute, SNMP crack gibi) kendisi başlatır. Özel modüller için msf_exploit ve msf_payload komutları da kullanılabilir.",
      },
      {
        question: "Üretim ya da kritik altyapı sistemleri test sırasında çökebilir mi?",
        answer:
          "Bu riski siz yönetirsiniz: kapsam belirlerken Safe, Normal veya Aggressive seviyesini seçersiniz. SCADA/ICS fazlarına gelindiğinde güvenli mod kendiliğinden açılır, hedefler risk analiziyle teyit edilmeden işlem yapılmaz.",
      },
      {
        question: "Uzman bir ekibin yaptığı sızma testine hâlâ ihtiyaç var mı?",
        answer:
          "PentForce taramaları hızlandırır ve düzenli aralıklarla tekrarlamayı kolaylaştırır. Kritik sistemlerde bulguların bir güvenlik uzmanı tarafından doğrulanmasını öneriyoruz.",
      },
    ],
  },
  {
    slug: "fornet-enterprise",
    code: "BTM / MSP",
    name: "FORNET ENTERPRISE",
    tagline: "MSP'ler için izleme, erişim ve güvenlik platformu",
    category: "Sistem & Network Çözümleri",
    description:
      "Farklı lokasyonlara dağılmış binlerce cihazı aynı ekranda takip eden; her müşteriyi konteyner tabanlı çok kiracılı yapıda kriptografik olarak ayrı tutan, farklı markaların VPN bağlantılarını otomatikleştiren ve Apache Guacamole ile HashiCorp Vault üzerine kurulu yetkili erişim (PAM) katmanı sunan, yönetilen hizmet sağlayıcılara (MSP) yönelik merkezi yönetim platformu.",
    metaDescription:
      "FORNET ENTERPRISE: MSP ve NOC/SOC ekipleri için müşteri bazında izole izleme, farklı markalarda VPN otomasyonu ve Guacamole + Vault tabanlı PAM erişimi.",
    features: [
      "Binlerce cihazı tek ekranda gösteren panel, anlık alarmlar",
      "Her müşteriye ayrı Docker ağı ve volume ile çok kiracılı izolasyon",
      "Fortinet, Palo Alto, Cisco, Check Point, Sophos ve OpenVPN için VPN otomasyonu",
      "Guacamole + HashiCorp Vault ile tarayıcıdan Zero-Trust PAM bağlantısı",
    ],
    faq: [
      {
        question: "Bir müşterinin verisi diğerine nasıl karışmıyor?",
        answer:
          "Her müşteri platforma eklendiği anda kendine ait kriptografik ve mantıksal katmanlara yerleştirilir. Ayrı bir Docker bridge ağı ve disk düzeyinde ayrılmış volume kullanılır; bellek ve ağ katmanında kiracılar arası veri geçişi (cross-tenant leak) mimari olarak engellenir.",
      },
      {
        question: "Hangi firewall ve VPN markalarını destekliyor?",
        answer:
          "Check Point, Fortinet, Palo Alto, Cisco AnyConnect, Sophos ve OpenVPN entegrasyonu hazır gelir. Her kurum için arka planda kendine ait, konteynerde çalışan bir tünel servisi başlatılır; iç ağlara ulaşmak için dinamik SOCKS5 ve HTTP proxy kanalları tanımlanır.",
      },
      {
        question: "Yetkili erişim (PAM) tarafında kullanıcı ne görüyor?",
        answer:
          "Erişimler Apache Guacamole ve HashiCorp Vault üzerinden, Zero-Trust ilkelerine göre açılır. Kullanıcı bilgisayarına bir şey kurmadan, tarayıcıdan ve parolayı hiç görmeden SSH, RDP veya VNC oturumunu tek tıkla başlatır (PAM Connect). Oturumların videosu kaydedilir, çalıştırılan komutlar loglanır.",
      },
      {
        question: "Şüpheli bir cihaz fark edildiğinde ne yapılabilir?",
        answer:
          "Anlık Karantina (Isolate) düğmesiyle cihazı tek hamlede ağdan ayırabilirsiniz. Bunun yanında keep-alive/heartbeat kontrolü düşen VPN tünellerini saniyeler içinde fark eder, eşik aşımlarında ekranda görsel alarm çıkar.",
      },
      {
        question: "Cihaz parolaları ve yapılandırma dosyaları nerede saklanıyor?",
        answer:
          "Parolalar ve VPN anahtarları ana veritabanına düz metin olarak yazılmaz; orada yalnızca Vault yolu bulunur ve değişiklikler Check-And-Set (CAS) ile korunur. Ağ cihazlarının yapılandırmaları markasına göre otomatik yedeklenir, sürüm geçmişiyle birlikte merkezi kalıcı depoda tutulur.",
      },
    ],
  },
  {
    slug: "otium",
    code: "BTM / OTIUM",
    name: "Otium",
    tagline: "Grup şirketleri için izin yönetim yazılımı",
    category: "İnsan Kaynakları Yazılımı",
    description:
      "Çalışanın izin isteğinden yöneticinin onayına, yıllık izin hakkının hesaplanmasından bir sonraki yıla aktarılan günlere ve KVKK kapsamında kişisel verinin korunmasına kadar bütün izin işlerini toplayan; Türk iş mevzuatı esas alınarak geliştirilmiş, birden çok şirketi destekleyen (multi-tenant) İK yazılımı.",
    metaDescription:
      "Otium izin yönetim yazılımı: Türk iş mevzuatına göre yıllık izin hesabı, kademeli onay akışı, KVKK'ya uygun veri saklama ve birden çok şirket desteği.",
    features: [
      "İzin isteği ve birden çok aşamalı onay süreci",
      "Yıllık izin hakkı ve sonraki yıla aktarılan günlerin otomatik hesabı",
      "Türk iş mevzuatına göre kurgulanmış izin kuralları",
      "KVKK'ya uygun veri saklama, çok şirketli (multi-tenant) mimari",
    ],
    faq: [
      {
        question: "Grubumuzdaki farklı şirketler için ayrı kurulum gerekir mi?",
        answer:
          "Gerekmez. Multi-tenant mimari sayesinde tek kurulumda her şirketin izin süreçleri, verileri birbirine karışmadan ayrı ayrı yönetilir.",
      },
      {
        question: "Kalan izin günlerini kim hesaplıyor?",
        answer:
          "Otium. Yıllık izin hakkı ve bir sonraki yıla aktarılan bakiye, Türk iş mevzuatındaki kurallara göre sistem tarafından otomatik hesaplanır.",
      },
      {
        question: "Onay akışını kendi yapımıza göre kurabilir miyiz?",
        answer:
          "Evet. İzin talebinin yalnızca bir yöneticiden mi yoksa sırayla birden fazla kişiden mi onay alacağını şirketinizin yapısına göre belirleyebilirsiniz.",
      },
    ],
  },
  {
    slug: "orbit",
    code: "BTM / BT",
    name: "Orbit",
    tagline: "IT envanter ve helpdesk platformu",
    category: "Sistem & Network Çözümleri",
    description:
      "Şirketinizdeki donanımları, kurulu yazılımları ve lisansları tek bir kayıtta toplayan; destek talebi, arıza ve bakım işlerini açılışından kapanışına kadar takip eden, birden çok şirketi destekleyen (multi-tenant) IT operasyon yazılımı.",
    metaDescription:
      "Orbit IT envanter yazılımı: donanım, yazılım ve lisansları tek kayıtta toplayın; destek talebi, arıza ve bakım işlerini birden çok şirket için yönetin.",
    features: [
      "Donanım ve yazılım varlıklarının tek kayıtta toplanması",
      "Lisans, garanti ve bakım bitiş tarihlerinin izlenmesi",
      "Destek talebi ve arıza kayıtları için helpdesk modülü",
      "Birden çok şirket, tüm grubu kapsayan raporlar",
    ],
    faq: [
      {
        question: "Orbit'e hangi varlıkları kaydedebiliriz?",
        answer:
          "Bilgisayar, sunucu ve diğer donanımlarınızı, bunlara kurulu yazılımları ve sahip olduğunuz lisansları tek bir envanterde tutabilirsiniz.",
      },
      {
        question: "Kullanıcıların destek talepleri de Orbit'ten mi yürüyor?",
        answer:
          "Evet. Talep, arıza ve bakım kayıtları helpdesk modülünde açılır, atanır ve kapatılana kadar izlenir.",
      },
      {
        question: "Şirketlerimizi tek tek ve toplu olarak raporlayabilir miyiz?",
        answer:
          "Evet. Çok şirketli yapıda hem tüm grubu kapsayan özet raporlar hem de her şirkete özel raporlar alınabilir.",
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
