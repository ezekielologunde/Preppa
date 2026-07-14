import type { Metadata } from "next";

export const metadata: Metadata = { title: "Food Safety — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Food Safety</h1>
      <p className="text-xs text-ink-soft mb-6">Draft for legal review — last updated 2026 · not legal advice, see note below.</p>

      <p>
        Preppa is a marketplace for food made by independent home cooks. Preppa does not cook,
        handle, store, or transport food, and does not inspect kitchens or certify dishes. Cooks are
        independently responsible for the safety of the food they prepare and for complying with the
        food-safety laws and permits that apply where they operate.
      </p>

      <h2>What we ask of every cook</h2>
      <ul>
        <li>Follow safe food-handling practices for preparation, storage, temperature, and transport.</li>
        <li>Maintain clean preparation conditions.</li>
        <li>Describe dishes and ingredients accurately, and disclose major allergens — see the <a href="/legal/allergen-policy" className="underline">Allergen Policy</a>.</li>
        <li>Obtain and keep any licenses, permits, or certifications required in their area.</li>
      </ul>
      <p>
        These commitments are part of the{" "}
        <a href="/legal/cook-agreement" className="underline">Cook Agreement</a> and the{" "}
        <a href="/legal/prepper-standards" className="underline">Independent Prepper Standards</a>.
      </p>

      <h2>Verification, not a guarantee</h2>
      <p>
        We verify a cook&rsquo;s identity and review applications before a kitchen goes live, and we
        can suspend or remove kitchens that don&rsquo;t meet our standards. This is not a health
        inspection and is not a guarantee of any kitchen or dish.
      </p>

      <h2>Your part as a customer</h2>
      <p>
        Read dish details and allergen notes, and message the cook with any questions before
        ordering. If you have a food allergy, take extra care — home kitchens handle many
        ingredients and cross-contact is possible. Store and reheat food promptly and safely.
      </p>

      <h2>Reporting a safety concern</h2>
      <p>
        If you believe a meal or kitchen is unsafe, stop and{" "}
        <a href="/contact" className="underline">report it to us</a> right away. We review every
        safety report and the kitchens involved.
      </p>

      <div className="mt-10 rounded-2xl border border-orange/25 bg-orange-soft p-5 text-sm">
        <b>Note:</b> this is a starting draft, not legal advice. Food-safety and cottage-food rules
        vary widely by location — have this reviewed and tailored before relying on it.
      </div>
    </article>
  );
}
