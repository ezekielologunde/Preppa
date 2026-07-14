/** The page's one signature device: a pinned order-ticket card — thick ink border,
 * hard drop shadow (no blur, no gradient), a bolt/pin dot at the top, slight rotation.
 * Reused for the hero photo, service cards, and how-it-works steps so the whole page
 * reads as one kitchen corkboard instead of stock SaaS panels. */
export function Ticket({
  rotate = 0,
  className = "",
  children,
}: {
  rotate?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`relative rounded-2xl border-[3px] border-ink bg-surface shadow-[6px_6px_0_0_var(--ink)] ${className}`}
    >
      <span className="absolute -top-[11px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-orange border-[3px] border-ink" />
      {children}
    </div>
  );
}
