"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { FadeUp } from "./FadeUp";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Its own high-contrast section, not a footnote in the footer — the whole point of
 * this rewrite is that a waitlist buried below the fold reads as "no waitlist." */
export function WaitlistSection() {
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

  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="max-w-[720px] mx-auto px-6 text-center">
        <FadeUp as="h2" className="font-display text-[clamp(32px,6vw,64px)] leading-[0.95] text-white">
          NOT IN YOUR CITY YET?
        </FadeUp>
        <FadeUp delay={0.1} className="mt-4 text-white/70 text-[17px] max-w-md mx-auto">
          We&rsquo;re adding cities fast. Drop your email and we&rsquo;ll tell you the second Preppa
          lands near you.
        </FadeUp>

        <FadeUp delay={0.2} className="mt-8 flex justify-center">
          {status === "done" ? (
            <p className="inline-flex items-center gap-2 text-sun font-bold">
              <Icon name="check" size={18} /> You&rsquo;re on the list.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="w-full max-w-md flex gap-2">
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={status === "error"}
                className={`flex-1 h-14 px-4 rounded-2xl border-[3px] bg-white text-ink text-sm font-semibold outline-none ${
                  status === "error" ? "border-orange" : "border-white"
                }`}
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="h-14 px-6 rounded-2xl bg-sun text-ink font-bold border-[3px] border-white shrink-0 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "submitting" ? "…" : "Notify me"}
              </button>
            </form>
          )}
        </FadeUp>
        {status === "error" ? (
          <p role="alert" className="mt-3 text-sm font-semibold text-sun">
            Enter a valid email and try again.
          </p>
        ) : null}
      </div>
    </section>
  );
}
