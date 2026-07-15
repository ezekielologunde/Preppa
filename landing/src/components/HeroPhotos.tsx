"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Icon } from "./Icon";

/** Interactive, "motion-designed" photo composition for the hero. Everything is
 * fully visible by default — motion only enhances:
 *  - mouse parallax: panels tilt/shift toward the cursor with springy 3D depth
 *    (the small tile travels further, reading as closer);
 *  - continuous float (CSS, different phases) + a cinematic Ken Burns zoom that
 *    makes the still photo feel like video.
 * All continuous motion + parallax are disabled under prefers-reduced-motion. */
export function HeroPhotos() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cfg = { stiffness: 110, damping: 18, mass: 0.4 };
  const sx = useSpring(mx, cfg);
  const sy = useSpring(my, cfg);

  const mainX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const mainY = useTransform(sy, [-0.5, 0.5], [-13, 13]);
  const mainRotX = useTransform(sy, [-0.5, 0.5], [6.5, -6.5]);
  const mainRotY = useTransform(sx, [-0.5, 0.5], [-7.5, 7.5]);
  const tileX = useTransform(sx, [-0.5, 0.5], [-36, 36]);
  const tileY = useTransform(sy, [-0.5, 0.5], [-26, 26]);

  function reduced() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced()) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:max-w-none"
      style={{ perspective: 1000 }}
    >
      {/* Main meal photo — parallax (outer) + float (inner) + Ken Burns (img) */}
      <motion.div
        className="relative"
        style={{ x: mainX, y: mainY, rotateX: mainRotX, rotateY: mainRotY, transformStyle: "preserve-3d" }}
      >
        <div className="lh-photo lh-float aspect-[4/5]">
          <img className="lh-kenburns" src="/hero-meal.jpg" alt="Fresh meal-prep boxes — kale, egg, avocado and roasted vegetables packed by a local Preppa" />
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
      </motion.div>

      {/* Secondary tile — travels further on parallax (reads as closer) */}
      <motion.div
        className="absolute -bottom-6 -right-4 hidden w-32 sm:block lg:-right-8 lg:w-40"
        style={{ x: tileX, y: tileY }}
      >
        <div className="lh-photo lh-float-2">
          <div className="relative aspect-square">
            <img src="/hero-curry.jpg" alt="Chickpea curry with rice and avocado, packed in a meal-prep box" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
