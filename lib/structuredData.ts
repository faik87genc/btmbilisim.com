import type { Page } from "@/lib/db/schema";
import { site } from "@/lib/site";
import { absoluteUrl, type Crumb } from "@/lib/siteView";
import { pageHref } from "@/lib/pages";
import home from "@/lib/data/home.json";

// JSON-LD builders — same entities and fields as build.py's *_jsonld().

export const DEFAULT_OG_IMAGE = absoluteUrl("/assets/img/iso-27001.webp");

// Stable node ids: Service and WebSite point at the one organization node.
const ORG_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

// schema.org asks for a more specific type than bare ProfessionalService;
// pairing it with LocalBusiness keeps the node a local business (Organization
// is inherited) for local results.
const ORG_TYPE = ["LocalBusiness", "ProfessionalService"];

const AREA_SERVED = site.areaServed.map((a) => ({ "@type": a.type, name: a.name }));

const OPENING_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: site.hours.days,
  opens: site.hours.opens,
  closes: site.hours.closes,
};

const TELEPHONE = site.phone.href.replace("tel:", "");

// build.py KNOWS_ABOUT — subject names only, no credential claims.
const KNOWS_ABOUT = [
  "ISO/IEC 27001:2022",
  "Bilgi Güvenliği Yönetim Sistemi (BGYS)",
  "ISO/IEC 27701",
  "ISO 22301",
  "ISO/IEC 20000-1",
  "Sızma testi (pentest)",
  "KVKK uyumu",
  "Bilgi güvenliği farkındalık eğitimi",
  "E-posta oltalama tatbikatı",
];

type ServiceItem = (typeof home.serviceGroups)[number]["items"][number];
const SERVICE_BY_HREF = new Map<string, { item: ServiceItem; category: string }>(
  home.serviceGroups.flatMap((g) => g.items.map((item) => [item.href, { item, category: g.title }] as const)),
);

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: absoluteUrl("/"),
    inLanguage: "tr-TR",
    publisher: { "@id": ORG_ID },
  };
}

/** Service node for a page listed in the homepage service cards, else null. */
export function serviceJsonLd(href: string) {
  const hit = SERVICE_BY_HREF.get(href);
  if (!hit) return null;
  const url = absoluteUrl(href);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: hit.item.title,
    serviceType: hit.item.short,
    description: hit.item.desc,
    category: hit.category,
    url,
    provider: { "@type": ORG_TYPE, "@id": ORG_ID, name: site.name, url: absoluteUrl("/") },
    areaServed: AREA_SERVED,
    availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl("/iletisim/") },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ORG_TYPE,
    "@id": ORG_ID,
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/assets/img/logo.png"),
    image: DEFAULT_OG_IMAGE,
    telephone: TELEPHONE,
    email: site.email,
    address: { "@type": "PostalAddress", ...site.postalAddress },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
    hasMap: site.mapsUrl,
    openingHoursSpecification: [OPENING_HOURS],
    areaServed: AREA_SERVED,
    legalName: site.legalName,
    parentOrganization: { "@type": "Organization", name: site.parent.name, url: site.parent.url },
    sameAs: [site.social.instagram, site.social.x],
    priceRange: "$$",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: TELEPHONE,
      email: site.email,
      areaServed: "TR",
      availableLanguage: ["Turkish"],
      hoursAvailable: OPENING_HOURS,
    },
    knowsAbout: KNOWS_ABOUT,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hizmetler",
      itemListElement: home.serviceGroups.map((g) => ({
        "@type": "OfferCatalog",
        name: g.title,
        itemListElement: g.items.map((it) => ({ "@type": "Service", name: it.title, url: absoluteUrl(it.href) })),
      })),
    },
  };
}

/** Last crumb is the current page: its `item` URL is omitted (Google guideline). */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  const all: Crumb[] = [{ text: "Anasayfa", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.text,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
}

/**
 * Publish / last-modified instants for a page. A scheduled post is saved
 * (updatedAt) before it goes live (publishedAt), so "modified" is never
 * allowed to precede "published" — Google treats that as an invalid date pair.
 */
export function pageDates(p: Pick<Page, "publishedAt" | "createdAt" | "updatedAt">): { published: Date; modified: Date } {
  const published = p.publishedAt ?? p.createdAt;
  const updated = p.updatedAt ?? published;
  return { published, modified: updated.getTime() > published.getTime() ? updated : published };
}

export function articleJsonLd(p: Page, description: string) {
  const { published, modified } = pageDates(p);
  const url = absoluteUrl(pageHref(p));
  return {
    "@context": "https://schema.org",
    // Admin-written daily posts are blog posts; migrated guides stay Article.
    "@type": p.kind === "blog" ? "BlogPosting" : "Article",
    "@id": `${url}#article`,
    headline: p.title,
    description,
    image: [p.coverImageUrl ? absoluteUrl(p.coverImageUrl) : p.ogImageUrl ? absoluteUrl(p.ogImageUrl) : DEFAULT_OG_IMAGE],
    // Full timestamps (with timezone) rather than bare dates: with a new post
    // most days, the time of day is what tells crawlers which one is newest.
    datePublished: published.toISOString(),
    dateModified: modified.toISOString(),
    inLanguage: "tr-TR",
    ...(p.tags.length > 0 ? { keywords: p.tags.join(", ") } : {}),
    // Always the anonymous expert team — the editor's free-text "Yazar" field
    // is never emitted as a Person, so a personal name can't leak into
    // structured data (site policy: roles only, no names).
    author: {
      "@type": "Organization",
      name: `${site.name} Uzman Ekibi`,
      url: absoluteUrl("/"),
      parentOrganization: { "@id": ORG_ID },
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.name,
      // The brand's legal owner (Ensa Kurumsal), same as the org node.
      legalName: site.legalName,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/img/logo.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function faqPageJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
