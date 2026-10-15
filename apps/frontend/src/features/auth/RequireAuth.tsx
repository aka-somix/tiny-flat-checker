import type { ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";
import { PageLoader } from "../../ui/index.js";
import { useAuth } from "./AuthProvider.js";

/** Renders children for signed-in users; sends everyone else to the checklist. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader label="Checking your session" linkAs={Link} />;
  if (!user) return <Navigate to="/" replace />;
  return children;
}
