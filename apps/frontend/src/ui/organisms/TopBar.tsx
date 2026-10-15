import type { ReactNode } from "react";
import { ClipboardCheck } from "lucide-react";
import { Pictogram } from "../atoms/Pictogram.js";
import { PlainLink, type LinkComponent } from "../lib/link.js";

export interface TopBarProps {
  linkAs?: LinkComponent;
  /** Right-hand controls: sign in, profile. */
  children?: ReactNode;
}

export function TopBar({ linkAs: Link = PlainLink, children }: TopBarProps) {
  return (
    <header className="border-b-4 border-ink">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 rounded-[4px] font-bold no-underline">
          <Pictogram icon={ClipboardCheck} size="sm" />
          <span className="text-lg leading-none">Tiny Flat Checker</span>
        </Link>
        <nav aria-label="Account" className="flex items-center gap-1">
          {children}
        </nav>
      </div>
    </header>
  );
}
