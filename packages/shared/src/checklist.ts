import { z } from "zod";

const FieldBase = {
  id: z.string().min(1),
  label: z.string().min(1),
  section: z.string().min(1),
  hint: z.string().optional(),
};

export const ChecklistOptionSchema = z.object({ value: z.string().min(1), label: z.string().min(1) });

/** One check in the template: its id, text and value domain. */
export const ChecklistFieldSchema = z
  .discriminatedUnion("type", [
    z.object({ ...FieldBase, type: z.literal("boolean") }),
    z.object({ ...FieldBase, type: z.literal("rating") }),
    z.object({ ...FieldBase, type: z.literal("options"), options: z.array(ChecklistOptionSchema).min(1) }),
    z.object({ ...FieldBase, type: z.literal("text") }),
  ])
  .meta({ id: "ChecklistField", description: "A check: boolean, rating 1-5, options or free text." });

export const ChecklistTemplateSchema = z
  .object({
    version: z.number().int().positive(),
    fields: z.array(ChecklistFieldSchema),
  })
  .meta({ id: "ChecklistTemplate", description: "A versioned checklist template." });

/** Answers keyed by field id. Missing or null means unanswered. */
export const FlatCheckValuesSchema = z
  .record(z.string(), z.union([z.boolean(), z.number(), z.string(), z.null()]))
  .meta({ id: "FlatCheckValues", description: "Answers keyed by checklist field id." });

export const ChecklistVersionParamsSchema = z.object({ version: z.coerce.number().int().positive() });

export type ChecklistOption = z.infer<typeof ChecklistOptionSchema>;
export type ChecklistField = z.infer<typeof ChecklistFieldSchema>;
export type ChecklistTemplate = z.infer<typeof ChecklistTemplateSchema>;
export type FlatCheckValues = z.infer<typeof FlatCheckValuesSchema>;
export type FlatCheckValue = FlatCheckValues[string];

function fieldError(field: ChecklistField, value: FlatCheckValue): string | null {
  if (value === null) return null;
  switch (field.type) {
    case "boolean":
      return typeof value === "boolean" ? null : "Expected true or false";
    case "rating":
      return Number.isInteger(value) && (value as number) >= 1 && (value as number) <= 5
        ? null
        : "Expected an integer from 1 to 5";
    case "options": {
      const allowed = field.options.map((o) => o.value);
      return typeof value === "string" && allowed.includes(value) ? null : `Expected one of: ${allowed.join(", ")}`;
    }
    case "text":
      return typeof value === "string" ? null : "Expected text";
  }
}

/** Checks answers against a template. Returns `{ fieldId: message }`, empty when valid. */
export function validateValues(template: ChecklistTemplate, values: FlatCheckValues): Record<string, string> {
  const fields = new Map(template.fields.map((f) => [f.id, f]));
  const errors: Record<string, string> = {};
  for (const [id, value] of Object.entries(values)) {
    const field = fields.get(id);
    const error = field ? fieldError(field, value) : "Unknown field";
    if (error) errors[id] = error;
  }
  return errors;
}
