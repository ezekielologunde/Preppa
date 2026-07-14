import Link from "next/link";

const CARDS = [
  {
    href: "/guides/post-your-first-meal",
    title: "Post your first meal",
    body: "Photo or video, price it, and publish — what to expect start to finish.",
  },
  {
    href: "/guides/create-a-meal-plan",
    title: "Create a meal plan",
    body: "Turn your menu into a weekly subscription customers can join.",
  },
  {
    href: "/guides/set-up-payout",
    title: "Set up payout",
    body: "Connect a bank account so Preppa can pay you, verified through Stripe.",
  },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl md:text-[40px] font-extrabold tracking-tight mb-3">
        How can we help?
      </h1>
      <p className="text-lg text-ink-2 mb-10">
        Guides for cooking on Preppa, plus our Terms, Privacy Policy, and Cook Agreement.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-2xl border border-line-2 bg-surface p-6 hover:border-orange transition-colors"
          >
            <h3 className="font-extrabold mb-1.5">{c.title}</h3>
            <p className="text-sm text-ink-soft leading-relaxed">{c.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
