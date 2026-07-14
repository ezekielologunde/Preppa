import type { Metadata } from "next";

export const metadata: Metadata = { title: "Set up payout — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Set up payout</h1>

      <p>
        Preppa uses Stripe to verify your identity and pay you — you don&rsquo;t need your own
        Stripe account. This is required before any of your meals or plans can go live and
        accept paid orders; you can still create drafts before finishing this step.
      </p>

      <h2>1. Start setup</h2>
      <p>
        From My Hub, tap <b>Go live</b> in your dashboard shortcuts, or the payout banner
        shown after your application is approved, then <b>Set up payouts</b>. This opens a
        secure Stripe-hosted flow in your browser.
      </p>

      <h2>2. Verify your identity and bank</h2>
      <p>
        Stripe will ask for your legal name, address, and a government ID, plus your bank
        account (routing and account number) for deposits. Preppa never sees or stores your
        bank details directly — Stripe handles and secures them.
      </p>

      <h2>3. Come back to Preppa</h2>
      <p>
        Once you&rsquo;re done, you&rsquo;re returned to My Hub. It can take a short while for
        Stripe to finish verifying you — once payouts show as enabled, any draft meals or plans
        you&rsquo;ve created can be published and start accepting paid orders.
      </p>

      <h2>Getting paid</h2>
      <p>
        You&rsquo;re credited the full price of what you sell — Preppa&rsquo;s service fee is
        charged to the buyer, not deducted from your payout — plus 100% of any tips. Cash out
        your available balance to your bank anytime from My Hub → Earnings.
      </p>
    </article>
  );
}
