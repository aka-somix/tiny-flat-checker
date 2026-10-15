import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ChecklistField as Field } from "@flat-checker/shared";
import { ChecklistField } from "./ChecklistField.js";

const field = (f: Partial<Field> & Pick<Field, "type">) =>
  ({ id: "f", label: "Question", section: "S", ...f }) as Field;

describe("ChecklistField", () => {
  it("maps boolean tiles to true/false", async () => {
    const onChange = vi.fn();
    render(<ChecklistField field={field({ type: "boolean" })} code="1.1" value={undefined} onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "No" }));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("maps rating tiles to numbers", async () => {
    const onChange = vi.fn();
    render(<ChecklistField field={field({ type: "rating" })} code="1.1" value={2} onChange={onChange} />);
    expect(screen.getByRole("radio", { name: "2" })).toBeChecked();
    await userEvent.click(screen.getByRole("radio", { name: "5" }));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it("offers the field's options", async () => {
    const onChange = vi.fn();
    const f = field({ type: "options", options: [{ value: "gas", label: "Gas" }, { value: "hp", label: "Heat pump" }] });
    render(<ChecklistField field={f} code="1.1" value={null} onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Heat pump" }));
    expect(onChange).toHaveBeenCalledWith("hp");
  });

  it("stores empty text as null", async () => {
    const onChange = vi.fn();
    render(<ChecklistField field={field({ type: "text", label: "Notes" })} code="1.1" value="a" onChange={onChange} />);
    await userEvent.clear(screen.getByRole("textbox", { name: "Notes" }));
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it("shows text answers as plain text when read-only", () => {
    render(<ChecklistField field={field({ type: "text" })} code="1.1" value="Lovely light" readOnly />);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByText("Lovely light")).toBeInTheDocument();
  });
});
