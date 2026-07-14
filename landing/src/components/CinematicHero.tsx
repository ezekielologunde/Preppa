"use client";

import { FadeUp } from "./FadeUp";

const WORDS = ["REAL", "FOOD.", "COOKED", "BY", "REAL", "LOCALS.", "NOT", "A", "RESTAURANT."];

/** Full-viewport opening moment — the "hero is a thesis" treatment. A fixed video
 * belongs at the same place `<VideoBackground>` renders (see comment below); until
 * a real on-brand clip exists, an animated warm gradient stands in — same layout,
 * one-line swap later. Deliberately a darker, moodier register than the rest of the
 * page (near-black + amber glow) — the one place this site spends its boldness. */
export function CinematicHero() {
  return (
    <section id="top" className="relative h-[100dvh] min-h-[560px] overflow-hidden bg-[#100d09]">
      {/* Swap this div for:
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"
                 src="/hero.mp4" /> */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, rgba(242,107,29,.35), transparent 65%), radial-gradient(50% 45% at 85% 75%, rgba(124,58,237,.22), transparent 60%), radial-gradient(80% 70% at 50% 100%, rgba(242,107,29,.18), transparent 70%)",
          backgroundSize: "160% 160%, 160% 160%, 160% 160%",
          animation: "heroGlow 18s ease-in-out infinite alternate",
        }}
      />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.02)_0_2px,transparent_2px_4px)]" />

      <div className="relative z-[1] h-full flex flex-col justify-center px-6 md:px-16 pt-[70px] pb-8">
        <div className="flex flex-col items-start max-w-[760px]">
          <FadeUp as="span" delay={0} className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.2em] text-white/60 mb-6">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" />
            Live now in Atlanta, GA
          </FadeUp>

          <h1 className="flex flex-wrap gap-x-3 gap-y-1 text-[clamp(32px,7vw,84px)] font-extrabold leading-[1.02] tracking-tight uppercase text-white m-0">
            {WORDS.map((w, i) => (
              <FadeUp key={i} as="span" delay={0.15 + i * 0.08} y={32} duration={0.7} className="inline-block">
                {w}
              </FadeUp>
            ))}
          </h1>

          <FadeUp delay={0.95} y={24} className="mt-6 max-w-[420px] text-white/75 text-[15px] leading-relaxed">
            Preppa connects you with ID-verified home cooks nearby — order fresh, homemade
            meals made by a real person you can message and track live.
          </FadeUp>

          <FadeUp delay={1.1} y={20} className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://app.preppa.live/discover"
              className="bg-orange text-white font-bold px-7 h-14 rounded-2xl flex items-center gap-2 shadow-[0_10px_26px_rgba(242,107,29,.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(242,107,29,.45)]"
            >
              Find a cook near you
            </a>
            <a
              href="#waitlist"
              className="border border-white/25 text-white font-bold px-7 h-14 rounded-2xl flex items-center transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              Not in Atlanta? Join the waitlist
            </a>
          </FadeUp>
        </div>
      </div>

      <style>{`
        @keyframes heroGlow {
          from { background-position: 0% 0%, 100% 100%, 50% 100%; }
          to { background-position: 10% 10%, 90% 90%, 50% 90%; }
        }
        @media (prefers-reduced-motion: reduce) {
          section#top [style*="heroGlow"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
