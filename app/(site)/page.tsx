import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPages, postLikePages } from "@/lib/pages";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { DEFAULT_OG_IMAGE, faqPageJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/structuredData";
import home from "@/lib/data/home.json";
import { Icon } from "@/components/site/Icon";
import { FaqList, JsonLd, PostCard } from "@/components/site/Parts";
import { toCard } from "@/components/site/BlogIndex";
import { QuoteForm } from "@/components/QuoteForm";
import { showTrust, trust, trustQuotes } from "@/lib/data/trust";

// Port of _legacy-static-site/templates/home.html. Section copy comes from
// lib/data/home.json, exported from the static site's build.py
// (scripts/export-legacy-data.py).
//
// Order: the first half answers the "ISO 27001 danışmanlık / sertifika" intent
// (what it is, who needs it, steps, duration, cost, consultancy vs.
// certification body, how we work, FAQ); the wider service portfolio follows.

export const revalidate = 300;

const QUOTE_BULLETS = [
  "Kapsam, süre ve maliyet netliği",
  "Belgelendirme kuruluşu ücreti ayrı ve şeffaf",
  "Gap analizinden belgelendirme denetimine net yol haritası",
];

// Primary keyword "ISO 27001 danışmanlık"; the /iso-27001-belgesi/ hub owns
// "ISO 27001 sertifikası". Same strings as HOME_META_* in build.py.
const TITLE = home.metaTitle;
const DESCRIPTION = home.metaDescription;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: absoluteUrl("/"), images: [DEFAULT_OG_IMAGE] },
};

