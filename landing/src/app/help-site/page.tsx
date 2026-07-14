"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";

type Cat = "all" | "customers" | "preppers" | "payments" | "safety";

const GUIDES: {
  href: string;
  title: string;
  body: string;
  icon: Parameters<typeof Icon>[0]["name"];
  cats: Cat[];
}[] = [
  { href: "/guides/post-your-first-meal", title: "How to post your first meal", body: "List your meal, set your price, and reach local customers.", icon: "chefhat", cats: ["preppers"] },
  { href: "/guides/create-a-meal-plan", title: "How to create a meal plan", body: "Build weekly meal plans that save time and keep your customers fed.", icon: "repeat", cats: ["preppers"] },
  { href: "/guides/how-subscriptions-work", title: "How subscriptions work", body: "Recurring orders, per-cycle billing, and how to skip, pause, or cancel.", icon: "repeat", cats: ["customers", "payments"] },
  { href: "/guides/set-up-payout", title: "How to set up payouts", body: "Connect your payout method through Stripe and get paid securely.", icon: "card", cats: ["preppers", "payments"] },
  { href: "/guides/request-a-quote", title: "How to request a quote", body: "Get custom pricing for catering, events, and bulk or in-home orders.", icon: "users", cats: ["customers"] },
  { href: "/guides/order-and-track", title: "How to order and track meals", body: "Place an order, choose delivery or pickup, and message your cook.", icon: "bag", cats: ["customers"] },
  { href: "/guides/safety-and-food-standards", title: "Safety and food standards", body: "How Preppa reviews cook applications and what we ask of every kitchen.", icon: "shield", cats: ["safety"] },
  { href: "/guides/community-guidelines", title: "Community guidelines", body: "How we keep Preppa respectful, reliable, and trustworthy.", icon: "chat", cats: ["safety"] },
];

const LEGAL = [
  { href: "/legal/privacy", title: "Privacy Policy", note: "What we collect and why." },
  { href: "/legal/terms", title: "Terms of Service", note: "The rules for using Preppa." },
  { href: "/legal/refunds-and-cancellations", title: "Refunds & Cancellations", note: "How refunds work by order type." },
  { href: "/legal/food-safety", title: "Food Safety", note: "Our safe-handling standards." },
  { href: "/legal/allergen-policy", title: "Allergen Policy", note: "How allergens are disclosed." },
  { href: "/legal/accessibility", title: "Accessibility", note: "Our commitment and how to report issues." },
  { href: "/legal/cook-agreement", title: "Cook Agreement", note: "What every Prepper commits to." },
  { href: "/legal/prepper-standards", title: "Independent Prepper Standards", note: "Quality, transparency, and accountability." },
];

const SIDEBAR: { label: string; icon: Parameters<typeof Icon>[0]["name"]; cat?: Cat; anchor?: string }[] = [
  { label: "Learning Center", icon: "spark", cat: "all" },
  { label: "For Customers", icon: "users", cat: "customers" },
  { label: "For Preppers", icon: "chefhat", cat: "preppers" },
  { label: "Payments & Payouts", icon: "card", cat: "payments" },
  { label: "Safety", icon: "shield", cat: "safety" },
  { label: "Legal & Compliance", icon: "check", anchor: "#legal" },
  { label: "Resources", icon: "chat", anchor: "#resources" },
];

const POPULAR = [
  { href: "/guides/post-your-first-meal", label: "How to become a Prepper" },
  { href: "/guides/set-up-payout", label: "Payout processing times" },
  { href: "/guides/order-and-track", label: "Delivery & pickup policies" },
  { href: "/guides/how-subscriptions-work", label: "Subscription management" },
];

const CHIPS: { key: Cat; label: string }[] = [
  { key: "all", label: "All" },
  { key: "customers", label: "Customers" },
  { key: "preppers", label: "Preppers" },
  { key: "payments", label: "Payments" },
  { key: "safety", label: "Safety" },
];

