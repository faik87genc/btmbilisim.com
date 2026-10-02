import { z } from "zod";
import { site, META_TITLE_MAX, META_TITLE_MIN } from "@/lib/site";

// Shared between the server-only rewriter and the client editor panel — keep
// this file free of `server-only` and any Node/SDK imports (mirrors
// `articleDraft.ts`).
//
// A "short news" draft: a rewritten-from-source announcement, not a long SEO
// article. 2–4 tight paragraphs, an optional key-points list, an attribution
// line. The editor reviews it and publishes it as an ordinary blog post.
export const NewsDraftSchema = z.object({
  title: z
    .string()
    .describe(
      "Haber başlığı (H1). Türkçe, 45–70 karakter, duyuru dili. Kaynağın başlığını KOPYALAMA — aynı bilgiyi kendi cümlenle kur. Abartı/tık tuzağı yok.",
    ),
  metaTitle: z
    .string()
    .describe(
      `Aramada görünen başlığın marka ÖNCESİ kısmı. ${META_TITLE_MIN}–${META_TITLE_MAX} karakter — sistem sonuna '${site.titleSuffix}' (${site.titleSuffix.length} kr) ekler, toplam 60'ı geçmemeli. Markayı SEN ekleme.`,
    ),
  metaDescription: z
    .string()
    .describe(
      "120–160 karakter. Haberin özünü ve kurumsal okuyucu için önemini söyler. Dolgu yok.",
    ),
  slug: z
    .string()
    .describe(
      "URL yolu: yalnızca küçük harf, kelimeler arası tire, Türkçe karakter yok, EN FAZLA 6 kelime. Tarih/sayı yok.",
    ),
  excerpt: z
    .string()
    .describe(
      "Liste kartı için 1–2 cümlelik (140–200 karakter) özet. Meta açıklamadan farklı yazılır.",
    ),
  tags: z
    .array(z.string())
    .min(2)
    .max(4)
    .describe(
      "2–4 konu etiketi (ör. 'ISO 27001', 'KVKK', 'Mevzuat'). Türkçe, Baş Harf Büyük, tekil.",
    ),
  content: z
    .string()
    .describe(
      [
        "Markdown gövde. KURALLAR:",
        "- '#' (H1) ASLA. Kısa haber; gerekiyorsa en fazla 1–2 adet '##' alt başlık.",
        "- İlk paragraf 2–3 cümlede haberin özünü verir: ne oldu, kim açıkladı, kimi ilgilendiriyor.",
        "- Toplam 2–4 kısa paragraf. İstersen ortada '- ' ile 3–5 maddelik 'öne çıkanlar' listesi.",
        "- Tarih, tutar, oran, program/kurum adı gibi bilgiler kaynağa BİRE BİR sadık; kaynak vermiyorsa uydurma.",
        "- Kaynak metni parafraz etme — bilgiyi al, sıfırdan kendi cümlelerinle yaz. Cümle yapısı ve akış özgün olsun.",
        "- Uygunsa son bir kısa paragrafta 'Notumuz:' ile bilgi güvenliği/uyum açısından pratik bir çıkarım (yalnızca kaynağın desteklediği kadar).",
        "- Gövdenin en sonunda tek satır kaynak atfı: 'Kaynak: [KAYNAK ADI](KAYNAK URL)'. URL yoksa yalnızca kaynak adını yaz.",
        "- Sade, güven veren duyuru dili. 'Bu haberde', 'sonuç olarak', pazarlama abartısı YOK.",
      ].join("\n"),
    ),
  heroImagePrompt: z
    .string()
    .describe(
      "Kapak görseli için İNGİLİZCE betimleme (1–2 cümle). Haberin somut alanına ait tek net sahne (ör. mevzuat → 'mühürlü resmî bir dosya ve dolmakalem, oblik açı'; siber güvenlik → 'yamalı ağ kabloları ve bir sunucu rafının yakın çekimi'). YASAK: geniş ofis, ekran/arayüz, kalabalık, kameraya bakan yüz, okunaklı metin/logo. Stil ön ekini yazma.",
    ),
  heroImageAlt: z
    .string()
    .describe("Türkçe alt metin: kapak görselini betimler, haberin konusunu doğal içerir."),
});

export type NewsDraft = z.infer<typeof NewsDraftSchema>;
