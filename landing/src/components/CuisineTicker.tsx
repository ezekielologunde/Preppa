// The actual cuisines of Preppa's 8 verified kitchens today — not a generic list.
const WORDS = ["WEST AFRICAN", "SOUL FOOD", "OAXACAN", "HALAL & DESI", "ITALIAN COMFORT", "HEALTHY & SEAFOOD"];

/** Scrolling marquee of real cuisine categories, not a fabricated stat. Duplicated
 * once so the translateX(-50%) loop is seamless; paused under prefers-reduced-motion
 * (see .marquee-track in globals.css). */
export function CuisineTicker() {
  const items = [...WORDS, ...WORDS];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line bg-card-2 py-3">
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-bold tracking-wide text-ink-2">
            {w} <span className="text-orange">🔥</span>
          </span>
        ))}
      </div>
    </div>
  );
}
