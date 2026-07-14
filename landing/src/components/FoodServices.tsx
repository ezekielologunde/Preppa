import { Reveal } from "./Reveal";
import { Icon } from "./Icon";

const SERVICES = [
  { title: "Private dinner", body: "A hosted dinner for your table, cooked in your kitchen." },
  { title: "Catering", body: "Food for your event or party, drop-off or fully staffed." },
  { title: "Cooking class", body: "Learn a dish hands-on from a local cook." },
];

export function FoodServices() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" />
            Book a cook
          </span>
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight leading-tight">
            For your next <span className="font-light text-ink-soft">event or dinner party</span>
          </h2>
          <p className="text-lg text-ink-2 mt-4">
            Request a quote, chat with the cook, and pay a deposit through Preppa — the balance
            settles directly with your cook.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="bg-surface rounded-3xl border border-line-2 p-7 h-full transition-all hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(23,21,15,.08)]">
                <span className="w-11 h-11 rounded-2xl bg-orange text-white flex items-center justify-center mb-5">
                  <Icon name="chefhat" size={20} />
                </span>
                <h3 className="text-lg font-extrabold mb-2">{s.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-10">
          <a
            href="https://app.preppa.live/service-request"
            className="inline-flex items-center gap-2 border border-line-2 bg-white font-bold px-6 h-13 rounded-full transition-transform hover:-translate-y-0.5"
          >
            Get a quote <Icon name="chevRight" size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
