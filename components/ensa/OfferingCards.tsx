import { Building2, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Container } from "./Container";
import { MotionReveal } from "./MotionReveal";
import { products } from "@/lib/products";

// Somut, doğrulanabilir üç iddia — soyut "Uçtan Uca / Çok Sektörlü /
// Ölçülebilir" sıfatları yerine. Rakamlar zaten sitenin başka yerlerinde
// de kullanılan gerçek sayılar (AboutTeaser'daki güven bandıyla aynı
// kaynak); burada yeni bir iddia uydurulmuyor, var olan gerçekler tek bir
// yerde daha güçlü bir vurguyla toparlanıyor.
const topValues = [
  {
    title: "2010'dan Beri",
    description: "IT danışmanlığından kuruluma, sahada yürüttüğümüz kurumsal projelerin deneyimi.",
  },
  {
    title: "ISO 27001 & KVKK",
    description: "Her projenin varsayılan parçası — ayrı bir hizmet değil.",
  },
  {
    title: `${products.length} Yazılım Ürünü`,
    description: "Saha tecrübemizi kendi geliştirdiğimiz yazılımla birleştiriyoruz.",
  },
];

const visionPoints = [
  {
    icon: ShieldCheck,
    title: "Güvenlik Önce",
    description:
      "Bilginizi, sistemlerinizi ve operasyonlarınızı tasarımın ilk adımından itibaren korumayı ilke ediniriz.",
  },
  {
    icon: Sparkles,
    title: "İleriye Hazır",
    description:
      "Bugünün ihtiyacını çözerken yarının ölçeğine uyum sağlayan esnek sistemler kurarız.",
  },
  {
    icon: Building2,
    title: "Kurumsal Disiplin",
    description:
      "Farklı sektörlerdeki kurumların karar alma, uyum ve süreklilik beklentilerini biliriz.",
  },
  {
    icon: Target,
    title: "Sonuç Odaklı",
    description:
      "Teknolojiyi amaç değil; verim, görünürlük ve güven için bir araç olarak konumlandırırız.",
  },
];

// "Kurumsal Vizyon" bölümü — üstte kısa değer şeridi, altında iki sütunlu
// vizyon anlatımı ve ilke listesi.
export function OfferingCards() {
  return (
    <section className="bg-paper-50">
      <div className="border-y border-navy-950/10 bg-white">
        <Container>
          <div className="grid grid-cols-1 divide-y divide-navy-950/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {topValues.map((value, i) => (
              <MotionReveal
                key={value.title}
                delay={i * 0.06}
                className="py-6 sm:px-8 sm:py-7 sm:first:pl-0"
              >
                <h4 className="font-display text-sm font-semibold text-ink-900">
                  {value.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {value.description}
                </p>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-paper-100 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <MotionReveal>
              <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-800">
                <span className="h-px w-8 bg-gold-500" />
                Kurumsal Vizyonumuz
              </div>
              <h2 className="text-balance font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink-900 md:text-4xl">
                Karmaşık olanı netleştiriyoruz.
              </h2>
              <p className="mt-5 max-w-md text-balance leading-relaxed text-slate-500">
                Altyapı, güvenlik ve yazılım deneyimimizi birleştirerek, kurumların
                karmaşık süreçlerini sade, güvenli ve sürdürülebilir bir
                yapıya kavuşturuyoruz.
              </p>
            </MotionReveal>

            <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              {visionPoints.map((point, i) => (
                <MotionReveal
                  key={point.title}
                  delay={i * 0.08}
                  className={i >= 2 ? "border-t border-navy-950/10 pt-8" : ""}
                >
                  <point.icon
                    className="h-5 w-5 text-gold-500"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 font-display text-base font-semibold text-ink-900">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {point.description}
                  </p>
                </MotionReveal>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
