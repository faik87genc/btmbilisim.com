// Ana sayfadaki "Sahadan" güven bölümünün verisi. Bölüm, aşağıdaki listeler
// boşken hiç görünmez; yalnızca gerçek ve doğrulanabilir veri girildiğinde çıkar.
//
// Kurallar (sahte yorumlar 2026-09-26'da kaldırıldı; tekrar olmasın):
// - Alıntılar: müşterinin YAZILI izni olmadan eklenmez. Kişi adı, firma adı ve
//   logo yok; sadece unvan + sektör. `consent` alanı boşsa alıntı gösterilmez.
// - Denetçilik tarafsızlığı: belgelendirme denetimine katıldığınız bir kuruluşun
//   alıntısı hiç eklenmez (ISO/IEC 17021-1).
// - Rakamlar: kayıtlarla gösterilebilecek değerler. "%100 başarı", "garanti",
//   "ilk denetimde kesin geçiş" gibi ifadeler yok.

export type TrustStat = {
  /** Kısa değer, ör. "4–5 ay" */
  value: string;
  /** Değerin ne olduğu, ör. "orta ölçekli firmalarda ortalama proje süresi" */
  label: string;
};

export type TrustQuote = {
  text: string;
  /** Unvan, ör. "BT Müdürü" */
  role: string;
  /** Sektör ve ölçek, ör. "Lojistik firması, 150 çalışan" */
  org: string;
  /** Yazılı iznin alındığı tarih ve kanal, ör. "2026-10-02 e-posta". Boşsa gösterilmez. */
  consent: string;
};

export const trust = {
  stats: [] as TrustStat[],
  quotes: [] as TrustQuote[],
  google: {
    // Google işletme kaydı (lib/site.ts mapsUrl ile aynı CID).
    reviewsUrl: "https://www.google.com/maps?cid=3366960503315386982",
    // Görünür yorum sayısı; 0 iken Google bağlantısı gösterilmez.
    reviewCount: 0,
  },
};

export const trustQuotes = trust.quotes.filter((q) => q.consent.trim() && q.text.trim());
export const showTrust = trust.stats.length > 0 || trustQuotes.length > 0 || trust.google.reviewCount > 0;
