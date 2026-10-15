import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import type { CreateFlatCheck } from "@flat-checker/shared";
import { buildApp } from "../app.js";
import { ALICE, BOB, bearer, testContainer } from "../test/fixtures.js";

const input: CreateFlatCheck = {
  templateVersion: 2,
  meta: { title: "Via Roma 1", link: "https://example.com/flat", price: 250000 },
  values: { cracks: true, light: 4, heating: "gas" },
};

describe("private flatcheck routes", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await buildApp(testContainer());
  });

  afterEach(async () => {
    await app.close();
  });

  const create = (body: unknown = input) =>
    app.inject({ method: "POST", url: "/private/flatchecks", headers: bearer(ALICE), payload: body as object });

  it("creates, lists, gets and deletes a flat check", async () => {
    const created = await create();
    expect(created.statusCode).toBe(201);
    const flat = created.json();
    expect(flat).toEqual({ ...input, id: expect.any(String), createdAt: "2026-10-10T10:00:00.000Z" });

    const list = await app.inject({ method: "GET", url: "/private/flatchecks", headers: bearer(ALICE) });
    expect(list.statusCode).toBe(200);
    expect(list.json()).toEqual([
      { id: flat.id, templateVersion: 2, title: "Via Roma 1", price: 250000, createdAt: flat.createdAt },
    ]);

    const got = await app.inject({ method: "GET", url: `/private/flatchecks/${flat.id}`, headers: bearer(ALICE) });
    expect(got.statusCode).toBe(200);
    expect(got.json()).toEqual(flat);

    const del = await app.inject({ method: "DELETE", url: `/private/flatchecks/${flat.id}`, headers: bearer(ALICE) });
    expect(del.statusCode).toBe(204);

    const gone = await app.inject({ method: "GET", url: `/private/flatchecks/${flat.id}`, headers: bearer(ALICE) });
    expect(gone.statusCode).toBe(404);
  });

  it("hides other users' flat checks", async () => {
    const flat = (await create()).json();
    const list = await app.inject({ method: "GET", url: "/private/flatchecks", headers: bearer(BOB) });
    expect(list.json()).toEqual([]);
    for (const method of ["GET", "DELETE"] as const) {
      const res = await app.inject({ method, url: `/private/flatchecks/${flat.id}`, headers: bearer(BOB) });
      expect(res.statusCode).toBe(404);
    }
  });

  it("returns 400 for values outside the template domain", async () => {
    const res = await create({ ...input, values: { light: 6, heating: "coal", nope: true } });
    expect(res.statusCode).toBe(400);
    expect(res.json()).toEqual({
      error: "Invalid values",
      details: { light: "Expected an integer from 1 to 5", heating: "Expected one of: gas, heat_pump", nope: "Unknown field" },
    });
  });

  it("returns 400 for an unknown template version or bad meta", async () => {
    expect((await create({ ...input, templateVersion: 9 })).statusCode).toBe(400);
    expect((await create({ ...input, meta: { title: "", price: -1 } })).statusCode).toBe(400);
  });

  it("returns 404 for an unknown id", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/private/flatchecks/99999999-9999-4999-8999-999999999999",
      headers: bearer(ALICE),
    });
    expect(res.statusCode).toBe(404);
  });

  it("returns 401 without or with a bad bearer token", async () => {
    for (const headers of [{}, { authorization: "Bearer nope" }, { authorization: "Basic abc" }]) {
      const res = await app.inject({ method: "GET", url: "/private/flatchecks", headers });
      expect(res.statusCode).toBe(401);
    }
  });
});
