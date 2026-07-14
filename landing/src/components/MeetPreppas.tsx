import { Reveal } from "./Reveal";

/** Real cuisines actually being cooked on Preppa today — no invented names, bios, or order
 * counts. (The design mockup's "meet 3 cooks" personas were fabricated; we don't yet have a
 * public roster of cooks who've consented to being featured, so this stays honest and general.) */
const CUISINES = [
  "West African",
  "Soul food",
  "Oaxacan",
  "Halal & Desi",
  "Italian comfort",
  "Healthy & seafood",
];

export function MeetPreppas() {
  return (
    <section id="preppas" className="py-24 md:py-32 bg-surface">
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
        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-3 mt-10">
          {CUISINES.map((c) => (
            <span
              key={c}
              className="px-5 py-2.5 rounded-full bg-bg border border-line-2 text-sm font-bold"
            >
              {c}
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.2} className="flex flex-wrap justify-center gap-4 mt-10">
          <a href="https://app.preppa.live/apply" className="bg-ink text-white font-bold px-6 h-13 rounded-full flex items-center">
            Become a Preppa
          </a>
          <a href="#preppas-earn" className="border border-line-2 font-bold px-6 h-13 rounded-full flex items-center">
            See how earnings work
          </a>
        </Reveal>
      </div>
    </section>
  );
}
