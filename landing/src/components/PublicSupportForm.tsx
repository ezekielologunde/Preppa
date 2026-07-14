"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = { name: string; label: string; type?: "text" | "email" | "textarea" | "select"; options?: string[]; required?: boolean; help?: string };

/** Public (unauthenticated) support / safety / abuse intake. Posts to /api/support,
 * which inserts into `public_support_requests` server-side, emails the reporter a
 * confirmation with their reference, and notifies the right team alias. Honeypot +
 * minimum-fill-time trap are baseline bot protection; add Cloudflare Turnstile
 * (docs/email/) before heavy promotion. Never fakes success. */
export function PublicSupportForm({
  reportType,
  categories,
  showName = true,
  showRole = false,
  showImmediateRisk = false,
  submitLabel = "Submit",
}: {
  reportType: "support" | "safety" | "abuse";
  categories: string[];
  showName?: boolean;
  showRole?: boolean;
  showImmediateRisk?: boolean;
  submitLabel?: string;
}) {
  const mounted = useRef(Date.now());
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [ref, setRef] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});
  const [immediateRisk, setImmediateRisk] = useState(false);
  const [hp, setHp] = useState(""); // honeypot

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hp) return; // bot filled the honeypot
    if (Date.now() - mounted.current < 2500) {
      setErrMsg("That was quick — give it a second and try again.");
      setStatus("error");
      return;
    }
    const email = (form.email || "").trim();
    const description = (form.description || "").trim();
    if (!EMAIL_RE.test(email)) {
      setErrMsg("Enter a valid email so we can reply.");
      setStatus("error");
      return;
    }
    if (description.length < 10) {
      setErrMsg("Add a few more details so we can help.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrMsg("");
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportType,
          hp,
          name: showName ? (form.name || "").trim() : "",
          email,
          role: showRole ? form.role || "" : "",
          category: form.category || "",
          subject: (form.subject || "").trim(),
          related_ref: (form.related_ref || "").trim(),
          description,
          immediateRisk: showImmediateRisk ? immediateRisk : false,
        }),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (res.ok && json.ok && json.ref) {
        setRef(json.ref);
        setStatus("done");
      } else {
        setErrMsg("Something went wrong sending that. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrMsg("Something went wrong sending that. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-card p-6">
        <p className="inline-flex items-center gap-2 font-bold text-ink">
          <Icon name="check" size={18} className="text-orange" /> Received. Your reference is <span className="font-mono">{ref}</span>.
        </p>
        <p className="mt-2 text-sm text-ink-2 leading-relaxed">
          We&rsquo;ve logged your request and will reply by email. Keep that reference handy if you
          follow up.
        </p>
      </div>
    );
  }

  const fields: Field[] = [
    ...(showName ? [{ name: "name", label: "Your name", required: false } as Field] : []),
    { name: "email", label: "Email", type: "email", required: true },
    ...(showRole ? [{ name: "role", label: "You are a…", type: "select", options: ["Customer", "Prepper (cook)", "Not sure"] } as Field] : []),
    { name: "category", label: "Category", type: "select", options: categories, required: true },
    { name: "subject", label: "Subject", required: false },
    { name: "related_ref", label: "Related order / booking ID (optional)", required: false },
    { name: "description", label: reportType === "safety" ? "What happened?" : "How can we help?", type: "textarea", required: true },
  ];

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* honeypot — visually hidden, ignored by humans */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        aria-hidden="true"
        className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none"
      />

      {fields.map((f) => (
        <label key={f.name} className="flex flex-col gap-1.5">
          <span className="text-[13px] font-bold text-ink">
            {f.label}
            {f.required ? <span className="text-orange"> *</span> : null}
          </span>
          {f.type === "textarea" ? (
            <textarea
              required={f.required}
              rows={5}
              value={form[f.name] || ""}
              onChange={(e) => set(f.name, e.target.value)}
              className="rounded-xl border border-line bg-card px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-orange resize-y"
            />
          ) : f.type === "select" ? (
            <select
              required={f.required}
              value={form[f.name] || ""}
              onChange={(e) => set(f.name, e.target.value)}
              className="h-11 rounded-xl border border-line bg-card px-3 text-[14px] text-ink outline-none focus:border-orange"
            >
              <option value="">Choose…</option>
              {f.options!.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              type={f.type || "text"}
              required={f.required}
              value={form[f.name] || ""}
              onChange={(e) => set(f.name, e.target.value)}
              className="h-11 rounded-xl border border-line bg-card px-3.5 text-[14px] text-ink outline-none focus:border-orange"
            />
          )}
        </label>
      ))}

      {showImmediateRisk ? (
        <label className="flex items-start gap-2.5 rounded-xl border border-line bg-card p-3.5">
          <input type="checkbox" checked={immediateRisk} onChange={(e) => setImmediateRisk(e.target.checked)} className="mt-0.5" />
          <span className="text-[13px] text-ink-2 leading-relaxed">
            This involves an immediate risk to someone&rsquo;s health or safety.{" "}
            <b className="text-ink">If someone is in danger right now, call your local emergency number first.</b>
          </span>
        </label>
      ) : null}

      {status === "error" ? (
        <p role="alert" className="text-sm font-semibold text-orange-press">{errMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start h-12 px-6 rounded-xl bg-orange text-white font-bold transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
