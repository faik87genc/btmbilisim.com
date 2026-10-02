// Reference data the AI writer and the pre-publish checker share, so article
// citations of ISO/IEC 27001:2022 and KVKK (6698) stay correct. Pure module —
// safe to import from client components (the admin SEO panel) and prompts.

/** ISO/IEC 27001:2022 main clauses (the certifiable requirements). */
export const ISO27001_CLAUSES: { no: string; name: string }[] = [
  { no: "4", name: "Kuruluşun bağlamı (4.1 iç/dış hususlar, 4.2 ilgili taraflar, 4.3 BGYS kapsamı)" },
  { no: "5", name: "Liderlik (5.1 liderlik ve taahhüt, 5.2 politika, 5.3 roller ve yetkiler)" },
  { no: "6", name: "Planlama (6.1.2 risk değerlendirme, 6.1.3 risk işleme ve Uygulanabilirlik Bildirgesi, 6.2 hedefler, 6.3 değişikliklerin planlanması)" },
  { no: "7", name: "Destek (7.1 kaynaklar, 7.2 yetkinlik, 7.3 farkındalık, 7.4 iletişim, 7.5 dokümante bilgi)" },
  { no: "8", name: "Operasyon (8.1 planlama ve kontrol, 8.2 risk değerlendirme, 8.3 risk işleme)" },
  { no: "9", name: "Performans değerlendirme (9.1 izleme/ölçme, 9.2 iç denetim, 9.3 yönetimin gözden geçirmesi)" },
  { no: "10", name: "İyileştirme (10.1 sürekli iyileştirme, 10.2 uygunsuzluk ve düzeltici faaliyet)" },
];

/**
 * ISO/IEC 27001:2022 Annex A — 93 controls in 4 themes. Index = control
 * number minus one. Turkish working titles (not the official translation).
 */
export const ANNEX_A: Record<5 | 6 | 7 | 8, { theme: string; controls: string[] }> = {
  5: {
    theme: "Organizasyonel kontroller",
    controls: [
      "Bilgi güvenliği politikaları",
      "Bilgi güvenliği rolleri ve sorumlulukları",
      "Görevlerin ayrılığı",
      "Yönetimin sorumlulukları",
      "Otoritelerle iletişim",
      "Özel ilgi gruplarıyla iletişim",
      "Tehdit istihbaratı",
      "Proje yönetiminde bilgi güvenliği",
      "Bilgi ve ilişkili varlıkların envanteri",
      "Bilgi ve ilişkili varlıkların kabul edilebilir kullanımı",
      "Varlıkların iadesi",
      "Bilginin sınıflandırılması",
      "Bilginin etiketlenmesi",
      "Bilgi transferi",
      "Erişim kontrolü",
      "Kimlik yönetimi",
      "Kimlik doğrulama bilgileri",
      "Erişim hakları",
      "Tedarikçi ilişkilerinde bilgi güvenliği",
      "Tedarikçi sözleşmelerinde bilgi güvenliği",
      "BİT tedarik zincirinde bilgi güvenliğinin yönetimi",
      "Tedarikçi hizmetlerinin izlenmesi, gözden geçirilmesi ve değişiklik yönetimi",
      "Bulut hizmetlerinin kullanımında bilgi güvenliği",
      "Bilgi güvenliği olay yönetimi planlaması ve hazırlığı",
      "Bilgi güvenliği olaylarının değerlendirilmesi ve karar verilmesi",
      "Bilgi güvenliği ihlal olaylarına müdahale",
      "Bilgi güvenliği ihlal olaylarından ders çıkarma",
      "Kanıt toplama",
      "Kesinti sırasında bilgi güvenliği",
      "İş sürekliliği için BİT hazırlığı",
      "Yasal, mevzuat, düzenleyici ve sözleşmesel gereksinimler",
      "Fikri mülkiyet hakları",
      "Kayıtların korunması",
      "Gizlilik ve kişisel verilerin korunması",
      "Bilgi güvenliğinin bağımsız gözden geçirilmesi",
      "Bilgi güvenliği politika, kural ve standartlarına uyum",
      "Dokümante edilmiş işletim prosedürleri",
    ],
  },
  6: {
    theme: "İnsan kaynaklı kontroller",
    controls: [
      "Tarama (işe alım öncesi doğrulama)",
      "İstihdam şartları ve koşulları",
      "Bilgi güvenliği farkındalığı, eğitim ve öğretim",
      "Disiplin süreci",
      "İstihdamın sona ermesi veya değişmesinden sonraki sorumluluklar",
      "Gizlilik veya ifşa etmeme sözleşmeleri",
      "Uzaktan çalışma",
      "Bilgi güvenliği olaylarının raporlanması",
    ],
  },
  7: {
    theme: "Fiziksel kontroller",
    controls: [
      "Fiziksel güvenlik çevreleri",
      "Fiziksel giriş",
      "Ofislerin, odaların ve tesislerin güvenliği",
      "Fiziksel güvenliğin izlenmesi",
      "Fiziksel ve çevresel tehditlere karşı koruma",
      "Güvenli alanlarda çalışma",
      "Temiz masa ve temiz ekran",
      "Ekipman yerleşimi ve koruması",
      "Tesis dışındaki varlıkların güvenliği",
      "Depolama ortamları",
      "Destekleyici altyapı hizmetleri",
      "Kablolama güvenliği",
      "Ekipman bakımı",
      "Ekipmanın güvenli şekilde elden çıkarılması veya yeniden kullanımı",
    ],
  },
  8: {
    theme: "Teknolojik kontroller",
    controls: [
      "Kullanıcı uç nokta cihazları",
      "Ayrıcalıklı erişim hakları",
      "Bilgiye erişimin kısıtlanması",
      "Kaynak koda erişim",
      "Güvenli kimlik doğrulama",
      "Kapasite yönetimi",
      "Kötü amaçlı yazılımlara karşı koruma",
      "Teknik açıklıkların yönetimi",
      "Konfigürasyon yönetimi",
      "Bilginin silinmesi",
      "Veri maskeleme",
      "Veri sızıntısının önlenmesi",
      "Bilgi yedekleme",
      "Bilgi işleme tesislerinin yedekliliği",
      "Kayıt tutma (loglama)",
      "İzleme faaliyetleri",
      "Saat senkronizasyonu",
      "Ayrıcalıklı yardımcı programların kullanımı",
      "İşletimdeki sistemlere yazılım kurulumu",
      "Ağ güvenliği",
      "Ağ hizmetlerinin güvenliği",
      "Ağların ayrılması",
      "Web filtreleme",
      "Kriptografi kullanımı",
      "Güvenli geliştirme yaşam döngüsü",
      "Uygulama güvenliği gereksinimleri",
      "Güvenli sistem mimarisi ve mühendislik ilkeleri",
      "Güvenli kodlama",
      "Geliştirme ve kabulde güvenlik testleri",
      "Dış kaynaklı geliştirme",
      "Geliştirme, test ve üretim ortamlarının ayrılması",
      "Değişiklik yönetimi",
      "Test bilgileri",
      "Denetim testleri sırasında bilgi sistemlerinin korunması",
    ],
  },
};

