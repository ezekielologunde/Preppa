"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";

const SERVICES = [
  {
    key: "prep",
    label: "Weekly Meal Prep",
    icon: "clock" as const,
    description: "Ready-to-eat meals prepared for your week.",
    cta: "Explore weekly prep",
    href: "https://app.preppa.live/discover",
  },
  {
    key: "plans",
    label: "Meal Plans",
    icon: "repeat" as const,
    description: "Subscribe to a cook's menu — skip, pause, or cancel anytime.",
    cta: "Browse meal plans",
    href: "https://app.preppa.live/plans",
  },
  {
    key: "local",
    label: "Local Meals",
    icon: "chefhat" as const,
    description: "Fresh, homemade dishes from verified cooks nearby.",
    cta: "Find a cook near you",
    href: "https://app.preppa.live/discover",
  },
  {
    key: "home",
    label: "Cook at Your Home",
    icon: "home" as const,
    description: "Book a local Prepper to cook in your kitchen.",
    cta: "Request a Prepper",
    href: "https://app.preppa.live/service-request",
  },
  {
    key: "catering",
    label: "Catering",
    icon: "users" as const,
    description: "Food for your event or party, drop-off or fully staffed.",
    cta: "Get a catering quote",
    href: "https://app.preppa.live/service-request",
  },
  {
    key: "experiences",
    label: "Experiences",
    icon: "spark" as const,
    description: "Cooking classes, private dining, and food-centered events.",
    cta: "Explore experiences",
    href: "https://app.preppa.live/discover",
  },
];

/** The interactive proof that Preppa isn't a generic restaurant-delivery app — six
 * real product surfaces, one tap away, without leaving the single-screen hero. */
export function ServiceSelector() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];

  return (
    <div className="mt-8 w-full">
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {SERVICES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`shrink-0 inline-flex items-center gap-2 h-11 px-4 rounded-full border text-[13px] font-semibold whitespace-nowrap transition-all ${
              active === i
                ? "bg-white/15 border-white/30 text-white -translate-y-0.5"
                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon name={s.icon} size={15} className={active === i ? "text-orange" : ""} />
            {s.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={svc.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <p className="text-white/80 text-sm max-w-md">{svc.description}</p>
          <a
            href={svc.href}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange hover:text-white transition-colors"
          >
            {svc.cta} <Icon name="chevRight" size={14} />
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
