import { render, screen } from "@testing-library/react";
import { TINYVERSE_URL, TinyverseLink } from "./TinyverseLink.js";

describe("TinyverseLink", () => {
  it("links back to the Tinyverse on the portfolio", () => {
    render(<TinyverseLink />);
    expect(screen.getByRole("link", { name: "Tinyverse" })).toHaveAttribute("href", TINYVERSE_URL);
    expect(TINYVERSE_URL).toBe("https://salvatorecirone.dev/#tinyverse");
  });

  it("accepts another destination", () => {
    render(<TinyverseLink href="https://example.com/#tinyverse" />);
    expect(screen.getByRole("link", { name: "Tinyverse" })).toHaveAttribute("href", "https://example.com/#tinyverse");
  });
});
