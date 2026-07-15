"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { WaitlistForm } from "./WaitlistForm";
import { Icon } from "./Icon";

const EASE = [0.22, 1, 0.36, 1] as const;
const HELP = "https://help.preppa.live";
const TICKER = ["WEST AFRICAN", "SOUL FOOD", "OAXACAN", "HALAL & DESI", "ITALIAN COMFORT", "HEALTHY & SEAFOOD"];

const TRUST = [
  { icon: "check", label: "Approved local cooks" },
  { icon: "shield", label: "Secure payments & payouts" },
  { icon: "spark", label: "Meals, plans & experiences" },
] as const;

/** Committed warm-dark, photography-led hero. Real food photography carries the
 * section (replacing the video); one bright-orange accent, Bricolage display, and a
 * real verified-cook trust chip. Content is visible by default — motion only enhances. */
export function Hero() {
  return (
    <section id="top" className="lhero relative min-h-dvh overflow-hidden flex flex-col">
      {/* Header */}
      <header className="relative z-10 max-w-[1180px] w-full mx-auto px-6 md:px-8 pt-6 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight text-[#FFF3E4]">
          <LogoMark size={38} /> preppa
        </a>
        <div className="flex items-center gap-3">
          <a href={HELP} className="hidden sm:inline-flex h-10 px-4 items-center rounded-full text-[13px] font-bold text-[#FFF3E4] transition-opacity hover:opacity-80">
            Learn
          </a>
          <span className="lh-chip">
            <span className="w-[7px] h-[7px] rounded-full animate-pulse" style={{ background: "var(--orange)" }} />
            <span className="uppercase tracking-[0.14em] text-[11px] font-bold">Launching soon</span>
          </span>
        </div>
      </header>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1180px] w-full mx-auto px-6 md:px-8 py-12 md:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          {/* Left — copy + waitlist + trust */}
          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lh-title text-[clamp(44px,7.4vw,84px)]"
            >
              Better than takeout.
              <br />
              Made <span className="lh-accent">three doors down.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
              className="lh-sub mt-6 max-w-[34rem] text-[16px] md:text-[19px] leading-relaxed font-medium"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
              className="mt-8 flex flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap"
            >
              {TRUST.map((t) => (
                <span key={t.label} className="lh-chip">
                  <span className="lh-accent inline-flex"><Icon name={t.icon} size={16} /></span>
                  {t.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — photographic composition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:max-w-none"
          >
            <div className="lh-photo aspect-[4/5]">
              <img src="/hero-meal.jpg" alt="Fresh meal-prep boxes — kale, egg, avocado and roasted vegetables packed by a local Preppa" />
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, #180B05, rgba(24,11,5,.08) 55%, transparent)" }} />
              <div className="absolute left-4 top-4"><span className="lh-live">Meal drop live</span></div>
              <div className="absolute inset-x-4 bottom-4">
                <div className="lh-preppa">
                  <span className="relative block w-11 h-11 shrink-0 overflow-hidden rounded-full">
                    <img src="/hero-cook.jpg" alt="Chef Amara, a verified local cook" className="w-full h-full object-cover" />
                  </span>
                  <span className="flex min-w-0 flex-col pr-1">
                    <span className="flex items-center gap-1.5 font-bold leading-tight text-[15px]">
                      Chef Amara <span className="lh-accent inline-flex"><Icon name="check" size={15} /></span>
                    </span>
                    <span className="mt-0.5 flex items-center gap-2 text-xs" style={{ color: "rgba(255,243,228,.72)" }}>
                      West African · 2.4 mi
                      <span className="inline-flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" style={{ fill: "var(--orange)" }} aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z" /></svg>
                        4.9
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="lh-photo absolute -bottom-6 -right-4 hidden w-32 rotate-[5deg] sm:block lg:-right-8 lg:w-40">
              <div className="relative aspect-square">
                <img src="/hero-curry.jpg" alt="Chickpea curry with rice and avocado, packed in a meal-prep box" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cuisine marquee — dot separators (no emoji) */}
      <div aria-hidden="true" className="relative z-10 overflow-hidden border-t py-3.5" style={{ borderColor: "rgba(255,243,228,.1)" }}>
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display font-extrabold tracking-tight text-[clamp(14px,1.8vw,20px)]"
              style={{ color: "rgba(255,243,228,.9)" }}
            >
              {t} <span className="w-2 h-2 rounded-full" style={{ background: "var(--orange)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* Compliance / social strip */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,243,228,.1)" }}>
        <div className="max-w-[1180px] w-full mx-auto px-6 md:px-8 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[12px]" style={{ color: "rgba(255,243,228,.6)" }}>
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
