import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/pageRoute";

// Draft preview entry point for the admin panel ("Önizle" links).
// Public pages are statically cached (ISR), so they cannot read ?preview or
// the session cookie per request. This handler checks the admin session,
// enables Draft Mode (bypass cookie, ends with the browser session) and sends
// the admin to the page, which then renders dynamically with drafts allowed.
//
//   /api/draft/?slug=<slug>   enable + open /<slug>/
//   /api/draft/?exit=1        disable Draft Mode and go home
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const draft = await draftMode();

  if (params.has("exit")) {
    draft.disable();
    redirect("/");
  }

  if (!(await isAdmin())) return new Response("Yetkisiz", { status: 401 });

  // Only a plain slug: the redirect target is always a same-site /<slug>/ path.
  const slug = params.get("slug") ?? "";
  if (!/^[a-z0-9-]+$/.test(slug)) return new Response("Geçersiz slug", { status: 400 });

  draft.enable();
  redirect(`/${slug}/`);
}
