import { cacheLife } from "next/cache";

export type LastCommit = {
  message: string;
  date: string;
};

const REPO = "riblage203/portfolio";

/** Dernier commit du repo via l'API GitHub publique. Retourne null en cas d'échec. */
export async function getLastCommit(): Promise<LastCommit | null> {
  "use cache";
  cacheLife({ revalidate: 3600 });

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/commits?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-en-construction",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) return null;

    const data: unknown = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const commit = data[0]?.commit;
    const message = commit?.message;
    const date = commit?.committer?.date ?? commit?.author?.date;
    if (typeof message !== "string" || typeof date !== "string") return null;

    return { message: message.split("\n")[0], date };
  } catch {
    return null;
  }
}
