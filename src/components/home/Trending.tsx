import Image from 'next/image';
import Link from 'next/link';

const cities = [
  { name: 'Bangkok, Thailand', price: '$120', img: '/images/home/bangkok.png' },
  { name: 'Tokyo, Japan',     price: '$250', img: '/images/home/tokyo.png' },
  { name: 'Paris, France',    price: '$180', img: '/images/home/paris.png' },
  { name: 'London, UK',       price: '$210', img: '/images/home/london.png' },
];

export default function Trending() {
  return (
    <section className="px-4 pb-16 md:px-[42px] md:pb-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-[24px] font-bold leading-8 text-ink md:text-[30px] md:leading-9">Trending Destinations</h2>
        <p className="mt-2 text-[14px] leading-5 text-ink-soft md:text-[16px] md:leading-6">
          Handpicked favorites for your next adventure
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:gap-6 lg:grid-cols-4">
          {cities.map((c) => (
            <Link
              key={c.name}
              href="/search"
              className="group block"
            >
              <div className="relative aspect-[282/376] w-full overflow-hidden rounded-[16px]">
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  sizes="(max-width: 1200px) 25vw, 282px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-[16px] font-bold leading-6 text-ink">{c.name}</h3>
                <p className="mt-0.5 text-[14px] font-bold leading-none text-ink-soft">
                  Starting from <span className="text-brand-primary">{c.price}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
