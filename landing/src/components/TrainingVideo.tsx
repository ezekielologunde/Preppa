"use client";

import { useEffect, useRef, useState } from "react";

type Group = "customers" | "preppers";
type Chapter = { t: number; label: string; group: Group };

/** Chapter start times (seconds) — keep in sync with the video's timeline. */
const CHAPTERS: Chapter[] = [
  { t: 7.4, label: "Find a cook near you", group: "customers" },
  { t: 12.65, label: "Read every label", group: "customers" },
  { t: 17.8, label: "Pay online, tip the cook", group: "customers" },
  { t: 22.15, label: "Track it, message your cook", group: "customers" },
  { t: 29.55, label: "Apply, we review every cook", group: "preppers" },
  { t: 38.5, label: "Get paid through Stripe", group: "preppers" },
  { t: 44.5, label: "Post your first meal", group: "preppers" },
  { t: 54.6, label: "Take orders, get paid", group: "preppers" },
];

/** #customers / #preppers deep links jump to the start of that track. */
const HASH_START: Record<string, number> = { customers: 7.4, preppers: 26.85 };

const GROUPS: { key: Group; title: string }[] = [
  { key: "customers", title: "For customers" },
  { key: "preppers", title: "For Preppers" },
];

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function TrainingVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let pending: (() => void) | null = null;
    const apply = () => {
      const start = HASH_START[window.location.hash.replace("#", "")];
      if (start == null) return;
      if (pending) v.removeEventListener("loadedmetadata", pending);
      const seek = () => {
        v.currentTime = start;
      };
      if (v.readyState >= 1) seek();
      else {
        pending = seek;
        v.addEventListener("loadedmetadata", seek, { once: true });
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => {
      window.removeEventListener("hashchange", apply);
      if (pending) v.removeEventListener("loadedmetadata", pending);
    };
  }, []);

  const jump = (t: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = t;
    void v.play().catch(() => {});
  };

  // The active chapter is the last one that has started.
  let active = -1;
  CHAPTERS.forEach((c, i) => {
    if (time >= c.t - 0.05) active = i;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] items-start">
      <div className="overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_18px_50px_-24px_rgba(30,18,8,0.45)]">
        <video
          ref={ref}
          className="block w-full aspect-video bg-ink"
          controls
          playsInline
          preload="metadata"
          poster={poster}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        >
          <source src={src} type="video/mp4" />
          Your browser can&rsquo;t play this video. <a href={src}>Download it instead</a>.
        </video>
      </div>

      <nav aria-label="Video chapters" className="rounded-2xl border border-line bg-panel p-3">
        {GROUPS.map((g, gi) => (
          <div key={g.key} className={gi > 0 ? "mt-3 pt-3 border-t border-line" : ""}>
            <p className="px-3 pt-1 pb-2 text-[11px] font-bold uppercase tracking-wider text-ink-soft">{g.title}</p>
            <ol className="flex flex-col gap-0.5">
              {CHAPTERS.map((c, i) =>
                c.group !== g.key ? null : (
                  <li key={c.t}>
                    <button
                      type="button"
                      onClick={() => jump(c.t)}
                      aria-current={active === i ? "true" : undefined}
                      className={`w-full min-h-11 flex items-center gap-3 rounded-xl px-3 py-2 text-left text-[13.5px] font-semibold transition-colors ${
                        active === i ? "bg-orange-soft text-orange-deep" : "text-ink-2 hover:bg-ink/5 hover:text-ink"
                      }`}
                    >
                      <span className="tabular-nums text-[12px] font-bold text-ink-soft w-9 shrink-0">{clock(c.t)}</span>
                      <span className="leading-snug">{c.label}</span>
                    </button>
                  </li>
                ),
              )}
            </ol>
          </div>
        ))}
      </nav>
    </div>
  );
}
