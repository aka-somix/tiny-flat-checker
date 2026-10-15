import { z } from "zod";
import { FlatCheckValuesSchema } from "./checklist.js";

export const FlatCheckMetaSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    link: z.url().optional(),
    price: z.number().positive(),
  })
  .meta({ id: "FlatCheckMeta", description: "Data identifying the flat." });

export const CreateFlatCheckSchema = z
  .object({
    templateVersion: z.number().int().positive(),
    meta: FlatCheckMetaSchema,
    values: FlatCheckValuesSchema,
  })
  .meta({ id: "CreateFlatCheck", description: "A filled checklist to store." });

export const FlatCheckSchema = CreateFlatCheckSchema.extend({
  id: z.uuid(),
  createdAt: z.iso.datetime({ offset: true }),
}).meta({ id: "FlatCheck", description: "A stored flat check." });

export const FlatCheckSummarySchema = z
  .object({
    id: z.uuid(),
    templateVersion: z.number().int().positive(),
    title: z.string(),
    price: z.number(),
    createdAt: z.iso.datetime({ offset: true }),
  })
  .meta({ id: "FlatCheckSummary", description: "A stored flat check, without its answers." });

export const FlatCheckListSchema = z.array(FlatCheckSummarySchema);

export const FlatCheckIdParamsSchema = z.object({ id: z.uuid() });

export type FlatCheckMeta = z.infer<typeof FlatCheckMetaSchema>;
export type CreateFlatCheck = z.infer<typeof CreateFlatCheckSchema>;
export type FlatCheck = z.infer<typeof FlatCheckSchema>;
export type FlatCheckSummary = z.infer<typeof FlatCheckSummarySchema>;
