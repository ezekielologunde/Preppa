import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

export function WhyTrust() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="rounded-[28px] border border-line-2 bg-surface p-6 max-w-sm shadow-[0_10px_24px_rgba(23,21,15,.08)]">
            <div className="rounded-2xl bg-gradient-to-br from-orange-soft to-purple-soft aspect-[4/3] relative mb-4">
              <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 bg-white/90 rounded-full px-3 py-1.5 text-[11px] font-bold text-green">
                <Icon name="shield" size={12} /> Identity verified
              </span>
            </div>
            <h4 className="font-extrabold flex items-center gap-1.5">
              Amara O. <Icon name="shield" size={15} className="text-green" />
            </h4>
            <p className="text-xs text-ink-soft mt-1">West African home cook</p>
            <div className="flex gap-2 mt-4">
              <div className="flex-1 bg-green-soft rounded-xl px-3 py-2.5">
                <div className="text-green font-extrabold">ID</div>
                <div className="text-[10.5px] font-semibold text-ink-2">Verified</div>
              </div>
              <div className="flex-1 bg-surface-2 rounded-xl px-3 py-2.5">
                <div className="font-extrabold">Stripe</div>
                <div className="text-[10.5px] font-semibold text-ink-2">Payouts</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 bg-purple-soft rounded-xl px-3 py-2.5">
              <Icon name="card" size={16} className="text-purple" />
              <span className="text-[11.5px] font-semibold text-ink-2">
                Payments secured by Preppa &amp; Stripe
              </span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" />
            Why people trust us
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight leading-tight mb-5">
            Know exactly <span className="font-light text-ink-soft">who cooks your food</span> —
            and why it&rsquo;s safe
          </h2>
          <p className="text-lg text-ink-2 leading-relaxed mb-8 max-w-lg">
            Every Preppa is ID-verified before their payouts go live. Payments run through
            Preppa as the merchant of record via Stripe, so your money is handled — not passed
            hand-to-hand with a stranger.
          </p>
          <div className="flex flex-wrap gap-8">
            <div>
              <b className="text-2xl font-extrabold">100%</b>
              <p className="text-sm text-ink-soft">of tips go to the cook</p>
            </div>
            <div>
              <b className="text-2xl font-extrabold">0%</b>
              <p className="text-sm text-ink-soft">platform fee for PrepPlus members</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
