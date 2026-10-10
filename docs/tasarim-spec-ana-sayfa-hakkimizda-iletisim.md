# BTM Bilişim — Tasarım Spesifikasyonu: Ana Sayfa, Hakkımızda, İletişim

Tarih: 10.10.2026 · Hazırlayan: Tasarım ekibi · Durum: Geliştiriciye devir için hazır · **Bu belgede kod değişikliği yapılmadı.**

Önceki belge: `docs/tasarim-kurumsal-kimlik-raporu.md` (Uppoint ve BTM karşılaştırma denetimi). Bu belge o raporu tekrar etmiyor, onun üzerine kuruyor. O rapordaki P1 maddeleri (Referanslar üst menüde, header'da "Ücretsiz Keşif" butonu) canlı sitede uygulanmış durumda.

İncelenenler (10.10.2026, 1366 px masaüstü ve 375 px mobil):
- uppoint.com.tr: `/`, `/neden-uppoint/`, `/iletisim/`, footer
- www.btmbilisim.com: `/`, `/hakkimizda/`, `/iletisim/`
- Kaynak kod: `app/(site)/ensa.css`, `app/(site)/page.tsx`, `app/(site)/iletisim/page.tsx`, `components/site/ArticleView.tsx` (`CoreBody`), `components/ensa/*` (Button, SectionHeading, ProofStrip, PageHero, FaqSection, Footer, ContactCta), `components/ContactForm.tsx`, `components/QuoteForm.tsx`, `components/FieldErrors.tsx`, `components/site/ConsentMap.tsx`, `components/btm/HomeSections.tsx`, `components/btm/TeamCards.tsx`, `lib/site.ts`, `lib/data/trust.ts`, `lib/data/fallback-pages.json`, `lib/data/image-variants.json`, `public/**` görselleri

---

## 0) Uppoint'i bütünlüklü gösteren ne? (ölçülen değerler)

| Unsur | Uppoint'te ölçülen | BTM'deki karşılığı (bu spesifikasyonda) |
|---|---|---|
| Sınırlı palet | Gövde zemini `amber-50` (oklch 0.987 0.022 95, kremimsi), metin `slate-900`, tek vurgu zümrüt yeşili (eyebrow), CTA siyah veya sarı | Beyaz, **tek soğuk ton** `tint-50 #eef3f9`, lacivert yapı, turuncu yalnızca sinyal |
| Kart sistemi | Büyük "panel" kartlar: 20–28 px radius, `0 24px 60px -30px rgb(15 23 42/.45)` gölge, 1 px açık kenarlık, beyaz → slate-50 radyal degrade | `rounded-panel` (16 px) + mevcut `shadow-card`, kenarlık `navy-950/10`, degrade yok |
| Bölüm ritmi | `py-20` (80 px), `max-w-6xl`, H2 30 px/600/-0.75 px | `py-20 md:py-24` (mevcut), `max-w-7xl`, H2 40 px |
| Eyebrow → H2 kalıbı | 12 px, büyük harf, 1.2–3.6 px aralık, yeşil; hemen altında H2 | Mevcut `SectionHeading` (mono, turuncu çizgi + gold-800). Tüm bölümlerde zorunlu |
| Bölüm başına bir fotoğraf | Referans hikâyesinde tek büyük görsel, partner bloğunda tek görsel | Bölüm başına en fazla 1 görsel, hepsi aynı `photo-tone` işlemiyle |
| Rakam/kanıt satırı | Büyük rakam + etiket + 1 satır açıklama, ince ayraçlarla 3 satır | `StatRow`, verisi tek dosyadan (`lib/data/trust.ts`) |
| İletişim | İki sütun: solda kanal kartları, sağda koyu, yapışkan form kartı | Aynı iskelet, BTM tonunda; **görünür etiketler korunur** (Uppoint yalnızca placeholder kullanıyor, erişilebilirlik açığı) |
| Footer | Unvan, MERSİS, ticaret sicil, 5 yasal bağlantı | `lib/site.ts → legal` bloğu, eksik alanlar sahipten |
| SSS | Tam genişlikte, ince kenarlıklı satırlar | Mevcut `FaqSection`, sadece ölçü uyumu |

Uppoint'te gözlenen ve **kopyalanmayacak** zayıflıklar: mobil iletişim sayfasında yatay taşma (375 px'te metin sağdan kesiliyor), placeholder etiketli form alanları, H1'in hesaplanan stilinin 16 px görünmesi (görsel başlık başka bir öğe), doğrulanamayan rakamlar ("1100+", "10.000+").

---

## 1) Tasarım ilkeleri (BTM'ye özgü)

1. **Lacivert yapı taşır, turuncu yalnızca sinyal verir.** Uppoint'in kremi ve siyah pill'leri yerine BTM'nin zemini beyaz ve tek soğuk ton (`tint-50`), yapısı lacivert. Turuncu bir ekranda en fazla iki yerde görünür: birincil CTA ve eyebrow çizgisi. Butonlar köşeli kalır (8 px), pill kullanılmaz. Bu, Uppoint'ten ilk bakışta ayrılan imzadır.
2. **Mühendislik hassasiyeti görünür olmalı.** Mono etiketler (`font-mono`, büyük harf), numaralı adımlar (`01–04`), ince ayraçlı spesifikasyon tablosu gibi duran rakam satırları ve isteğe bağlı 1 px "blueprint" ızgara. Yumuşak degradeler ve süs gölgeleri kullanılmaz. Her ölçü bir token'a bağlanır.
3. **Önce güvenlik.** Her ana bölüm güvenlik bakışına bağlanır ("ISO 27001 baş denetçi deneyimi", KVKK, sızma testi). Kanıt rozet yığını olarak değil, sakin bir "künye/credential" satırı olarak sunulur. Partner rozeti ya da sertifika logosu yalnızca belgesi varken eklenir.
4. **Tek görsel dil.** Bölüm başına en fazla bir fotoğraf kullanılır. Tüm fotoğraflar aynı lacivert renk işlemini (`.photo-tone`) ve aynı kırpma oranlarını (16:10 veya 4:3) alır. Böylece farklı kaynaklardan gelen görseller tek set gibi okunur. İnsan içeren stok fotoğraf kullanılmaz; ekip ve ofis yalnızca gerçek fotoğrafla gösterilir.
5. **Ölçülü hareket, anında geri bildirim.** Hareket yalnızca opaklık ve en fazla 14 px kayma, tek seferlik. Basışta `scale(0.97)` geri bildirimi mevcut, korunur. `prefers-reduced-motion` açıkken kayma yok, sadece görünürlük. Yeni bölümlerde aurora, float veya glow animasyonu kullanılmaz. Malzeme (yarı saydam header) mevcut kurallarıyla kalır.

---

## 2) Token kararları

Hepsi `app/(site)/ensa.css` içinde. `app/globals.css` admin paneline ait, **dokunulmaz**.

### 2.1 Renkler

