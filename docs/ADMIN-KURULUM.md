# Admin Panel Kurulum Rehberi

Bu rehber `/admin` yönetim panelini canlıya almak için gereken adımları sırayla anlatır.

**İşaretler:**

- **[SAHİBİ]**: Bu adımı site sahibi kendisi yapar. Hesap açma, şifre belirleme, ücretli plan seçme ve gizli anahtarları girme bu gruptadır. Bu adımları ekip ya da bir yapay zekâ ajanı yapmaz.
- **[TERMİNAL]**: Proje klasöründe (`iso27001danismanlik.com`) çalıştırılacak komut.
- **[BİLGİ]**: Yalnızca açıklama, işlem gerekmez.

> **[BİLGİ] Veritabanı bağlanana kadar ne olur?**
> Genel site etkilenmez. `DATABASE_URL` boşken bütün sayfalar `lib/data/fallback-pages.json` dosyasından sunulur. Admin paneline girildiğinde yazı listesi yerine **"Veritabanı bağlı değil — kurulum adımları"** ekranı çıkar. Kayıt ve silme işlemleri anlaşılır bir hata mesajıyla reddedilir. `ADMIN_PASSWORD_HASH` ya da `SESSION_SECRET` eksik veya hatalıysa giriş sayfası hangi değişkenin eksik olduğunu gösterir. Değişkenlerin değerlerini göstermez.

---

## 0. Ön koşullar

| Gerekli | Açıklama |
|---|---|
| Node.js 20 veya üstü | `node -v` ile kontrol edin |
| Proje bağımlılıkları | **[TERMİNAL]** `npm install` |
| Vercel projesi | Site zaten Vercel'de yayında (`main` dalına push edilince otomatik yayınlanır) |
| `.env.local` dosyası | Yerel çalışma için. `.env.example` dosyasını `.env.local` adıyla kopyalayın. **Bu dosya git'e girmez; içine yazdığınız anahtarları kimseyle paylaşmayın.** |

---

## 1. Neon Postgres veritabanı açın **[SAHİBİ]**

İki yol vardır. **A yolu önerilir**, çünkü değişkenler Vercel'e otomatik eklenir.

### A) Vercel üzerinden (önerilen)

1. Vercel'de projeyi açın, sonra **Storage** sekmesine gidin.
2. **Create Database** düğmesine basın ve **Neon (Serverless Postgres)** seçin.
3. Bölge olarak **Frankfurt (eu-central-1)** seçin. Türkiye'ye en yakın bölge budur.
4. Plan seçin. Başlangıç için ücretsiz plan yeterlidir.
5. **Connect Project** adımında bu projeyi ve **Production, Preview ve Development** ortamlarını işaretleyin.
6. Vercel `DATABASE_URL` ve `DATABASE_URL_UNPOOLED` değişkenlerini kendisi ekler. Bunlar dışında `PGHOST` gibi ek değişkenler de gelebilir; sorun değildir.

### B) Doğrudan neon.tech üzerinden

1. <https://neon.tech> adresinde hesap açın ve yeni bir proje oluşturun (bölge: **AWS Europe Central 1 / Frankfurt**).
2. **Dashboard**'da **Connect** düğmesine basın. İki bağlantı adresini kopyalayın:
   - **Pooled connection**: host adında `-pooler` geçer. Bu adres `DATABASE_URL` olacak.
   - **Direct connection**: host adında `-pooler` geçmez. Bu adres `DATABASE_URL_UNPOOLED` olacak.
3. Adreslerin sonunda `?sslmode=require` bulunmalıdır.

---

## 2. Ortam değişkenlerini girin **[SAHİBİ]**

Değişkenler **Vercel, Settings, Environment Variables** ekranından girilir. Yerel çalışma için aynı değerleri `.env.local` dosyasına da yazın.

