import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Droplets, Zap } from "lucide-react";
import { ChecklistForm, type ChecklistSectionData } from "./ChecklistForm.js";

const sections: ChecklistSectionData[] = [
  { title: "Plumbing", icon: Droplets, fields: [{ code: "1.1", field: { id: "leaks", label: "No leaks", section: "Plumbing", type: "boolean" } }] },
  { title: "Electrical", icon: Zap, fields: [{ code: "2.1", field: { id: "rcd", label: "Has RCD", section: "Electrical", type: "boolean" } }] },
];

describe("ChecklistForm", () => {
  it("renders sections with progress and forwards answers by field id", async () => {
    const onChange = vi.fn();
    render(<ChecklistForm sections={sections} values={{ leaks: true }} onChange={onChange} />);
    expect(screen.getByRole("region", { name: "Section 1 of 2: Plumbing" })).toHaveTextContent("1/1 checked");
    expect(screen.getByRole("region", { name: "Section 2 of 2: Electrical" })).toHaveTextContent("0/1 checked");
    await userEvent.click(screen.getAllByRole("radio", { name: "Yes" })[1]!);
    expect(onChange).toHaveBeenCalledWith("rcd", true);
  });
});
