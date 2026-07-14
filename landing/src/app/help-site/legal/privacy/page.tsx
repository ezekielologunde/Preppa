import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-xs text-ink-soft mb-6">Draft template — last updated 2026 · not legal advice, see note below.</p>

      <h2>1. What we collect</h2>
      <ul>
        <li>Account details you provide: name, email, phone, delivery addresses.</li>
        <li>Order and payment activity (payment details themselves are handled by Stripe — Preppa does not store card numbers).</li>
        <li>For cooks: kitchen details, identity-verification documents, and bank information (verified and held by Stripe, not Preppa).</li>
        <li>Content you choose to post — photos, videos, messages, reviews.</li>
        <li>Basic device and usage information to keep the app working and secure.</li>
      </ul>

      <h2>2. How we use it</h2>
      <p>
        To operate the marketplace: process orders and payouts, connect you with cooks or
        customers, verify cook identity before payouts, send order and account notifications,
        and improve the app.
      </p>

      <h2>3. Who we share it with</h2>
      <p>
        Stripe (payments and identity verification), and the other party to a transaction —
        e.g. a cook sees the customer&rsquo;s delivery address and order details for orders they
        need to fulfill. We don&rsquo;t sell your personal information.
      </p>

      <h2>4. Your choices</h2>
      <p>
        You can review and update most of your information from your account settings, and
        request account deletion at any time. Deleting your account removes your profile and
        personal data, subject to what we&rsquo;re legally required to keep (e.g. transaction
        records for tax purposes).
      </p>

      <h2>5. Data security</h2>
      <p>
        We use industry-standard safeguards, and sensitive financial/identity data is handled
        by Stripe rather than stored directly by Preppa.
      </p>

      <h2>6. Children</h2>
      <p>Preppa is not directed at children, and accounts require being of legal age to contract in your jurisdiction.</p>

      <h2>7. Changes to this policy</h2>
      <p>We may update this policy as Preppa evolves; continued use after an update means you accept the revised policy.</p>

      <h2>8. Contact</h2>
      <p>Questions about your data — reach us through the in-app support ticket system.</p>

      <div className="mt-10 rounded-2xl border border-orange-soft bg-orange-soft/40 p-5 text-sm">
        <b>Note:</b> this is a starting draft, not legal advice. It has not been reviewed by a
        lawyer or tailored to every privacy law that may apply (e.g. CCPA, GDPR) — get it
        reviewed before relying on it.
      </div>
    </article>
  );
}
