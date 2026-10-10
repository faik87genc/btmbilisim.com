# BTM Bilişim — Tasarım ve Kurumsal Kimlik İnceleme Raporu

Tarih: 10.10.2026 · Kapsam: uppoint.com.tr (rakip referansı) ile www.btmbilisim.com karşılaştırması · Kod değişikliği yapılmadı.

İncelenen sayfalar:
- **Uppoint:** `/`, IT Hizmetleri mega menüsü, `/it-danismanlik-hizmetleri/`, `/siber-guvenlik-hizmetleri/`, `/basari-hikayeleri/`, `/hakkimizda/`, `/kaynaklar/`, `/iletisim/`, footer. Masaüstü ve 375 px mobil.
- **BTM:** `/`, `/hizmetler/`, `/danismanlik/it-danismanlik-hizmetleri/`, `/referanslar/`, `/hakkimizda/`, `/blog/`, `/iletisim/`. Masaüstü ve 375 px mobil.
- **Kaynak kod:** `app/(site)/page.tsx`, `app/(site)/layout.tsx`, `app/(site)/ensa.css`, `app/globals.css`, `app/(site)/referanslar/page.tsx`, `components/ensa/*` (Header, Footer, Logo, PartnerLogos, ProofStrip, PageHero), `components/btm/HomeSections.tsx`, `lib/data/trust.ts`, `lib/data/home.json`, `lib/site.ts`, `lib/navigation.ts`.

> Not: Public sitenin gerçek tasarım token'ları `app/(site)/ensa.css` dosyasındadır: navy `#072b55…#1763b3`, logo turuncusu `#e8812f`, Space Grotesk + IBM Plex Sans. `app/globals.css` yalnızca admin panelinin eski token'larını taşır (Georgia serif, mavi "gold"). Marka çalışmasında bu iki dosyanın karıştırılmaması gerekir.

---

## 1) Özet

1. **Uppoint'in farkı görselde değil, kanıtta.** Sitenin tasarım dili sade: krem/açık zemin, tek koyu lacivert, pill butonlar ve sistem fontu kullanılıyor. Kurumsal hissi asıl yaratan şey, her sayfada tekrarlanan güven katmanı. Bu katmanda 13 adet logolu ve görselli başarı hikâyesi, "Microsoft Solutions Partner" rozeti ve büyük rakamlar var. BTM'de yalnızca 3 logo (ikisi aynı grup) ve sayfalara dağılmış "ISO 27001 baş denetçi deneyimi" ifadesi bulunuyor.
2. **BTM'nin görsel temeli zaten güçlü ve Uppoint'ten daha ayırt edici.** Logo renklerinden türetilmiş lacivert ve turuncu palet, Space Grotesk/IBM Plex tipografi, AA kontrastlı turuncu butonlar (lacivert yazı/turuncu zemin 5,12:1) ve çalışan mega menü mevcut. Uppoint'in görünümüne geçmeye gerek yok. Eksik olan, kanıt ve görsel içerik.
3. **BTM'de fotoğraf neredeyse hiç yok.** Hizmet, hizmetler listesi ve iletişim sayfalarında `<img>` sayısı sıfır. Blog kapakları WordPress döneminden kalma karışık stoklardan oluşuyor. Uppoint ise hizmet hero'larında kendine özgü şekilli maskeli fotoğraflar, hikâye kartlarında da müşteri banner görselleri kullanıyor.
4. **Referanslar sayfası en hızlı kazanılacak alan.** `/referanslar/` şu an 5 sütunluk ızgarada 3 küçük logodan ibaret: açıklama, hizmet etiketi ve CTA yok, sayfa yarı boş görünüyor. Mevcut `trust.ts` veri modeli küçük bir genişletmeyle "Başarı Hikâyeleri" yapısına dönüştürülebilir. İçerik politikası gereği her hikâye **gerçek bir müşteri ve yazılı izin** gerektiriyor.
5. **Bilgi mimarisi ve CTA tutarlılığı düzeltilmeli.** Referanslar menüde "Hakkımızda" altına gömülü. Hizmet sayfalarında hiç referans bloğu yok. Header'da metinli "Teklif Al" butonu bulunmuyor, CTA yalnızca telefon numarası. Müşteri portalı ya da uzaktan destek bağlantısı da yok. Uppoint ise "Başarı Hikayeleri"ni ana menüde, portalı da header'da gösteriyor.

