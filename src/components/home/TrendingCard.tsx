'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

type Props = {
  name: string;
  price: string;
  img: string;
  href: string;
};

export default function TrendingCard({ name, price, img, href }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          imgRef.current,
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const onEnter = () => {
    gsap.to(ref.current, { y: -6, duration: 0.35, ease: 'power3.out' });
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.5, ease: 'power3.out' });
  };
  const onLeave = () => {
    gsap.to(ref.current, { y: 0, duration: 0.4, ease: 'power3.out' });
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <Link
      ref={ref}
      href={href}
      className="group block"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="relative aspect-[282/376] w-full overflow-hidden rounded-[16px] shadow-sm transition-shadow duration-300 group-hover:shadow-card">
        <div
          ref={imgRef}
          className="absolute left-0 right-0"
          style={{ top: '-8%', bottom: '-8%' }}
        >
          <Image src={img} alt={name} fill sizes="(max-width: 1200px) 25vw, 282px" className="object-cover" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="mt-3">
        <h3 className="text-[16px] font-bold leading-6 text-ink">{name}</h3>
        <p className="mt-0.5 text-[14px] font-bold leading-none text-ink-soft">
          Starting from <span className="text-brand-primary">{price}</span>
        </p>
      </div>
    </Link>
  );
}
