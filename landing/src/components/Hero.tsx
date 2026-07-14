"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { HeroVideo } from "./HeroVideo";
import { WaitlistForm } from "./WaitlistForm";

const EASE = [0.22, 1, 0.36, 1] as const;
const HELP = "https://help.preppa.live";

// Real verified cuisines — honest example dishes, not invented.
const CUISINES = [
  { emoji: "🍚", name: "West African", dishes: "Jollof · egusi · suya" },
  { emoji: "🍗", name: "Soul food", dishes: "Fried chicken · mac" },
  { emoji: "🫓", name: "Halal & Desi", dishes: "Biryani · kebabs" },
];
const TICKER = ["WEST AFRICAN", "SOUL FOOD", "OAXACAN", "HALAL & DESI", "ITALIAN COMFORT", "HEALTHY & SEAFOOD"];

/** One full section, cinematic. A real chef-at-work video sits under a rich warm-dark
 * premium overlay (espresso base + an orange glow + an acid-lime glow + vignette);
 * bragging copy, waitlist, real cuisines, and a marquee live in the same section.
 * Content is visible by default — entrance motion only enhances it. */
export function Hero() {
  return (
    <section id="top" className="relative min-h-dvh overflow-hidden bg-[#180B05] text-cream flex flex-col">
      <HeroVideo />

      {/* Premium warm-dark overlay stack — cinematic, keeps text ≥ AA */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(178deg, rgba(24,11,5,.72) 0%, rgba(42,15,7,.58) 40%, rgba(18,8,4,.9) 100%)" }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(72% 48% at 12% 10%, rgba(242,107,29,.34), transparent 60%), radial-gradient(60% 44% at 92% 88%, rgba(203,242,74,.12), transparent 65%)" }} />
      <div aria-hidden="true" className="absolute inset-0 shadow-[inset_0_0_200px_70px_rgba(8,3,1,.6)]" />

      {/* Header */}
      <header className="relative z-10 max-w-[1180px] w-full mx-auto px-6 md:px-8 pt-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight">
          <LogoMark size={38} /> preppa
        </a>
        <span className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-cream bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
          <span className="w-[7px] h-[7px] rounded-full bg-acid animate-pulse" />
          Launching soon
        </span>
      </header>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1180px] w-full mx-auto px-6 md:px-8 py-12 md:py-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display font-extrabold leading-[0.92] tracking-[-0.035em] text-balance text-[clamp(44px,7.6vw,86px)]"
            >
              Better than takeout.
              <br />
              Made <span className="text-acid">three doors down.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
              className="mt-6 max-w-[34rem] text-[16px] md:text-[19px] leading-relaxed text-cream/90 font-medium"
            >
              Fresh, home-cooked meals from the most talented cooks in your neighborhood —
              affordable, on demand, and honestly better than the spot you keep reordering
              from. Drop your ZIP and get in before your block does.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              className="mt-8"
            >
              <WaitlistForm tone="onDark" cta="Get early access" />
            </motion.div>
          </div>

          {/* Cuisine cards — warm-dark glass panels, real cuisines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="min-w-0"
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-cream/60 mb-3">
              Home kitchens coming to <span className="text-acid">your block</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {CUISINES.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl bg-white/[0.07] border border-white/12 backdrop-blur-md px-4 py-3.5"
                >
                  <span className="text-3xl leading-none">{c.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-display font-extrabold text-[17px] tracking-tight truncate">{c.name}</p>
                    <p className="text-[12.5px] text-cream/65 truncate">{c.dishes}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cuisine marquee */}
      <div aria-hidden="true" className="relative z-10 overflow-hidden border-t border-white/10 py-3.5">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-8 font-display font-extrabold tracking-tight text-[clamp(14px,1.8vw,20px)] text-cream/85">
              {t} <span className="text-orange">🔥</span>
            </span>
          ))}
        </div>
      </div>

      {/* Compliance / social strip — keeps this a single section */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-[1180px] w-full mx-auto px-6 md:px-8 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[12px] text-cream/55">
          <p>© 2026 Preppa, Inc. · Payments by Stripe</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 font-semibold">
            <a href={HELP} className="hover:text-cream transition-colors">Help</a>
            <a href={`${HELP}/legal/terms`} className="hover:text-cream transition-colors">Terms</a>
            <a href={`${HELP}/legal/privacy`} className="hover:text-cream transition-colors">Privacy</a>
            <a href="https://www.instagram.com/preppa.live" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors">Instagram</a>
            <a href="https://www.tiktok.com/@preppa.live" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors">TikTok</a>
          </nav>
        </div>
      </div>
    </section>
  );
}
