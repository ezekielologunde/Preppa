import type { Metadata } from "next";

export const metadata: Metadata = { title: "Allergen Policy — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Allergen Policy</h1>
      <p className="text-xs text-ink-soft mb-6">Draft for legal review — last updated 2026 · not legal advice, see note below.</p>

      <p>
        Food on Preppa is made in independent home kitchens that handle a wide range of ingredients.
        This policy explains how allergens are disclosed and what customers and cooks are each
        responsible for.
      </p>

      <h2>What cooks must disclose</h2>
      <p>
        When listing a dish or meal plan, cooks are asked to identify major allergens present in the
        food. Meal plans surface allergen warnings to customers with a caution highlight. Cooks must
        describe ingredients honestly and keep listings up to date if a recipe changes.
      </p>

      <h2>Cross-contact</h2>
      <p>
        Home kitchens are not allergen-free environments. Even when an allergen isn&rsquo;t listed as
        an ingredient, cross-contact is possible through shared surfaces, utensils, and equipment.
        Preppa cannot guarantee any dish is free of a given allergen.
      </p>

      <h2>Your part as a customer</h2>
      <ul>
        <li>Read the dish details and allergen notes before ordering.</li>
        <li>Message the cook about your specific allergy and its severity — they can tell you what they can and can&rsquo;t safely accommodate.</li>
        <li>If an allergy is severe, use your own judgment about whether a home-kitchen preparation is right for you.</li>
      </ul>

      <h2>Reporting a problem</h2>
      <p>
        If a dish&rsquo;s allergen information appears wrong or incomplete,{" "}
        <a href="/contact" className="underline">tell us</a> so we can follow up with the cook.
      </p>

      <div className="mt-10 rounded-2xl border border-orange/25 bg-orange-soft p-5 text-sm">
        <b>Note:</b> this is a starting draft, not legal advice. Allergen-labeling requirements vary
        by location — have this reviewed before relying on it.
      </div>
    </article>
  );
}
