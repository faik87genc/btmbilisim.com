import { serviceCategoryList } from "@/lib/services";

const items = [...serviceCategoryList.map((c) => c.shortTitle), "Yazılım Ürünlerimiz"];

export function ServiceTicker() {
  const track = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-y border-paper-50/10 bg-navy-900 py-3"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max animate-[marquee_32s_linear_infinite] motion-reduce:animate-none">
        {track.map((label, i) => (
          <div key={i} className="flex shrink-0 items-center gap-3 px-4">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-300">
              {label}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
