"use client";

import { useState } from "react";

// Google Maps embed loaded only on click: the iframe sends the visitor's IP
// and browser data to Google (abroad), so it must not load without consent.
// Until then a placeholder offers the map and a plain "open in Maps" link.

type Props = { query: string };

export function ConsentMap({ query }: Props) {
  const [show, setShow] = useState(false);
  const q = encodeURIComponent(query);

  if (show) {
    return (
      <iframe
        title="Konum haritası"
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        width="100%"
        height={280}
        style={{ border: 0, display: "block" }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="map-consent">
      <p>
        Harita Google Haritalar üzerinden yüklenir; bu sırada IP adresiniz Google&apos;a iletilir.
      </p>
      <div className="map-consent-actions">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShow(true)}>
          Haritayı Yükle
        </button>
        <a
          className="btn btn-ghost btn-sm"
          href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          target="_blank"
          rel="noopener"
        >
          Google Haritalar&apos;da Aç<span className="visually-hidden"> (yeni sekmede açılır)</span>
        </a>
      </div>
    </div>
  );
}
