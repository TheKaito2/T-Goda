import Image from 'next/image';
import SearchBar from './SearchBar';
import HeroAnimator from './HeroAnimator';

export default function Hero() {
  return (
    <section className="px-4 pt-6 md:px-[42px]" data-hero>
      <div className="relative mx-auto h-[440px] w-full max-w-[1200px] overflow-hidden rounded-xl md:h-[520px]">
        <div className="absolute inset-0" data-hero-image>
          <Image
            src="/images/home/hero.png"
            alt="Tropical paradise"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/55" />

        <div className="relative flex h-full flex-col items-center justify-end px-4 pb-8 md:px-8 md:pb-[114px]">
          <h1
            data-hero-title
            className="max-w-[750px] text-center text-[36px] font-extrabold leading-[40px] tracking-[-1px] text-white md:text-[60px] md:leading-[60px] md:tracking-[-1.5px]"
          >
            {'Escape to Your Perfect\nParadise'}
          </h1>
          <p
            data-hero-sub
            className="mt-3 max-w-[672px] text-center text-[15px] font-medium leading-[22px] text-white/90 md:mt-6 md:text-[20px] md:leading-[28px]"
          >
            Unlock exclusive prices on over 2 million properties and flights across the globe.
          </p>
          <div data-hero-bar className="mt-6 w-full md:mt-12">
            <SearchBar />
          </div>
        </div>
      </div>
      <HeroAnimator />
    </section>
  );
}
