export default function HazardStripe({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Bande de signalisation jaune et noire"
      className={`hazard-stripes h-5 w-full shrink-0 border-y-2 border-asphalt sm:h-6 ${className}`}
    />
  );
}
