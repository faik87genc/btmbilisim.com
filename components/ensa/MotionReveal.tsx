"use client";

import { m, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";
type Tag = "div" | "li" | "ul" | "section" | "span";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
};

/**
 * Fades + slides its children into view once, respecting
 * `prefers-reduced-motion`. Optional directional entry, entry blur, and a
 * hover/press lift for interactive cards.
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
  const reduceMotion = useReducedMotion();
  const Component = m[as];

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const { x = 0, y = 0 } = offsets[direction];
  const hoverProps = hover
    ? { whileHover: { y: -6, transition: { duration: 0.2 } }, whileTap: { y: -2 } }
    : {};

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y, ...(blur ? { filter: "blur(10px)" } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