---

## 2) Uppoint'te iyi olanlar

| # | Gözlem | Sayfa / ekran |
|---|---|---|
| U1 | **Mega menü bir satış yüzeyi gibi tasarlanmış.** Solda koyu bir "Kurumsal IT Hizmetleri" kartı var (3 madde ve "Fiyat Teklifi Al" butonu). Sağda 3 sütun halinde (IT Destek / Bulut / Microsoft 365) ikonlu kartlar yer alıyor, her kartta başlık ve tek satırlık alt açıklama bulunuyor. Sağ üstte "Tümünü Gör" bağlantısı var. | Ana sayfa header, "IT Hizmetleri" açılır menüsü |
| U2 | **Header sade:** 4 metin bağlantısı, ardından "Uppoint Portal" (outline pill) ve "İletişim" (dolu koyu pill). Mevcut müşteri ile yeni ziyaretçi ayrımı header'da yapılıyor. | Tüm sayfalar |
| U3 | **Hero'da tek mesaj, iki CTA ve bir rozet.** Rozetteki "Sizi Arayalım" ve "Hizmetlerimiz" butonlarının hemen altında Microsoft Solutions Partner kartı duruyor. Sağdaki koyu kartta marka vaadi ve üç rakam yer alıyor. | `/` hero |
| U4 | **Başarı hikâyesi kartı tekrar kullanılabilir bir bileşen.** Kartta müşteri logosu ile adı, tırnak içinde başlık, 2–4 cümlelik hikâye, "ÜRÜNLER" etiketleri ve sağda müşteriye ait banner görseli var. Aynı bileşen ana sayfada, her hizmet sayfasında ve `/basari-hikayeleri/` sayfasında kullanılıyor. Ana sayfada sekmeli logo şeridi (5 müşteri) ve "Tüm Referanslar" bağlantısı mevcut. | `/`, `/it-danismanlik-hizmetleri/`, `/basari-hikayeleri/` |
| U5 | **`/basari-hikayeleri/` sayfasında 13 hikâye ve ItemList JSON-LD var.** Her hikâyenin logo ve banner görseli için açıklayıcı alt metin yazılmış. | `/basari-hikayeleri/` |
| U6 | **Hizmet sayfası iskeleti tutarlı.** Sıra şöyle: hero (H1, alt metin, 2 CTA, 3 etiket pill, maskeli fotoğraf) → "01/02/03" numaralı alt hizmet sekmeleri ve detay paneli → "Kapsam" ızgarası (9 madde) → avantaj kartları → ara CTA ("Özel Teklif İste / İletişime Geç") → referans hikâyesi → hizmet kartları → partner bloğu → SSS (~10 soru) → geri arama formu. | `/it-danismanlik-hizmetleri/`, `/siber-guvenlik-hizmetleri/` |
| U7 | **Partner kanıtı ayrı bir blok olarak sunuluyor.** Blokta yetkinlik listesi ve "Partner Profilimizi Görüntüle" bağlantısıyla dış doğrulama var. | `/`, hizmet sayfaları, `/hakkimizda/` |
| U8 | **Geri arama formu kısa ve bir vaat taşıyor.** "Yaklaşık 30 dk – 1 saat içinde geri dönüş" vaadi var. İletişim sayfasında satış ve bilgi e-postaları ayrı kartlarda, kopyalama butonuyla birlikte sunuluyor. | `/iletisim/`, tüm sayfaların sonu |
| U9 | **Kaynaklar (blog) sayfasında iki eksenli filtre var:** kategori pill'leri ve konu açılır listesi. Kartlarda okuma süresi gösteriliyor. | `/kaynaklar/` |
| U10 | **Footer'da yasal kimlik açık:** unvan, MERSİS, ticaret sicil numarası ve 5 yasal metin bağlantısı. | Footer |
| U11 | **Mobil hero'da CTA'lar tam genişlikte ve rozet hero içinde.** İlk ekranda tek mesaj veriliyor. | `/` (375 px) |

