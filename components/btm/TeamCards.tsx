import { ExternalLink, Mail } from "lucide-react";
import type { TeamMember } from "@/lib/data/trust";

// Team cards (initials avatar, role, short bio, expertise tags) — used on
// /ekibimiz/ and in the about page.

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("tr");
}

export function TeamCards({ members, headingLevel = 2 }: { members: TeamMember[]; headingLevel?: 2 | 3 }) {
  const Name = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {members.map((m) => (
        <li key={m.name} className="card flex flex-col p-6 md:p-8">
          {m.label && <p className="eyebrow">{m.label}</p>}
          <div className="mt-3 flex items-center gap-4">
            {m.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.photo} alt={m.name} className="h-20 w-20 shrink-0 rounded-card object-cover" loading="lazy" />
            ) : (
              <span
                className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-card bg-gold-100 font-display text-xl font-bold text-gold-700"
                aria-hidden="true"
              >
                {initials(m.name)}
              </span>
            )}
            <div>
              <Name className="font-display text-[1.375rem] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-950">{m.name}</Name>
              <p className="mt-0.5 text-sm font-semibold text-gold-700">{m.role}</p>
            </div>
          </div>
          <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-slate-500">{m.bio}</p>
          {m.tags && m.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Uzmanlık alanları">
              {m.tags.map((t) => (
                <li key={t} className="rounded-md bg-paper-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-line">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {(m.email || m.linkedin) && (
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-sm">
              {m.email && (
                <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 font-semibold text-gold-700 hover:text-gold-800">
                  <Mail className="h-4 w-4" aria-hidden="true" /> {m.email}
                </a>
              )}
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-gold-700 hover:text-gold-800"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" /> LinkedIn<span className="visually-hidden"> (yeni sekmede açılır)</span>
                </a>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