| Rol | Token / Tailwind | Hex | Not |
|---|---|---|---|
| Sayfa zemini (bölüm varsayılanı) | `bg-white` | `#ffffff` | |
| **Tek tonlu bölüm zemini (YENİ)** | `--tint-50` → `bg-tint-50` | `#eef3f9` | Bu üç sayfada `bg-paper-50` *bölüm* zeminlerinin yerine geçer. Beyazdan görünür biçimde ayrılır (paper-50 `#f6f8fc` çoğu ekranda beyazla birleşiyor) |
| Kart içi inset / sakin yüzey | `bg-paper-50` | `#f6f8fc` | Yalnızca kart içi kutular, form fallback, kod blokları |
| Yer tutucu / harita onay kutusu | `bg-paper-100` | `#e9eff8` | Bölüm zemini olarak **kullanılmaz** |
| Koyu bölüm | `bg-navy-950` | `#072b55` | Hero, ProofStrip/StatRow, yazılım bandı, footer, form paneli |
| Koyu hero degrade | `.bg-brand-gradient` | mevcut | Sadece ana sayfa hero |
| Kenarlık (açık zemin) | `border-navy-950/10` | `rgb(7 43 85 / .10)` | Tüm kartlarda tek değer |
| Kenarlık (koyu zemin) | `border-white/10` (ayraç), `ring-white/15` (kart) | | |
| Başlık metni | `text-navy-800` (H2), `text-ink-900` (H3, gövde vurgusu) | `#0e4a8b`, `#0f1b2d` | |
| Gövde metni | `text-slate-500` (açık zeminde ikincil), `text-slate-600` | `#51607a`, `#3f4d66` | `slate-400 #8796b0` açık zeminde metin için **yasak** (beyazda 2,99:1) |
| Koyu zeminde gövde | `text-slate-300` | `#c3d1e6` | |
| Vurgu (dolgu) | `bg-gold-500` | `#e8812f` | Yalnızca birincil buton ve küçük işaretler |
| Vurgu (metin/ikon, açık zemin) | `text-gold-700` / `text-gold-800` | `#8f480f` / `#7a3c0b` | `gold-600` açık zeminde ≥14 px kalın metin ya da ikon için |
| Vurgu (koyu zemin) | `text-gold-300` | `#f4b47e` | |
| Başarı noktası | `#0f7a40` | | Mevcut "7/24" yeşil nokta |
| Hata (açık zemin) | `#b42318` | | Mevcut `.field-err` |
| **Hata (koyu zemin, YENİ)** | `--err-on-dark` | `#ffb4a8` | Koyu form paneli için |

Doğrulanan kontrast oranları (WCAG 2.2):

| Ön plan / Zemin | Oran | Sonuç |
|---|---|---|
| `slate-500 #51607a` / `tint-50 #eef3f9` | 5,70 | AA |
| `gold-800 #7a3c0b` (eyebrow) / `tint-50` | 7,59 | AAA |
| `navy-800` (H2) / `tint-50` | 7,94 | AAA |
| `navy-950` metin / `gold-500` buton | 5,12 | AA |
| `slate-300` / `navy-950` | 9,14 | AAA |
| `slate-200 #dbe4f1` (koyu form etiketi) / `navy-950` | 11,02 | AAA |
| `#ffb4a8` (koyu hata) / `navy-950` | 8,31 | AAA |
| `gold-300` (odak halkası) / `navy-950` | 7,86 | ≥3:1 |
| `gold-600 #a85512` / `tint-50` | 4,74 | AA (normal metin) |
| **`gold-500` kenarlık / beyaz** | **2,76** | **Odak göstergesi için yetersiz (1.4.11)** → bkz. 2.8 |

### 2.2 Tek tonlu zemin ve isteğe bağlı blueprint dokusu (YENİ)

```css
/* :root */
--tint-50: #eef3f9;
--err-on-dark: #ffb4a8;
/* @theme inline */
--color-tint-50: var(--tint-50);
--radius-panel: 1rem;            /* rounded-panel */
```

- `@layer base` içindeki odak kuralı `:is(.bg-white, .bg-paper-50) :focus-visible` → `:is(.bg-white, .bg-paper-50, .bg-tint-50) :focus-visible` olarak genişletilmeli.
- `.bg-blueprint` (opsiyonel, `@layer utilities`): `background-image: linear-gradient(rgb(255 255 255 / .05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .05) 1px, transparent 1px); background-size: 32px 32px;`. Yalnızca koyu zeminde, hero ve StatRow panelinde `.bg-dots` yerine denenebilir. Ekranda aynı anda iki doku kullanılmaz.

### 2.3 Kart ve panel

İki seviye var, üçüncüsü eklenmez.

| Seviye | Kullanım | Sınıflar | Ölçü |
|---|---|---|---|
| **Kart** | Hizmet karosu, kanal kartı, ekip kartı, SSS satırı | `rounded-card border border-navy-950/10 bg-white` + etkileşimliyse `shadow-card hover:shadow-lift` | radius 10 px (`--radius-card`, mevcut) · padding `p-5` mobil / `md:p-6` · başlık–metin arası `mt-1.5` |
| **Panel** (YENİ seviye) | Bir bölümün tüm içeriğini taşıyan büyük kutu: StatRow paneli, form paneli, künye kartı | `rounded-panel border border-navy-950/10 bg-white shadow-card` (açık) veya `rounded-panel bg-navy-950 ring-1 ring-white/10 shadow-lift` (koyu) | radius 16 px · padding `p-6 md:p-10` |

- `tint-50` zemin üstündeki kartlar **beyaz**, beyaz zemin üstündeki kartlar **beyaz + kenarlık** olur. Beyaz zemin üstünde `bg-paper-50` kart kullanılmaz; mevcut IT danışmanlık adım kartları (`bg-paper-50`) bu kurala göre beyaz + kenarlığa çevrilir.
- Kart üstü vurgu çizgisi (`border-t-4 border-gold-500`) yalnızca hero'daki "Bize doğrudan ulaşın" kartında kalır. Başka yerde kullanılmaz; tekrarlanırsa imza değeri düşer.
- `.form-card` şu an `border-radius: 2px`. Bu, sistemdeki tek tutarsız radius. `var(--radius-panel)` yapılmalı (QuoteForm ve ContactForm otomatik düzelir).

### 2.4 Butonlar

`components/ensa/Button.tsx` varyantları korunur, isimlendirme rolüne göre sabitlenir:

| Rol | Varyant | Görünüm | Nerede |
|---|---|---|---|
| Birincil | `primary` | `bg-gold-500 text-navy-950`, hover `gold-400` | Bir bölümde en fazla **bir** tane |
| İkincil | `navy` | `bg-navy-800 text-white`, hover `navy-700` | Açık zeminde ikinci eylem |
| Hayalet (açık) | `ghost-light` | `border-navy-950/15 text-navy-800` | "Tüm hizmetler" gibi bölüm sağ üst bağlantıları |
| Hayalet (koyu) | `ghost-dark` | `border-white/30 text-white` | Koyu bantlar |

- Ölçü: `px-6 py-3 text-sm font-semibold`, yükseklik ≥ 44 px (dokunma hedefi). Radius `rounded-control` (8 px). Pill kullanılmaz.
- Hover'daki `-translate-y-0.5` korunur. Reduced motion'da `transform: none` (mevcut kural).
- İkon: sağda `ArrowRight h-4 w-4`, yalnızca yönlendiren butonlarda.
- `components/ensa/ContactCta.tsx` ve `Footer.tsx` içindeki elle yazılmış buton sınıfları sonraki adımda `Button`'a taşınabilir (bu kapsamda zorunlu değil).

### 2.5 Tipografi ölçeği (boyuta özgü aralık ve satır yüksekliği)

