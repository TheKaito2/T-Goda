import Hero from '@/components/home/Hero';
import ValueProps from '@/components/home/ValueProps';
import Trending from '@/components/home/Trending';
import PromoBanner from '@/components/home/PromoBanner';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ValueProps />
      <Trending />
      <PromoBanner />
      <Newsletter />
    </main>
  );
}
