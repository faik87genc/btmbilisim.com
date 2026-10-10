import { useId } from "react";

// Hero corner motif (identity v2). The old orange-era globe outline is gone:
// this is a quiet engineering grid that fades out radially from the centre of
// its box, drawn in currentColor so callers keep setting the tone with a text
// colour class. Decorative only.
export function GlobeBands({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const lines = Array.from({ length: 13 }, (_, i) => 20 + i * 40);
  return (
    <svg viewBox="0 0 520 520" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`gb-fade-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`gb-mask-${id}`}>
          <rect width="520" height="520" fill={`url(#gb-fade-${id})`} />
        </mask>
      </defs>
      <g mask={`url(#gb-mask-${id})`} stroke="currentColor" strokeWidth="1">
        {lines.map((p) => (
          <line key={`h${p}`} x1="0" y1={p} x2="520" y2={p} opacity="0.5" />
        ))}
        {lines.map((p) => (
          <line key={`v${p}`} x1={p} y1="0" x2={p} y2="520" opacity="0.5" />
        ))}
        <rect x="180" y="180" width="160" height="160" strokeWidth="1.5" />
        <rect x="100" y="100" width="320" height="320" opacity="0.7" />
      </g>
    </svg>
  );
}
