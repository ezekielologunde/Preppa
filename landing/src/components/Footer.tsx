import { LogoMark } from "./LogoMark";

const HELP = "https://help.preppa.live";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-bg">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-wrap items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-lg mb-3 text-ink">
            <LogoMark size={32} /> Preppa
          </div>
          <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
            The marketplace for homemade food. Fresh meals from ID-verified local cooks.
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href="https://www.instagram.com/preppa.live"
            target="_blank"
            rel="noreferrer"
            aria-label="Preppa on Instagram"
            className="w-10 h-10 rounded-full border-2 border-ink flex items-center justify-center text-ink transition-colors hover:bg-orange hover:text-white"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@preppa.live"
            target="_blank"
            rel="noreferrer"
            aria-label="Preppa on TikTok"
            className="w-10 h-10 rounded-full border-2 border-ink flex items-center justify-center text-ink transition-colors hover:bg-orange hover:text-white"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
              <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M14 4a4.5 4.5 0 0 0 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-xs text-ink-soft">
          <p>© 2026 Preppa, Inc. · Merchant of record · Payments by Stripe</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            <a href={HELP} className="hover:text-ink">Help Center</a>
            <a href={`${HELP}/legal/terms`} className="hover:text-ink">Terms</a>
            <a href={`${HELP}/legal/privacy`} className="hover:text-ink">Privacy</a>
            <a href={`${HELP}/legal/cook-agreement`} className="hover:text-ink">Cook Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
