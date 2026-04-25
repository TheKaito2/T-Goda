import Image from 'next/image';
import Icon from '@/components/ui/Icon';

export default function PromoBanner() {
  return (
    <section className="px-4 pb-16 md:px-[42px] md:pb-20">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-stretch overflow-hidden rounded-xl bg-brand-deal md:h-[416px] md:flex-row md:items-center">
        <Icon
          name="home/tag"
          size={220}
          className="pointer-events-none absolute right-[360px] top-6 hidden text-ink/15 md:block"
        />
        <div className="relative flex flex-1 flex-col px-6 py-10 md:px-16 md:py-0">
          <h2 className="max-w-[486px] text-[32px] font-extrabold leading-[36px] text-white md:text-[48px] md:leading-[48px]">
            Summer Sales: Up to<br />40% Off!
          </h2>
          <p className="mt-4 max-w-[538px] text-[15px] leading-6 text-white/85 md:mt-6 md:text-[18px] md:leading-7">
            Exclusive member deals on flights and luxury hotels for your next
            summer getaway. Valid until Oct 31st.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-4">
            <button
              type="button"
              className="rounded-md bg-white px-5 py-3 text-[15px] font-bold leading-6 text-brand-deal hover:opacity-95 md:px-7 md:py-3.5 md:text-[18px] md:leading-7"
            >
              Explore Deals
            </button>
            <button
              type="button"
              className="rounded-md border-2 border-white px-5 py-2.5 text-[15px] font-bold leading-6 text-white hover:bg-white/10 md:px-7 md:py-3 md:text-[18px] md:leading-7"
            >
              Join Club T-Goda
            </button>
          </div>
        </div>

        <div className="relative z-10 mx-auto mb-10 hidden h-[280px] w-[280px] shrink-0 rotate-3 overflow-hidden rounded-[36px] shadow-card md:mx-0 md:mb-0 md:mr-16 md:block md:h-[320px] md:w-[320px]">
          <Image
            src="/images/home/swimming-pool.png"
            alt="Resort pool"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
