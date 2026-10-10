---
title: "Kamera kayıt sistemi: NVR, DVR, bulut kayıt ve depolama rehberi"
metaTitle: "Kamera Kayıt Sistemi: NVR, DVR ve Bulut Kayıt"
metaDescription: "Kamera kayıt sistemi seçimi: NVR, DVR ve bulut farkları, disk ve kayıt süresi hesabı, RAID, UPS ve KVKK saklama süresi. Ücretsiz keşif için bize ulaşın."
excerpt: "Kamera kayıt sistemi seçerken NVR, DVR ve bulut farklarını, disk kapasitesi hesabını, RAID ve UPS ile sürekliliği, ağ güvenliğini ve KVKK saklama kurallarını tek sayfada topladık."
focusKeyword: "kamera kayıt sistemi"
tags: ["Kamera Sistemleri", "NVR ve DVR", "Kayıt Yedekleme", "KVKK"]
---

Kamera kayıt sistemi, kameralardan gelen görüntüyü NVR, DVR ya da bulut üzerinde saklayan ve gerektiğinde geri izlemenizi sağlayan altyapıdır. Doğru sistem; kamera tipine, istenen kayıt süresine, diskin dayanıklılığına, elektrik ve ağ sürekliliğine göre seçilir. Bu rehberde bu kararların her birini sahada uyguladığımız yöntemle anlatıyoruz.

Gebze, Dilovası ve Tuzla'daki organize sanayi bölgelerinde çok vardiyalı çalışan tesislerde sık karşılaştığımız tablo şudur: kameralar yerinde, ama ihtiyaç anında kayıt ya yoktur ya da istenen tarihe kadar geriye gitmez. Sorun çoğu zaman kamerada değil, kayıt ve depolama planındadır. Kamera seçimi ve montaj tarafı için [IP kamera ve güvenlik kamerası sistemleri](/sistem-network/ip-kamera-guvenlik-kamerasi-sistemleri/) sayfamıza bakabilirsiniz; bu sayfada kaydın kendisine odaklanıyoruz.

## NVR, DVR ve bulut: kamera kayıt sistemi türleri

**DVR (Digital Video Recorder)** analog ya da HD-analog kameralarla çalışır. Görüntü koaksiyel kabloyla cihaza gelir; dijitale çevirme ve sıkıştırma işi kayıt cihazında yapılır. Mevcut koaksiyel kablolamanın korunmak istendiği küçük yapılarda hâlâ mantıklı olabilir, ancak çözünürlük ve görüntü analizi tarafında sınırları erken hissedilir.

**NVR (Network Video Recorder)** IP kameralarla çalışır. Kamera görüntüyü kendisi sıkıştırıp ağ üzerinden gönderir; NVR bu akışı diske yazar, arşivler ve izleme istasyonlarına sunar. Kameralar PoE (802.3af/at) switch üzerinden tek kabloyla hem veri hem enerji alır. Yüksek çözünürlük, kamera üzerinde analiz ve ölçeklenebilirlik gereken ofis, depo ve fabrikalarda bugün varsayılan tercih NVR tabanlı bir kamera kayıt sistemidir.

**Bulut kayıtta** görüntü doğrudan kameradan ya da NVR üzerinden internetteki bir depolama hizmetine gönderilir. Cihaz çalınsa veya yangında zarar görse bile kayıt dışarıda kalır. Bunun bedeli, sürekli yüklemeye yetecek upload bant genişliği ve abonelik maliyetidir. Bu yüzden çoğu işletmede doğru cevap hibrit modeldir: sürekli kayıt yerelde, kritik kameralar ve olay klipleri bulutta.

