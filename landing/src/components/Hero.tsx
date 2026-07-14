"use client";

import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { PhoneMockup } from "./PhoneMockup";

const CATS = ["For You", "Meal Plans", "Halal", "Vegan"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-24 md:pt-20 md:pb-32">
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
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://app.preppa.live/discover"
              className="bg-orange text-white font-bold px-6 h-13 rounded-2xl flex items-center gap-2 shadow-[0_10px_26px_rgba(242,107,29,.32)] transition-shadow hover:shadow-[0_14px_32px_rgba(242,107,29,.4)]"
            >
              Find a cook near you
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#preppas-earn"
              className="border-[1.5px] border-line-2 bg-white font-bold px-6 h-13 rounded-2xl flex items-center shadow-[0_1px_2px_rgba(23,21,15,.05)]"
            >
              Become a Preppa
            </motion.a>
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
          className="relative min-h-[540px] max-w-[380px] mx-auto w-full"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="absolute -right-[6%] -top-[4%] w-[64%] aspect-square blur-2xl bg-[radial-gradient(circle_at_40%_35%,var(--orange-soft),transparent_68%)]" />

          <div className="absolute left-0 bottom-0 z-[3]">
            <PhoneMockup>
              <div className="px-3.5 pb-4 w-[264px]">
                <div className="flex items-center justify-between pt-2 pb-3">
                  <div className="text-[10.5px] text-ink-soft font-semibold">
                    Deliver to
                    <div className="flex items-center gap-1 text-[13.5px] font-bold text-ink mt-0.5">
                      <Icon name="pin" size={13} className="text-orange" /> Atlanta, GA
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-surface-2" />
                </div>
                <div className="flex items-center gap-2 h-[42px] px-3.5 rounded-full bg-surface text-ink-soft text-[13px] font-medium">
                  <Icon name="search" size={16} />
                  Search meals, cooks, cuisines
                </div>
                <div className="flex gap-1.5 my-3.5 overflow-hidden">
                  {CATS.map((c, i) => (
                    <span
                      key={c}
                      className={`h-[34px] px-3.5 rounded-full flex items-center whitespace-nowrap text-[12px] font-semibold ${
                        i === 0 ? "bg-ink text-white" : "bg-white border border-line-2 text-ink-2"
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <b className="text-[14px]">Fresh drops near you</b>
                  <a href="https://app.preppa.live/discover" className="text-[11.5px] font-bold text-orange">
                    See all
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden bg-white border border-line shadow-[0_1px_2px_rgba(23,21,15,.05)]">
                  <div className="h-[110px] relative bg-gradient-to-br from-orange-soft to-purple-soft">
                    <span className="absolute left-2.5 top-2.5 h-[26px] px-2.5 rounded-full bg-white/95 flex items-center gap-1.5 text-[10.5px] font-bold shadow-[0_1px_2px_rgba(23,21,15,.05)]">
                      <Icon name="shield" size={13} className="text-green" /> Verified cook
                    </span>
                    <span className="absolute right-2.5 top-2.5 w-[30px] h-[30px] rounded-full bg-white/95 flex items-center justify-center shadow-[0_1px_2px_rgba(23,21,15,.05)]">
                      <Icon name="heart" size={15} className="text-orange" />
                    </span>
                    <span className="absolute right-3 bottom-3 w-[30px] h-[30px] rounded-xl bg-orange flex items-center justify-center shadow-[0_10px_26px_rgba(242,107,29,.32)]">
                      <Icon name="plus" size={16} className="text-white" />
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-[14px] font-bold leading-tight">Lemon-herb roast chicken</h4>
                        <p className="text-[11.5px] text-ink-soft mt-0.5 flex items-center gap-1">
                          <span className="w-[18px] h-[18px] rounded-full bg-surface-2" /> by a local Preppa
                        </p>
                      </div>
                      <span className="text-[15px] font-extrabold shrink-0">$11.50</span>
                    </div>
                    <div className="flex items-center gap-2.5 mt-2.5 text-[11px] text-ink-2 font-semibold">
                      <span className="flex items-center gap-1">
                        <Icon name="clock" size={13} /> Ready 5:30
                      </span>
                      <span>0.6 mi</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-around pt-3.5 mt-3.5 border-t border-line">
                  <Icon name="home" size={21} className="text-orange" />
                  <Icon name="video" size={21} className="text-ink-soft" />
                  <Icon name="chefhat" size={21} className="text-ink-soft" />
                  <Icon name="users" size={21} className="text-ink-soft" />
                </div>
              </div>
            </PhoneMockup>
          </div>

          <motion.div
            className="absolute -right-1 bottom-14 z-[4] bg-white rounded-2xl px-4 py-3.5 shadow-[0_10px_24px_rgba(23,21,15,.08),0_30px_70px_rgba(23,21,15,.12)] border border-line flex items-center gap-3"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center">
              <Icon name="pin" size={16} />
            </span>
            <div>
              <b className="block text-[14px]">Live in Atlanta, GA</b>
              <span className="text-[11px] text-ink-soft font-semibold">More cities soon</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
