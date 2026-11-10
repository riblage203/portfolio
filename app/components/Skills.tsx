import { skills, type Skill } from "@/lib/data";
import SectionTitle from "./SectionTitle";

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <li className="flex shrink-0 items-center gap-2 rounded-lg border border-dashed border-neutral-800 px-3 py-2 font-mono text-xs text-neutral-300">
      {/* Logo Simple Icons via CDN (pas de dépendance npm) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${skill.icon}/d4d4d4`}
        alt=""
        width={16}
        height={16}
        loading="lazy"
        decoding="async"
        className="h-4 w-4"
      />
      {skill.name}
    </li>
  );
}

/** Deux lignes de compétences qui défilent en boucle en sens opposés. */
export default function Skills() {
  return (
    <section id="competences" aria-labelledby="competences-title" className="section">
      <SectionTitle id="competences-title">Compétences</SectionTitle>
      <div data-reveal className="mt-6 space-y-3">
        {skills.map((row, i) => (
          <div key={i} className="marquee">
            <div className={`marquee-track ${i % 2 === 1 ? "marquee-reverse" : ""}`}>
              {/* La liste est dupliquée pour une boucle sans couture ; la copie est masquée aux lecteurs d'écran. */}
              <ul className="flex shrink-0 gap-3 pr-3">
                {row.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </ul>
              <ul className="flex shrink-0 gap-3 pr-3" aria-hidden="true">
                {row.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
