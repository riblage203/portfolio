"use client";

import { useEffect, useState } from "react";

const TARGET = new Date(2027, 0, 1, 0, 0, 0).getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function remaining(): Parts | null {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86_400),
    hours: Math.floor((s % 86_400) / 3_600),
    minutes: Math.floor((s % 3_600) / 60),
    seconds: s % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Compte à rebours jusqu'au 1er janvier 2027. */
export default function Countdown() {
  const [parts, setParts] = useState<Parts | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setParts(remaining());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells: [string, string][] = parts
    ? [
        [String(parts.days), "jours"],
        [pad(parts.hours), "heures"],
        [pad(parts.minutes), "min"],
        [pad(parts.seconds), "sec"],
      ]
    : [
        ["--", "jours"],
        ["--", "heures"],
        ["--", "min"],
        ["--", "sec"],
      ];

  return (
    <section
      aria-labelledby="countdown-title"
      className="relative z-10 w-full max-w-sm border-4 border-asphalt bg-hazard p-4 text-asphalt shadow-[6px_6px_0_rgb(0_0_0/0.5)]"
    >
      <h2 id="countdown-title" className="text-center text-xs font-bold tracking-widest uppercase">
        Ouverture du chantier dans
      </h2>
      {parts === null ? (
        <p className="mt-2 text-center font-stencil text-2xl">Ouverture imminente !</p>
      ) : (
        <div className="mt-3 grid grid-cols-4 gap-2 text-center" role="timer" aria-live="off">
          {cells.map(([value, label]) => (
            <div key={label} className="rounded-sm bg-asphalt px-1 py-2 text-hazard">
              <div className="font-stencil text-2xl tabular-nums sm:text-3xl">{value}</div>
              <div className="text-[0.65rem] tracking-wider text-neutral-200 uppercase">{label}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
