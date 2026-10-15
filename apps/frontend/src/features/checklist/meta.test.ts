import { parseMeta, parsePrice } from "./meta.js";

describe("parsePrice", () => {
  it.each([
    ["250000", 250000],
    ["250.000", 250000],
    ["250,000", 250000],
    ["1 250 000", 1250000],
    ["1234,5", 1234.5],
    ["99.99", 99.99],
  ])("%s → %d", (text, n) => expect(parsePrice(text)).toBe(n));

  it("is NaN for nothing", () => expect(parsePrice("abc")).toBeNaN());
});

describe("parseMeta", () => {
  it("returns meta, dropping an empty link", () => {
    expect(parseMeta({ title: "Elm", link: " ", price: "250.000" })).toEqual({ meta: { title: "Elm", price: 250000 } });
  });

  it("returns friendly errors", () => {
    expect(parseMeta({ title: "", link: "nope", price: "" })).toEqual({
      errors: {
        title: "Give the flat a name.",
        price: "Enter the asking price as a number.",
        link: "Paste the full link, starting with https://",
      },
    });
  });
});
