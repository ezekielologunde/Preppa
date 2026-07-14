"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The page's primary action — pre-launch email capture. Writes to the real
 * `waitlist` table; ZIP is optional (nullable column already exists). Never fakes
 * success: if the DB insert errors, it surfaces a retry instead. */
export function WaitlistForm() {
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

  if (status === "done") {
    return (
      <div id="waitlist" className="rounded-2xl bg-green-soft border border-green/30 px-5 py-4 max-w-md">
        <p className="inline-flex items-center gap-2 text-[15px] font-bold text-green">
          <Icon name="check" size={17} /> You&rsquo;re on the list.
        </p>
        <p className="mt-1 text-sm text-ink-2">We&rsquo;ll email you the moment Preppa goes live near you.</p>
      </div>
    );
  }

  return (
    <form id="waitlist" onSubmit={onSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          aria-invalid={status === "error"}
          className={`flex-1 h-14 px-4 rounded-2xl border-2 bg-white text-ink text-[15px] font-semibold placeholder:text-ink-soft/70 outline-none transition-colors ${
            status === "error" ? "border-orange" : "border-line focus:border-orange"
          }`}
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder="ZIP"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          aria-label="ZIP code (optional)"
          className="sm:w-24 h-14 px-4 rounded-2xl border-2 border-line bg-white text-ink text-[15px] font-semibold placeholder:text-ink-soft/70 outline-none focus:border-orange"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-14 px-6 rounded-2xl bg-orange text-white font-bold shrink-0 shadow-[0_10px_26px_rgba(242,107,29,.32)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "submitting" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {status === "error" ? (
        <p role="alert" className="mt-2 text-sm font-semibold text-orange-press">
          Enter a valid email and try again.
        </p>
      ) : (
        <p className="mt-2 text-[12.5px] text-ink-soft">No spam — just one email when we launch near you.</p>
      )}
    </form>
  );
}
