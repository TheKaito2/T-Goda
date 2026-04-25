import Image from 'next/image';

const thumbs = [
  '/images/room-detail/gallery-1.png',
  '/images/room-detail/gallery-2.png',
  '/images/room-detail/gallery-4.png',
  '/images/room-detail/gallery-5.png',
];

export default function Gallery() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-[608px_1fr]">
      <div className="relative h-[260px] overflow-hidden rounded-[12px] md:h-[500px]">
        <Image
          src="/images/room-detail/gallery-3.png"
          alt="Resort hero"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 608px"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {thumbs.map((t, i) => (
          <div key={t} className="relative h-[120px] overflow-hidden rounded-[12px] md:h-[242px]">
            <Image
              src={t}
              alt={`Resort photo ${i + 2}`}
              fill
              sizes="(max-width: 1024px) 50vw, 296px"
              className="object-cover"
            />
            {i === thumbs.length - 1 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="text-[16px] font-semibold text-white">View all 24 photos</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
