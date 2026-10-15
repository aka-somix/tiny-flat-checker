import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextArea } from "./TextArea.js";

describe("TextArea", () => {
  it("accepts text", async () => {
    render(<TextArea aria-label="Notes" />);
    await userEvent.type(screen.getByRole("textbox", { name: "Notes" }), "Damp in hall");
    expect(screen.getByRole("textbox")).toHaveValue("Damp in hall");
  });
});
