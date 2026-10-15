import { act, render, screen } from "@testing-library/react";
import type { Session } from "@supabase/supabase-js";
import { AuthProvider, useAuth } from "./AuthProvider.js";

let emit: (event: string, session: Session | null) => void = () => {};
vi.mock("../../api/supabase.js", () => ({
  supabase: {
    auth: {
      onAuthStateChange: (cb: typeof emit) => {
        emit = cb;
        return { data: { subscription: { unsubscribe: vi.fn() } } };
      },
      signInWithOAuth: vi.fn(async () => ({ error: null })),
      signOut: vi.fn(),
    },
  },
}));

function Probe() {
  const { user, loading, error } = useAuth();
  return <p>{loading ? "loading" : (user?.name ?? error ?? "anonymous")}</p>;
}

describe("AuthProvider", () => {
  it("tracks the Supabase session", () => {
    render(<AuthProvider><Probe /></AuthProvider>);
    expect(screen.getByText("loading")).toBeInTheDocument();
    act(() =>
      emit("SIGNED_IN", {
        user: { id: "u1", email: "ada@example.com", user_metadata: { full_name: "Ada Lovelace" } },
      } as unknown as Session),
    );
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    act(() => emit("SIGNED_OUT", null));
    expect(screen.getByText("anonymous")).toBeInTheDocument();
  });

  it("turns the invite-only redirect error into a friendly message and cleans the URL", () => {
    window.history.replaceState(null, "", "/?error=access_denied&error_description=This+app+is+invite-only.");
    render(<AuthProvider><Probe /></AuthProvider>);
    act(() => emit("INITIAL_SESSION", null));
    expect(screen.getByText(/isn't on the list/)).toBeInTheDocument();
    expect(window.location.search).toBe("");
  });
});
