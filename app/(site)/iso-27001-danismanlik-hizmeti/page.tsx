import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, faqPageJsonLd, organizationJsonLd, serviceJsonLd } from "@/lib/structuredData";
import svc from "@/lib/data/iso-service.json";
import { Icon } from "@/components/site/Icon";
import { Breadcrumbs, FaqList, JsonLd } from "@/components/site/Parts";
import { QuoteForm } from "@/components/QuoteForm";

// Port of _legacy-static-site/templates/service_iso.html. Copy comes from
// lib/data/iso-service.json (ISO_SERVICE in build.py). This static route takes
// precedence over app/(site)/[slug] for this one URL.

export const revalidate = 300;

const PATH = `/${svc.slug}/`;
const TITLE = `${svc.meta_title} | ${site.name}`;

export const metadata: Metadata = {
  title: TITLE,
  description: svc.meta_description,
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: { type: "website", title: TITLE, description: svc.meta_description, url: absoluteUrl(PATH), images: [DEFAULT_OG_IMAGE] },
};

export default function IsoServicePage() {
  const service = serviceJsonLd(PATH);
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      {service && <JsonLd data={service} />}
      <JsonLd data={faqPageJsonLd(svc.faqs)} />
      <Breadcrumbs crumbs={svc.crumbs} />

      <main id="main" tabIndex={-1}>
        <section className="svc-hero">
          <div className="wrap svc-hero-grid">
            <div>
              <span className="eyebrow">{svc.hero.eyebrow}</span>
              <h1>
                {svc.hero.h1} <em>{svc.hero.h1_em}</em>
              </h1>
              <p className="sub">{svc.hero.lede}</p>
              <ul className="svc-trust">
                {svc.hero.trust.map((t) => (
                  <li key={t}>
                    <Icon id="check" size={16} /> {t}
                  </li>
                ))}
              </ul>
              <div className="hero-cta">
                <Link className="btn btn-primary btn-lg" href="#teklif">
                  Ücretsiz Ön Görüşme <Icon id="arrow" size={16} />
                </Link>
                <a className="btn btn-ghost btn-lg" href={svc.wa} target="_blank" rel="noopener">
                  <Icon id="whatsapp" size={16} /> WhatsApp&apos;tan Yazın
                </a>
              </div>
            </div>
            <aside className="svc-bundle">
              <h2>{svc.bundle.title}</h2>
              <p>{svc.bundle.text}</p>
              <ul>
                {svc.bundle.items.map((i) => (
                  <li key={i.t}>
                    <b>{i.t}</b>
                    <span>{i.d}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <nav className="svc-tabs" aria-label="Sayfa bölümleri">
          <div className="wrap">
            {svc.tabs.map((t) => (
              <a key={t.id} href={`#${t.id}`}>
                {t.t}
              </a>
            ))}
          </div>
        </nav>

        <section className="section" id="surec">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">01 — Proje süreci ve teslimatlar</span>
              <h2>ISO 27001 danışmanlık süreci nasıl ilerler?</h2>
              <p>
                Altı aşama, BGYS kurulumunun ana adımlarını ve her adımın çıktısını özetler. Ayrıntılı plan ve takvim, ön
                değerlendirmede kurumunuza göre netleşir.
              </p>
            </div>
            <div className="svc-steps">
              {svc.steps.map((s, i) => (
                <div className="svc-step" key={s.t}>
                  <span className="svc-step-n">Aşama {i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <p className="svc-step-o">
                    <strong>Beklenen çıktı:</strong> {s.o}
                  </p>
                </div>
              ))}
            </div>
            <div className="svc-callout">
              <h3>Kurumunuzun projedeki rolü</h3>
              {svc.role.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-ice" id="ek-a-kurulum">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">02 — Ek-A teknik kontroller</span>
              <h2>
                SoA&apos;ya yazmakla kalmıyoruz, <em>kontrolleri çalışır halde</em> kuruyoruz
              </h2>
              <p>
                Risk değerlendirmesinde seçilen teknik kontrolleri mevcut altyapınızda kurar, belgelendirme denetiminde
                sunulacak kanıtları birlikte hazırlarız. Denetçi, kontrolün kanıtını kâğıtta değil çalışan bir sistemde
                görür.
              </p>
            </div>
            <h3 className="svc-subh">Sahada uyguladığımız kontrol alanları</h3>
            <div className="svc-tech">
              {svc.field_tech.map((f) => (
                <div key={f.t}>
                  <small>{f.ref}</small>
                  <b>{f.t}</b>
                  <span>{f.tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="kapsam">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">03 — Hizmet kapsamı</span>
              <h2>BGYS belgesinden çok daha fazlası</h2>
              <p>Hizmet kapsamımız ISO 27001 maddelerinin ötesine geçer; teknik kanıtı da biz üretiriz.</p>
            </div>
            <div className="svc-scope">
              {svc.scope.map((c) => (
                <div className="svc-scope-card" key={c.t}>
                  <h3>
                    {c.t}
                    {"badge" in c && c.badge ? (
                      <>
                        <span className="visually-hidden"> — </span>{" "}
                        <span className="svc-badge">{c.badge}</span>
                      </>
                    ) : null}
                  </h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="ekip">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">04 — Hizmeti yürüten ekip</span>
              <h2>{svc.team_title}</h2>
              <p>{svc.team_text}</p>
            </div>
            <div className="team-grid">
              {svc.team.map((m) => (
                <div className="team-card" key={m.role}>
                  <span className="team-ic">
                    <Icon id="users" size={18} />
                  </span>
                  <h3>{m.role}</h3>
                  <p>{m.d}</p>
                  <div className="team-tags">
                    {m.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="team-card team-card-note">
                <span className="team-ic">
                  <Icon id="lock" size={18} />
                </span>
                <h3>Gizlilik önceliğimiz</h3>
                <p>{svc.team_note}</p>
                <Link className="more" href="#teklif">
                  Görüşme Talep Edin <Icon id="arrow" size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-ice" id="sure-maliyet">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">05 — ISO 27001 danışmanlığı hakkında</span>
              <h2>Süre, maliyet ve bilmeniz gerekenler</h2>
            </div>
            <div className="entry-content svc-guide">
              {svc.guide.map((g) => (
                <div key={g.h}>
                  <h3>{g.h}</h3>
                  {g.p.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              ))}
              <p className="svc-standards">
                <strong>Standartlar:</strong> {svc.standards}
              </p>
              <p>
                <Link className="btn btn-primary" href="#teklif">
                  Kapsamı Görüşün ve Teklif İsteyin <Icon id="arrow" size={16} />
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="sss">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">06 — Sık sorulan sorular</span>
              <h2>ISO 27001 danışmanlığı hakkında sık sorulan sorular</h2>
            </div>
            <FaqList items={svc.faqs} />
          </div>
        </section>

        <section className="section section-navy quote-sec" id="teklif">
          <div className="wrap quote-wrap">
            <div className="quote-intro">
              <span className="eyebrow">Hızlı Teklif</span>
              <h2>{svc.final.title}</h2>
              <p>{svc.final.text}</p>
              <ul>
                {svc.final.bullets.map((b) => (
                  <li key={b}>
                    <Icon id="check" size={16} /> {b}
                  </li>
                ))}
              </ul>
              <p className="quote-alt">
                Hemen konuşmak isterseniz: <a href={site.phone.href}>{site.phone.display}</a> ·{" "}
                <a href={svc.wa} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </p>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>
    </>
  );
}
