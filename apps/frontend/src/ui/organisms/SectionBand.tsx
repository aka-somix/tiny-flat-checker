import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "../lib/cn.js";

export interface SectionBandProps {
  id: string;
  index: number;
  total: number;
  title: string;
  icon: LucideIcon;
  answered: number;
  count: number;
  next?: string;
}

/** The junction sign: where you are, how much is left here, and what comes next. Sticks while you scroll the section. */
export function SectionBand({ id, index, total, title, icon: Icon, answered, count, next }: SectionBandProps) {
  const done = answered === count;
  return (
    <div className="sticky top-0 z-10 -mx-4 bg-surface px-4 pt-2 pb-1">
      <div className="flex items-stretch gap-3 rounded-[6px] bg-ink p-2 pr-4 text-surface shadow-[0_6px_14px_-8px_rgb(0_0_0/0.55)]">
        <span aria-hidden="true" className="grid w-14 shrink-0 place-items-center rounded-[3px] bg-surface text-ink">
          <Icon className="size-8" strokeWidth={2.5} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
          <h2 id={id} className="truncate text-2xl font-extrabold leading-tight">
            <span className="sr-only">{`Section ${index} of ${total}:`}</span> {title}
          </h2>
          <p className="flex min-w-0 items-center gap-x-2 text-base font-semibold whitespace-nowrap text-surface/85">
            <span aria-hidden="true" className="shrink-0">
              {index} of {total}
            </span>
            {next && (
              <span className="inline-flex min-w-0 items-center gap-1">
                <ArrowRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={3} />
                <span className="truncate">
                  <span className="sr-only">Next: </span>
                  {next}
                </span>
              </span>
            )}
          </p>
        </div>
        <span className={cn("flex shrink-0 items-center gap-1 self-center leading-none font-extrabold", done && "text-surface")}>
          {done && <Check aria-hidden="true" className="size-6" strokeWidth={3.5} />}
          <span className="text-4xl tracking-tight">{answered}</span>
          <span className="text-xl">/{count}</span>
          <span className="sr-only"> checked</span>
        </span>
      </div>
    </div>
  );
}
