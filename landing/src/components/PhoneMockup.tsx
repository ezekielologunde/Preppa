import type { ReactNode } from "react";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[11px] font-bold">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
          <path d="M2 17h3v4H2zM7 13h3v8H7zM12 9h3v12h-3zM17 5h3v16h-3z" />
        </svg>
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
          <path
            d="M5 12a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <circle cx="12" cy="18.5" r="1.3" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <rect x="2" y="7" width="18" height="10" rx="2.4" stroke="currentColor" strokeWidth={1.8} />
          <rect x="4" y="9" width="12" height="6" rx="1" fill="currentColor" />
          <path d="M21 10v4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

/** Recreates the design mockup's `.phone`/`.phone-screen` bezel — the piece that made the
 * original static HTML read as "high-end" and got lost in the first Next.js rebuild. */
export function PhoneMockup({ small = false, children }: { small?: boolean; children: ReactNode }) {
  return (
    <div
      className={`${small ? "w-[230px] rounded-[34px]" : "w-[280px] rounded-[40px]"} bg-[#1b1812] p-2.5 shadow-[0_30px_70px_rgba(23,21,15,.3)]`}
    >
      <div className={`${small ? "rounded-[26px]" : "rounded-[30px]"} bg-bg overflow-hidden relative`}>
        <StatusBar />
        {children}
      </div>
    </div>
  );
}
