"use client";

import { useCallback, useState, type FormEvent } from "react";

// Persistent, per-field error text for the site's forms (WCAG 3.3.1). The
// browser's own validation bubble still appears, but it disappears quickly,
// so each invalid field also gets `aria-invalid` and a visible message under
// it that is linked with `aria-describedby`. Same messages as
// _legacy-static-site/assets/js/main.js.

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function fieldErrorMessage(el: Field): string {
  const v = el.validity;
  if (v.valueMissing) return "Bu alanın doldurulması zorunludur.";
  if (v.typeMismatch && el.type === "email") return "Geçerli bir e-posta adresi girin (ör. ad@firma.com).";
  if (v.tooShort && "minLength" in el) return `En az ${el.minLength} karakter girin.`;
  return el.validationMessage || "Lütfen bu alanı kontrol edin.";
}

function isField(t: EventTarget | null): t is Field {
  return t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement;
}

export function useFieldErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // `invalid` does not bubble; React's onInvalidCapture on the <form> sees it.
  const onInvalidCapture = useCallback((e: FormEvent<HTMLFormElement>) => {
    const el = e.target;
    if (!isField(el) || !el.id) return;
    const msg = fieldErrorMessage(el);
    setErrors((prev) => (prev[el.id] === msg ? prev : { ...prev, [el.id]: msg }));
  }, []);

  const onInputCapture = useCallback((e: FormEvent<HTMLFormElement>) => {
    const el = e.target;
    if (!isField(el) || !el.id || !el.validity.valid) return;
    setErrors((prev) => {
      if (!(el.id in prev)) return prev;
      const next = { ...prev };
      delete next[el.id];
      return next;
    });
  }, []);

  /** Props for a validated control: aria-invalid + aria-describedby. */
  const fieldProps = (id: string) => ({
    "aria-invalid": errors[id] ? (true as const) : undefined,
    "aria-describedby": errors[id] ? `${id}-err` : undefined,
  });

  const clear = useCallback(() => setErrors({}), []);

  return { errors, onInvalidCapture, onInputCapture, fieldProps, clear };
}

/** Visible error text under a field; rendered only while the field is invalid. */
export function FieldError({ id, errors }: { id: string; errors: Record<string, string> }) {
  if (!errors[id]) return null;
  return (
    <p id={`${id}-err`} className="field-err">
      {errors[id]}
    </p>
  );
}

/** Legend for the asterisk on required labels (WCAG 3.3.2). */
export function RequiredNote() {
  return (
    <p className="form-note req-note">
      <span aria-hidden="true">*</span> ile işaretli alanların doldurulması zorunludur.
    </p>
  );
}

/** Asterisk after a required label; screen readers already hear "zorunlu" from `required`. */
export function Req() {
  return <span aria-hidden="true"> *</span>;
}
