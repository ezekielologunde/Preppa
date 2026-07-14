import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "./LogoMark";

/** help.preppa.live's shell — served from the same Next.js app/Vercel project as
 * preppa.live via middleware.ts host-based rewrite, not a separate deployment. Warm
 * dark theme scoped via `.help`. The shell is just header + footer; each page owns
 * its own body layout (the index has a sidebar + rail; articles use a centered
 * prose column from the guides/legal route-group layouts). */
export function HelpShell({ children }: { children: ReactNode }) {
  return (
    <div className="help min-h-dvh flex flex-col">
      <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur-md border-b border-line">
        <div className="max-w-[1280px] mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight text-ink">
            <LogoMark size={30} /> Preppa
          </Link>
          <nav className="flex items-center gap-1 text-[13px] font-semibold text-ink-2">
            <Link href="/" className="px-3 py-2 rounded-full hover:bg-white/5 hover:text-ink transition-colors">Help Center</Link>
            <a href="/legal/terms" className="hidden sm:block px-3 py-2 rounded-full hover:bg-white/5 hover:text-ink transition-colors">Legal</a>
            <a href="https://preppa.live" className="px-3 py-2 rounded-full hover:bg-white/5 hover:text-ink transition-colors">preppa.live&nbsp;→</a>
          </nav>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-line">
        <div className="max-w-[1280px] mx-auto px-6 py-8 flex flex-col gap-5">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] font-semibold text-ink-2">
            <a href="mailto:support@preppa.live" className="hover:text-ink transition-colors">support@preppa.live</a>
            <a href="mailto:legal@preppa.live" className="hover:text-ink transition-colors">legal@preppa.live</a>
            <a href="mailto:privacy@preppa.live" className="hover:text-ink transition-colors">privacy@preppa.live</a>
            <a href="mailto:safety@preppa.live" className="hover:text-ink transition-colors">safety@preppa.live</a>
            <a href="mailto:accessibility@preppa.live" className="hover:text-ink transition-colors">accessibility@preppa.live</a>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-soft">
            <p>© 2026 Preppa, Inc. · <a href="https://preppa.live" className="underline hover:text-ink">preppa.live</a></p>
            <p>Preppers are independent food providers. Requirements vary by location.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
