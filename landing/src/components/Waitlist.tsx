"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }
    setStatus("submitting");
    const { error } = await supabase
      .from("waitlist")
      .insert({ email, zip: zip.trim() || null, source: "landing" });
    if (error) {
      setStatus("error");
      setErrorMsg(error.code === "23505" ? "That email is already on the waitlist." : "Something went wrong — try again.");
      return;
    }
    setStatus("done");
  }

  return (
    <section id="waitlist" className="py-20 md:py-28">
      <Reveal className="max-w-[1200px] mx-auto px-6">
        <div className="bg-surface rounded-[36px] p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-4">
              <span className="w-[7px] h-[7px] rounded-full bg-orange" />
              Not in Atlanta?
            </span>
            <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight leading-tight mb-4">
              Get notified when <span className="font-light text-ink-soft">Preppa comes to your block</span>
            </h2>
            <p className="text-ink-2 leading-relaxed max-w-md">
              We&rsquo;re live in Atlanta, GA today and expanding city by city. Drop your email
              and ZIP so we can tell you the moment local Preppas launch near you.
            </p>
          </div>
          <div className="max-w-md md:justify-self-end w-full">
            {status === "done" ? (
              <div className="bg-white rounded-2xl border border-line-2 p-6 flex items-center gap-4">
                <span className="w-11 h-11 rounded-full bg-green-soft text-green flex items-center justify-center shrink-0">
                  <Icon name="check" size={20} />
                </span>
                <div>
                  <b className="block text-[15px]">You&rsquo;re on the list</b>
                  <span className="text-sm text-ink-soft">We&rsquo;ll email you when Preppa launches near you.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-line-2 p-5 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12 px-4 rounded-xl border border-line-2 text-[15px] outline-none focus:border-orange transition-colors"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="ZIP code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    maxLength={10}
                    className="sm:w-32 h-12 px-4 rounded-xl border border-line-2 text-[15px] outline-none focus:border-orange transition-colors"
                  />
                </div>
                {status === "error" ? <p className="text-sm text-orange-press font-semibold">{errorMsg}</p> : null}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="h-12 rounded-xl bg-ink text-white font-bold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
                >
                  {status === "submitting" ? "Joining…" : "Join the waitlist"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
