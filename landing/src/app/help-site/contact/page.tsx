import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Contact Support — Preppa Help" };

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-soft hover:text-orange transition-colors mb-8">
        <Icon name="chevRight" size={14} className="rotate-180" /> Help Center
      </Link>

      <article className="prose">
        <h1 className="text-3xl font-extrabold tracking-tight mb-6">Contact support</h1>
        <p>
          Most questions are answered in our guides and policies — start with the{" "}
          <Link href="/" className="underline">Help Center</Link> or the{" "}
          <Link href="/faq" className="underline">FAQ</Link>. If you still need a hand, here&rsquo;s
          how to reach us.
        </p>

        <h2>The fastest fix: message your cook</h2>
        <p>
          For anything about a specific order — timing, handoff, a problem with a meal — message the
          cook directly from that order. Preppers know their own orders best and can usually sort
          things out quickest.
        </p>

        <h2>Reach the Preppa team</h2>
        <p>
          For account issues, payments, safety concerns, or anything a cook can&rsquo;t resolve,
          open a support request in the app under <b>Help &rarr; Support</b>. It goes straight to
          our team and keeps your account and order details attached so we can help faster.
        </p>

        <h2>Report a safety or trust issue</h2>
        <p>
          If a meal or kitchen seems unsafe, or someone is breaking our{" "}
          <Link href="/guides/community-guidelines" className="underline">Community Guidelines</Link>,
          please flag it in a support request so we can review the kitchen involved right away.
        </p>

        <h2>Find us on social</h2>
        <p>
          You can also reach out on{" "}
          <a href="https://www.instagram.com/preppa.live" target="_blank" rel="noreferrer" className="underline">Instagram</a>{" "}
          or{" "}
          <a href="https://www.tiktok.com/@preppa.live" target="_blank" rel="noreferrer" className="underline">TikTok</a>{" "}
          — we&rsquo;re @preppa.live on both.
        </p>
      </article>
    </div>
  );
}
