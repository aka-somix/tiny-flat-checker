import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "../../ui/index.js";
import { useAuth } from "./AuthProvider.js";

/** Renders children for signed-in users; sends everyone else to the checklist. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner label="Checking your session" className="text-lg" />;
  if (!user) return <Navigate to="/" replace />;
  return children;
}
