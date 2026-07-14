import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail, waitlistConfirmationEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance rate limit (serverless resets between cold starts, so this
// deters casual bursts but is not a substitute for Turnstile before heavy promotion).
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string, max = 5, windowMs = 60_000) {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || now - cur.t > windowMs) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  cur.n += 1;
  return cur.n > max;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: { email?: string; zip?: string; hp?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (body.hp) return NextResponse.json({ ok: true }); // honeypot: pretend success

  const email = (body.email || "").trim();
  const zip = (body.zip || "").trim() || null;
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  const { error } = await supabase.from("waitlist").insert({ email, zip, source: "landing" });
  if (error) {
    console.error("[subscribe] insert failed", error.message);
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
  }

  // Confirmation email is best-effort: a missing/invalid RESEND_API_KEY must never
  // fail the signup. Auto-activates the moment a valid key is set in the env.
  const t = waitlistConfirmationEmail();
  sendEmail({ to: email, subject: t.subject, html: t.html, text: t.text }).catch(() => {});

  return NextResponse.json({ ok: true });
}
