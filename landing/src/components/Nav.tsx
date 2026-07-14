"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { LearnDrawer } from "./LearnDrawer";

/** Sits in normal document flow on the bright hero band (not floating glass-on-photo) —
 * the logo needs to read clearly against a light background, not survive translucency
 * over a busy image. */
export function Nav() {
  const [learnOpen, setLearnOpen] = useState(false);

  return (
    <>
      <nav className="relative z-20 max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight text-ink">
          <LogoMark size={40} />
          Preppa
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLearnOpen(true)}
            className="hidden sm:inline-flex h-11 px-4 rounded-full text-sm font-bold text-ink hover:bg-ink/5 transition-colors"
          >
            Learn
          </button>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="https://app.preppa.live/discover"
            className="bg-ink text-white text-sm font-bold px-5 h-11 rounded-full flex items-center shadow-[0_8px_20px_rgba(28,18,6,.25)]"
          >
            Find a cook
          </motion.a>
        </div>
      </nav>
      <LearnDrawer open={learnOpen} onClose={() => setLearnOpen(false)} />
    </>
  );
}
