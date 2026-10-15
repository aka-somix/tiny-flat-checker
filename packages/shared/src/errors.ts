import { z } from "zod";

/** Body of every 4xx/5xx response. */
export const ErrorResponseSchema = z
  .object({ error: z.string(), details: z.unknown().optional() })
  .meta({ id: "ErrorResponse", description: "Error message with optional details." });

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
