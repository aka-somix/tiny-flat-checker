import { z } from "zod";

/** Body of `GET /health`. */
export const HealthResponseSchema = z
  .object({
    status: z.literal("ok"),
  })
  .meta({ id: "HealthResponse", description: "Liveness probe result." });

export type HealthResponse = z.infer<typeof HealthResponseSchema>;