Space Grotesk (`font-display`) başlıklar, IBM Plex Sans gövde. `ensa.css` `@layer base` h1/h2 kuralları korunur; bileşenler aşağıdaki sınıfları kullanır.

| Rol | Masaüstü | Mobil | Ağırlık | line-height | letter-spacing | Renk |
|---|---|---|---|---|---|---|
| Display (ana sayfa H1) | 56 px `md:text-[3.5rem]` | 36 px `text-4xl` | 700 | 1.08 | -0.022em | white / gold-300 vurgu |
| H1 (PageHero) | 48 px `md:text-5xl` | 36 px | 600 | 1.1 | -0.022em | paper-50 |
| H2 (SectionHeading) | **40 px** `md:text-[2.5rem]` (mevcut 44 px'ten indirilir) | 30 px `text-3xl` | 600 | 1.12 | -0.018em | navy-800 / white |
| H3 (kart başlığı) | 18 px `text-lg` | 18 px | 600 | 1.3 | -0.01em | ink-900 |
| Stat rakamı | 40 px `md:text-[2.5rem]` | 30 px | 600 | 1.0 | -0.02em, `tabular-nums` | white / navy-800 |
| Lead | 18 px `text-lg` | 17 px | 400 | 1.65 | 0 | slate-300 / slate-500 |
| Gövde | 16 px | 16 px | 400 | 1.7 | 0 | slate-500 / slate-600 |
| Küçük | 14 px `text-sm` | 14 px | 400 | 1.6 | 0 | slate-600 |
| Eyebrow / etiket | 12 px `font-mono text-xs uppercase` | 12 px | 400 | 1.3 | **+0.2em** | gold-800 / gold-300 |

Kurallar: Büyüdükçe aralık negatife, küçüldükçe pozitife gider. Gövde metni 0'da kalır. Hiyerarşi yalnızca boyutla değil ağırlık + boyut + satır yüksekliği setiyle kurulur. Tüm ölçüler `rem` cinsinden (tarayıcı yazı boyutu ayarına uyum). Başlıklarda `text-balance` korunur.

### 2.6 Boşluk ve bölüm ritmi

- Bölüm: `py-20 md:py-24` (80/96 px). Hero ve PageHero hariç tüm bölümler aynı.
- Bölüm içi: eyebrow → H2 `mb-4`, H2 → açıklama `mt-4`, başlık bloğu → içerik `mt-12`.
- Izgara aralığı: kartlarda `gap-4` (mobil) / `lg:gap-6`. Paneller arası `gap-10 lg:gap-16`.
- Konteyner: `Container` (max-w-7xl, `px-6 md:px-10`). Okuma sütunu `max-w-3xl`.
- Arka plan sırası kuralı: aynı zemin rengi art arda iki bölümde kullanılmaz. İzin verilen zeminler yalnızca `white`, `tint-50`, `navy-950`.

### 2.7 İkon stili

- `lucide-react`, `strokeWidth={1.75}` (yeni ekranlarda; mevcut 2 değerindekiler zamanla). Boyut 20 px (`h-5 w-5`) kart içinde, 24 px (`h-6 w-6`) karo içinde.
- **İkon karosu** (YENİ yardımcı bileşen önerisi `components/ensa/IconTile.tsx`): `inline-flex h-11 w-11 items-center justify-center rounded-control bg-navy-800 text-white` (koyu zeminde `bg-white/10 ring-1 ring-white/20`). İletişim sayfasındaki yuvarlak turuncu ikon çemberleri (`rounded-full bg-gold-500/10 text-gold-700`) bu karoya çevrilir. Böylece sitede tek ikon şekli kalır.
- İkonlar her zaman `aria-hidden="true"`. Anlam metinde taşınır.

### 2.8 Odak ve form durumu düzeltmeleri (AA)

- `.form-input:focus { border-color: var(--gold-500) }` → beyaz zeminde 2,76:1, odak göstergesi için yetersiz. `.form-field` ile aynı olacak şekilde `outline: 2px solid var(--navy-800); outline-offset: 1px; border-color: var(--navy-800)` yapılmalı.
- `.quote-chip:has(input:checked)` durumu yalnızca turuncu kenarlıkla değil, mevcut zemin tonu ve kalınlıkla da gösteriliyor, bu yeterli. Ek olarak kenarlık `gold-600` yapılırsa durum daha net görünür (5,29:1).

### 2.9 Fotoğraf işlemi (YENİ yardımcı sınıf)

```css
/* @layer components — farklı kaynaklı görselleri tek set gibi gösterir */
.photo-tone { position: relative; overflow: hidden; border-radius: var(--radius-panel); background: var(--navy-950); }
.photo-tone img { display: block; width: 100%; height: 100%; object-fit: cover; filter: saturate(.8) contrast(1.03); }
.photo-tone::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(180deg, rgb(7 43 85 / 0) 45%, rgb(7 43 85 / .35)), rgb(7 43 85 / .12);
  mix-blend-mode: multiply; }
@media (prefers-contrast: more) { .photo-tone::after { display: none; } }
```

Kırpma oranları: yatay bölümlerde `aspect-[16/10]`, yan sütunda `aspect-[4/3]`. Görsellerde `next/image` ile `sizes` verilir (mevcut `IMG_SIZES` / `lib/imageVariants.ts → imageInfo()` 640/960 varyantlarını biliyor).

### 2.10 Hareket

- Mevcut `MotionReveal` (opaklık 0,35 → 1, 14 px) korunur. Yeni bölümlerde **bölüm başına tek reveal** kullanılır: başlık bloğu ve ızgara birlikte, kart kart kademeli değil (en fazla 3 öğe, 50 ms).
- Sayı animasyonu (`CountUp`) StatRow'da **kullanılmaz**. Rakamlar statik olur; kanıt animasyonla değil netlikle verilir.
- SSS açılışında yalnızca chevron döner (mevcut). İçerik yükseklik animasyonu eklenmez.
- `prefers-reduced-motion`, `prefers-reduced-transparency` ve `prefers-contrast` kuralları mevcut; yeni sınıflar (`.photo-tone`, `.bg-blueprint`) bunlara eklenir.

---

## 3) Sayfa sayfa bölüm listesi

Genel kural: H1 metinleri, `metadata` (title/description/canonical/OG), JSON-LD çağrıları (`organizationJsonLd`, `websiteJsonLd`, `FaqSection` FAQPage, `PageHero` BreadcrumbList) ve SEO metinleri **olduğu gibi kalır**. Değişen şey yerleşim, zemin, kart ve görsel.

### 3.1 Ana sayfa `/` (`app/(site)/page.tsx`)

Zemin sırası (yeni): Hero `brand-gradient` → StatRow `navy-950` → IT Danışmanlık `white` → Hizmet Alanları `tint-50` → Yazılım `navy-950` → Güven/Referans `tint-50` (yalnızca veri varsa) → Teklif `white` → SSS `tint-50` → Blog `white`.

Referans bölümü yoksa Yazılım (`navy`) → Teklif (`white`) sırası da kurala uyar.

**H1 · Hero (değişmez, ince ayar)**
- Amaç: Tek mesaj, bir CTA, doğrudan hat.
- Yerleşim: Mevcut `lg:grid-cols-[1.2fr_0.8fr]`. Mobilde iletişim kartı gizli kalır (alt sabit çubuk var).
- İnce ayar: pill'ler `rounded-full` → `rounded-control` (köşeli, ilke 1). İsteğe bağlı olarak `.bg-dots` → `.bg-blueprint`.
- Görsel: Yok (LCP metin kalsın).
- Metin: H1 ve lead aynen kalır.

**S1 · StatRow — "BTM Bilişim kısaca" (ProofStrip yerine)**
- Amaç: Uppoint'in rakam satırının dürüst karşılığı.
- Bileşen: `components/ensa/ProofStrip.tsx` korunur, `FACTS` sabiti kaldırılır, veri `lib/data/trust.ts → companyFacts` üzerinden okunur (bkz. 3.4).
- Yerleşim: Masaüstünde 4 sütun, `divide-x divide-white/10`. Her hücrede rakam (stat rakamı ölçeği), altında etiket (`text-sm text-slate-300`). Mobilde 2×2. `dl/dt/dd` yapısı korunur.
- Ana sayfa içeriği (sırayla):

| value | label | Kaynak |
|---|---|---|
| `2010` | yılından beri sahada | Sitede mevcut |
| `20+` | kurumsal müşteri | Sahibin verdiği rakam (10.10.2026, sohbet; son düzeltme). Tek kaynak: `lib/data/trust.ts` |
| `7/24` | teknik destek | `site.supportEmail.label` |
| `{products.length}` | kendi yazılım ürünü | `lib/products.ts` (hesaplanan) |

- Not: "6 uzmanlık alanı" hücresi "20+ kurumsal müşteri" ile yer değiştirir. Alanlar zaten bir sonraki bölümde listeleniyor.

**S2 · IT Danışmanlık (white): metin + fotoğraf + 4 adım**
- Amaç: "Her şeyin temelinde danışmanlık" mesajı ve güvenlik künyesi.
- Yerleşim (masaüstü): Üst satır `lg:grid-cols-[1fr_1fr] gap-16 items-center`. Solda `SectionHeading` ("IT Danışmanlık" / mevcut H2 / mevcut açıklama), ISO 27001 credential kutusu ve `navy` buton. Sağda fotoğraf (`.photo-tone aspect-[4/3]`). Alt satırda `mt-12` ile 4 adım tek sıra (`lg:grid-cols-4`), her kart beyaz + kenarlık. Başlık üstünde mono `01 · Keşif ve analiz` numarası.
- Mobil: Başlık → credential → buton → fotoğraf (`aspect-[16/10]`) → adımlar tek sütun.
- Credential kutusu: `bg-paper-50` → `bg-tint-50` (beyaz zemin üstünde sakin inset). İkon `BadgeCheck`, metin aynen.
- Görsel: `/wp-content/uploads/2025/07/ag-ve-sistem-altyapi-cozumleri-3.webp` (940×627, 640w varyantı var; rack önünde patch kablolama, insan yok). Alt metin: "Kabinette düzenli patch kablolama ve switch portları". `sizes="(min-width:1024px) 600px, 100vw"`.
- Yeniden kullanım: `SectionHeading`, `Button`, `MotionReveal`, `.photo-tone`.

**S3 · Hizmet Alanları (tint-50)**
- Amaç: 6 alanın sade karoları ve risk testi.
- Yerleşim: Mevcut ızgara korunur. Kartlar beyaz + `shadow-card`, ikon karosu `IconTile`. Risk skoru bandı: `bg-gold-100 border-gold-300` korunur. Bu, sayfadaki tek sıcak yüzey olduğu için kalır.
- Görsel: Yok (karolar yeterli).

**S4 · Yazılım & Web (navy-950): ürün görseli eklenir**
- Amaç: Kendi ürünleri, rakipte olmayan farklılaşma.
- Yerleşim (masaüstü): `lg:grid-cols-[1fr_1fr]`. Solda `SectionHeading tone="dark"`, iki hizmet kartı alt alta, `ghost-dark` buton. Sağda ürün görseli `rounded-panel ring-1 ring-white/10` (photo-tone **uygulanmaz**, ürün renkleri korunur).
- Mobil: Görsel başlıktan sonra, kartlardan önce, `aspect-[16/9]`.
- Görsel: `/hero/atlas-1.jpg` (1600×900, gerçek BTM ürünü Atlas). Alt metin: "Atlas çok şirketli finans ve bütçe paneli, dizüstü ekranında". Not: `public/products/atlas/gosterge-paneli.png` kullanılmamalı; ekranda gri sansür kutuları ve müşteriye ait ürün adları görünüyor.
- Görsele bağlantı: `/yazilim-urunlerimiz/atlas/`.

**S5 · Güven / Referanslar (tint-50, yalnızca veri varsa)**
- Bileşen: `components/btm/HomeSections.tsx → TrustSection`. Logo kartları beyaz + kenarlık, logolar renkli (gri ton + hover efekti kaldırılır; tutarlılık için `/referanslar/` ile aynı). Sağ üstte `ghost-light` "Tüm referanslar".
- `liveCaseStories` doluysa ilk hikâye `components/btm/CaseStoryCard.tsx` ile logoların üstünde gösterilir. Boşsa hiç render edilmez.

**S6 · Ücretsiz Keşif & Teklif `#teklif` (white)**
- Mevcut iki sütun korunur. `QuoteForm` panel spesifikasyonunu alır (`.form-card` radius düzeltmesi yeterli). Yanına `shadow-card` eklenir.
- Sol sütun maddelerinin altına küçük künye satırı: `site.hours.label` · `site.phone.display` (mono etiket + değer).

**S7 · SSS (tint-50)** · `FaqSection` (zemin `bg-paper-50` → `bg-tint-50`; `<details>` kartları beyaz kalır). İçerik ve FAQPage JSON-LD aynen.

**S8 · Blog (white)** · `HomeBlogSection` aynen.

### 3.2 Hakkımızda `/hakkimizda/`

**Kaynak:** Ayrı bir rota yok. İçerik, DB'deki `hakkimizda` satırından (`lib/data/fallback-pages.json`'da yedeği var) `app/(site)/[slug]/page.tsx` → `components/site/ArticleView.tsx → CoreBody` ile render ediliyor. Metadata `contentMetadata(page)` üzerinden geliyor (metaDescription DB'de). **Markdown içeriği, başlık ve metadata değişmez.** Değişiklik yalnızca `CoreBody` içinde `page.slug === "hakkimizda"` dalında yapılır (mevcut ekip bölümü de aynı dalda). Önerilen ayrım: yeni `components/btm/AboutLayout.tsx` oluşturulur ve `CoreBody` hakkımızda için bunu çağırır.

Zemin sırası: PageHero `navy-950` → Künye/Stat paneli (hero'ya bindirilmiş, `white`) → İçerik + yan kart `tint-50` → Ekip `white` → Referans şeridi `tint-50` (veri varsa) → ContactCta `navy-950`.

**A · PageHero (değişmez)** · H1 "Hakkımızda", lead = `page.excerpt`, breadcrumb + BreadcrumbList JSON-LD. Alt boşluk `pb-28 md:pb-32` (panel bindirmesi için).

**B · Kısaca BTM paneli (YENİ, hero'ya bindirilmiş)**
- Amaç: Uppoint "Neden" sayfasındaki rakam kartlarının dürüst karşılığı, ilk ekranda.
- Yerleşim: `Container` içinde `-mt-16 md:-mt-20 relative z-10`, açık panel (`rounded-panel bg-white shadow-lift border`). İçinde `StatRow` (açık ton): 4 sütun / mobil 2×2, `divide-x divide-navy-950/10`, rakamlar `text-navy-800`, etiketler `text-slate-600`.
- İçerik (`companyFacts`, hakkımızda seti): `2010` yılından beri sahada · `20+` kurumsal müşteri · `ISO 27001` baş denetçi deneyimi · `7/24` teknik destek.
- Bileşen: `components/ensa/StatRow.tsx` (YENİ, `tone="dark" | "light"`). ProofStrip de içeride bunu kullanır.

**C · Gövde + Künye kartı (tint-50)**
- Yerleşim (masaüstü): `lg:grid-cols-[minmax(0,1fr)_340px] gap-16`. Sol: mevcut `.markdown-content core-page max-w-3xl` (tüm H2'ler ve metin aynen). Sağ: `aside`, `lg:sticky lg:top-28`, iki öğe alt alta:
  1. **Künye kartı** (panel, beyaz). Başlık "Künye" (mono eyebrow, `h2` değil `p`, çünkü sayfa H2 hiyerarşisi markdown'da). `dl` satırları, hepsi `lib/site.ts`'den: Unvan `site.legalName` · Kuruluş "2010" · Merkez "Gebze / Kocaeli" (`site.postalAddress`) · Hizmet bölgesi `site.areaLabel` · Çalışma saatleri `site.hours.label` · Telefon `site.phone` · Destek `site.supportEmail.address`. Satırlar `border-t border-navy-950/10 py-3`, etiket mono 12 px, değer 15 px ink-900.
  2. **CTA kartı** (`bg-navy-950 rounded-panel p-6`): "Ücretsiz keşif isteyin", birincil buton `/#teklif`, altında telefon bağlantısı.
- Mobil: Aside, markdown'dan **sonra** gelir (okuma akışı bozulmasın).
- Markdown içindeki görsel (`/wp-content/uploads/2025/07/sunucu-ve-veri-merkezi-hizmetleri-1024x577.jpg`, 1024×577, veri merkezi koridoru) korunur. `.core-page img` kuralına radius `var(--radius-panel)` ve `filter: saturate(.8)` eklenir (photo-tone'un CSS-only karşılığı, sarmalayıcı eklemeden).
- Markdown'daki "Misyonumuz / Vizyonumuz" H2'leri olduğu gibi kalır. İleride bu iki blok iki yan yana kart olarak ayrılmak istenirse içerik DB'de değişmeden bir `## Misyonumuz` ayrıştırıcısıyla yapılabilir. Bu, kapsam dışı (P3).

**D · Ekibimiz (white)** · Mevcut `SectionHeading` + `TeamCards`. Kartlarda fotoğraf yoksa baş harf kalır (mevcut davranış). Kart başlığındaki `label` ("Kurucumuz") mono eyebrow olarak doğru. Fotoğraf geldiğinde `h-16 w-16 rounded-full` yerine `h-20 w-20 rounded-card` (köşeli, ilke 1).

**E · Referans şeridi (tint-50, `references.length > 0` ise)** · `TrustSection`'ın yalnızca logo kısmını gösteren hafif bir varyant (`variant="strip"`), "Tüm referanslar" bağlantısıyla.

**F · ContactCta (navy-950)** · `components/ensa/ContactCta.tsx` mevcut. `data-contact-cta` sayesinde footer'daki tekrar şerit otomatik gizlenir.

### 3.3 İletişim `/iletisim/` (`app/(site)/iletisim/page.tsx`)

Zemin sırası: PageHero `navy-950` (kısaltılmış) → İki sütun `tint-50` → (footer).

**A · PageHero** · H1 "Bize ulaşın.", eyebrow, lead ve breadcrumb **aynen**. Dikey boşluk bu sayfada `py-12 md:py-16` (form ilk ekrana yaklaşsın). PageHero'ya `compact?: boolean` prop'u eklenir, varsayılan davranış değişmez.

**B · İki sütun (tint-50)**: `lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16`

*Sol sütun: kanal kartları + ofis kartı*
- `h2.visually-hidden` "İletişim bilgileri" korunur.
- **Kanal kartları** (2×2 `sm:grid-cols-2`, mobil 1 sütun). Her kart beyaz + kenarlık + `shadow-card`. İçinde `IconTile`, mono etiket, değer (`text-base font-medium text-ink-900 break-words`) ve alt satırda eylem bağlantısı (`text-sm font-semibold text-navy-800`, `ArrowRight`). Kartın tamamı tıklanabilir (`<a>` kartı sarar), odak halkası kartta.

| Kart | Etiket | Değer | Eylem metni | href |
|---|---|---|---|---|
| Telefon | Telefon | `site.phone.display` | Hemen arayın | `site.phone.href` |
| WhatsApp | WhatsApp | `site.mobile.display` | WhatsApp'tan yazın (yeni sekme, `visually-hidden` not) | `site.whatsapp.href` |
| E-posta | Teklif ve bilgi | `site.email` | E-posta gönderin | `mailto:` |
| Destek | 7/24 Teknik Destek | `site.supportEmail.address` | Destek talebi gönderin | `mailto:` |

- (Opsiyonel P3) E-posta kartlarında "Kopyala" butonu: küçük bir client bileşeni (`components/ensa/CopyButton.tsx`), `navigator.clipboard`, `aria-live` ile "Kopyalandı" bildirimi.
- **Ofis kartı** (panel, beyaz, `mt-6`). Başlık satırı `MapPin` karosu + "Ofisimiz" (h3). Adres `site.address`. Çalışma saatleri satırı `Clock` + `site.hours.label`. Altında "Yol tarifi alın" bağlantısı `site.mapsUrl` (yeni sekme). Kartın alt kısmında, kenardan kenara (`-mx-6 md:-mx-10 -mb-6 md:-mb-10`, alt köşeler yuvarlatılmış) `ConsentMap` (mevcut onay mantığı aynen, `.map-consent` zemini `paper-100` kalır, iframe yüksekliği 280).

*Sağ sütun: güçlü form paneli (koyu)*
- `lg:sticky lg:top-28 lg:self-start`.
- Sarmalayıcı: `<div className="form-dark rounded-panel bg-navy-950 p-6 md:p-10 shadow-lift ring-1 ring-white/10">`.
- Üst kısım: Mono eyebrow "Mesaj gönderin" (gold-300). H2 "Ücretsiz keşif görüşmesi isteyin" (white, 28 px). Söz satırı `text-slate-300`: "En geç bir iş günü içinde dönüş yapıyoruz." (bkz. tutarlılık notu).
- Form: `components/ContactForm.tsx` **mantığı, alanları, honeypot, API çağrısı, fallback ve KVKK notu aynen**. Yalnızca CSS kapsamı değişir (`.form-dark` ebeveyni üzerinden, bileşen koduna dokunmadan):

```css
.form-dark .form-card { background: transparent; border: 0; padding: 0; color: #fff; }
.form-dark .form-field label { color: #dbe4f1; }              /* slate-200, 11:1 */
.form-dark .form-field input,
.form-dark .form-field select,
.form-dark .form-field textarea { background: #fff; border-color: transparent; }   /* beyaz alanlar, ink metin */
.form-dark .form-field :is(input,select,textarea):focus { outline-color: var(--gold-300); border-color: var(--gold-300); }
.form-dark .field-err { color: var(--err-on-dark); }
.form-dark .form-field [aria-invalid="true"] { border-color: var(--err-on-dark); box-shadow: 0 0 0 1px var(--err-on-dark); }
.form-dark .form-note { color: #c3d1e6; }
.form-dark .form-note a { color: var(--gold-300); text-decoration: underline; text-underline-offset: 3px; }
.form-dark .form-fallback { color: var(--ink-900); }          /* açık inset kalır */
```

- Alan düzeni (yalnızca CSS ile): `md` ve üstünde "Ad Soyad + Şirket" ile "E-posta + Telefon" yan yana. Bunun için `ContactForm`'a dokunmadan `.form-dark .form-card { display:grid; grid-template-columns: 1fr 1fr; column-gap: 1rem }` ve tam genişlik gerektiren öğelere (`.req-note`, 5. ve 6. `.form-field`, buton, notlar, fallback) `grid-column: 1 / -1` verilir. Bu kırılgan bulunursa `ContactForm`'a `className` eklenip alanlar `.quote-grid` ile sarılır. Davranış değişmez.
- Gönder butonu `btn-primary btn-block btn-lg` (turuncu, koyu zeminde 5,12:1 metin).
- Mobil sıra: Kanal kartları → form paneli → ofis kartı + harita. Mobilde önce tek dokunuşla arama kanalları gelir, harita en sonda kalır. Bunun için sol sütun iki parçaya bölünür ve `order-*` sınıfları kullanılır, ya da ofis kartı sağ sütunda formun altına alınır. Önerilen ikincisi: masaüstünde form yapışkan olduğu için ofis kartı sol sütunda kalır, mobilde `order-last`.
- Form paneline bağlantı: Hero lead'inin altına `#iletisim-formu` hedefli bir "Formu doldurun" ghost-dark bağlantı (yalnızca mobilde, `md:hidden`).

**Tutarlılık notu (sahibin onayı gerekli, metadata değil):** Geri dönüş sözü üç yerde farklı:
- `iletisim` lead: "En geç bir iş günü içinde"
- `ContactForm` başarı mesajı: "24 saat içinde"
- `Footer` şeridi: "aynı gün dönüş yapalım"

Öneri: En temkinli ifade olan "en geç bir iş günü içinde" her yerde kullanılsın. Lead zaten bu; diğer iki metin buna çekilir.

**JSON-LD:** `organizationJsonLd()` aynen kalır.

### 3.4 Kanıt verisi: tek dosya (`lib/data/trust.ts`)

Rakam satırları tek kaynaktan beslenir. Sahibi kesin rakamı öğrendiğinde yalnızca `value` değişir:

```ts
export type CompanyFact = {
  key: "since" | "customers" | "support" | "iso" | "products";
  value: string;          // "2010", "20+" — yalnızca sitede mevcut ya da sahibin verdiği değer
  label: string;          // "yılından beri sahada"
  source: string;         // "Sitede mevcut" / "Sahip beyanı 2026-10-10" — boşsa gösterilmez
};
export const companyFacts: CompanyFact[] = [
  { key: "since",     value: "2010",      label: "yılından beri sahada",       source: "site" },
  // Owner-provided figure (2026-10-10); update here
  { key: "customers", value: "20+",       label: "kurumsal müşteri",           source: "Sahip beyanı, 2026-10-10" },
  { key: "support",   value: "7/24",      label: "teknik destek",              source: "site.supportEmail" },
  { key: "iso",       value: "ISO 27001", label: "baş denetçi deneyimi",       source: "Ekip: Faik Genç, ISO 27001 LA" },
];
export const liveFacts = companyFacts.filter((f) => f.source.trim() && f.value.trim());
```

- Ürün sayısı `products.length` ile hesaplanır, veriye yazılmaz. Sayfalar setlerini `key` listesiyle seçer: Ana sayfa `["since","customers","support"] + products`, Hakkımızda `["since","customers","iso","support"]`.
- `trust.ts` başındaki "No unverifiable figures" kuralı korunur ve şu not eklenir: "`customers` sahibin verdiği rakamdır (20+, 2026-10-10). Değiştirmek için yalnızca bu satır güncellenir; değer sahibin belgeleyebileceği sayıyı aşmamalı." Bu rakam sitenin başka hiçbir yerinde (metin, meta, JSON-LD) elle tekrar yazılmaz; gerekiyorsa `companyFacts`tan okunur.
- `StatRow` `value` uzunluğuna göre font küçültmez. "ISO 27001" en uzun değer; 30 px'te mobil 2 sütunda sığar (≈140–160 px). Gerekirse `text-[1.75rem]` alt sınırı uygulanır.

---

## 4) İletişim ve footer ayrıntıları

### 4.1 İletişim: kontrol noktaları
- Form bileşeni: `components/ContactForm.tsx` (`id="iletisim-formu"`, POST `/api/contact/`, alanlar: name, company, email, phone, topic [`lib/data/quote-form.json → topics`], message, honeypot `website`). **Alan, doğrulama veya API'de değişiklik yok.**
- Harita: `components/site/ConsentMap.tsx` aynen (Google yalnızca "Haritayı Yükle" ile yüklenir). Ofis kartının içine taşınır.
- Çalışma saatleri: `site.hours.label` ("Pazartesi – Cuma, 09:00 – 18:00"). 7/24 destek kanalı ayrı kartta, karışmasın.

### 4.2 Footer: yasal kimlik bloğu (`components/ensa/Footer.tsx`, `lib/site.ts`)
- `lib/site.ts`'e eklenir (boş alanlar gösterilmez, `social` ile aynı mantık):

```ts
legal: {
  tradeName: "",      // Tam ticari unvan (ör. "… Ltd. Şti."), şu an yalnızca legalName var
  mersis: "",
  tradeRegistry: "",  // Ticaret sicil no + müdürlük
  taxOffice: "",
  taxNumber: "",
  kep: "",            // KEP adresi
},
```

- Yerleşim: Alt çubuğun hemen üstünde, `border-t border-white/10 py-6` içinde tek satır, `text-xs text-slate-300`, ayraç olarak `·`. İçerik: `{legal.tradeName || site.legalName}` · `MERSİS: …` · `Ticaret Sicil: …` · `Vergi: {taxOffice} / {taxNumber}` · `KEP: …` · `site.address`. Mobilde satırlar alt alta.
- Şu an gösterilebilecek gerçek veri: `site.legalName` ("BTM Bilgi Teknolojileri Merkezi") ve `site.address`. Diğerleri sahipten gelene kadar render edilmez.
- Yasal bağlantılar (mevcut): KVKK Aydınlatma Metni, Çerez Politikası, Çerez Tercihleri. Eksik sayfa: "Gizlilik Politikası" ve "KVKK Başvuru Formu" (Uppoint'te var). İçerikleri hukukçudan gelirse eklenebilir; tasarım olarak `legal` listesine yeni satır yeterli.

**Sahibin sağlaması gereken eksik alanlar:**
- [ ] Tam ticari unvan ve şirket türü (Ltd. Şti. / A.Ş. / şahıs)
- [ ] MERSİS numarası
- [ ] Ticaret sicil numarası ve sicil müdürlüğü
- [ ] Vergi dairesi ve vergi numarası
- [ ] KEP adresi (varsa)
- [ ] LinkedIn / Instagram / X hesapları (`site.social` boş)
- [ ] Genel bir `info@` adresi istenip istenmediği (şu an genel e-posta kişisel adla: `oguzhanbatum@…`)
- [ ] Geri dönüş sözünün tek ifadesi (bkz. 3.3 tutarlılık notu)

---

## 5) Kesin kısıtlar

1. **Uydurma yok.** Rakam, istatistik, müşteri, alıntı, partner rozeti, sertifika logosu, ödül eklenmez. İzinli ifadeler: "2010'dan beri", "ISO 27001 baş denetçi deneyimi", "7/24 teknik destek" (sitede mevcut), "20+ kurumsal müşteri" (sahibin verdiği rakam, 10.10.2026, tek kaynak `lib/data/trust.ts → companyFacts`). Bunun dışında rakam (ör. cihaz sayısı, proje sayısı, "%99") ve "yüzlerce" gibi nicelik ifadeleri **yasak**. "Lider", "en iyi" gibi üstünlük iddiaları da yasak.
2. **Sahte görsel yok.** Ekip, ofis, bina, müşteri veya el sıkışma içeren stok fotoğraf kullanılmaz. `public/hero/slider-1.jpg` (toplantı odası), `slider-2.jpg` (el sıkışma + kalabalık), `slider-3.jpg` (sunum yapan kişi), `slider-4.jpg` (bina girişi) bu üç sayfada **kullanılmaz**; "bizim ofisimiz/ekibimiz" çağrışımı yapıyor. İnsan içeren wp-content stokları (`IT-destek-ve-danismanlik*.jpg/webp`, `kurulum_hizmeti.webp`) da kullanılmaz.
3. **SEO dokunulmazlığı.** H1 metinleri, `metadata` (title, description, canonical, OG), tüm JSON-LD çağrıları, `FaqSection` soruları ve hakkımızda markdown içeriği değişmez. Başlık sırası korunur (sayfa başına tek H1, H2 → H3). Yeni bölümler yeni H2 eklemez; künye kartı başlığı görsel etiket (`p`) olarak kalır.
4. **WCAG 2.2 AA.** Metin ≥ 4,5:1, büyük metin ve UI ≥ 3:1 (bkz. 2.1 tablo). Görünür form etiketleri korunur (placeholder etiket yasak). Dokunma hedefi ≥ 44 px. Odak halkası her zeminde görünür. Yeni sekme bağlantılarında `visually-hidden` not. Harita onaysız yüklenmez.
5. **Hareket.** `prefers-reduced-motion: reduce` → kayma ve ölçek yok. Sonsuz döngülü animasyon yeni bölümlerde yok. Sayı animasyonu yok.
6. **Performans.** Hero'ya görsel eklenmez (LCP metin). Yeni görseller `next/image` + `sizes` + `loading="lazy"`. Yalnızca 640/960 varyantı olanlar kullanılır. Ürün görseli (`atlas-1.jpg`, 169 KB) kabul edilebilir. `public/hero/*.png` 1,3 MB'lık dosyalar kullanılmaz.
7. **Kopya yok.** Uppoint'in krem zemini, pill butonları, zümrüt vurgusu, "EN İYİLERİN TERCİHİ" tarzı rozet etiketi ve slogan kalıpları alınmaz.

---

## 6) Görsel envanteri ve brifler

### 6.1 Mevcut görseller (bu üç sayfa için değerlendirme)

| Dosya | Boyut | Uygun mu | Nerede |
|---|---|---|---|
| `/wp-content/uploads/2025/07/ag-ve-sistem-altyapi-cozumleri-3.webp` | 940×627 (+640w) | **Evet**: patch kablolama, insan yok | Ana sayfa S2 |
| `/wp-content/uploads/2026/06/sirketler-icin-network-alt-yapisi.jpg` | 1200×856 (+640/960w) | **Evet, yedek**: mavi kablolar ve switch | S2 alternatifi / ileride iletişim |
| `/wp-content/uploads/2025/07/sunucu-ve-veri-merkezi-hizmetleri-1024x577.jpg` | 1024×577 (+640w) | **Evet**: veri merkezi koridoru | Hakkımızda (markdown'da zaten var) |
| `/wp-content/uploads/2025/07/sunucu-ve-veri-merkezi-hizmetleri-3-1024x683.jpg` | 1024×683 (+640w) | Evet, yedek | — |
| `/hero/atlas-1.jpg` | 1600×900 | **Evet**: gerçek BTM ürünü | Ana sayfa S4 |
| `/hero/atlas-alt-1.jpg`, `atlas-alt-2.jpg` | 1600×900 | Evet, yedek | — |
| `/hero/pentforce-1.jpg`, `fornet-1.jpg`, `cyberhost-1.jpg` | 1376×768 | Kısmen: yoğun "AI illüstrasyon" estetiği, ürün sayfalarında kalsın | — |
| `/hero/orbit-1.jpg` | 1953×544 | Hayır: illüstre insan figürleri | — |
| `/public/products/atlas/gosterge-paneli.png` | 1685×1172 | **Hayır**: sansür kutuları ve müşteri ürün adları görünüyor | — |
| `/hero/slider-1…4.jpg` | 1024–1920 | **Hayır**: ofis/insan/bina çağrışımı | — |
| `/wp-content/…/siber-guvenlik-hizmetleri*.jpg`, `it-danismanlik*.jpg`, `Cloud-Hizmetleri.jpg` | ~1000–1200 | Hayır: klişe (kilit, kalkan, "IT" tutan eller) | — |
| `/assets/img/logo-full.webp` / `-light.webp` | 387×120 | Logo | Header/footer (mevcut) |
| `/assets/img/og-default.jpg` | 1200×630 | OG | Değişmez |
| `/partners/*.png` | 720×240 | Referans logoları | TrustSection |

### 6.2 Mevcut görsel yetmezse: genel teknik fotoğraf brifleri (stok veya çekim)

Hepsi: insan yüzü yok, okunabilir ekran metni yok, marka logosu yok, soğuk mavi ve nötr gri baskın, tek sıcak vurgu ışığı serbest. Yatay 3:2 veya 16:10, en az 2000 px genişlik. Sığ alan derinliği, temiz kablo düzeni.
1. **Rack detayı:** 19" kabinette 1U switch, düzenli renk kodlu patch kablolar, port LED'leri, 45° açı, arka plan bulanık.
2. **Yapısal kablolama:** Patch panel arkası, etiketli kablo demetleri, cırt bantlı düzen, makro.
3. **Firewall/sunucu ön panel:** Kapalı bir rack kapağının perfore deseni arkasında yeşil/turuncu durum LED'leri.
4. **SOC/izleme ortamı:** Kararmış odada odak dışı birden fazla monitör, ekranlarda yalnızca soyut grafik şekiller (metin okunmaz), kimse görünmez.

### 6.3 Sahibin çekmesi gereken gerçek fotoğraflar (öncelik sırasıyla)

| # | Konu | Kullanım | Not |
|---|---|---|---|
| 1 | Ekip üyelerinin portreleri (nötr gri/lacivert fon, omuz üstü, aynı ışık) | Hakkımızda ekip kartları | Kişilerin yazılı izni |
| 2 | BTM'nin kendi kurduğu bir kabinet: önce/sonra veya bitmiş hali | Ana sayfa S2 (stok yerine) | Müşteri tesisiyse izin; etiketlerde müşteri adı görünmesin |
| 3 | Match Plaza bina girişi ve ofis kapısı/tabelası | İletişim ofis kartı ("bizi kolay bulun") | Gerçek konum, NAP ile uyumlu |
| 4 | Sahada çalışma: el ve alet detayı (kablo sonlandırma, kamera montajı), yüz gerekmez | Hakkımızda gövde, hizmet sayfaları | — |
| 5 | Eğitim veya toplantı (gerçek ekip) | Hakkımızda | İsteğe bağlı |

Çekim standardı: Tek renk derecelendirmesi (lacivert gölgeler, nötr beyazlar). Dosyalar `public/foto/` altına, 2400 px uzun kenar. `scripts/` içindeki varyant üreticisiyle 640/960w üretilir.

---

## 7) Uygulama sırası ve kontrol listesi

Her adım ayrı commit olarak, sırayla. Önce token'lar gelir; sayfalar bunlara dayanıyor.

### Adım 1: Token'lar ve yardımcılar (`app/(site)/ensa.css`)
- [ ] `:root` içine `--tint-50: #eef3f9`, `--err-on-dark: #ffb4a8` ekle
- [ ] `@theme inline` içine `--color-tint-50`, `--radius-panel: 1rem` ekle
- [ ] Odak kuralına `.bg-tint-50` ekle (`:is(.bg-white, .bg-paper-50, .bg-tint-50) :focus-visible`)
- [ ] `.form-card` radius 2 px → `var(--radius-panel)`
- [ ] `.form-input:focus`: gold kenarlık → navy-800 outline (AA 1.4.11)
- [ ] `.photo-tone` sınıfını ekle (+ `prefers-contrast` istisnası)
- [ ] `.form-dark` kapsamlı kuralları ekle (3.3)
- [ ] (Opsiyonel) `.bg-blueprint`
- [ ] `.core-page img`: radius `var(--radius-panel)`, `filter: saturate(.8)`

### Adım 2: Ortak bileşenler
- [ ] `components/ensa/SectionHeading.tsx`: H2 `md:text-[2.75rem]` → `md:text-[2.5rem]`, `leading-[1.12]`
- [ ] `components/ensa/IconTile.tsx` (YENİ): `tone: "light" | "dark"`, `size: "md" | "lg"`
- [ ] `components/ensa/StatRow.tsx` (YENİ): `facts`, `tone`; `dl/dt/dd`, `tabular-nums`, CountUp yok
- [ ] `lib/data/trust.ts`: `CompanyFact` tipi, `companyFacts`, `liveFacts`; `customers` satırında "Owner-provided figure (2026-10-10); update here" yorumu
- [ ] `components/ensa/ProofStrip.tsx`: `FACTS` → `StatRow` + `liveFacts` (ana sayfa seti) + `products.length`
- [ ] `components/ensa/PageHero.tsx`: `compact?: boolean` (padding) ve `overlap?: boolean` (alt boşluk) prop'ları, varsayılanlar değişmez
- [ ] `components/ensa/FaqSection.tsx`: açık ton zemini `bg-paper-50` → `bg-tint-50`

### Adım 3: Ana sayfa (`app/(site)/page.tsx`)
- [ ] Hero pill'leri `rounded-full` → `rounded-control` (metinler aynı)
- [ ] S2: iki sütun + `.photo-tone` görsel (`ag-ve-sistem-altyapi-cozumleri-3.webp`) + 4 adım tek sıra, kartlar beyaz + kenarlık, `01–04` mono numaralar; credential kutusu `bg-tint-50`
- [ ] S3: zemin `bg-paper-50` → `bg-tint-50`; ikonlar `IconTile`
- [ ] S4: iki sütun + `/hero/atlas-1.jpg` (`next/image`, `sizes`, lazy, alt metin), `/yazilim-urunlerimiz/atlas/` bağlantısı
- [ ] `components/btm/HomeSections.tsx → TrustSection`: zemin `tint-50`, logolar renkli, `variant="strip"` desteği
- [ ] `#teklif`: QuoteForm'a `shadow-card` (radius Adım 1'den), sol sütuna saat ve telefon künye satırı
- [ ] Zemin sırasını doğrula: aynı zemin art arda yok
- [ ] `metadata`, `JsonLd`, H1 metni değişmedi (diff ile kontrol)

### Adım 4: Hakkımızda (`components/site/ArticleView.tsx → CoreBody`, yeni `components/btm/AboutLayout.tsx`)
- [ ] `CoreBody`'de `page.slug === "hakkimizda"` dalı `AboutLayout`'a yönlendirilsin (PageHero, markdown, metadata aynı kaynaktan)
- [ ] PageHero `overlap`, ardından bindirilmiş açık `StatRow` paneli (hakkımızda seti)
- [ ] Gövde `tint-50`, iki sütun: markdown + sticky aside (Künye kartı `site.*` verisiyle + CTA kartı); mobilde aside sonra
- [ ] Ekip bölümü `white` (mevcut), fotoğraf geldiğinde `rounded-card` portre
- [ ] Referans şeridi (`references.length > 0`) + `ContactCta`
- [ ] Diğer core sayfalar (KVKK, çerez vb.) **etkilenmedi** (görsel kontrol)

### Adım 5: İletişim (`app/(site)/iletisim/page.tsx`)
- [ ] PageHero `compact`, mobilde "Formu doldurun" bağlantısı (`#iletisim-formu`)
- [ ] Sol: 4 kanal kartı (`IconTile`, tamamı tıklanabilir) + ofis kartı (adres, saatler, `site.mapsUrl`, `ConsentMap`)
- [ ] Sağ: `.form-dark` paneli, eyebrow + H2 + söz satırı + `ContactForm` (kod değişmeden), `lg:sticky lg:top-28`
- [ ] Mobil sıra: kanallar → form → ofis/harita
- [ ] Koyu formda hata, fallback, başarı (`role="status"`) durumlarını test et (JS kapalıyken POST fallback dahil)
- [ ] Geri dönüş sözü sahip onayından sonra `ContactForm` başarı mesajı ve `Footer` şeridinde eşitlensin

### Adım 6: Footer (`components/ensa/Footer.tsx`, `lib/site.ts`)
- [ ] `site.legal` alanları (boş başlar)
- [ ] Alt çubuğun üstüne yasal kimlik satırı; boş alanlar render edilmez; şu an yalnızca `legalName` + adres görünür

### Adım 7: Doğrulama
- [ ] 375 / 768 / 1366 px'te üç sayfa: yatay taşma yok, sabit alt çubuk son CTA'yı kapatmıyor
- [ ] Kontrast: `accessibility-scan` (axe) üç sayfada 0 kontrast ihlali; koyu form paneli dahil
- [ ] Klavye: kanal kartları, harita onayı, form, SSS sırayla odaklanıyor; odak halkası her zeminde görünür
- [ ] `prefers-reduced-motion`, `prefers-contrast: more`, `prefers-reduced-transparency` emülasyonu
- [ ] Lighthouse: LCP öğesi ana sayfada hâlâ hero metni; CLS < 0,1 (görsellerde `width/height` veya `aspect-*`)
- [ ] View-source: title, description, canonical, JSON-LD blokları değişmedi (önce/sonra diff)
- [ ] Hiçbir yerde yeni rakam, rozet, sahte görsel yok (son okuma)
