'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

type Props = {
  open: boolean;
  onClose: () => void;
  images: string[];
  index?: number;
  alt?: string;
};

export default function Lightbox({ open, onClose, images, index = 0, alt = 'Photo' }: Props) {
  const [mounted, setMounted] = useState(false);
  const [render, setRender] = useState(open);
  const [i, setI] = useState(index);
  const overlayRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (open) {
      setI(index);
      setRender(true);
    }
  }, [open, index]);

  useGSAP(() => {
    if (!render) return;
    if (open) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(figureRef.current, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
    const tl = gsap.timeline({ onComplete: () => setRender(false) });
    tl.to(figureRef.current, { scale: 0.97, opacity: 0, duration: 0.2 }, 0);
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, 0);
  }, [open, render]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI((n) => (n + 1) % images.length);
      if (e.key === 'ArrowLeft') setI((n) => (n - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, images.length]);

  useGSAP(() => {
    if (!open) return;
    if (figureRef.current) {
      gsap.fromTo(figureRef.current, { opacity: 0.5, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  }, [i]);

  if (!mounted || !render) return null;

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-[22px] hover:bg-white/20"
      >
        ×
      </button>
      <button
        type="button"
        onClick={() => setI((n) => (n - 1 + images.length) % images.length)}
        aria-label="Previous"
        className="absolute left-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-[28px] hover:bg-white/20"
      >
        ‹
      </button>
      <div ref={figureRef} className="relative h-[80vh] w-[90vw] max-w-5xl">
        <Image src={images[i]} alt={`${alt} ${i + 1}`} fill className="object-contain" sizes="90vw" />
      </div>
      <button
        type="button"
        onClick={() => setI((n) => (n + 1) % images.length)}
        aria-label="Next"
        className="absolute right-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-[28px] hover:bg-white/20"
      >
        ›
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white">
        {i + 1} / {images.length}
      </div>
    </div>,
    document.body
  );
}