| Değişken | Zorunlu mu? | Ne işe yarar / nereden alınır |
|---|---|---|
| `DATABASE_URL` | **Evet** | Neon pooled bağlantı adresi (1. adım) |
| `DATABASE_URL_UNPOOLED` | **Evet** | Neon direct bağlantı adresi. `db:push` komutu bunu kullanır |
| `ADMIN_PASSWORD_HASH` | **Evet** | Admin şifresinin özeti (3. adım). **Şifrenin kendisi girilmez** |
| `SESSION_SECRET` | **Evet** | Oturum çerezini imzalayan gizli anahtar. **En az 32 karakter**, rastgele olmalı (3. adım) |
| `SESSION_VERSION` | Hayır (varsayılan `1`) | Değeri artırırsanız (`2`, `3`, …) açık olan bütün oturumlar kapanır (8. adım) |
| `BLOB_READ_WRITE_TOKEN` | Görsel yüklemek için evet | Vercel, **Storage, Create, Blob** ile oluşturulur. Store **Public** olmalıdır. Projeye bağlayınca değişken otomatik gelir |
| `ANTHROPIC_API_KEY` / `GEMINI_API_KEY` / `OPENAI_API_KEY` / `DEEPSEEK_API_KEY` | AI yazı üretimi için en az biri | İlgili sağlayıcının konsolundan alınır. Birden fazla anahtar varsa öncelik sırası şöyledir: Claude, Gemini, DeepSeek, OpenAI |
| `BLOG_AI_PROVIDER` | Hayır | Sağlayıcıyı zorlar: `anthropic`, `google`, `openai` ya da `deepseek` |
| `BLOG_AI_MODEL`, `BLOG_AI_EFFORT` | Hayır | Model adını ya da düşünme düzeyini değiştirmek için. Boş bırakılırsa varsayılan kullanılır |
| `BLOG_IMAGE_PROVIDER`, `CF_ACCOUNT_ID`, `CF_API_TOKEN` | Hayır | AI görsel üretimi. Cloudflare Workers AI anahtarı varsa o kullanılır. Yoksa ücretsiz yedek servise düşülür |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Hayır (önerilir) | Giriş denemesi sınırı Vercel'in birden fazla sunucu örneğinde ortak sayılır. Bu değişkenler yoksa sınır her örnek için ayrı, bellek içinde tutulur |

> **Önemli:** Değişkenleri ekledikten veya değiştirdikten sonra Vercel'de **Deployments, son dağıtım, Redeploy** yapın. Yeni değerler ancak yeni dağıtımda geçerli olur.

---

## 3. Admin şifresini ve oturum anahtarını üretin

1. **[SAHİBİ]** En az 12 karakterlik, başka hiçbir yerde kullanmadığınız bir şifre belirleyin. Bir parola yöneticisine kaydedin.
2. **[TERMİNAL]** Şu komutu çalıştırın:

   ```bash
   npm run hash-password -- "sifrenizi-buraya-yazin"
   ```

   Komut iki değer yazdırır:
   - `ADMIN_PASSWORD_HASH` değeri, `salt:özet` biçiminde (iki nokta ile ayrılmış uzun bir hex metin). **Tamamını olduğu gibi** kopyalayın.
   - `SESSION_SECRET` için rastgele üretilmiş bir değer.
3. **[SAHİBİ]** İki değeri de Vercel'e ve `.env.local` dosyasına girin (2. adım).
4. **[BİLGİ]** Şifrenin kendisi hiçbir yere kaydedilmez. Komutu çalıştırdıktan sonra terminal geçmişini temizlemek iyi olur (PowerShell'de `Clear-History`, bash'te `history -c`).

Şifreyi değiştirmek için bu adımı tekrarlayın, yeni `ADMIN_PASSWORD_HASH` değerini girin ve `SESSION_VERSION` değerini bir artırın.

---

## 4. Tabloyu oluşturun: `npm run db:push` **[TERMİNAL]**

`.env.local` dosyasında `DATABASE_URL_UNPOOLED` (ya da `DATABASE_URL`) dolu olmalıdır.

```bash
npm run db:push
```

- `lib/db/schema.ts` içindeki `pages` tablosunu ve indeksleri Neon'da oluşturur.
- Onay sorarsa değişiklikleri okuyun, ardından onaylayın. İlk kurulumda yalnızca "create table" görmelisiniz.
- Şema ileride değişirse aynı komut yeniden çalıştırılır.

---

## 5. Mevcut site içeriğini aktarın: `npm run content:migrate` **[TERMİNAL]**

Statik sitedeki yaklaşık 154 sayfa ve yazı, adresleri (slug) değişmeden veritabanına aktarılır.

```bash
# Önce deneme: hiçbir şey yazmaz, yalnızca özet gösterir
npm run content:migrate -- --dry-run

# Gerçek aktarım
npm run content:migrate
```

- Kaynak dosya `scripts/data/legacy-pages.json`, depoda hazır bulunur.
- Veritabanında **zaten bulunan** sayfalar varsayılan olarak **atlanır**. Böylece panelde yaptığınız düzenlemeler ezilmez.
- `--update` bayrağı mevcut kayıtların üzerine yazar. **Dikkat:** panelde yapılan değişiklikleri siler. Yalnızca bilerek kullanın.
- Statik sitede içerik değiştiyse önce `npm run content:export` komutuyla JSON dosyalarını yenileyin, sonra aktarımı tekrarlayın.

---

## 6. İlk giriş **[SAHİBİ]**

