import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";

// Styles are per area: the public site loads app/(site)/ensa.css, the admin
// panel loads app/globals.css (app/admin/layout.tsx). Both are Tailwind; the
// public one carries the brand tokens and long-form content styles.

// Only the display face is preloaded — it renders the hero <h1>. The body face,
// IBM Plex Sans, is self-hosted (public/fonts, @font-face in ensa.css): Google
// now serves it as a variable font that the Turbopack next/font/google loader
// fails to build. `swap` paints body text in the fallback immediately.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
});



export const metadata: Metadata = {
  title: {
    default: `${site.name} | Siber Güvenlik, Altyapı ve Yazılım Çözümleri`,
    template: `%s`,
  },
  description: site.description,
  metadataBase: new URL(site.baseUrl),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    images: ["/assets/img/og-default.jpg"],
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
  themeColor: "#072b55",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
