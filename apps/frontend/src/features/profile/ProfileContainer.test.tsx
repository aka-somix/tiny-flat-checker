import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../test/utils.js";
import { ProfileContainer } from "./ProfileContainer.js";

vi.mock("../auth/AuthProvider.js", () => ({
  useAuth: () => ({ user: { id: "u1", name: "Ada Lovelace", email: "ada@example.com", avatarUrl: null }, signOut: vi.fn() }),
}));
vi.mock("../../api/supabase.js", () => ({ getAccessToken: async () => "jwt" }));


describe("ProfileContainer", () => {
  afterEach(() => vi.restoreAllMocks());

  it("lists saved checks and deletes one after confirming", async () => {
    const item = { id: "f1", title: "Elm Street", price: 250000, templateVersion: 1, createdAt: "2026-10-10T10:00:00.000Z" };
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(Response.json([item]))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValue(Response.json([]));
    renderWithProviders(
      <MemoryRouter>
        <ProfileContainer />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: /Elm Street/ })).toHaveAttribute("href", "/flatchecks/f1");

    await userEvent.click(screen.getByRole("button", { name: "Delete Elm Street" }));
    await userEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Delete" }));
    expect(await screen.findByText("No saved checks yet")).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toMatch(/\/private\/flatchecks\/f1$/);
    expect(init.method).toBe("DELETE");
  });
});
