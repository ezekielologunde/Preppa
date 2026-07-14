"use client";

import { useEffect, useRef } from "react";

/** Full-bleed food-video background. Real, commercially-licensed Pexels footage
 * (a chef prepping in a warm kitchen — "Video by cottonbro studio from Pexels"),
 * transcoded to a light 720p muted loop with a poster frame.
 *
 * Autoplay is programmatic (not the `autoPlay` attr) so we honor
 * prefers-reduced-motion — reduced users see the static poster. Pauses on hidden
 * tab; poster covers first paint and any decode failure. */
export function HeroVideo({
  src = "/hero-chef.mp4",
  poster = "/hero-chef-poster.jpg",
  className = "absolute inset-0 w-full h-full object-cover",
}: {
  src?: string;
  poster?: string;
  className?: string;
}) {
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
    <video ref={ref} aria-hidden="true" muted loop playsInline preload="metadata" poster={poster} className={className}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
