import type { Metadata } from "next";

export const metadata: Metadata = { title: "How to order and track meals — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">How to order and track meals</h1>

      <h2>1. Find a cook near you</h2>
      <p>
        Browse Preppers in your area, open a storefront, and see their menu, prices, and what
        they&rsquo;re offering this week. Every cook is an ID-verified local — see{" "}
        <a href="/guides/safety-and-food-standards" className="underline">Safety and food standards</a>.
      </p>

      <h2>2. Add meals and check out</h2>
      <p>
        Add what you want to your cart and check out. Payment is online and secure through Stripe —
        there&rsquo;s no cash-on-delivery. Prices and any fees are shown before you confirm, and
        100% of any tip goes to the cook.
      </p>

      <h2>3. Choose pickup or delivery</h2>
      <p>
        At checkout you pick how you&rsquo;ll get your food:
      </p>
      <ul>
        <li><b>Pickup</b> — collect from the cook&rsquo;s pickup spot at the time they set.</li>
        <li><b>Delivery</b> — get it dropped at your address, where the cook offers it.</li>
      </ul>

      <h2>4. Track and message</h2>
      <p>
        Follow your order&rsquo;s status from your orders screen. You can message your cook directly
        about timing, handoff, or any special instructions — the thread stays with the order.
      </p>

      <h2>5. After your meal</h2>
      <p>
        Leave a review to help other neighbors and the cook. Liked it? Reorder in a couple of taps,
        or subscribe to their weekly plan — see{" "}
        <a href="/guides/how-subscriptions-work" className="underline">How subscriptions work</a>.
      </p>

      <div className="mt-10 rounded-2xl border border-line bg-card p-5 text-sm">
        <b>Something go wrong?</b> Message your cook first — it&rsquo;s usually the fastest fix. For
        anything unresolved, see{" "}
        <a href="/legal/refunds-and-cancellations" className="underline">Refunds &amp; Cancellations</a>.
      </div>
    </article>
  );
}
