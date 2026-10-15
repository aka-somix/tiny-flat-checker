import { render, screen } from "@testing-library/react";
import { TINYVERSE_URL } from "../atoms/TinyverseLink.js";
import { TopBar } from "./TopBar.js";

describe("TopBar", () => {
  it("links home and renders account controls", () => {
    render(
      <TopBar>
        <button>Sign in</button>
      </TopBar>,
    );
    expect(screen.getByRole("link", { name: "Tiny Flat Checker" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("navigation", { name: "Account" })).toContainElement(screen.getByRole("button", { name: "Sign in" }));
  });

  it("links to the about page and back to the Tinyverse", () => {
    render(<TopBar />);
    const nav = screen.getByRole("navigation", { name: "Tiny apps" });
    expect(nav).toContainElement(screen.getByRole("link", { name: "About" }));
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(nav).toContainElement(screen.getByRole("link", { name: "Tinyverse" }));
    expect(screen.getByRole("link", { name: "Tinyverse" })).toHaveAttribute("href", TINYVERSE_URL);
  });
});
