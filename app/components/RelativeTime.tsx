"use client";

import { useEffect, useState } from "react";

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

function formatAgo(date: Date): string {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "always" });
  for (const [unit, size] of UNITS) {
    if (seconds >= size) return rtf.format(-Math.floor(seconds / size), unit);
  }
  return "à l'instant";
}

/** Affiche « il y a X » calculé côté client (la donnée serveur est mise en cache). */
export default function RelativeTime({ iso }: { iso: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const date = new Date(iso);
    const update = () => setLabel(formatAgo(date));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [iso]);

  return (
    <time dateTime={iso} title={new Date(iso).toLocaleString("fr-FR")}>
      {label ?? "récemment"}
    </time>
  );
}
