export const site = {
  name: "ISO 27001 Danışmanlık",
  legalName: "Ensa Kurumsal Danışmanlık Hizmetleri Limited Şirketi",
  parent: { name: "Ensa Kurumsal Danışmanlık", url: "https://ensakurumsal.com" },
  domain: "iso27001danismanlik.com",
  email: "info@iso27001danismanlik.com",
  phone: { display: "0533 370 01 43", href: "tel:+905333700143" },
  whatsapp: {
    display: "+90 533 370 01 43",
    href: "https://wa.me/905333700143?text=" +
      encodeURIComponent("Merhaba, web sitenizden yazıyorum. Teklif almak istiyorum."),
  },
  address: "Yenikent Mah. Dicle Cd. G Blok No:16 Gebze / Kocaeli",
  // Yapılandırılmış adres (JSON-LD PostalAddress). `address` ile aynı yer;
  // NAP tutarlılığı için ikisi birlikte güncellenmeli.
  postalAddress: {
    streetAddress: "Yenikent Mah. Dicle Cd. G Blok No:16",
    addressLocality: "Gebze",
    addressRegion: "Kocaeli",
    addressCountry: "TR",
  },
  // Konum: eski sitenin (scripts/raw/*.html) gömülü Google Haritalar
  // işletme kartındaki koordinat (ISO 27001 DANIŞMANLIK, place 0x2eb9d8bd24e25266).
  geo: { latitude: 40.8244147, longitude: 29.4182057 },
  // Aynı Google işletme kaydının CID bağlantısı (0x2eb9d8bd24e25266 = 3366960503315386982).
  mapsUrl: "https://www.google.com/maps?cid=3366960503315386982",
  // İletişim sayfasındaki "Pazartesi – Cuma, 09:00 – 18:00" ile aynı.
  hours: { label: "Pazartesi – Cuma, 09:00 – 18:00", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  // Yerinde hizmet verilen bölgeler (merkez Gebze) + uzaktan tüm Türkiye.
  areaServed: [
    { type: "City", name: "Gebze" },
    { type: "AdministrativeArea", name: "Kocaeli" },
    { type: "City", name: "İstanbul" },
    { type: "Country", name: "Türkiye" },
  ],
  social: {
    instagram: "https://www.instagram.com/iso27001danismanlik/",
    x: "https://x.com/iso27001belge",
    linkedin: "",
  },
  tagline: "Bilgi güvenliğinde güvenilir danışmanlık ortağınız.",
  // Sitenin genel tanıtım metni: kök layout'un varsayılan OG/Twitter kartı,
  // PWA manifest'i ve Footer'daki tanıtım paragrafı buradan besleniyor.
  description:
    "ISO 27001 Danışmanlık; ISO 27001 belgelendirme, BGYS kurulumu, sızma testi (pentest), KVKK uyumu ve bilgi güvenliği eğitimleri alanında Gebze, Kocaeli ve İstanbul'da hizmet veren uzman danışmanlık firmasıdır.",
  // --- Admin / AI içerik sistemi ---
  shortName: "ISO 27001",
  // Canonical origin — the static site has always served (and Google has
  // indexed) the www host.
  baseUrl: "https://www.iso27001danismanlik.com",
  // Kök layout'taki title template (`%s | ${name}`) ile aynı olmalı: SEO
  // asistanı ve AI metaTitle uzunluğunu bu sonek dahil hesaplıyor.
  titleSuffix: " | ISO 27001 Danışmanlık",
  // AI system prompt'larındaki şirket tarifi.
  aiPersona:
    "ISO 27001 Danışmanlık — Türkiye'de ISO 27001/27701/22301/20000-1 belgelendirme danışmanlığı, BGYS kurulumu, sızma testi/pentest, KVKK uyumu ve bilgi güvenliği eğitimleri veren bir firma",
  adminCookie: "iso27001_admin_session",
} as const;

/** Toplam <title> 60 karakteri geçmesin diye metaTitle'ın (marka hariç) sınırları. */
export const META_TITLE_MAX = 60 - site.titleSuffix.length;
export const META_TITLE_MIN = META_TITLE_MAX - 14;
