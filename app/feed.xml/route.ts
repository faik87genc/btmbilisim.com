import { getPublishedPages, pageHref, postLikePages } from "@/lib/pages";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";
import { pageDates } from "@/lib/structuredData";

// RSS 2.0 feed of the newest articles, linked from every public page's <head>
// (app/(site)/layout.tsx). Feed readers and aggregators — and search engines
// that poll feeds — pick up a new post from here without waiting for a
// sitemap recrawl. Admin saves revalidate it immediately; the interval covers
// scheduled posts going live on their own.
export const revalidate = 600;

const LIMIT = 30;

function xml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = postLikePages((await getPublishedPages()).filter((p) => !p.noindex)).slice(0, LIMIT);
  const feedUrl = absoluteUrl("/feed.xml");
  const lastBuild = posts.length ? pageDates(posts[0]).published : new Date();

  const items = posts
    .map((p) => {
      const url = absoluteUrl(pageHref(p));
      return [
        "<item>",
        `<title>${xml(p.title)}</title>`,
        `<link>${xml(url)}</link>`,
        `<guid isPermaLink="true">${xml(url)}</guid>`,
        `<pubDate>${pageDates(p).published.toUTCString()}</pubDate>`,
        `<description>${xml(p.metaDescription || p.excerpt)}</description>`,
        ...p.tags.map((t) => `<category>${xml(t)}</category>`),
        "</item>",
      ].join("");
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${xml(site.name)} Blog</title>
<link>${xml(absoluteUrl("/blog/"))}</link>
<description>${xml("Siber güvenlik, ağ altyapısı, sunucu, yedekleme ve kamera sistemleri üzerine rehberler.")}</description>
<language>tr-TR</language>
<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
<atom:link href="${xml(feedUrl)}" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
