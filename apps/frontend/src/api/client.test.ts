import { api } from "./client.js";

vi.mock("./supabase.js", () => ({ getAccessToken: vi.fn(async () => "jwt-123") }));

function lastRequest(spy: ReturnType<typeof vi.spyOn>) {
  const [url, init] = spy.mock.calls.at(-1) as [string, RequestInit];
  return { url, headers: init.headers as Record<string, string>, init };
}

describe("api client", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns the parsed body", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ status: "ok" }));
    await expect(api.getHealth()).resolves.toEqual({ status: "ok" });
  });

  it("throws the server error message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ error: "boom" }, { status: 500 }));
    await expect(api.getHealth()).rejects.toThrow("boom");
  });

  it("sends the API key on public calls", async () => {
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ version: 1, fields: [] }));
    await api.getChecklist("current");
    const { url, headers } = lastRequest(spy);
    expect(url).toMatch(/\/public\/checklists\/current$/);
    expect(headers).toHaveProperty("x-api-key");
    expect(headers).not.toHaveProperty("Authorization");
  });

  it("sends the bearer token on private calls", async () => {
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 204 }));
    await api.deleteFlatCheck("abc");
    const { url, headers, init } = lastRequest(spy);
    expect(url).toMatch(/\/private\/flatchecks\/abc$/);
    expect(init.method).toBe("DELETE");
    expect(headers.Authorization).toBe("Bearer jwt-123");
  });
});
