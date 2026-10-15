import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner.js";

describe("Spinner", () => {
  it("announces its label", () => {
    render(<Spinner label="Loading checklist" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading checklist");
  });
});
