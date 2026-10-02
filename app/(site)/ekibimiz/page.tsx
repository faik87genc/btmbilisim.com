import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, Mail } from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { PageHero } from "@/components/ensa/PageHero";
import { team } from "@/lib/data/trust";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/siteView";

// Live only once lib/data/trust.ts lists team members (with their consent).

export const metadata: Metadata = {
  title: `Ekibimiz${site.titleSuffix}`,
  description: "Siber güvenlik, ağ, sunucu, bulut ve yazılım alanlarında çalışan BTM Bilişim ekibi.",
  alternates: { canonical: absoluteUrl("/ekibimiz/") },
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("tr");
}

export default function TeamPage() {
  if (team.length === 0) notFound();
  return (
    <>
      <PageHero
        title="Ekibimiz"
        eyebrow="Uzman Kadro"
        lead="Siber güvenlik, ağ, sunucu, bulut ve yazılım alanlarında her proje için doğru yetkinlikleri bir araya getiriyoruz."
        crumbs={[{ text: "Hakkımızda", href: "/hakkimizda/" }, { text: "Ekibimiz" }]}
      />
      <section className="bg-paper-50 py-14 md:py-20">
        <Container className="lg:max-w-6xl">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li key={m.name} className="flex flex-col rounded-2xl border border-navy-950/10 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(7,43,85,0.35)]">
                <div className="flex items-center gap-4">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name} className="h-16 w-16 rounded-full object-cover" loading="lazy" />
                  ) : (
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy-800 font-display text-lg font-bold text-white">
                      {initials(m.name)}
                    </span>
                  )}
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink-900">{m.name}</h2>
                    <p className="text-sm font-semibold text-gold-700">{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">{m.bio}</p>
                {(m.email || m.linkedin) && (
                  <div className="mt-5 flex gap-3 border-t border-navy-950/10 pt-4 text-sm">
                    {m.email && (
                      <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 text-navy-800 hover:text-gold-700">
                        <Mail className="h-4 w-4" aria-hidden="true" /> E-posta
                      </a>
                    )}
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-navy-800 hover:text-gold-700">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" /> LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