export default function HelpHome() {
  const [cat, setCat] = useState<Cat>("all");
  const [q, setQ] = useState("");

  const guides = useMemo(() => {
    const query = q.trim().toLowerCase();
    return GUIDES.filter(
      (g) =>
        (cat === "all" || g.cats.includes(cat)) &&
        (query === "" || (g.title + " " + g.body).toLowerCase().includes(query)),
    );
  }, [cat, q]);

  const legal = useMemo(() => {
    const query = q.trim().toLowerCase();
    return LEGAL.filter((l) => query === "" || (l.title + " " + l.note).toLowerCase().includes(query));
  }, [q]);

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 grid gap-8 lg:grid-cols-[212px_1fr] xl:grid-cols-[212px_1fr_296px]">
      {/* ── Left sidebar ── */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-line bg-panel p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft px-3 pt-2 pb-3">Help Center</p>
          <nav className="flex flex-col gap-0.5">
            {SIDEBAR.map((s) =>
              s.anchor ? (
                <a key={s.label} href={s.anchor} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-ink-2 hover:bg-white/5 hover:text-ink transition-colors">
                  <Icon name={s.icon} size={16} /> {s.label}
                </a>
              ) : (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setCat(s.cat!)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-left transition-colors ${
                    cat === s.cat ? "bg-orange-soft text-orange" : "text-ink-2 hover:bg-white/5 hover:text-ink"
                  }`}
                >
                  <Icon name={s.icon} size={16} /> {s.label}
                </button>
              ),
            )}
          </nav>
          <div className="mt-3 rounded-xl border border-line bg-card-2 p-4">
            <p className="text-[13px] font-bold text-ink">Need help?</p>
            <p className="text-[12px] text-ink-soft mt-1 leading-relaxed">Send us the details and we&rsquo;ll reply by email.</p>
            <Link href="/support" className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-orange hover:text-orange-press">
              Contact support <Icon name="chevRight" size={13} />
            </Link>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main id="guides" className="min-w-0">
        <h1 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-tight text-ink">
          Learning Help Center
        </h1>
        <p className="mt-2 text-ink-2 text-[15px]">
          Guides, legal information, and support resources for using Preppa with confidence.
        </p>

        <div className="mt-6 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"><Icon name="search" size={18} /></span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guides, policies, and help articles"
            aria-label="Search the help center"
            className="w-full h-13 pl-12 pr-4 rounded-2xl border border-line bg-card text-ink text-[15px] placeholder:text-ink-soft outline-none focus:border-orange transition-colors"
            style={{ height: "3.25rem" }}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCat(c.key)}
              aria-pressed={cat === c.key}
              className={`h-9 px-4 rounded-full text-[13px] font-semibold border transition-colors ${
                cat === c.key ? "bg-orange text-white border-orange" : "bg-card border-line text-ink-2 hover:text-ink hover:border-line-2"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Guide cards */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {guides.map((g) => (
            <Link key={g.href} href={g.href} className="group rounded-2xl border border-line bg-card p-5 hover:border-orange transition-colors">
              <span className="w-10 h-10 rounded-xl bg-orange-soft text-orange flex items-center justify-center mb-3">
                <Icon name={g.icon} size={19} />
              </span>
              <h3 className="font-bold text-ink leading-snug">{g.title}</h3>
              <p className="text-[13px] text-ink-soft leading-relaxed mt-1.5">{g.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-orange group-hover:gap-2 transition-all">
                Read guide <Icon name="chevRight" size={13} />
              </span>
            </Link>
          ))}
          {guides.length === 0 ? (
            <p className="text-sm text-ink-soft col-span-full py-6">No guides match that — try a different search or category.</p>
          ) : null}
        </div>

        {/* Legal & Compliance */}
        <h2 id="legal" className="mt-12 flex items-center gap-2 font-display font-bold text-xl text-ink scroll-mt-24">
          <Icon name="shield" size={18} className="text-orange" /> Legal &amp; Compliance
        </h2>
        <p className="text-[13px] text-ink-soft mt-1">Some policies are drafts pending legal review — each page says so at the top.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {legal.map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3.5 hover:border-orange transition-colors">
              <span className="min-w-0">
                <span className="block text-[14px] font-bold text-ink truncate">{l.title}</span>
                <span className="block text-[12px] text-ink-soft truncate">{l.note}</span>
              </span>
              <Icon name="chevRight" size={16} className="text-ink-soft shrink-0" />
            </Link>
          ))}
        </div>

        {/* Other Resources */}
        <h2 id="resources" className="mt-12 flex items-center gap-2 font-display font-bold text-xl text-ink scroll-mt-24">
          <Icon name="spark" size={18} className="text-orange" /> Other Resources
        </h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link href="/faq" className="rounded-xl border border-line bg-card px-4 py-4 hover:border-orange transition-colors">
            <p className="text-[14px] font-bold text-ink">FAQ</p>
            <p className="text-[12px] text-ink-soft mt-0.5">Answers to common questions</p>
          </Link>
          <Link href="/support" className="rounded-xl border border-line bg-card px-4 py-4 hover:border-orange transition-colors">
            <p className="text-[14px] font-bold text-ink">Contact Support</p>
            <p className="text-[12px] text-ink-soft mt-0.5">Send us a request</p>
          </Link>
          <Link href="/guides/post-your-first-meal" className="rounded-xl border border-line bg-card px-4 py-4 hover:border-orange transition-colors">
            <p className="text-[14px] font-bold text-ink">Creator Tips</p>
            <p className="text-[12px] text-ink-soft mt-0.5">Grow as a Prepper</p>
          </Link>
          <Link href="/guides/set-up-payout" className="rounded-xl border border-line bg-card px-4 py-4 hover:border-orange transition-colors">
            <p className="text-[14px] font-bold text-ink">Payout Checklist</p>
            <p className="text-[12px] text-ink-soft mt-0.5">Get set up to get paid</p>
          </Link>
          <div className="rounded-xl border border-line bg-card px-4 py-4 opacity-60">
            <p className="text-[14px] font-bold text-ink flex items-center gap-2">Mobile app <span className="text-[9px] font-bold uppercase tracking-wide bg-card-2 text-ink-soft px-1.5 py-0.5 rounded-full">Soon</span></p>
            <p className="text-[12px] text-ink-soft mt-0.5">iOS &amp; Android</p>
          </div>
          <a href="https://www.instagram.com/preppa.live" target="_blank" rel="noreferrer" className="rounded-xl border border-line bg-card px-4 py-4 hover:border-orange transition-colors">
            <p className="text-[14px] font-bold text-ink">Community</p>
            <p className="text-[12px] text-ink-soft mt-0.5">@preppa.live on socials</p>
          </a>
        </div>
      </main>

      {/* ── Right rail ── */}
      <aside className="hidden xl:block">
        <div className="sticky top-24 flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-panel p-5">
            <p className="font-bold text-ink flex items-center gap-2"><Icon name="chat" size={16} className="text-orange" /> Need more help?</p>
            <p className="text-[13px] text-ink-soft mt-2 leading-relaxed">We&rsquo;re here to make your Preppa experience easy and successful.</p>
            <Link href="/support" className="mt-4 w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-orange text-white font-bold text-sm hover:-translate-y-0.5 transition-transform">
              <Icon name="chat" size={15} /> Contact Support
            </Link>
            <Link href="/report-safety" className="mt-2 w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-line text-ink font-bold text-sm hover:bg-white/5 transition-colors">
              <Icon name="shield" size={15} /> Report a safety issue
            </Link>
          </div>

          <div className="rounded-2xl border border-line bg-panel p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft flex items-center gap-2">
              <Icon name="spark" size={13} className="text-orange" /> Popular topics
            </p>
            <ul className="mt-3 flex flex-col">
              {POPULAR.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="flex items-center justify-between gap-2 py-2 text-[13px] font-semibold text-ink-2 hover:text-orange transition-colors">
                    {p.label} <Icon name="chevRight" size={14} className="text-ink-soft shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-orange/25 bg-orange-soft p-5">
            <p className="font-bold text-ink">Love Preppa?</p>
            <p className="text-[13px] text-ink-soft mt-1">Follow along and help our community grow.</p>
            <div className="mt-3 flex gap-2">
              <a href="https://www.tiktok.com/@preppa.live" target="_blank" rel="noreferrer" className="flex-1 h-10 rounded-lg border border-line flex items-center justify-center text-[13px] font-bold text-ink hover:bg-white/5 transition-colors">TikTok</a>
              <a href="https://www.instagram.com/preppa.live" target="_blank" rel="noreferrer" className="flex-1 h-10 rounded-lg border border-line flex items-center justify-center text-[13px] font-bold text-ink hover:bg-white/5 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
