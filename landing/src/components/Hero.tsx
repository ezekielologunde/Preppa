"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { HeroVideo } from "./HeroVideo";
import { WaitlistForm } from "./WaitlistForm";
import { ThemeToggle } from "./ThemeToggle";

const EASE = [0.22, 1, 0.36, 1] as const;
const HELP = "https://help.preppa.live";

// Real verified cuisines — honest example dishes, monogram marks (no emoji).
const CUISINES = [
  { mono: "WA", name: "West African", dishes: "Jollof · egusi · suya" },
  { mono: "SF", name: "Soul food", dishes: "Fried chicken · mac" },
  { mono: "HD", name: "Halal & Desi", dishes: "Biryani · kebabs" },
];
const TICKER = ["WEST AFRICAN", "SOUL FOOD", "OAXACAN", "HALAL & DESI", "ITALIAN COMFORT", "HEALTHY & SEAFOOD"];

/** One full section, cinematic, and themeable: warm-orange by default (light), burnt-
 * orange in dark mode (toggle in the header). All colors read from `--hero-*` tokens
 * so the switch re-skins the whole section. A real chef-at-work video sits under a
 * theme-aware overlay. Content is visible by default; motion only enhances it. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-dvh overflow-hidden flex flex-col"
      style={{ background: "var(--hero-ground)", color: "var(--hero-text)" }}
    >
      <HeroVideo />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--hero-ov)" }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--hero-glow)" }} />

      {/* Header */}
      <header className="relative z-10 max-w-[1180px] w-full mx-auto px-6 md:px-8 pt-6 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight" style={{ color: "var(--hero-text)" }}>
          <LogoMark size={38} /> preppa
        </a>
        <div className="flex items-center gap-2.5">
          <a
            href={HELP}
            className="hidden sm:inline-flex h-10 px-4 items-center rounded-full text-[13px] font-bold transition-opacity hover:opacity-80"
            style={{ color: "var(--hero-text)" }}
          >
            Learn
          </a>
          <ThemeToggle />
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] rounded-full px-3.5 py-2 border backdrop-blur-sm"
            style={{ color: "var(--hero-text)", background: "var(--hero-chip-bg)", borderColor: "var(--hero-chip-border)" }}
          >
            <span className="w-[7px] h-[7px] rounded-full animate-pulse" style={{ background: "var(--hero-brand)" }} />
            Launching soon
          </span>
        </div>
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
              Made <span style={{ color: "var(--hero-accent)" }}>three doors down.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
              className="mt-6 max-w-[34rem] text-[16px] md:text-[19px] leading-relaxed font-medium"
              style={{ color: "var(--hero-text-soft)" }}
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
              <WaitlistForm tone="hero" cta="Get early access" />
            </motion.div>
          </div>

          {/* Cuisine cards — theme-aware panels, monogram marks (no emoji) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="min-w-0"
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: "var(--hero-text-mute)" }}>
              Home kitchens coming to <span style={{ color: "var(--hero-accent)" }}>your block</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {CUISINES.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl border backdrop-blur-md px-4 py-3.5"
                  style={{ background: "var(--hero-panel)", borderColor: "var(--hero-panel-border)" }}
                >
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-extrabold text-[15px] shrink-0 text-white"
                    style={{ background: "var(--hero-brand)" }}
                  >
                    {c.mono}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display font-extrabold text-[17px] tracking-tight truncate">{c.name}</p>
                    <p className="text-[12.5px] truncate" style={{ color: "var(--hero-text-mute)" }}>{c.dishes}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cuisine marquee — dot separators (no emoji) */}
      <div aria-hidden="true" className="relative z-10 overflow-hidden border-t py-3.5" style={{ borderColor: "var(--hero-line)" }}>
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display font-extrabold tracking-tight text-[clamp(14px,1.8vw,20px)]"
              style={{ color: "var(--hero-text-soft)" }}
            >
              {t} <span className="w-2 h-2 rounded-full" style={{ background: "var(--hero-brand)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* Compliance / social strip */}
      <div className="relative z-10 border-t" style={{ borderColor: "var(--hero-line)" }}>
        <div className="max-w-[1180px] w-full mx-auto px-6 md:px-8 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[12px]" style={{ color: "var(--hero-text-mute)" }}>
          <p>© 2026 Preppa, Inc. · Payments by Stripe</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 font-semibold">
            <a href={HELP} className="transition-opacity hover:opacity-70">Help</a>
            <a href={`${HELP}/legal/terms`} className="transition-opacity hover:opacity-70">Terms</a>
            <a href={`${HELP}/legal/privacy`} className="transition-opacity hover:opacity-70">Privacy</a>
            <a href="https://www.instagram.com/preppa.live" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">Instagram</a>
            <a href="https://www.tiktok.com/@preppa.live" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">TikTok</a>
          </nav>
        </div>
      </div>
    </section>
  );
}
