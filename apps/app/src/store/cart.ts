import { create } from 'zustand';

/**
 * The cart is CLIENT DISPLAY STATE ONLY — the create-order Edge Function recomputes
 * every amount server-side from the meals table. Prices here are for display; they
 * are never sent as the charge amount.
 *
 * Single-kitchen invariant (council: cross-kitchen carts are rejected, and the DB
 * enforces one kitchen per order): adding a meal from a different kitchen returns a
 * conflict instead of mixing. The UI prompts to replace via `replaceWith`.
 */
export interface CartLine {
  mealId: string;
  name: string;
  priceCents: number;
  qty: number;
}

interface CartState {
  kitchenId: string | null;
  kitchenName: string | null;
  items: CartLine[];
  /** Returns { conflict:true } if the meal is from a different kitchen than the cart. */
  addItem: (kitchenId: string, kitchenName: string, line: Omit<CartLine, 'qty'>, qty?: number) => { conflict: boolean };
  replaceWith: (kitchenId: string, kitchenName: string, line: Omit<CartLine, 'qty'>, qty?: number) => void;
  setQty: (mealId: string, qty: number) => void;
  removeLine: (mealId: string) => void;
  clear: () => void;
}

function upsert(items: CartLine[], line: Omit<CartLine, 'qty'>, qty: number): CartLine[] {
  const i = items.findIndex((l) => l.mealId === line.mealId);
  if (i >= 0) {
    const next = [...items];
    next[i] = { ...next[i]!, qty: next[i]!.qty + qty };
    return next;
  }
  return [...items, { ...line, qty }];
}

export const useCart = create<CartState>((set, get) => ({
  kitchenId: null,
  kitchenName: null,
  items: [],

  addItem: (kitchenId, kitchenName, line, qty = 1) => {
    const s = get();
    if (s.kitchenId != null && s.kitchenId !== kitchenId && s.items.length > 0) {
      return { conflict: true };
    }
    set({ kitchenId, kitchenName, items: upsert(s.items, line, qty) });
    return { conflict: false };
  },

  replaceWith: (kitchenId, kitchenName, line, qty = 1) =>
    set({ kitchenId, kitchenName, items: [{ ...line, qty }] }),

  setQty: (mealId, qty) =>
    set((s) => {
      const items = qty <= 0 ? s.items.filter((l) => l.mealId !== mealId) : s.items.map((l) => (l.mealId === mealId ? { ...l, qty } : l));
      return items.length === 0 ? { items, kitchenId: null, kitchenName: null } : { items };
    }),

  removeLine: (mealId) =>
    set((s) => {
      const items = s.items.filter((l) => l.mealId !== mealId);
      return items.length === 0 ? { items, kitchenId: null, kitchenName: null } : { items };
    }),

  clear: () => set({ kitchenId: null, kitchenName: null, items: [] }),
}));

/** Display subtotal in cents. Server recomputes the authoritative total at checkout. */
export const cartSubtotalCents = (items: CartLine[]): number =>
  items.reduce((sum, l) => sum + l.priceCents * l.qty, 0);

export const cartCount = (items: CartLine[]): number => items.reduce((sum, l) => sum + l.qty, 0);
