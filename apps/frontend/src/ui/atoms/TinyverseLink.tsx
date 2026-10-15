import { cn } from "../lib/cn.js";

/** The Tinyverse section of the portfolio this app belongs to. */
export const TINYVERSE_URL = "https://salvatorecirone.dev/#tinyverse";

export interface TinyverseLinkProps {
  href?: string;
  className?: string;
}

/**
 * Link back to the Tinyverse, carrying the same orbit mark as the portfolio nav:
 * a ring seen at an angle with a planet that runs only while the link is hovered
 * or focused, and holds its place when left.
 */
export function TinyverseLink({ href = TINYVERSE_URL, className }: TinyverseLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 rounded-[4px] px-2 text-xs font-bold tracking-[0.12em] uppercase no-underline",
        className,
      )}
    >
      {/* Mark only on narrow bars; the word stays as the accessible name. */}
      <span className="sr-only sm:not-sr-only">Tinyverse</span>
      <span aria-hidden="true" className="relative block h-3.5 w-[22px] -rotate-[14deg]">
        <svg viewBox="0 0 22 14" fill="none" focusable="false" className="block size-full overflow-visible">
          <ellipse
            cx="11"
            cy="7"
            rx="9.5"
            ry="4.6"
            stroke="currentColor"
            strokeWidth="1"
            className="[stroke-opacity:0.42] transition-[stroke-opacity] duration-300 group-hover:[stroke-opacity:1] group-focus-visible:[stroke-opacity:1]"
          />
        </svg>
        <span className="absolute top-0 left-0 size-1 rounded-full bg-current [offset-path:path('M_20.5_7_A_9.5_4.6_0_1_1_1.5_7_A_9.5_4.6_0_1_1_20.5_7')] [offset-rotate:0deg] motion-safe:animate-orbit motion-safe:[animation-play-state:paused] motion-safe:group-hover:[animation-play-state:running] motion-safe:group-focus-visible:[animation-play-state:running]" />
      </span>
    </a>
  );
}
