import type { ChecklistTemplate } from "@flat-checker/shared";
import { buildFlatCheckDoc, formatAnswer } from "./buildFlatCheckDoc.js";

const template: ChecklistTemplate = {
  version: 3,
  fields: [
    { id: "cracks", label: "No cracks", section: "Structure", type: "boolean" },
    { id: "light", label: "Natural light", section: "Light & noise", type: "rating" },
    { id: "heat", label: "Heating", section: "Light & noise", type: "options", options: [{ value: "hp", label: "Heat pump" }] },
    { id: "notes", label: "Notes", section: "Notes", type: "text" },
  ],
};

describe("formatAnswer", () => {
  it("formats every field type and unanswered checks", () => {
    const [b, r, o, t] = template.fields as [never, never, never, never];
    expect([formatAnswer(b, false), formatAnswer(r, 4), formatAnswer(o, "hp"), formatAnswer(t, "ok"), formatAnswer(b, null)]).toEqual([
      "No",
      "4 / 5",
      "Heat pump",
      "ok",
      "Not checked",
    ]);
  });
});

describe("buildFlatCheckDoc", () => {
  it("includes the flat, the progress and one band per section", () => {
    const doc = buildFlatCheckDoc(template, { title: "Elm Street", price: 250000, link: "https://x.test" }, { cracks: true, light: 4 });
    const json = JSON.stringify(doc.content);
    expect(json).toContain("Elm Street");
    expect(json).toContain("2 of 4 checked");
    expect(json).toContain("https://x.test");
    for (const band of ["1  Structure", "2  Light & noise", "3  Notes"]) expect(json).toContain(band);
    expect(json).toContain("Not checked");
  });
});
