"use client";

import { motion } from "framer-motion";
import { Icon } from "./Icon";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wider text-ink-2 mb-6">
            <span className="w-[7px] h-[7px] rounded-full bg-orange" />
            Homemade food marketplace
          </span>
          <h1 className="text-[38px] md:text-[68px] font-extrabold leading-[1.02] tracking-tight mb-6">
            Home-cooked food from
            <br />
            <span className="font-light text-ink-soft">a local</span> you trust
          </h1>
          <p className="text-lg text-ink-2 leading-relaxed max-w-md mb-8">
            Preppa connects you with ID-verified home cooks nearby — order fresh,
            homemade meals made by a real person, not a restaurant.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <motion.a
              whileTap={{ scale: 0.97 }}
              href="https://app.preppa.live"
              className="bg-orange text-white font-bold px-6 h-13 rounded-full flex items-center gap-2 shadow-[0_10px_26px_rgba(242,107,29,.32)]"
            >
              Find a cook near you
            </motion.a>
            <a
              href="#preppas-earn"
              className="border border-line-2 font-bold px-6 h-13 rounded-full flex items-center"
            >
              Become a Preppa
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-orange-soft text-orange flex items-center justify-center">
                <Icon name="shield" size={18} />
              </span>
              <span className="text-sm">
                <b className="block">ID-verified cooks</b>
                <span className="text-ink-soft">Checked before payout</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-purple-soft text-purple flex items-center justify-center">
                <Icon name="repeat" size={18} />
              </span>
              <span className="text-sm">
                <b className="block">Weekly meal plans</b>
                <span className="text-ink-soft">Skip or cancel anytime</span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative aspect-square max-w-md mx-auto w-full"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-orange/25 via-purple/15 to-transparent blur-2xl" />
          <motion.div
            className="relative h-full rounded-[32px] border border-line-2 bg-surface shadow-[0_30px_70px_rgba(23,21,15,.14)] p-6 flex flex-col justify-between overflow-hidden"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">
                Fresh drops near you
              </span>
              <a href="https://app.preppa.live" className="text-xs font-bold text-orange">
                See all
              </a>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-orange-soft to-purple-soft aspect-[4/3] relative">
              <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 bg-white/90 rounded-full px-3 py-1.5 text-[11px] font-bold text-green">
                <Icon name="shield" size={12} /> ID-verified cook
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold">Lemon-herb roast chicken</h4>
                <span className="font-extrabold">$11.50</span>
              </div>
              <p className="text-sm text-ink-soft mt-1">by a local Preppa</p>
              <div className="flex items-center gap-4 text-xs text-ink-soft mt-3">
                <span className="flex items-center gap-1">
                  <Icon name="clock" size={14} /> Ready 5:30
                </span>
                <span>0.6 mi</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute -right-4 -bottom-6 bg-ink text-white rounded-2xl px-5 py-4 shadow-xl"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <b className="block text-sm">Live in Atlanta, GA</b>
            <span className="text-xs text-white/70">More cities soon</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
