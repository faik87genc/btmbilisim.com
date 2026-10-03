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
      <Container className="max-w-7xl space-y-8">
        {PANELS.map((p, pi) => (
          <MotionReveal key={p.title}>
            <div className={`overflow-hidden rounded-card p-7 text-white md:p-10 ${pi === 0 ? "bg-brand-gradient" : "bg-navy-950"}`}>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">{p.title}</h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-gold-300">{p.subtitle}</p>
              <p className="mt-5 max-w-3xl border-l-2 border-gold-300/60 pl-4 text-sm leading-relaxed text-slate-200 md:text-base">
                {p.text}
              </p>
              <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {p.items.map((it) => (
                  <li key={it.title}>
                    <it.icon className="h-8 w-8 text-gold-300" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-lg font-semibold">{it.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{it.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/15 pt-6">
                <Link href={p.href} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gold-300">
                  {p.cta} <ArrowRight className="h-4 w-4 text-gold-300" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </MotionReveal>
        ))}
      </Container>
    </section>
  );
}
