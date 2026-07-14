"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { HeroVideo } from "./HeroVideo";
import { WaitlistForm } from "./WaitlistForm";

const CUISINES = ["West African", "Soul food", "Oaxacan", "Halal & Desi", "Italian comfort", "Healthy & seafood"];
const TRUST = ["ID-verified cooks", "Secure payments", "Real people, real kitchens"];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Drenched-orange editorial hero. The brand owns the color (not accent-on-white),
 * the Bricolage headline is the lead actor, and the food video is framed as a real
 * object, not a washed-out background. Text is warm-near-black on orange (4.7:1, AA)
 * — bolder and more food-brand than the old cream-overlay treatment. */
export function Hero() {
  return (
    <section id="top" className="relative bg-orange text-ink overflow-hidden">
      <header className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 h-24 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight">
          <LogoMark size={38} bg="#201108" fg="#FFF3E4" /> preppa
        </a>
        <a
          href="https://help.preppa.live/guides/post-your-first-meal"
          className="text-[14px] font-bold underline decoration-2 underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors"
        >
          Cook with us →
        </a>
      </header>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 pb-10 pt-4 md:pt-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
        <div className="min-w-0">
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-display font-extrabold leading-[0.9] tracking-[-0.035em] text-balance text-[clamp(46px,8.4vw,92px)]"
          >
            Homemade.
            <br />
            By the cooks
            <br />
            on your block.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="mt-6 max-w-[30rem] text-[16px] md:text-[18px] leading-relaxed font-medium text-ink/90"
          >
            Weekly meal prep, meal plans, catering, and food experiences — from verified
            local cooks who make the food they&rsquo;d serve their own family. No chains. No
            ghost kitchens. Firing up your neighborhood soon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
            className="mt-8"
          >
            <WaitlistForm tone="onOrange" />
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] font-bold text-ink/85"
          >
            {TRUST.map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 ? <span className="w-1.5 h-1.5 rounded-full bg-herb" /> : null}
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="justify-self-center w-full max-w-[400px]"
        >
          <div className="relative aspect-[4/5] rounded-[26px] overflow-hidden border-[5px] border-ink shadow-[10px_14px_0_0_var(--ember)]">
            <HeroVideo />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
              <span className="inline-flex items-center gap-2 text-cream font-bold text-[13px]">
                <span className="w-2 h-2 rounded-full bg-herb" /> Cooked fresh, this week
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cuisine strip — real verified cuisines as bold typographic texture, not stats */}
      <div className="relative z-10 border-t-2 border-ink/15">
        <ul className="max-w-[1240px] mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-display font-extrabold tracking-tight text-[clamp(15px,2vw,22px)]">
          {CUISINES.map((c, i) => (
            <li key={c} className="flex items-center gap-5">
              {i > 0 ? <span className="w-2 h-2 rounded-full bg-ink/40" /> : null}
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
