---
title: "Gebze OSB fabrika kamera sistemi kurulumu: sektöre göre planlama"
metaTitle: "Fabrika Kamera Sistemi: OSB ve Depo Kurulumu"
metaDescription: "Fabrika kamera sistemi için OSB ve sektöre göre risk analizi, exproof, IR menzil, VLAN ve kayıt planı. Gebze, Dilovası ve Tuzla için ücretsiz keşif isteyin."
excerpt: "Gebze OSB, Dilovası, TOSB ve Tuzla depoları için fabrika kamera sistemi rehberi: sektöre göre risk tablosu, exproof ve termal kamera seçimi, ağ ve kayıt altyapısı, KVKK kontrol listesi."
focusKeyword: "fabrika kamera sistemi"
tags: ["Kamera Sistemleri", "Fabrika Güvenliği", "OSB Kamera Kurulumu"]
---

Fabrika kamera sistemi, Gebze ve çevresindeki OSB'lerde yalnızca hırsızlığa karşı değil; iş güvenliği, sevkiyat kontrolü ve üretim izlenebilirliği için kurulur. Doğru sistem, sektörün riskine göre seçilen kamera tipi, ayrı bir kamera ağı ve yeterli kayıt kapasitesiyle başlar. Bu rehberde OSB tipine göre neye dikkat etmeniz gerektiğini adım adım anlatıyoruz.

## Fabrika kamera sistemi neden ofis kurulumundan farklıdır?

Bir ofiste birkaç dome kamera ve küçük bir kayıt cihazı çoğu zaman yeterlidir. Fabrikada ise aynı yaklaşım hızla tıkanır. Alanlar geniştir, tavanlar yüksektir, ortamda toz, nem, yağ buharı, titreşim ve bazı tesislerde patlayıcı atmosfer bulunur. Kamera sayısı arttıkça ağ trafiği, enerji ihtiyacı ve kayıt hacmi de büyür; bunlar baştan planlanmazsa sistem zamanla görüntü kaybı ve dolan disklerle uğraşmaya başlar.

Bir fabrika kamera sisteminden beklenen işler de farklıdır. Güvenlik birimi çevre ihlalini ve mesai dışı girişi görmek ister; İSG ekibi forklift ve pres çevresindeki olayları geriye dönük incelemek ister; lojistik tarafı ise hangi aracın hangi rampadan ne zaman çıktığını bilmek ister. Tek bir kamera tipiyle bu üç ihtiyacı karşılamak mümkün değildir. Bu yüzden ekibimiz projeye ürün listesiyle değil, alan alan risk haritasıyla başlar.

Genel IP kamera seçenekleri, çözünürlük ve lens türleri için [IP kamera ve güvenlik kamerası sistemleri](/sistem-network/ip-kamera-guvenlik-kamerasi-sistemleri/) sayfamıza bakabilirsiniz. Bu sayfada odak, sanayi tesislerine özgü kararlardır.

## OSB ve sektör tipine göre risk ve kamera yaklaşımı

Gebze OSB, Dilovası OSB, TOSB, İMES, Plastikçiler, Kömürcüler, Makine, Kimya, KOBİ ve Güzeller OSB'lerinde ve Tuzla'daki lojistik depolarda sahada gördüğümüz riskler birbirinden belirgin biçimde ayrılır. Aşağıdaki tablo, bölgeyi değil tesisin yaptığı işi esas alır; aynı OSB içinde bir boya üreticisi ile bir kalıphane bambaşka bir fabrika kamera sistemine ihtiyaç duyar.

