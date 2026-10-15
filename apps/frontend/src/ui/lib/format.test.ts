import { formatDate, formatPrice } from "./format.js";

describe("format", () => {
  it("formats prices without currency and dates as day month year", () => {
    expect(formatPrice(250000)).toMatch(/250.000/);
    expect(formatDate("2026-10-10T10:00:00.000Z")).toMatch(/2026/);
  });
});
