type Props = { value?: number; size?: number; className?: string };

export default function StarRating({ value = 5, size = 14, className }: Props) {
  return (
    <div className={`flex items-center gap-0.5 ${className ?? ''}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(value);
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 15 15"
            fill={filled ? '#FACC15' : 'none'}
            stroke={filled ? 'none' : '#D1D5DB'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.86875 14.25L4.0875 8.98125L0 5.4375L5.4 4.96875L7.5 0L9.6 4.96875L15 5.4375L10.9125 8.98125L12.1313 14.25L7.5 11.4563L2.86875 14.25Z" />
          </svg>
        );
      })}
    </div>
  );
}
