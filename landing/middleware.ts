import { NextRequest, NextResponse } from "next/server";

/** One Vercel project, two domains. help.preppa.live and preppa.live are the same
 * deployment; this just routes by hostname so we don't need a second Vercel project
 * for what's really the same small marketing app. Everything under /help-site is the
 * training/legal content — every link inside it uses public paths ("/", "/guides/x",
 * "/legal/y"), which this same rewrite maps back onto /help-site/* on every request,
 * including client-side navigations, so nothing inside those pages needs to know
 * about the /help-site prefix at all. */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (host === "help.preppa.live" || host.startsWith("help.localhost")) {
    const url = req.nextUrl.clone();
    url.pathname = url.pathname === "/" ? "/help-site" : `/help-site${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|icon.svg|favicon.ico).*)"],
};
