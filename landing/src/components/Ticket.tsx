/** Shared soft rounded card — dark warm surface, no hard edges or pins. Used for
 * cuisine tags, service cards, and how-it-works steps so the page reads as one
 * consistent soft, friendly system instead of stock SaaS panels. */
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
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
      className={`rounded-3xl bg-card shadow-[0_10px_30px_rgba(0,0,0,.25)] ${className}`}
    >
      {children}
    </div>
  );
}