| Kriter | DVR | NVR | Bulut kayıt |
|---|---|---|---|
| Kamera tipi | Analog / HD-analog | IP kamera | IP kamera (doğrudan veya NVR üzerinden) |
| Kablolama | Koaksiyel + ayrı enerji hattı | Cat6 / fiber, PoE ile tek kablo | Yerel ağ + internet çıkışı |
| Görüntü işleme | Kayıt cihazında | Kamerada; NVR kaydeder | Kamerada veya NVR'de |
| Büyüme | Kanal sayısıyla sınırlı | Ağ ve lisansla genişler | Abonelikle genişler |
| İnternet kesintisinde | Kayıt sürer | Kayıt sürer | Yerel tampon yoksa kayıt durur |
| Hırsızlık / yangın | Kayıt cihazla birlikte gider | Kayıt cihazla birlikte gider | Kayıt tesis dışında kalır |
| Uygun senaryo | Mevcut koaksiyel altyapı, küçük alan | Ofis, depo, fabrika | Şube, kritik giriş, hibrit yedek |

## Kamera kayıt sisteminde disk kapasitesi ve kayıt süresi hesabı

Bir kamera kayıt sisteminin kaç gün geriye gidebileceğini belirleyen şey disk boyutu değil, kameraların ürettiği veri miktarıdır. Bu miktar bit hızıyla (bitrate) ifade edilir ve çözünürlük, kare hızı (FPS), sıkıştırma standardı (H.264 / H.265), sahnedeki hareket ve gece görüntüsündeki gürültüyle değişir. Forkliftlerin sürekli geçtiği bir yükleme rampası, boş bir koridordan çok daha fazla veri üretir; gece kızılötesi aydınlatmada oluşan gren de bit hızını yükseltir.

Temel formül şudur:

**Gerekli kapasite (GB) ≈ Bit hızı (Mbps) × 86.400 × Gün sayısı × Kamera sayısı ÷ 8 ÷ 1000**

86.400 bir gündeki saniye sayısıdır; 8'e bölmek biti bayta, 1000'e bölmek megabaytı gigabayta çevirir.

**Örnek (yalnızca hesap mantığını göstermek için):** Ortalama 4 Mbps akış üreten bir kamera günde yaklaşık 4 × 86.400 ÷ 8 ÷ 1000 = 43,2 GB yazar. 16 kamera ve 30 günlük hedefte bu, 43,2 × 16 × 30 ≈ 20.736 GB, yani kabaca 21 TB eder. Sizin kameralarınızın gerçek bit hızı farklı olacağından bu rakamı proje değeri olarak kullanmayın.

Sahada kapasiteyi şu sırayla belirliyoruz:

1. Her kameranın ortalama bit hızını gündüz ve gece ayrı ayrı, NVR veya kamera arayüzünden okuyoruz; katalog değerine değil ölçüme güveniyoruz.
2. KVKK saklama politikanızdaki gün sayısını hedef süre olarak alıyoruz.
3. Kamera bazında sürekli kayıt mı, hareket ya da olay tetiklemeli kayıt mı yapılacağına karar veriyoruz.
4. Formülle ham kapasiteyi hesaplıyor, büyüme ve gece artışı için pay ekliyoruz.
5. Seçilen RAID seviyesinin kullanılabilir alandan ne kadar düşeceğini hesaba katıyoruz.
6. Kurulumdan birkaç hafta sonra NVR'deki en eski kaydın tarihine bakarak hesabı doğruluyoruz.

H.265, aynı görüntü kalitesinde H.264'e göre belirgin biçimde daha az veri üretir; kazanç sahneye göre değiştiği için sabit bir oran varsaymamak gerekir. Disk tarafında 7/24 yazma yüküne göre tasarlanmış gözetim (surveillance) serisi diskleri kullanıyoruz. Masaüstü diskler sürekli yazma ve yan yana çalışan disklerin titreşimi için tasarlanmadığından erken arıza riski taşır. Disk dolduğunda NVR en eski kaydın üzerine yazar; bu davranışın açık olduğunu ve maksimum kayıt gününün saklama politikanızla uyumlu ayarlandığını mutlaka kontrol edin.

## RAID, kayıt yedekleme ve UPS ile süreklilik

Bir kamera kayıt sisteminin değeri, olay anındaki görüntüyü sunabildiği ölçüdedir. Disk arızası, cihaz kaybı ve elektrik kesintisi bu zinciri koparan üç ana nedendir.

