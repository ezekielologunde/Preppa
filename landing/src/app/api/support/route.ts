import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail, supportReceivedEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RANDOM = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const TYPES = ["support", "safety", "abuse"] as const;
type ReportType = (typeof TYPES)[number];

function makeRef(prefix: string) {
  let s = "";
  for (let i = 0; i < 6; i++) s += RANDOM[Math.floor(Math.random() * RANDOM.length)];
  return `${prefix}-${s}`;
}

// Best-effort per-instance rate limit (see /api/subscribe for the same caveat).
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string, max = 4, windowMs = 60_000) {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || now - cur.t > windowMs) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  cur.n += 1;
  return cur.n > max;
}

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n) + "…" : s);

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (b.hp) return NextResponse.json({ ok: true, ref: null }); // honeypot

  const reportType: ReportType = TYPES.includes(b.reportType as ReportType) ? (b.reportType as ReportType) : "support";
  const email = String(b.email || "").trim();
  const description = String(b.description || "").trim();
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }
  if (description.length < 10 || description.length > 8000) {
    return NextResponse.json({ ok: false, error: "invalid_description" }, { status: 422 });
  }

  const prefix = reportType === "safety" ? "S" : reportType === "abuse" ? "A" : "P";
  const ref = makeRef(prefix);
  const name = b.name ? clip(String(b.name).trim(), 200) : null;
  const category = b.category ? clip(String(b.category).trim(), 120) : null;
  const subject = b.subject ? clip(String(b.subject).trim(), 300) : null;
  const relatedRef = b.related_ref ? clip(String(b.related_ref).trim(), 120) : null;
  const immediateRisk = !!b.immediateRisk;
  const isSafety = reportType === "safety";

  const { error } = await supabase.from("public_support_requests").insert({
    ref,
    report_type: reportType,
    name,
    email,
    role: b.role ? clip(String(b.role), 60) : null,
    category,
    subject,
    related_ref: relatedRef,
    description,
    immediate_risk: immediateRisk,
  });
  if (error) {
    console.error("[support] insert failed", error.message);
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
  }

  // 1) Confirmation to the person who submitted (best-effort).
  const conf = supportReceivedEmail(ref, isSafety);
  sendEmail({ to: email, subject: conf.subject, html: conf.html, text: conf.text }).catch(() => {});

  // 2) Internal notification to the right alias (Cloudflare forwards it to the team
  //    Gmail). Reply-To is the reporter so the team can respond directly. Kept concise.
  const alias = isSafety ? "safety@preppa.live" : reportType === "abuse" ? "abuse@preppa.live" : "support@preppa.live";
  const label = isSafety ? "SAFETY" : reportType === "abuse" ? "ABUSE" : "SUPPORT";
  const lines = [
    `Reference: ${ref}`,
    `From: ${name ? name + " " : ""}<${email}>`,
    category ? `Category: ${category}` : "",
    subject ? `Subject: ${subject}` : "",
    relatedRef ? `Related: ${relatedRef}` : "",
    immediateRisk ? `IMMEDIATE RISK flagged` : "",
    "",
    clip(description, 4000),
  ].filter(Boolean);
  sendEmail({
    to: alias,
    from: `Preppa ${label[0] + label.slice(1).toLowerCase()} <notifications@preppa.live>`,
    replyTo: email,
    subject: `[PREPPA ${label} #${ref}] ${subject || category || "New request"}`,
    text: lines.join("\n"),
    html: `<pre style="font-family:-apple-system,Segoe UI,Roboto,monospace;font-size:13px;white-space:pre-wrap;color:#201108">${lines
      .map((l) => l.replace(/&/g, "&amp;").replace(/</g, "&lt;"))
      .join("\n")}</pre>`,
  }).catch(() => {});

  return NextResponse.json({ ok: true, ref });
}
