import TrendingCard from './TrendingCard';
import Reveal from '@/components/motion/Reveal';
import RevealStagger from '@/components/motion/RevealStagger';

const cities = [
  { name: 'Bangkok, Thailand', price: '$120', img: '/images/home/bangkok.png' },
  { name: 'Tokyo, Japan', price: '$250', img: '/images/home/tokyo.png' },
  { name: 'Paris, France', price: '$180', img: '/images/home/paris.png' },
  { name: 'London, UK', price: '$210', img: '/images/home/london.png' },
];

export default function Trending() {
  return (
    <section className="px-4 pb-16 md:px-[42px] md:pb-20">
      <div className="mx-auto max-w-[1200px]">
        <Reveal as="h2" className="text-[24px] font-bold leading-8 text-ink md:text-[30px] md:leading-9">
          Trending Destinations
        </Reveal>
        <Reveal as="p" delay={0.1} className="mt-2 text-[14px] leading-5 text-ink-soft md:text-[16px] md:leading-6">
          Handpicked favorites for your next adventure
        </Reveal>

        <RevealStagger
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:gap-6 lg:grid-cols-4"
          stagger={0}
        >
          {cities.map((c) => (
            <TrendingCard key={c.name} name={c.name} price={c.price} img={c.img} href="/search" />
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
