import { FadeUp } from "./FadeUp";

/** Real numbers only — pulled from production, not the inflated placeholder stats
 * (180,000+ meals, 2,400+ cooks, 12 cities) a much earlier draft of this page had. */
const STATS = [
  { num: "8", label: "verified local cooks" },
  { num: "6", label: "cuisines represented" },
  { num: "1", label: "city live — more soon" },
];

export function Stats() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
        {STATS.map((s, i) => (
          <FadeUp key={s.label} delay={0.05 * i} className="flex flex-col items-center gap-1">
            <span className="font-display font-extrabold text-[32px] text-ink leading-none">{s.num}</span>
            <span className="text-[12.5px] font-semibold text-ink-soft">{s.label}</span>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
