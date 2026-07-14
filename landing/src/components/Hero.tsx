"use client";

import Image from "next/image";
import { Icon } from "./Icon";
import { FadeUp } from "./FadeUp";
import { CuisineTicker } from "./CuisineTicker";

const CUISINES = [
  { emoji: "🍚", name: "Nigerian", dishes: "Jollof · egusi · suya" },
  { emoji: "🍗", name: "Jamaican", dishes: "Jerk chicken · oxtail" },
  { emoji: "🌮", name: "Mexican", dishes: "Tacos · birria" },
];

/** Brings back the deep warm gradient + rounded friendly headline + lime accent from
 * the original pre-launch page, centered rather than left-aligned to match it. */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden rounded-b-[40px] md:rounded-b-[56px]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 0%, #8A3419 0%, #5C2211 45%, #2B140C 100%)",
        }}
      />
      <Image
        src="/hero-kitchen.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-[0.18] mix-blend-luminosity"
      />

      <div className="relative max-w-[720px] mx-auto px-6 pt-14 pb-14 md:pt-20 md:pb-16 text-center">
        <FadeUp
          as="span"
          delay={0}
          className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.18em] text-ink bg-black/25 border border-line rounded-full px-3.5 py-1.5 mb-7"
        >
          <span className="w-[6px] h-[6px] rounded-full bg-lime" />
          Meal Prep · Meal Plans · Local Cooks
        </FadeUp>

        <FadeUp as="h1" delay={0.08} className="font-display font-extrabold text-[clamp(38px,7vw,62px)] leading-[1.05] text-ink m-0">
          Real food.
          <br />
          Real local.
          <br />
          Real <span className="text-lime">Preppas.</span>
        </FadeUp>

        <FadeUp delay={0.2} className="mt-6 max-w-md mx-auto text-ink-2 text-[16px] leading-relaxed">
          Order fresh, home-cooked meals from real local cooks — affordable, on demand,
          actually good.
        </FadeUp>

        <FadeUp delay={0.3} className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://app.preppa.live/discover"
            className="bg-orange text-white font-bold px-7 h-13 rounded-full flex items-center gap-2 shadow-[0_10px_26px_rgba(242,107,29,.35)] transition-all hover:-translate-y-0.5"
            style={{ height: "3.25rem" }}
          >
            Find a Preppa <Icon name="arrowUpRight" size={16} />
          </a>
          <a
            href="https://app.preppa.live/apply"
            className="bg-white/10 text-ink font-bold px-7 rounded-full flex items-center gap-2 border border-line transition-all hover:-translate-y-0.5 hover:bg-white/15"
            style={{ height: "3.25rem" }}
          >
            <Icon name="chefhat" size={16} /> Become a Preppa
          </a>
        </FadeUp>

        <FadeUp delay={0.4} className="mt-3">
          <p className="text-[13px] font-bold uppercase tracking-wide text-ink-soft">
            Real cuisines. <span className="text-lime">Real cooks.</span>
          </p>
        </FadeUp>

        <FadeUp delay={0.48} className="mt-4 grid grid-cols-3 gap-3">
          {CUISINES.map((c) => (
            <div key={c.name} className="rounded-2xl bg-card-2/70 border border-line px-3 py-4 text-left">
              <span className="text-2xl">{c.emoji}</span>
              <p className="mt-2 font-bold text-sm text-ink">{c.name}</p>
              <p className="text-[11.5px] text-ink-soft leading-snug">{c.dishes}</p>
            </div>
          ))}
        </FadeUp>
      </div>

      <div className="relative">
        <CuisineTicker />
      </div>
    </section>
  );
}
