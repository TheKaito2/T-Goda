'use client';
import { useState } from 'react';
import IconStatic from '@/components/ui/IconStatic';
import AmenitiesModal from './AmenitiesModal';

type IconName = `room-detail/${string}`;

const amenities: { label: string; icon: IconName }[] = [
  { label: '3 Outdoor Pools', icon: 'room-detail/swim' },
  { label: 'Full-service Spa', icon: 'room-detail/spa' },
  { label: '5 Restaurants', icon: 'room-detail/fork-spoon' },
  { label: 'Gym & Fitness', icon: 'room-detail/gym' },
  { label: 'Free High-speed Wi-Fi', icon: 'room-detail/wifi' },
  { label: 'Private Beach', icon: 'room-detail/umbrella' },
];

export default function Amenities() {
  const [open, setOpen] = useState(false);
  return (
    <section className="mt-10">
      <h2 className="text-[20px] font-semibold leading-7 text-ink">Popular Amenities</h2>
      <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3">
        {amenities.map((a) => (
          <li key={a.label} className="flex items-center gap-3 text-[16px] text-ink">
            <IconStatic name={a.icon} size={20} className="text-brand-primary" />
            {a.label}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-block text-[16px] font-semibold text-brand-primary hover:underline"
      >
        See all 45 amenities
      </button>
      <AmenitiesModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
