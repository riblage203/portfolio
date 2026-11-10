"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  hour: "2-digit",
  minute: "2-digit",
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

const getTime = () => formatter.format(new Date());
const getServerTime = () => "--:--";

/** Heure de Paris en direct. */
export default function ParisClock() {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  return (
    <span className="tabular-nums" aria-label={`Heure à Paris : ${time}`}>
      {time}
    </span>
  );
}
