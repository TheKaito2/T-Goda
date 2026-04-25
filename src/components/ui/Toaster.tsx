'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useToast, type Toast } from '@/lib/toast';

const VARIANT_BG: Record<Toast['variant'], string> = {
  success: 'bg-emerald-600',
  info: 'bg-blue-600',
  demo: 'bg-slate-800',
  error: 'bg-rose-600',
};

const VARIANT_DOT: Record<Toast['variant'], string> = {
  success: 'bg-emerald-300',
  info: 'bg-blue-300',
  demo: 'bg-amber-300',
  error: 'bg-rose-300',
};

function ToastItem({ t, onClose }: { t: Toast; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { x: 120, opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
      );
    }
  }, { scope: ref });

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={`pointer-events-auto flex w-[320px] items-start gap-3 rounded-md ${VARIANT_BG[t.variant]} px-4 py-3 text-white shadow-lg`}
    >
      <div className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full ${VARIANT_DOT[t.variant]}`} />
      <div className="flex-1">
        <div className="text-[14px] font-semibold leading-[20px]">{t.title}</div>
        {t.body ? <div className="mt-0.5 text-[13px] leading-[18px] text-white/85">{t.body}</div> : null}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="text-white/75 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}

export default function Toaster() {
  const { toasts, dismiss } = useToast();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((t) => (
        <ToastItem key={t.id} t={t} onClose={() => dismiss(t.id)} />
      ))}
    </div>,
    document.body
  );
}
