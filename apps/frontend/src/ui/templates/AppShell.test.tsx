import { render, screen } from "@testing-library/react";
import { AppShell } from "./AppShell.js";

describe("AppShell", () => {
  it("renders slots and a skip link", () => {
    render(
      <AppShell topBar={<header>Top</header>} hasActionBar>
        <p>Body</p>
        <div>Bar</div>
      </AppShell>,
    );
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    expect(screen.getByRole("main")).toHaveTextContent("Body");
    expect(screen.getByText("Bar")).toBeInTheDocument();
  });
});
