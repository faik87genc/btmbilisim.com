import { Mail, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

// "Demo isteyin" for the software products: every product has a live demo
// panel that the team shows on request, so the request goes straight to a
// person — WhatsApp (prefilled) or e-mail — instead of a generic form.

export function demoWhatsAppHref(product: string) {
  return `https://wa.me/905437309132?text=${encodeURIComponent(`Merhaba, ${product} için demo talep etmek istiyorum.`)}`;
}

export function demoMailHref(product: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(`${product} demo talebi`)}`;
}

export function DemoRequest({ product, tone = "dark", align = "start" }: { product: string; tone?: "dark" | "light"; align?: "start" | "center" }) {
  const ghost =
    tone === "dark"
      ? "border border-white/30 text-white hover:border-gold-300 hover:text-gold-300"
      : "border border-navy-950/15 text-navy-800 hover:border-navy-800/50 hover:bg-paper-50";
  return (
    <div className={`flex flex-col gap-2 ${align === "center" ? "items-center" : "items-start"}`}>
      <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <a
          href={demoWhatsAppHref(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-control bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp&apos;tan demo isteyin<span className="visually-hidden"> (yeni sekmede açılır)</span>
        </a>
        <a
          href={demoMailHref(product)}
          className={`inline-flex items-center justify-center gap-2 rounded-control px-6 py-3 text-sm font-semibold transition-colors ${ghost}`}
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          E-posta ile isteyin
        </a>
      </div>
      <p className={`text-xs ${tone === "dark" ? "text-slate-300" : "text-slate-600"}`}>
        Canlı demo panelini ekibimiz sizin için açar ve birlikte inceler.
      </p>
    </div>
  );
}
