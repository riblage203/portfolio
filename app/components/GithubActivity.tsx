import { Suspense } from "react";
import { getContributions, type ContributionDay } from "../lib/contributions";
import { github } from "@/lib/data";
import SectionTitle from "./SectionTitle";

const LEVEL_CLASSES = [
  "bg-neutral-800/80",
  "bg-green-900",
  "bg-green-700",
  "bg-green-500",
  "bg-green-400",
];

const dayFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" });

/** Regroupe les jours en semaines (dimanche → samedi), en complétant la première. */
function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];
  const firstWeekday = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  for (let i = 0; i < firstWeekday; i++) week.push(null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}

/** Libellés de mois placés sur la première semaine de chaque mois. */
function monthLabels(weeks: (ContributionDay | null)[][]) {
  const labels: { column: number; label: string }[] = [];
  let previous = -1;
  weeks.forEach((week, column) => {
    const first = week.find((d) => d !== null);
    if (!first) return;
    const date = new Date(`${first.date}T00:00:00Z`);
    const month = date.getUTCMonth();
    if (month !== previous) {
      const last = labels.at(-1);
      if (!last || column - last.column >= 3) {
        labels.push({ column, label: monthFormatter.format(date).replace(".", "") });
      }
      previous = month;
    }
  });
  return labels;
}

function plural(n: number) {
  return `${n.toLocaleString("fr-FR")} contribution${n > 1 ? "s" : ""}`;
}

async function Graph() {
  const data = await getContributions(github.login);

  if (!data) {
    return (
      <div className="card flex flex-col items-center gap-2 p-8 text-center">
        <p className="text-sm text-neutral-400">Le graphe des contributions est momentanément indisponible.</p>
        <a
          href={`https://github.com/${github.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-neutral-500 hover:text-neutral-200"
        >
          Voir le profil GitHub ↗
        </a>
      </div>
    );
  }

  const weeks = toWeeks(data.days);
  const labels = monthLabels(weeks);
  const columns = { gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` };

  return (
    <div className="card p-4 sm:p-5">
      <div
        aria-hidden="true"
        className="mb-2 grid gap-[3px] font-mono text-[10px] text-neutral-500"
        style={columns}
      >
        {labels.map((l) => (
          <span key={l.column} style={{ gridColumnStart: l.column + 1 }} className="col-span-3 whitespace-nowrap">
            {l.label}
          </span>
        ))}
      </div>
      <div
        role="img"
        aria-label={`Graphe des contributions GitHub de ${github.login} : ${plural(data.total)} sur les 12 derniers mois.`}
        className="grid gap-[3px]"
        style={columns}
      >
        {weeks.map((week, w) => (
          <div key={w} className="grid grid-rows-7 gap-[3px]">
            {week.map((day, d) =>
              day ? (
                <span
                  key={day.date}
                  title={`${plural(day.count)} le ${dayFormatter.format(new Date(`${day.date}T00:00:00Z`))}`}
                  className={`aspect-square w-full rounded-full ${LEVEL_CLASSES[day.level]}`}
                />
              ) : (
                <span key={`empty-${d}`} className="aspect-square w-full" />
              ),
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-neutral-500">
        <p>
          <span className="text-neutral-200">{plural(data.total)}</span> cette année
        </p>
        <div aria-hidden="true" className="flex items-center gap-1.5">
          <span>moins</span>
          {LEVEL_CLASSES.map((c) => (
            <span key={c} className={`h-2.5 w-2.5 rounded-full ${c}`} />
          ))}
          <span>plus</span>
        </div>
      </div>
    </div>
  );
}

/** Activité GitHub des 12 derniers mois (données récupérées côté serveur, revalidées toutes les heures). */
export default function GithubActivity() {
  return (
    <section id="activite" aria-labelledby="activite-title" className="section">
      <SectionTitle id="activite-title">Activité GitHub</SectionTitle>
      <div data-reveal className="mt-6">
        <Suspense
          fallback={
            <div className="card h-40 animate-pulse p-5" aria-label="Chargement du graphe des contributions" />
          }
        >
          <Graph />
        </Suspense>
      </div>
    </section>
  );
}
