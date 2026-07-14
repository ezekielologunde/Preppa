"use client";

import { motion } from "framer-motion";

/** Matches the real Preppa app-icon mark (orange rounded square + flame) — see
 * screenshots/logo-check.png in the repo. Kept in sync with Footer.tsx and help/SiteShell.tsx. */
function Mark() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="9" fill="#F26B1D" />
      <path
        d="M16 6.5c-.4 2.9-2.1 4.6-3.6 6.2-1.7 1.9-2.9 3.6-2.9 5.9 0 3.9 3 7 6.9 7h.2c3.7-.1 6.6-3.1 6.6-6.8 0-2.1-.9-3.9-2.3-5.2.1.4.1.7.1 1.1 0 1.5-1 2.2-1.8 3-.6.6-1.1 1.2-1.1 2 0 1.1.9 1.9 1.9 2.1-1.1.6-2.4.9-3.7.6-2.2-.5-3.8-2.4-3.8-4.7 0-1.7.9-2.9 1.9-4.1C15.3 12.1 16.4 10.1 16 6.5z"
        fill="#fff"
      />
    </svg>
  );
}

/** One screen, one job — so the nav is just the mark and the single action that
 * matters, floating over the hero. No link list to a page with no sections to jump to.
 * Rendered as a child of the hero's `position: relative` section (not viewport-fixed)
 * so it scrolls away with the hero instead of sitting, unreadable, over the light footer. */
export function Nav() {
  return (
    <div className="absolute top-4 inset-x-0 z-50 px-4">
      <nav className="max-w-[1200px] mx-auto h-[62px] pl-5 pr-1.5 flex items-center justify-between rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10">
        <a href="#top" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
          <Mark />
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
