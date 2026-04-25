'use client';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import Modal from '@/components/ui/Modal';
import { gsap } from '@/lib/gsap';
import { useToast } from '@/lib/toast';

type Booking = {
  id: string;
  hotel: string;
  room: string;
  guests: number;
  nights: number;
  total: number;
  createdAt: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  hotel: string;
  room: string;
  total: number;
  nights?: number;
  guests?: number;
};

function code() {
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TGD-${r}`;
}

export default function BookingConfirmedModal({
  open,
  onClose,
  hotel,
  room,
  total,
  nights = 3,
  guests = 2,
}: Props) {
  const [id, setId] = useState('TGD-XXXX');
  const toast = useToast();
  const checkRef = useRef<SVGPathElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const next = code();
    setId(next);
    try {
      const raw = localStorage.getItem('tgoda.bookings');
      const list: Booking[] = raw ? JSON.parse(raw) : [];
      list.unshift({ id: next, hotel, room, guests, nights, total, createdAt: new Date().toISOString() });
      localStorage.setItem('tgoda.bookings', JSON.stringify(list.slice(0, 25)));
    } catch {}
  }, [open, hotel, room, guests, nights, total]);

  useGSAP(() => {
    if (!open) return;
    if (ringRef.current && checkRef.current) {
      gsap.fromTo(ringRef.current, { strokeDashoffset: 220 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' });
      gsap.fromTo(checkRef.current, { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', delay: 0.45 });
    }
    gsap.from('[data-bc-row]', { y: 14, opacity: 0, duration: 0.5, stagger: 0.07, delay: 0.5, ease: 'power2.out' });
  }, { scope: rootRef, dependencies: [open] });

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(id);
      toast.success('Confirmation code copied', id);
    } catch {
      toast.info('Could not copy', id);
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="md" ariaLabel="Booking confirmed">
      <div ref={rootRef} className="px-7 pb-7 pt-7">
        <div className="flex justify-center">
          <svg width="84" height="84" viewBox="0 0 80 80" aria-hidden>
            <circle
              ref={ringRef}
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#16A34A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="220"
              strokeDashoffset="220"
              transform="rotate(-90 40 40)"
            />
            <path
              ref={checkRef}
              d="M26 41 L36 51 L55 31"
              fill="none"
              stroke="#16A34A"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset="60"
            />
          </svg>
        </div>
        <h2 data-bc-row className="mt-4 text-center text-[24px] font-extrabold tracking-[-0.4px] text-ink">
          Booking confirmed
        </h2>
        <p data-bc-row className="mt-1 text-center text-[14px] text-ink-soft">
          We&rsquo;ve sent a confirmation to your inbox. Show this code at check-in.
        </p>
        <div data-bc-row className="mt-5 flex items-center justify-between rounded-md border border-line/60 bg-surface-cool px-4 py-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">Confirmation</div>
            <div className="font-mono text-[18px] font-bold text-ink">{id}</div>
          </div>
          <button
            type="button"
            onClick={copyCode}
            className="rounded-sm border border-line/60 bg-white px-3 py-1.5 text-[13px] font-semibold text-ink hover:border-line"
          >
            Copy
          </button>
        </div>
        <dl data-bc-row className="mt-5 space-y-2 text-[14px]">
          <Row k="Hotel" v={hotel} />
          <Row k="Room" v={room} />
          <Row k="Guests" v={`${guests} guest${guests === 1 ? '' : 's'}`} />
          <Row k="Nights" v={`${nights} nights`} />
          <Row k="Total" v={`$${total.toLocaleString()}`} bold />
        </dl>
        <div data-bc-row className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-sm bg-brand-primary px-5 text-[14px] font-semibold text-white hover:opacity-90"
          >
            Done
          </button>
          <button
            type="button"
            onClick={() => {
              toast.info('Itinerary added to your trip board');
              onClose();
            }}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-sm border border-line/60 bg-white px-5 text-[14px] font-semibold text-ink hover:border-line"
          >
            View itinerary
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-line/30 pb-2 last:border-0">
      <dt className="text-ink-soft">{k}</dt>
      <dd className={bold ? 'text-[16px] font-bold text-ink' : 'font-semibold text-ink'}>{v}</dd>
    </div>
  );
}
