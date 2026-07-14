import Image from "next/image";

/** The actual Preppa app icon (orange rounded square + white flame), cropped and
 * background-cleaned from the real brand asset — not a hand-drawn approximation.
 * Shared by Nav, Footer, and HelpShell so there's exactly one source of truth. */
export function LogoMark({ size = 30 }: { size?: number }) {
  return <Image src="/logo-mark.png" alt="" width={size} height={size} priority />;
}
