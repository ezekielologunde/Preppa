const PATHS: Record<string, string[]> = {
  shield: [
    "M12 3l7 3v5c0 4.5-3.4 7.6-7 9-3.6-1.4-7-4.5-7-9V6l7-3z",
    "M9 12l2 2 4-4",
  ],
  check: ["M5 12l4.5 4.5L19 7"],
  chevRight: ["M9 6l6 6-6 6"],
  card: ["M2 5h20v14H2z", "M2 10h20"],
  users: [
    "M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2",
    "M10 11a4 4 0 100-8 4 4 0 000 8",
  ],
  clock: ["M12 3a9 9 0 100 18 9 9 0 000-18z", "M12 7v5l3.5 2"],
  chat: ["M21 15a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2h13a2 2 0 012 2z"],
  repeat: [
    "M17 2l4 4-4 4",
    "M3 11V9a4 4 0 014-4h14",
    "M7 22l-4-4 4-4",
    "M21 13v2a4 4 0 01-4 4H3",
  ],
  chefhat: [
    "M7 21h10",
    "M6 14a4 4 0 01-1-7.9A4.5 4.5 0 0112 4a4.5 4.5 0 017 2.1A4 4 0 0118 14",
    "M6 14v4a1 1 0 001 1h10a1 1 0 001-1v-4",
  ],
  video: [
    "M3 6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    "M15 9.5l6-3.5v12l-6-3.5z",
  ],
};

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: keyof typeof PATHS;
  size?: number;
  className?: string;
}) {
  const d = PATHS[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {d.map((p, i) => (
        <path
          key={i}
          d={p}
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
