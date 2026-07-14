import type { Metadata } from "next";

export const metadata: Metadata = { title: "Community guidelines — Preppa Help" };

export default function Page() {
  return (
    <article className="prose">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Community guidelines</h1>

      <p>
        Preppa works because neighbors trust neighbors. These guidelines keep it respectful,
        reliable, and safe for everyone — customers and Preppers alike.
      </p>

      <h2>Be respectful</h2>
      <p>
        Treat cooks, customers, and staff with courtesy in messages, reviews, and at handoff. No
        harassment, hate, threats, or discrimination of any kind.
      </p>

      <h2>Be honest</h2>
      <ul>
        <li><b>Cooks:</b> describe your food accurately — ingredients, portion, and prep. Don&rsquo;t misrepresent what you&rsquo;re selling.</li>
        <li><b>Customers:</b> leave reviews based on real orders, and communicate clearly about timing and handoff.</li>
      </ul>

      <h2>Be reliable</h2>
      <p>
        Show up for what you commit to. Cooks should honor orders they accept and give as much
        notice as possible if something changes; customers should be reachable for pickup or
        delivery windows they choose.
      </p>

      <h2>Keep it on Preppa</h2>
      <p>
        Keep orders, payments, and messages on the platform. It&rsquo;s how payments stay secure,
        issues can be resolved, and both sides are protected. Taking payment off-platform isn&rsquo;t
        allowed.
      </p>

      <h2>Reviews</h2>
      <p>
        Reviews should be genuine and about your own experience. Don&rsquo;t post fake reviews, trade
        reviews, or use them to threaten or pressure anyone.
      </p>

      <h2>Enforcement</h2>
      <p>
        Breaking these guidelines can lead to content removal or account suspension — see the{" "}
        <a href="/legal/terms" className="underline">Terms of Service</a> and{" "}
        <a href="/legal/cook-agreement" className="underline">Cook Agreement</a>. To report something,{" "}
        <a href="/contact" className="underline">contact us</a>.
      </p>
    </article>
  );
}
