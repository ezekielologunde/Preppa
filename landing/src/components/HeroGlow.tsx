"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";

/** A soft warm glow that follows the cursor across the hero — a subtle interactive
 * light source layered under the content (pointer-events-none, z-0). Spring-smoothed
 * so it trails the cursor. Inert under prefers-reduced-motion (stays at its resting
 * spot). Purely decorative: the hero reads fine without it. */
export function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });
  const bg = useMotionTemplate`radial-gradient(340px circle at ${sx}px ${sy}px, rgba(255,90,36,.18), rgba(255,61,127,.09) 42%, transparent 72%)`;

  useEffect(() => {
    const section = ref.current?.parentElement;
    if (!section) return;
    // resting position: upper-right, matching the ambient glow
    const r0 = section.getBoundingClientRect();
    x.set(r0.width * 0.72);
    y.set(r0.height * 0.18);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function onMove(e: MouseEvent) {
      const r = section!.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return <motion.div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ background: bg }} />;
}
