import { MotionReveal } from "./MotionReveal";

// The one section heading (identity v2): eyebrow → H2 → lead. Eyebrow 12px
// caps in brand blue, H2 28→40px Plus Jakarta Sans, lead 17px muted.
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
    <MotionReveal className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${isDark ? "eyebrow-dark" : ""}`}>{eyebrow}</p>}
      <h2
        className={`text-balance font-display text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[2.125rem] ${
          isDark ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-pretty text-base leading-[1.65] ${isDark ? "text-slate-300" : "text-slate-500"}`}
        >
          {description}
        </p>
      )}
    </MotionReveal>
  );
}
