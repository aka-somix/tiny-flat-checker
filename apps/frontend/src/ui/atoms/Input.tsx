import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const fieldClasses = (invalid?: boolean) =>
  cn(
    "w-full rounded-[4px] border-2 bg-surface-raised px-3 text-lg text-ink placeholder:text-ink-muted",
    "focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink",
    "disabled:opacity-60",
    invalid ? "border-danger" : "border-ink",
  );

export function Input({ invalid, className, ...rest }: InputProps) {
  return <input aria-invalid={invalid || undefined} className={cn(fieldClasses(invalid), "min-h-13", className)} {...rest} />;
}
