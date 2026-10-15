import { render } from "@testing-library/react";
import { ArrowRight } from "lucide-react";
import { Pictogram } from "./Pictogram.js";

describe("Pictogram", () => {
  it("is hidden from assistive tech", () => {
    const { container } = render(<Pictogram icon={ArrowRight} />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
