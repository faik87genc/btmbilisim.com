import type { Metadata } from "next";
import { site } from "@/lib/site";

// Pages here set short titles; the brand suffix is added once, here.
export const metadata: Metadata = { title: { template: `%s${site.titleSuffix}`, default: site.name } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
