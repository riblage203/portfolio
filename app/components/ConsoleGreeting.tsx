"use client";

import { useEffect } from "react";

let greeted = false;

/** Easter egg : message stylé dans la console du navigateur. */
export default function ConsoleGreeting() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      "%c👷 Tu fouilles le code ? Écris-moi : gabrielrouxel@orange.fr",
      "background:#facc15;color:#111;font:bold 14px monospace;padding:8px 12px;border:3px solid #111;border-radius:4px;",
    );
  }, []);
  return null;
}
