# BTM Bilişim — Kurumsal Kimlik v2 (web)

Karar tarihi: 2026-10-10. Sahibin talebi: logo renklerine (lacivert + turuncu) bağlı kalmadan, "bilgi teknolojilerinin lider firması" izlenimi veren kurumsal bir ton, renk ve tipografi. Referans hissi: uppoint.com.tr (bütünlük, ferahlık, tutarlı kart sistemi, tek fotoğraf dili) — kopyalanmaz: krem zemin, yeşil vurgu, hap (pill) butonlar Uppoint'e ait; BTM soğuk beyaz + kurumsal mavi + köşeli-yumuşak butonlar kullanır.

## Ruh
Sakin, kesin, mühendislik disiplini. Bol beyaz alan, az renk, güçlü hiyerarşi. Renk bir sinyaldir, dekor değil.

## Renk paleti
| Rol | Ad | Hex | Kullanım |
|---|---|---|---|
| Koyu yüzey / başlık metni | ink-950 | `#0B1220` | Koyu bantlar, footer, hero (koyu varyant), H1–H2 |
| Koyu yüzey 2 | ink-900 | `#111B2E` | Koyu kartlar, form paneli |
| Koyu yüzey 3 | ink-800 | `#1B2740` | Koyu yüzey üstü ayraç/hover |
| Gövde metni | text | `#1F2937` | Paragraf |
| İkincil metin | muted | `#5B6475` | Açıklama, meta (beyazda AA) |
| Ana vurgu | brand-600 | `#2251CC` | Birincil buton, link, eyebrow, ikon |
| Vurgu hover | brand-700 | `#1A3FA3` | Hover/active |
| Vurgu açık | brand-50 | `#EEF3FE` | İkon zemini, etiket (tag) zemini |
| Vurgu (koyu zeminde) | brand-300 | `#8FB0F5` | Koyu zeminde link/eyebrow (AA) |
| Güven sinyali | teal-600 | `#0F766E` | Yalnızca onay/✓ ikonları, "güvenli" durumları — az kullan |
| Zemin | white | `#FFFFFF` | Varsayılan |
| Bölüm zemini | surface | `#F5F7FA` | Tek tint; ardışık iki bölümde tekrar etme |
| Kenarlık | border | `#E3E8EF` | Kart, input, ayraç |
| Hata | danger | `#B42318` | Form hatası (koyu zeminde `#FFB4A8`) |

Bölüm ritmi: beyaz → surface → beyaz → ink-950 (en fazla 1–2 koyu bant/sayfa). Turuncu yok. Logo (2026-10-10): tek renkli işaret + "Bilgi Teknolojileri Merkezi / Dijital Çözümler" — açık zeminde ink `#0B1220` (`/assets/img/logo-full.webp`), koyu zeminde beyaz (`logo-full-light.webp`); favicon ve uygulama ikonları aynı işaretten. `scripts/build-brand-assets.mjs` eski turuncu logoyu üretir — çalıştırma.

## Tipografi
- Başlık: **Plus Jakarta Sans** (600/700), `next/font/google`, subsets `latin`, `latin-ext`.
- Metin/UI: **Inter** (400/500/600), `latin`, `latin-ext`.
- Ölçek (masaüstü → mobil): H1 56→36px / lh 1.05 / ls −0.025em · H2 40→28 / 1.12 / −0.02em · H3 22→19 / 1.3 / −0.01em · gövde 17/1.65 · küçük 14/1.5 · eyebrow 12px, 600, büyük harf, ls +0.12em, brand-600.
- Rakamlar (istatistik): Plus Jakarta Sans 700, `font-variant-numeric: tabular-nums`.

## Şekil ve derinlik
- Kart: beyaz, 1px `border`, radius 14px, padding 28px, gölge `0 1px 2px rgb(11 18 32 / .04), 0 12px 32px -16px rgb(11 18 32 / .12)`; hover: kenarlık brand-600'a %30, 2px yukarı.
- Panel/medya: radius 20px. Kontroller ve butonlar: radius 10px (hap değil).
- Butonlar: Birincil = brand-600 dolgu, beyaz metin; İkincil = beyaz, `border`, ink metin; Koyu zeminde birincil = beyaz dolgu + ink metin. Yükseklik 48px (sm 40px). Basışta scale .97.
- İkon: lucide, 1.75 stroke, 20px, brand-50 zeminli 44px kare (radius 12px) içinde.

## Fotoğraf dili
- Tek dil: teknik detay fotoğrafı (kabin, kablolama, sunucu, ekran detayı), insan yüzü yok; tümüne aynı `.photo-tone` (hafif mavi duotone + kontrast) uygulanır; radius 20px.
- Blog kapakları: 16:10 oran, `object-cover`, aynı ton. Kapak yoksa marka deseni (ink + ince grid) — rastgele stok değil.
- Gerçek ekip/ofis/saha fotoğrafları gelene kadar insan/ofis stoku kullanılmaz.

## Ses
"Biz" dili, kısa cümle, somut fayda. Abartı ("lider", "1 numara") kopyada yazılmaz — liderlik izlenimi tasarım ve kanıtla verilir. İstatistikler yalnızca `lib/data/trust.ts` → `companyFacts` (20+ kurumsal müşteri — sahibin beyanı).