| Tesis / bölge tipi | Tipik risk | Kamera ve altyapı yaklaşımı |
| --- | --- | --- |
| Kimya OSB ve kimya, boya, solvent tesisleri | Patlayıcı gaz veya toz ortamı, kimyasal buhar, korozyon | Ex bölge sınıfına uygun, ATEX/IECEx işaretli exproof muhafazalar; paslanmaz gövde; switch ve kayıt cihazı Ex bölge dışında |
| Plastikçiler OSB ve plastik enjeksiyon tesisleri | Yüksek ısı, yanıcı hammadde ve granül stoku, yangın | Hammadde stoku ve sıcak hat bölgelerinde termal kamera ile sıcaklık eşiği uyarısı; duman anında görüntü kaybına karşı iki farklı açıdan kapsama |
| Makine OSB, İMES ve metal işleme | Pres, CNC ve vinç çevresinde iş kazası, kalite izlenebilirliği | Hat üstü sabit kameralar; yüksek tavan için dar açılı lens; titreşime dayanıklı braket; kaynak ışığına karşı WDR |
| TOSB ve otomotiv yan sanayi | Yoğun tır ve araç trafiği, sevkiyat hataları, parça izlenebilirliği | Giriş-çıkışta plaka tanıma (LPR); yükleme rampalarına ayrı kamera; montaj hattında süreç kaydı |
| Dilovası OSB ve ağır sanayi | Toz, nem, korozyon, geniş saha, ısı kaynakları | IP66/IP67 ve IK10 sınıfı dış ortam kameraları; korozyona dayanıklı gövde; binalar arası fiber omurga; çevre hattında termal kamera |
| Kömürcüler OSB ve açık stok sahaları | Gece hırsızlığı, çit ihlali, ışıksız geniş alan | IR menzili sahada doğrulanmış bullet kameralar; PTZ ile takip; sanal hat ve alan ihlali analizi |
| Gebze OSB, Güzeller ve KOBİ OSB karma tesisler | Ofis, üretim ve depo aynı binada, sınırlı bütçe | Bölümlere ayrılmış plan; genişleyebilir NVR ve PoE switch; kritik noktalardan başlayan kademeli yatırım |
| Tuzla ve Gebze lojistik depoları | Raf arası kayıp, rampa ve forklift kazaları, stok uyuşmazlığı | Raf aralarında koridor modu (dikey görüntü); rampa başına kamera; tır girişinde LPR; NTP ile eşitlenmiş kayıt saati |

Tablodaki yaklaşımlar her fabrika kamera sistemi için başlangıç noktasıdır. Kimya tesislerinde Ex bölge sınıflandırması kamera ekibi tarafından değil, tesisin patlamadan korunma dokümanıyla belirlenir; biz bu dokümana göre ürün seçer ve switch, kayıt cihazı gibi aktif ekipmanı Ex bölge dışında konumlandırırız. Termal kameralar ise yangın algılama sisteminin yerine geçmez, ona erken uyarı katmanı ekler.

Açık sahalarda en sık karşılaştığımız yanılgı, ürün kataloğundaki IR menzilini gerçek tespit mesafesi sanmaktır. Katalog değeri ideal koşulda ölçülür; yağmur, sis, toz ve arka plan yansıması menzili düşürür. Bu yüzden çevre hattında kameraları, birbirinin kör bölgesini görecek şekilde karşılıklı yerleştirir ve kritik bölümlerde termal kamerayla destekleriz.

## Fabrika kamera sistemi kurulumu adım adım

Gebze ve çevresindeki fabrika kamera sistemi projelerinde izlediğimiz akış genellikle şu sıradadır. Süre, tesisin büyüklüğüne ve vardiya düzenine göre değişir.

