import { Moon } from "lucide-react";
import { buttonClasses } from "../atoms/Button.js";
import { TinyverseLink } from "../atoms/TinyverseLink.js";

export interface AboutSignProps {
  portfolioUrl: string;
  repoUrl: string;
}

/** The information panel: what the Tiny apps are and why the first load can be slow. */
export function AboutSign({ portfolioUrl, repoUrl }: AboutSignProps) {
  return (
    <section aria-labelledby="about-title" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-base font-bold tracking-[0.12em] uppercase">About</p>
        <h1 id="about-title" className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
          Tiny apps, on purpose.
        </h1>
      </div>
      <p className="text-xl font-semibold">
        Tiny Flat Checker is one of the Tiny apps: small proofs of concept built for fun and for personal use.
      </p>

      <div className="flex items-start gap-3 rounded-[6px] bg-ink p-3 pr-4 text-on-panel">
        <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-[3px] bg-surface text-ink">
          <Moon className="size-7" strokeWidth={2.5} />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl leading-tight font-extrabold">Slow to load? It's asleep.</h2>
          <p className="text-lg">
            The back-end is deliberately scaled down to cost next to nothing. When nobody has used the app for a while,
            its server goes to sleep, so the first request can take a few seconds while it wakes up. Nothing is broken,
            the lights in the terminal are just coming on.
          </p>
        </div>
      </div>

      <p className="text-lg text-ink-muted">
        The Tiny apps aren't products, don't come with uptime promises, and may change or disappear as I tinker.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "no-underline")}>
          Get to know me
        </a>
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary", "no-underline")}>
          {/* Official GitHub mark (Octicons mark-github). */}
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-5" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          View on GitHub
        </a>
        <TinyverseLink className="text-sm" />
      </div>
    </section>
  );
}
