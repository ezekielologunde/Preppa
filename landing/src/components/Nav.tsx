"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#safety", label: "Trust & Safety" },
  { href: "#plans", label: "Meal Plans" },
  { href: "#services", label: "Book a Cook" },
  { href: "#preppas-earn", label: "For Cooks" },
];

/** Matches the real Preppa app-icon mark (orange rounded square + flame) — see
 * screenshots/logo-check.png in the repo. Kept in sync with Footer.tsx and help/SiteShell.tsx. */
function Mark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="9" fill="#F26B1D" />
      <path
        d="M16 6.5c-.4 2.9-2.1 4.6-3.6 6.2-1.7 1.9-2.9 3.6-2.9 5.9 0 3.9 3 7 6.9 7h.2c3.7-.1 6.6-3.1 6.6-6.8 0-2.1-.9-3.9-2.3-5.2.1.4.1.7.1 1.1 0 1.5-1 2.2-1.8 3-.6.6-1.1 1.2-1.1 2 0 1.1.9 1.9 1.9 2.1-1.1.6-2.4.9-3.7.6-2.2-.5-3.8-2.4-3.8-4.7 0-1.7.9-2.9 1.9-4.1C15.3 12.1 16.4 10.1 16 6.5z"
        fill="#fff"
      />
    </svg>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line">
      <nav className="max-w-[1200px] mx-auto px-6 h-[76px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
          <Mark />
          Preppa
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-ink-2">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="https://app.preppa.live" className="text-sm font-semibold text-ink-2 hover:text-ink">
            Log in
          </a>
          <motion.a
            whileTap={{ scale: 0.96 }}
            href="https://app.preppa.live"
            className="bg-orange text-white text-sm font-bold px-5 h-11 rounded-full flex items-center shadow-[0_10px_26px_rgba(242,107,29,.32)]"
          >
            Open app
          </motion.a>
        </div>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>
      {open ? (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 border-t border-line pt-4">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-semibold">
              {l.label}
            </a>
          ))}
          <a href="https://app.preppa.live" className="bg-orange text-white text-sm font-bold h-12 rounded-full flex items-center justify-center">
            Open app
          </a>
        </div>
      ) : null}
    </div>
  );
}
