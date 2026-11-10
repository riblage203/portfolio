import { cacheLife } from "next/cache";

export type ContributionDay = {
  date: string; // AAAA-MM-JJ
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type Contributions = {
  total: number;
  days: ContributionDay[];
};

const TIMEOUT = 5000;

const GRAPHQL_LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function toLevel(value: unknown): ContributionDay["level"] {
  const n = Number(value);
  return n >= 0 && n <= 4 ? (Math.round(n) as ContributionDay["level"]) : 0;
}

/** API GraphQL officielle (nécessite GITHUB_TOKEN). */
async function fromGraphQL(login: string, token: string): Promise<Contributions | null> {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio",
    },
    body: JSON.stringify({ query, variables: { login } }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) return null;

  const json = await res.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar || !Array.isArray(calendar.weeks)) return null;

  const days: ContributionDay[] = calendar.weeks.flatMap(
    (week: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
      week.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: GRAPHQL_LEVELS[d.contributionLevel] ?? 0,
      })),
  );
  return { total: Number(calendar.totalContributions) || 0, days };
}

/** API publique de repli : https://github.com/grubersjoe/github-contributions-api */
async function fromPublicApi(login: string): Promise<Contributions | null> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(login)}?y=last`,
    { headers: { "User-Agent": "portfolio" }, signal: AbortSignal.timeout(TIMEOUT) },
  );
  if (!res.ok) return null;

  const json = await res.json();
  if (!Array.isArray(json?.contributions)) return null;

  const days: ContributionDay[] = json.contributions.map(
    (d: { date: string; count: number; level: number }) => ({
      date: d.date,
      count: Number(d.count) || 0,
      level: toLevel(d.level),
    }),
  );
  const total =
    typeof json.total?.lastYear === "number"
      ? json.total.lastYear
      : days.reduce((sum, d) => sum + d.count, 0);
  return { total, days };
}

/** Contributions des 12 derniers mois. Retourne null si toutes les sources échouent. */
export async function getContributions(login: string): Promise<Contributions | null> {
  "use cache";
  cacheLife({ revalidate: 3600 });

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      const data = await fromGraphQL(login, token);
      if (data && data.days.length > 0) return data;
    } catch {
      // on tente la source publique
    }
  }

  try {
    const data = await fromPublicApi(login);
    if (data && data.days.length > 0) return data;
  } catch {
    // état vide côté UI
  }
  return null;
}
