"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { FadeUp } from "./FadeUp";
import { Icon } from "./Icon";
import { LogoMark } from "./LogoMark";
import { ServiceSelector } from "./ServiceSelector";
import { PhoneMockup } from "./PhoneMockup";
import { Dock } from "./Dock";
import { LearnDrawer } from "./LearnDrawer";

const TRUST = [
  { icon: "shield" as const, label: "ID-verified cooks" },
  { icon: "card" as const, label: "Secure payments" },
  { icon: "chat" as const, label: "Message your cook directly" },
];

const FLOATING_TAGS = [
  { label: "Weekly meal plans", className: "top-[16%] right-[6%]" },
  { label: "Trusted local cooks", className: "top-[38%] right-[3%]" },
];

/** Desktop-only pointer parallax via motion values (not React state) so mouse-move
 * never triggers a re-render. Displacement stays small and is fully disabled under
 * prefers-reduced-motion or on touch/coarse-pointer devices. */
function useParallax(multiplier: number) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.5 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    function onMove(e: MouseEvent) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      x.set(nx * multiplier);
      y.set(ny * multiplier);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, multiplier, x, y]);

  return { x: springX, y: springY };
}

/** One single full-viewport section per the cinematic brief — nav, headline,
 * service selector, phone-mockup demo card, floating tags, and dock all live
 * inside the same 100dvh screen instead of a stacked scroll. Background is the
 * real generated hero photo (not the unrelated business's stock video pasted
 * into this session twice) with a warm, bright overlay — not a darkened/moody
 * one — since the whole point of this pass was "brighter," not "cinematic-dark." */
export function CinematicHero() {
  const glowParallax = useParallax(10);
  const textParallax = useParallax(4);
  const tagParallax = useParallax(8);
  const [learnOpen, setLearnOpen] = useState(false);

  return (
    <section id="top" className="relative h-[100dvh] min-h-[640px] overflow-hidden bg-bg">
      <Image
        src="/hero-kitchen.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover animate-[kenburns_22s_ease-in-out_infinite_alternate]"
      />
      {/* Warm, bright wash — text side solid, image side visible — not a darkened
          "cinematic" overlay, which would fight the brief's own "brighter" direction. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(255,253,247,.96) 0%, rgba(255,253,247,.82) 32%, rgba(255,253,247,.32) 62%, rgba(255,253,247,.08) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[180px]"
        style={{ background: "linear-gradient(to top, rgba(255,253,247,.92), transparent)" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(45% 40% at 10% 85%, rgba(242,107,29,.16), transparent 65%)",
          x: glowParallax.x,
          y: glowParallax.y,
        }}
      />

      {/* Floating nav — embedded in the hero, not a separate sticky bar, per the
          single-viewport requirement. */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-4 inset-x-0 z-30 px-4"
      >
        <nav className="max-w-[1200px] mx-auto h-[62px] pl-5 pr-1.5 flex items-center justify-between rounded-full bg-white/75 backdrop-blur-md border border-line shadow-[0_10px_30px_rgba(0,0,0,.06)]">
          <a href="#top" className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight text-ink">
            <LogoMark size={30} /> preppa
          </a>
          <div className="hidden md:flex items-center gap-1 text-[13px] font-semibold text-ink-2">
            <a href="https://app.preppa.live/discover" className="px-3 py-2 rounded-full hover:bg-ink/5 hover:text-ink transition-colors">Explore</a>
            <button type="button" onClick={() => setLearnOpen(true)} className="px-3 py-2 rounded-full hover:bg-ink/5 hover:text-ink transition-colors">How it works</button>
            <a href="https://help.preppa.live/legal/terms" className="px-3 py-2 rounded-full hover:bg-ink/5 hover:text-ink transition-colors">Safety</a>
          </div>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="https://app.preppa.live/discover"
            className="bg-orange text-white text-sm font-bold px-5 h-[46px] rounded-full flex items-center shadow-[0_10px_26px_rgba(242,107,29,.32)] transition-shadow hover:shadow-[0_14px_32px_rgba(242,107,29,.4)]"
          >
            Find a cook
          </motion.a>
        </nav>
      </motion.div>

      {/* Floating metadata tags — decorative, hidden below lg, low visual priority */}
      <div aria-hidden="true" className="hidden lg:block">
        {FLOATING_TAGS.map((t) => (
          <motion.span
            key={t.label}
            style={{ x: tagParallax.x, y: tagParallax.y }}
            className={`absolute ${t.className} text-[12px] font-bold text-ink-2 bg-white/70 backdrop-blur-sm border border-line rounded-full px-3 py-1.5`}
          >
            {t.label}
          </motion.span>
        ))}
      </div>

      <motion.div
        style={{ x: textParallax.x, y: textParallax.y }}
        className="relative z-[1] h-full flex flex-col justify-center px-6 md:px-16 pt-[80px] pb-[76px] overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-8 items-center w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col items-start max-w-[720px] min-w-0">
            <FadeUp
              as="span"
              delay={0}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-orange bg-orange-soft border border-orange/20 rounded-full px-3.5 py-1.5 mb-4"
            >
              <span className="w-[6px] h-[6px] rounded-full bg-orange shrink-0" />
              Meals. Plans. Experiences. Local Preppers.
            </FadeUp>

            <FadeUp
              as="h1"
              delay={0.15}
              y={26}
              duration={0.75}
              className="font-display font-extrabold text-[clamp(32px,5.6vw,64px)] leading-[1.02] tracking-tight uppercase text-ink m-0"
            >
              Real food.
              <br />
              Real local Preppers.
              <br />
              Built around your life.
            </FadeUp>

            <FadeUp delay={0.45} y={18} className="mt-4 max-w-[520px] text-ink-2 text-[14px] md:text-[16px] leading-relaxed">
              Discover weekly meal prep, custom meal plans, local food services, and
              memorable experiences from trusted cooks near you.
            </FadeUp>

            <FadeUp delay={0.56} y={14}>
              <ServiceSelector />
            </FadeUp>

            <FadeUp delay={0.72} y={16} className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://app.preppa.live/discover"
                className="bg-orange text-white font-bold px-6 h-12 rounded-2xl flex items-center gap-2 shadow-[0_10px_26px_rgba(242,107,29,.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(242,107,29,.4)]"
              >
                Find your Preppa <Icon name="arrowUpRight" size={16} />
              </a>
              <a
                href="https://app.preppa.live/apply"
                className="bg-white/70 backdrop-blur-sm text-ink font-bold px-6 h-12 rounded-2xl flex items-center gap-2 border border-line transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                <Icon name="chefhat" size={16} /> Become a Preppa
              </a>
            </FadeUp>

            <FadeUp delay={0.85} y={12} className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
              {TRUST.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-ink-2">
                  <Icon name={t.icon} size={13} className="text-orange shrink-0" />
                  {t.label}
                </span>
              ))}
            </FadeUp>
          </div>

          <FadeUp delay={0.3} y={16} className="hidden md:flex justify-center min-w-0">
            <PhoneMockup />
          </FadeUp>
        </div>
      </motion.div>

      <Dock />
      <LearnDrawer open={learnOpen} onClose={() => setLearnOpen(false)} />

      <style>{`
        @keyframes kenburns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          section#top img { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
