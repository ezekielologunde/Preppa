"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";

/** One screen, one job — so the nav is just the mark and the single action that
 * matters, floating over the hero. No link list to a page with no sections to jump to.
 * Rendered as a child of the hero's `position: relative` section (not viewport-fixed)
 * so it scrolls away with the hero instead of sitting, unreadable, over the light footer. */
export function Nav() {
  return (
    <div className="absolute top-4 inset-x-0 z-50 px-4">
      <nav className="max-w-[1200px] mx-auto h-[62px] pl-5 pr-1.5 flex items-center justify-between rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10">
        <a href="#top" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
          <LogoMark size={30} />
          Preppa
        </a>
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          href="https://app.preppa.live/discover"
          className="bg-orange text-white text-sm font-bold px-5 h-[46px] rounded-full flex items-center shadow-[0_10px_26px_rgba(242,107,29,.32)] transition-shadow hover:shadow-[0_14px_32px_rgba(242,107,29,.4)]"
        >
          Find a cook
        </motion.a>
      </nav>
    </div>
  );
}
