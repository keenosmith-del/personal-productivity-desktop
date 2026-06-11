function ProgressRing({
  value,
  size = 42,
}) {
  const radius = 16;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (value / 100) *
      circumference;

  return (
    <svg
      width={size}
      height={size}
    >
      <circle
        cx="21"
        cy="21"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="3"
      />

      <circle
        cx="21"
        cy="21"
        r={radius}
        fill="none"
        stroke="#52677d"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={
          circumference
        }
        strokeDashoffset={
          offset
        }
        transform="rotate(-90 21 21)"
      />
    </svg>
  );
}

export default ProgressRing;