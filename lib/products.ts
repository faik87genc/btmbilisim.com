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
    tagline: "Bütçe ve Raporlama Yazılımı",
    category: "Finans Yazılımı",
    description:
      "Gelir ve gider bütçelerinizi, kullandığınız ERP sisteminden gelen canlı satınalma verileriyle aynı panelde karşılaştırıp hesap kalemi düzeyinde sapma analizi yapmanızı sağlayan kurumsal bütçe ve raporlama platformu.",
    metaDescription:
      "SAP, Oracle, LOGO ve Mikro gibi ERP sistemlerinizle entegre çalışan, bütçe-gerçekleşme sapmasını hesap kalemi düzeyinde gösteren akıllı bütçe paneli.",
    features: [
      "Gelir/gider bütçesi – gerçekleşme sapma raporlama",
      "SAP, Oracle, LOGO, Mikro ve diğer ERP'lerle entegrasyon",
      "Manuel ve toplu (Excel) veri girişi",
      "Çoklu firma ve yetki bazlı kullanıcı yönetimi",
    ],
    faq: [
      {
        question: "Atlas'ı kullanmak için ERP sistemimizi değiştirmemiz gerekiyor mu?",
        answer:
          "Hayır. Atlas, SAP, Oracle, LOGO, Mikro ve diğer yaygın ERP sistemleriyle entegre çalışacak şekilde tasarlandı; mevcut ERP'nizi değiştirmenize gerek yok.",
      },
      {
        question: "Veri girişini manuel mi yapmam gerekiyor?",
        answer:
          "Hayır, ERP'nizden canlı veri senkronizasyonu sağlanır. Dilerseniz ek olarak manuel veya toplu (Excel) veri girişi de yapabilirsiniz.",
      },
      {
        question: "Birden fazla firmamız var, tek panelden yönetebilir miyiz?",
        answer:
          "Evet, Atlas çoklu firma desteği ve yetki bazlı kullanıcı yönetimiyle birden fazla şirketi tek panelden yönetmenize izin verir.",
      },
    ],
  },
  {
    slug: "cek-senet-programi",
    code: "BTM / TAHSİLAT",
    name: "Çek Senet Programı",
    tagline: "Çek-senet takip sistemi.",
    category: "Finans Yazılımı",
    description:
      "Çek ve senet portföyünüzü, vade takvimini ve tahsilat risklerini tek ekrandan yöneten, erken uyarı bildirimleri veren çek ve senet yönetim sistemi.",
    metaDescription:
      "Çek ve senet portföyünüzü, vade takvimini ve tahsilat riskini tek ekrandan yöneten, erken uyarı bildirimli çek senet yönetim sistemi.",
    features: [
      "Vade takvimi ve otomatik hatırlatmalar",
      "Ciro ve tahsilat hareket geçmişi",
      "Risk skoruna göre portföy görünümü",
      "Banka hesap mutabakatı",
    ],
    faq: [
      {
        question: "Çek ve senet portföyümüzü tek ekrandan mı takip edebiliriz?",
        answer:
          "Evet, vade takvimi, ciro/tahsilat hareketleri ve risk skoruna göre portföy görünümü tek panelde sunulur.",
      },
      {
        question: "Vade yaklaştığında bildirim alıyor muyuz?",
        answer:
          "Evet, sistem otomatik hatırlatmalarla vade tarihlerini önceden bildirir, gecikme riskini azaltır.",
      },
      {
        question: "Banka hesaplarımızla mutabakat yapabiliyor muyuz?",
        answer:
          "Evet, banka hesap mutabakatı özelliğiyle çek/senet hareketlerinizi banka kayıtlarınızla karşılaştırabilirsiniz.",
      },
    ],
  },
  {
    slug: "cyberware",
    code: "BTM / SOC",
    name: "CyberWare",
    tagline: "Kurumsal siber güvenlik çözümü.",
    category: "Siber Güvenlik Çözümleri",
    description:
      "Uç nokta ve ağ trafiğini gerçek zamanlı izleyen, anomalileri tespit eden ve olay müdahale ekiplerini otomatik olarak uyaran kurumsal siber güvenlik çözümü.",
    metaDescription:
      "Uç nokta ve ağ trafiğini gerçek zamanlı izleyen, tehditleri otomatik bildiren kurumsal siber güvenlik ve SOC çözümü.",
    features: [
      "Gerçek zamanlı tehdit izleme",
      "Uç nokta davranış analizi",
      "Otomatik olay bildirimi",
      "SOC ekipleri için olay panosu",
    ],
    faq: [
      {
        question: "CyberWare gerçek zamanlı mı çalışıyor?",
        answer:
          "Evet, uç nokta ve ağ trafiğini gerçek zamanlı izler, anomalileri anlık tespit eder.",
      },
      {
        question: "Bir tehdit tespit edildiğinde ekibimiz nasıl haberdar oluyor?",
        answer:
          "Otomatik olay bildirimi ile ilgili ekipleriniz anında uyarılır; SOC ekipleri için ayrı bir olay panosu da sunulur.",
      },
      {
        question: "Mevcut güvenlik ürünlerimizle birlikte kullanılabilir mi?",
        answer:
          "Evet, CyberWare mevcut güvenlik altyapınızı tamamlayacak şekilde konumlandırılabilir.",
      },
    ],
  },
  {
    slug: "cyberquan",
    code: "BTM / IIoT",
    name: "CyberQuan",
    tagline: "IoT tabanlı üretim izleme sistemi.",
    category: "Endüstriyel IoT & Üretim İzleme",
    description:
      "Sensör, PLC ve IP kamera entegrasyonuyla üretim süreçlerini uçtan uca izleyen; lot bazlı izlenebilirlik, kalite kontrol, otomatik eşik alarmı ve ISO/DPP uyumluluğunu tek panelde toplayan endüstriyel IoT (IIoT) ve üretim izleme platformu.",
    metaDescription:
      "Sensör, PLC ve IP kamera verilerini MQTT/Modbus/HLS ile tek panelde toplayan; lot izlenebilirliği, otomatik alarm ve ISO/DPP uyumlu IoT üretim izleme sistemi.",
    features: [
      "MQTT sensör, Modbus PLC ve HLS kamera entegrasyonu",
      "Gerçek zamanlı telemetri ve otomatik eşik alarmları",
      "Lot bazlı üretim izlenebilirliği ve fotoğraf/kamera kanıtı",
      "Kalite kontrol (NCR/CAPA), ISO uyumluluk ve Dijital Ürün Pasaportu (DPP)",
    ],
    faq: [
      {
        question: "CyberQuan hangi cihaz ve protokolleri destekliyor?",
        answer:
          "Sensörler için MQTT, PLC/makine verisi için Modbus TCP, IP kameralar için HLS/RTSP ve fotoğraf kanıtı için tarayıcı webcam (getUserMedia) desteklenir. Tüm cihazlar tek birleşik tabloda yönetilir; OPC UA altyapısı hazırdır.",
      },
      {
        question: "Alarmlar nasıl oluşuyor?",
        answer:
          "Her cihaz için min/max eşik değeri tanımlarsınız. Gelen telemetri eşiği aştığında sistem otomatik olarak kritik veya uyarı seviyesinde alarm üretir ve dashboard'da anlık gösterir. Örneğin gürültü sensörü 85 dB eşiğini aşınca kritik alarm oluşur.",
      },
      {
        question: "Üretim izlenebilirliğini nasıl sağlıyor?",
        answer:
          "Her lot; hammadde kabulünden torna, ısıl işlem, kalite kontrol ve sevkiyata kadar adım adım takip edilir. Her adımda sensör verileri, kamera görüntüleri ve fotoğraf kanıtları lota bağlanır; lot soy ağacı (genealogy) ile hammadde–ürün zinciri görüntülenir.",
      },
      {
        question: "ISO ve regülasyon uyumluluğu için ne sunuyor?",
        answer:
          "ISO 9001/14001 maddelerini bazlı takip, denetim yönetimi ve risk değerlendirmesi sunar. Dijital Ürün Pasaportu (DPP) ile malzeme, geri dönüşüm bilgisi ve QR kod üzerinden AB regülasyon uyumu sağlanır.",
      },
      {
        question: "Erişim yetkileri ve çok firmalı kullanım nasıl yönetiliyor?",
        answer:
          "JWT tabanlı kimlik doğrulama ve 7 rollü (Admin, Satış, Üretim, Kalite, Tedarikçi, Sevkiyat, Viewer) yetkilendirme ile her kullanıcı yalnızca yetkili sayfaları görür. Multi-tenant mimari sayesinde bulut veya on-premise kurulumda birden fazla firma izole çalışır.",
      },
    ],
  },
  {
    slug: "cyberhost",
    code: "BTM / WIFI",
    name: "CyberHost",
    tagline: "Wi-Fi hotspot ve ağ yönetimi.",
    category: "Sistem & Network Çözümleri",
    description:
      "MikroTik RouterOS cihazlarıyla tam uyumlu çalışan; 8 temalı captive portal, 5651 uyumlu değiştirilemez loglama, çoklu kiracı mimarisi ve router izleme özelliklerini tek panelde birleştiren Wi-Fi hotspot ve ağ yönetim platformu.",
    metaDescription:
      "MikroTik uyumlu, 5651 loglamalı, 8 temalı captive portal sunan çoklu kiracı Wi-Fi hotspot ve ağ yönetim platformu.",
    features: [
      "8 temalı captive portal ve 8 kimlik doğrulama yöntemi",
      "5651 uyumlu, HMAC-SHA256 hash zincirli değiştirilemez loglama",
      "20'den fazla MikroTik RouterOS modülü ve toplu (bulk) yönetim",
      "Çoklu kiracı yapı, RBAC (6 rol), MFA ve router izleme",
    ],
    faq: [
      {
        question: "CyberHost hangi router'larla çalışıyor?",
        answer:
          "CyberHost, MikroTik RouterOS cihazlarıyla tam uyumlu çalışacak şekilde geliştirildi. VLAN, DHCP, hotspot, firewall, NAT, mangle, queue, PPPoE ve wireless dahil 20'den fazla RouterOS modülünü panel üzerinden yönetebilirsiniz.",
      },
      {
        question: "5651 loglaması nasıl yapılıyor, kayıtlar değiştirilebilir mi?",
        answer:
          "Her log kaydı HMAC-SHA256 hash zinciriyle bir öncekine bağlanır ve günlük root hash TSA zaman damgasıyla mühürlenir. Kayıtlar silinemez veya değiştirilemez; zincirde bir kırılma olursa anında tespit edilir. Her şube kendi bağımsız hash zincirine sahiptir.",
      },
      {
        question: "Misafirler ağa hangi yöntemlerle giriş yapabiliyor?",
        answer:
          "SMS, e-posta, WhatsApp, sosyal medya, voucher, QR kod, statik şifre ve LDAP/AD olmak üzere sekiz yöntem desteklenir. Giriş sayfası için 8 hazır tema sunulur; renk, logo ve metinler tamamen özelleştirilebilir.",
      },
      {
        question: "Birden fazla şubemiz var, tek merkezden mi yönetiyoruz?",
        answer:
          "Evet. Platform → Firma → Şube → Cihaz hiyerarşisiyle tüm lokasyonlarınızı tek panelden yönetirsiniz. Toplu işlem (bulk) özelliğiyle VLAN, DHCP, firewall ve hotspot ayarlarını tüm router'lara tek ekrandan dağıtabilirsiniz.",
      },
      {
        question: "Router'larımızın durumunu izleyip uyarı alabiliyor muyuz?",
        answer:
          "Evet. CPU, RAM, disk, sıcaklık ve interface trafiği anlık izlenir; tanımladığınız eşikler aşıldığında Telegram, e-posta, Slack veya webhook üzerinden bildirim alırsınız. Tüm metrikler zaman serisi olarak saklanır.",
      },
    ],
  },
  {
    slug: "pentforce",
    code: "BTM / AI PENTEST",
    name: "PentForce",
    tagline: "Otonom AI pentest platformu.",
    category: "Siber Güvenlik Çözümleri",
    description:
      "Web uygulamalarından network altyapısına, IoT/OT protokollerinden SCADA sistemlerine ve kaynak kod analizinden otomatik exploitasyona kadar 38 fazlı metodolojiyi otonom yürüten; özel local AI ile air-gapped ortamlarda internetsiz çalışan otonom AI pentest platformu.",
    metaDescription:
      "38 fazlı metodoloji ve 130+ araçla web, network, IoT/OT, bulut ve kaynak kod testini otonom yürüten; air-gapped ortamlarda internetsiz çalışan AI pentest platformu.",
    features: [
      "38 fazlı metodoloji ve 130+ tümleşik güvenlik aracı",
      "Web, network, IoT/OT, bulut (CSPM) ve kaynak kod (SAST) testi",
      "Metasploit tabanlı otomatik exploit motoru ve payload evasion (FUD)",
      "Özel local AI ile air-gapped, internetsiz çalışma",
    ],
    faq: [
      {
        question: "PentForce internete kapalı (air-gapped) ortamlarda çalışıyor mu?",
        answer:
          "Evet. Özel local AI ve önbelleklenmiş template'ler sayesinde internet veya API anahtarı gerektirmez. İnternetteyken cache_templates ile araçları önbelleğe alır, offline_bundle ile USB paketi oluşturur ve kapalı ağa taşıyarak tamamen lokal çalışırsınız.",
      },
      {
        question: "Hangi test alanlarını kapsıyor?",
        answer:
          "Web uygulama (22 faz), network altyapı, IoT/OT ve SCADA protokolleri, kaynak kod analizi (SAST), bulut güvenliği (CSPM), Active Directory ve post-exploit ile WAF/IPS/IDS atlatma dahil 38 faz ve 130'dan fazla araçla geniş bir yelpazeyi kapsar.",
      },
      {
        question: "Bulunan zafiyetler otomatik olarak sömürülüyor mu?",
        answer:
          "Evet. Metasploit entegrasyonuyla AI ajan, uygun exploit playbook'unu (EternalBlue, Log4Shell, Tomcat deploy, SSH brute, SNMP crack vb.) otomatik tetikler; özel modüller için msf_exploit ve msf_payload desteklenir.",
      },
      {
        question: "Kritik altyapıda sistem çökertme riskini nasıl yönetiyor?",
        answer:
          "Akıllı scoping ile Safe/Normal/Aggressive seviyelerini siz belirlersiniz. SCADA/ICS fazlarında otomatik güvenli mod devreye girer, kritik altyapı korunur ve hedefler risk analiziyle doğrulanır.",
      },
      {
        question: "PentForce insan gücüyle yapılan sızma testinin yerini mi alıyor?",
        answer:
          "PentForce, otonom tarama ile süreci hızlandırır ve sürekliliğini sağlar; kritik projelerde uzman doğrulamasıyla birlikte kullanılması önerilir.",
      },
    ],
  },
  {
    slug: "fornet-enterprise",
    code: "BTM / MSP",
    name: "FORNET ENTERPRISE",
    tagline: "MSP altyapı ve güvenlik platformu.",
    category: "Sistem & Network Çözümleri",
    description:
      "Binlerce dağınık varlığı tek panelden izleyen; çok kiracılı (multi-tenant) konteyner mimarisiyle müşterileri kriptografik olarak izole eden, çok markalı VPN otomasyonu ve Apache Guacamole + HashiCorp Vault tabanlı yetkili erişim (PAM) sunan MSP merkezi altyapı, erişim ve güvenlik yönetim platformu.",
    metaDescription:
      "MSP ve NOC/SOC ekipleri için çok kiracılı merkezi izleme, çok markalı VPN otomasyonu ve Guacamole+Vault tabanlı yetkili erişim (PAM) sunan platform.",
    features: [
      "Binlerce varlık için merkezi gösterge paneli ve anlık alarm",
      "Çok kiracılı (multi-tenant) mikro-izolasyon: ayrı Docker ağı ve volume",
      "Çok markalı VPN otomasyonu (Fortinet, Palo Alto, Cisco, Check Point, Sophos, OpenVPN)",
      "Guacamole + HashiCorp Vault ile tarayıcı üzerinden Zero-Trust PAM erişimi",
    ],
    faq: [
      {
        question: "Farklı müşterilerin verileri birbirinden nasıl izole ediliyor?",
        answer:
          "Her kiracı, sisteme eklendiği andan itibaren kendine özel kriptografik ve mantıksal katmanlarda barındırılır: ayrı Docker bridge ağı, disk seviyesinde izole volume mimarisi ve bellek/ağ katmanında yapısal olarak engellenen çapraz kiracı sızıntısı (cross-tenant leak) ile %100 mikro-izolasyon sağlanır.",
      },
      {
        question: "Hangi VPN ve güvenlik markalarıyla entegre çalışıyor?",
        answer:
          "Check Point, Fortinet, Palo Alto, Cisco AnyConnect, Sophos ve OpenVPN ile yerleşik entegrasyon sunar. Her organizasyon için arka planda müstakil, konteyner tabanlı tünel servisleri ayağa kalkar; iç ağlara erişim için dinamik SOCKS5 ve HTTP proxy kanalları atanır.",
      },
      {
        question: "Yetkili erişim yönetimi (PAM) nasıl çalışıyor?",
        answer:
          "Apache Guacamole ve HashiCorp Vault bileşenleriyle Zero-Trust kurallarına göre erişim verilir. Kullanıcılar hiçbir yazılım indirmeden, tarayıcı üzerinden ve şifreleri görmeden SSH, RDP ve VNC ile tek tıkla bağlanır (PAM Connect); oturumlar video olarak kaydedilir, komutlar loglanır.",
      },
      {
        question: "Bir cihazda güvenlik ihlali şüphesi olursa ne yapabiliyoruz?",
        answer:
          "Anlık Karantina (Isolate) özelliğiyle şüpheli cihazı tek butonla ağdan izole edebilirsiniz. Ayrıca kopan VPN tünellerini saniyeler içinde yakalayan keep-alive/heartbeat mekanizması ve eşik ihlallerinde tetiklenen görsel alarmlar bulunur.",
      },
      {
        question: "Cihaz parolaları ve konfigürasyonlar nasıl korunuyor?",
        answer:
          "Kritik cihaz parolaları ve VPN anahtarları ana veritabanında asla açık metin tutulmaz; yalnızca Vault yolları saklanır ve güncellemeler Check-And-Set (CAS) mekanizmasıyla korunur. Tüm ağ cihazlarının konfigürasyonları marka bazlı otomatik yedeklenir, versiyonlanır ve merkezi kalıcı depolamada saklanır.",
      },
    ],
  },
  {
    slug: "otium",
    code: "BTM / OTIUM",
    name: "Otium",
    tagline: "Çok firmalı İK izin yönetim platformu.",
    category: "İnsan Kaynakları Yazılımı",
    description:
      "İzin talebinden onay akışına, yıllık hak ediş ve devreden bakiye otomasyonundan KVKK uyumlu veri korumasına kadar tüm izin sürecini tek platformda toplayan, Türkiye iş mevzuatına göre tasarlanmış çok firmalı (multi-tenant) İK izin yönetim platformu.",
    metaDescription:
      "Türkiye iş mevzuatına uygun, çok firmalı İK izin yönetim platformu — izin onay akışı, yıllık hak ediş ve KVKK uyumlu veri koruma bir arada.",
    features: [
      "İzin talebi ve çok kademeli onay akışı",
      "Yıllık hak ediş ve devreden bakiye otomasyonu",
      "Türkiye iş mevzuatına uygun izin kuralları",
      "KVKK uyumlu veri koruma, çok firmalı (multi-tenant) yapı",
    ],
    faq: [
      {
        question: "Otium birden fazla şirketimiz için tek kurulumla mı çalışıyor?",
        answer:
          "Evet, çok firmalı (multi-tenant) mimarisi sayesinde farklı şirketlerinizin izin süreçlerini tek platformda, birbirinden ayrı olarak yönetebilirsiniz.",
      },
      {
        question: "Yıllık izin hakları ve devreden bakiye otomatik mi hesaplanıyor?",
        answer:
          "Evet, yıllık hak ediş ve devreden bakiye otomasyonu Türkiye iş mevzuatına uygun şekilde hesaplanır.",
      },
      {
        question: "İzin onay süreci kaç kademeli olabiliyor?",
        answer:
          "İhtiyacınıza göre tek kademeli ya da çok kademeli onay akışı tanımlanabilir.",
      },
    ],
  },
  {
    slug: "orbit",
    code: "BTM / BT",
    name: "Orbit",
    tagline: "IT operasyon ve envanter platformu.",
    category: "Sistem & Network Çözümleri",
    description:
      "Kurumun donanım, yazılım ve lisans envanterini tek merkezden izleyen; IT talep, arıza ve bakım süreçlerini uçtan uca yöneten çok şirketli (multi-tenant) IT operasyon ve envanter takip platformu.",
    metaDescription:
      "Donanım, yazılım ve lisans envanterinizi tek merkezden izleyen, IT talep ve arıza süreçlerini yöneten çok şirketli IT operasyon platformu.",
    features: [
      "Donanım ve yazılım envanterini tek merkezden takip",
      "Lisans, garanti ve bakım süresi takibi",
      "IT talep ve arıza (helpdesk) süreç yönetimi",
      "Çok şirketli yapı ile merkezi raporlama",
    ],
    faq: [
      {
        question: "Orbit hangi varlıkları takip ediyor?",
        answer:
          "Kurumunuzun donanım, yazılım ve lisans envanterini tek merkezden izler.",
      },
      {
        question: "IT talep ve arıza süreçlerini de bu platformdan mı yönetiyoruz?",
        answer:
          "Evet, helpdesk süreçleri (talep, arıza, bakım) Orbit üzerinden uçtan uca yönetilir.",
      },
      {
        question: "Birden fazla şirket için ayrı ayrı raporlama alabiliyor muyuz?",
        answer:
          "Evet, çok şirketli yapı sayesinde merkezi raporlama alırken şirket bazında ayrım da yapabilirsiniz.",
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
