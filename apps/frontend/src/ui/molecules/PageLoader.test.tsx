import { act, render, screen } from "@testing-library/react";
import { PageLoader } from "./PageLoader.js";

describe("PageLoader", () => {
  afterEach(() => vi.useRealTimers());

  it("shows the spinner, then a link to the about page once loading drags on", () => {
    vi.useFakeTimers();
    render(<PageLoader label="Loading the checklist" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading the checklist");
    expect(screen.queryByRole("link", { name: /taking so long/i })).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(3000));

    expect(screen.getByRole("link", { name: "Why is this taking so long?" })).toHaveAttribute("href", "/about");
  });
});