1. **Yerinde keşif:** Sahayı gündüz ve mümkünse akşam saatlerinde geziyoruz. Giriş kapıları, çevre hattı, rampalar, üretim hatları, hammadde ve mamul stok alanları, jeneratör ve trafo bölgesi tek tek not edilir.
2. **Risk haritası ve amaç tanımı:** Her kamera için amaç yazılır: algılama mı, tanıma mı, plaka okuma mı? Tanıma ve plaka okuma, hedefin piksel yoğunluğuna bağlıdır; bu nedenle lens ve konum bu adımda belirlenir.
3. **Yerleşim planı:** Kat planı veya vaziyet planı üzerinde her kameranın görüş konisi çizilir. Yüksek tavanlı depolarda dar açılı lens, raf aralarında koridor modu, çevre hattında örtüşen görüş alanları tercih edilir.
4. **Altyapı tasarımı:** Kablo güzergâhı, switch dolapları, PoE güç bütçesi, fiber bağlantılar ve UPS kapasitesi hesaplanır. Bakır Ethernet hattında tek segment 100 metreyi aşmamalıdır; bu yüzden uzak noktalara ara dolap veya fiber planlanır.
5. **Montaj:** Kablolama ve montaj, üretimi aksatmamak için vardiya planına göre bölüm bölüm yapılır. Dış ortamda IP66 veya üzeri muhafaza, darbe riski olan yerlerde IK10 gövde kullanılır.
6. **Kayıt ve yazılım ayarları:** Kamera başına çözünürlük, kare hızı ve H.265 sıkıştırma ayarlanır; hareket ve alan ihlali kuralları gerçek sahaya göre kalibre edilir. Tüm cihazların saati NTP ile eşitlenir.
7. **Test ve teslim:** Gece ve gündüz görüntüsü, uzaktan erişim, kayıt geri oynatma ve alarm bildirimleri yetkili kişilerle birlikte denenir. Kullanıcı yetkileri, şifreler ve kamera listesi yazılı olarak teslim edilir.

## Ağ, enerji ve kayıt altyapısı

Bir fabrika kamera sisteminde sahada karşılaştığımız sorunların önemli bir kısmı kameradan değil altyapıdan çıkar. Onlarca IP kamera, ofis bilgisayarları ve üretim makineleriyle aynı ağı paylaşırsa hem görüntü takılır hem de kurumsal trafik yavaşlar. Bu yüzden kamera trafiğini ayrı bir VLAN'da, mümkünse ayrı switch'lerde topluyoruz. Binalar arası bağlantılarda fiber omurga kullanmak, mesafe ve elektriksel parazit kaynaklı kopmaları azaltır. Bu tasarımı [ağ altyapısı kurulum ve yönetimi](/sistem-network/ag-altyapisi-kurulum-ve-yonetimi/) çalışmalarımızla birlikte ele alıyoruz.

Enerji tarafında PoE switch'lerin güç bütçesi, ısıtıcılı dış ortam ve PTZ kameraların yüksek tüketimi dikkate alınarak hesaplanır; IEEE 802.3af ve 802.3at sınıfları burada belirleyicidir. Switch'ler ve kayıt sunucusu UPS üzerinden beslenir. Elektrik kesintisinde kayıt durursa, en çok ihtiyaç duyulan anın görüntüsü kaybolur.

Kayıt kapasitesi; kamera sayısı, çözünürlük, kare hızı, sıkıştırma ve saklama süresine göre hesaplanır. H.265 sıkıştırma, H.264'e göre aynı görüntü kalitesinde depolama ihtiyacını belirgin biçimde düşürür. Disk arızasında kaydı kaybetmemek için RAID 5 veya RAID 6 yapısı, kritik tesislerde ikinci bir kayıt hedefi öneriyoruz. Ayrıntılı hesap için [kamera kayıt sistemleri ve depolama çözümleri](/kamera-kayit-sistemleri-depolama-cozumleri/) rehberimize göz atabilirsiniz.

Uzaktan izleme fabrika yönetimi için vazgeçilmezdir, ama kayıt cihazını doğrudan internete açmak ciddi bir risktir. Uzaktan erişimi VPN üzerinden veriyor, varsayılan şifreleri değiştiriyor ve cihaz yazılımlarını güncel tutuyoruz. Bu konuyu [firewall ve ağ güvenliği](/siber-guvenlik/firewall-ve-ag-guvenligi/) hizmetimizle birlikte kurguluyoruz; çok lokasyonlu firmalarda merkez ofisten tüm tesisleri tek ekrandan izlemek de bu yapıyla daha güvenli hale gelir.

## KVKK ve teslim öncesi kontrol listesi

