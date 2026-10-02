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

// Section copy lives in lib/data/home.json (service cards there also feed the
// Organization/Service JSON-LD in lib/structuredData.ts).

export const revalidate = 300;

const QUOTE_BULLETS = [
  "Ücretsiz keşif ve ihtiyaç analizi",
  "Kalem kalem, şeffaf teklif",
  "Kurulumdan sonra bakım ve destek",
];

const HERO_POINTS = [
  "Sızma testi deneyimiyle güvenlik odaklı kurulum",
  "Ağ, sunucu, bulut ve yedekleme tek ekipte",
  "Gebze merkezli, Kocaeli ve İstanbul'da yerinde servis",
  "Kurulum sonrası bakım, izleme ve hızlı müdahale",
];

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
              <span className="eyebrow">Bilgi Teknolojileri Merkezi</span>
              <h1>
                İşletmenizin bilişim altyapısında <em>güvendiğiniz</em> ortak.
              </h1>
              <p className="sub">
                Siber güvenlik ve sızma testinden ağ altyapısına, sunucu ve sanallaştırmadan bulut yedeklemeye kadar
                tüm bilişim ihtiyaçlarınızı tek ekiple planlıyor, kuruyor ve ayakta tutuyoruz.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary btn-lg" href="#teklif">
                  Ücretsiz Keşif Talep Edin <Icon id="arrow" size={16} />
                </Link>
                <Link className="btn btn-ghost btn-lg" href="/hizmetler/">
                  Hizmetlerimiz
                </Link>
              </div>
              <div className="hero-badges">
                <div><strong>7/24</strong><span>Teknik Destek</span></div>
                <div><strong>Uçtan Uca</strong><span>Keşif · Kurulum · Bakım</span></div>
                <div><strong>Gebze</strong><span>Merkezli Yerinde Servis</span></div>
              </div>
            </div>
            <div className="hero-card">
              <h2 className="hero-card-h2">Neden BTM Bilişim?</h2>
              <ul>
                {HERO_POINTS.map((t) => (
                  <li key={t}>
                    <Icon id="check" size={18} /> {t}
                  </li>
                ))}
              </ul>
              <Link className="btn btn-primary btn-block" href="/hakkimizda/">
                Bizi Tanıyın
              </Link>
            </div>
          </div>
        </section>

        <section className="section" id="hizmetler">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Hizmetlerimiz</span>
              <h2>
                Bilişim altyapınız için <em>uçtan uca</em> çözümler
              </h2>
              <p>
                Güvenlikten altyapıya, buluttan yazılıma kadar ihtiyacınız olan her alanda deneyimli bir ekip. Tüm
                hizmetleri <Link href="/hizmetler/">hizmetler sayfamızda</Link> inceleyebilirsiniz.
              </p>
            </div>
            {home.serviceGroups.map((group) => (
              <div className="grp" key={group.title}>
                <div className="grp-h">
                  <h3>{group.title}</h3>
                  <span>{group.items.length} hizmet alanı</span>
                </div>
                <div className="svc-scope">
                  {group.items.map((item) => (
                    <div className="svc-scope-card" key={item.href}>
                      <h4 className="svc-card-h">{item.title}</h4>
                      <p>{item.desc}</p>
                      <Link className="more" href={item.href}>
                        Detaylar<span className="visually-hidden">: {item.title}</span> <Icon id="arrow" size={12} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-ice" id="surec">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Çalışma Sürecimiz</span>
              <h2>Keşiften desteğe, adım adım</h2>
              <p>Her projede aynı disiplinle ilerliyoruz; her adımın sonunda elinizde somut bir çıktı olur.</p>
            </div>
            <div className="steps">
              {home.processSteps.map((s) => (
                <div className="step" key={s.title}>
                  <h3 className="step-h">{s.title}</h3>
                  <p className="step-output">
                    <strong>Çıktı:</strong> {s.output}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Nasıl Çalışıyoruz</span>
              <h2>Dört ilkemiz</h2>
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
          <section className="section section-ice" id="sahadan">
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

        <section className="section section-navy quote-sec" id="teklif">
          <div className="wrap quote-wrap">
            <div className="quote-intro">
              <span className="eyebrow">Hızlı Teklif</span>
              <h2>
                İhtiyacınızı anlatın, <em>aynı gün</em> dönelim
              </h2>
              <p>
                Birkaç bilgiyle ihtiyacınızı anlayalım; keşif randevusu ve teklif için en kısa sürede sizinle iletişime
                geçelim.
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

        <section className="section" id="sss">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">S.S.S.</span>
              <h2>Sıkça sorulan sorular</h2>
            </div>
            <FaqList items={home.faqs} />
          </div>
        </section>

        {latest.length > 0 && (
          <section className="section section-ice">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">Blog</span>
                <h2>Bilişim ve güvenlik rehberi</h2>
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
              Dijital geleceğinizi <em>güvenle</em> şekillendirin.
            </h2>
            <p style={{ color: "#C9D8E8", maxWidth: 600, margin: "0 auto 28px" }}>
              Altyapınızı birlikte değerlendirelim; ihtiyacınıza uygun çözümü ve net bir yol haritasını sunalım.
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
