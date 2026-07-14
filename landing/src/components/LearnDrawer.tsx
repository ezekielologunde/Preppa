"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";

const HELP = "https://help.preppa.live";

/** Real pages only — no fabricated /learn/* routes for topics that don't have
 * content yet. Links straight to the actual help.preppa.live guides/legal pages
 * instead of duplicating them as a second, competing set of pages. */
const TOPICS = [
  { icon: "chefhat" as const, title: "Post your first meal", body: "Photo or video, price it, publish.", href: `${HELP}/guides/post-your-first-meal` },
  { icon: "repeat" as const, title: "Create a meal plan", body: "Turn your menu into a weekly subscription.", href: `${HELP}/guides/create-a-meal-plan` },
  { icon: "card" as const, title: "Set up payout", body: "Connect a bank account via Stripe.", href: `${HELP}/guides/set-up-payout` },
  { icon: "shield" as const, title: "Cook Agreement", body: "What every Preppa commits to.", href: `${HELP}/legal/cook-agreement` },
  { icon: "clock" as const, title: "Terms of Service", body: "The rules for using Preppa.", href: `${HELP}/legal/terms` },
  { icon: "check" as const, title: "Privacy Policy", body: "What we collect and why.", href: `${HELP}/legal/privacy` },
];

export function LearnDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    triggerFocusRef.current = document.activeElement;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      (triggerFocusRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Learn Preppa"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[71] inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[420px] max-h-[80dvh] overflow-y-auto rounded-3xl bg-bg text-ink p-6 shadow-[0_30px_70px_rgba(0,0,0,.35)]"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold">Learn Preppa</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-surface flex items-center justify-center hover:bg-surface-2 transition-colors"
              >
                <Icon name="x" size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {TOPICS.map((t) => (
                <a
                  key={t.href}
                  href={t.href}
                  className="flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-surface transition-colors"
                >
                  <span className="w-10 h-10 rounded-xl bg-orange-soft text-orange flex items-center justify-center shrink-0">
                    <Icon name={t.icon} size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold truncate">{t.title}</span>
                    <span className="block text-xs text-ink-soft truncate">{t.body}</span>
                  </span>
                  <Icon name="chevRight" size={16} className="text-ink-soft shrink-0" />
                </a>
              ))}
            </div>
            <p className="mt-5 text-xs text-ink-soft leading-relaxed border-t border-line pt-4">
              Preppers are independent food providers. Availability, permits, and service
              requirements may vary by location.
            </p>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
