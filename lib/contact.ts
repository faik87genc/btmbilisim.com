import { site } from "@/lib/site";

// Prefilled WhatsApp links: the visitor lands in a chat that already says what
// they want ("<hizmet> için teklif almak istiyorum"), so the first reply can go
// straight to the point.
export function whatsappHref(message: string): string {
  const number = site.mobile.href.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function serviceWhatsAppHref(service: string): string {
  return whatsappHref(`Merhaba, web sitenizden yazıyorum. "${service}" için bilgi ve teklif almak istiyorum.`);
}
