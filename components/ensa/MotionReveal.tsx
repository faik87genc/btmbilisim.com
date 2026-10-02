import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";
type Tag = "div" | "li" | "ul" | "section" | "span";

/**
 * Fades + slides its children in once they scroll into view.
 *
 * Deliberately NOT a client component: it only marks the element
 * (`data-reveal` + classes) and the single <RevealObserver/> in the site
 * layout does the work. A client wrapper here made every revealed block a
 * client boundary — its children were shipped twice (HTML + RSC payload) and
 * hydrated one by one, which dominated main-thread time on long pages.
 *
 * Content renders visible; the observer hides only elements that start below
 * the first screen, so above-the-fold content never waits for JavaScript.
 */
export function MotionReveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  direction = "up",
  blur = false,
  hover = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: Tag;
  direction?: Direction;
  blur?: boolean;
  hover?: boolean;
}) {
  const Component = as;
  return (
    <Component
      data-reveal=""
      className={`reveal reveal-${direction}${blur ? " reveal-blur" : ""}${hover ? " reveal-hover" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Component>
  );
}
