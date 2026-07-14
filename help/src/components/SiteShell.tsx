"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function Mark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="9" fill="#F26B1D" />
      <path d="M9 19.5c0-4.5 3-7.5 7-7.5s7 3 7 7.5" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M7.5 19.5h17" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M16 12V8.5" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="16" cy="7" r="1.6" fill="#fff" />
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

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
            <Mark /> Preppa Help
          </Link>
          <a
            href="https://preppa.live"
            className="text-sm font-semibold text-ink-2 hover:text-ink"
          >
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
