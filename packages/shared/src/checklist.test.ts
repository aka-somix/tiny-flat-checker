import { describe, expect, it } from "vitest";
import { ChecklistTemplateSchema, validateValues, type ChecklistTemplate } from "./checklist.js";

const template: ChecklistTemplate = {
  version: 1,
  fields: [
    { id: "cracks", label: "No cracks", section: "Structure", type: "boolean" },
    { id: "light", label: "Natural light", section: "Light", type: "rating" },
    {
      id: "heating",
      label: "Heating",
      section: "Heating",
      type: "options",
      options: [
        { value: "gas", label: "Gas" },
        { value: "heat_pump", label: "Heat pump" },
      ],
    },
    { id: "notes", label: "Notes", section: "Notes", type: "text" },
  ],
};

describe("ChecklistTemplateSchema", () => {
  it("accepts a template with every field type", () => {
    expect(ChecklistTemplateSchema.parse(template)).toEqual(template);
  });

  it("rejects an options field without options", () => {
    const bad = { version: 1, fields: [{ id: "x", label: "X", section: "S", type: "options", options: [] }] };
    expect(ChecklistTemplateSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects an unknown field type", () => {
    const bad = { version: 1, fields: [{ id: "x", label: "X", section: "S", type: "date" }] };
    expect(ChecklistTemplateSchema.safeParse(bad).success).toBe(false);
  });
});

describe("validateValues", () => {
  it("accepts valid and missing/null values", () => {
    expect(validateValues(template, { cracks: true, light: 5, heating: "gas", notes: null })).toEqual({});
    expect(validateValues(template, {})).toEqual({});
  });

  it("flags unknown ids, wrong types and out-of-domain values", () => {
    expect(
      validateValues(template, { nope: true, cracks: "yes", light: 6, heating: "coal", notes: 3 }),
    ).toEqual({
      nope: "Unknown field",
      cracks: "Expected true or false",
      light: "Expected an integer from 1 to 5",
      heating: "Expected one of: gas, heat_pump",
      notes: "Expected text",
    });
  });

  it("rejects non-integer ratings", () => {
    expect(validateValues(template, { light: 2.5 })).toEqual({ light: "Expected an integer from 1 to 5" });
  });
});
