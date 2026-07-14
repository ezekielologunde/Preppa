"use client";

import { useEffect, useState } from "react";
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
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="9" fill="#F26B1D" />
      <path
        d="M16 6.5c-.4 2.9-2.1 4.6-3.6 6.2-1.7 1.9-2.9 3.6-2.9 5.9 0 3.9 3 7 6.9 7h.2c3.7-.1 6.6-3.1 6.6-6.8 0-2.1-.9-3.9-2.3-5.2.1.4.1.7.1 1.1 0 1.5-1 2.2-1.8 3-.6.6-1.1 1.2-1.1 2 0 1.1.9 1.9 1.9 2.1-1.1.6-2.4.9-3.7.6-2.2-.5-3.8-2.4-3.8-4.7 0-1.7.9-2.9 1.9-4.1C15.3 12.1 16.4 10.1 16 6.5z"
        fill="#fff"
      />
    </svg>
  );
}

/** Recreates the original mockup's floating dark pill nav (`.nav-shell`/`.nav`) — the
 * previous rebuild used a plain light sticky bar instead, losing a distinctive brand moment. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-4 z-50 px-4">
      <nav
        className={`max-w-[1200px] mx-auto h-[62px] pl-5 pr-1.5 flex items-center gap-4 rounded-full bg-ink/95 backdrop-blur-md text-white transition-shadow duration-300 ${
          lifted ? "shadow-[0_16px_36px_rgba(23,21,15,.28)]" : "shadow-[0_2px_6px_rgba(23,21,15,.06),0_14px_34px_rgba(23,21,15,.08)]"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight shrink-0">
          <Mark />
          Preppa
        </a>
        <div className="hidden md:flex items-center gap-1 text-sm font-semibold text-white/75 ml-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 rounded-full transition-colors hover:text-white hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-1.5 ml-auto">
          <a href="https://app.preppa.live" className="px-3.5 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-full">
            Log in
          </a>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="https://app.preppa.live"
            className="bg-orange text-white text-sm font-bold px-5 h-[46px] rounded-full flex items-center shadow-[0_10px_26px_rgba(242,107,29,.32)] transition-shadow hover:shadow-[0_14px_32px_rgba(242,107,29,.4)]"
          >
            Open app
          </motion.a>
        </div>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden ml-auto w-11 h-11 rounded-full bg-orange flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>
      {open ? (
        <div className="md:hidden mt-3 max-w-[1200px] mx-auto bg-bg rounded-3xl p-5 shadow-[0_10px_24px_rgba(23,21,15,.08),0_30px_70px_rgba(23,21,15,.12)] flex flex-col gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 px-1 font-bold text-lg border-b border-line last:border-b-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://app.preppa.live"
            className="mt-4 bg-orange text-white text-sm font-bold h-12 rounded-full flex items-center justify-center"
          >
            Open app
          </a>
        </div>
      ) : null}
    </div>
  );
}
