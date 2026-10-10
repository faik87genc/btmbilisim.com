import type { CompanyFact } from "@/lib/data/trust";

type Fact = Pick<CompanyFact, "value" | "label">;

// A spec-sheet row of plain facts: value over label, thin dividers, static
// numbers (no count-up — the proof is clarity, not motion). Four columns from
// md up, 2×2 on phones. Data comes from lib/data/trust.ts → companyFacts.
export function StatRow({ facts, tone = "dark" }: { facts: Fact[]; tone?: "dark" | "light" }) {
  const isDark = tone === "dark";
  return (
    <dl
      className={`grid grid-cols-2 gap-y-px md:grid-cols-4 md:divide-x ${isDark ? "divide-white/10" : "divide-line"}`}
    >
      {facts.map((f) => (
        <div key={f.label} className="flex flex-col-reverse px-3 py-6 text-center md:px-6 md:py-9">
          <dt className={`mt-2 text-sm leading-snug ${isDark ? "text-slate-300" : "text-slate-500"}`}>{f.label}</dt>
          <dd
            className={`font-display text-[1.75rem] font-semibold leading-none tracking-[-0.025em] tabular-nums sm:text-[2rem] md:text-[2.125rem] ${
              isDark ? "text-white" : "text-navy-950"
            }`}
          >
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
