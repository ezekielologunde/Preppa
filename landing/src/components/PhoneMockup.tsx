import { Icon } from "./Icon";

/** A real demo of the actual discover screen — real verified-kitchen names and
 * cuisines pulled from production (no invented ratings, review counts, or prices;
 * we don't have that data honestly to show yet, so it's simply left off). */
const KITCHENS = [
  { name: "Amara's Kitchen", cuisine: "West African" },
  { name: "Denise's Soul Food", cuisine: "Soul food" },
  { name: "Cocina de Lucia", cuisine: "Oaxacan" },
  { name: "Maria's Kitchen", cuisine: "Italian comfort" },
];

const CHIPS = ["West African", "Soul food", "Oaxacan", "Halal & Desi"];

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] rounded-[36px] bg-ink p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,.35)]">
      <div className="rounded-[28px] overflow-hidden bg-bg">
        <div className="h-6 flex items-center justify-between px-4 text-[9px] font-bold text-ink">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        <div className="px-3.5 pt-1 pb-2.5 flex items-center justify-between">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-wide text-ink-soft">Showing</p>
            <p className="text-[12px] font-extrabold text-ink flex items-center gap-1">
              <Icon name="pin" size={9} className="text-orange" /> Atlanta, GA
            </p>
          </div>
          <div className="w-7 h-7 rounded-full bg-surface flex items-center justify-center">
            <Icon name="bag" size={12} />
          </div>
        </div>
        <div className="mx-3.5 mb-2.5 h-8 rounded-full bg-surface flex items-center gap-1.5 px-3 text-[10px] font-semibold text-ink-soft">
          <Icon name="search" size={10} /> Search cuisines, cooks…
        </div>
        <div className="flex gap-1.5 px-3.5 pb-2.5 overflow-hidden">
          {CHIPS.map((c, i) => (
            <span
              key={c}
              className={`shrink-0 h-6 px-2.5 rounded-full text-[8.5px] font-bold flex items-center ${
                i === 0 ? "bg-ink text-white" : "bg-surface text-ink-2"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="px-3.5 pb-3 grid grid-cols-2 gap-2">
          {KITCHENS.map((k, i) => (
            <div key={k.name} className="rounded-xl bg-surface p-2 border border-line">
              <div
                className="h-11 rounded-lg mb-1.5"
                style={{ background: ["#FFE4D0", "#E2F2EA", "#F1EAFE", "#FCE9DC"][i] }}
              />
              <p className="text-[9px] font-extrabold text-ink leading-tight truncate">{k.name}</p>
              <p className="text-[7.5px] font-semibold text-ink-soft truncate">{k.cuisine}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