export default async function HomePage() {
  const latest = postLikePages(await getPublishedPages()).slice(0, 6);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqPageJsonLd(home.faqs)} />

      <main id="main" tabIndex={-1}>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">ISO 27001 Danışmanlık ve Belgelendirme</span>
              <h1>
                ISO 27001 Danışmanlık ve Sertifika Sürecinde <em>güvendiğiniz</em> ortak.
              </h1>
              <p className="sub">
                ISO 27001:2022 belgelendirme sürecinizi gap analizinden Stage 1 ve Stage 2 denetimine kadar birlikte
                yönetiyoruz. Risk analizi, SoA, politikalar ve iç tetkik tek ekipte; KVKK ve sızma testi ihtiyaçlarınız
                da aynı çatı altında.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary btn-lg" href="/iletisim/">
                  Ücretsiz ISO 27001 Ön Analizi <Icon id="arrow" size={16} />
                </Link>
                <Link className="btn btn-ghost btn-lg" href="/iso-27001-belgesi/">
                  ISO 27001 Sertifikası Rehberi
                </Link>
              </div>
              <div className="hero-badges">
                <div><strong>2010</strong><span>Yılından Beri Sahada</span></div>
                <div><strong>Uzman Ekip</strong><span>BGYS · Pentest · KVKK</span></div>
                <div><strong>7/24</strong><span>Uzman Destek Hattı</span></div>
              </div>
            </div>
            <div className="hero-card">
              <h2 className="hero-card-h2">Neden Bizi Tercih Etmelisiniz?</h2>
              <ul>
                {[
                  "Sektörde tecrübeli danışman, pentest ve sistem uzmanlarından oluşan ekip",
                  "Uçtan uca BGYS kurulumu ve dokümantasyon desteği",
                  "KVKK uyum süreçlerinde hukuki ve teknik tedbir danışmanlığı",
                  "Şeffaf fiyatlandırma, net zaman planı",
                ].map((t) => (
                  <li key={t}>
                    <Icon id="check" size={18} /> {t}
                  </li>
                ))}
              </ul>
              <Link className="btn btn-primary btn-block" href="/danismanlik-hizmetleri/">
                Hizmetlerimizi İnceleyin
              </Link>
            </div>
          </div>
        </section>

        <div className="stats">
          <div className="stats-in">
            <div className="stat"><b>2010</b><span>yılından beri sahada</span></div>
            <div className="stat"><b>Uzman Ekip</b><span>danışman · pentester · mühendis</span></div>
            <div className="stat"><b>7/24</b><span>uzman destek hattı</span></div>
            <div className="stat"><b>15+</b><span>sektörde ISO 27001 projesi</span></div>
          </div>
        </div>

        <section className="section" id="iso-27001">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">ISO 27001 Sertifikası</span>
              <h2>
                ISO 27001 hakkında <em>kısa yanıtlar</em>
              </h2>
              <p>
                Belgelendirmeye başlamadan önce en çok sorulan dört konu. Tüm ayrıntılar için{" "}
                <Link href="/iso-27001-belgesi/">ISO 27001 sertifikası nasıl alınır</Link> rehberimize göz atın.
              </p>
            </div>
            <div className="svc-scope">
              {home.isoBasics.map((b) => (
                <div className="svc-scope-card" key={b.href}>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                  <Link className="more" style={{ display: "inline-block", marginTop: 12 }} href={b.href}>
                    {b.link} <Icon id="arrow" size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-ice" id="surec">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Süreç</span>
              <h2>ISO 27001 sertifikası nasıl alınır?</h2>
              <p>
                <Link href="/iso-27001-belgelendirme-sureci/">ISO 27001 belgelendirme süreci</Link> gap analiziyle
                başlar, belgelendirme kuruluşunun Stage 1 ve Stage 2 denetimleriyle tamamlanır.
              </p>
            </div>
            <div className="steps">
              {home.processSteps.map((s) => (
                <div className="step" key={s.title}>
                  <h3 className="step-h">{s.title}</h3>
                  <p className="step-output">
                    <strong>Beklenen çıktı:</strong> {s.output}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Roller</span>
              <h2>Danışmanlık firması mı, belgelendirme kuruluşu mu?</h2>
              <p>Sertifikayı yalnızca bağımsız belgelendirme kuruluşu düzenler; danışmanlık firması sizi bu denetime hazırlar.</p>
            </div>
            <div className="grid grid-2">
              {home.isoRoles.map((r) => (
                <div className="pillar" key={r.title}>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="svc-callout">
              <h3>Denetime Hazırlık</h3>
              <p>
                Denetim öncesinde mevcut durum analizi, iç tetkik ve düzeltici faaliyetlerle kurumunuzu belgelendirme
                denetimine hazırlarız. Belgelendirme kararı bağımsız belgelendirme kuruluşuna aittir.
              </p>
              <p>
                <Link className="more" href="/iso-27001-danismanlik-hizmeti/">
                  ISO 27001 danışmanlık hizmeti kapsamı <Icon id="arrow" size={12} />
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="section section-ice">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Nasıl Çalışıyoruz</span>
              <h2>ISO 27001 danışmanlığında dört ilkemiz</h2>
            </div>
            <div className="grid grid-4">
              {home.pillars.map((p, i) => (
                <div className="pillar" key={p.title}>
                  <div className="num">0{i + 1}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showTrust && (
          <section className="section" id="sahadan">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">Sahadan</span>
                <h2>
                  Birlikte çalıştığımız kurumlar <em>ne diyor</em>
                </h2>
                <p>Müşterilerimizin yazılı izniyle; kişi ve firma adı paylaşılmadan.</p>
              </div>
              {trust.stats.length > 0 && (
                <div className={`grid grid-${Math.min(trust.stats.length, 4)} trust-stats`}>
                  {trust.stats.map((s) => (
                    <div className="pillar" key={s.label}>
                      <div className="num">{s.value}</div>
                      <p>{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {trustQuotes.length > 0 && (
                <div className={`grid grid-${Math.min(trustQuotes.length, 3)} trust-quotes`}>
                  {trustQuotes.map((q) => (
                    <figure className="pillar" key={q.text.slice(0, 32)}>
                      <blockquote>
                        <p>&ldquo;{q.text}&rdquo;</p>
                      </blockquote>
                      <figcaption>
                        <b>{q.role}</b>
                        <span>{q.org}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {trust.google.reviewCount > 0 && (
                <p className="text-center trust-google">
                  <a className="more" href={trust.google.reviewsUrl} target="_blank" rel="noopener">
                    Google&apos;daki {trust.google.reviewCount} yorumu okuyun <Icon id="arrow" size={12} />
                    <span className="visually-hidden"> (yeni sekmede açılır)</span>
                  </a>
                </p>
              )}
            </div>
          </section>
        )}

        <section className="section" id="sss">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">S.S.S.</span>
              <h2>ISO 27001 sıkça sorulan sorular</h2>
              <p>ISO 27001 belgelendirme ve Bilgi Güvenliği Yönetim Sistemi (BGYS) süreçleri hakkında sık sorulanlar.</p>
            </div>
            <FaqList items={home.faqs} />
          </div>
        </section>

        <section className="section section-navy quote-sec" id="teklif">
          <div className="wrap quote-wrap">
            <div className="quote-intro">
              <span className="eyebrow">Hızlı Teklif</span>
              <h2>
                ISO 27001 teklifinizi <em>aynı gün</em> alın
              </h2>
              <p>
                Birkaç bilgiyle kapsamınızı anlayalım; danışmanlık kapsamı, proje takvimi ve belgelendirme adımlarını
                içeren teklifimizi hızla iletelim.
              </p>
              <ul>
                {QUOTE_BULLETS.map((b) => (
                  <li key={b}>
                    <Icon id="check" size={16} /> {b}
                  </li>
                ))}
              </ul>
              <p className="quote-alt">
                Hemen konuşmak isterseniz: <a href={site.phone.href}>{site.phone.display}</a> ·{" "}
                <a href={site.whatsapp.href} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </p>
            </div>
            <QuoteForm />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Hizmet Portföyü</span>
              <h2>ISO 27001&apos;in yanında diğer hizmetlerimiz</h2>
              <p>KVKK, sızma testi, diğer ISO standartları ve eğitimler. Kapsamı görmek için başlığa dokunun.</p>
            </div>
            {home.serviceGroups.map((group) => (
              <div className="grp" key={group.title}>
                <div className="grp-h">
                  <h3>{group.title}</h3>
                  <span>{group.items.length} hizmet alanı</span>
                </div>
                {group.items.map((item) => (
                  <details className="svc" key={item.href}>
                    <summary>
                      <span className="t">
                        <b>{item.title}</b>
                        <small>{item.short}</small>
                      </span>
                      <span className="chev">
                        <Icon id="plus" size={14} />
                      </span>
                    </summary>
                    <div className="svc-body">
                      <p>{item.desc}</p>
                      <Link className="more" href={item.href}>
                        Detayları İnceleyin<span className="visually-hidden">: {item.title}</span> <Icon id="arrow" size={12} />
                      </Link>
                    </div>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="section section-ice manifesto">
          <div className="wrap">
            <span className="eyebrow">Hakkımızda</span>
            <h2 style={{ maxWidth: "20ch" }}>
              ISO 27001 Belgelendirme ve <em>Danışmanlık</em>.
            </h2>
            <p>
              Uluslararası Standardizasyon Örgütü (ISO), 1947&apos;den beri uluslararası standartlar yayımlayan
              kuruluştur; 170&apos;i aşkın ülkenin ulusal standart kuruluşu ISO&apos;ya üyedir. ISO/IEC 27001 de bu
              standartlardan biridir ve bilgi güvenliği için ortak bir dil sunar.
            </p>
            <p>
              ISO 27001 danışmanlık hizmetimizle risk yönetimi süreçlerinizi standardın şartlarına göre kuruyor,
              sürdürülebilir bir bilgi güvenliği yönetim sistemi oluşturmanıza destek oluyoruz. Hazırladığımız proje
              planıyla belgelendirme denetimine hazırlığı adım adım yönetiyoruz.
            </p>
            <p className="mani-sig">— ISO 27001 Danışmanlık Ekibi</p>
            <Link className="btn btn-ghost" href="/hakkimizda/">
              Hakkımızda Daha Fazla
            </Link>
          </div>
        </section>

        {latest.length > 0 && (
          <section className="section">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">Bloglarımız</span>
                <h2>Bilgi güvenliği rehberi</h2>
              </div>
              <div className="grid grid-3">
                {latest.map((p) => (
                  <PostCard key={p.id} post={toCard(p)} />
                ))}
              </div>
              <div className="text-center" style={{ marginTop: 36 }}>
                <Link className="btn btn-ghost" href="/blog/">
                  Tüm Yazıları Gör
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="section section-navy">
          <div className="wrap text-center">
            <h2>
              Bilgi güvenliğinde <em>çözüm ortağınız</em>.
            </h2>
            <p style={{ color: "#C9D8E8", maxWidth: 600, margin: "0 auto 28px" }}>
              ISO 27001 süreçleriniz ve siber güvenlik ihtiyaçlarınız için profesyonel destek almaya hazır mısınız?
            </p>
            <Link className="btn btn-on-navy btn-lg" href="#teklif">
              Hemen İletişime Geçin
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
