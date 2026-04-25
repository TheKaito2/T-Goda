'use client';
import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useWishlist } from '@/lib/wishlist';
import { useToast } from '@/lib/toast';

type Props = {
  id: string;
  label?: string;
  className?: string;
  size?: number;
};

export default function HeartButton({ id, label, className, size = 20 }: Props) {
  const { has, toggle, hydrated } = useWishlist();
  const toast = useToast();
  const ref = useRef<HTMLButtonElement>(null);
  const active = hydrated && has(id);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggle(id);
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { scale: 1 },
        { scale: 1.35, duration: 0.18, ease: 'power3.out', yoyo: true, repeat: 1 }
      );
    }
    if (next) toast.success('Added to wishlist', label ? `Saved ${label}` : undefined);
    else toast.info('Removed from wishlist');
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={active}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full transition-colors ${className ?? ''}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={active ? '#E11D48' : 'none'}
        stroke={active ? '#E11D48' : 'currentColor'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