1. Redeploy tamamlandıktan sonra `https://www.iso27001danismanlik.com/admin/` adresini açın.
2. Giriş sayfası açılır. Sayfada "Admin girişi henüz yapılandırılmamış" uyarısı görünüyorsa listede adı geçen değişkeni düzeltip yeniden dağıtın.
3. 3. adımda belirlediğiniz şifreyle giriş yapın.
4. Panelde **Blog** ve **Sayfalar** sayıları görünmelidir. "Veritabanı bağlı değil" ekranı çıkıyorsa `DATABASE_URL` eksiktir. "Veritabanına ulaşılamıyor" ekranı çıkıyorsa adres hatalıdır ya da Neon projesi askıdadır.
5. Kısa bir deneme yapın:
   - **Blog, Yeni Yazı** ile bir taslak kaydedin. Listede "Taslak" olarak görünmeli.
   - **Önizle** bağlantısıyla taslağı açın. Yalnızca oturum açıkken görünür.
   - **İleri Tarihte Yayınla** ile birkaç dakika sonrasına zamanlayın. Saat geldikten sonra en geç 5 dakika içinde sitede yayına girer.
   - Slug'ı değiştirip kaydedin. Eski adres yeni adrese 301 ile yönlenir.
   - Kapak görseli yükleyin (`BLOB_READ_WRITE_TOKEN` gerekir).
   - Deneme yazısını silin.

**[BİLGİ] Güvenlik özellikleri:**
- Oturum çerezi `HttpOnly` ve `SameSite=Strict`, canlıda ayrıca `Secure` işaretlidir. Oturum 12 saat sürer.
- IP başına 10 dakikada en fazla 10, tüm IP'lerde toplam en fazla 60 giriş denemesine izin verilir.
- Her yönetim ekranı ve her kaydetme ya da silme işlemi oturumu sunucuda yeniden doğrular.
- Server Action istekleri farklı bir siteden (Origin) gelirse Next.js bu istekleri reddeder (CSRF koruması).

---

## 7. Yedekleme **[SAHİBİ]**

| Ne | Nasıl |
|---|---|
| **Veritabanı: anlık geri dönüş** | Neon, belirli bir süre geriye dönük geri yükleme (point-in-time restore) sunar. Süre plana göre değişir. Neon panelinde **Backup & Restore** (ya da **Branches, Restore**) ekranından kontrol edin |
| **Veritabanı: düzenli dışa aktarım** | Ayda en az bir kez, ayrıca büyük toplu değişikliklerden önce: `pg_dump "<DATABASE_URL_UNPOOLED>" -Fc -f yedek-YYYY-AA-GG.dump` (PostgreSQL istemci araçları gerekir). Dosyayı şifreli bir yerde saklayın |
| **Geri yükleme** | `pg_restore -d "<DATABASE_URL_UNPOOLED>" --clean yedek-YYYY-AA-GG.dump`. Önce Neon'da **ayrı bir branch** üzerinde deneyin |
| **Görseller (Vercel Blob)** | Blob'a yüklenen görseller veritabanında değil Blob store'da durur. Vercel, **Storage, Blob** ekranından listelenip indirilebilir |
| **Statik yedek** | Veritabanı tamamen kaybolsa bile site `lib/data/fallback-pages.json` ile açılır. Ancak panelde sonradan yazılan içerik bu dosyada yoktur |

---

## 8. Sorun giderme

| Belirti | Çözüm |
|---|---|
| Giriş sayfasında "ADMIN_PASSWORD_HASH biçimi hatalı" uyarısı | Değeri eksik ya da tırnakla kopyalamış olabilirsiniz. `npm run hash-password` çıktısını tırnaksız ve tek satır olarak girin |
| "SESSION_SECRET çok kısa" uyarısı | En az 32 karakterlik rastgele bir değer girin (`npm run hash-password` bir tane üretir) |
| Doğru şifreyle "Şifre hatalı" hatası | Vercel'deki hash başka bir şifreye ait olabilir ya da Redeploy yapılmamış olabilir |
| "Çok fazla deneme" uyarısı | 10 dakika bekleyin |
| Herkesin oturumunu kapatmak (şüpheli durum, şifre değişikliği) | `SESSION_VERSION` değerini artırın ve Redeploy yapın |
| "Bu URL zaten kullanılıyor" hatası | Farklı bir slug girin |
| "... sitenin sabit bir adresi" hatası | `blog`, `iletisim`, `admin` gibi adresler sitenin kendi sayfalarıdır. Başka bir slug seçin |
| Görsel yükleme hatası | `BLOB_READ_WRITE_TOKEN` eksik olabilir ya da Blob store Public değildir |
| AI üretimi "sağlayıcı anahtarı tanımlı değil" diyor | 2. adımdaki AI anahtarlarından en az birini girin ve Redeploy yapın |
