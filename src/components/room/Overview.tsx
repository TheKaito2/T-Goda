import Reveal from '@/components/motion/Reveal';

type Props = {
  body?: string;
};

const DEFAULT_BODY =
  'Experience unparalleled luxury at Grand Azure Resort & Spa, nestled on the pristine shores of Elounda Bay. This architectural masterpiece blends traditional Cretan charm with ultra-modern design, offering guests breathtaking panoramic views of the Mediterranean. Whether you’re seeking a romantic getaway or a rejuvenation retreat, our world-class amenities and personalized service ensure a stay that transcends the ordinary.';

export default function Overview({ body = DEFAULT_BODY }: Props) {
  return (
    <Reveal as="section">
      <h2 className="text-[20px] font-semibold leading-7 text-ink">Overview</h2>
      <p className="mt-3 text-[16px] leading-[26px] text-ink-soft">{body}</p>
    </Reveal>
  );
}
