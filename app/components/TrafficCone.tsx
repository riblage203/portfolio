"use client";

import { useState, type CSSProperties } from "react";

type Props = {
  /** Sens dans lequel le cône roule : 1 = vers la droite, -1 = vers la gauche */
  direction?: 1 | -1;
  className?: string;
};

/** Cône de chantier. Easter egg : au clic il tombe, roule hors de l'écran, puis revient. */
export default function TrafficCone({ direction = 1, className = "" }: Props) {
  const [rolling, setRolling] = useState(false);

  function knockOver() {
    if (rolling) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRolling(true);
  }

  return (
    <button
      type="button"
      onClick={knockOver}
      aria-label="Cône de chantier — cliquer pour le faire tomber"
      className={`cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hazard ${className}`}
    >
      <svg
        viewBox="0 0 80 100"
        aria-hidden="true"
        onAnimationEnd={() => setRolling(false)}
        className={`h-full w-full ${rolling ? "cone-rolling" : ""}`}
        style={
          {
            "--dir": direction,
            transformOrigin: direction === 1 ? "90% 95%" : "10% 95%",
          } as CSSProperties
        }
      >
        <path d="M33 6h14l22 80H11z" fill="#f97316" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M27 30h26l4 14H23z" fill="#f5f5f5" />
        <path d="M20 56h40l4 14H16z" fill="#f5f5f5" />
        <path d="M33 6h14l22 80H11z" fill="none" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="3" y="85" width="74" height="10" rx="2" fill="#27272a" stroke="#111" strokeWidth="2.5" />
      </svg>
    </button>
  );
}
