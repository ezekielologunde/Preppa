import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

const STEPS = [
  {
    icon: "chat" as const,
    label: "STEP 01",
    title: "Discover cooks",
    body: "Browse local Preppas and fresh meal drops near you, or subscribe to a weekly plan.",
  },
  {
    icon: "card" as const,
    label: "STEP 02",
    title: "Order securely",
    body: "Pay by card through Stripe — Preppa is the merchant of record, so your payment is handled, not passed hand-to-hand.",
  },
  {
    icon: "repeat" as const,
    label: "STEP 03",
    title: "Eat & re-order",
    body: "Track your order live, message your cook directly, and leave a review when it lands.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" />
            How Preppa works
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight leading-tight">
            From your craving to a <span className="font-light text-ink-soft">home-cooked plate</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="bg-bg rounded-3xl border border-line-2 p-7 h-full">
                <span className="w-11 h-11 rounded-2xl bg-orange-soft text-orange flex items-center justify-center mb-5">
                  <Icon name={s.icon} size={20} />
                </span>
                <div className="text-[11px] font-bold text-ink-soft tracking-wider mb-1">{s.label}</div>
                <h3 className="text-lg font-extrabold mb-2">{s.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
