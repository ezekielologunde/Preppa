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

const HELP = "https://help.preppa.live";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-extrabold text-lg mb-3">
            <Mark /> Preppa
          </div>
          <p className="text-sm text-ink-soft leading-relaxed mb-4">
            The marketplace for homemade food. Fresh meals from ID-verified local cooks.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/preppa.live"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-line-2 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@preppa.live"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full border border-line-2 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M14 4a4.5 4.5 0 0 0 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-4">Product</h5>
          <div className="flex flex-col gap-2.5 text-sm font-semibold">
            <a href="#how">How it works</a>
            <a href="#plans">Meal plans</a>
            <a href="https://app.preppa.live">Browse cooks</a>
          </div>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-4">For Cooks</h5>
          <div className="flex flex-col gap-2.5 text-sm font-semibold">
            <a href="#preppas">Become a Preppa</a>
            <a href={`${HELP}/guides/post-your-first-meal`}>Post your first meal</a>
            <a href={`${HELP}/guides/set-up-payout`}>Set up payout</a>
            <a href={`${HELP}/guides/create-a-meal-plan`}>Create a meal plan</a>
          </div>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-4">Company</h5>
          <div className="flex flex-col gap-2.5 text-sm font-semibold">
            <a href="#safety">Trust &amp; Safety</a>
            <a href={HELP}>Help Center</a>
            <a href={`${HELP}/legal/terms`}>Terms</a>
            <a href={`${HELP}/legal/privacy`}>Privacy</a>
            <a href={`${HELP}/legal/cook-agreement`}>Cook Agreement</a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-ink-soft">
          <p>© 2026 Preppa, Inc. · Merchant of record · Payments by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
