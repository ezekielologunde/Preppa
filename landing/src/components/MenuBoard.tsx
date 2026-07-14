"use client";

import { Icon } from "./Icon";
import { Ticket } from "./Ticket";
import { FadeUp } from "./FadeUp";

const SERVICES = [
  { key: "prep", label: "Weekly Meal Prep", icon: "clock" as const, body: "Ready-to-eat meals for your week.", href: "https://app.preppa.live/discover" },
  { key: "plans", label: "Meal Plans", icon: "repeat" as const, body: "Subscribe to a cook's menu. Pause or cancel anytime.", href: "https://app.preppa.live/plans" },
  { key: "local", label: "Local Meals", icon: "chefhat" as const, body: "Fresh dishes from verified cooks nearby.", href: "https://app.preppa.live/discover" },
  { key: "home", label: "Cook at Your Home", icon: "home" as const, body: "Book a Prepper to cook in your kitchen.", href: "https://app.preppa.live/service-request" },
  { key: "catering", label: "Catering", icon: "users" as const, body: "Food for your event, drop-off or staffed.", href: "https://app.preppa.live/service-request" },
  { key: "experiences", label: "Experiences", icon: "spark" as const, body: "Cooking classes and private dining.", href: "https://app.preppa.live/discover" },
];

export function MenuBoard() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp as="h2" className="font-display font-bold text-[clamp(28px,5vw,44px)] leading-tight text-ink">
          On the board today
        </FadeUp>
        <FadeUp delay={0.1} className="mt-3 max-w-md text-ink-2">
          Six ways to eat well without cooking, delivered by real people in your neighborhood.
        </FadeUp>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.key} delay={0.05 * i} y={16}>
              <Ticket className="p-5 h-full">
                <span className="w-11 h-11 rounded-xl bg-orange-soft text-orange flex items-center justify-center mb-4">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className="font-extrabold text-lg text-ink mb-1.5">{s.label}</h3>
                <p className="text-sm text-ink-2 leading-relaxed mb-4">{s.body}</p>
                <a href={s.href} className="inline-flex items-center gap-1.5 text-sm font-bold text-orange">
                  Explore <Icon name="chevRight" size={14} />
                </a>
              </Ticket>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
