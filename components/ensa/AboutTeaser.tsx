import { Check } from "lucide-react";
import { Container } from "./Container";
import { MotionReveal } from "./MotionReveal";
import { Button } from "./Button";
import { serviceCategoryList } from "@/lib/services";
import { products } from "@/lib/products";

const checklist = [
  "Uçtan uca sorumluluk — keşiften kuruluma, bakıma kadar tek ekip",
  "Güvenlik odaklı kurulum: sızma testi deneyimiyle sıkılaştırılmış sistemler",
  "2010'dan beri kurumsal IT danışmanlığı ve saha projeleri",
];

export function AboutTeaser() {
  return (
    <section className="bg-paper-50 py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <MotionReveal>
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-gold-800">
              <span className="h-px w-8 bg-gold-500" />
              Hakkımızda
            </div>
            <h2 className="text-balance font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink-900 md:text-4xl">
              Altyapıyı, güvenliği ve yazılımı aynı çatı altında birleştiriyoruz.
            </h2>
            <p className="mt-5 text-balance leading-relaxed text-slate-500">
              BTM Bilişim; kurumların ağ, sunucu, bulut ve güvenlik
              altyapısını güvenli ve verimli şekilde yönetebilmesi için
              kapsamlı bilişim çözümleri sunar. Sızma testlerinden ağ
              kurulumuna, yedeklemeden lisanslamaya kadar ayrı ayrı
              tedarikçilerle uğraşmanıza gerek kalmaz; saha tecrübemizi
              kendi geliştirdiğimiz yazılım ürünleriyle birleştiriyoruz.
            </p>

            <ul className="mt-7 grid gap-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-ink-900">{item}</span>
                </li>
              ))}
            </ul>

            <Button href="/hakkimizda/" variant="primary" className="mt-8">
              Hakkımızda
            </Button>
          </MotionReveal>

          <MotionReveal delay={0.15} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-3 -z-10 rounded-lg border border-gold-500/30 md:-inset-4" />
            <div className="overflow-hidden rounded-lg shadow-[0_30px_70px_-30px_rgba(10,18,32,0.35)]">
              {/* Photo from the about page of the old BTM WordPress site. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/wp-content/uploads/2025/07/admin-ajax-2.jpeg"
                alt="BTM Bilişim teknik destek ve izleme merkezi"
                width={600}
                height={338}
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover md:h-96"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 max-w-[220px] rounded-lg bg-navy-950 p-5 shadow-[0_20px_50px_-20px_rgba(10,18,32,0.5)] md:-right-8">
              <p className="font-display text-base font-medium leading-snug text-paper-50">
                Dijital geleceğinizi güvenle şekillendirin.
              </p>
            </div>
          </MotionReveal>
        </div>

        {/* Güven rakamları eskiden metin sütununun yanında dar, tek satırlık
            bir köşede kayboluyordu — burada kendi tam genişlikte bandına
            alındı, büyütüldü. */}
        <MotionReveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-3 divide-x divide-navy-950/10 rounded-lg border border-navy-950/10 bg-white py-8">
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
                7/24
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-wider text-slate-500">
                Teknik Destek
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
                {String(serviceCategoryList.length).padStart(2, "0")}
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-wider text-slate-500">
                Uzmanlık Alanı
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
                {String(products.length).padStart(2, "0")}
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-wider text-slate-500">
                Yazılım Ürünü
              </div>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
