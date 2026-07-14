import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

/** Real cuisines actually being cooked on Preppa today — no invented names, bios, or order
 * counts. (The design mockup's "meet 3 cooks" personas were fabricated; we don't yet have a
 * public roster of cooks who've consented to being featured, so this stays honest and general.) */
const FEATURED = [
  { cuisine: "West African", gradient: "from-orange-soft to-purple-soft", rotate: "-rotate-[2.4deg]" },
  { cuisine: "Soul food", gradient: "from-purple-soft to-orange-soft", rotate: "rotate-[2deg]" },
  { cuisine: "Oaxacan", gradient: "from-green-soft to-orange-soft", rotate: "-rotate-[1.5deg]" },
];

const MORE_CUISINES = ["Halal & Desi", "Italian comfort", "Healthy & seafood"];

export function MeetPreppas() {
  return (
    <section id="preppas" className="py-24 md:py-32 bg-surface overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-4 justify-center">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" />
            Meet the Preppas
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight leading-tight max-w-2xl mx-auto">
            Real people, <span className="font-light text-ink-soft">cooking real food</span> in
            their own kitchens
          </h2>
          <p className="text-lg text-ink-2 mt-4 max-w-lg mx-auto">
            Behind every plate is an ID-verified neighbor who loves to cook — already serving
            these cuisines in our founding cohort.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-5 mt-14">
          {FEATURED.map((f) => (
            <div
              key={f.cuisine}
              className={`relative w-full max-w-[220px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_10px_24px_rgba(23,21,15,.08),0_30px_70px_rgba(23,21,15,.12)] bg-gradient-to-br ${f.gradient} transition-transform duration-300 ${f.rotate} hover:rotate-0 hover:-translate-y-1.5 hover:z-10`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute left-3 right-3 bottom-3 text-left text-white">
                <b className="text-[14px] flex items-center gap-1.5">
                  {f.cuisine} <Icon name="shield" size={14} />
                </b>
                <span className="text-[11.5px] opacity-85">Founding cohort · Atlanta, GA</span>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="flex flex-wrap justify-center gap-3 mt-8">
          {MORE_CUISINES.map((c) => (
            <span key={c} className="px-5 py-2.5 rounded-full bg-bg border border-line-2 text-sm font-bold">
              {c}
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.3} className="flex flex-wrap justify-center gap-4 mt-10">
          <a
            href="https://app.preppa.live/apply"
            className="bg-ink text-white font-bold px-6 h-13 rounded-full flex items-center transition-transform hover:-translate-y-0.5"
          >
            Become a Preppa
          </a>
          <a
            href="#preppas-earn"
            className="border border-line-2 bg-white font-bold px-6 h-13 rounded-full flex items-center transition-transform hover:-translate-y-0.5"
          >
            See how earnings work
          </a>
        </Reveal>
      </div>
    </section>
  );
}
