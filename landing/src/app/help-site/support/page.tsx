import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PublicSupportForm } from "@/components/PublicSupportForm";

export const metadata: Metadata = { title: "Contact Support — Preppa Help" };

const CATEGORIES = [
  "Account", "Order", "Meal plan", "Subscription", "Payment", "Payout", "Refund",
  "Service request", "Quote", "Booking", "Technical issue", "Accessibility", "Abuse or misconduct", "Other",
];

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-soft hover:text-orange transition-colors mb-8">
        <Icon name="chevRight" size={14} className="rotate-180" /> Help Center
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight text-ink mb-2">Contact support</h1>
      <p className="text-ink-2 mb-6 leading-relaxed">
        Most questions are answered in the <Link href="/" className="underline">Help Center</Link> and{" "}
        <Link href="/faq" className="underline">FAQ</Link>. For anything about a specific order, messaging your
        cook is usually fastest. Otherwise, send us the details below and we&rsquo;ll reply by email.
      </p>
      <p className="text-[13px] text-ink-soft mb-8">
        Reporting a safety concern instead? Use <Link href="/report-safety" className="underline text-orange">Report a safety issue</Link>.
        You can also email us at{" "}
        <a href="mailto:support@preppa.live" className="underline">support@preppa.live</a>.
      </p>

      <PublicSupportForm reportType="support" categories={CATEGORIES} showRole submitLabel="Send request" />
    </div>
  );
}
