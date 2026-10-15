import { render, screen } from "@testing-library/react";
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
});
