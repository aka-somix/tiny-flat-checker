import { useEffect, useState } from "react";
import { CircleHelp } from "lucide-react";
import { Spinner } from "../atoms/Spinner.js";
import { cn } from "../lib/cn.js";
import { PlainLink, type LinkComponent } from "../lib/link.js";

/** After this long a sleeping back-end is the likely cause, so the loader offers the explanation. */
export const SLOW_LOAD_MS = 3000;

export interface PageLoaderProps {
  /** Announced to screen readers and shown next to the spinner. */
  label: string;
  linkAs?: LinkComponent;
  aboutHref?: string;
  className?: string;
}

/** Page-level loading state that points to the about page once the wait gets long. */
export function PageLoader({ label, linkAs: Link = PlainLink, aboutHref = "/about", className }: PageLoaderProps) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setSlow(true), SLOW_LOAD_MS);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      <span className="inline-flex items-center gap-3 text-lg font-semibold">
        <Spinner label={label} />
        <span aria-hidden="true">{label}</span>
      </span>
      {slow && (
        <Link to={aboutHref} className="inline-flex min-h-11 items-center gap-2 rounded-[4px] text-base font-semibold underline">
          <CircleHelp aria-hidden="true" className="size-5" strokeWidth={2.5} />
          Why is this taking so long?
        </Link>
      )}
    </div>
  );
}
