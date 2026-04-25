'use client';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export type DropdownOption = { value: string; label: string };

type Props = {
  value: string;
  options: DropdownOption[];
  onChange: (v: string) => void;
  className?: string;
  align?: 'left' | 'right';
};

export default function Dropdown({ value, options, onChange, className, align = 'right' }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.fromTo(
        menuRef.current,
        { y: -6, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.22, ease: 'power3.out' }
      );
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = options.find((o) => o.value === value)?.label ?? options[0]?.label;

  return (
    <div ref={rootRef} className={`relative inline-block ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-sm border border-line/60 bg-white px-3 py-2 text-[14px] font-semibold text-ink hover:border-line"
      >
        {current}
        <span aria-hidden className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open ? (
        <div
          ref={menuRef}
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} z-30 mt-2 w-48 overflow-hidden rounded-md border border-line/60 bg-white shadow-card`}
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left text-[14px] hover:bg-surface-cool ${o.value === value ? 'font-semibold text-brand-primary' : 'text-ink'}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
