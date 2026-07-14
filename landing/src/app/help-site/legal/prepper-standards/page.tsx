import type { Metadata } from "next";

export const metadata: Metadata = { title: "Independent Prepper Standards — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Independent Prepper Standards</h1>
      <p className="text-xs text-ink-soft mb-6">Draft for legal review — last updated 2026 · not legal advice, see note below.</p>

      <p>
        Preppers are independent food providers who run their own kitchens on Preppa — they set their
        own menus, prices, and hours. These standards are what every Prepper commits to so customers
        can order with confidence. They sit alongside the{" "}
        <a href="/legal/cook-agreement" className="underline">Cook Agreement</a>.
      </p>

      <h2>Quality</h2>
      <ul>
        <li>Prepare food fresh and to a standard you&rsquo;d serve your own family.</li>
        <li>Package meals so they arrive in good condition, labeled where appropriate.</li>
        <li>Honor the orders and bookings you accept, and give as much notice as possible if something changes.</li>
      </ul>

      <h2>Transparency</h2>
      <ul>
        <li>Describe dishes accurately — ingredients, portion size, and preparation.</li>
        <li>Disclose major allergens per the <a href="/legal/allergen-policy" className="underline">Allergen Policy</a>.</li>
        <li>Price clearly, with no surprise charges after checkout.</li>
      </ul>

      <h2>Safety &amp; compliance</h2>
      <ul>
        <li>Follow safe food-handling practices — see <a href="/legal/food-safety" className="underline">Food Safety</a>.</li>
        <li>Obtain and maintain the licenses, permits, and certifications required where you cook.</li>
        <li>Verify your identity with Preppa and keep your account details current.</li>
      </ul>

      <h2>Accountability</h2>
      <p>
        Keep orders, payments, and communication on Preppa, respond to customers promptly, and treat
        everyone with respect per the{" "}
        <a href="/guides/community-guidelines" className="underline">Community Guidelines</a>. Preppa
        may review, suspend, or remove kitchens that don&rsquo;t meet these standards.
      </p>

      <div className="mt-10 rounded-2xl border border-orange/25 bg-orange-soft p-5 text-sm">
        <b>Note:</b> this is a starting draft, not legal advice. It has not been reviewed by a lawyer
        or tailored to every jurisdiction — get it reviewed before relying on it.
      </div>
    </article>
  );
}
