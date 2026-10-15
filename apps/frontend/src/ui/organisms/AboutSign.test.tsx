import { render, screen } from "@testing-library/react";
import { AboutSign } from "./AboutSign.js";

describe("AboutSign", () => {
  it("explains the Tiny apps and links to the portfolio and the source", () => {
    render(<AboutSign portfolioUrl="https://salvatorecirone.dev" repoUrl="https://github.com/aka-somix/tiny-flat-checker" />);
    expect(screen.getByRole("heading", { level: 1, name: "Tiny apps, on purpose." })).toBeInTheDocument();
    expect(screen.getByText(/proofs of concept/i)).toBeInTheDocument();
    expect(screen.getByText(/goes to sleep/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get to know me/i })).toHaveAttribute("href", "https://salvatorecirone.dev");
    expect(screen.getByRole("link", { name: /view on github/i })).toHaveAttribute("href", "https://github.com/aka-somix/tiny-flat-checker");
  });
});
