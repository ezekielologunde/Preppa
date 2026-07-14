import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "FAQ — Preppa Help" };

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is Preppa?",
    a: "Preppa is a marketplace for homemade food. You order weekly meal prep, meal plans, local meals, catering, and food experiences from ID-verified independent cooks near you. Preppa doesn’t cook — every dish is made by an individual Prepper.",
  },
  {
    q: "How do I pay? Is there cash on delivery?",
    a: "Payment is online and secure through Stripe — there’s no cash on delivery. Prices and any fees are shown before you confirm, and 100% of any tip goes to the cook.",
  },
  {
    q: "How do meal-plan subscriptions bill?",
    a: (
      <>
        Per delivery cycle, not all at signup. You can skip, pause, or cancel any cycle before its
        cutoff. See <Link href="/guides/how-subscriptions-work" className="underline">How subscriptions work</Link>.
      </>
    ),
  },
  {
    q: "Can I get a refund?",
    a: (
      <>
        It depends on the order type and timing — one-off meals, subscription cycles, and booked
        services each have their own terms, shown before you pay. See{" "}
        <Link href="/legal/refunds-and-cancellations" className="underline">Refunds &amp; Cancellations</Link>.
      </>
    ),
  },
  {
    q: "Are the cooks verified?",
    a: (
      <>
        Yes — every Prepper&rsquo;s identity is verified and their application reviewed before their
        kitchen goes live, and Preppa can suspend kitchens that don&rsquo;t meet our standards. It&rsquo;s
        not a health inspection or a guarantee — see{" "}
        <Link href="/guides/safety-and-food-standards" className="underline">Safety and food standards</Link>.
      </>
    ),
  },
  {
    q: "I have a food allergy — is that handled?",
    a: (
      <>
        Cooks disclose major allergens, but home kitchens handle many ingredients so cross-contact is
        possible. Read the dish details and message the cook before ordering. See the{" "}
        <Link href="/legal/allergen-policy" className="underline">Allergen Policy</Link>.
      </>
    ),
  },
  {
    q: "How do I become a Prepper?",
    a: (
      <>
        Apply in the app, get verified, and set up your kitchen. Start with{" "}
        <Link href="/guides/post-your-first-meal" className="underline">How to post your first meal</Link>{" "}
        and <Link href="/guides/set-up-payout" className="underline">How to set up payouts</Link>.
      </>
    ),
  },
  {
    q: "When is Preppa available in my city?",
    a: "We’re onboarding cooks in new areas over time. Join the waitlist at preppa.live and we’ll let you know the moment Preppa is live near you.",
  },
];

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-soft hover:text-orange transition-colors mb-8">
        <Icon name="chevRight" size={14} className="rotate-180" /> Help Center
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight text-ink mb-2">Frequently asked questions</h1>
      <p className="text-ink-2 mb-8">The short answers. Follow the links for the full guides and policies.</p>

      <div className="flex flex-col gap-3">
        {FAQS.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-line bg-card px-5 py-4">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-ink">
              {f.q}
              <span className="text-ink-soft transition-transform group-open:rotate-45 shrink-0"><Icon name="plus" size={18} /></span>
            </summary>
            <div className="mt-3 text-[14.5px] text-ink-2 leading-relaxed">{f.a}</div>
          </details>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink-soft">
        Didn&rsquo;t find it? <Link href="/contact" className="underline hover:text-orange">Contact support</Link>.
      </p>
    </div>
  );
}
