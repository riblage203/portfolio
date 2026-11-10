/** Gyrophare orange qui clignote doucement. */
export default function Beacon({ className = "" }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="Gyrophare orange clignotant"
      viewBox="0 0 64 64"
      className={className}
    >
      <g className="beacon-light">
        <path d="M14 46V30a18 18 0 0 1 36 0v16z" fill="#f97316" />
        <path d="M22 30a10 10 0 0 1 10-10" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
      <path d="M14 46V30a18 18 0 0 1 36 0v16z" fill="none" stroke="#111" strokeWidth="2.5" />
      <rect x="8" y="46" width="48" height="10" rx="2" fill="#3f3f46" stroke="#111" strokeWidth="2.5" />
    </svg>
  );
}
