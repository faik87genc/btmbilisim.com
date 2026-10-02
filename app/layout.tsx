import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";

// Styles are per area: the public site loads the static site's stylesheet
// (app/(site)/layout.tsx), the admin panel loads Tailwind (app/admin/layout.tsx).
// Keeping them apart stops Tailwind's reset from touching the site design.

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ISO 27001, KVKK ve Sızma Testi`,
    template: `%s`,
  },
  description: site.description,
  metadataBase: new URL(site.baseUrl),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    images: ["/assets/img/iso-27001.webp"],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  // TODO: once the domain is verified in Google Search Console, add:
  // verification: { google: "<verification-code>" },
};

export const viewport: Viewport = {
  themeColor: "#153355",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
