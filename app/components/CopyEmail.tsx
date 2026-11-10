"use client";

import { useEffect, useRef, useState } from "react";

/** Bouton qui copie l'adresse e-mail, avec retour « Copié ✓ ». */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Repli pour les contextes sans API Clipboard
      const input = document.createElement("textarea");
      input.value = email;
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
    <button type="button" onClick={copy} className="btn">
      <span aria-live="polite">{copied ? "Copié ✓" : "Copier l'adresse"}</span>
    </button>
  );
}
