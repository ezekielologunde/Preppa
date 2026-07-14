"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The page's primary action — pre-launch email capture. Writes to the real
 * `waitlist` table; ZIP is optional. Never fakes success. Tone restyles it for the
 * light body, the drenched-orange hero, or a dark video background. */
export function WaitlistForm({
  tone = "light",
  cta = "Join the waitlist",
}: {
  tone?: "light" | "onOrange" | "onDark" | "hero";
  cta?: string;
}) {
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
  const onDark = tone === "onDark";
  const hero = tone === "hero";
  const inputCls = onOrange
    ? "bg-cream text-ink placeholder:text-ink/45 border-transparent focus:border-ink"
    : onDark
      ? "bg-white/95 text-ink placeholder:text-ink/45 border-transparent focus:border-orange"
      : hero
        ? "bg-white text-ink placeholder:text-ink/45 border-transparent focus:border-[color:var(--hero-brand)]"
        : "bg-white text-ink placeholder:text-ink-soft/70 border-line focus:border-orange";
  const btnCls = onOrange
    ? "bg-ink text-cream hover:bg-ember"
    : onDark
      ? "bg-orange text-white hover:bg-orange-deep shadow-[0_10px_30px_rgba(242,107,29,.45)]"
      : hero
        ? "bg-[var(--hero-brand)] text-white hover:opacity-90 shadow-[0_10px_28px_rgba(242,107,29,.38)]"
        : "bg-orange text-white shadow-[0_10px_26px_rgba(242,107,29,.32)]";

  if (status === "done") {
    return (
      <div
        className={`max-w-md rounded-2xl px-5 py-4 ${onOrange ? "bg-ink" : onDark ? "bg-white/10 border border-white/20 backdrop-blur-sm" : hero ? "border backdrop-blur-sm" : "bg-green-soft border border-green/30"}`}
        style={hero ? { background: "var(--hero-panel)", borderColor: "var(--hero-panel-border)" } : undefined}
      >
        <p
          className={`inline-flex items-center gap-2 text-[15px] font-bold ${onOrange ? "text-cream" : onDark ? "text-acid" : hero ? "" : "text-green"}`}
          style={hero ? { color: "var(--hero-brand)" } : undefined}
        >
          <Icon name="check" size={17} /> You&rsquo;re on the list.
        </p>
        <p
          className={`mt-1 text-sm ${onOrange ? "text-cream/80" : onDark ? "text-white/80" : hero ? "" : "text-ink-2"}`}
          style={hero ? { color: "var(--hero-text-soft)" } : undefined}
        >
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
          {status === "submitting" ? "Joining…" : cta}
        </button>
      </div>
      {status === "error" ? (
        <p
          role="alert"
          className={`mt-2 text-sm font-bold ${onOrange ? "text-ink" : onDark ? "text-acid" : hero ? "" : "text-orange-press"}`}
          style={hero ? { color: "var(--hero-accent)" } : undefined}
        >
          Enter a valid email and try again.
        </p>
      ) : (
        <p
          className={`mt-2 text-[12.5px] font-semibold ${onOrange ? "text-ink/80" : onDark ? "text-white/70" : hero ? "" : "text-ink-soft"}`}
          style={hero ? { color: "var(--hero-text-mute)" } : undefined}
        >
          No spam — one email when we launch on your block.
        </p>
      )}
    </form>
  );
}
