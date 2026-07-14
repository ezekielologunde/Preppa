"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#safety", label: "Trust & Safety" },
  { href: "#plans", label: "Meal Plans" },
  { href: "#preppas", label: "For Cooks" },
];

function Mark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="9" fill="#F26B1D" />
      <path d="M9 19.5c0-4.5 3-7.5 7-7.5s7 3 7 7.5" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M7.5 19.5h17" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M16 12V8.5" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="16" cy="7" r="1.6" fill="#fff" />
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
          aria-label="Open menu"
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
