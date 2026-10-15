import { createClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client, used for Google sign-in and session refresh only.
 * Data goes through the backend; tables are closed to the browser by RLS.
 */
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "http://localhost:54321",
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "missing-publishable-key",
);

export async function getAccessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}