### RAID: disk arızasında kaydı kaybetmemek

Tek diskli bir NVR'de disk bozulduğunda o diskteki geçmiş kayıtlar gider. Çok diskli cihazlarda RAID bu riski azaltır. RAID 1 iki diski birbirinin aynısı yapar; kapasitenin yarısından vazgeçersiniz ama bir disk arızasında kayıt sürer. RAID 5 en az üç diskte bir diskin kapasitesini eşlik (parity) bilgisine ayırır ve tek disk arızasını tolere eder. Disk boyutu büyüdükçe yeniden oluşturma (rebuild) süresi uzar; bu süre içindeki ikinci arıza riskine karşı büyük dizilerde RAID 6 değerlendirilebilir. Unutulmaması gereken nokta şu: RAID yedek değildir. Cihazın çalınmasına, yangına, yanlışlıkla silmeye ya da fidye yazılımına karşı koruma sağlamaz.

### Kayıt yedekleme: 3-2-1 mantığı

Tüm görüntüleri ikinci bir yere kopyalamak çoğu işletme için gereksiz maliyettir. Pratik yaklaşım, olay kayıtlarını ve kritik kameraları (kasa, ana giriş, sevkiyat rampası) yedeklemektir. 3-2-1 kuralı burada da işe yarar: verinin üç kopyası, iki farklı ortam, bir kopya tesis dışında. Bulut hesabı, ayrı bir NAS ya da merkez ofisteki depolama bu tesis dışı kopya olabilir. Kamera içindeki SD kart (edge kayıt), ağ veya NVR koptuğunda kısa süreli tampon görevi görür; destekleyen sistemlerde bağlantı geri gelince boşluk NVR'ye aktarılır. Kurumsal yedekleme kurgusunu [veri yedekleme çözümleri](/bulut-yedekleme/veri-yedekleme-cozumleri/) sayfamızda ayrıntılı anlatıyoruz.

### UPS: elektrik kesildiğinde kör kalmamak

Elektriği kesmek, kamera kayıt sistemini devre dışı bırakmanın en kolay yoludur. Ani kesintiler disklere ve dosya sistemine de zarar verebilir. UPS'e yalnızca NVR'yi değil; PoE switch'leri, modem ve firewall'u da bağlamak gerekir. Aksi hâlde kayıt cihazı çalışsa bile kameralar görüntü göndermez, uzaktan izleme de kesilir. UPS kapasitesini toplam watt tüketimine, özellikle PoE yüküne ve gece kızılötesi açıldığında artan tüketime göre hesaplıyoruz. Şebekesi dalgalı sanayi bölgelerinde online (çift dönüşümlü) UPS, cihazları voltaj dalgalanmalarına karşı da korur. Akülerin periyodik testi ve kabin havalandırması, kurulumun kendisi kadar önemlidir.

## Kamera ağı ve uzaktan erişim güvenliği

Kamera kayıt sistemi aynı zamanda ağa bağlı bir bilgisayardır ve öyle korunmalıdır. İnternete açık kameralar ve kayıt cihazları, otomatik tarama araçlarının sürekli aradığı hedeflerdir.

### Kamera ağını ayrı VLAN'da tutmak

Kameraları ve NVR'yi ofis bilgisayarlarından ayrı bir VLAN'a alıyoruz. Böylece yoğun video trafiği ofis ağını yavaşlatmaz; kameralardan birinin ele geçirilmesi durumunda saldırganın muhasebe sunucusuna ilerlemesi de zorlaşır. VLAN'lar arası trafiğe yalnızca gerekli izinleri veriyoruz: izleme istasyonu NVR'ye erişebilir, kameralar internete çıkamaz. Kablolama, PoE bütçesi ve VLAN tasarımını [ağ altyapısı kurulum ve yönetimi](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/) hizmetimizin parçası olarak ele alıyoruz.

### Port açmak yerine VPN

