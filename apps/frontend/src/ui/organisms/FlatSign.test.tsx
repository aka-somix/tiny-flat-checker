import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlatSign } from "./FlatSign.js";

const value = { title: "", link: "", price: "" };

describe("FlatSign", () => {
  it("reports edits as patches and shows errors", async () => {
    const onChange = vi.fn();
    render(<FlatSign value={value} errors={{ title: "Give the flat a name." }} onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox", { name: "Asking price" }), "9");
    expect(onChange).toHaveBeenCalledWith({ price: "9" });
    expect(screen.getByRole("textbox", { name: "Name it" })).toHaveAccessibleDescription(/Give the flat a name/);
  });

  it("renders as a sign when read-only", () => {
    render(<FlatSign readOnly value={{ title: "Elm Street", link: "https://x.test", price: "250000" }} />);
    expect(screen.getByRole("heading", { name: "Elm Street" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open listing/i })).toHaveAttribute("href", "https://x.test");
  });
});
