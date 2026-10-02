import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogIndex, blogIndexMetadata, blogPageCount } from "@/components/site/BlogIndex";
import { isAdmin, resolveContent } from "@/lib/pageRoute";
import { pageHref } from "@/lib/pages";

export const revalidate = 300;

// ISR on demand (see app/(site)/[slug]/page.tsx): nothing prerendered at
// build time, every path cached after its first render.
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

// The static site paginates the blog as /blog/sayfa-2/, /blog/sayfa-3/, ...
// Next.js has no partial dynamic segments, so those URLs land here too.
function pageNumber(slug: string): number | null {
  const m = /^sayfa-(\d+)$/.exec(slug);
  return m ? Number(m[1]) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = pageNumber(slug);
  if (n) return blogIndexMetadata(n);
  return {};
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;

  const n = pageNumber(slug);
  if (n) {
    if (n === 1) permanentRedirect("/blog/");
    if (n > (await blogPageCount())) notFound();
    return <BlogIndex pageNum={n} />;
  }

  // Posts live at the flat /[slug]/ like every other article on the site;
  // an old /blog/<slug>/ link is sent there. Drafts only in Draft Mode
  // (/api/draft/), where the target page renders them too.
  const allowDraft = (await draftMode()).isEnabled && (await isAdmin());
  const resolved = await resolveContent("any", slug, allowDraft);
  if (resolved.kind === "redirect") permanentRedirect(resolved.to);
  if (resolved.kind === "none") notFound();
  permanentRedirect(pageHref(resolved.page));
}
