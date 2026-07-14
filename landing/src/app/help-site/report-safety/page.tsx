import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PublicSupportForm } from "@/components/PublicSupportForm";

export const metadata: Metadata = { title: "Report a safety issue — Preppa Help" };

const CATEGORIES = [
  "Suspected foodborne illness", "Unsafe food handling", "Undisclosed allergen",
  "Unsafe or unsanitary kitchen", "Misrepresented food or listing", "Other safety concern",
];

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-soft hover:text-orange transition-colors mb-8">
        <Icon name="chevRight" size={14} className="rotate-180" /> Help Center
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight text-ink mb-2">Report a safety issue</h1>

      <div className="rounded-2xl border border-orange/30 bg-orange-soft p-4 mb-6">
        <p className="text-sm font-bold text-ink flex items-center gap-2">
          <Icon name="shield" size={16} className="text-orange" /> This is not an emergency service.
        </p>
        <p className="mt-1 text-[13.5px] text-ink-2 leading-relaxed">
          If someone is in immediate danger or needs urgent medical help, call your local emergency
          number first. Use this form to tell the Preppa team about a food-safety or trust concern so
          we can review the kitchen involved.
        </p>
      </div>

      <p className="text-ink-2 mb-8 leading-relaxed">
        Tell us what happened and we&rsquo;ll follow up by email. You can also reach us at{" "}
        <a href="mailto:safety@preppa.live" className="underline">safety@preppa.live</a>. For how safety works on
        Preppa, see <Link href="/guides/safety-and-food-standards" className="underline">Safety and food standards</Link>.
      </p>

      <PublicSupportForm
        reportType="safety"
        refPrefix="S"
        categories={CATEGORIES}
        showImmediateRisk
        submitLabel="Send safety report"
      />
    </div>
  );
}
