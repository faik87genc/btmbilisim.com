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
  /** /ekip/<dosya>.jpg — yoksa baş harfler gösterilir */
  photo?: string;
  email?: string;
  linkedin?: string;
};

export const testimonials: Testimonial[] = [];

// Onaylı iş ortakları / referanslar (sahibinin onayıyla, 2026-10-04).
export const references: Reference[] = [
  { name: "Balorman INT", logo: "/partners/balorman-int.png" },
  { name: "BLR Balorman", logo: "/partners/blr-balorman.png" },
  { name: "Palet Global", logo: "/partners/palet-global.png" },
];

export const team: TeamMember[] = [];

export const liveTestimonials = testimonials.filter((t) => t.consent.trim() && t.text.trim());
