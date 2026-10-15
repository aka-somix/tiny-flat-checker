import { ArrowDown } from "lucide-react";

export interface StartSignProps {
  /** In-page anchor of the first section, e.g. "#section-1". */
  href: string;
  firstSection: string;
  checks: number;
}

/** The directional sign at the start of the route: where to begin and how far it goes. */
export function StartSign({ href, firstSection, checks }: StartSignProps) {
  return (
    <a
      href={href}
      aria-label={`Start here: ${firstSection}, ${checks} checks`}
      className="flex items-stretch gap-3 rounded-[6px] border-4 border-ink bg-surface p-2 pr-4 no-underline hover:bg-surface-sunken"
    >
      <span aria-hidden="true" className="grid w-16 shrink-0 place-items-center rounded-[3px] bg-ink text-on-panel">
        <ArrowDown className="size-10" strokeWidth={3} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="text-base font-semibold">Start here</span>
        <span className="truncate text-3xl leading-tight font-extrabold">{firstSection}</span>
      </span>
      <span className="flex flex-col items-end justify-center leading-none">
        <span className="text-5xl font-extrabold tracking-tight">{checks}</span>
        <span className="text-base font-semibold">checks</span>
      </span>
    </a>
  );
}
