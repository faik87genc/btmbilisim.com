import { ReactNode } from "react";

/**
 * Route-change enter transition for marketing pages. `template.tsx` re-mounts on
 * every navigation, so a CSS animation on `.page-enter` (see globals.css)
 * replays on each route change with **zero JavaScript**.
 *
 * The previous framer-motion `m.div` server-rendered as `opacity:0` and only
 * faded in after hydration + the animation tick — on throttled mobile that added
 * ~2 s of "render delay" to the hero-image LCP (and pushed Speed Index to 4 s),
 * because the LCP <img> lives inside this wrapper. The CSS version paints at
 * first frame instead. The global `prefers-reduced-motion` reset in globals.css
 * already collapses the animation to a no-op for those users.
 */
export default function SiteTemplate({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
