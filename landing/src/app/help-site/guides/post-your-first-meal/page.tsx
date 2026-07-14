import type { Metadata } from "next";

export const metadata: Metadata = { title: "Post your first meal — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Post your first meal</h1>

      <h2>Before you start</h2>
      <p>
        You&rsquo;ll need an approved kitchen. If your application is still pending, you can
        set up your kitchen and drafts, but a meal won&rsquo;t go live for customers until your
        application is approved and payouts are set up (see{" "}
        <a href="/guides/set-up-payout" className="underline">
          Set up payout
        </a>
        ).
      </p>

      <h2>1. Add a photo or record a video</h2>
      <p>
        From My Hub, tap <b>Add meal</b>. You can upload a photo of the dish, or record a short
        video right in the app — tap Record, hold to capture (up to 60 seconds), then review
        before you use it. A still frame is captured automatically as the cover image.
      </p>

      <h2>2. Fill in the details</h2>
      <p>Give your dish a name, a short description that tells its story, and set:</p>
      <ul>
        <li>Price and how many it serves</li>
        <li>Category (e.g. Comfort, Pasta, Healthy)</li>
        <li>Dietary tags — vegetarian, gluten-free, halal, dairy-free, nut-free</li>
        <li>How many you can make that day</li>
      </ul>

      <h2>3. Publish</h2>
      <p>
        Tap <b>Publish meal</b>. If your payouts are already set up, it goes live immediately —
        customers can find and order it right away. If payouts aren&rsquo;t set up yet, it
        saves as a draft on your menu instead; you&rsquo;ll see it, but customers won&rsquo;t
        until you finish payout setup and come back to publish it.
      </p>

      <h2>After it&rsquo;s live</h2>
      <p>
        Your meal shows up on your storefront and in the main feed. You can pause it anytime
        from My Hub → My menu, and orders will start appearing in My Hub → Orders as they come
        in.
      </p>
    </article>
  );
}