**Uppoint'te kopyalanmaması gereken zayıflıklar** (fırsat olarak not edildi):
- "Türkiye'nin Lider IT Firması" ve "1100+ Mutlu Müşteri" gibi doğrulanamayan üstünlük iddiaları kullanılıyor. BTM'nin politikası bunları yasaklıyor; doğru tavır da bu.
- Hikâyelerin detay sayfası yok ve kartlarda başlık etiketi (H2/H3) bulunmuyor. SEO ve erişilebilirlik açısından zayıf.
- Hikâyelerde ölçülebilir sonuç yok. "Ölçülebilir sonuçlar üretiyoruz" deniyor ama metinler genel kalıyor.
- Aynı hikâye ve aynı hizmet listesi her sayfada birebir tekrarlanıyor.
- Kaydırmayla görünen (reveal) bölümler animasyon tamamlanmadan boş görünüyor.
- Hakkımızda sayfasında "yapay zekâ bizi öneriyor" türünden bir kanıt kullanılmış.

---

## 3) BTM'nin mevcut durumu

### Güçlü yönler
- **Tutarlı token sistemi.** `app/(site)/ensa.css` içinde logo renklerine bağlı navy ve gold skalası, `--radius-card`, `--radius-control`, `--shadow-card` ve `--shadow-lift` tanımlı. Turuncu üzerindeki lacivert metin AA'yı geçiyor (5,12:1). `:focus-visible` tanımlı, "İçeriğe geç" bağlantısı var, `prefers-reduced-motion` dikkate alınıyor.
- **Ayırt edici tipografi.** Space Grotesk (başlık, 56 px/700) ve IBM Plex Sans (gövde), self-hosted. Uppoint sistem fontu kullandığı için BTM tipografide zaten önde.
- **Hero mesajı net ve yerel.** "IT danışmanlıktan siber güvenliğe, bilişiminizin tek muhatabı." Yanında "Bize doğrudan ulaşın" kartı (telefon ve WhatsApp) ve doğrulanabilir rakamlar şeridi (`ProofStrip`: 2010, 7/24, 6 alan, 9 ürün) bulunuyor.
- **Mega menü zengin.** 6 alan, alan başına 5 alt hizmet, sayaç ve "Tümü (n)" bağlantısı içeriyor (`components/ensa/Header.tsx`).
- **Kendi yazılım ürünleri** (Atlas, Orbit, PentForce, CyberHost) rakipte olmayan bir farklılaşma unsuru.
- **Teklif formu nitelikli.** Çalışan sayısı, lokasyon, zamanlama ve hizmet seçimi alanları var, KVKK notu eklenmiş, WhatsApp ile gönderme seçeneği sunuluyor.
- **Güven verisi için hazır ve dürüst bir altyapı var.** `lib/data/trust.ts` boş listeyle başlıyor, onayı (`consent`) olmayan yorumu göstermiyor ve sahte rakam kullanılmasını yasaklıyor.
- **Hizmet sayfaları içerik açısından derin.** Örneğin IT danışmanlık sayfası yaklaşık 1.370 kelime, 20+ H2/H3 ve SSS içeriyor.

