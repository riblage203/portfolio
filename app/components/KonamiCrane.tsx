"use client";

import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

type Phase = "hidden" | "arriving" | "lowered" | "leaving";

/** Easter egg : Konami code → une grue descend et dépose « GABRIEL ROUXEL ». */
export default function KonamiCrane() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const progress = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

    function launch() {
      clear();
      setPhase("arriving");
      later(() => setPhase("lowered"), 700);
      later(() => setPhase("leaving"), 7500);
      later(() => setPhase("hidden"), 9500);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        clear();
        setPhase("hidden");
        return;
      }
      const key = e.key.toLowerCase();
      if (key === SEQUENCE[progress.current]) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          launch();
        }
      } else {
        progress.current = key === SEQUENCE[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clear();
    };
  }, []);

  const visible = phase === "arriving" || phase === "lowered";
  const lowered = phase === "lowered";

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {phase === "lowered" ? "Une grue dépose le panneau : Gabriel Rouxel" : ""}
      </div>
      {phase !== "hidden" && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {/* Flèche (jib) */}
          <svg className="absolute top-10 right-[4%] left-[12%] h-7 w-[84%]">
            <defs>
              <pattern id="lattice-h" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M0 28L14 0L28 28" fill="none" stroke="#111" strokeWidth="3" />
              </pattern>
            </defs>
            <rect width="100%" height="28" fill="#facc15" stroke="#111" strokeWidth="6" />
            <rect width="100%" height="28" fill="url(#lattice-h)" />
          </svg>
          {/* Mât */}
          <svg className="absolute top-10 right-[12%] bottom-0 h-[calc(100%-2.5rem)] w-9 translate-x-1/2">
            <defs>
              <pattern id="lattice-v" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M0 0L36 18L0 36" fill="none" stroke="#111" strokeWidth="3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="#facc15" stroke="#111" strokeWidth="6" />
            <rect width="100%" height="100%" fill="url(#lattice-v)" />
          </svg>
          {/* Cabine */}
          <svg viewBox="0 0 68 44" className="absolute top-[68px] right-[12%] h-11 w-[68px] translate-x-1/2">
            <rect x="2" y="2" width="64" height="40" rx="4" fill="#facc15" stroke="#111" strokeWidth="3" />
            <rect x="10" y="9" width="30" height="18" rx="2" fill="#7dd3fc" stroke="#111" strokeWidth="2" />
          </svg>
          {/* Chariot */}
          <svg viewBox="0 0 40 14" className="absolute top-16 left-1/2 h-3.5 w-10 -translate-x-1/2">
            <rect x="1.5" y="1.5" width="37" height="11" rx="2" fill="#3f3f46" stroke="#111" strokeWidth="3" />
          </svg>

          {/* Câble + charge */}
          <div className="absolute inset-x-0 top-[76px] bottom-0 overflow-hidden">
            <div
              className={`absolute left-1/2 flex -translate-x-1/2 flex-col items-center transition-transform duration-[2200ms] ease-out ${lowered ? "translate-y-0" : "-translate-y-full"}`}
            >
              <div className="h-[30vh] w-1 bg-neutral-900" />
              <svg viewBox="0 0 40 30" className="h-8 w-10">
                <path d="M20 0v10a8 8 0 1 1-8 8" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <div className="relative -mt-1 flex flex-col items-center">
                <div className="h-6 w-56 [clip-path:polygon(50%_0,100%_100%,98%_100%,50%_8%,2%_100%,0_100%)] bg-neutral-900" />
                <div className="rounded-sm border-4 border-asphalt bg-hazard px-6 py-3 font-stencil text-3xl whitespace-nowrap text-asphalt shadow-[0_10px_30px_rgb(0_0_0/0.6)] sm:text-5xl">
                  GABRIEL ROUXEL
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