Modemde port yönlendirip NVR'yi doğrudan internete açmak, sahada en sık gördüğümüz risktir. Uzaktan izlemeyi VPN tüneli üzerinden kuruyoruz: kullanıcı önce şirket ağına şifreli bağlanır, ardından NVR'ye ulaşır; dışarıdan görünen bir kamera portu kalmaz. Üreticinin P2P uygulaması küçük işletmelerde pratiktir, ancak hesabın güçlü parola ve iki adımlı doğrulamayla korunması gerekir. Statik IP kullanılan yapılarda erişimi [firewall ve ağ güvenliği](/siber-guvenlik/firewall-ve-ag-guvenligi/) kurallarıyla yalnızca tanımlı kaynaklara açıyoruz.

Teslimden önce her kamera kayıt sistemi için şu listeyi kontrol ediyoruz:

- [ ] Kamera ve NVR'lerin varsayılan parolaları değiştirildi, her kullanıcıya ayrı hesap açıldı
- [ ] Kamera ağı ayrı VLAN'da, kameraların internete çıkışı kapalı
- [ ] Modemde NVR veya kameraya yönlendirilmiş port yok; uzaktan erişim VPN ile
- [ ] UPnP ve kullanılmayan servisler kapatıldı
- [ ] Firmware güncellemeleri üreticinin resmi kaynağından düzenli olarak kontrol ediliyor
- [ ] NVR saati NTP ile senkron, kayıt zaman damgaları doğru
- [ ] NVR, PoE switch ve modem UPS üzerinde; akü testi takvimde
- [ ] Erişim ve dışa aktarma kayıtları (log) tutuluyor

## KVKK: saklama süresi ve erişim yetkisi

Kamera görüntüsü kişiyi tanımlanabilir kıldığı için kişisel veridir; dolayısıyla kamera kayıt sistemi KVKK kapsamında değerlendirilir. Pratikte üç başlık öne çıkar:

- **Aydınlatma:** Kamera bulunan alanlara kaydın yapıldığını ve amacını bildiren görünür levha asılır, ayrıntılı aydınlatma metni erişilebilir tutulur.
- **Saklama süresi:** Görüntülerin ne kadar tutulacağı amaca göre belirlenir ve saklama-imha politikasına yazılır. NVR'deki maksimum kayıt günü bu politikayla uyumlu ayarlanır, süresi dolan kayıtlar üzerine yazılarak silinir. Olay nedeniyle dışa aktarılan klipler ayrıca takip edilir.
- **Erişim yetkisi:** Her personel her kamerayı görmemelidir. Canlı izleme, geçmiş kaydı oynatma ve dışa aktarma yetkileri rol bazında ayrılır, kimin neyi izlediği kayıt altına alınır.

Soyunma odası ve tuvalet gibi mahremiyet alanlarına kamera yerleştirilmez. Saklama süresi ve VERBİS gibi yükümlülükler işletmenin durumuna göre değiştiği için bu konuları [KVKK danışmanlığı](/danismanlik/kvkk-danismanligi/) kapsamında hukuki tarafla birlikte değerlendirmenizi öneririz.

## Sık Yapılan Hatalar

- **Masaüstü disk kullanmak:** 7/24 yazma yükünde erken arıza ve kayıp kayıt görülür. Önlem: gözetim serisi disk kullanmak ve disk sağlığı (S.M.A.R.T.) uyarılarını e-postaya bağlamak.
- **Kapasiteyi katalog bit hızıyla hesaplamak:** Gece ve yoğun hareketli sahnelerde kayıt süresi beklenenden kısalır. Önlem: gerçek akışı ölçüp pay bırakmak.
- **RAID'i yedek sanmak:** Cihaz çalındığında veya fidye yazılımı bulaştığında tüm kayıt gider. Önlem: kritik kayıtlar için tesis dışı kopya.
- **NVR'yi port açarak internete çıkarmak:** Cihaz tarama botlarının hedefi olur. Önlem: VPN ile erişim ve kapalı UPnP.
- **Yalnızca NVR'yi UPS'e bağlamak:** Kesintide switch kapanır, kameralar görüntü göndermez. Önlem: PoE switch ve modemi de UPS'e almak.
- **Saklama süresini belirlememek:** Kayıtlar ya gereğinden uzun tutulur ya da ihtiyaç anında silinmiş olur. Önlem: politikayla uyumlu maksimum kayıt günü.

