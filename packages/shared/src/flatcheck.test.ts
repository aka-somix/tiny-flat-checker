import { describe, expect, it } from "vitest";
import { CreateFlatCheckSchema, FlatCheckSchema } from "./flatcheck.js";

const create = {
  templateVersion: 1,
  meta: { title: "Via Roma 1", link: "https://example.com/flat", price: 250000 },
  values: { cracks: true, light: 4 },
};

describe("CreateFlatCheckSchema", () => {
  it("accepts a valid payload, link optional", () => {
    expect(CreateFlatCheckSchema.parse(create)).toEqual(create);
    const { link: _link, ...meta } = create.meta;
    expect(CreateFlatCheckSchema.safeParse({ ...create, meta }).success).toBe(true);
  });

  it("rejects an empty title, a bad link and a non-positive price", () => {
    for (const meta of [
      { ...create.meta, title: "  " },
      { ...create.meta, link: "not a url" },
      { ...create.meta, price: 0 },
    ]) {
      expect(CreateFlatCheckSchema.safeParse({ ...create, meta }).success).toBe(false);
    }
  });
});

describe("FlatCheckSchema", () => {
  it("requires id and createdAt", () => {
    expect(FlatCheckSchema.safeParse(create).success).toBe(false);
    const full = { ...create, id: "6f1c8a3e-1d2b-4c5d-8e9f-0a1b2c3d4e5f", createdAt: "2026-10-10T10:00:00.000Z" };
    expect(FlatCheckSchema.parse(full)).toEqual(full);
  });
});
