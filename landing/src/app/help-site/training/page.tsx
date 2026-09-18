import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { TrainingVideo } from "@/components/TrainingVideo";

// Served on help.preppa.live: /media/* is rewritten to /help-site/media/* by middleware.ts,
// so the files live under public/help-site/media/.
const VIDEO = "/media/how-preppa-works.mp4";
const POSTER = "/media/how-preppa-works-poster.jpg";
const ORIGIN = "https://help.preppa.live";

const TITLE = "Video training: how Preppa works — Preppa Help";
const DESCRIPTION =
  "A 68-second walkthrough of Preppa for customers and Preppers: find a cook, read the allergens, pay and tip, and track your order — then apply, get paid, post a meal, and take orders.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${ORIGIN}/training`,
    siteName: "Preppa Help",
    type: "website",
    images: [{ url: `${ORIGIN}${POSTER}`, width: 1600, height: 900, alt: "Preppa training video" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${ORIGIN}${POSTER}`] },
};

const VIDEO_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "How Preppa works",
  description: DESCRIPTION,
  thumbnailUrl: [`${ORIGIN}${POSTER}`],
  uploadDate: "2026-09-18",
  duration: "PT1M8S",
  contentUrl: `${ORIGIN}${VIDEO}`,
  embedUrl: `${ORIGIN}/training`,
  publisher: { "@type": "Organization", name: "Preppa", url: "https://preppa.live" },
};

const READ_INSTEAD = [
  { href: "/guides/order-and-track", title: "How to order and track meals", note: "Customers" },
  { href: "/guides/safety-and-food-standards", title: "Safety and food standards", note: "Everyone" },
  { href: "/guides/post-your-first-meal", title: "Post your first meal", note: "Preppers" },
  { href: "/guides/set-up-payout", title: "How to set up payouts", note: "Preppers" },
];

export default function TrainingPage() {
  return (
    <div className="max-w-[1120px] mx-auto px-6 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_JSON_LD) }} />

      <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-soft hover:text-orange transition-colors mb-6">
        <Icon name="chevRight" size={14} className="rotate-180" /> Help Center
      </Link>

      <h1 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-tight text-ink">Video training</h1>
      <p className="mt-2 max-w-2xl text-ink-2 text-[15px] leading-relaxed">
        How Preppa works, in about a minute. First for customers, then for Preppers &mdash; jump to any chapter, or use
        the step-by-step guides below.
      </p>

      <div className="mt-7">
        <TrainingVideo src={VIDEO} poster={POSTER} />
      </div>

      <p className="mt-3 text-[12.5px] text-ink-soft">
        The screens in this video show sample data. Preppa is launching soon &mdash; get on the list at{" "}
        <a href="https://preppa.live" className="underline hover:text-ink">preppa.live</a>.
      </p>

      <h2 className="mt-12 flex items-center gap-2 font-display font-bold text-xl text-ink">
        <Icon name="spark" size={18} className="text-orange" /> Prefer to read?
      </h2>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        {READ_INSTEAD.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3.5 hover:border-orange transition-colors"
          >
            <span className="min-w-0">
              <span className="block text-[14px] font-bold text-ink truncate">{g.title}</span>
              <span className="block text-[12px] text-ink-soft">{g.note}</span>
            </span>
            <Icon name="chevRight" size={16} className="text-ink-soft shrink-0" />
          </Link>
        ))}
      </div>

      <details className="mt-10 rounded-2xl border border-line bg-card p-5 group">
        <summary className="cursor-pointer font-bold text-ink flex items-center gap-2">
          <Icon name="chat" size={16} className="text-orange" /> Text version of this video
        </summary>
        <div className="prose mt-4">
          <p>
            <b>Intro.</b> Somebody down your street is cooking tonight. Preppa: real food from real local Preppas near you.
          </p>

          <h2>For customers</h2>
          <ol>
            <li>
              <b>Find a cook near you.</b> Delivery, pickup, or a private chef. Browse the meals near you and open one.
            </li>
            <li>
              <b>Read every label.</b> Ingredients and allergens are listed up front: the ingredient list, the major
              allergens the meal contains, and a note that it&rsquo;s prepared in a home kitchen where cross-contact may
              occur.
            </li>
            <li>
              <b>Pay online, tip the cook.</b> Pay securely online. 100% of tips go to the cook.
            </li>
            <li>
              <b>Track it, message your cook.</b> Follow every step, from confirmed to delivered.
            </li>
          </ol>

          <h2>For Preppers</h2>
          <ol>
            <li>
              <b>Apply, we review every cook.</b> Confirm your refrigeration and clean-prep basics, add photos of your
              cold storage and cooking area and your food-handler certificate number, and agree to the Cook Agreement.
              Every application is reviewed.
            </li>
            <li>
              <b>Get paid through Stripe.</b> Set up payouts securely &mdash; you don&rsquo;t need your own Stripe account.
            </li>
            <li>
              <b>Post your first meal.</b> Add your dish, its ingredients, and the major allergens it contains. Ingredients
              and allergens are required to publish, and you confirm you reviewed the full recipe.
            </li>
            <li>
              <b>Take orders, get paid.</b> Accept an order and start cooking, mark it ready, then cash out anytime or get
              paid weekly &mdash; balances of $20 or more are sent to your bank automatically, and you can turn that off.
            </li>
          </ol>

          <p>
            <b>Outro.</b> Launching soon at preppa.live. Questions? support@preppa.live.
          </p>
        </div>
      </details>
    </div>
  );
}
