"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "gabrielrouxel@orange.fr";

/** Seul moyen de contact : gros panneau « Me contacter » + copie de l'adresse. */
export default function ContactSign() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Repli pour les contextes sans API Clipboard
      const input = document.createElement("textarea");
      input.value = EMAIL;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={`mailto:${EMAIL}`}
        aria-label={`Me contacter par e-mail : ${EMAIL}`}
        className="group rounded-lg bg-hazard p-1.5 shadow-[0_8px_0_#000,0_14px_24px_rgb(0_0_0/0.5)] transition-transform hover:-translate-y-0.5 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-1 active:shadow-[0_3px_0_#000]"
      >
        <span className="flex items-center gap-3 rounded-md border-4 border-asphalt px-8 py-4 font-stencil text-2xl tracking-wider text-asphalt uppercase sm:text-3xl">
          <span aria-hidden="true">⚠</span>
          Me contacter
          <span aria-hidden="true">⚠</span>
        </span>
      </a>
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="text-neutral-200">{EMAIL}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Adresse copiée" : "Copier l'adresse e-mail"}
          className="cursor-pointer rounded border border-hazard px-2 py-0.5 text-xs text-hazard hover:bg-hazard hover:text-asphalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hazard"
        >
          {copied ? "Copié ✓" : "Copier"}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Adresse e-mail copiée dans le presse-papiers" : ""}
        </span>
      </div>
    </div>
  );
}
