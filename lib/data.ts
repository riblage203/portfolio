/**
 * Toutes les données du portfolio. Modifie ce fichier pour mettre le site à jour.
 * Les segments entourés de ** dans les puces sont affichés en gras.
 */

export const profile = {
  name: "Gabriel Rouxel",
  handle: "riblage203",
  avatar: "/avatar.png",
  location: "Lille, France",
  timeZone: "Europe/Paris",
  email: "gabrielrouxel@orange.fr",
  bullets: [
    "Étudiant en **BTS SIO SLAM** à Roubaix",
    "À la recherche d'une **alternance** en développement web",
    "Passionné de **dev web**, de **cybersécurité** et de projets perso",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/riblage203" },
    { label: "Mail", href: "mailto:gabrielrouxel@orange.fr" },
  ],
};

export const github = {
  /** Compte dont on affiche le graphe de contributions. */
  login: "riblage203",
};

export type Skill = {
  name: string;
  /** Slug Simple Icons : https://simpleicons.org */
  icon: string;
};

/** Deux lignes de logos qui défilent en sens opposés. */
export const skills: Skill[][] = [
  [
    { name: "PHP", icon: "php" },
    { name: "Symfony", icon: "symfony" },
    { name: "Java", icon: "openjdk" },
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextdotjs" },
  ],
  [
    { name: "Svelte", icon: "svelte" },
    { name: "Tailwind", icon: "tailwindcss" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "MySQL", icon: "mysql" },
    { name: "Git", icon: "git" },
    { name: "Linux", icon: "linux" },
    { name: "Docker", icon: "docker" },
  ],
];

export type Experience = {
  organization: string;
  role: string;
  start: string;
  end: string;
  status: "done" | "ongoing";
  details: string[];
};

export const experiences: Experience[] = [
  {
    organization: "La Redoute",
    role: "Stagiaire — équipe Testing Platform",
    start: "mai 2026",
    end: "juin 2026",
    status: "done",
    details: [
      "Écriture et maintenance de tests automatisés de non-régression.",
      "Mise en place et analyse de tests de performance.",
      "Travail au sein d'une équipe dédiée à la plateforme de tests.",
    ],
  },
  {
    organization: "Lycée Saint-Rémi",
    role: "BTS SIO option SLAM",
    start: "2025",
    end: "2027",
    status: "ongoing",
    details: [
      "Solutions Logicielles et Applications Métiers, à Roubaix.",
      "Développement d'applications web et métiers, bases de données, gestion de projet.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  featured?: boolean;
  /** Chemin d'une image dans /public. Sans image, un visuel de remplacement est affiché. */
  image?: string;
  live?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: "Sparkey",
    description: "Visualiseur MIDI pour piano : les notes jouées s'affichent en temps réel.",
    tech: ["TypeScript", "Web MIDI", "Canvas"],
    featured: true,
    github: "https://github.com/riblage203",
  },
  {
    title: "Stage Tracker",
    description:
      "Suivi de candidatures de stage : vues kanban et tableau, statistiques et notifications Telegram.",
    tech: ["Next.js", "PostgreSQL", "Telegram API"],
    github: "https://github.com/riblage203",
  },
  {
    title: "Odin's Eye",
    description: "Jeu de machine à sous sur le thème de la mythologie nordique.",
    tech: ["Svelte", "PixiJS"],
    github: "https://github.com/riblage203",
  },
];

/** Sections de la page, dans l'ordre (id d'ancre + libellé de la pastille). */
export const sections = [
  { id: "accueil", label: "Accueil" },
  { id: "competences", label: "Compétences" },
  { id: "experience", label: "Expérience" },
  { id: "activite", label: "Activité" },
  { id: "projets", label: "Projets" },
  { id: "contact", label: "Contact" },
] as const;

/** Liens de la barre de navigation. */
export const navLinks = [
  { id: "accueil", label: "Accueil" },
  { id: "projets", label: "Projets" },
  { id: "experience", label: "Expérience" },
  { id: "contact", label: "Contact" },
] as const;
