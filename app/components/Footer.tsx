import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-2xl border-t border-dashed border-neutral-800 px-4 pt-8 pb-28 text-center font-mono text-xs text-neutral-500 sm:px-6">
      © 2026 {profile.name} — construit avec Next.js, hébergé sur Vercel
    </footer>
  );
}
