"use client";

import { useEffect, useState } from "react";

/** Warm-orange (light, default) ⇄ burnt-orange (dark) switcher for the landing hero.
 * Persists to localStorage; the no-flash script in layout.tsx applies the saved choice
 * before paint. Icons are inline SVG (no emoji). */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const root = document.documentElement;
    if (next) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("preppa-theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to warm light mode" : "Switch to burnt dark mode"}
      title={dark ? "Warm mode" : "Burnt mode"}
      className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors hover:opacity-80"
      style={{
        color: "var(--hero-text)",
        borderColor: "var(--hero-chip-border)",
        background: "var(--hero-chip-bg)",
      }}
    >
      {dark ? (
        // sun (currently dark → offer light)
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.5M12 19.5V22M22 12h-2.5M4.5 12H2M19 5l-1.8 1.8M6.8 17.2 5 19M19 19l-1.8-1.8M6.8 6.8 5 5" />
        </svg>
      ) : (
        // flame (currently light → offer burnt/dark)
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2c.6 4.2-2.4 5.8-3.6 8-1 1.8-.4 4 1.6 4.6 1.6.5 2.4-.6 2.4-1.8 1.4 1 2 2.6 1.2 4.2 2.6-1 4.4-3.6 4.4-6.6 0-4-3-6.4-4.2-9.2-.6 1.4-1.6 2-2 2.4C10.6 6 12.4 4 13 2Z" />
        </svg>
      )}
    </button>
  );
}
