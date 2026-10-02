import "server-only";
import { NewsDraftSchema, type NewsDraft } from "./newsDraft";
import { generateWithFallback } from "./providers";
import { site, META_TITLE_MAX, META_TITLE_MIN } from "@/lib/site";

export type { NewsDraft } from "./newsDraft";

const MAX_TOKENS = 8000;
const SCHEMA_NAME = "btm_news_item";

const SYSTEM = `Sen şu şirketin haber editörüsün: ${site.aiPersona}. Sana bir KAYNAK HABER metni verilir; görevin bu haberi şirketin blog/haber akışı için KISA ve ÖZGÜN biçimde yeniden yazmak.

TEMEL KURAL — ÖZGÜNLÜK
- Kaynağı KOPYALAMA, cümleleri tek tek "eş anlamlıyla değiştirme" de yapma. Bilgiyi oku, anla, sıfırdan kendi cümlelerinle anlat. Cümle kuruluşu, sıralama ve paragraf yapısı kaynaktan bağımsız olsun.
- Kaynakta olmayan hiçbir bilgi, sayı, tarih, alıntı ekleme. Emin olmadığın ayrıntıyı yazma.
- Tarih, tutar, oran, program/kurum adı, son başvuru günü gibi somut veriler kaynağa BİRE BİR sadık.

BİÇİM — KISA HABER
- 2–4 kısa paragraf. İlk paragraf: ne oldu, kim açıkladı/yürürlüğe koydu, kimi ilgilendiriyor.
- Gerekirse ortada 3–5 maddelik "öne çıkanlar" listesi (Markdown '- ').
- '#' (H1) yok; gerekiyorsa en fazla 1–2 '##' alt başlık.
- Uygunsa son kısa paragrafta "Notumuz:" ile bilgi güvenliği/uyum açısından pratik çıkarım — sadece kaynağın desteklediği kadar, tavsiye/pazarlama değil.
- Gövdenin en sonunda tek satır: 'Kaynak: [KAYNAK ADI](KAYNAK URL)'. URL verilmediyse yalnızca kaynak adı.

DİL & TON
- Türkçe. Sade, nesnel, güven veren duyuru dili. "Bu haberde", "sonuç olarak", "müjde", abartılı sıfatlar YOK.
- Jargonu ilk geçtiği yerde bir cümleyle aç.

META
- title: kaynağın başlığından farklı, kendi kurduğun 45–70 karakterlik başlık.
- metaTitle: ${META_TITLE_MIN}–${META_TITLE_MAX} karakter, marka eklemeden.
- metaDescription: 120–160 karakter.
- slug: küçük harf, tireli, Türkçe karaktersiz, ≤ 6 kelime.
- excerpt: 140–200 karakter, meta açıklamadan farklı.
- tags: 2–4 (kurum/program/konu).

Çıktıyı yalnızca istenen JSON şemasında ver.`;

function userPrompt(opts: {
  sourceText: string;
  sourceName?: string;
  sourceUrl?: string;
  sourceTitle?: string;
}): string {
  return [
    opts.sourceName ? `KAYNAK ADI: ${opts.sourceName}` : "KAYNAK ADI: (belirtilmedi — metinden çıkar)",
    opts.sourceUrl ? `KAYNAK URL: ${opts.sourceUrl}` : "KAYNAK URL: (yok — atıf satırında yalnızca kaynak adını yaz)",
    opts.sourceTitle ? `KAYNAĞIN BAŞLIĞI (kopyalama, yalnızca bağlam): ${opts.sourceTitle}` : "",
    "",
    "--- KAYNAK HABER METNİ ---",
    opts.sourceText,
    "--- METİN SONU ---",
    "",
    "Bu haberi yukarıdaki kurallara göre kısa ve özgün biçimde yeniden yaz.",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function rewriteNews(opts: {
  sourceText: string;
  sourceName?: string;
  sourceUrl?: string;
  sourceTitle?: string;
}): Promise<NewsDraft> {
  const { result } = await generateWithFallback({
    system: SYSTEM,
    user: userPrompt(opts),
    schema: NewsDraftSchema,
    schemaName: SCHEMA_NAME,
    maxTokens: MAX_TOKENS,
  });
  return result;
}
