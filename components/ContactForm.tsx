"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FieldError, Req, RequiredNote, useFieldErrors } from "@/components/FieldErrors";
import { site } from "@/lib/site";

// Markup/fields match the static site's contact.html form. Submission goes to
// /api/contact (SMTP). If mail isn't configured or the request fails, the form
// keeps its values and offers two explicit buttons with the message
// pre-filled — WhatsApp and the visitor's mail app — so no enquiry is lost and
// nothing navigates away without the visitor choosing it.

// Keep in sync with `allowedTopics` in app/api/contact/route.ts.
const TOPICS = ["ISO 27001 Danışmanlık", "Sızma Testi (Pentest)", "KVKK Uyum Danışmanlığı", "Eğitim Hizmetleri", "Diğer"];

type Values = { name: string; company: string; email: string; phone: string; topic: string; message: string; website: string };

const WA_NUMBER = site.whatsapp.href.match(/wa\.me\/(\d+)/)?.[1] ?? "";

function whatsappHref(v: Values): string {
  const lines = [
    "Merhaba, web sitenizdeki iletişim formundan yazıyorum.",
    `Ad Soyad: ${v.name}`,
    `Şirket: ${v.company || "-"}`,
    `E-Posta: ${v.email}`,
    `Telefon: ${v.phone || "-"}`,
    `Hizmet: ${v.topic}`,
    `Mesaj: ${v.message}`,
  ];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function mailtoHref(v: Values): string {
  const body = [
    `Ad Soyad: ${v.name}`,
    `Şirket: ${v.company}`,
    `E-Posta: ${v.email}`,
    `Telefon: ${v.phone}`,
    `Hizmet: ${v.topic}`,
    "",
    "Mesaj:",
    v.message,
  ].join("\n");
  return `mailto:${encodeURIComponent(site.email)}?subject=${encodeURIComponent(
    `Web Sitesi Teklif Talebi - ${v.topic}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [fallback, setFallback] = useState<{ wa: string; mail: string } | null>(null);
  const fallbackRef = useRef<HTMLAnchorElement>(null);
  const { errors, onInvalidCapture, onInputCapture, fieldProps, clear } = useFieldErrors();

  // After a failed send, move focus to the first fallback button.
  useEffect(() => {
    if (status === "fallback") fallbackRef.current?.focus();
  }, [status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = Object.fromEntries(
      ["name", "company", "email", "phone", "topic", "message", "website"].map((k) => [k, String(data.get(k) ?? "").trim()]),
    ) as Values;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      clear();
    } catch {
      setFallback({ wa: whatsappHref(v), mail: mailtoHref(v) });
      setStatus("fallback");
    }
  };

  return (
    <form
      className="form-card"
      id="iletisim-formu"
      // POST, never GET: if JS has not loaded yet, a native submit must not put personal data in the URL.
      method="post"
      onSubmit={onSubmit}
      onInvalidCapture={onInvalidCapture}
      onInputCapture={onInputCapture}
    >
      <RequiredNote />
      <div className="form-field">
        <label htmlFor="f-name">
          Ad Soyad
          <Req />
        </label>
        <input id="f-name" name="name" type="text" required minLength={2} autoComplete="name" {...fieldProps("f-name")} />
        <FieldError id="f-name" errors={errors} />
      </div>
      <div className="form-field">
        <label htmlFor="f-company">Şirket</label>
        <input id="f-company" name="company" type="text" autoComplete="organization" />
      </div>
      <div className="form-field">
        <label htmlFor="f-email">
          E-Posta
          <Req />
        </label>
        <input id="f-email" name="email" type="email" required autoComplete="email" {...fieldProps("f-email")} />
        <FieldError id="f-email" errors={errors} />
      </div>
      <div className="form-field">
        <label htmlFor="f-phone">Telefon</label>
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="form-field">
        <label htmlFor="f-subject">İlgilendiğiniz Hizmet</label>
        <select id="f-subject" name="topic" defaultValue={TOPICS[0]}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="f-msg">
          Mesajınız
          <Req />
        </label>
        <textarea id="f-msg" name="message" rows={5} required minLength={10} {...fieldProps("f-msg")} />
        <FieldError id="f-msg" errors={errors} />
      </div>
      {/* Honeypot — hidden from people, bots fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999 }}>
        <label>
          Web sitesi
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Gönderiliyor…" : "Mesajı Gönder"}
      </button>
      <p role="status" aria-live="polite" className="form-note">
        {status === "sent" && "Mesajınız iletildi. 24 saat içinde size dönüş yapılacak."}
        {status === "fallback" &&
          `Mesajınız şu an iletilemedi. Bilgileriniz hazır: aşağıdaki düğmelerden biriyle gönderebilir, ${site.email} adresine yazabilir veya bizi arayabilirsiniz.`}
      </p>
      {status === "fallback" && fallback && (
        <div className="form-fallback">
          <a ref={fallbackRef} className="btn btn-primary" href={fallback.wa} target="_blank" rel="noopener">
            WhatsApp ile Gönder
            <span className="visually-hidden"> (yeni sekmede açılır)</span>
          </a>
          <a className="btn btn-ghost" href={fallback.mail}>
            E-posta ile Gönder
          </a>
        </div>
      )}
      <p className="form-note">
        Paylaştığınız bilgiler yalnızca talebinize dönüş yapmak için,{" "}
        <Link href="/kisisel-verilerin-korunmasi-politikasi/">KVKK Aydınlatma Metni</Link>{" "}
        kapsamında işlenir.
      </p>
    </form>
  );
}
