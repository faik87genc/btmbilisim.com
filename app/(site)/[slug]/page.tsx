import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect } from "next/navigation";
import { ArticleView } from "@/components/site/ArticleView";
import { contentMetadata, draftNote, isAdmin, relatedFor, resolveContent } from "@/lib/pageRoute";

// ISR: every article is rendered on its first request, then served from the
// cache and re-rendered in the background at most every 5 minutes (admin
// saves also call revalidatePath). Reading searchParams or cookies here would
// make every request a fresh server render (slow TTFB), so draft previews use
// Draft Mode instead: /api/draft/?slug=… (admin only) sets the bypass cookie,
// and only those requests render dynamically and see unpublished rows.
export const revalidate = 300;

// An empty list = no paths prerendered at build time (no build-time DB load),
// but every path is cached after its first render.
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveContent("any", slug, false);
  return resolved.kind === "found" ? contentMetadata(resolved.page) : {};
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  // cookies() is only read in Draft Mode, i.e. never while prerendering.
  const allowDraft = (await draftMode()).isEnabled && (await isAdmin());

  const resolved = await resolveContent("any", slug, allowDraft);
  if (resolved.kind === "redirect") permanentRedirect(resolved.to);
  if (resolved.kind === "none") notFound();

  const { page, draft } = resolved;
  return <ArticleView page={page} related={await relatedFor(page)} draftNote={draft ? draftNote(page) : null} />;
}
