import { Mail } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { site } from "@/lib/site";
import { whatsappHref } from "@/lib/contact";

// "Demo isteyin" for the software products: every product has a live demo
// panel that the team shows on request, so the request goes straight to a
// person — WhatsApp (prefilled) or e-mail — instead of a generic form.

export function demoWhatsAppHref(product: string) {
  return whatsappHref(`Merhaba, ${product} için demo talep etmek istiyorum.`);
}

export function demoMailHref(product: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(`${product} demo talebi`)}`;
}

export function DemoRequest({ product, tone = "dark", align = "start" }: { product: string; tone?: "dark" | "light"; align?: "start" | "center" }) {
  const ghost =
    tone === "dark"
      ? "border border-white/30 text-white hover:border-gold-300 hover:text-gold-300"
      : "border border-slate-400 bg-white text-navy-950 hover:border-gold-600 hover:text-gold-700";
  // Identity v2: on dark grounds the primary action is white with ink text.
  const primary = tone === "dark" ? "bg-white text-navy-950 hover:bg-gold-100" : "bg-gold-500 text-white hover:bg-gold-700";
  return (
    <div className={`flex flex-col gap-2 ${align === "center" ? "items-center" : "items-start"}`}>
      <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <a
          href={demoWhatsAppHref(product)}
          target="_blank"
          rel="noopener noreferrer"
          className={`press inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-6 text-[0.9375rem] font-semibold transition-colors ${primary}`}
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp&apos;tan demo isteyin<span className="visually-hidden"> (yeni sekmede açılır)</span>
        </a>
        <a
          href={demoMailHref(product)}
          className={`press inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-6 text-[0.9375rem] font-semibold transition-colors ${ghost}`}
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
