import { LogoMark } from "./LogoMark";
import { WaitlistForm } from "./WaitlistForm";
import { HeroPhotos } from "./HeroPhotos";
import { HeroGlow } from "./HeroGlow";
import { Icon } from "./Icon";

const HELP = "https://help.preppa.live";
const TICKER = ["WEST AFRICAN", "SOUL FOOD", "OAXACAN", "HALAL & DESI", "ITALIAN COMFORT", "HEALTHY & SEAFOOD"];

const TRUST = [
  { icon: "check", label: "Approved local cooks" },
  { icon: "shield", label: "Secure payments & payouts" },
  { icon: "spark", label: "Meals, plans & experiences" },
] as const;

/** Committed warm-dark, photography-led hero. Real food photography carries the
 * section; one bright-orange accent, Bricolage display, and a real verified-cook
 * trust chip. Content is fully visible by default — the `lh-rise` entrance is a
 * transform-only enhancement (see globals.css), so it never ships blank. */
export function Hero() {
  return (
    <section id="top" className="lhero relative min-h-dvh overflow-hidden flex flex-col">
      <HeroGlow />
      {/* Header */}
      <header className="relative z-10 max-w-[1180px] w-full mx-auto px-6 md:px-8 pt-6 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight text-ink">
          <LogoMark size={38} /> preppa
        </a>
        <div className="flex items-center gap-3">
          <a href={HELP} className="hidden sm:inline-flex h-10 px-4 items-center rounded-full text-[13px] font-bold text-ink transition-opacity hover:opacity-80">
            Learn
          </a>
          <span className="lh-chip">
            <span className="w-[7px] h-[7px] rounded-full animate-pulse" style={{ background: "var(--pink)" }} />
            <span className="uppercase tracking-[0.14em] text-[11px] font-bold">Launching soon</span>
          </span>
        </div>
      </header>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1180px] w-full mx-auto px-6 md:px-8 py-12 md:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          {/* Left — copy + waitlist + trust */}
          <div className="min-w-0">
            <h1 className="lh-title lh-rise text-[clamp(44px,7.4vw,84px)]">
              Better than takeout.
              <br />
              Made <span className="lh-accent">three doors down.</span>
            </h1>

            <p className="lh-sub lh-rise mt-6 max-w-[34rem] text-[16px] md:text-[19px] leading-relaxed font-medium" style={{ animationDelay: "0.06s" }}>
              Fresh, home-cooked meals from the most talented cooks in your neighborhood —
              affordable, on demand, and honestly better than the spot you keep reordering
              from. Drop your ZIP and get in before your block does.
            </p>

            <div className="lh-rise mt-8" style={{ animationDelay: "0.12s" }}>
              <WaitlistForm tone="light" cta="Get early access" />
            </div>

            <div className="lh-rise mt-8 flex flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap" style={{ animationDelay: "0.18s" }}>
              {TRUST.map((t) => (
                <span key={t.label} className="lh-chip">
                  <span className="lh-accent inline-flex"><Icon name={t.icon} size={16} /></span>
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — interactive photographic composition (parallax + float + Ken Burns) */}
          <div className="lh-rise" style={{ animationDelay: "0.1s" }}>
            <HeroPhotos />
          </div>
        </div>
      </div>

      {/* Cuisine marquee — dot separators (no emoji) */}
      <div aria-hidden="true" className="relative z-10 overflow-hidden border-t py-3.5" style={{ borderColor: "var(--line)" }}>
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display font-extrabold tracking-tight text-[clamp(14px,1.8vw,20px)]"
              style={{ color: "rgba(30,18,8,.82)" }}
            >
              {t} <span className="w-2 h-2 rounded-full" style={{ background: "var(--pink)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* Compliance / social strip */}
      <div className="relative z-10 border-t" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-[1180px] w-full mx-auto px-6 md:px-8 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[12px]" style={{ color: "var(--ink-soft)" }}>
          <p>© 2026 Preppa, Inc. · Payments by Stripe</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 font-semibold">
            <a href={HELP} className="transition-opacity hover:opacity-70">Help</a>
            <a href={`${HELP}/legal/terms`} className="transition-opacity hover:opacity-70">Terms</a>
            <a href={`${HELP}/legal/privacy`} className="transition-opacity hover:opacity-70">Privacy</a>
            <a href="https://www.instagram.com/preppa.live" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">Instagram</a>
            <a href="https://www.tiktok.com/@preppa.live" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">TikTok</a>
          </nav>
        </div>
      </div>
    </section>
  );
}
