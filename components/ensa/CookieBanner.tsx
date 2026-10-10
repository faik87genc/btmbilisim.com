import Link from "next/link";

// Cookie consent banner. Behaviour (show/hide, accept/reject, GA4 gate, footer
// "Çerez Tercihleri") lives in components/site/SiteBehavior.tsx and is keyed
// on the element ids below; keep them in sync.
//
// Runs while the HTML is parsed, before first paint: shows the banner for
// visitors without a stored choice, so nothing jumps after hydration.
// Keep the "cookie-consent" key in sync with SiteBehavior.tsx.
const SHOW_BANNER_EARLY = `(function(){try{if(localStorage.getItem("cookie-consent"))return}catch(e){}var b=document.getElementById("cookie-banner");if(b)b.hidden=false})()`;

export function CookieBanner() {
  return (
    <>
      {/* suppressHydrationWarning: the inline script may drop `hidden` before hydration. */}
      <div
        id="cookie-banner"
        role="region"
        aria-label="Çerez bildirimi"
        hidden
        suppressHydrationWarning
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-white shadow-lift"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 md:px-10">
          {/* Phones get the one-line version so the banner does not cover the hero CTAs. */}
          <p className="max-w-3xl flex-1 text-xs leading-snug text-slate-500 sm:text-sm sm:leading-relaxed">
            <span className="sm:hidden">Zorunlu ve (onayınızla) analiz çerezleri kullanıyoruz. Ayrıntılar: </span>
            <span className="hidden sm:inline">
              Sitemizde, deneyiminizi iyileştirmek için zorunlu çerezler ve (onayınız hâlinde) analiz çerezleri
              kullanılmaktadır. Detaylar için{" "}
            </span>
            <Link href="/cerez-politikasi/" className="font-medium text-ink-900 underline underline-offset-2">
              Çerez Politikası
            </Link>
            <span className="hidden sm:inline">&apos;nı inceleyebilirsiniz.</span>
          </p>
          {/* Same style for both: rejecting must be as easy and prominent as accepting (KVKK çerez rehberi). */}
          <div className="flex w-full gap-3 sm:w-auto">
            <button
              type="button"
              id="cookie-reject"
              className="min-h-10 flex-1 rounded-control bg-navy-950 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 sm:min-h-11 sm:flex-none"
            >
              Reddet
            </button>
            <button
              type="button"
              id="cookie-accept"
              className="min-h-10 flex-1 rounded-control bg-navy-950 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 sm:min-h-11 sm:flex-none"
            >
              Kabul Et
            </button>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SHOW_BANNER_EARLY }} />
    </>
  );
}
