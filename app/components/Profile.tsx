import Image from "next/image";
import { profile } from "@/lib/data";
import ParisClock from "./ParisClock";
import RichText from "./RichText";

/** Section profil : avatar, nom, localisation + heure, puces et liens. */
export default function Profile() {
  return (
    <section id="accueil" aria-labelledby="profil-title" className="section pt-28 sm:pt-32">
      <div data-reveal className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={profile.avatar}
            alt={`Photo de ${profile.name}`}
            width={72}
            height={72}
            priority
            className="h-[72px] w-[72px] rounded-2xl border border-dashed border-neutral-700 object-cover"
          />
          <div className="min-w-0">
            <h1 id="profil-title" className="text-2xl font-semibold tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="font-mono text-sm text-neutral-500">@{profile.handle}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-xs text-neutral-400">
              <span>{profile.location}</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <ParisClock />
            </p>
          </div>
        </div>

        <ul className="flex gap-4 font-mono text-sm sm:flex-col sm:items-end sm:gap-1.5">
          {profile.links.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-1 text-neutral-300 hover:text-white"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  >
                    ↗
                  </span>
                  {external && <span className="sr-only">(nouvel onglet)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <ul data-reveal className="mt-8 space-y-2 text-[15px] leading-relaxed text-neutral-400">
        {profile.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
            <span>
              <RichText text={bullet} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
