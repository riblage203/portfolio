import { navLinks } from "@/lib/data";

/** Barre de navigation fixe, fond flouté. */
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-dashed border-neutral-800 bg-ink/70 backdrop-blur-md">
      <nav aria-label="Navigation principale" className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:px-6">
        <a href="#accueil" className="font-mono text-sm text-neutral-100 hover:text-white">
          gr<span className="text-neutral-500">.dev</span>
        </a>
        <ul className="flex items-center gap-1 font-mono text-xs sm:gap-2 sm:text-sm">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="rounded-md px-2 py-1.5 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