Fabrika kamera sistemlerinin kaydettiği görüntüler kişisel veridir; çalışanlar, ziyaretçiler ve tır şoförleri görüntülenir. Kamera bulunan alanların girişine aydınlatma levhası asılması, kayıtların ne kadar saklanacağını belirleyen bir politika, görüntülere kimin erişebileceğinin sınırlandırılması ve erişimlerin kayıt altına alınması temel yükümlülükler arasındadır. Soyunma odası, duş ve tuvalet gibi özel alanlar kamera kapsamı dışında bırakılmalıdır. Hukuki tarafı [KVKK danışmanlığı](/danismanlik/kvkk-danismanligi/) ekibimizle birlikte ele alabilirsiniz.

Teslimden önce aşağıdaki maddeleri birlikte kontrol etmenizi öneririz:

- [ ] Her kameranın amacı (algılama, tanıma, plaka okuma) yazılı ve görüntü bu amaca uygun.
- [ ] Gece görüntüsü, en karanlık saatte ve sahada test edildi.
- [ ] Kamera trafiği ayrı VLAN'da, kurumsal ağdan izole.
- [ ] Switch'ler ve kayıt cihazı UPS üzerinden besleniyor.
- [ ] Hedeflenen saklama süresi disk kapasitesiyle hesaplandı ve RAID yapısı kuruldu.
- [ ] Varsayılan şifreler değişti, uzaktan erişim VPN üzerinden.
- [ ] Tüm cihaz saatleri NTP ile eşitlendi.
- [ ] KVKK aydınlatma levhaları asıldı, erişim yetkileri tanımlandı.
- [ ] Ex bölgelerde kullanılan ekipmanın uygunluk belgeleri dosyalandı.

## Sık Yapılan Hatalar

Fabrika kamera sistemi projelerinde en sık düzelttiğimiz hatalar şunlardır:

- **Ofis kamerasını sahaya taşımak:** Toz, nem ve titreşim nedeniyle kısa sürede buğulanma ve arıza başlar. Ortama uygun IP ve IK sınıfında, gerekirse korozyona dayanıklı gövde seçin.
- **Kimya alanında standart kamera kullanmak:** Patlayıcı ortamda tutuşma kaynağı oluşturabilir. Ex bölge sınıfına uygun exproof ürün kullanın, aktif ekipmanı bölge dışına alın.
- **Katalogdaki IR menziline güvenmek:** Gece çevre hattında tanımlanamayan silüetler kalır. Menzili sahada test edin, gerekirse ek aydınlatma veya termal kamera ekleyin.
- **Kamerayı kurumsal ağa doğrudan bağlamak:** ERP ve üretim sistemleri yavaşlar, zafiyetli bir kamera tüm ağa kapı açar. Kamera trafiğini VLAN ile ayırın.
- **Saklama süresini disk boyutuna bırakmak:** Olay fark edildiğinde ilgili kayıt çoktan silinmiş olur. Saklama süresini önce politika olarak belirleyin, diski buna göre hesaplayın.
- **Bakımı unutmak:** Kirli lens, gevşeyen braket ve dolan disk fark edilmeden görüntü kalitesini düşürür. Periyodik bakım ve sağlık kontrolü planlayın.

Daha genel bir liste için [güvenlik kamerası seçim hataları](/guvenlik-kamerasi-secim-hatalari/) yazımıza da bakabilirsiniz.

## Sıkça Sorulan Sorular

### Fabrika kamera sistemi için kaç kamera gerekir?

Fabrika kamera sisteminde kamera sayısını metrekare değil, izlenmesi gereken noktalar belirler. Kapılar, çevre hattı, rampalar, üretim hatları, stok alanları ve yönetim binası ayrı ayrı değerlendirilir; her nokta için algılama, tanıma veya plaka okuma amacı tanımlanır. Aynı büyüklükteki iki fabrikada bile ihtiyaç çok farklı çıkabilir. Bu yüzden net sayıyı yerinde keşif sonrası hazırladığımız yerleşim planıyla veriyoruz.

### Kimya tesislerinde normal kamera kullanılabilir mi?

