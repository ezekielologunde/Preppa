"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The page's primary action — pre-launch email capture. Writes to the real
 * `waitlist` table; ZIP is optional. Never fakes success. `tone="onOrange"` restyles
 * it (cream inputs, ink button) so it reads on the drenched-orange hero. */
export function WaitlistForm({ tone = "light" }: { tone?: "light" | "onOrange" }) {
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

  const onOrange = tone === "onOrange";
  const inputCls = onOrange
    ? "bg-cream text-ink placeholder:text-ink/45 border-transparent focus:border-ink"
    : "bg-white text-ink placeholder:text-ink-soft/70 border-line focus:border-orange";
  const btnCls = onOrange
    ? "bg-ink text-cream hover:bg-ember"
    : "bg-orange text-white shadow-[0_10px_26px_rgba(242,107,29,.32)]";

  if (status === "done") {
    return (
      <div className={`max-w-md rounded-2xl px-5 py-4 ${onOrange ? "bg-ink" : "bg-green-soft border border-green/30"}`}>
        <p className={`inline-flex items-center gap-2 text-[15px] font-bold ${onOrange ? "text-cream" : "text-green"}`}>
          <Icon name="check" size={17} /> You&rsquo;re on the list.
        </p>
        <p className={`mt-1 text-sm ${onOrange ? "text-cream/80" : "text-ink-2"}`}>
          We&rsquo;ll email you the second Preppa fires up near you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          aria-invalid={status === "error"}
          className={`flex-1 h-14 px-4 rounded-xl border-2 text-[15px] font-medium outline-none transition-colors ${inputCls} ${status === "error" ? "!border-ember" : ""}`}
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder="ZIP"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          aria-label="ZIP code (optional)"
          className={`sm:w-24 h-14 px-4 rounded-xl border-2 text-[15px] font-medium outline-none transition-colors ${inputCls}`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`h-14 px-6 rounded-xl font-bold shrink-0 transition-all hover:-translate-y-0.5 disabled:opacity-60 ${btnCls}`}
        >
          {status === "submitting" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {status === "error" ? (
        <p role="alert" className={`mt-2 text-sm font-bold ${onOrange ? "text-ink" : "text-orange-press"}`}>
          Enter a valid email and try again.
        </p>
      ) : (
        <p className={`mt-2 text-[12.5px] font-semibold ${onOrange ? "text-ink/80" : "text-ink-soft"}`}>
          No spam — one email when we launch on your block.
        </p>
      )}
    </form>
  );
}
