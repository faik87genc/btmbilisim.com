export function ColumnMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 88"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 8H56"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 14H52"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {[14, 22, 30, 38, 46, 54].map((x) => (
        <path
          key={x}
          d={`M${x} 20V72`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={x === 14 || x === 54 ? 1 : 0.55}
        />
      ))}
      <path
        d="M6 80H58"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
