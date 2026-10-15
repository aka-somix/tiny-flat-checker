import type { TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn.js";
import { fieldClasses } from "./Input.js";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function TextArea({ invalid, className, rows = 3, ...rest }: TextAreaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(fieldClasses(invalid), "py-3 leading-snug", className)}
      {...rest}
    />
  );
}
