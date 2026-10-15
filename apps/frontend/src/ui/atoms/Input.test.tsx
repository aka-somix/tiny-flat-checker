import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input.js";

describe("Input", () => {
  it("forwards typing and marks invalid", async () => {
    const onChange = vi.fn();
    render(<Input aria-label="Title" invalid onChange={onChange} />);
    const input = screen.getByRole("textbox", { name: "Title" });
    await userEvent.type(input, "ab");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
