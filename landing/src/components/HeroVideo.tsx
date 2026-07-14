"use client";

import { useEffect, useRef } from "react";

/** Full-bleed food-video background for the hero. Real, commercially-licensed
 * Pexels footage (frying homemade snacks — "Video by Ardina Setiorini from Pexels"),
 * transcoded to a light 720p/1.3MB muted loop with a poster frame.
 *
 * Autoplay is done programmatically (not the `autoPlay` attr) so we can honor
 * prefers-reduced-motion: reduced-motion users just see the static poster frame.
 * The video also pauses when the tab is hidden to save battery/CPU. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) v.play().catch(() => {});

    const onVis = () => {
      if (document.hidden) v.pause();
      else if (!reduced) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero-cook-poster.jpg"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/hero-cook.mp4" type="video/mp4" />
    </video>
  );
}
