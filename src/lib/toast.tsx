'use client';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type ToastVariant = 'success' | 'info' | 'demo' | 'error';
export type Toast = { id: string; variant: ToastVariant; title: string; body?: string };

type ToastContextValue = {
  toasts: Toast[];
  push: (t: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
  success: (title: string, body?: string) => string;
  info: (title: string, body?: string) => string;
  demo: (title: string, body?: string) => string;
  error: (title: string, body?: string) => string;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { ...t, id }]);
      window.setTimeout(() => dismiss(id), 3500);
      return id;
    },
    [dismiss]
  );

  const success = useCallback((title: string, body?: string) => push({ variant: 'success', title, body }), [push]);
  const info = useCallback((title: string, body?: string) => push({ variant: 'info', title, body }), [push]);
  const demo = useCallback((title: string, body?: string) => push({ variant: 'demo', title, body }), [push]);
  const error = useCallback((title: string, body?: string) => push({ variant: 'error', title, body }), [push]);

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, push, dismiss, success, info, demo, error }),
    [toasts, push, dismiss, success, info, demo, error]
  );
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
