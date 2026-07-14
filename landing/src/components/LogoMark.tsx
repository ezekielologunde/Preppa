/** The Preppa flame mark, drawn inline as SVG. Defaults to the brand orange square
 * with a white flame; pass `bg`/`fg` to invert it on an orange surface (cream square,
 * orange flame) so it never disappears into its own background. */
const FLAME =
  "M35 60 A 10 10 0 0 0 45 50 C 45 44 43 41 39 35 C 34 25 36 17 45 9 C 47 19 53 28 61 34 C 69 41 73 50 73 59 A 28 28 0 1 1 17 59 C 17 54 19 49 22 46 A 10 10 0 0 0 35 60 Z";

export function LogoMark({
  size = 32,
  bg = "#F26B1D",
  fg = "#fff",
}: {
  size?: number;
  bg?: string;
  fg?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size, borderRadius: size * 0.28, background: bg }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 100 100" fill="none">
        <path d={FLAME} fill={fg} />
      </svg>
    </span>
  );
}
