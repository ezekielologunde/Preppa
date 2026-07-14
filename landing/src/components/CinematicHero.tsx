"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { FadeUp } from "./FadeUp";
import { Icon } from "./Icon";
import { Nav } from "./Nav";
import { ServiceSelector } from "./ServiceSelector";
import { Dock } from "./Dock";

const WORD_LINES = [
  ["REAL", "FOOD."],
  ["REAL", "LOCAL", "PREPPERS."],
  ["BUILT", "AROUND", "YOUR", "LIFE."],
];

const TRUST = [
  { icon: "shield" as const, label: "ID-verified cooks" },
  { icon: "card" as const, label: "Stripe-secured payments" },
  { icon: "chat" as const, label: "Message your cook directly" },
];

const FLOATING_TAGS = [
  { label: "Weekly meal plans", className: "top-[18%] right-[6%]" },
  { label: "Trusted local cooks", className: "top-[42%] right-[3%]" },
];

/** Desktop-only pointer parallax via motion values (not React state) so mouse-move
 * never triggers a re-render — per the "use motion values, not renders" perf note.
 * Displacement stays small (glow ≤12px, text ≤4px, tags ≤8px) and is fully disabled
 * under prefers-reduced-motion or on touch/coarse-pointer devices. */
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

/** The whole homepage, on purpose — a single full-viewport screen instead of a long
 * stack of marketing sections. Background is a real photo (generated via Higgsfield's
 * free-tier z_image model — the paid Kling/Soul models 403'd on this account's plan)
 * with a slow Ken Burns drift, not a placeholder gradient. A fixed video would go in
 * the same spot (swap the <Image> for <video autoPlay muted loop playsInline
 * src="/hero.mp4" .../>) if a real clip ever replaces the photo. */
export function CinematicHero() {
  const glowParallax = useParallax(12);
  const textParallax = useParallax(4);
  const tagParallax = useParallax(8);

  return (
    <section id="top" className="relative h-[100dvh] min-h-[560px] overflow-hidden bg-ink">
      <Nav />
      <Image
        src="/hero-kitchen.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover animate-[kenburns_22s_ease-in-out_infinite_alternate]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/30" />
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, rgba(242,107,29,.25), transparent 65%), radial-gradient(50% 45% at 85% 75%, rgba(124,58,237,.15), transparent 60%)",
          backgroundSize: "160% 160%, 160% 160%",
          animation: "heroGlow 18s ease-in-out infinite alternate",
          x: glowParallax.x,
          y: glowParallax.y,
        }}
      />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.02)_0_2px,transparent_2px_4px)]" />

      {/* Floating metadata tags — decorative, low-priority, hidden below lg */}
      <div aria-hidden="true" className="hidden lg:block">
        {FLOATING_TAGS.map((t) => (
          <motion.span
            key={t.label}
            style={{ x: tagParallax.x, y: tagParallax.y }}
            className={`absolute ${t.className} text-[12px] font-semibold text-white/40 tracking-wide`}
          >
            {t.label}
          </motion.span>
        ))}
      </div>

      <motion.div
        style={{ x: textParallax.x, y: textParallax.y }}
        className="relative z-[1] h-full flex flex-col justify-center px-6 md:px-16 pt-[88px] pb-[92px]"
      >
        <div className="flex flex-col items-start max-w-[820px]">
          <FadeUp
            as="span"
            delay={0}
            className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.2em] text-orange bg-orange/10 border border-orange/25 rounded-full px-3.5 py-1.5 mb-6"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-orange" />
            Meals. Plans. Experiences. Local Preppers.
          </FadeUp>

          <h1
            aria-label="Real food. Real local Preppers. Built around your life."
            className="text-[clamp(38px,7.5vw,88px)] font-extrabold leading-[0.96] tracking-[-0.03em] uppercase text-white m-0"
          >
            {(() => {
              let flatIndex = -1;
              return WORD_LINES.map((line, li) => (
                <span key={li} className="flex flex-wrap gap-x-3">
                  {line.map((w) => {
                    flatIndex += 1;
                    return (
                      <FadeUp
                        key={li + "-" + w}
                        as="span"
                        aria-hidden="true"
                        delay={0.15 + flatIndex * 0.09}
                        y={38}
                        duration={0.75}
                        className="inline-block"
                      >
                        {w}
                      </FadeUp>
                    );
                  })}
                </span>
              ));
            })()}
          </h1>

          <FadeUp delay={0.75} y={22} className="mt-6 max-w-[560px] text-white/80 text-[15px] md:text-[17px] leading-relaxed">
            Discover weekly meal prep, custom meal plans, local food services, and memorable
            experiences from trusted cooks near you.
          </FadeUp>

          <ServiceSelector />

          <FadeUp delay={1.1} y={20} className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://app.preppa.live/discover"
              className="bg-orange text-white font-bold px-7 h-14 rounded-2xl flex items-center gap-2 shadow-[0_10px_26px_rgba(242,107,29,.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(242,107,29,.45)]"
            >
              Find your Preppa <Icon name="arrowUpRight" size={16} />
            </a>
            <a
              href="https://app.preppa.live/apply"
              className="border border-white/25 text-white font-bold px-7 h-14 rounded-2xl flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              <Icon name="chefhat" size={16} /> Become a Preppa
            </a>
          </FadeUp>

          <FadeUp delay={1.3} y={16} className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
            {TRUST.map((t) => (
              <span key={t.label} className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-white/60">
                <Icon name={t.icon} size={14} className="text-orange" />
                {t.label}
              </span>
            ))}
          </FadeUp>
        </div>
      </motion.div>

      <Dock />

      <style>{`
        @keyframes heroGlow {
          from { background-position: 0% 0%, 100% 100%, 50% 100%; }
          to { background-position: 10% 10%, 90% 90%, 50% 90%; }
        }
        @keyframes kenburns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          section#top [style*="heroGlow"] { animation: none !important; }
          section#top img { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
