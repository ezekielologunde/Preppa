"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import { LogoMark } from "./LogoMark";
import { FadeUp } from "./FadeUp";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HELP = "https://help.preppa.live";

function InlineWaitlist() {
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
      <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-lime">
        <Icon name="check" size={15} /> You&rsquo;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 w-full max-w-sm mx-auto flex gap-2">
      <input
        type="email"
        required
        placeholder="Not in Atlanta? Get notified — you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={status === "error"}
        className={`flex-1 h-11 px-4 rounded-full border bg-white/5 text-white text-[13px] placeholder:text-white/40 outline-none ${
          status === "error" ? "border-orange" : "border-line focus:border-white/40"
        }`}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="h-11 px-5 rounded-full bg-white text-ink text-[13px] font-bold shrink-0 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "submitting" ? "…" : "Notify me"}
      </button>
    </form>
  );
}

/** The one deliberately dark, cinematic moment on an otherwise bright page — a
 * full-bleed close with the real hero photo (not the unrelated stock video clip
 * that kept getting pasted into this session), glass + solid CTAs, and the footer
 * folded into the same section instead of a separate block below it. */
export function FinalCTA() {
  return (
    <section className="night relative overflow-hidden bg-bg text-center">
      <Image src="/hero-kitchen.png" alt="" fill sizes="100vw" className="object-cover opacity-30" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--bg) 0%, transparent 18%, transparent 75%, var(--bg) 100%)" }} />

      <div className="relative px-6 pt-24 pb-14 md:pt-32">
        <FadeUp as="h2" className="font-display font-extrabold text-[clamp(32px,6vw,58px)] leading-[1.05] text-white max-w-2xl mx-auto">
          Your next meal is one tap away.
        </FadeUp>
        <FadeUp delay={0.1} className="mt-4 max-w-md mx-auto text-white/65 text-[15px] leading-relaxed">
          Browse real local cooks near you, see their menus, and order in minutes. No app
          download required.
        </FadeUp>
        <FadeUp delay={0.18} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://app.preppa.live/discover"
            className="bg-orange text-white font-bold px-7 h-14 rounded-full flex items-center gap-2 shadow-[0_10px_30px_rgba(242,107,29,.4)] transition-all hover:-translate-y-0.5"
          >
            Find your Preppa <Icon name="arrowUpRight" size={16} />
          </a>
          <a
            href="https://app.preppa.live/apply"
            className="glass-btn text-white font-bold px-7 h-14 rounded-full flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:bg-white/10"
          >
            <Icon name="chefhat" size={16} /> Become a Preppa
          </a>
        </FadeUp>

        <FadeUp delay={0.24}>
          <InlineWaitlist />
        </FadeUp>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 pb-10 pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 font-display font-bold text-white">
            <LogoMark size={26} /> preppa
          </div>
          <p className="text-xs text-white/40 max-w-xs text-center md:text-left">
            The marketplace for homemade food. Fresh meals from ID-verified local cooks.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/50">
          <a href={HELP} className="hover:text-white">Help Center</a>
          <a href={`${HELP}/legal/terms`} className="hover:text-white">Terms</a>
          <a href={`${HELP}/legal/privacy`} className="hover:text-white">Privacy</a>
          <a href={`${HELP}/legal/cook-agreement`} className="hover:text-white">Cook Agreement</a>
        </div>

        <div className="flex gap-2">
          <a
            href="https://www.instagram.com/preppa.live"
            target="_blank"
            rel="noreferrer"
            aria-label="Preppa on Instagram"
            className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-white/60 transition-colors hover:text-white hover:border-white/40"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
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
            className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-white/60 transition-colors hover:text-white hover:border-white/40"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
              <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M14 4a4.5 4.5 0 0 0 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
      <p className="relative text-center text-[11px] text-white/30 pb-6">© 2026 Preppa, Inc. · Merchant of record · Payments by Stripe</p>
    </section>
  );
}