Kamera seçimi aşamasında yapılan hatalar için [güvenlik kamerası seçim hataları](/guvenlik-kamerasi-secim-hatalari/) yazımıza göz atabilirsiniz.

## Sıkça Sorulan Sorular

### Kayıt cihazının diski dolduğunda ne olur?

Kamera kayıt sisteminde üzerine yazma açıksa NVR veya DVR en eski kaydı silip yeni görüntüyü yazmaya devam eder; kayıt durmaz. Bu ayar kapalıysa disk dolduğunda kayıt durur ve çoğu zaman fark edilmez. Kurulumda bu ayarı ve maksimum kayıt günü sınırını kontrol ediyor, saklama politikanızla uyumlu hâle getiriyoruz. Disk arıza uyarılarının e-postaya gelmesini de öneriyoruz.

### İnternet kesilirse kamera kaydı durur mu?

Kameralar ve NVR yerel ağda bağlıysa internet kesintisi kaydı etkilemez; yalnızca uzaktan izleme ve bildirimler durur. Sadece bulut kayıt kullanan sistemlerde ise internet gidince kayıt da kesilir, kamerada SD kart tamponu yoksa o aralık kaybolur. Bu nedenle yerel kaydı temel alan, bulutu yedek katman olarak kullanan hibrit yapıyı öneriyoruz.

### 7/24 kayıt için özel bir disk gerekir mi?

Evet. Gözetim serisi diskler sürekli yazma yüküne, aynı anda çok sayıda kameradan gelen akışa ve çoklu disk titreşimine göre tasarlanır. Masaüstü diskler bu yük altında daha erken yorulabilir. Kamera kayıt sisteminin disk kapasitesini kayıt süresi hesabına göre seçiyor, çok diskli cihazlarda RAID ile tek disk arızasının kayıt kaybına dönüşmesini önlüyoruz.

### Kamera kayıtlarını ne kadar süre saklamalıyım?

Herkes için geçerli tek bir süre yoktur; süre, kaydın amacına ve işletmenizin saklama-imha politikasına göre belirlenir. Amaçtan uzun saklamak KVKK açısından risk, çok kısa tutmak ise olay sonrası inceleme açısından sorun yaratır. Belirlenen süreyi NVR'nin maksimum kayıt günü ayarına yansıtıyor, olay kliplerini ayrı bir süreçle yönetiyoruz.

### Kamera kayıt sistemine telefondan güvenli nasıl erişirim?

En güvenli yol, telefona VPN istemcisi kurup şirket ağına şifreli bağlanmak ve ardından NVR uygulamasını kullanmaktır; böylece modemde açık port kalmaz. Üretici P2P uygulaması kullanılacaksa güçlü ve benzersiz parola, iki adımlı doğrulama ve güncel firmware şarttır. Her kullanıcıya yalnızca ihtiyaç duyduğu kameraları görebileceği ayrı bir hesap tanımlıyoruz.

## Kaynaklar

- [Kişisel Verileri Koruma Kurumu](https://www.kvkk.gov.tr/)
- [USOM – Ulusal Siber Olaylara Müdahale Merkezi](https://www.usom.gov.tr/)
- [CISA – Cybersecurity and Infrastructure Security Agency](https://www.cisa.gov/)
- [NIST – National Institute of Standards and Technology](https://www.nist.gov/)

## Kayıt altyapınızı birlikte planlayalım

BTM Bilişim olarak kamera kayıt sistemi projelerinde kayıt cihazı, disk ve RAID seçimini, UPS ve VLAN tasarımını ve KVKK uyumlu yetkilendirmeyi tek planda ele alıyoruz. Mevcut sisteminiz için de kapasite ve güvenlik kontrolü yapabiliriz. Ücretsiz keşif ve teklif için [formu doldurun](/#teklif).

*Hazırlayan: BTM Bilişim teknik ekibi.*
