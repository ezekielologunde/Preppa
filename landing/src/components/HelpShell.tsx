"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function Mark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="9" fill="#F26B1D" />
      <path
        d="M16 6.5c-.4 2.9-2.1 4.6-3.6 6.2-1.7 1.9-2.9 3.6-2.9 5.9 0 3.9 3 7 6.9 7h.2c3.7-.1 6.6-3.1 6.6-6.8 0-2.1-.9-3.9-2.3-5.2.1.4.1.7.1 1.1 0 1.5-1 2.2-1.8 3-.6.6-1.1 1.2-1.1 2 0 1.1.9 1.9 1.9 2.1-1.1.6-2.4.9-3.7.6-2.2-.5-3.8-2.4-3.8-4.7 0-1.7.9-2.9 1.9-4.1C15.3 12.1 16.4 10.1 16 6.5z"
        fill="#fff"
      />
    </svg>
  );
}

const NAV = [
  {
    section: "Guides",
    items: [
      { href: "/guides/post-your-first-meal", label: "Post your first meal" },
      { href: "/guides/create-a-meal-plan", label: "Create a meal plan" },
      { href: "/guides/set-up-payout", label: "Set up payout" },
    ],
  },
  {
    section: "Legal",
    items: [
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/legal/cook-agreement", label: "Cook Agreement" },
    ],
  },
];

/** help.preppa.live's shell — served from the same Next.js app/Vercel project as
 * preppa.live via middleware.ts host-based rewrite, not a separate deployment. */
export function HelpShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
            <Mark /> Preppa Help
          </Link>
          <a href="https://preppa.live" className="text-sm font-semibold text-ink-2 hover:text-ink">
            ← Back to preppa.live
          </a>
        </div>
      </header>
      <details className="md:hidden border-b border-line group">
        <summary className="max-w-[1200px] mx-auto px-6 py-3 text-sm font-bold text-ink-2 cursor-pointer list-none flex items-center justify-between">
          Browse guides &amp; legal
          <span className="text-ink-soft transition-transform group-open:rotate-180">▾</span>
        </summary>
        <div className="max-w-[1200px] mx-auto px-6 pb-4 space-y-5">
          {NAV.map((group) => (
            <div key={group.section}>
              <h4 className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-2">
                {group.section}
              </h4>
              <div className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-semibold rounded-lg px-3 py-2 transition-colors ${
                        active ? "bg-orange-soft text-orange" : "text-ink-2"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </details>
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-6 flex gap-12 py-12">
        <nav className="hidden md:block w-56 shrink-0">
          <div className="sticky top-24 space-y-8">
            {NAV.map((group) => (
              <div key={group.section}>
                <h4 className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-3">
                  {group.section}
                </h4>
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm font-semibold rounded-lg px-3 py-2 transition-colors ${
                          active ? "bg-orange-soft text-orange" : "text-ink-2 hover:bg-surface"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
        <main className="flex-1 min-w-0 max-w-2xl">{children}</main>
      </div>
      <footer className="border-t border-line py-8">
        <div className="max-w-[1200px] mx-auto px-6 text-xs text-ink-soft">
          © 2026 Preppa, Inc. · <a href="https://preppa.live" className="underline">preppa.live</a>
        </div>
      </footer>
    </>
  );
}
