import Image from "next/image";
import { projects, type Project } from "@/lib/data";
import SectionTitle from "./SectionTitle";

function Cover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Aperçu de ${project.title}`}
        fill
        sizes="(min-width: 640px) 200px, 100vw"
        className="object-cover"
      />
    );
  }
  // Visuel de remplacement en attendant une capture
  return (
    <div aria-hidden="true" className="dot-grid flex h-full w-full items-center justify-center">
      <span className="font-mono text-2xl text-neutral-600">
        {project.title
          .split(/\s+/)
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-reveal className="card card-hover flex flex-col overflow-hidden sm:flex-row">
      <div className="relative aspect-video w-full shrink-0 border-b border-dashed border-neutral-800 bg-neutral-950 sm:aspect-auto sm:w-48 sm:border-r sm:border-b-0">
        <Cover project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium text-neutral-100">{project.title}</h3>
          {project.featured && <span className="badge badge-amber">★ featured</span>}
        </div>
        <p className="text-sm leading-relaxed text-neutral-400">{project.description}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="badge">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
              Live <span aria-hidden="true">↗</span>
              <span className="sr-only">: {project.title} (nouvel onglet)</span>
            </a>
          ) : (
            <span className="btn btn-sm cursor-not-allowed opacity-40" aria-disabled="true">
              Live<span className="sr-only"> : bientôt disponible</span>
            </span>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
              GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only">: {project.title} (nouvel onglet)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Cartes projets : image à gauche (au-dessus sur mobile). */
export default function Projects() {
  return (
    <section id="projets" aria-labelledby="projets-title" className="section">
      <SectionTitle id="projets-title">Projets</SectionTitle>
      <div className="mt-6 space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
