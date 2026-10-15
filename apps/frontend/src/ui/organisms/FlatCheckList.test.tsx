import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlatCheckList } from "./FlatCheckList.js";

const items = [{ id: "a", title: "Elm Street", price: 250000, createdAt: "2026-10-10T10:00:00.000Z" }];

describe("FlatCheckList", () => {
  it("links each check and exposes download and delete", async () => {
    const onDownload = vi.fn();
    const onDelete = vi.fn();
    render(<FlatCheckList items={items} hrefFor={(id) => `/flatchecks/${id}`} onDownload={onDownload} onDelete={onDelete} />);
    expect(screen.getByRole("link", { name: /Elm Street/ })).toHaveAttribute("href", "/flatchecks/a");
    await userEvent.click(screen.getByRole("button", { name: "Download PDF of Elm Street" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete Elm Street" }));
    expect(onDownload).toHaveBeenCalledWith("a");
    expect(onDelete).toHaveBeenCalledWith("a");
  });

  it("shows an empty state", () => {
    render(<FlatCheckList items={[]} hrefFor={() => ""} onDownload={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("No saved checks yet")).toBeInTheDocument();
  });
});