### Zayıf yönler
| Alan | Durum |
|---|---|
| Logo | Yalnızca raster dosyalar var (`public/assets/img/logo-full.webp` 375×120, `logo.png`). SVG ana logo, tek renk varyant, ikon-yalnız (favicon dışı) sürüm ve kullanım kılavuzu yok. Wordmark "Bilgi Teknolojileri Merkezi / Dijital Çözümler" üç satırlı. Header'da 44–56 px yükseklikte küçük ve kalabalık görünüyor, "BTM" kısaltması logoda öne çıkmıyor. |
| Fotoğraf / görsel dil | Hizmet sayfaları, `/hizmetler/` ve `/iletisim/` sayfalarında görsel yok. Hakkımızda sayfasında 1 görsel var. Blog kapakları `wp-content` döneminden kalma, stilleri birbirinden farklı (png/webp/jpg, stok). Ekip fotoğrafı yok, ekip kartları baş harflerle gösteriliyor. |
| Güven sinyalleri | 3 logo var (Balorman INT, BLR Balorman, Palet Global); ilk ikisi aynı grup. Müşteri yorumu, vaka çalışması ve sertifika/partner rozeti (Microsoft, Veeam, Fortinet vb. ve kişisel ISO 27001 LA sertifikası) görsel olarak hiçbir yerde yok. |
| Referans kodu | Logolar iki yerde tanımlı: `lib/data/trust.ts` → `references` ve `components/ensa/PartnerLogos.tsx` içinde sabit kodlanmış `partners`. Biri güncellenip diğeri unutulursa tutarsızlık oluşur. `TrustSection` logoları gri tonlu gösteriyor, `/referanslar/` renkli gösteriyor. |
| `/referanslar/` | 5 sütunlu ızgarada 3 kart var, sayfa yarı boş. Giriş metni, sektör veya hizmet bilgisi, hikâye ve CTA yok. Menüde "Hakkımızda" açılır menüsünün içinde kalıyor (`lib/navigation.ts:30`). |
| Hizmet sayfası şablonu | Hero yalnızca metin ve koyu zeminden oluşuyor. Alt hizmet sekmeleri ya da görsel kapsam ızgarası yok, uzun Markdown akışı var. Sayfada referans veya hikâye bloğu yok. "Neden BTM" bloğu sayfa içinde iki kez geçiyor (H2 "Neden BTM Bilişim? Bir IT danışmanlık…" ve aynı adlı H2). |
| Header CTA | Turuncu buton yalnızca telefon numarası. Metinli "Ücretsiz Keşif / Teklif Al" butonu yok. Mevcut müşteriler için "Destek / Uzaktan Bağlantı / Portal" bağlantısı yok. |
| Mobil | İlk ekran tamamen hero'dan oluşuyor. WhatsApp ve telefon CTA'ları hero'da ve alt sabit çubukta tekrar ediyor (3–4 CTA). Çerez bandı açıkken alt sabit çubukla birlikte ekranın yaklaşık %35'ini kaplıyor. Masaüstünde sağ altta yüzen telefon/WhatsApp butonları da var. |
| Algılanan performans | Reveal animasyonları nedeniyle kaydırma sırasında bölümler bir an boş görünüyor (Uppoint'te de aynı sorun var). Blog kartlarında `sizes` tanımlı, bu iyi. |
| Footer | Sosyal medya hesapları boş (`lib/site.ts → social`). MERSİS ve ticaret sicil gibi yasal kimlik bilgileri görünmüyor. |

---

## 4) Öncelikli aksiyon listesi

| Öncelik | Aksiyon | Neden | Etkilenen dosya(lar) | Efor | Sahibin sağlaması gereken |
|---|---|---|---|---|---|
| P1 | `/referanslar/` sayfasını "Referanslar & Başarı Hikâyeleri" olarak yeniden kurmak: giriş metni, logo şeridi, hikâye kartları (bkz. Bölüm 5) ve sonda CTA. Hikâye yokken yalnızca logo şeridi ve CTA gösterilmeli. | En büyük kanıt açığı burada ve altyapı hazır | `app/(site)/referanslar/page.tsx`, `lib/data/trust.ts` (yeni `CaseStory` tipi), yeni `components/btm/CaseStoryCard.tsx` | M | En az 2–3 gerçek müşteri. Her biri için yazılı kullanım izni (logo, ad, metin), vektör veya yüksek çözünürlüklü logo, verilen hizmetler ve varsa ölçülebilir sonuç |
| P1 | Logo kaynağını teke indirmek: `PartnerLogos.tsx` içindeki sabit listeyi kaldırıp `references` verisini kullanmak | Çift kaynak tutarsızlık riski taşıyor | `components/ensa/PartnerLogos.tsx`, `lib/data/trust.ts` | S | — |
| P1 | Referansı ana menüye taşımak: "Referanslar" ya da "Başarı Hikâyeleri" Hakkımızda altından üst seviyeye çıkmalı. Her hikâye eklendiğinde footer'da da gösterilmeli. | Uppoint'te bu bağlantı ana menüde. Güven sayfası bulunabilir olmalı | `lib/navigation.ts`, `components/ensa/Header.tsx`, `components/ensa/MobileMenu.tsx`, `components/ensa/Footer.tsx` | S | — |
| P1 | Sertifika ve partner rozet şeridi eklemek: hero altında (ProofStrip yanında) ve Hakkımızda'da. Yalnızca belgesi olan rozetler gösterilmeli; kişisel sertifika ile şirket sertifikası ayrı etiketlenmeli ("Ekibimizde ISO 27001 Lead Auditor"). | Uppoint'in en güçlü kurumsal sinyali partner rozeti. BTM'nin gerçek ISO 27001 LA yetkinliği şu an yalnızca metin olarak var | `components/ensa/ProofStrip.tsx` veya yeni `components/btm/CertStrip.tsx`, `app/(site)/page.tsx`, `lib/data/trust.ts` (`certifications` listesi) | S–M | Sertifika PDF'leri ya da doğrulama bağlantıları, partner programı üyelik kanıtı ve resmi rozet dosyaları (partner kullanım kurallarına uygun) |
| P1 | Header CTA'yı iki parçaya bölmek: metinli birincil "Ücretsiz Keşif" butonu `#teklif`'e gitsin, telefon ikincil olsun. Gerekirse "Destek" (uzaktan bağlantı veya teknik@ e-postası) eklensin. | Telefon tek CTA olarak masaüstünde zayıf kalıyor. Mevcut müşteri yolu tanımlı değil | `components/ensa/Header.tsx`, `components/ensa/TopBar.tsx` | S | Varsa uzaktan destek aracı (AnyDesk/TeamViewer QS bağlantısı) veya portal URL'si |
| P2 | Hizmet sayfası şablonuna "İlgili başarı hikâyesi" bloğu eklemek. Hikâyeye etiketlenen hizmet slug'ıyla eşleşme yapılmalı; eşleşme yoksa blok gizlenmeli. | Uppoint her hizmet sayfasında kanıt gösteriyor | `app/(site)/[slug]/[service]/page.tsx`, `components/ensa/CategoryPage.tsx`, `lib/data/trust.ts` | M | Hikâye–hizmet eşleşmesi |
| P2 | Hizmet hero'suna görsel ve 3 etiket pill'i eklemek, kapsam maddelerini ikonlu ızgaraya dönüştürmek, tekrar eden "Neden BTM" bloğunu teke indirmek | Hizmet sayfaları "uzun metin" gibi okunuyor, görsel ritim yok | `components/ensa/PageHero.tsx`, `app/(site)/[slug]/[service]/page.tsx`, `lib/servicePages.ts` | M | Hizmet başına 1 gerçek fotoğraf (saha, rack, kablolama, ekip) |
| P2 | Kendi fotoğraf kütüphanesini oluşturmak: ofis, ekip, sahada kurulum, rack ve kabinet düzeni, eğitim. Tek renk derecelendirmesi (lacivert gölge, turuncu vurgu) ve tek kırpma oranı (16:10 ve 1:1) kullanılmalı. | Uppoint stok fotoğrafı maskeyle markalaştırıyor; BTM gerçek saha fotoğrafıyla daha güvenilir görünür | `public/` altında yeni `public/foto/`, `lib/imageVariants.ts` | L | Profesyonel çekim (yarım gün). Fotoğraflarda görünen kişilerin ve müşteri tesisi çekilecekse tesisin izni |
| P2 | Logo sistemi: SVG ana logo, yatay tek satır "BTM Bilişim" varyantı (header için), beyaz varyant, ikon-yalnız sürüm ve 1 sayfalık kullanım kuralı (boşluk, minimum boyut, yasaklı kullanım) | Raster logo küçük boyutta bulanıklaşıyor, üç satırlı wordmark header'da okunmuyor | `components/ensa/Logo.tsx`, `public/assets/img/*`, `scripts/build-brand-assets.mjs` | M | Logonun orijinal vektör dosyası (AI/SVG/PDF) veya tasarımcıya yeniden çizim onayı |
| P2 | Blog kapak standardı: tek şablon (lacivert zemin, başlık, kategori ikonu) ya da kendi fotoğrafları. Eski `wp-content` görselleri kademeli olarak değiştirilmeli. | Blog listesi stil olarak dağınık görünüyor | `components/ensa/BlogCard.tsx`, `lib/ai/*` (kapak üretimi varsa), `public/blog/` | M | Şablon onayı |
| P2 | Mobil CTA sadeleştirme: alt sabit çubuk varken hero'daki WhatsApp/telefon butonlarından biri kaldırılmalı, çerez bandı alt çubukla çakışmayacak şekilde kompaktlaştırılmalı | İlk ekranda 4 CTA ve banner fazla | `components/ensa/FloatingContact.tsx`, `components/ensa/CookieBanner.tsx`, `components/ensa/PageHero.tsx` | S | — |
| P2 | Footer'a yasal kimlik (unvan, MERSİS, ticaret sicil) ve doldurulmuş sosyal medya bağlantıları eklemek | Kurumsal güven; Uppoint'te var | `components/ensa/Footer.tsx`, `lib/site.ts` | S | MERSİS no, sicil no, LinkedIn şirket sayfası |
| P3 | Blog listesine kategori pill filtresi ve okuma süresi eklemek | Kaynak sayfası daha "kurumsal kütüphane" gibi görünür | `components/site/BlogIndex.tsx`, `app/(site)/blog/page.tsx` | M | — |
| P3 | Hakkımızda'ya ekip fotoğrafları ve "çalışma şeklimiz" zaman çizelgesi (2010 → bugün, yalnızca doğrulanabilir kilometre taşları) eklemek | İnsan yüzü ve geçmiş kanıtı | `app/(site)/[slug]/page.tsx` (hakkimizda içeriği), `components/btm/TeamCards.tsx` | M | Ekip fotoğrafları ve onayları, kilometre taşı tarihleri |
| P3 | Reveal animasyonunu yumuşatmak: başlangıç opaklığını 0 yerine ~0,6 yapmak ya da yalnızca ekrana yakın öğelerde çalıştırmak | Kaydırmada boş ekran algısı oluşuyor | `components/ensa/RevealObserver.tsx`, `components/ensa/MotionReveal.tsx`, `app/(site)/ensa.css` | S | — |
| P3 | `app/globals.css` içindeki eski "gold = mavi" admin token'larının public token'larla karışmadığını belgelemek. Gerekirse adlandırmayı `accent-*` olarak değiştirmek. | Gelecekteki tasarım çalışmalarında yanlış dosyanın düzenlenmesini önler | `app/globals.css`, `app/(site)/ensa.css` | S | — |
| P3 | Referans ilişkisini şeffaflaştırmak: ekip üyesinin eski işvereni olan kurum referans olarak listeleniyorsa ilişki türü doğru etiketlenmeli ("müşteri" mi "iş ortağı" mı). `PartnerLogos` başlığı "İş Ortaklarımız", `TrustSection` başlığı "Bize güvenenler"; ikisi tutarlı hale getirilmeli. | Güven sayfasında yanlış çağrışım riski | `components/ensa/PartnerLogos.tsx`, `components/btm/HomeSections.tsx` | S | İlişki türünün teyidi |

---

## 5) Başarı Hikâyeleri sayfası — taslak yapı

> **İçerik politikası (bağlayıcı):** Hiçbir müşteri, alıntı, rakam veya hikâye uydurulamaz. Her hikâye **gerçek bir müşteriye** ait olmalı ve ad, logo, metin ve (varsa) alıntı için müşterinin **yazılı izni** alınmalıdır. İzin kaydı (`consent`: tarih ve kanal) boşsa kart yayınlanmaz. Bu kural `lib/data/trust.ts`'deki mevcut `Testimonial.consent` mantığıyla aynıdır. Sonuç rakamları (ör. "kesinti süresi %X azaldı") yalnızca müşterinin onayladığı ölçümle yazılabilir. Rakam yoksa alan boş bırakılır ve rakam tahmin edilmez.

### Öneri: yeni rota mı, mevcut sayfa mı?
`/referanslar/` korunmalı ve bu sayfa yükseltilmeli: URL ve iç bağlantılar zaten mevcut. Sayfa H1'i "Referanslar ve Başarı Hikâyeleri" olabilir. Hikâye sayısı 3'ü geçtiğinde, isteğe bağlı olarak `/referanslar/[slug]/` detay sayfaları eklenebilir. Uppoint'te detay sayfası yok; bu BTM için hem SEO hem de farklılaşma fırsatı.

### Bileşen şeması

```
/referanslar/  (app/(site)/referanslar/page.tsx)
├─ PageHero            eyebrow "Referanslar" · H1 · 1 cümle giriş (gerçek ve genel; rakam yok)
├─ LogoWall            references[] → logo + ad (+ sektör). Gri ton, hover'da renk
├─ FilterPills         (≥4 hikâye olunca) Tümü · Siber Güvenlik · Sistem & Network · Bulut · Danışmanlık
├─ CaseStoryList
│   └─ CaseStoryCard × n   (components/btm/CaseStoryCard.tsx)
│       ├─ [sol] müşteri logosu + ad + sektör/şehir rozeti
│       ├─ [sol] H2  başlık (müşterinin onayladığı cümle)
│       ├─ [sol] Zorluk → Çözüm → Sonuç (3 kısa paragraf ya da 3 satır)
│       ├─ [sol] (ops.) alıntı: blockquote + kişi adı/unvanı (ayrı izin)
│       ├─ [sol] "Verilen hizmetler" etiketleri → ilgili hizmet sayfalarına link
│       └─ [sağ] görsel: müşteri izinli saha/ofis fotoğrafı, yoksa nötr marka deseni (sahte ekran görüntüsü YOK)
├─ CtaBand             "Benzer bir ihtiyacınız mı var?" → #teklif / telefon
└─ JsonLd              ItemList (yalnızca yayınlanan hikâyeler)

Yeniden kullanım:
- Ana sayfa TrustSection: ilk 1 hikâye + logo şeridi + "Tüm referanslar"
- Hizmet sayfası: services[] eşleşen ilk hikâye (yoksa blok gizli)
```

### Veri modeli önerisi (`lib/data/trust.ts`'ye eklenir; boş liste ile başlar)

```ts
export type CaseStory = {
  slug: string;              // "musteri-adi" (detay sayfası açılırsa)
  customer: string;          // Müşterinin resmi/izinli adı
  logo: string;              // /referanslar/<dosya>.svg|png
  sector?: string;           // "Üretim", "Lojistik" …
  city?: string;             // "Gebze"
  headline: string;          // Müşterinin onayladığı başlık cümlesi
  challenge: string;         // Zorluk (1–3 cümle)
  solution: string;          // BTM'nin yaptığı iş (1–3 cümle)
  outcome?: string;          // Sonuç; rakam sadece müşteri onaylıysa
  services: string[];        // Hizmet slug'ları → etiket + link
  quote?: { text: string; name: string; role: string; consent: string };
  image?: { src: string; alt: string; consent: string };
  year?: string;             // Proje yılı
  consent: string;           // "2026-10-12 e-posta, X Bey" — boşsa YAYINLANMAZ
};
export const caseStories: CaseStory[] = [];
export const liveCaseStories = caseStories.filter((s) => s.consent.trim());
```

### Hikâye şablonu (sahibin dolduracağı form — yer tutucular, içerik uydurulmadı)

| Alan | Değer |
|---|---|
| Müşteri adı | `[MÜŞTERİ RESMİ ADI]` |
| Logo dosyası | `[SVG veya ≥ 600 px PNG, saydam]` |
| Sektör / şehir | `[SEKTÖR] · [İLÇE/ŞEHİR]` |
| Başlık (müşteri onaylı) | `[TEK CÜMLE BAŞLIK]` |
| Zorluk | `[Müşterinin başlangıçtaki sorunu — 1–3 cümle]` |
| Çözüm | `[BTM'nin yaptığı iş, kullanılan teknolojiler — 1–3 cümle]` |
| Sonuç | `[Gözlenen sonuç; rakam yalnızca müşteri onaylı ölçümse]` |
| Verilen hizmetler | `[hizmet-slug-1]`, `[hizmet-slug-2]` |
| Alıntı (opsiyonel) | `"[ALINTI METNİ]" — [AD SOYAD], [UNVAN]` |
| Görsel (opsiyonel) | `[Dosya]` · alt metin: `[Açıklama]` |
| Proje yılı | `[YYYY]` |
| İzin kaydı | `[Tarih] · [Kanal: e-posta/imzalı form] · [İzni veren kişi ve unvanı]` |

### Sahibin sağlaması gerekenler (kontrol listesi)
- [ ] En az 2–3 gerçek müşteri. Mümkünse farklı hizmet alanlarından olmalı (ör. biri ağ/sunucu, biri güvenlik, biri bulut/yedekleme).
- [ ] Her müşteri için **yazılı izin**: logo, ad, hikâye metni ve (varsa) alıntı ile fotoğraf için ayrı ayrı onay. Bunun için kısa bir izin e-postası şablonu hazırlanabilir.
- [ ] Müşteri logosunun vektör dosyası (müşterinin kendisinden alınmalı).
- [ ] Hikâye metninin müşteriye gönderilip onaylanmış son hali.
- [ ] Varsa ölçülebilir sonuç ve kaynağı (ör. izleme raporu). Rakam yoksa sonuç niteliksel yazılır.
- [ ] İsteğe bağlı: sahada çekilmiş fotoğraf (müşteri tesisi için ayrıca izin gerekir).
- [ ] Mevcut 3 referans için ilişki türünün teyidi ("müşteri" mi "iş ortağı" mı) ve logo izninin yazılı kaydı.

---

## 6) Kopyalanmaması gerekenler / farklılaşma notları

- **Uppoint'in görünümü kopyalanmamalı.** Krem/sarı degrade zemin, siyah pill butonlar, "EN İYİLERİN TERCİHİ" tarzı rozet etiketi, şekil maskeli hero fotoğrafı ve sol koyu kart + sağ ikonlu kart mega menü düzeni onların imzası. Bu yapılar aynen alınmamalı. BTM'de lacivert ve turuncu, Space Grotesk ve "teknik çizim/kablo" motifi (logo ikonundaki devre bağlantıları) korunmalı ve geliştirilmeli.
- **Metinler kopyalanmamalı.** "Ömür Boyu Müşteri", "Net iletişim. Sıfır karmaşa." gibi slogan ve başlık kalıpları ile hikâye başlığı formatı ("X, IT'sini Y'ye Emanet Etti") kullanılmamalı. BTM'nin kendi tonu, yani "tek muhatap", "önce keşif sonra teklif" ve "saldırgan gözüyle", sürdürülmeli.
- **Üstünlük ve rakam iddiaları kopyalanmamalı.** "Lider IT firması", "1100+ mutlu müşteri", "10.000+ cihaz" gibi ifadeler BTM politikasına aykırı. BTM'nin farkı doğrulanabilir kanıt olmalı: yıl, sertifika, isimli ve izinli hikâye.
- **Konumlandırma farkı korunmalı.** Uppoint, Microsoft 365, Azure ve sanal sunucu odaklı bir MSP olarak İstanbul/Türkiye geneline hitap ediyor. BTM'nin güçlü olduğu alanlar güvenlik öncelikli danışmanlık (ISO 27001 LA, sızma testi), Gebze/Kocaeli sanayi bölgesinde yerinde hizmet ve kendi yazılım ürünleri. Görsel dil de bunu göstermeli: sahadaki kabinet, OSB tesisi ve ekip fotoğrafları.
- **Partner rozeti kurallarına uyulmalı.** Microsoft, Veeam, Fortinet gibi markaların logoları yalnızca resmi partnerlik varsa ve o programın rozet kurallarına uygun şekilde kullanılabilir. "Lisans satıyoruz" demek, partner rozeti göstermeye izin vermez.
- **Uppoint'in zayıf yönlerinde BTM öne geçebilir.** Hikâye kartlarında gerçek başlık etiketleri (H2), detay sayfaları, Zorluk→Çözüm→Sonuç yapısı ve hizmet sayfalarına bağlantı ile her sayfada aynı hikâyeyi tekrarlamak yerine eşleşen hikâyeyi göstermek bu fırsatlara örnek.
