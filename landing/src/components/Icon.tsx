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
  pin: [
    "M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z",
    "M12 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  ],
  home: ["M4 11l8-7 8 7", "M6 10v9h12v-9"],
  heart: ["M12 20s-7-4.4-7-9.3A4 4 0 0112 7a4 4 0 017 3.7C19 15.6 12 20 12 20z"],
  plus: ["M12 6v12", "M6 12h12"],
  search: ["M11 18a7 7 0 100-14 7 7 0 000 14z", "M20 20l-3.2-3.2"],
  spark: ["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"],
  x: ["M18 6L6 18", "M6 6l12 12"],
  arrowUpRight: ["M7 17L17 7", "M8 7h9v9"],
  chevDown: ["M6 9l6 6 6-6"],
  bag: ["M5 8h14l-1 12a1 1 0 01-1 1H7a1 1 0 01-1-1L5 8z", "M8.5 8V6a3.5 3.5 0 017 0v2"],
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
