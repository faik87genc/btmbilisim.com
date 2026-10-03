"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FieldError, Req, RequiredNote, useFieldErrors } from "@/components/FieldErrors";
import options from "@/lib/data/quote-form.json";

// Quick quote form. Markup matches _legacy-static-site/templates/_quote_form.html
// (options from QUOTE_FORM in build.py). "Teklif İste" posts to /api/contact;
// if mail is not configured or the request fails, the form keeps its values
// and shows a "WhatsApp ile Gönder" button with the same summary pre-filled,
// so the request is not lost and the visitor decides when to leave the page.
// "WhatsApp ile Gönder" in the action row goes there directly.

const TOPIC = "Teklif Talebi"; // QUOTE_TOPIC in app/api/contact/route.ts

type Values = {
  company: string;
  name: string;
  phone: string;
  email: string;
  employees: string;
  locations: string;
  target: string;
  services: string[];
  message: string;
  website: string;
};

function read(form: HTMLFormElement): Values {
  const d = new FormData(form);
  const s = (k: string) => String(d.get(k) ?? "").trim();
  return {
    company: s("company"),
    name: s("name"),
    phone: s("phone"),
    email: s("email"),
    employees: s("employees"),
    locations: s("locations"),
    target: s("target"),
    services: d.getAll("services").map(String),
    message: s("message"),
    website: s("website"),
  };
}

function whatsappHref(v: Values): string {
  const lines = [
    "Merhaba, web sitenizden teklif almak istiyorum.",
    `Firma: ${v.company}`,
    `Ad Soyad: ${v.name}`,
    `Telefon: ${v.phone}`,
    `E-posta: ${v.email}`,
    `Çalışan sayısı: ${v.employees || "-"}`,
    `Lokasyon sayısı: ${v.locations || "-"}`,
    `Başlangıç: ${v.target || "-"}`,
    `Hizmetler: ${v.services.length ? v.services.join(", ") : "-"}`,
  ];
  if (v.message) lines.push(`Not: ${v.message}`);
  return `https://wa.me/${options.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "wa">("idle");
  const [waHref, setWaHref] = useState("");
  const fallbackRef = useRef<HTMLAnchorElement>(null);
  const { errors, onInvalidCapture, onInputCapture, fieldProps, clear } = useFieldErrors();

  // After a failed send, move focus to the WhatsApp fallback button.
  useEffect(() => {
    if (status === "wa") fallbackRef.current?.focus();
  }, [status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // aria-disabled (not disabled) keeps the button focusable while sending, so
    // focus is not lost; a second submit is ignored here instead.
    if (status === "sending") return;
    const form = e.currentTarget;
    const v = read(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, topic: TOPIC }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      clear();
    } catch {
      setWaHref(whatsappHref(v));
      setStatus("wa");
    }
  };

  const onWhatsApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    window.open(whatsappHref(read(form)), "_blank", "noopener");
  };

  return (
    <form
      className="form-card quote-form"
      id="quote-form"
      // POST, never GET: if JS has not loaded yet, a native submit must not put personal data in the URL.
      method="post"
      onSubmit={onSubmit}
      onInvalidCapture={onInvalidCapture}
      onInputCapture={onInputCapture}
    >
      <RequiredNote />
      <div className="quote-grid">
        <div className="form-field">
          <label htmlFor="q-company">
            Firma Adı
            <Req />
          </label>
          <input id="q-company" name="company" type="text" required minLength={2} autoComplete="organization" {...fieldProps("q-company")} />
          <FieldError id="q-company" errors={errors} />
        </div>
        <div className="form-field">
          <label htmlFor="q-name">
            Ad Soyad
            <Req />
          </label>
          <input id="q-name" name="name" type="text" required minLength={2} autoComplete="name" {...fieldProps("q-name")} />
          <FieldError id="q-name" errors={errors} />
        </div>
        <div className="form-field">
          <label htmlFor="q-phone">
            Telefon
            <Req />
          </label>
          <input id="q-phone" name="phone" type="tel" required autoComplete="tel" {...fieldProps("q-phone")} />
          <FieldError id="q-phone" errors={errors} />
        </div>
        <div className="form-field">
          <label htmlFor="q-email">
            E-Posta
            <Req />
          </label>
          <input id="q-email" name="email" type="email" required autoComplete="email" {...fieldProps("q-email")} />
          <FieldError id="q-email" errors={errors} />
        </div>
        <div className="form-field">
          <label htmlFor="q-employees">Çalışan Sayısı</label>
          <select id="q-employees" name="employees" defaultValue="">
            <option value="">Seçiniz</option>
            {options.employees.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="q-locations">Lokasyon Sayısı</label>
          <select id="q-locations" name="locations" defaultValue="">
            <option value="">Seçiniz</option>
            {options.locations.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="q-target">Ne Zaman Başlamak İstersiniz?</label>
        <select id="q-target" name="target" defaultValue="">
          <option value="">Seçiniz</option>
          {options.targets.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <fieldset className="quote-services">
        <legend>İlgilendiğiniz Hizmetler</legend>
        {options.services.map((o, i) => (
          <label className="quote-chip" key={o}>
            <input type="checkbox" name="services" value={o} defaultChecked={i === 0} /> <span>{o}</span>
          </label>
        ))}
      </fieldset>
      <div className="form-field">
        <label htmlFor="q-msg">Notunuz (isteğe bağlı)</label>
        <textarea id="q-msg" name="message" rows={3} />
      </div>
      {/* Honeypot — hidden from people, bots fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999 }}>
        <label>
          Web sitesi
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="quote-actions">
        <button className="btn btn-primary btn-lg" type="submit" aria-disabled={status === "sending"}>
          {status === "sending" ? "Gönderiliyor…" : "Teklif İste"}
        </button>
        <button className="btn btn-ghost btn-lg" type="button" onClick={onWhatsApp}>
          WhatsApp ile Gönder
        </button>
      </div>
      <p role="status" aria-live="polite" className="form-note">
        {status === "sent" && "Talebiniz alındı. Aynı gün içinde size dönüş yapacağız."}
        {status === "wa" &&
          "Talebiniz e-postayla iletilemedi. Bilgileriniz hazır: WhatsApp ile göndermek için aşağıdaki düğmeye basın."}
      </p>
      {status === "wa" && waHref && (
        <div className="form-fallback">
          <a ref={fallbackRef} className="btn btn-primary" href={waHref} target="_blank" rel="noopener">
            WhatsApp ile Gönder
            <span className="visually-hidden"> (yeni sekmede açılır)</span>
          </a>
        </div>
      )}
      <p className="form-note">
        Paylaştığınız bilgiler yalnızca teklif hazırlamak için,{" "}
        <Link href="/kvkk-aydinlatma-metni/">KVKK Aydınlatma Metni</Link> kapsamında işlenir.
      </p>
    </form>
  );
}
