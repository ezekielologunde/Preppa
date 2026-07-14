import type { Metadata } from "next";

export const metadata: Metadata = { title: "How subscriptions work — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">How subscriptions work</h1>

      <p>
        A meal-plan subscription is a standing weekly order with one cook. Instead of ordering a
        meal at a time, you subscribe to a Prepper&rsquo;s plan and get their food on a repeating
        schedule — while staying fully in control of each cycle.
      </p>

      <h2>Subscribing</h2>
      <p>
        Open a Prepper&rsquo;s storefront, choose one of their meal plans, and confirm. Depending
        on how the cook set the plan up, you&rsquo;ll either get a fixed box each week or pick
        which of their dishes you want for the upcoming delivery.
      </p>

      <h2>How billing works</h2>
      <p>
        You&rsquo;re billed <b>per delivery cycle</b>, not all at once when you sign up. Before
        each cycle, your saved payment method is charged for that week&rsquo;s box, and you can see
        exactly what&rsquo;s coming and what it costs. Payments run through Stripe, and Preppa is
        the merchant of record.
      </p>

      <h2>Skip, pause, or cancel</h2>
      <p>
        From your plan-management screen you can:
      </p>
      <ul>
        <li><b>Skip a week</b> — no charge for that cycle; your subscription resumes the next one.</li>
        <li><b>Pause</b> — stop upcoming cycles until you&rsquo;re ready to start again.</li>
        <li><b>Cancel</b> — end the subscription entirely; you won&rsquo;t be billed for future cycles.</li>
      </ul>
      <p>
        Changes apply to cycles that haven&rsquo;t been billed yet — there&rsquo;s an order cutoff
        before each delivery, shown on the plan, after which that week is locked in so your cook can
        shop and prep.
      </p>

      <h2>Changing plans</h2>
      <p>
        You can subscribe to more than one cook, or switch plans whenever you like. Cancelling one
        plan doesn&rsquo;t affect any others you&rsquo;re on.
      </p>

      <h2>If something&rsquo;s wrong with a delivery</h2>
      <p>
        Message your cook directly from the order — most issues are sorted out fastest that way. For
        anything the cook can&rsquo;t resolve, see{" "}
        <a href="/legal/refunds-and-cancellations" className="underline">Refunds &amp; Cancellations</a>.
      </p>
    </article>
  );
}
