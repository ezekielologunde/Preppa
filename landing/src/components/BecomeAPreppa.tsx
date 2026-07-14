import { Icon } from "./Icon";
import { Ticket } from "./Ticket";
import { FadeUp } from "./FadeUp";

const PERKS = [
  { icon: "repeat" as const, title: "Subscribers, not one-off orders", body: "Customers can subscribe to your weekly menu — recurring, not a single sale you re-chase every time." },
  { icon: "chefhat" as const, title: "Your brand, your menu, your hours", body: "You set your prices and your schedule. Preppa is the storefront, not the boss." },
  { icon: "card" as const, title: "Stripe-secured payouts", body: "Get paid directly to your bank account — no cash, no chasing Venmo requests." },
];

export function BecomeAPreppa() {
  return (
    <section className="bg-surface py-20 md:py-28 border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <FadeUp as="span" className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-orange bg-orange-soft border border-orange/20 rounded-full px-3.5 py-1.5 mb-5">
            For Preppas
          </FadeUp>
          <FadeUp as="h2" delay={0.06} className="font-display font-bold text-[clamp(28px,5vw,42px)] leading-tight text-ink">
            You&rsquo;re already cooking. Run it from one place.
          </FadeUp>
          <FadeUp delay={0.12} className="mt-4 max-w-md text-ink-2 leading-relaxed">
            Turn your home cooking into a real, recurring business — without doing it out of
            Instagram DMs and Cash App requests.
          </FadeUp>
          <FadeUp delay={0.18} className="mt-8">
            <a
              href="https://app.preppa.live/apply"
              className="inline-flex items-center gap-2 bg-ink text-white font-bold px-7 h-14 rounded-2xl transition-all hover:-translate-y-0.5"
            >
              Apply as a Preppa <Icon name="arrowUpRight" size={16} />
            </a>
          </FadeUp>
        </div>

        <div className="flex flex-col gap-4">
          {PERKS.map((p, i) => (
            <FadeUp key={p.title} delay={0.06 * i} y={12}>
              <Ticket className="p-5 flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl bg-orange-soft text-orange flex items-center justify-center shrink-0">
                  <Icon name={p.icon} size={19} />
                </span>
                <div>
                  <h3 className="font-extrabold text-ink mb-1">{p.title}</h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{p.body}</p>
                </div>
              </Ticket>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
