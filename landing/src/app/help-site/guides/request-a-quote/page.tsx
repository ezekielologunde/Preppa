import type { Metadata } from "next";

export const metadata: Metadata = { title: "How to request a quote — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">How to request a quote</h1>

      <p>
        Not every order fits a fixed price. For catering, an event, a private dinner, an in-home
        cook, or a large custom box, you can send a Prepper a request and get a quote back before
        anything is booked or charged.
      </p>

      <h2>1. Start a request</h2>
      <p>
        From a service or a cook&rsquo;s storefront, choose <b>Request a quote</b>. Tell the cook
        what you need — the occasion, number of guests, date and time, location or delivery area,
        cuisine or specific dishes, and any dietary needs or allergies.
      </p>

      <h2>2. The cook responds</h2>
      <p>
        Your request goes straight to the Prepper. They can ask follow-up questions in the thread
        and send back a quote with the price and what&rsquo;s included. Nothing is charged while
        you&rsquo;re still discussing.
      </p>

      <h2>3. Accept and pay</h2>
      <p>
        When the quote looks right, you accept it and pay securely through Preppa (payments run
        through Stripe). That confirms the booking for both of you.
      </p>

      <h2>Build-your-own box across cooks</h2>
      <p>
        Some requests can pull dishes from more than one kitchen into a single box. Each cook is
        paid for their own items, and you check out once — Preppa handles splitting it behind the
        scenes.
      </p>

      <h2>Changes and cancellations</h2>
      <p>
        Because quoted work often involves shopping and prep ahead of time, cancellation terms can
        vary by cook and how close it is to the date. The terms that apply are shown before you
        accept — and summarized in{" "}
        <a href="/legal/refunds-and-cancellations" className="underline">Refunds &amp; Cancellations</a>.
      </p>
    </article>
  );
}
