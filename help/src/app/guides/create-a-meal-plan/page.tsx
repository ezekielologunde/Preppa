import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create a meal plan — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Create a meal plan</h1>

      <p>
        A meal plan turns your menu into a weekly subscription — customers get meals delivered
        on your schedule instead of ordering one at a time. From My Hub → Meal plans → Create a
        plan:
      </p>

      <h2>1. Choose how it works</h2>
      <p>Pick one of two models:</p>
      <ul>
        <li>
          <b>Fixed box</b> — you decide exactly which meals go in each week&rsquo;s delivery.
        </li>
        <li>
          <b>Customer picks</b> — you set a per-meal price and a menu; customers choose which
          of your dishes they want each week.
        </li>
      </ul>

      <h2>2. Add your meals</h2>
      <p>
        Select from your existing live menu. For a customer-choice plan, every meal you check
        becomes something customers can pick from.
      </p>

      <h2>3. Set delivery and capacity</h2>
      <p>
        Choose your delivery day(s) and a weekly capacity cap so you never oversell what you
        can actually cook.
      </p>

      <h2>4. Add the details customers see</h2>
      <p>
        A cover photo, servings per meal, dietary tags, and allergen warnings (shown to
        customers with a caution highlight).
      </p>

      <h2>5. Advanced options (optional)</h2>
      <p>
        Collapsed by default — order cutoff time, lead time before the first box, a minimum
        commitment in weeks, or an intro-trial price for the first few weeks.
      </p>

      <h2>Publish</h2>
      <p>
        Once published, customers can subscribe from your storefront. Billing happens per
        delivery cycle, not all at signup — customers can skip a week, pause, or cancel anytime
        from their own plan management screen.
      </p>
    </article>
  );
}
