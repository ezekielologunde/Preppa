import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cook Agreement — Preppa Help" };

// Reused verbatim from preppa-app/src/lib/cookAgreement.ts — keep these two files in sync.
const COOK_AGREEMENT_VERSION = "2026-07-draft-2";

const CLAUSES = [
  {
    title: "Truthful information",
    body: "Everything you submit in your application — your identity, address, kitchen details, and food-safety answers — is true and current, and you will keep it up to date.",
  },
  {
    title: "Legal compliance",
    body: "You are responsible for knowing and following all laws that apply to selling homemade food where you live (including cottage-food / home-kitchen rules, permits, labeling, and tax obligations). You will obtain any license or permit your jurisdiction requires.",
  },
  {
    title: "Food safety",
    body: "You are responsible for safe food handling: clean preparation surfaces, proper handwashing, avoiding cross-contamination, and adequate hot/cold storage and transport (keeping cold foods cold and hot foods hot). You will not sell food you would not serve your own family.",
  },
  {
    title: "Allergens & honesty",
    body: "You will accurately describe your dishes and disclose common allergens on request. You will not misrepresent ingredients.",
  },
  {
    title: "Not a certification",
    body: "Preppa reviews applications to build trust, but Preppa does not certify, guarantee, or warrant the safety of your kitchen or your food. Your listings are yours, not Preppa's.",
  },
  {
    title: "Responsibility & indemnity",
    body: "You are responsible for any claim, injury, illness, loss, or damage arising from the food you sell. To the fullest extent permitted by law, you agree to indemnify and hold Preppa harmless from any such claims.",
  },
  {
    title: "Standards & suspension",
    body: "You will treat buyers respectfully and honestly. Preppa may pause, suspend, or remove your kitchen at any time — including for safety concerns, complaints, or violations of this agreement.",
  },
  {
    title: "Payments",
    body: "Payouts are handled by our payments provider (Stripe). You agree to complete any identity/bank verification the provider requires before receiving funds.",
  },
  {
    title: "Cooking in someone's home",
    body: "If you cook at a buyer's home (private-chef or event bookings), you will conduct yourself professionally, respect the household and its property, and follow safe food handling in their kitchen. You are responsible for your own conduct and any equipment you bring.",
  },
];

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Preppa Cook Agreement</h1>
      <p className="text-xs text-ink-soft mb-6">Version {COOK_AGREEMENT_VERSION} · Draft template, not legal advice — see note below.</p>

      <p>
        Preppa is a marketplace that connects home cooks with neighbors. Preppa does not cook,
        prepare, inspect, or handle any food. You, the cook, are the sole producer of your food
        and are solely responsible for it. By applying to cook on Preppa you agree:
      </p>

      <ol>
        {CLAUSES.map((c) => (
          <li key={c.title}>
            <b>{c.title}.</b> {c.body}
          </li>
        ))}
      </ol>

      <p>You confirm you have read and agree to this Cook Agreement and Preppa&rsquo;s Terms.</p>

      <div className="mt-10 rounded-2xl border border-orange-soft bg-orange-soft/40 p-5 text-sm">
        <b>Note:</b> this is a starting draft, not legal advice. It has not been reviewed by a
        lawyer or localized to every jurisdiction&rsquo;s cottage-food / home-kitchen laws — get
        it reviewed before relying on it.
      </div>
    </article>
  );
}
