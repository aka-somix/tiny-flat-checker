import { render, screen } from "@testing-library/react";
import { Droplets } from "lucide-react";
import { SectionBand } from "./SectionBand.js";

describe("SectionBand", () => {
  it("names the section with its position, progress and next stop", () => {
    const { container } = render(<SectionBand id="s3" index={3} total={11} title="Plumbing" icon={Droplets} answered={2} count={5} next="Electrical" />);
    expect(screen.getByRole("heading", { name: "Section 3 of 11: Plumbing" })).toBeInTheDocument();
    expect(container).toHaveTextContent("2/5 checked");
    expect(screen.getByText("Electrical")).toBeInTheDocument();
  });
});
