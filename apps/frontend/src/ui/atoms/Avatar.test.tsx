import { fireEvent, render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar.js";

describe("Avatar", () => {
  it("shows initials without a picture", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent("AL");
  });

  it("falls back to initials when the picture fails", () => {
    render(<Avatar name="Ada Lovelace" src="https://example.com/a.png" />);
    fireEvent.error(screen.getByRole("img", { name: "Ada Lovelace" }));
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent("AL");
  });
});
