import { LogoMark } from "./LogoMark";

const HELP = "https://help.preppa.live";

/** Help & compliance footer — the place users find the Help Center and the real
 * legal pages (all on help.preppa.live). No links to the live web app; this is a
 * pre-launch page whose one action is the waitlist above. */
export function Footer() {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-display font-bold text-lg text-ink mb-3">
            <LogoMark size={32} /> preppa
          </div>
          <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
            The marketplace for homemade food — weekly meal prep, meal plans, local
            services, and experiences from ID-verified local cooks. Launching soon.
          </p>
          <div className="flex gap-2 mt-5">
            <a
              href="https://www.instagram.com/preppa.live"
              target="_blank"
              rel="noreferrer"
              aria-label="Preppa on Instagram"
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-2 transition-colors hover:bg-orange hover:text-white hover:border-orange"
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
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-2 transition-colors hover:bg-orange hover:text-white hover:border-orange"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
                <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M14 4a4.5 4.5 0 0 0 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-3">Help</h3>
          <ul className="flex flex-col gap-2 text-sm font-semibold text-ink-2">
            <li><a href={HELP} className="hover:text-orange transition-colors">Help Center</a></li>
            <li><a href={`${HELP}/guides/post-your-first-meal`} className="hover:text-orange transition-colors">Post your first meal</a></li>
            <li><a href={`${HELP}/guides/create-a-meal-plan`} className="hover:text-orange transition-colors">Create a meal plan</a></li>
            <li><a href={`${HELP}/guides/set-up-payout`} className="hover:text-orange transition-colors">Set up payout</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-3">Compliance</h3>
          <ul className="flex flex-col gap-2 text-sm font-semibold text-ink-2">
            <li><a href={`${HELP}/legal/terms`} className="hover:text-orange transition-colors">Terms of Service</a></li>
            <li><a href={`${HELP}/legal/privacy`} className="hover:text-orange transition-colors">Privacy Policy</a></li>
            <li><a href={`${HELP}/legal/cook-agreement`} className="hover:text-orange transition-colors">Cook Agreement</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-soft">
          <p>© 2026 Preppa, Inc. · Merchant of record · Payments by Stripe</p>
          <p>Preppers are independent food providers. Requirements vary by location.</p>
        </div>
      </div>
    </footer>
  );
}
