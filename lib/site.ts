export const site = {
  name: "BTM Bilişim",
  legalName: "BTM Bilgi Teknolojileri Merkezi",
  domain: "btmbilisim.com",
  email: "oguzhanbatum@btmbilisim.com",
  // 7/24 teknik destek hattının e-postası.
  supportEmail: { address: "teknik@btmbilisim.com", label: "7/24 Teknik Destek" },
  // Kısa hizmet bölgesi etiketi (hero kartları vb.).
  areaLabel: "Gebze · Kocaeli · İstanbul",
  phone: { display: "0850 840 02 86", href: "tel:+908508400286" },
  // Mobil hat — WhatsApp buradan.
  mobile: { display: "0543 730 91 32", href: "tel:+905437309132" },
  whatsapp: {
    display: "+90 543 730 91 32",
    href: "https://wa.me/905437309132?text=" +
      encodeURIComponent("Merhaba, web sitenizden yazıyorum. Teklif almak istiyorum."),
  },
  address: "Hacı Halil Mah. 1207. Sk. No:1 Match Plaza K:4, Gebze / Kocaeli",
  // Yapılandırılmış adres (JSON-LD PostalAddress). `address` ile aynı yer;
  // NAP tutarlılığı için ikisi birlikte güncellenmeli.
  postalAddress: {
    streetAddress: "Hacı Halil Mah. 1207. Sk. No:1 Match Plaza K:4",
    addressLocality: "Gebze",
    addressRegion: "Kocaeli",
    postalCode: "41400",
    addressCountry: "TR",
  },
  // Eski sitenin iletişim sayfasındaki Google Haritalar bağlantısındaki koordinat.
  geo: { latitude: 40.7955844, longitude: 29.4347848 },
  mapsUrl:
    "https://www.google.com/maps/place/Hac%C4%B1halil,+1207.+Sk.+No:1+K:4,+41400+Gebze%2FKocaeli/@40.7955844,29.4347848,17z",
  hours: { label: "Pazartesi – Cuma, 09:00 – 18:00", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  // Yerinde hizmet verilen bölgeler (merkez Gebze) + uzaktan tüm Türkiye.
  areaServed: [
    { type: "City", name: "Gebze" },
    { type: "City", name: "Darıca" },
    { type: "City", name: "Çayırova" },
    { type: "City", name: "Dilovası" },
    { type: "City", name: "Tuzla" },
    { type: "AdministrativeArea", name: "Kocaeli" },
    { type: "City", name: "İstanbul" },
    { type: "Country", name: "Türkiye" },
  ],
  // Footer'daki yasal kimlik satırı. Boş alanlar gösterilmez (social ile aynı
  // mantık); yalnızca şirketin resmi belgelerindeki değerler yazılır.
  legal: {
    tradeName: "", // Tam ticari unvan (ör. "… Ltd. Şti."); boşsa legalName gösterilir
    mersis: "",
    tradeRegistry: "", // Ticaret sicil no + müdürlük
    taxOffice: "",
    taxNumber: "",
    kep: "", // KEP adresi
  },
  // Boş bırakılan hesaplar footer'da gösterilmez.
  social: {
    instagram: "",
    x: "",
    linkedin: "",
  },
  tagline: "Dijital geleceğinizi güvenle şekillendirin.",
  // Sitenin genel tanıtım metni: kök layout'un varsayılan OG/Twitter kartı,
  // PWA manifest'i ve Footer'daki tanıtım paragrafı buradan besleniyor.
  description:
    "BTM Bilişim; 2010'dan bu yana IT danışmanlık temelinde siber güvenlik ve sızma testi, sistem ve network altyapısı, bulut ve yedekleme, yazılım ve lisanslama hizmetlerini ve kendi geliştirdiği kurumsal yazılım ürünlerini Gebze, Kocaeli, İstanbul ve Türkiye genelinde sunar.",
  // --- Admin / AI içerik sistemi ---
  shortName: "BTM Bilişim",
  // Canonical origin — eski WordPress sitesi www altında yayında.
  baseUrl: "https://www.btmbilisim.com",
  // Kök layout'taki title template ile aynı olmalı: SEO asistanı ve AI
  // metaTitle uzunluğunu bu sonek dahil hesaplıyor.
  titleSuffix: " | BTM Bilişim",
  // AI system prompt'larındaki şirket tarifi.
  aiPersona:
    "BTM Bilişim — 2010'dan beri IT danışmanlık temelinde çalışan, ISO 27001 baş denetçi deneyimine sahip; sızma testi, siber güvenlik, ağ ve sistem altyapısı, sunucu/veri merkezi, bulut ve yedekleme, sanallaştırma, lisanslama, güvenlik kamerası (IP kamera) kurulumu, yazılım, web tasarım, ISO 27001/KVKK ve IT danışmanlık hizmetleri veren; Atlas, Orbit, PentForce, CyberHost gibi kurumsal yazılım ürünleri geliştiren bir bilişim firması",
  adminCookie: "btm_admin_session",
} as const;

/** Toplam <title> 60 karakteri geçmesin diye metaTitle'ın (marka hariç) sınırları. */
export const META_TITLE_MAX = 60 - site.titleSuffix.length;
export const META_TITLE_MIN = META_TITLE_MAX - 14;
