"use client";

import { useId, useState } from "react";
import type { Experience } from "@/lib/data";

/** Entrée de la timeline, dépliable au clic pour afficher le détail. */
export default function TimelineItem({ item }: { item: Experience }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const ongoing = item.status === "ongoing";

  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className={`absolute top-5 left-0 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ink ${
          ongoing ? "bg-green-400 shadow-[0_0_0_3px_rgb(74_222_128/0.15)]" : "bg-neutral-500"
        }`}
      />
      <div className="card">
        <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start gap-3 p-4 text-left"
        >
          <span className="block min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-neutral-100">{item.organization}</span>
              <span className={`badge ${ongoing ? "badge-green" : ""}`}>
                {ongoing ? "En cours" : "Terminé"}
              </span>
            </span>
            <span className="mt-1 block text-sm text-neutral-400">{item.role}</span>
            <span className="mt-1 block font-mono text-xs text-neutral-500">
              {item.start} → {item.end}
            </span>
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={`mt-1 h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        </h3>
        <div id={panelId} className="accordion-panel" data-open={open ? "" : undefined} inert={!open}>
          <div className="overflow-hidden">
            <ul className="space-y-1.5 border-t border-dashed border-neutral-800 px-4 py-3 text-sm text-neutral-400">
              {item.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span aria-hidden="true" className="text-neutral-600">–</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}
