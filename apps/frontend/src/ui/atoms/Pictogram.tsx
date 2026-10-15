import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn.js";

const sizes = {
  sm: "size-9 [&>svg]:size-5",
  md: "size-12 [&>svg]:size-7",
  lg: "size-16 [&>svg]:size-10",
} as const;

export interface PictogramProps {
  icon: LucideIcon;
  size?: keyof typeof sizes;
  className?: string;
}

/** A white pictogram on a black inset square, as on a sign panel. Decorative: pair it with text. */
export function Pictogram({ icon: Icon, size = "md", className }: PictogramProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-grid shrink-0 place-items-center rounded-[3px] bg-ink text-on-panel", sizes[size], className)}
    >
      <Icon strokeWidth={2.5} />
    </span>
  );
}
