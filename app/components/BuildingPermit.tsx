const ROWS: [string, string][] = [
  ["Maître d'ouvrage", "Gabriel Rouxel"],
  ["Maître d'œuvre", "Next.js + Tailwind"],
  ["Nature des travaux", "Portfolio développeur"],
  ["Ouverture prévue", "janvier 2027"],
];

/** Panneau de permis de construire, façon panneau de chantier français. */
export default function BuildingPermit() {
  return (
    <section
      aria-labelledby="permit-title"
      className="relative z-10 w-full max-w-sm border-4 border-asphalt bg-white p-1 text-asphalt shadow-[6px_6px_0_rgb(0_0_0/0.5)]"
    >
      <div className="border-2 border-asphalt p-4">
        <h2 id="permit-title" className="border-b-2 border-asphalt pb-2 text-center font-stencil text-lg tracking-wide uppercase">
          Permis de construire
        </h2>
        <p className="mt-1 text-center text-[0.7rem] tracking-wider uppercase">
          Permis n° PC-2026-SLAM-001
        </p>
        <dl className="mt-3 space-y-2 text-sm">
          {ROWS.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.7rem] font-bold tracking-wider uppercase">{label}</dt>
              <dd className="border-b border-dashed border-asphalt/50 pb-1">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
