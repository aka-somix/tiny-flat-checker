import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface AppShellProps {
  topBar: ReactNode;
  children: ReactNode;
  /** Reserve room for a fixed ActionBar rendered inside the content. */
  hasActionBar?: boolean;
}

export function AppShell({ topBar, children, hasActionBar }: AppShellProps) {
  return (
    <div className="min-h-dvh overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-30 focus:bg-ink focus:p-3 focus:text-surface">
        Skip to content
      </a>
      {topBar}
      <main id="main" className={cn("mx-auto flex max-w-2xl flex-col gap-6 px-4 pt-6", hasActionBar ? "pb-44 sm:pb-32" : "pb-12")}>
        {children}
      </main>
    </div>
  );
}
