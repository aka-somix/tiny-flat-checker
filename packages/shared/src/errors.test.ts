import { describe, expect, it } from "vitest";
import { ErrorResponseSchema } from "./errors.js";

describe("ErrorResponseSchema", () => {
  it("accepts an error with optional details", () => {
    expect(ErrorResponseSchema.parse({ error: "Nope" })).toEqual({ error: "Nope" });
    expect(ErrorResponseSchema.safeParse({ error: "Bad", details: { a: 1 } }).success).toBe(true);
  });

  it("rejects a body without error", () => {
    expect(ErrorResponseSchema.safeParse({ details: 1 }).success).toBe(false);
  });
});
