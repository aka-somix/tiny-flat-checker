import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserCard } from "./UserCard.js";

describe("UserCard", () => {
  it("shows the user and signs out", async () => {
    const onSignOut = vi.fn();
    render(<UserCard name="Ada Lovelace" email="ada@example.com" onSignOut={onSignOut} />);
    expect(screen.getByRole("heading", { name: "Ada Lovelace" })).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Sign out" }));
    expect(onSignOut).toHaveBeenCalledOnce();
  });
});
