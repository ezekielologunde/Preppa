import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

export function MealPlans() {
  return (
    <section id="plans" className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-purple" />
            Weekly meal plans
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight leading-tight mb-5">
            Never wonder <span className="font-light text-ink-soft">what&rsquo;s for dinner</span>
          </h2>
          <p className="text-lg text-ink-2 leading-relaxed mb-8 max-w-lg">
            Subscribe to a cook&rsquo;s weekly plan and get fresh meals delivered on your
            schedule. Pick your meals, skip a week, or cancel anytime — you&rsquo;re always in
            control.
          </p>
          <ul className="space-y-3 mb-8">
            {["Choose your own meals each week", "Skip, pause, or cancel anytime", "Billed per delivery, not a lump sum"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm font-semibold text-ink-2">
                <span className="w-6 h-6 rounded-full bg-green-soft text-green flex items-center justify-center shrink-0">
                  <Icon name="check" size={13} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <a
            href="https://app.preppa.live/plans"
            className="inline-flex items-center gap-2 bg-ink text-white font-bold px-6 h-13 rounded-full transition-transform hover:-translate-y-0.5"
          >
            Browse meal plans <Icon name="chevRight" size={16} />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[28px] border border-line-2 bg-bg p-6 max-w-sm mx-auto shadow-[0_10px_24px_rgba(23,21,15,.08)]">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-11 h-11 rounded-2xl bg-purple-soft text-purple flex items-center justify-center">
                <Icon name="repeat" size={20} />
              </span>
              <div>
                <h4 className="font-extrabold">Amara&rsquo;s Weekly Box</h4>
                <p className="text-xs text-ink-soft">5 meals/week · pause or swap anytime</p>
              </div>
            </div>
            {["Mon · Jollof & grilled chicken", "Wed · Peanut stew & rice", "Fri · Suya-spiced veggie bowl"].map((m) => (
              <div key={m} className="flex items-center justify-between py-3 border-t border-line text-sm">
                <span className="font-semibold">{m}</span>
                <Icon name="check" size={16} className="text-green" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