Patlayıcı gaz veya toz ortamı olarak sınıflandırılmış bölgelerde standart kamera kullanılmamalıdır. Bu alanlarda bölge sınıfına uygun, ATEX veya IECEx işaretli exproof muhafazalı kameralar gerekir. Hangi alanın hangi bölge olduğu tesisin patlamadan korunma dokümanında yer alır. Bölge dışındaki ofis, otopark ve sevkiyat alanlarında ise ortama uygun standart endüstriyel kameralar kullanılabilir; böylece maliyet gereksiz yere yükselmez.

### Fabrika kamera sisteminde kayıtlar ne kadar süre saklanmalı?

Tek bir zorunlu süre yerine, işletmenin amacına göre belirlenmiş ve yazılı bir saklama politikası olmalıdır. Olayların çoğu zaman günler sonra fark edildiğini düşünerek sanayi tesislerinde genellikle birkaç haftalık süreler tercih edilir. Süre uzadıkça disk ihtiyacı artar; KVKK açısından da amaçla orantılı olmayan uzun saklama önerilmez. Süreyi belirledikten sonra kapasiteyi buna göre hesaplıyoruz.

### Kurulum sırasında üretim durur mu?

Genellikle durmaz. Kablolama ve montajı vardiya planına göre bölümlere ayırıyor, makine çevresindeki işleri bakım duruşlarına veya hafta sonuna denk getiriyoruz. Yüksekte çalışma gereken alanlarda iş güvenliği kurallarına uyuluyor ve tesisin İSG sorumlusuyla önceden koordinasyon yapılıyor. Mevcut eski sistem, yenisi devreye alınana kadar çalışmaya devam edebilir; böylece kayıtsız kalınan dönem en aza iner.

### Mevcut analog fabrika kamera sistemimizi IP'ye kademeli geçirebilir miyiz?

Kademeli geçiş mümkündür. Hibrit kayıt cihazlarıyla mevcut analog kameraları bir süre daha kullanıp kritik noktalardan başlayarak IP kameraya geçebilirsiniz. Eski koaksiyel hatların bir kısmı uygun dönüştürücülerle değerlendirilebilir, ancak uzun vadede yapısal kablolama ve ayrı kamera ağı kurmak daha sağlıklıdır. Keşifte hangi kameraların ve hatların korunabileceğini tek tek belirliyoruz.

### Fabrika kamera sistemi fiyatı neye göre belirlenir?

Fiyatı kamera sayısı kadar kamera tipi ve altyapı belirler. Exproof veya termal kameralar, uzun fiber hatları, PTZ ve plaka tanıma noktaları, kayıt kapasitesi ve UPS ihtiyacı bütçeyi doğrudan etkiler. Aynı tesiste bile kritik noktalardan başlayan kademeli bir plan bütçeyi dengeler. Kalem kalem karşılaştırma için keşif sonrası ayrıntılı teklif hazırlıyoruz.

## Kaynaklar

- [Kişisel Verileri Koruma Kurumu](https://www.kvkk.gov.tr/): kamera kayıtları ve aydınlatma yükümlülüğüne dair rehberler
- [Mevzuat Bilgi Sistemi](https://www.mevzuat.gov.tr/): patlayıcı ortamlar ve iş sağlığı ve güvenliği mevzuatı
- [USOM](https://www.usom.gov.tr/): IP kamera ve ağ cihazlarına yönelik güncel güvenlik duyuruları
- [CISA](https://www.cisa.gov/): ağa bağlı cihazların güvenli yapılandırılmasına dair öneriler

## Fabrikanız için doğru planla başlayın

Bir fabrika kamera sistemi, tesisin riskleri, ağ altyapısı ve kayıt politikası birlikte düşünüldüğünde gerçek değer üretir. BTM Bilişim olarak 2010'dan bu yana Gebze ve çevresindeki işletmelere kamera, ağ ve güvenlik altyapısı kuruyoruz; Gebze OSB'den Dilovası'na, TOSB'dan Tuzla'daki depolara kadar keşfi yerinde yapıyoruz. Ücretsiz keşif ve teklif için [formu doldurun](/#teklif).

*Hazırlayan: BTM Bilişim teknik ekibi.*
