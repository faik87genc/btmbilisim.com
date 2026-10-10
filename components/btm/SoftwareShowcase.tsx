import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  Database,
  LockKeyhole,
  Layers,
  MonitorSmartphone,
  Search,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { IconTile } from "@/components/ensa/IconTile";

// /yazilim-dijital/: the two things the in-house software team delivers,
// as feature panels — custom software and web design.

type Panel = {
  title: string;
  subtitle: string;
  text: string;
  href: string;
  cta: string;
  items: { icon: LucideIcon; title: string; text: string }[];
};

const PANELS: Panel[] = [
  {
    title: "Yazılım",
    subtitle: "İşinize özel kurumsal yazılım",
    text: "Excel'de, e-postada ve elle yürüyen süreçlerinizi; mevcut ERP ve sistemlerinizle konuşan, güvenli ve sürdürülebilir yazılımlara dönüştürüyoruz. Analizden canlıya alma ve bakıma kadar kendi yazılım ekibimizle çalışıyoruz.",
    href: "/yazilim-dijital/ozel-yazilim-gelistirme/",
    cta: "Özel yazılım geliştirme",
    items: [
      { icon: Workflow, title: "Süreç otomasyonu", text: "Onay, talep ve raporlama akışlarını uçtan uca dijitalleştirme." },
      { icon: Database, title: "Veri ve raporlama", text: "Dağınık veriyi tek kaynakta toplayan paneller ve raporlar." },
      { icon: LockKeyhole, title: "Güvenli geliştirme", text: "Sızma testi deneyimiyle, OWASP kontrollerine uygun kod." },
      { icon: Layers, title: "Entegrasyon", text: "ERP, muhasebe, e-fatura ve üçüncü taraf API bağlantıları." },
    ],
  },
  {
    title: "Web Tasarım",
    subtitle: "Mobil uyumlu, hızlı kurumsal web siteleri",
    text: "Ziyaretçiyi müşteriye dönüştüren, her ekranda kusursuz görünen ve Google'ın beklediği teknik standartları karşılayan kurumsal web siteleri tasarlıyor, güvenle yayına alıyoruz.",
    href: "/yazilim-dijital/web-tasarim-ve-kurumsal-web-sitesi/",
    cta: "Web tasarım hizmeti",
    items: [
      { icon: MonitorSmartphone, title: "Kurumsal tasarım", text: "Markanıza özel, sade ve güven veren arayüzler." },
      { icon: Smartphone, title: "Mobil uyumlu", text: "Telefon, tablet ve masaüstünde aynı deneyim." },
      { icon: Search, title: "SEO uyumlu altyapı", text: "Hızlı açılış, yapısal veri ve temiz URL yapısı." },
      { icon: Gauge, title: "Hız ve güvenlik", text: "Core Web Vitals odaklı, güvenlik başlıkları tamam." },
    ],
  },
];

export function SoftwareShowcase() {
  return (
    <section className="bg-white py-20 md:py-24">
      <Container className="max-w-7xl space-y-6">
        {PANELS.map((p) => (
          <MotionReveal key={p.title}>
            <div className="card-v2 overflow-hidden p-7 md:p-10">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
                <div>
                  <p className="eyebrow-v2">{p.subtitle}</p>
                  <h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.02em] text-navy-950 md:text-[2.125rem]">{p.title}</h2>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-slate-500">{p.text}</p>
                  <Link
                    href={p.href}
                    className="press mt-6 inline-flex h-11 items-center gap-2 rounded-[10px] border border-slate-200 px-5 text-sm font-semibold text-navy-950 transition-colors hover:border-gold-600/40 hover:text-gold-700"
                  >
                    {p.cta} <ArrowRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  </Link>
                </div>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  {p.items.map((it) => (
                    <li key={it.title} className="flex gap-4">
                      <IconTile icon={it.icon} />
                      <div>
                        <h3 className="font-display text-base font-semibold text-navy-950">{it.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{it.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionReveal>
        ))}
      </Container>
    </section>
  );
}