/** True when "A.<theme>.<n>" exists in ISO/IEC 27001:2022 Annex A. */
export function isValidAnnexA(theme: number, n: number): boolean {
  const t = ANNEX_A[theme as 5 | 6 | 7 | 8];
  return !!t && n >= 1 && n <= t.controls.length;
}

/** KVKK (6698 sayılı Kanun) has 33 articles. */
export const KVKK_ARTICLE_COUNT = 33;

/** The KVKK articles an article on this site most often needs to cite. */
export const KVKK_KEY_ARTICLES: { no: number; name: string }[] = [
  { no: 3, name: "Tanımlar" },
  { no: 4, name: "Genel ilkeler" },
  { no: 5, name: "Kişisel verilerin işlenme şartları" },
  { no: 6, name: "Özel nitelikli kişisel verilerin işlenme şartları" },
  { no: 7, name: "Kişisel verilerin silinmesi, yok edilmesi veya anonim hale getirilmesi" },
  { no: 8, name: "Kişisel verilerin aktarılması" },
  { no: 9, name: "Kişisel verilerin yurt dışına aktarılması" },
  { no: 10, name: "Veri sorumlusunun aydınlatma yükümlülüğü" },
  { no: 11, name: "İlgili kişinin hakları" },
  { no: 12, name: "Veri güvenliğine ilişkin yükümlülükler (ihlal bildirimi dahil)" },
  { no: 13, name: "Veri sorumlusuna başvuru" },
  { no: 16, name: "Veri Sorumluları Sicili (VERBİS)" },
  { no: 18, name: "Kabahatler (idari para cezaları)" },
];

/** Compact text block for AI prompts. */
export function standardsCheatSheet(): string {
  const lines: string[] = [];
  lines.push("ISO/IEC 27001:2022 ANA MADDELER (belgelendirme şartları):");
  for (const c of ISO27001_CLAUSES) lines.push(`- Madde ${c.no}: ${c.name}`);
  lines.push("");
  lines.push("ISO/IEC 27001:2022 EK-A (93 kontrol, 4 tema) — YALNIZCA bu numaraları kullan:");
  for (const theme of [5, 6, 7, 8] as const) {
    const t = ANNEX_A[theme];
    lines.push(
      `A.${theme} ${t.theme} (A.${theme}.1–A.${theme}.${t.controls.length}): ` +
        t.controls.map((name, i) => `A.${theme}.${i + 1} ${name}`).join("; "),
    );
  }
  lines.push("");
  lines.push(`KVKK (6698 sayılı Kanun, ${KVKK_ARTICLE_COUNT} madde) — sık atıf yapılanlar:`);
  lines.push(KVKK_KEY_ARTICLES.map((a) => `m.${a.no} ${a.name}`).join("; "));
  return lines.join("\n");
}
