import { BadgeCheck, CalendarClock, Headphones, Scale } from "lucide-react";
import { Container } from "./Container";

// Trust strip under every service page body: the four facts that set BTM apart
// (all confirmed by the owner — no invented numbers).
const ITEMS = [
  { icon: CalendarClock, title: "2010'dan beri sahada", text: "Danışmanlığını yaptığımız projeleri kendi ekibimizle kurar ve yönetiriz." },
  { icon: BadgeCheck, title: "ISO 27001 baş denetçi deneyimi", text: "Her kurulum bilgi güvenliği ve KVKK gereksinimleriyle birlikte planlanır." },
  { icon: Scale, title: "Satıcıdan bağımsız", text: "Tüm önde gelen markalarla çalışır, ihtiyaca ve bütçeye göre öneririz." },
  { icon: Headphones, title: "7/24 teknik destek", text: "Kurulumdan sonra da izleme, bakım ve hızlı müdahaleyle yanınızdayız." },
];

export function WhyBtm() {
  return (
    <section className="border-t border-navy-950/10 bg-white py-14 md:py-16">
      <Container>
        <h2 className="font-display text-2xl font-semibold text-navy-800 md:text-3xl">Neden BTM Bilişim?</h2>
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <li key={it.title} className="rounded-card border border-navy-950/10 bg-paper-50 p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-control bg-navy-800 text-white">
                <it.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink-900">{it.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{it.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
