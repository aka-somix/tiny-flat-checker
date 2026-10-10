import { api } from "./client.js";

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
});
