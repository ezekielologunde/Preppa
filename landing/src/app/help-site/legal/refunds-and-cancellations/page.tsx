import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refunds & Cancellations — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Refunds &amp; Cancellations</h1>
      <p className="text-xs text-ink-soft mb-6">Draft for legal review — last updated 2026 · not legal advice, see note below.</p>

      <p>
        Because homemade food is prepared fresh — often shopped for and cooked ahead of time — how
        cancellations and refunds work depends on the type of order. The exact terms for any order
        are shown before you pay.
      </p>

      <h2>One-off meals</h2>
      <p>
        You can cancel before the cook&rsquo;s order cutoff (shown at checkout) for a full refund.
        After the cutoff, the cook may already be shopping or cooking, so cancellation may not be
        possible. If a meal arrives wrong or a cook cancels on their end, you&rsquo;re refunded.
      </p>

      <h2>Meal-plan subscriptions</h2>
      <p>
        You&rsquo;re billed per delivery cycle. Skip, pause, or cancel any cycle before its cutoff
        and you won&rsquo;t be charged for it. Once a cycle is past cutoff and billed, that
        week&rsquo;s box is locked in. See{" "}
        <a href="/guides/how-subscriptions-work" className="underline">How subscriptions work</a>.
      </p>

      <h2>Quotes, catering, and booked services</h2>
      <p>
        Custom and booked work (catering, events, private dining, in-home cooking) often requires
        planning and shopping in advance, so these can carry their own cancellation terms and lead
        times. The terms that apply are presented before you accept the quote.
      </p>

      <h2>When something goes wrong</h2>
      <p>
        Message your cook first — most problems are resolved fastest directly. If you can&rsquo;t
        reach a resolution, <a href="/contact" className="underline">contact Preppa support</a> and
        we&rsquo;ll help. Refunds are issued to your original payment method through Stripe.
      </p>

      <div className="mt-10 rounded-2xl border border-orange/25 bg-orange-soft p-5 text-sm">
        <b>Note:</b> this is a starting draft, not legal advice. It has not been reviewed by a lawyer
        or tailored to every jurisdiction Preppa operates in — get it reviewed before relying on it.
      </div>
    </article>
  );
}
