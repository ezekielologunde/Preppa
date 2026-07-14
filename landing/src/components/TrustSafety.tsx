import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

const PILLARS = [
  {
    icon: "shield" as const,
    title: "Verified identity",
    body: "Every cook is ID-verified before their payouts go live. You see real names, real kitchens.",
    tag: "ID-verified before payout",
  },
  {
    icon: "card" as const,
    title: "Secure payments",
    body: "Preppa is the merchant of record. You pay us through Stripe; we pay the cook. Tips are 100% theirs.",
    tag: "Powered by Stripe",
  },
  {
    icon: "chat" as const,
    title: "Live tracking & messaging",
    body: "Follow your order status in real time and message your cook directly — no guessing, no waiting.",
    tag: "Real-time updates",
  },
];

export function TrustSafety() {
  return (
    <section id="safety" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal className="mb-14 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" />
            Trust &amp; safety
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight leading-tight">
            Safety isn&rsquo;t a feature. <span className="font-light text-ink-soft">It&rsquo;s the whole point.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="bg-surface rounded-3xl border border-line-2 p-7 h-full">
                <span className="w-11 h-11 rounded-2xl bg-orange-soft text-orange flex items-center justify-center mb-5">
                  <Icon name={p.icon} size={20} />
                </span>
                <h3 className="text-lg font-extrabold mb-2">{p.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed mb-4">{p.body}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green">
                  <Icon name="check" size={13} /> {p.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
