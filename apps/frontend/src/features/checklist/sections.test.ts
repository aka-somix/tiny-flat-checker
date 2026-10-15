import { ClipboardCheck, Droplets } from "lucide-react";
import { toSections } from "./sections.js";

describe("toSections", () => {
  it("groups in template order, numbers fields and picks icons", () => {
    const sections = toSections({
      version: 1,
      fields: [
        { id: "a", label: "A", section: "Plumbing", type: "boolean" },
        { id: "b", label: "B", section: "Mystery", type: "boolean" },
        { id: "c", label: "C", section: "Plumbing", type: "rating" },
      ],
    });
    expect(sections.map((s) => [s.title, s.icon, s.fields.map((f) => f.code)])).toEqual([
      ["Plumbing", Droplets, ["1.1", "1.2"]],
      ["Mystery", ClipboardCheck, ["2.1"]],
    ]);
  });
});
