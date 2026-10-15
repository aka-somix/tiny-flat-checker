import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn.js";
import { Spinner } from "./Spinner.js";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-surface hover:bg-panel",
  secondary: "bg-surface text-ink border-2 border-ink hover:bg-surface-sunken",
  ghost: "bg-transparent text-ink underline decoration-2 underline-offset-4 hover:bg-surface-sunken",
  /** Outline button for black panels. */
  inverse: "bg-ink text-surface border-2 border-surface hover:bg-panel",
};

const insets: Record<ButtonVariant, string> = {
  primary: "border-2 border-surface text-surface",
  secondary: "bg-ink text-on-panel",
  ghost: "",
  inverse: "bg-surface text-ink",
};

/** Classes for anything that should look like a button (e.g. a router link). */
export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cn(
    "inline-flex min-h-13 items-center justify-center gap-3 rounded-[4px] px-4 text-lg font-semibold",
    "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Shown in a sign-style inset square before the label. */
  icon?: LucideIcon;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  icon: Icon,
  loading = false,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, cn(Icon && variant !== "ghost" && "pl-2", className))}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Spinner label="Working" />
      ) : (
        Icon &&
        (variant === "ghost" ? (
          <Icon aria-hidden="true" className="size-5" strokeWidth={2.5} />
        ) : (
          <span aria-hidden="true" className={cn("grid size-9 place-items-center rounded-[3px]", insets[variant])}>
            <Icon className="size-5" strokeWidth={2.75} />
          </span>
        ))
      )}
      <span>{children}</span>
    </button>
  );
}
