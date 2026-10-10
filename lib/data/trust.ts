// Social proof shown on the site: customer testimonials, reference logos and
// the team page. Every list starts empty and each section stays hidden until
// real entries are added here — never placeholder people, quotes or logos.
//
// Rules:
// - Testimonials only with the customer's WRITTEN permission; record when and
//   how it was given in `consent` (an entry with an empty `consent` is not shown).
// - Reference logos only for actual customers who agreed to be listed. Put the
//   file under public/referanslar/ (PNG/SVG, transparent background).
// - Team members only with their consent; a photo is optional.
// - No unverifiable figures ("100+ müşteri", "%100 başarı", "garanti").
//   The one exception is `companyFacts` → `customers` below: the owner's own
//   figure (20+, 2026-10-10). Change only that line; never above what the owner
//   can document, and never repeat it by hand elsewhere (copy, meta, JSON-LD) —
//   read it from `companyFacts`.

/** One line of the stat rows (homepage ProofStrip, about page panel). */
export type CompanyFact = {
  key: "since" | "customers" | "support" | "iso";
  /** "2010", "20+" — only a value already on the site or given by the owner */
  value: string;
  /** "yılından beri sahada" */
  label: string;
  /** Where the value comes from; an empty source hides the line. */
  source: string;
};

export const companyFacts: CompanyFact[] = [
  { key: "since", value: "2010", label: "yılından beri sahada", source: "site" },
  // Owner-provided figure (2026-10-10); update here
  { key: "customers", value: "20+", label: "kurumsal müşteri", source: "Sahip beyanı, 2026-10-10" },
  { key: "support", value: "7/24", label: "teknik destek", source: "site.supportEmail" },
  { key: "iso", value: "ISO 27001", label: "baş denetçi deneyimi", source: "Ekip: Faik Genç, ISO 27001 LA" },
];

export const liveFacts = companyFacts.filter((f) => f.source.trim() && f.value.trim());

/** The live facts for `keys`, in that order (a page picks its own set). */
export function factsFor(keys: CompanyFact["key"][]): CompanyFact[] {
  return keys.flatMap((k) => liveFacts.filter((f) => f.key === k));
}

export type Testimonial = {
  text: string;
  /** Kişinin adı, ör. "Ahmet Y." (soyadı kısaltılabilir) */
  name: string;
  /** Unvan, ör. "Bilgi İşlem Müdürü" */
  role: string;
  /** Firma adı — isteğe bağlı; yazılmazsa `sector` gösterilir. */
  company?: string;
  /** Firma adı yerine, ör. "Üretim firması, Gebze" veya "Lojistik, Tuzla" */
  sector?: string;
  /** Yazılı iznin tarihi ve kanalı, ör. "2026-10-02 e-posta". Boşsa gösterilmez. */
  consent: string;
};

export type Reference = {
  name: string;
  /** /referanslar/<dosya>.png */
  logo: string;
  /** Sektör, ör. "Üretim" (referanslar sayfasında gruplanır) */
  sector?: string;
  url?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Kartın üstündeki kısa etiket, ör. "Kurucumuz" */
  label?: string;
  /** Uzmanlık etiketleri */
  tags?: string[];
  /** /ekip/<dosya>.jpg — yoksa baş harfler gösterilir */
  photo?: string;
  email?: string;
  linkedin?: string;
};

/**
 * Başarı hikâyesi (/referanslar/). Yalnızca gerçek bir müşteri ve yazılı izinle;
 * `consent` boşsa kart yayınlanmaz. Sonuç rakamları yalnızca müşterinin
 * onayladığı ölçümle yazılır — rakam yoksa `outcome` niteliksel kalır ya da boş bırakılır.
 */
export type CaseStory = {
  /** "musteri-adi" (ileride detay sayfası açılırsa) */
  slug: string;
  /** Müşterinin resmi / izinli adı */
  customer: string;
  /** /referanslar/<dosya>.svg|png — saydam zemin */
  logo: string;
  /** Sektör, ör. "Üretim" */
  sector?: string;
  /** İlçe / şehir, ör. "Gebze" */
  city?: string;
  /** Müşterinin onayladığı başlık cümlesi */
  headline: string;
  /** Zorluk (1–3 cümle) */
  challenge: string;
  /** BTM'nin yaptığı iş (1–3 cümle) */
  solution: string;
  /** Sonuç; rakam yalnızca müşteri onaylıysa */
  outcome?: string;
  /** Hizmet anahtarları (lib/services) → etiket + ilgili hizmet sayfasına link */
  services: string[];
  /** Alıntı ayrı izin ister; `consent` boşsa gösterilmez. */
  quote?: { text: string; name: string; role: string; consent: string };
  /** Müşteri izinli saha / ofis fotoğrafı; `consent` boşsa gösterilmez. */
  image?: { src: string; alt: string; consent: string };
  /** Proje yılı, ör. "2025" */
  year?: string;
  /** Yazılı iznin tarihi, kanalı ve izni veren kişi, ör. "2026-10-12 e-posta, X Bey". Boşsa YAYINLANMAZ. */
  consent: string;
};

export const testimonials: Testimonial[] = [];

// Başarı hikâyeleri — boş başlar; her kayıt gerçek müşteri + yazılı izin ister.
export const caseStories: CaseStory[] = [];

// Onaylı iş ortakları / referanslar (sahibinin onayıyla, 2026-10-04).
export const references: Reference[] = [
  { name: "Balorman INT", logo: "/partners/balorman-int.png" },
  { name: "BLR Balorman", logo: "/partners/blr-balorman.png" },
  { name: "Palet Global", logo: "/partners/palet-global.png" },
];

// Ekip (bilgiler kişilerin kendisinden / sahibinin onayıyla, 2026-10-04).
export const team: TeamMember[] = [
  {
    name: "Oğuzhan Batum",
    label: "Kurucumuz",
    role: "Kurucu · Genel Müdür",
    bio: "Anadolu Üniversitesi Yönetim Bilişim Sistemleri mezunu olan Batum, Bonna Premium Porcelain, D724 Bilişim Hizmetleri ve SERI Bilgi Teknolojileri'ndeki sistem destek uzmanlığı ve bilgi teknolojileri şefliği görevlerinde edindiği teknik destek, Active Directory ve BT operasyonları deneyimini BTM Bilişim çatısı altında işletmelerin altyapı ve destek süreçlerine aktarıyor.",
    tags: ["BT Operasyonları", "Teknik Destek", "Active Directory", "Sorun Giderme"],
    email: "oguzhanbatum@btmbilisim.com",
  },
  {
    name: "Faik Genç",
    label: "Ekibimiz",
    role: "Sistem & Network ve Bilgi Güvenliği Danışmanı · ISO 27001 Baş Denetçi",
    bio: "2010'dan bu yana BT altyapısı, sunucu, sanallaştırma ve ağ yönetiminde çalışan Genç, Yılport Holding ve Balorman'daki sistem/network ve bilgi işlem yöneticiliği görevlerinin ardından bilgi güvenliğine odaklandı. Bağımsız ISO 27001 Baş Denetçisi olarak BGYS kurulumu, risk değerlendirmesi, KVKK uyumu ve denetime hazırlık süreçlerini yürütüyor.",
    tags: ["ISO 27001 Lead Auditor", "BGYS & KVKK", "Sistem & Network", "CCNA · MCSE"],
  },
];

export const liveTestimonials = testimonials.filter((t) => t.consent.trim() && t.text.trim());
export const liveCaseStories = caseStories.filter((s) => s.consent.trim() && s.headline.trim());
