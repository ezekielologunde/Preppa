import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accessibility — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Accessibility</h1>
      <p className="text-xs text-ink-soft mb-6">Draft for legal review — last updated 2026 · not legal advice, see note below.</p>

      <p>
        We want Preppa to be usable by everyone, including people who rely on assistive technology.
        Accessibility is an ongoing effort, and we&rsquo;re improving as the product grows.
      </p>

      <h2>What we&rsquo;re working toward</h2>
      <ul>
        <li>Clear text with readable contrast in both the app and this help center.</li>
        <li>Labels and roles so screen readers can describe controls and navigation.</li>
        <li>Full keyboard access with visible focus, and support for reduced-motion preferences.</li>
        <li>Touch targets sized for comfortable use on mobile.</li>
      </ul>
      <p>
        We aim toward the WCAG 2.2 AA guidelines where practical, and treat gaps against them as
        things to fix.
      </p>

      <h2>Report an accessibility issue</h2>
      <p>
        If something is hard to use with assistive technology, or you hit a barrier anywhere on
        Preppa, please <a href="/contact" className="underline">let us know</a>. Tell us what you
        were trying to do, the device and assistive tech you were using, and where it happened —
        it genuinely helps us prioritize fixes.
      </p>

      <div className="mt-10 rounded-2xl border border-orange/25 bg-orange-soft p-5 text-sm">
        <b>Note:</b> this is a starting draft describing our intent and is not a formal conformance
        claim or legal advice. Have it reviewed before relying on it.
      </div>
    </article>
  );
}
