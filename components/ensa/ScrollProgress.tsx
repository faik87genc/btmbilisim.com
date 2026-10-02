/**
 * Reading-progress bar. Zero JavaScript — the fill is driven by a pure-CSS
 * scroll-timeline animation (see `.scroll-progress` in globals.css) and is
 * hidden where that isn't supported or when reduced motion is requested.
 */
export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}
