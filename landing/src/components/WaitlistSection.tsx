"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { FadeUp } from "./FadeUp";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Its own high-contrast section, not a footnote in the footer — a waitlist buried
 * below a full-viewport hero reads as "no waitlist." ZIP is optional (the `waitlist`
 * table already has a nullable `zip` column) so it's a bonus signal, not a blocker. */
export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const { error } = await supabase
      .from("waitlist")
      .insert({ email, zip: zip.trim() || null, source: "landing" });
    setStatus(error ? "error" : "done");
  }

  return (
    <section className="bg-panel-2 py-20 md:py-28">
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <FadeUp as="h2" className="font-display font-bold text-[clamp(30px,5.5vw,52px)] leading-tight text-ink">
          Not in your city <span className="text-lime">yet?</span>
        </FadeUp>
        <FadeUp delay={0.1} className="mt-4 text-ink-2 text-[16px] max-w-md mx-auto">
          Drop your email (and ZIP, if you&rsquo;ve got it) and we&rsquo;ll tell you the second
          Preppa lands near you.
        </FadeUp>

        <FadeUp delay={0.2} className="mt-8">
          {status === "done" ? (
            <p className="inline-flex items-center gap-2 text-lime font-bold">
              <Icon name="check" size={18} /> You&rsquo;re on the list.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={status === "error"}
                className={`flex-1 h-13 px-4 rounded-2xl border bg-card text-ink text-sm font-semibold outline-none ${
                  status === "error" ? "border-orange" : "border-line focus:border-orange"
                }`}
                style={{ height: "3.25rem" }}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="ZIP (optional)"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="sm:w-32 h-13 px-4 rounded-2xl border border-line bg-card text-ink text-sm font-semibold outline-none focus:border-orange"
                style={{ height: "3.25rem" }}
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="h-13 px-6 rounded-2xl bg-orange text-white font-bold shrink-0 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                style={{ height: "3.25rem" }}
              >
                {status === "submitting" ? "…" : "Notify me"}
              </button>
            </form>
          )}
        </FadeUp>
        {status === "error" ? (
          <p role="alert" className="mt-3 text-sm font-semibold text-orange">
            Enter a valid email and try again.
          </p>
        ) : null}
      </div>
    </section>
  );
}
