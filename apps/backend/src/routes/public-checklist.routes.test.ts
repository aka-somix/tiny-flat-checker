import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildApp } from "../app.js";
import { API_KEY, TEMPLATES, testContainer } from "../test/fixtures.js";

describe("public checklist routes", () => {
  let app: FastifyInstance;
  const headers = { "x-api-key": API_KEY };

  beforeEach(async () => {
    app = await buildApp(testContainer());
  });

  afterEach(async () => {
    await app.close();
  });

  it("GET /public/checklists/current returns the latest version", async () => {
    const res = await app.inject({ method: "GET", url: "/public/checklists/current", headers });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual(TEMPLATES[1]);
  });

  it("GET /public/checklists/:version returns that version", async () => {
    const res = await app.inject({ method: "GET", url: "/public/checklists/1", headers });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual(TEMPLATES[0]);
  });

  it("returns 404 for an unknown version", async () => {
    const res = await app.inject({ method: "GET", url: "/public/checklists/9", headers });
    expect(res.statusCode).toBe(404);
  });

  it("returns 400 for a non-numeric version", async () => {
    const res = await app.inject({ method: "GET", url: "/public/checklists/abc", headers });
    expect(res.statusCode).toBe(400);
  });

  it("returns 401 without or with a wrong API key", async () => {
    for (const h of [{}, { "x-api-key": "wrong" }]) {
      const res = await app.inject({ method: "GET", url: "/public/checklists/current", headers: h });
      expect(res.statusCode).toBe(401);
      expect(res.json()).toEqual({ error: "Invalid API key" });
    }
  });
});
