const TEXT = "ZONE EN TRAVAUX — ACCÈS RESTREINT";

function Segment() {
  return (
    <span className="flex shrink-0 items-center">
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="flex items-center gap-6 px-6">
          <span>{TEXT}</span>
          <span aria-hidden="true">⚠</span>
        </span>
      ))}
    </span>
  );
}

/** Ruban de rubalise qui traverse l'écran en diagonale. Décoratif. */
export default function CautionTape() {
  return (
    <div
      role="img"
      aria-label="Ruban de signalisation : zone en travaux, accès restreint"
      className="pointer-events-none absolute top-[58%] -left-[25%] z-0 w-[150%] -rotate-[7deg] overflow-hidden border-y-4 border-asphalt bg-hazard py-1.5 shadow-[0_6px_18px_rgb(0_0_0/0.5)] select-none"
    >
      <div
        aria-hidden="true"
        className="tape-track flex w-max font-mono text-sm font-bold tracking-[0.2em] whitespace-nowrap text-asphalt sm:text-base"
      >
        <Segment />
        <Segment />
      </div>
    </div>
  );
}
