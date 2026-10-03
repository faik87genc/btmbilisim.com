import { ReactNode } from "react";

// Default width is max-w-6xl. A base (unprefixed) `max-w-*` in className
// replaces it instead of competing with it — utility order in the generated
// CSS, not class order, would otherwise decide which width wins.
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const hasWidth = /(^|\s)max-w-/.test(className);
  return (
    <div className={`mx-auto w-full px-6 md:px-10 ${hasWidth ? "" : "max-w-6xl"} ${className}`}>
      {children}
    </div>
  );
}
