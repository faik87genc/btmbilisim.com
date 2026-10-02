import type { Metadata } from "next";
import "../globals.css";

export const dynamic = "force-dynamic";

// Belt-and-braces with robots.ts: keep the whole admin area out of every index.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-paper-100">{children}</div>;
}
