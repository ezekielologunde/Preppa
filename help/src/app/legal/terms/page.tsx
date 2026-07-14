import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
      <p className="text-xs text-ink-soft mb-6">Draft template — last updated 2026 · not legal advice, see note below.</p>

      <h2>1. What Preppa is</h2>
      <p>
        Preppa is a marketplace that connects customers with independent home cooks
        (&ldquo;Preppas&rdquo;) for homemade meals, weekly meal-plan subscriptions, and
        food-related services like private dinners and catering. Preppa does not cook, prepare,
        or handle food itself — every listing is created and fulfilled by the individual cook.
      </p>

      <h2>2. Accounts</h2>
      <p>
        You must provide accurate information when creating an account and keep it up to date.
        You&rsquo;re responsible for activity under your account and for keeping your
        credentials secure.
      </p>

      <h2>3. Orders and payments</h2>
      <p>
        Preppa is the merchant of record for orders placed through the app. Payments are
        processed by Stripe; by placing an order you agree to Stripe&rsquo;s terms in addition
        to ours. Prices, fees, and any service charges are shown before you confirm an order.
      </p>

      <h2>4. Cooks and listings</h2>
      <p>
        Cooks are independently responsible for the food they prepare, its safety, and
        compliance with applicable law — see our{" "}
        <a href="/legal/cook-agreement" className="underline">
          Cook Agreement
        </a>{" "}
        for the specific commitments every cook agrees to. Preppa reviews applications but does
        not certify or guarantee any kitchen or dish.
      </p>

      <h2>5. Content you post</h2>
      <p>
        If you post photos, videos, reviews, or messages, you&rsquo;re responsible for that
        content and confirm you have the right to share it. Don&rsquo;t post anything false,
        harmful, or that infringes someone else&rsquo;s rights.
      </p>

      <h2>6. Cancellations and refunds</h2>
      <p>
        Cancellation and refund handling depends on the order type (one-off meal, meal-plan
        cycle, or booked service) and is described at the point of purchase.
      </p>

      <h2>7. Account suspension</h2>
      <p>
        We may suspend or remove an account for violating these terms, the Cook Agreement, or
        for safety or fraud concerns.
      </p>

      <h2>8. Changes to these terms</h2>
      <p>
        We may update these Terms as Preppa evolves. Continued use of Preppa after an update
        means you accept the revised terms.
      </p>

      <h2>9. Contact</h2>
      <p>Questions about these terms — reach us through the in-app support ticket system.</p>

      <div className="mt-10 rounded-2xl border border-orange-soft bg-orange-soft/40 p-5 text-sm">
        <b>Note:</b> this is a starting draft, not legal advice. It has not been reviewed by a
        lawyer or tailored to every jurisdiction Preppa operates in — get it reviewed before
        relying on it.
      </div>
    </article>
  );
}
