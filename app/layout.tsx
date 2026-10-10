import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";

// Styles are per area: the public site loads app/(site)/ensa.css, the admin
// panel loads app/globals.css (app/admin/layout.tsx). Both are Tailwind; the
// public one carries the brand tokens and long-form content styles.

// Corporate identity v2 (docs/kurumsal-kimlik-v2.md): Plus Jakarta Sans for
// headings, Inter for text and UI. Static weights (not the variable axis) keep
// the Turbopack next/font/google loader happy; `swap` paints the fallback first.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
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
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
