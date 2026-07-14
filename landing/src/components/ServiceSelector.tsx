"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";

const SERVICES = [
  { key: "prep", label: "Weekly Meal Prep", icon: "clock" as const, description: "Ready-to-eat meals prepared for your week." },
  { key: "plans", label: "Meal Plans", icon: "repeat" as const, description: "Subscribe to a cook's menu — skip, pause, or cancel anytime." },
  { key: "local", label: "Local Meals", icon: "chefhat" as const, description: "Fresh, homemade dishes from verified cooks nearby." },
  { key: "home", label: "Cook at Your Home", icon: "home" as const, description: "Book a local Prepper to cook in your kitchen." },
  { key: "catering", label: "Catering", icon: "users" as const, description: "Food for your event or party, drop-off or fully staffed." },
  { key: "experiences", label: "Experiences", icon: "spark" as const, description: "Cooking classes, private dining, and food-centered events." },
];

/** Shows the breadth of what Preppa is — six real product surfaces — without linking
 * anywhere (this is a pre-launch waitlist page; the primary action is the email
 * capture, not the live app). Chips are informational: tap to read what each is. */
export function ServiceSelector() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];

  return (
    <div className="mt-5 w-full">
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {SERVICES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`shrink-0 inline-flex items-center gap-2 h-11 px-4 rounded-full border text-[13px] font-semibold whitespace-nowrap transition-all ${
              active === i
                ? "bg-ink border-ink text-white -translate-y-0.5"
                : "bg-white/70 border-line text-ink-2 hover:bg-white hover:border-line-2 backdrop-blur-sm"
            }`}
          >
            <Icon name={s.icon} size={15} className={active === i ? "text-orange" : ""} />
            {s.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={svc.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-ink-2 text-sm max-w-md"
        >
          {svc.description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
