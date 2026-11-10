"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/data";

const RADIUS = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Pastille flottante : section visible + cercle de progression du scroll. */
export default function SectionPill() {
  const [active, setActive] = useState<string>(sections[0].label);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // Section « active » : celle qui traverse le milieu de l'écran.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) setActive(section.label);
          }
        }
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    targets.forEach((el) => observer.observe(el));

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center">
      <div
        className="flex items-center gap-2.5 rounded-full border border-dashed border-neutral-700 bg-ink/80 py-2 pr-4 pl-2.5 font-mono text-xs text-neutral-300 shadow-lg shadow-black/50 backdrop-blur-md"
        aria-live="polite"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="-rotate-90">
          <circle cx="9" cy="9" r={RADIUS} fill="none" stroke="#262626" strokeWidth="2" />
          <circle
            cx="9"
            cy="9"
            r={RADIUS}
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          />
        </svg>
        <span>{active}</span>
      </div>
    </div>
  );
}
