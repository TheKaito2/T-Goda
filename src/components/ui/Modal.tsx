'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  ariaLabel?: string;
};

const SIZE_CLS: Record<NonNullable<Props['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
};

export default function Modal({ open, onClose, children, size = 'md', ariaLabel }: Props) {
  const [mounted, setMounted] = useState(false);
  const [render, setRender] = useState(open);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  useGSAP(() => {
    if (!render) return;
    if (open) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        panelRef.current,
        { y: 24, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
      ScrollTrigger.refresh();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
    const tl = gsap.timeline({ onComplete: () => setRender(false) });
    tl.to(panelRef.current, { y: 12, scale: 0.97, opacity: 0, duration: 0.22, ease: 'power2.in' }, 0);
    tl.to(backdropRef.current, { opacity: 0, duration: 0.22, ease: 'power2.in' }, 0);
  }, [open, render]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted || !render) return null;

  return createPortal(
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10 backdrop-blur-sm"
    >
      <div
        ref={panelRef}
        className={`relative w-full ${SIZE_CLS[size]} rounded-xl bg-white shadow-2xl`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
