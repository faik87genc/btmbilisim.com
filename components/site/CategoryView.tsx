import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { FaqSection } from "@/components/ensa/FaqSection";
import { CtaBand, SectionHead } from "@/components/site/ui";
import { ENGAGEMENT_STEPS, HeroPanel, InkHero, LinkCard, StepRow } from "@/components/site/ServiceParts";
import { serviceCategoryList, type ServiceCategory } from "@/lib/services";
import { categoryIcons, serviceIcon } from "@/lib/serviceIcons";
import { servicePagesContent } from "@/lib/servicePages";
import { WhatsAppIcon } from "@/components/ensa/WhatsAppIcon";
import { serviceWhatsAppHref } from "@/lib/contact";

/**
 * Service area page (/danismanlik/, /siber-guvenlik/, ...) on identity v2:
 * ink hero with the area's services, service cards with icon tiles, how an
 * engagement runs, the page's own showcase (`children`), FAQ, the other
 * areas and the blue CTA band. Replaces components/ensa/CategoryPage for
 * these routes; titles, H1 and the FAQ schema are unchanged.
 */
export function CategoryView({ category, children }: { category: ServiceCategory; children?: React.ReactNode }) {
  // A service card links to its detail page when lib/servicePages has one.
  const slugByKey = new Map<string, string>();
  for (const entry of servicePagesContent) {
    if (entry.categorySlug === category.slug) slugByKey.set(entry.serviceKey, entry.slug);
  }
  const hrefFor = (key: string) => {
    const slug = slugByKey.get(key);
    return slug ? `/${category.slug}/${slug}/` : undefined;
  };
  const others = serviceCategoryList.filter((c) => c.slug !== category.slug);

  return (
    <>
      <InkHero
        crumbs={[{ text: "Hizmetlerimiz", href: "/hizmetler/" }, { text: category.shortTitle }]}
        eyebrow={category.eyebrow}
        title={category.title}
        lead={category.intro}
        service={category.title}
        aside={
          <nav aria-label={`${category.shortTitle} hizmetleri`}>
            <HeroPanel
              label="Bu alandaki hizmetler"
              items={category.services.map((s) => ({ text: s.name, href: hrefFor(s.key) }))}
            />
          </nav>
        }
      />

      <section className="bg-white py-16 md:py-24" aria-labelledby="area-services-title">
        <Container>
          <SectionHead
            id="area-services-title"
            eyebrow="Alt hizmetler"
            title="Bu alandaki uzmanlık kalemlerimiz."
            lead={category.summary}
          />
          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((s) => {
              const href = hrefFor(s.key);
              return (
                <li key={s.key}>
                  {href ? (
                    <LinkCard href={href} icon={serviceIcon(s.key)} title={s.name} text={s.description} cta="İnceleyin ve teklif alın" />
                  ) : (
                    <div className="card-v2 flex h-full flex-col p-6 md:p-7">
                      <h3 className="font-display text-lg font-semibold leading-snug text-navy-950">{s.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.description}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[14px] border border-slate-200 bg-paper-50 p-6 md:flex-row md:items-center md:p-7">
            <div>
              <p className="font-display text-lg font-semibold text-navy-950">Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?</p>
              <p className="mt-1 text-sm text-slate-500">Durumunuzu anlatın; doğru çözümü birlikte seçelim.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/#teklif"
                className="press inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-gold-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-700"
              >
                Ücretsiz keşif isteyin <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={serviceWhatsAppHref(category.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-slate-200 bg-white px-6 text-sm font-semibold text-navy-950 transition-colors hover:border-gold-600/40"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp<span className="visually-hidden"> (yeni sekmede açılır)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-paper-50 py-16 md:py-20" aria-labelledby="area-process-title">
        <Container>
          <SectionHead
            id="area-process-title"
            eyebrow="Nasıl çalışıyoruz"
            title="Önce ihtiyacı netleştirir, sonra kurarız."
            lead="Her çalışma aynı dört adımla ilerler; danışmanlığını yaptığımız işi kendi ekibimizle uygular ve sonrasında da yanınızda oluruz."
          />
          <div className="mt-10">
            <StepRow items={ENGAGEMENT_STEPS} />
          </div>
        </Container>
      </section>

      {children}

      <FaqSection items={category.faq} />

      <section className="bg-white py-16 md:py-20" aria-labelledby="other-areas-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead id="other-areas-title" eyebrow="Diğer alanlar" title="Tek ekipten uçtan uca bilişim" />
            <Link href="/hizmetler/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-navy-950">
              Tüm hizmetler <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <li key={c.slug}>
                <LinkCard href={`/${c.slug}/`} icon={categoryIcons[c.slug]} title={c.shortTitle} text={c.summary} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Bu alanda ihtiyacınızı konuşalım."
        lead="Arayın, WhatsApp'tan yazın ya da keşif formunu doldurun; doğrudan uzman ekibe ulaşırsınız. İlk görüşme ve keşif ücretsizdir."
        secondary={{ label: "Tüm hizmetler", href: "/hizmetler/" }}
      />
    </>
  );
}
