import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { HealthResponseSchema } from "@flat-checker/shared";
import type { HealthController } from "../controllers/health.controller.js";

export function healthRoutes(controller: HealthController): FastifyPluginAsyncZod {
  return async (app) => {
    app.get(
      "/health",
      {
        schema: {
          operationId: "getHealth",
          summary: "Liveness probe",
          tags: ["system"],
          response: { 200: HealthResponseSchema },
        },
      },
      () => controller.get(),
    );
  };
}
