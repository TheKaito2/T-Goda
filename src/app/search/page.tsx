import SearchHero from '@/components/search/SearchHero';
import SearchResults from '@/components/search/SearchResults';
import { MOCK_HOTELS } from '@/lib/mock-hotels';

export const metadata = { title: 'Search hotels — T-Goda' };

export default function SearchResultPage() {
  return (
    <>
      <SearchHero />
      <main className="bg-surface-page py-6 md:py-8">
        <SearchResults hotels={MOCK_HOTELS} />
      </main>
    </>
  );
}
