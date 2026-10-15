import { useState } from "react";
import { cn } from "../lib/cn.js";

export interface AvatarProps {
  name: string;
  src?: string | null;
  size?: "sm" | "lg";
  /** "sign" inverts the frame for use on black panels. */
  tone?: "ink" | "sign";
  className?: string;
}

const initials = (name: string) =>
  name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

/** User picture in a black square frame; falls back to initials. */
export function Avatar({ name, src, size = "sm", tone = "ink", className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const box = size === "lg" ? "size-20 text-2xl" : "size-10 text-base";
  return (
    <span className={cn("inline-grid shrink-0 place-items-center overflow-hidden rounded-[4px] font-bold", tone === "sign" ? "bg-surface text-ink" : "bg-ink text-surface", box, className)}>
      {src && !failed ? (
        <img src={src} alt={name} referrerPolicy="no-referrer" className="size-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <span role="img" aria-label={name}>
          {initials(name)}
        </span>
      )}
    </span>
  );
}
