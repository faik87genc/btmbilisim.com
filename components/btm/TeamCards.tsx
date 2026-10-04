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
        <li key={m.name} className="flex flex-col rounded-card border border-navy-950/10 bg-white p-6 shadow-card md:p-7">
          {m.label && <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-800">{m.label}</p>}
          <div className="mt-3 flex items-center gap-4">
            {m.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.photo} alt={m.name} className="h-16 w-16 rounded-full object-cover" loading="lazy" />
            ) : (
              <span
                className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-800 font-display text-lg font-bold text-white"
                aria-hidden="true"
              >
                {initials(m.name)}
              </span>
            )}
            <div>
              <Name className="font-display text-xl font-semibold text-ink-900">{m.name}</Name>
              <p className="mt-0.5 text-sm font-semibold text-navy-700">{m.role}</p>
            </div>
          </div>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{m.bio}</p>
          {m.tags && m.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Uzmanlık alanları">
              {m.tags.map((t) => (
                <li key={t} className="rounded-control bg-paper-50 px-2.5 py-1 text-xs font-medium text-navy-800 ring-1 ring-navy-950/10">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {(m.email || m.linkedin) && (
            <div className="mt-5 flex gap-4 border-t border-navy-950/10 pt-4 text-sm">
              {m.email && (
                <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-navy-700">
                  <Mail className="h-4 w-4" aria-hidden="true" /> {m.email}
                </a>
              )}
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-navy-700"
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
