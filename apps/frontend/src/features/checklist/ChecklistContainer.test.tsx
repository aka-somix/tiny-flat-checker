import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type { ChecklistTemplate } from "@flat-checker/shared";
import { renderWithProviders } from "../../test/utils.js";
import { ChecklistContainer } from "./ChecklistContainer.js";

const auth = { user: null as null | { id: string; name: string }, signIn: vi.fn(), error: null, dismissError: vi.fn() };
vi.mock("../auth/AuthProvider.js", () => ({ useAuth: () => auth }));
vi.mock("../../api/supabase.js", () => ({ getAccessToken: async () => "jwt" }));

const template: ChecklistTemplate = {
  version: 1,
  fields: [
    { id: "cracks", label: "No cracks in walls or ceilings", section: "Structure", type: "boolean" },
    { id: "light", label: "Natural light", section: "Light & noise", type: "rating" },
  ],
};

function renderPage() {
  return renderWithProviders(
    <MemoryRouter>
      <ChecklistContainer />
    </MemoryRouter>,
  );
}

describe("ChecklistContainer", () => {
  beforeEach(() => {
    localStorage.clear();
    auth.user = null;
  });
  afterEach(() => vi.restoreAllMocks());

  it("lets anyone fill in the checklist and asks to sign in to save", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json(template));
    renderPage();
    expect(await screen.findByRole("heading", { name: "Section 1 of 2: Structure" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: "Yes" }));
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuetext", "1 of 2 checked");
    await userEvent.click(screen.getByRole("button", { name: "Sign in to save" }));
    expect(auth.signIn).toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem("tfc.draft.v1")!).values).toEqual({ cracks: true });
  });

  it("blocks saving until the flat has a name and price, then posts the answers", async () => {
    auth.user = { id: "u1", name: "Ada" };
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(Response.json(template))
      .mockResolvedValueOnce(Response.json({ id: "f1" }, { status: 201 }));
    renderPage();
    await userEvent.click(await screen.findByRole("radio", { name: "4" }));
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByText("Give the flat a name.")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await userEvent.type(screen.getByRole("textbox", { name: "Name it" }), "Elm Street");
    await userEvent.type(screen.getByRole("textbox", { name: "Asking price" }), "250.000");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    const [, init] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toEqual({
      templateVersion: 1,
      meta: { title: "Elm Street", price: 250000 },
      values: { light: 4 },
    });
  });

  it("offers a retry when the checklist fails to load", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ error: "down" }, { status: 500 }));
    renderPage();
    expect(await screen.findByRole("alert")).toHaveTextContent("The checklist didn't load.");
  });
});
