import type { ComponentType, ReactNode } from "react";

/** Any link component taking `to` (react-router's Link fits). Keeps ui/ router-free. */
export type LinkComponent = ComponentType<{ to: string; className?: string; children: ReactNode; "aria-label"?: string }>;

export const PlainLink: LinkComponent = ({ to, ...rest }) => <a href={to} {...rest} />;
