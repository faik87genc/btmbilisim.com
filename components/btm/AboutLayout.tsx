import Image from "next/image";
import { ArrowRight, Boxes, Handshake, HardHat, Headphones, Phone, ShieldCheck, Waypoints } from "lucide-react";
import type { Page } from "@/lib/db/schema";
import { SiteMarkdown } from "@/components/site/SiteMarkdown";
import { Crumbs } from "@/components/site/ui";
import { Container } from "@/components/ensa/Container";
import { Button } from "@/components/ensa/Button";
import { ContactCta } from "@/components/ensa/ContactCta";
import { IconTile } from "@/components/ensa/IconTile";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { TeamCards } from "@/components/btm/TeamCards";
import { APPROACH_STEPS, TrustSection } from "@/components/btm/HomeSections";
import { factsFor, team } from "@/lib/data/trust";
import { site } from "@/lib/site";
import type { Crumb } from "@/lib/siteView";

// /hakkimizda/ (the DB page "hakkimizda", rendered through ArticleView →
// CoreBody). Title, excerpt, Markdown and metadata are the page's own; this is
// the corporate frame around them (identity v2), in the order a visitor asks:
// who are you (hero + facts) → why you (six differentiators) → how you work
// (photo + steps 01–04) → your story (Markdown + Künye) → team → references →
// contact band.

/** The Markdown minus its "Bizi farklı kılan" list — the six cards below say
 * the same thing (its sister-site link moved into the "Önce güvenlik" card). */
