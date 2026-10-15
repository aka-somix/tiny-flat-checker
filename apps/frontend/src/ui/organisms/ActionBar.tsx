import type { ReactNode } from "react";

export interface ActionBarProps {
  answered: number;
  total: number;
  /** Polite status line, e.g. "Draft saved on this phone". */
  status?: ReactNode;
  children: ReactNode;
}

/** Bottom bar in the thumb zone: overall progress plus the page's actions. */
export function ActionBar({ answered, total, status, children }: ActionBarProps) {
  const pct = total ? Math.round((answered / total) * 100) : 0;
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t-4 border-ink bg-surface pb-[env(safe-area-inset-bottom)]">
      <div
        role="progressbar"
        aria-label="Checks answered"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answered}
        aria-valuetext={`${answered} of ${total} checked`}
        className="h-1.5 bg-surface-sunken"
      >
        <div className="h-full bg-ink transition-[width] duration-300 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <div className="mx-auto flex max-w-2xl flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:py-3">
        <p className="flex min-w-0 items-baseline gap-2 leading-tight sm:mr-auto sm:flex-col sm:gap-0">
          <span className="shrink-0 text-3xl leading-none font-extrabold whitespace-nowrap">
            {answered}
            <span className="text-lg font-bold"> / {total}</span>
          </span>
          <span aria-live="polite" className="truncate text-sm text-ink-muted">
            {status}
          </span>
        </p>
        <div className="flex items-center gap-2 *:last:flex-1 sm:shrink-0 sm:*:last:flex-none">{children}</div>
      </div>
    </div>
  );
}
