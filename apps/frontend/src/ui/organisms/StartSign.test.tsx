import { render, screen } from "@testing-library/react";
import { StartSign } from "./StartSign.js";

describe("StartSign", () => {
  it("points to the first section with the total count", () => {
    render(<StartSign href="#section-1" firstSection="Structure" checks={46} />);
    const link = screen.getByRole("link", { name: "Start here: Structure, 46 checks" });
    expect(link).toHaveAttribute("href", "#section-1");
  });
});
