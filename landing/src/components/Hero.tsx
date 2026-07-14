"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { Ticket } from "./Ticket";
import { FadeUp } from "./FadeUp";

const TRUST = [
  { icon: "shield" as const, label: "ID-verified cooks" },
  { icon: "card" as const, label: "Secure payments" },
  { icon: "chat" as const, label: "Message your cook directly" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-sun">
      {/* Flat color-block backdrop, not a gradient wash — the poster/market-board look
          leans on hard color and hard shadows instead of blur and glow. */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_85%_-10%,var(--sun-soft),transparent)]" />

      <div className="relative max-w-[1200px] mx-auto px-6 pt-10 pb-20 md:pt-14 md:pb-28 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <FadeUp
            as="span"
            delay={0}
            className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.18em] text-ink bg-white/60 border border-ink/15 rounded-full px-3.5 py-1.5 mb-6"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-orange" />
            Meal Prep · Meal Plans · Local Cooks · Experiences
          </FadeUp>

          <FadeUp as="h1" delay={0.08} className="font-display text-[clamp(46px,8vw,92px)] leading-[0.92] tracking-tight text-ink m-0">
            HOMEMADE
            <br />
            <span className="relative inline-block">
              FOOD.
              <svg
                aria-hidden="true"
                viewBox="0 0 220 24"
                className="absolute left-0 -bottom-2 w-full h-4 text-orange"
              >
                <path
                  d="M2 18c40-14 80-16 108-10s70 8 108-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            REAL LOCAL COOKS.
          </FadeUp>

          <FadeUp delay={0.2} className="mt-6 max-w-[440px] text-ink-2 text-[17px] leading-relaxed">
            Skip the chains. Order fresh meals, weekly plans, and food experiences — made by
            real cooks near you.
          </FadeUp>

          <FadeUp delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://app.preppa.live/discover"
              className="bg-orange text-white font-bold px-7 h-14 rounded-2xl flex items-center gap-2 border-[3px] border-ink shadow-[5px_5px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--ink)]"
            >
              Find your Preppa <Icon name="arrowUpRight" size={16} />
            </a>
            <a
              href="https://app.preppa.live/apply"
              className="bg-white text-ink font-bold px-7 h-14 rounded-2xl flex items-center gap-2 border-[3px] border-ink transition-transform hover:-translate-y-0.5"
            >
              <Icon name="chefhat" size={16} /> Become a Preppa
            </a>
          </FadeUp>

          <FadeUp delay={0.4} className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
            {TRUST.map((t) => (
              <span key={t.label} className="inline-flex items-center gap-2 text-[12.5px] font-bold text-ink-2">
                <Icon name={t.icon} size={14} className="text-orange" />
                {t.label}
              </span>
            ))}
          </FadeUp>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="justify-self-center"
        >
          <Ticket rotate={0} className="w-[280px] sm:w-[340px] overflow-hidden">
            <div className="relative w-full aspect-square">
              <Image src="/hero-kitchen.png" alt="A Preppa cook plating a fresh homemade meal" fill sizes="340px" className="object-cover" />
            </div>
            <p className="px-4 py-3 font-bold text-sm text-ink border-t-[3px] border-ink bg-surface">
              Cooked fresh, this week
            </p>
          </Ticket>
        </motion.div>
      </div>
    </section>
  );
}
