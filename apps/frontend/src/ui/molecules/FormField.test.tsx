import { render, screen } from "@testing-library/react";
import { Input } from "../atoms/Input.js";
import { FormField } from "./FormField.js";

describe("FormField", () => {
  it("labels the control and describes it with hint and error", () => {
    render(
      <FormField id="price" label="Asking price" hint="Numbers only" error="Enter a price">
        {(p) => <Input {...p} />}
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Asking price" });
    expect(input).toHaveAccessibleDescription("Numbers only Enter a price");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
