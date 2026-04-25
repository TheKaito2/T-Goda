import Breadcrumb from '@/components/room/Breadcrumb';
import DetailHeader from '@/components/room/DetailHeader';
import Gallery from '@/components/room/Gallery';
import Overview from '@/components/room/Overview';
import Amenities from '@/components/room/Amenities';
import ReviewsSummary from '@/components/room/ReviewsSummary';
import MapCard from '@/components/room/MapCard';
import RoomTable from '@/components/room/RoomTable';
import GuestReviews from '@/components/room/GuestReviews';

export default function RoomDetailPage() {
  return (
    <main className="bg-surface-page pb-6 pt-10 md:pb-8 md:pt-12">
      <div className="mx-auto max-w-frame px-4 md:px-[42px]">
        <Breadcrumb />
        <div className="mt-6">
          <DetailHeader />
        </div>
        <div className="mt-6">
          <Gallery />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_378px]">
          <div className="min-w-0">
            <Overview />
            <Amenities />
          </div>
          <aside className="flex flex-col gap-6">
            <ReviewsSummary />
            <MapCard />
          </aside>
        </div>

        <RoomTable />
        <GuestReviews />
      </div>
    </main>
  );
}
