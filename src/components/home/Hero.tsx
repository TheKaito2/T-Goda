import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="px-4 pt-6 md:px-[42px]">
      <div className="relative mx-auto h-[440px] w-full max-w-[1200px] overflow-hidden rounded-xl md:h-[520px]">
        <Image
          src="/images/home/hero.png"
          alt="Tropical paradise"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/55" />

        <div className="relative flex h-full flex-col items-center justify-end px-4 pb-8 md:px-8 md:pb-[114px]">
          <h1 className="max-w-[750px] text-center text-[36px] font-extrabold leading-[40px] tracking-[-1px] text-white md:text-[60px] md:leading-[60px] md:tracking-[-1.5px]">
            Escape to Your Perfect<br />Paradise
          </h1>
          <p className="mt-3 max-w-[672px] text-center text-[15px] font-medium leading-[22px] text-white/90 md:mt-6 md:text-[20px] md:leading-[28px]">
            Unlock exclusive prices on over 2 million properties and flights across
            the globe.
          </p>
          <div className="mt-6 w-full md:mt-12">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