function withoutDifferentiators(md: string): string {
  return md.replace(/^##\s+Bizi farklı kılan\s*\n[\s\S]*?(?=^##\s|(?![\s\S]))/m, "");
}

const FACTS = factsFor(["since", "customers", "iso", "support"]);
const SINCE = factsFor(["since"])[0]?.value;

// Every Künye row is read from lib/site.ts (and the founding year from
// companyFacts) — nothing typed in here.
const KUNYE: { label: string; value: string; href?: string }[] = [
  { label: "Unvan", value: site.legalName },
  ...(SINCE ? [{ label: "Kuruluş", value: SINCE }] : []),
  { label: "Merkez", value: `${site.postalAddress.addressLocality} / ${site.postalAddress.addressRegion}` },
  { label: "Hizmet bölgesi", value: site.areaLabel },
  { label: "Çalışma saatleri", value: site.hours.label },
  { label: "Telefon", value: site.phone.display, href: site.phone.href },
  { label: "Destek", value: site.supportEmail.address, href: `mailto:${site.supportEmail.address}` },
];

// Claims the site already makes elsewhere (hero, IT consulting, security and
// product pages, quote form) — gathered here, nothing new.
const DIFFERENTIATORS = [
  {
    icon: Handshake,
    title: "Tek muhatap",
    text: "Ağ, sunucu, bulut, güvenlik ve yazılım tek ekipte. Sorun çıktığında kime ulaşacağınızı bilirsiniz.",
  },
  {
    icon: ShieldCheck,
    title: "Önce güvenlik",
    text: (
      <>
        Her projeye ISO 27001 baş denetçi deneyimiyle bakarız; belgelendirme için kardeş kuruluşumuzun{" "}
        <a href="https://www.iso27001danismanlik.com/" className="font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-800">
          ISO 27001 danışmanlığı
        </a>{" "}
        ekibiyle çalışırız.
      </>
    ),
  },
  {
    icon: Waypoints,
    title: "Satıcıdan bağımsız",
    text: "Marka değil ihtiyaç öneririz. Teknoloji yol haritanızı ürün bağımsız kurar, kalem kalem bütçeleriz.",
  },
  {
    icon: HardHat,
    title: "Sahada uygulama",
    text: "Danışmanlık raporda kalmaz: önerdiğimiz işi kendi ekibimizle kurar, devreye alır ve belgeleriz.",
  },
  {
    icon: Headphones,
    title: "Kesintisiz destek",
    text: "İzleme, bakım ve 7/24 teknik destekle sistemi ayakta tutarız; çağrı merkezi değil, doğrudan uzman ekip.",
  },
  {
    icon: Boxes,
    title: "Kendi yazılımlarımız",
    text: "Atlas, CyberWare, PentForce ve diğer ürünlerimizi kendi ekibimiz geliştirir; ihtiyaca göre uyarlarız.",
  },
];

export function AboutLayout({ page, crumbs }: { page: Page; crumbs: Crumb[] }) {
  const lead = page.excerpt !== page.title ? page.excerpt : null;
  return (
    <>
      {/* Hero: who we are on the left, the facts as cards on the right */}
      <section className="relative overflow-hidden border-b border-line bg-paper-50">
        <div className="bg-blueprint-light pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative pb-16 pt-8 md:pb-24 md:pt-10">
          <Crumbs crumbs={crumbs} />
          <div className="mt-10 grid grid-cols-1 items-center gap-12 md:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div>
              <p className="eyebrow">Biz kimiz</p>
              <h1 className="mt-3 text-balance font-display text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.025em] text-navy-950 md:text-[2.75rem]">
                {page.title}
              </h1>
              <p className="mt-5 max-w-xl text-balance font-display text-2xl font-semibold leading-snug tracking-[-0.015em] text-navy-950 md:text-[1.75rem]">
                Bilişiminizi tek muhataptan, güvenle yönetiyoruz.
              </p>
              {lead && <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-slate-500">{lead}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/#teklif">
                  Ücretsiz keşif isteyin <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="/hizmetler/" variant="ghost-light">
                  Hizmetlerimiz
                </Button>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-4" aria-label="BTM Bilişim kısaca">
              {FACTS.map((f) => (
                <li key={f.key} className="card flex flex-col justify-between p-6 md:p-7">
                  <span className="font-display text-3xl font-semibold tabular-nums tracking-[-0.02em] text-navy-950 md:text-[2.125rem]">
                    {f.value}
                  </span>
                  <span className="mt-3 text-xs font-semibold uppercase leading-snug tracking-[0.1em] text-slate-500">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Why BTM */}
      <section className="cv-auto bg-white py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="BTM Farkı"
            title="İşletmeler neden BTM Bilişim ile çalışıyor?"
            description="Karmaşık BT işlerini sadeleştiriyoruz: tek ekip, net plan, ölçülebilir sonuç."
          />
          <MotionReveal className="mt-12">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {DIFFERENTIATORS.map((d) => (
                <li key={d.title} className="card flex h-full flex-col p-6 md:p-7">
                  <IconTile icon={d.icon} />
                  <h3 className="mt-5 font-display text-[1.1875rem] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-950">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-500">{d.text}</p>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </Container>
      </section>

      {/* How we work: photo + numbered steps */}
      <section className="cv-auto bg-tint-50 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <MotionReveal className="photo-tone relative aspect-[4/3] overflow-hidden rounded-panel shadow-lift">
              <Image
                src="/wp-content/uploads/2025/07/sunucu-ve-veri-merkezi-hizmetleri-2.webp"
                alt="Veri merkezinde düzenli kablolanmış sunucu kabinleri"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </MotionReveal>
            <div>
              <p className="eyebrow">Yaklaşımımız</p>
              <h2 className="mt-3 text-balance font-display text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.02em] text-navy-950 md:text-[2.125rem]">
                Keşiften sürekli desteğe, dört adımda.
              </h2>
              <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-slate-500">
                İhtiyacı ve riski netleştirerek başlarız; planı birlikte onaylar, kendi ekibimizle uygular ve sonrasında da yanınızda kalırız.
              </p>
              <ol className="mt-8 space-y-5">
                {APPROACH_STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-gold-500 font-display text-sm font-bold tabular-nums text-white"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.0625rem] font-semibold leading-snug text-navy-950">
                        <span className="visually-hidden">Adım {i + 1}: </span>
                        {s.title}
                      </h3>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-slate-500">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Our story: the page's own Markdown, with the Künye aside */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
            <div className="min-w-0 max-w-3xl">
              <p className="eyebrow">Hikâyemiz</p>
              <div className="markdown-content core-page mt-4 min-w-0">
                <SiteMarkdown content={withoutDifferentiators(page.content)} />
              </div>
            </div>

            <aside aria-label="Künye ve iletişim" className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="card p-6 md:p-7">
                <p className="eyebrow">Künye</p>
                <dl className="mt-4">
                  {KUNYE.map((row) => (
                    <div key={row.label} className="grid gap-1 border-t border-line py-3.5">
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{row.label}</dt>
                      <dd className="break-words text-[0.9375rem] leading-snug text-navy-950">
                        {row.href ? (
                          <a href={row.href} className="rounded-sm font-semibold text-gold-700 hover:text-gold-800">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative overflow-hidden rounded-panel bg-navy-950 p-6 shadow-lift md:p-7">
                <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <p className="font-display text-xl font-bold leading-snug tracking-[-0.01em] text-white">Ücretsiz keşif isteyin</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">İhtiyacınızı anlatın; ön görüşme ve keşif ücretsizdir.</p>
                  <Button href="/#teklif" variant="inverse" className="mt-5 w-full">
                    Keşif talep edin <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <a
                    href={site.phone.href}
                    className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-control text-sm font-semibold tabular-nums text-white hover:text-gold-300"
                  >
                    <Phone className="h-4 w-4 text-gold-300" strokeWidth={1.75} aria-hidden="true" /> {site.phone.display}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {team.length > 0 && (
        <section className="cv-auto bg-tint-50 py-20 md:py-28">
          <Container>
            <SectionHeading
              eyebrow="Ekibimiz"
              title="Sahada yıllarını geçirmiş bir ekip"
              description="Danışmanlığını yaptığımız işi kendimiz kurarız; ekibimiz BT operasyonları, altyapı ve bilgi güvenliği tecrübesini bir araya getirir."
            />
            <div className="mt-12">
              <TeamCards members={team} headingLevel={3} />
            </div>
          </Container>
        </section>
      )}

      <TrustSection variant="strip" />

      <ContactCta
        title="Bilişiminizi BTM Bilişim'e emanet edin."
        description="Altyapınızı birlikte değerlendirelim; net bir yol haritası ve kalem kalem bütçelenmiş bir teklif sunalım. İlk görüşme ve keşif ücretsizdir."
      />
    </>
  );
}
