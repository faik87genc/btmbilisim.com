import type { Metadata } from "next";
import { site } from "@/lib/site";
import { MotionProvider } from "@/components/ensa/MotionProvider";

// Pages here set short titles; the brand suffix is added once, here. The product
// pages animate with framer-motion (MotionStagger, ParallaxGlobe, CountUp), so its
// feature bundle is loaded here rather than on every page.
export const metadata: Metadata = { title: { template: `%s${site.titleSuffix}`, default: site.name } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MotionProvider>{children}</MotionProvider>;
}
