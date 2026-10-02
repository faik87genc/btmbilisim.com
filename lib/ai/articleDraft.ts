import { z } from "zod";
import { site, META_TITLE_MAX, META_TITLE_MIN } from "@/lib/site";

// Shared between the server-only generator and the client editor — keep this
// file free of `server-only` and any Node/SDK imports.
export const ArticleDraftSchema = z.object({
  title: z
    .string()
    .describe(
      "Sayfadaki H1. Net, merak uyandıran, 50–65 karakter; odak anahtar kelimeyi (veya çok yakın varyantını) içerir. Tıklama tuzağı değil.",
    ),
  metaTitle: z
    .string()
    .describe(
      `Aramada görünen başlığın marka ÖNCESİ kısmı. ${META_TITLE_MIN}–${META_TITLE_MAX} karakter — sistem sonuna '${site.titleSuffix}' (${site.titleSuffix.length} kr) ekler, toplam 60'ı geçmemeli. Markayı SEN ekleme. Odak anahtar kelime ilk 3 kelimede geçer.`,
    ),
  metaDescription: z
    .string()
    .describe(
      "140–160 karakter (boşluk dahil, 145–155 ideal). Odak anahtar kelimeyi içerir, net bir fayda söyler ve yumuşak bir eylem çağrısıyla biter. Dolgu cümle yok.",
    ),
  slug: z
    .string()
    .describe(
      "URL yolu: yalnızca küçük harf, kelimeler arası tire, Türkçe karakter yok, EN FAZLA 5 kelime, odak anahtar kelimenin sadeleştirilmiş halini içerir. Tarih/sayı yok.",
    ),
  excerpt: z
    .string()
    .describe(
      "Liste kartı ve paylaşım için 1–2 cümlelik (140–200 karakter) özet. Meta açıklamadan farklı yazılır.",
    ),
  tags: z
    .array(z.string())
    .min(2)
    .max(4)
    .describe(
      "2–4 konu etiketi (ör. 'KVKK', 'Sızma Testi'). Türkçe, Baş Harf Büyük, tekil. Odak ve yardımcı anahtar kelimelerden türet.",
    ),
  content: z
    .string()
    .describe(
      [
        "Markdown gövde, HEDEF UZUNLUK kadar (tipik 1500–2500 kelime). KURALLAR:",
        "- '#' (H1) ASLA kullanma — '##' ile başla.",
        "- İlk paragraf = kısa cevap: 40–60 kelime, soruyu doğrudan yanıtlar, odak anahtar kelime ilk cümlede; ardından tek cümlelik yeniden çerçeveleme (kalıbı her yazıda farklı).",
        "- 6–10 adet '##' bölüm (SSS, Kaynaklar, kapanış dahil); gerektiğinde '###'. Seviye atlama yok. Her H2 bir alt arama niyetini karşılar.",
        "- EN AZ 1 Markdown tablo.",
        "- EN AZ 1 numaralı adım listesi VE bir '- [ ]' kontrol listesi.",
        "- ISO/IEC 27001:2022 madde ve Ek-A numaraları YALNIZCA verilen referans listesinden (A.5.1–A.8.34); KVKK maddeleri 1–33 arası ve doğru konuyla.",
        "- '## Sıkça Sorulan Sorular' + 5–8 tane '### Soru?' (soru işaretiyle biter) ve HEMEN altında 40–80 kelimelik düz paragraf yanıt (liste değil).",
        "- '## Kaynaklar': 2–5 izinli resmî/birincil kaynak linki (TÜRKAK/IAF/belgelendirme kuruluşu/rakip YOK).",
        "- En son bölüm: kısa kapanış + [formu doldurun](/#teklif) linkli tek ana CTA; telefon/e-posta yazma. Ardından italik 'Hazırlayan: ... uzman ekibi' satırı.",
        "- Gövdeye 3–5 DAHİLİ link (yalnızca İç Sayfa Kataloğu'ndaki gerçek yollar, '/slug/' biçiminde — asla '/blog/slug/' —, doğal çapa metniyle; EN AZ 2 farklı PARA SAYFASI (danışmanlık / sızma testi / eğitim hizmeti) bağlam içinde; brief'teki zorunlu linklerin hepsi).",
        "- Saha bilgisi: denetimde sık görülen bulgular, denetçinin istediği somut kanıtlar (kayıt/log/ekran/tutanak), teknik konularda doğrulanabilir yapılandırma/komut örneği ve '## Sık Yapılan Hatalar' bölümü. Birinci ağızdan vaka/müşteri/proje/yüzde uydurma yok.",
        "- Odak anahtar kelime yoğunluğu %0.8–%2.2; yardımcı anahtar kelimeler ve ilgili terimler doğal biçimde (tercihen alt başlıklarda) geçer.",
        "- Kısa cümle (ort. ≤ 20 kelime), kısa paragraf (≤ 4 cümle). Uydurma istatistik/yüzde/alıntı/kaynak/müşteri/vaka YOK.",
      ].join("\n"),
    ),
  internalLinkSuggestions: z
    .array(
      z.object({
        slug: z
          .string()
          .describe("İç Sayfa Kataloğu'ndaki GERÇEK yol, ör. '/iso-27001-nedir/'. Uydurma yok."),
        anchor: z.string().describe("Önerilen doğal çapa metni (2–6 kelime)."),
        reason: z.string().describe("Bu linkin okuyucuya neden faydalı olduğu, tek cümle."),
      }),
    )
    .min(3)
    .max(5)
    .describe(
      "Bu yazıdan verilecek 3–5 iç link önerisi — gövdede kullandıkların dahil. Yalnızca katalogdaki sayfalar; en az biri hizmet sayfası.",
    ),
  imagePrompts: z
    .array(
      z.object({
        role: z
          .enum(["hero", "inline"])
          .describe("hero = sayfa başındaki kapak görseli; inline = gövde içi görsel."),
        prompt: z
          .string()
          .describe(
            "Görsel üreticiye verilecek İNGİLİZCE betimleme (1–2 cümle). Sahne BU YAZININ KENDİ konusuna ait olmalı: içinde, okuyucunun yazının somut alanıyla (ör. finans → hesap makinesi, kağıda basılı mali tablolar, klasörler, madeni para yığını + belgeler; siber güvenlik → sunucu rafı, patch panel, dizüstüne takılı fiziksel kilit, akıllı kart; İK → kağıt organizasyon şeması, renkli dosyalar; lojistik → etiketli koliler, klipbord) doğrudan ilişkilendireceği EN AZ BİR nesne bulunsun. Yakın plan, tek net odak, doğal ışık. YASAK jenerik iş metaforları: kum saati, pusula, satranç taşı, ampul, merdiven, yapboz parçası, el sıkışma, hedef tahtası, roket, yükselen ok/grafik, labirent, deniz feneri, dişli çark. Ayrıca YASAK: geniş ofis odası, parlayan ekran/arayüz, kalabalık, kameraya bakan yüz, okunaklı metin/logo/grafik-etiketi (kağıda basılı belge serbest, ama üzerindeki yazı okunmasın). Stil ön ekini yazma (sistem ekler).",
          ),
        alt: z
          .string()
          .describe("Türkçe alt metin: görseli betimler, odak/yardımcı anahtar kelimeyi doğal içerir."),
        afterHeading: z
          .string()
          .describe(
            "inline görseller için: altına yerleştirileceği '##' başlığının TAM metni (kopyala). hero için boş string.",
          ),
      }),
    )
    .min(2)
    .max(4)
    .describe(
      "Tam 1 hero + 1–3 inline görsel önerisi. inline'lar farklı '##' bölümlere dağıtılır (afterHeading ile). Yazar bunları tek tıkla üretir.",
    ),
});

export type ArticleDraft = z.infer<typeof ArticleDraftSchema>;
