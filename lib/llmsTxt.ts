import { site } from "@/lib/site";
import { fallbackPages } from "@/lib/fallbackPages";
import { serviceCategoryList } from "@/lib/services";
import { products } from "@/lib/products";
import { isRetiredSlug } from "@/lib/legacyRedirects";

// Text for /llms.txt and /llms-full.txt, built from the same data the site
// renders (lib/site.ts, the homepage service cards and the imported pages),
// so it can't drift from what visitors see.

const abs = (href: string) => `${site.baseUrl}${href}`;

function intro(): string[] {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description} (${site.baseUrl.replace("https://", "")})`,
    "",
    "- Sitenin dili Türkçedir; tüm sayfalar Türkçe içeriktir.",
    `- Merkez: ${site.address}. Telefon: ${site.phone.display}. E-posta: ${site.email}. 7/24 teknik destek: ${site.supportEmail.address}.`,
    "- Sabit fiyat listesi yoktur. Kapsam ve ücret, ücretsiz keşif görüşmesinden sonra ihtiyaca göre belirlenir.",
    "",
  ];
}

function services(): string[] {
  const out: string[] = [];
  for (const c of serviceCategoryList) {
    out.push(`## ${c.title}`, "", `${c.summary} [Kategori sayfası](${abs(`/${c.slug}/`)})`, "");
    for (const s of c.services) out.push(`- [${s.name}](${abs(`/${c.slug}/${s.key}/`)}): ${s.description}`);
    out.push("");
  }
  out.push("## Yazılım Ürünleri", "");
  for (const p of products) out.push(`- [${p.name}](${abs(`/yazilim-urunlerimiz/${p.slug}/`)}): ${p.tagline} ${p.description}`);
  out.push("");
  return out;
}

export const LLMS_TXT: string = [
  ...intro(),
  `Kaynak göstermek için sayfaların kendi adreslerini kullanın. Hizmet sayfalarının tam metni: [llms-full.txt](${abs("/llms-full.txt")})`,
  "",
  ...services(),
  "## Diğer",
  "",
  `- [Hakkımızda](${abs("/hakkimizda/")})`,
  `- [Blog](${abs("/blog/")}): Siber güvenlik, ağ altyapısı, yedekleme, sunucu ve güvenlik kamerası sistemleri üzerine rehberler.`,
  `- [İletişim](${abs("/iletisim/")})`,
  "",
].join("\n");

/** Full text of the core (non-blog) pages, for agents that want the content itself. */
export const LLMS_FULL_TXT: string = [
  ...intro(),
  ...fallbackPages()
    .filter((p) => p.kind === "page" && p.tags.length === 0 && !isRetiredSlug(p.slug))
    .flatMap((p) => [`## ${p.title}`, "", `Adres: ${abs(`/${p.slug}/`)}`, "", p.content, ""]),
].join("\n");

/** Plain-text response; `noindex` keeps the raw file out of web search results
 *  without stopping AI crawlers from fetching it. */
export function llmsResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
