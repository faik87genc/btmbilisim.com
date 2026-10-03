import { MotionReveal } from "./MotionReveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const isDark = tone === "dark";
  const isCenter = align === "center";

  return (
    <MotionReveal
      className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <div
          className={`mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] ${
            isCenter ? "justify-center" : ""
          } ${isDark ? "text-gold-300" : "text-gold-800"}`}
        >
          <span
            className={`h-px w-8 ${isDark ? "bg-gold-300" : "bg-gold-500"}`}
          />
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-[2.75rem] ${
          isDark ? "text-white" : "text-navy-800"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-balance text-base leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      )}
    </MotionReveal>
  );
}
