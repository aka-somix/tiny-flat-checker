import type { ReactNode } from "react";
import { ClipboardCheck } from "lucide-react";
import { Pictogram } from "../atoms/Pictogram.js";
import { TinyverseLink } from "../atoms/TinyverseLink.js";
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
        <div className="flex items-center gap-1 sm:gap-3">
          <nav aria-label="Tiny apps" className="flex items-center">
            <Link
              to="/about"
              className="hidden min-h-11 items-center rounded-[4px] px-2 text-xs font-bold tracking-[0.12em] uppercase no-underline hover:underline sm:inline-flex"
            >
              About
            </Link>
            <TinyverseLink />
          </nav>
          <nav aria-label="Account" className="flex items-center gap-1">
            {children}
          </nav>
        </div>
      </div>
    </header>
  );
}
