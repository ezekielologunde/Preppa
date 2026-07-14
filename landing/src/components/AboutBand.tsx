const OFFERS = [
  { t: "Weekly meal prep", d: "Ready-to-eat meals, dropped on your schedule." },
  { t: "Meal plans", d: "Subscribe to a cook's menu. Skip or cancel anytime." },
  { t: "Catering & events", d: "Feed a crowd, drop-off or fully staffed." },
  { t: "Cook at your home", d: "Book a Prepper to cook in your kitchen." },
];

/** Contrast band after the orange hero — warm paper, ink type. The pitch is one bold
 * typographic statement (not a stack of identical icon cards), then a plain 2-column
 * run of what Preppa offers, then the honest secondary CTA for cooks (to help, not
 * the app). Rendered visible by default — the hero owns the one motion moment; this
 * section must never depend on a scroll-reveal to be seen. */
export function AboutBand() {
  return (
    <section className="bg-paper text-ink">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.025em] text-balance text-[clamp(30px,5.2vw,56px)] max-w-[16ch]">
          Not a restaurant. Not a delivery app.{" "}
          <span className="text-orange">Your neighbors, cooking.</span>
        </h2>

        <p className="mt-6 max-w-[38rem] text-[17px] md:text-[18px] leading-relaxed text-ink-2">
          Preppa is where verified local cooks sell the food they&rsquo;d make for their own
          family. You get real homemade meals from someone down the street; they get a real
          business — with secure payments and none of the chains in the middle.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-7 max-w-[46rem]">
          {OFFERS.map((o) => (
            <div key={o.t} className="border-t-2 border-line pt-4">
              <h3 className="font-display font-extrabold text-[19px] tracking-tight">{o.t}</h3>
              <p className="mt-1 text-[14.5px] text-ink-soft leading-relaxed">{o.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-[17px] font-bold">
          <span>You cook?</span>
          <a
            href="https://help.preppa.live/guides/post-your-first-meal"
            className="text-orange underline decoration-2 underline-offset-4 hover:text-orange-deep transition-colors"
          >
            Start selling your food on Preppa →
          </a>
        </p>
      </div>
    </section>
  );
}
