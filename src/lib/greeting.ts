/** Time-of-day greeting — the header should never say "good morning" at 9pm. */
export function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'up late';
  if (h < 12) return 'good morning';
  if (h < 17) return 'good afternoon';
  return 'good evening';
}
