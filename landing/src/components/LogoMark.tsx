/** The Preppa flame mark, drawn inline as SVG (orange rounded square + white flame)
 * instead of a cropped PNG. The old logo-mark.png was cut from a Gemini-generated
 * JPEG — muddy off-brand orange (#B6441D vs the real #F26B1D) with rough artifact
 * edges, which is what read as "broken." This is the exact FLAME path the app uses,
 * so it's crisp at any size and always the correct brand color. */
const FLAME =
  "M35 60 A 10 10 0 0 0 45 50 C 45 44 43 41 39 35 C 34 25 36 17 45 9 C 47 19 53 28 61 34 C 69 41 73 50 73 59 A 28 28 0 1 1 17 59 C 17 54 19 49 22 46 A 10 10 0 0 0 35 60 Z";

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center bg-orange shrink-0"
      style={{ width: size, height: size, borderRadius: size * 0.28 }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 100 100" fill="none">
        <path d={FLAME} fill="#fff" />
      </svg>
    </span>
  );
}
