import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../api/supabase.js";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  /** Sign-in failure reported by the OAuth redirect, e.g. not invited. */
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  dismissError: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

function toAuthUser(user: User): AuthUser {
  const meta = user.user_metadata as { full_name?: string; name?: string; avatar_url?: string; picture?: string };
  const email = user.email ?? "";
  return {
    id: user.id,
    email,
    name: meta.full_name ?? meta.name ?? email,
    avatarUrl: meta.avatar_url ?? meta.picture ?? null,
  };
}

/** Reads `error_description` left by a failed OAuth redirect and removes it from the URL. */
function takeRedirectError(): string | null {
  const params = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const raw = params.get("error_description") ?? hash.get("error_description");
  if (!raw) return null;
  window.history.replaceState(null, "", window.location.pathname);
  return /invite/i.test(raw) ? "This app is invite-only, and that Google account isn't on the list." : raw;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(takeRedirectError);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? toAuthUser(session.user) : null);
      setLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      error,
      signIn: async () => {
        const { error: e } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: window.location.href.split(/[?#]/)[0] },
        });
        if (e) setError(e.message);
      },
      signOut: async () => {
        await supabase.auth.signOut();
      },
      dismissError: () => setError(null),
    }),
    [user, loading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
