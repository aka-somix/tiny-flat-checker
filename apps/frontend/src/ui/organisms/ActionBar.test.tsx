import { render, screen } from "@testing-library/react";
import { ActionBar } from "./ActionBar.js";

describe("ActionBar", () => {
  it("exposes progress and actions", () => {
    render(
      <ActionBar answered={12} total={46} status="Draft kept on this device">
        <button>PDF</button>
      </ActionBar>,
    );
    expect(screen.getByRole("progressbar", { name: "Checks answered" })).toHaveAttribute("aria-valuetext", "12 of 46 checked");
    expect(screen.getByText("Draft kept on this device")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PDF" })).toBeInTheDocument();
  });
});
