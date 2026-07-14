"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HELP = "https://help.preppa.live";

/** Matches the real Preppa app-icon mark (orange rounded square + flame) — see
 * screenshots/logo-check.png in the repo. Kept in sync with Nav.tsx and help/SiteShell.tsx. */
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

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const { error } = await supabase.from("waitlist").insert({ email, source: "landing" });
    setStatus(error ? "error" : "done");
  }

  if (status === "done") {
    return (
      <p className="text-sm font-semibold text-green flex items-center gap-1.5">
        <Icon name="check" size={15} /> You&rsquo;re on the list.
      </p>
    );
  }

  return (
    <div className="max-w-sm">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "error"}
          className={`flex-1 h-11 px-3.5 rounded-xl border bg-white text-sm outline-none transition-colors ${
            status === "error" ? "border-orange-press" : "border-line-2 focus:border-orange"
          }`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-11 px-4 rounded-xl bg-ink text-white text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-60 shrink-0"
        >
          {status === "submitting" ? "…" : "Notify me"}
        </button>
      </form>
      {status === "error" ? (
        <p role="alert" className="text-xs font-semibold text-orange-press mt-2">
          Enter a valid email and try again.
        </p>
      ) : null}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-lg mb-3">
            <Mark /> Preppa
          </div>
          <p className="text-sm text-ink-soft leading-relaxed mb-4 max-w-xs">
            The marketplace for homemade food. Fresh meals from ID-verified local cooks.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/preppa.live"
              target="_blank"
              rel="noreferrer"
              aria-label="Preppa on Instagram"
              className="w-10 h-10 rounded-full border border-line-2 flex items-center justify-center text-ink-2 transition-colors hover:border-orange hover:text-orange hover:bg-orange-soft"
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
              className="w-10 h-10 rounded-full border border-line-2 flex items-center justify-center text-ink-2 transition-colors hover:border-orange hover:text-orange hover:bg-orange-soft"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
                <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M14 4a4.5 4.5 0 0 0 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <span className="block text-xs font-bold uppercase tracking-wide text-ink-soft mb-3">
            Not in Atlanta yet?
          </span>
          <WaitlistForm />
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
