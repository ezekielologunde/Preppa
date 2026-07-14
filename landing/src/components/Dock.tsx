"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { LearnDrawer } from "./LearnDrawer";

/** Floating bottom dock — keeps Learn/Legal/social reachable without leaving the
 * single-viewport hero for a stacked footer section. */
export function Dock() {
  const [learnOpen, setLearnOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 inset-x-0 z-40 px-4"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3 h-[54px] px-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLearnOpen(true)}
              className="h-10 px-3.5 rounded-full text-[13px] font-semibold hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Icon name="chat" size={14} /> Learn
            </button>
            <a
              href="https://help.preppa.live/legal/terms"
              className="hidden sm:flex h-10 px-3.5 rounded-full text-[13px] font-semibold hover:bg-white/10 hover:text-white transition-colors items-center gap-1.5"
            >
              <Icon name="shield" size={14} /> Safety &amp; Legal
            </a>
          </div>

          <span className="hidden lg:block text-[12.5px] font-medium text-white/50 truncate">
            Real food. Real local cooks. Skip the chains.
          </span>

          <div className="flex items-center gap-1">
            <a
              href="https://www.tiktok.com/@preppa.live"
              target="_blank"
              rel="noreferrer"
              aria-label="Preppa on TikTok"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M14 4a4.5 4.5 0 0 0 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/preppa.live"
              target="_blank"
              rel="noreferrer"
              aria-label="Preppa on Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>

      <LearnDrawer open={learnOpen} onClose={() => setLearnOpen(false)} />
    </>
  );
}
