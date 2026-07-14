import { Reveal } from "./Reveal";

/** Replaces the old fake partner-logo strip + invented "1,000+ cooks" stat — honest
 * founding-cohort framing instead of fabricated scale. */
export function FoundingCohort() {
  return (
    <section className="border-y border-line bg-surface">
      <Reveal className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <span className="w-2 h-2 rounded-full bg-green" />
        <p className="text-sm font-semibold text-ink-2">
          Now live with our founding cohort of cooks in{" "}
          <span className="text-ink font-bold">Atlanta, GA</span> — more cities soon.
        </p>
      </Reveal>
    </section>
  );
}
