import { cn } from "../lib/cn.js";

export interface SpinnerProps {
  /** Announced to screen readers. */
  label?: string;
  className?: string;
}

export function Spinner({ label = "Loading", className }: SpinnerProps) {
  return (
    <span role="status" className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className="size-5 animate-spin rounded-full border-[3px] border-current border-r-transparent"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
