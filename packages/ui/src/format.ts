/** Price formatting per the DS: always $XX.XX, two decimals. */
export function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/** Earnings/totals above $1,000 abbreviate to $1.2k (DS numbers rule). */
export function formatMoneyShort(cents: number): string {
  const dollars = cents / 100;
  if (dollars >= 1000) return `$${(dollars / 1000).toFixed(1)}k`;
  return formatMoney(cents);
}

/** Ratings: one decimal place (4.8, not 4.80). */
export function formatRating(r: number): string {
  return r.toFixed(1);
}
