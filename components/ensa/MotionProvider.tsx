"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { ReactNode } from "react";

// Loads only the "domAnimation" feature bundle (opacity/transform/gestures)
// instead of framer-motion's full API surface, and only once per page load
// (shared by every `m.*` element below it). It is imported synchronously on
// purpose: loading it via `() => import(...)` deferred the bundle past
// hydration, and `whileInView` reveals that were already in the viewport when
// it finally arrived never fired — whole sections stayed at opacity 0.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
