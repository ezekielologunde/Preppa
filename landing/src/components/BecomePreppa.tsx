import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

/** Cook-facing recruitment pitch. Framing verified against the real ledger logic: the
 * platform's service fee is charged to the BUYER, not deducted from the cook's payout — the
 * cook is credited the full listed price of what they sell, plus 100% of tips. This replaces
 * the mockup's invented "0% fees for 60 days" promo with something real and, honestly, a
 * stronger pitch. */
export function BecomePreppa() {
  return (
    <section id="preppas-earn" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" />
            For cooks
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight leading-tight mb-5">
            You set the price. <span className="font-light text-ink-soft">You keep it.</span>
          </h2>
          <p className="text-lg text-ink-2 leading-relaxed mb-8 max-w-lg">
            Preppa&rsquo;s service fee comes from the buyer&rsquo;s side, not out of your
            payout — you&rsquo;re credited the full price of what you sell, plus 100% of tips.
            Cash out to your bank anytime.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Full listed price credited to you, no platform cut",
              "100% of tips, always",
              "ID verification before payout, Stripe handles the rest",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm font-semibold text-ink-2">
                <span className="w-6 h-6 rounded-full bg-green-soft text-green flex items-center justify-center shrink-0">
                  <Icon name="check" size={13} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <a
            href="https://app.preppa.live"
            className="inline-flex items-center gap-2 bg-orange text-white font-bold px-6 h-13 rounded-full shadow-[0_10px_26px_rgba(242,107,29,.32)]"
          >
            Apply to become a Preppa <Icon name="chevRight" size={16} />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[28px] border border-line-2 bg-surface p-7 max-w-sm mx-auto">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">
              Order total example
            </span>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-2">Your menu price</span>
                <b>$20.00</b>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-2">Buyer&rsquo;s service fee (not yours)</span>
                <span className="text-ink-soft">+$2.00</span>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <span className="font-bold">You&rsquo;re credited</span>
                <b className="text-green">$20.00</b>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
