// SERVER-ONLY. Never import this from a client component — it reads RESEND_API_KEY.
// Sends via Resend's HTTP API (no SDK). If the key is absent it no-ops and returns
// { skipped: true } so callers never break when email isn't configured yet.
//
// Sending domain preppa.live is verified in Resend (DKIM resend._domainkey + SPF on
// send.preppa.live). Replies go to root aliases forwarded by Cloudflare to Gmail.

type SendResult = { ok: true; id?: string } | { ok: false; status: number; error?: string } | { skipped: true };

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  from?: string;
  replyTo?: string;
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY not set — skipping send");
    return { skipped: true };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: opts.from ?? "Preppa <notifications@preppa.live>",
        to: [opts.to],
        reply_to: opts.replyTo ?? "support@preppa.live",
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      }),
    });
    if (!res.ok) {
      const error = await res.text().catch(() => "");
      console.error("[email] send failed", res.status, error.slice(0, 200));
      return { ok: false, status: res.status, error };
    }
    const j = await res.json().catch(() => ({}));
    return { ok: true, id: j?.id };
  } catch (e) {
    console.error("[email] send threw", e);
    return { ok: false, status: 0 };
  }
}

const SHELL = (bodyHtml: string) => `<!doctype html><html><body style="margin:0;background:#FFFBF7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#201108">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBF7"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">
<tr><td style="padding-bottom:20px"><span style="display:inline-block;background:#F26B1D;color:#fff;font-weight:800;font-size:15px;letter-spacing:-.02em;border-radius:8px;padding:8px 12px">preppa</span></td></tr>
${bodyHtml}
<tr><td style="padding-top:28px;border-top:1px solid #ECDAC6;color:#7A6250;font-size:12px;line-height:1.6">
Preppa, Inc. · Real food from real local cooks.<br>
Questions? <a href="mailto:support@preppa.live" style="color:#B23A0E">support@preppa.live</a> · <a href="https://help.preppa.live" style="color:#B23A0E">Help Center</a>
</td></tr>
</table></td></tr></table></body></html>`;

/** Waitlist confirmation. Transactional (a direct response to the user's own action),
 * not marketing — no promotional content, one link. */
export function waitlistConfirmationEmail() {
  const subject = "You're on the Preppa waitlist";
  const html = SHELL(`
<tr><td><h1 style="margin:0 0 12px;font-size:24px;line-height:1.2;color:#201108">You're on the list.</h1>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#4A3324">Thanks for signing up. Preppa is a marketplace for homemade food from verified local cooks — weekly meal prep, meal plans, catering, and food experiences. We'll email you the moment we launch on your block.</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4A3324">Curious how it works while you wait?</p>
<p style="margin:0"><a href="https://help.preppa.live" style="display:inline-block;background:#F26B1D;color:#fff;font-weight:700;font-size:14px;text-decoration:none;border-radius:10px;padding:12px 18px">Explore the Help Center</a></p>
</td></tr>`);
  const text = `You're on the Preppa waitlist.

Thanks for signing up. Preppa is a marketplace for homemade food from verified local cooks — weekly meal prep, meal plans, catering, and food experiences. We'll email you the moment we launch on your block.

How it works: https://help.preppa.live
Questions: support@preppa.live

Preppa, Inc. · Real food from real local cooks.`;
  return { subject, html, text };
}

/** Public support / safety confirmation with the reference code. Transactional. */
export function supportReceivedEmail(ref: string, isSafety: boolean) {
  const subject = isSafety ? `We received your safety report (${ref})` : `We received your request (${ref})`;
  const html = SHELL(`
<tr><td><h1 style="margin:0 0 12px;font-size:24px;line-height:1.2;color:#201108">Received.</h1>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#4A3324">Your reference is <b>${ref}</b>. We've logged your ${isSafety ? "safety report" : "request"} and will reply to this email. Keep that reference handy if you follow up.</p>
${isSafety ? `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#4A3324"><b>If someone is in immediate danger, contact your local emergency services first.</b> This inbox is not monitored for emergencies.</p>` : ""}
</td></tr>`);
  const text = `Received. Your reference is ${ref}.

We've logged your ${isSafety ? "safety report" : "request"} and will reply to this email. Keep that reference handy if you follow up.
${isSafety ? "\nIf someone is in immediate danger, contact your local emergency services first. This inbox is not monitored for emergencies.\n" : ""}
Preppa, Inc.`;
  return { subject, html, text };
}
