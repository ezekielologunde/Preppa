"use client";

import { Icon } from "./Icon";
import { Ticket } from "./Ticket";
import { FadeUp } from "./FadeUp";

const STEPS = [
  { icon: "search" as const, title: "Browse nearby", body: "See real menus from cooks in your area." },
  { icon: "card" as const, title: "Order & pay", body: "Secure checkout, no cash, no guesswork." },
  { icon: "heart" as const, title: "Eat & reorder", body: "Message your cook, rate it, order again." },
];

export function HowItWorks() {
  return (
    <section className="bg-panel py-20 md:py-28 border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp as="h2" className="font-display font-bold text-[clamp(28px,5vw,44px)] leading-tight text-ink">
          Three steps. That&rsquo;s it.
        </FadeUp>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <FadeUp key={s.title} delay={0.1 * i} y={16} className="relative">
              <Ticket className="p-6 h-full">
                <span className="font-display font-bold text-orange text-4xl leading-none">{i + 1}</span>
                <span className="w-11 h-11 rounded-xl bg-orange-soft text-orange flex items-center justify-center my-4">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className="font-extrabold text-lg text-ink mb-1.5">{s.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed">{s.body}</p>
              </Ticket>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
