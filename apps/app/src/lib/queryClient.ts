import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query owns all server state. Order/balance queries set a SHORT staleTime
 * and are invalidated by Realtime events (added with those features) — the cache is
 * never treated as the source of truth for order status or money.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
