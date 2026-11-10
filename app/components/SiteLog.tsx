import { Suspense } from "react";
import { getLastCommit } from "../lib/github";
import RelativeTime from "./RelativeTime";

async function LastCommitLine() {
  const commit = await getLastCommit();

  if (!commit) {
    return (
      <p>
        <span className="text-hazard">$</span> Dernier coup de pioche : récemment — les ouvriers
        sont au travail.
      </p>
    );
  }

  return (
    <p>
      <span className="text-hazard">$</span> Dernier coup de pioche :{" "}
      <RelativeTime iso={commit.date} /> —{" "}
      <span className="text-green-300">{commit.message}</span>
    </p>
  );
}

/** Journal de chantier, style terminal : dernier commit du repo GitHub. */
export default function SiteLog() {
  return (
    <section
      aria-labelledby="sitelog-title"
      className="relative z-10 w-full max-w-sm overflow-hidden rounded-md border-2 border-neutral-600 bg-black/90 shadow-[6px_6px_0_rgb(0_0_0/0.5)]"
    >
      <div className="flex items-center gap-2 border-b border-neutral-700 bg-neutral-800 px-3 py-1.5">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-hazard" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <h2 id="sitelog-title" className="ml-2 text-xs text-neutral-300">
          journal-de-chantier.log
        </h2>
      </div>
      <div className="space-y-1 p-4 text-sm leading-relaxed text-neutral-100">
        <p className="text-neutral-400">
          <span className="text-hazard">$</span> git log -1 --chantier
        </p>
        <Suspense
          fallback={
            <p className="text-neutral-400">
              <span className="text-hazard">$</span> Lecture du journal…
            </p>
          }
        >
          <LastCommitLine />
        </Suspense>
        <p aria-hidden="true" className="text-hazard motion-safe:animate-pulse">
          ▌
        </p>
      </div>
    </section>
  );
}
