import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { PhoneMockup } from "./PhoneMockup";

type Step = { icon: Parameters<typeof Icon>[0]["name"]; label: string; title: string; body: string };

const STEPS_LEFT: Step[] = [
  {
    icon: "search" as const,
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
];

const STEPS_RIGHT: Step[] = [
  {
    icon: "repeat" as const,
    label: "STEP 03",
    title: "Eat & re-order",
    body: "Track your order live, message your cook directly, and leave a review when it lands.",
  },
];

const STATUS_STEPS = [
  { label: "Order confirmed", state: "done" as const },
  { label: "A local Preppa is cooking now", state: "active" as const },
  { label: "Out for delivery", state: "pending" as const },
];

function StepCard({ s }: { s: Step }) {
  return (
    <Reveal>
      <div className="bg-white rounded-2xl border border-line p-5 text-left shadow-[0_1px_2px_rgba(23,21,15,.05)] transition-all hover:-translate-y-1 hover:shadow-[0_2px_6px_rgba(23,21,15,.05),0_14px_34px_rgba(23,21,15,.07)] hover:border-line-2">
        <span className="w-11 h-11 rounded-full bg-orange-soft text-orange flex items-center justify-center mb-3">
          <Icon name={s.icon} size={20} />
        </span>
        <div className="text-[11px] font-extrabold text-orange tracking-wider mb-1">{s.label}</div>
        <h3 className="text-lg font-extrabold mb-1.5">{s.title}</h3>
        <p className="text-sm text-ink-2 leading-relaxed">{s.body}</p>
      </div>
    </Reveal>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-4 justify-center">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" />
            How Preppa works
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight leading-tight">
            From your craving to a <span className="font-light text-ink-soft">home-cooked plate</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div className="flex flex-col gap-6">
            {STEPS_LEFT.map((s) => (
              <StepCard key={s.title} s={s} />
            ))}
          </div>

          <Reveal delay={0.1} className="flex justify-center py-4">
            <PhoneMockup small>
              <div className="px-3.5 pt-1 pb-4 w-[206px]">
                <div className="flex items-center justify-between mb-2.5">
                  <b className="text-[13px]">Your order</b>
                  <span className="text-[10.5px] font-bold text-orange">Live</span>
                </div>
                <div className="rounded-2xl border border-line overflow-hidden mb-3.5">
                  <div className="h-[80px] bg-gradient-to-br from-orange-soft to-purple-soft" />
                  <div className="p-2.5">
                    <div className="flex items-center justify-between">
                      <b className="text-[12.5px]">Jollof &amp; grilled chicken</b>
                      <span className="font-extrabold text-[13px]">$13.00</span>
                    </div>
                    <div className="text-[10.5px] text-ink-soft mt-0.5">by a local Preppa</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  {STATUS_STEPS.map((s) => (
                    <div
                      key={s.label}
                      className={`flex items-center gap-2.5 ${s.state === "pending" ? "opacity-40" : ""}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          s.state === "done" ? "bg-green" : s.state === "active" ? "bg-orange" : "bg-surface-2"
                        }`}
                      >
                        {s.state === "done" ? (
                          <Icon name="check" size={13} className="text-white" />
                        ) : s.state === "active" ? (
                          <Icon name="chefhat" size={13} className="text-white" />
                        ) : (
                          <Icon name="pin" size={13} />
                        )}
                      </span>
                      <span className={`text-[11.5px] ${s.state === "active" ? "font-bold" : "font-semibold"}`}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </PhoneMockup>
          </Reveal>

          <div className="flex flex-col gap-6">
            {STEPS_RIGHT.map((s) => (
              <StepCard key={s.title} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
