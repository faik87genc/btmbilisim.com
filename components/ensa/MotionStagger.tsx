"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

/**
 * Reveals its children one after another as the group scrolls into view.
 * Uses a single viewport observer on the parent (cheaper than one per child)
 * and collapses to a plain wrapper under `prefers-reduced-motion`.
 */

const parentVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function MotionStagger({
  children,
  className = "",
  stagger = 0.09,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul";
}) {
  const reduceMotion = useReducedMotion();
  const Component = m[as];

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      variants={parentVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </Component>
  );
}

export function MotionStaggerItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduceMotion = useReducedMotion();
  const Component = m[as];

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component className={className} variants={childVariants}>
      {children}
    </Component>
  );
}
