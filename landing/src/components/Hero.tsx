"use client";

import { Icon } from "./Icon";
import { FadeUp } from "./FadeUp";
import { PhoneMockup } from "./PhoneMockup";

const TRUST = [
  { icon: "shield" as const, label: "ID-verified cooks" },
  { icon: "card" as const, label: "Secure payments" },
  { icon: "chat" as const, label: "Message your cook directly" },
];

/** Bright, white, orange-accented — per direct feedback that the dark warm-gradient
 * direction read as "not bright." The phone mockup shows the real discover screen
 * with real verified-kitchen names, not an invented UI. */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgba(242,107,29,.08), transparent 60%), radial-gradient(50% 40% at 100% 30%, rgba(124,58,237,.05), transparent 65%)",
        }}
      />
      <div className="relative max-w-[1200px] mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <FadeUp
            as="span"
            delay={0}
            className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-orange bg-orange-soft border border-orange/20 rounded-full px-3.5 py-1.5 mb-6"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-orange" />
            Now serving Atlanta, GA
          </FadeUp>

          <FadeUp as="h1" delay={0.08} className="font-display font-extrabold text-[clamp(38px,6.5vw,60px)] leading-[1.04] tracking-tight text-ink m-0">
            Fresh meals from{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #F26B1D, #FF6B9D 60%, #7C3AED)" }}
            >
              real local cooks.
            </span>
          </FadeUp>

          <FadeUp delay={0.16} className="mt-5 max-w-[480px] text-ink-2 text-[16px] md:text-[17px] leading-relaxed">
            Real food, made by real people near you — weekly meal prep, meal plans, and
            food experiences. One marketplace of local home cooks.
          </FadeUp>

          <FadeUp delay={0.24} className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://app.preppa.live/discover"
              className="bg-orange text-white font-bold px-7 h-14 rounded-2xl flex items-center gap-2 shadow-[0_10px_26px_rgba(242,107,29,.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(242,107,29,.4)]"
            >
              Find your Preppa <Icon name="arrowUpRight" size={16} />
            </a>
            <a
              href="https://app.preppa.live/apply"
              className="bg-surface text-ink font-bold px-7 h-14 rounded-2xl flex items-center gap-2 border border-line transition-all hover:-translate-y-0.5 hover:bg-surface-2"
            >
              <Icon name="chefhat" size={16} /> Become a Preppa
            </a>
          </FadeUp>

          <FadeUp delay={0.32} className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
            {TRUST.map((t) => (
              <span key={t.label} className="inline-flex items-center gap-2 text-[12.5px] font-bold text-ink-2">
                <Icon name={t.icon} size={14} className="text-orange" />
                {t.label}
              </span>
            ))}
          </FadeUp>
        </div>

        <FadeUp delay={0.2} y={16} className="justify-self-center">
          <PhoneMockup />
        </FadeUp>
      </div>
    </section>
  );
}
