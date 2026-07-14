import type { Metadata } from "next";

export const metadata: Metadata = { title: "Safety and food standards — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Safety and food standards</h1>

      <p>
        Preppa connects you with independent home cooks, so trust matters. Here&rsquo;s what we do
        before a cook can sell, and what we ask of every kitchen. This is a practical overview — the
        formal policy lives in{" "}
        <a href="/legal/food-safety" className="underline">Food Safety</a> and the{" "}
        <a href="/legal/prepper-standards" className="underline">Independent Prepper Standards</a>.
      </p>

      <h2>Verifying cooks</h2>
      <p>
        Every Prepper goes through identity verification before their kitchen goes live. We review
        applications, and cooks are approved individually — Preppa can suspend or remove a kitchen
        if standards aren&rsquo;t met.
      </p>

      <h2>What we ask of every kitchen</h2>
      <ul>
        <li>Prepare food in clean conditions with safe handling, storage, and temperatures.</li>
        <li>Describe dishes honestly, including ingredients and preparation.</li>
        <li>Disclose major allergens — see our <a href="/legal/allergen-policy" className="underline">Allergen Policy</a>.</li>
        <li>Follow the food rules and permits that apply where they cook.</li>
      </ul>

      <h2>What Preppa does and doesn&rsquo;t do</h2>
      <p>
        Preppa is a marketplace — we don&rsquo;t cook, handle, or inspect food ourselves, and we
        don&rsquo;t certify or guarantee any kitchen or dish. Cooks are independently responsible for
        the food they make and for meeting the requirements in their area.
      </p>

      <h2>Allergies</h2>
      <p>
        If you have a food allergy, read the dish details and allergen notes, and message the cook
        before ordering. Home kitchens handle many ingredients, so cross-contact is possible even
        when an allergen isn&rsquo;t listed.
      </p>

      <h2>Reporting a concern</h2>
      <p>
        If a meal or a kitchen ever seems unsafe, stop and{" "}
        <a href="/contact" className="underline">let us know</a>. We take safety reports seriously and
        review the kitchens involved.
      </p>
    </article>
  );
}
