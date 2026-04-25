'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type WishlistContextValue = {
  ids: Set<string>;
  has: (id: string) => boolean;
  toggle: (id: string) => boolean;
  hydrated: boolean;
};

const KEY = 'tgoda.wishlist';
const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(new Set(JSON.parse(raw)));
    } catch {}
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    setIds(new Set(next));
    try {
      localStorage.setItem(KEY, JSON.stringify([...next]));
    } catch {}
  }, []);

  const has = useCallback((id: string) => ids.has(id), [ids]);
  const toggle = useCallback(
    (id: string) => {
      const next = new Set(ids);
      const wasIn = next.has(id);
      if (wasIn) next.delete(id);
      else next.add(id);
      persist(next);
      return !wasIn;
    },
    [ids, persist]
  );

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, has, toggle, hydrated }),
    [ids, has, toggle, hydrated]
  );
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
