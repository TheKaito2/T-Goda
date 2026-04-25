'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type AuthUser = { name: string; email: string; createdAt: string };

type AuthContextValue = {
  user: AuthUser | null;
  hydrated: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (name: string, email: string, password: string) => Promise<AuthUser>;
  signOut: () => void;
};

const KEY = 'tgoda.user';
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  const persist = useCallback((u: AuthUser | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    } catch {}
  }, []);

  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const signIn = useCallback(async (email: string, _password: string) => {
    await wait(450);
    const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Traveler';
    const u: AuthUser = { name, email, createdAt: new Date().toISOString() };
    persist(u);
    return u;
  }, [persist]);

  const signUp = useCallback(async (name: string, email: string, _password: string) => {
    await wait(550);
    const u: AuthUser = { name: name.trim() || 'Traveler', email, createdAt: new Date().toISOString() };
    persist(u);
    return u;
  }, [persist]);

  const signOut = useCallback(() => persist(null), [persist]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, hydrated, signIn, signUp, signOut }),
    [user, hydrated, signIn, signUp, signOut]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
