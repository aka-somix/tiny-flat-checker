import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { ChecklistTemplateSchema, ChecklistVersionParamsSchema, ErrorResponseSchema } from "@flat-checker/shared";
import type { ChecklistController } from "../controllers/checklist.controller.js";

const security = [{ apiKey: [] }];

/** Mounted under `/public` behind `apiKeyGuard`. */
export function publicChecklistRoutes(controller: ChecklistController): FastifyPluginAsyncZod {
  return async (app) => {
    app.get(
      "/checklists/current",
      {
        schema: {
          operationId: "getCurrentChecklist",
          summary: "Latest checklist template",
          tags: ["checklists"],
          security,
          response: { 200: ChecklistTemplateSchema, 401: ErrorResponseSchema, 404: ErrorResponseSchema },
        },
      },
      () => controller.current(),
    );

    app.get(
      "/checklists/:version",
      {
        schema: {
          operationId: "getChecklistByVersion",
          summary: "Checklist template by version",
          tags: ["checklists"],
          security,
          params: ChecklistVersionParamsSchema,
          response: {
            200: ChecklistTemplateSchema,
            400: ErrorResponseSchema,
            401: ErrorResponseSchema,
            404: ErrorResponseSchema,
          },
        },
      },
      (req) => controller.byVersion(req.params.version),
    );
  };
}
