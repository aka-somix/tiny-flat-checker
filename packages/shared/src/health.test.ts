import { describe, expect, it } from "vitest";
import { HealthResponseSchema } from "./health.js";

describe("HealthResponseSchema", () => {
  it("accepts an ok status", () => {
    expect(HealthResponseSchema.parse({ status: "ok" })).toEqual({ status: "ok" });
  });

  it("rejects any other status", () => {
    expect(HealthResponseSchema.safeParse({ status: "down" }).success).toBe(false);
  });
});
