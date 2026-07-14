import { NextResponse } from "next/server";

/** Non-secret diagnostic: reports whether email is configured in the deployed env,
 * without ever exposing the key. `resendConfigured:false` means RESEND_API_KEY is
 * missing/empty in this environment (set it in Vercel + redeploy); `true` means it's
 * present (so any send failure is the key's validity or the send itself, not config). */
export function GET() {
  const key = process.env.RESEND_API_KEY || "";
  return NextResponse.json({
    ok: true,
    resendConfigured: key.length > 0,
    resendKeyLength: key.length, // length only — never the value
  });
}
