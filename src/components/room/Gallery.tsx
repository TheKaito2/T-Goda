'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import Lightbox from './Lightbox';
import { gsap } from '@/lib/gsap';

const images = [
  '/images/room-detail/gallery-3.png',
  '/images/room-detail/gallery-1.png',
  '/images/room-detail/gallery-2.png',
  '/images/room-detail/gallery-4.png',
  '/images/room-detail/gallery-5.png',
];

const TOTAL_PHOTOS = 24;

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-gallery-hero]', {
          scale: 1.06,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
        gsap.from('[data-gallery-thumb]', {
          y: 24,
          opacity: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.15,
        });
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-gallery-hero], [data-gallery-thumb]', { opacity: 1, y: 0, scale: 1 });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const openAt = (i: number) => {
    setLbIndex(i);
    setLbOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 gap-4 md:grid-cols-[608px_1fr]"
    >
      <button
        type="button"
        onClick={() => openAt(0)}
        data-gallery-hero
        className="relative h-[260px] overflow-hidden rounded-[12px] md:h-[500px]"
      >
        <Image
          src={images[0]}
          alt="Resort hero"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 608px"
          className="object-cover transition duration-500 hover:scale-105"
        />
      </button>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {images.slice(1).map((src, i) => (
          <button
            key={src}
            type="button"
            data-gallery-thumb
            onClick={() => openAt(i + 1)}
            className="relative h-[120px] overflow-hidden rounded-[12px] md:h-[242px]"
          >
            <Image
              src={src}
              alt={`Resort photo ${i + 2}`}
              fill
              sizes="(max-width: 1024px) 50vw, 296px"
              className="object-cover transition duration-500 hover:scale-105"
            />
            {i === images.length - 2 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition group-hover:bg-black/50">
                <span className="text-[16px] font-semibold text-white">View all {TOTAL_PHOTOS} photos</span>
              </div>
            )}
          </button>
        ))}
      </div>
      <Lightbox open={lbOpen} onClose={() => setLbOpen(false)} images={images} index={lbIndex} alt="Resort photo" />
    </section>
  );
}
