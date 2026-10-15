import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import {
  CreateFlatCheckSchema,
  ErrorResponseSchema,
  FlatCheckIdParamsSchema,
  FlatCheckListSchema,
  FlatCheckSchema,
} from "@flat-checker/shared";
import type { FlatCheckController } from "../controllers/flatcheck.controller.js";
import { currentUser } from "../http/guards.js";

const security = [{ bearerAuth: [] }];
const tags = ["flatchecks"];

/** Mounted under `/private` behind `jwtGuard`. */
export function privateFlatCheckRoutes(controller: FlatCheckController): FastifyPluginAsyncZod {
  return async (app) => {
    app.post(
      "/flatchecks",
      {
        schema: {
          operationId: "createFlatCheck",
          summary: "Store a flat check",
          tags,
          security,
          body: CreateFlatCheckSchema,
          response: { 201: FlatCheckSchema, 400: ErrorResponseSchema, 401: ErrorResponseSchema },
        },
      },
      async (req, reply) => reply.status(201).send(await controller.create(currentUser(req), req.body)),
    );

    app.get(
      "/flatchecks",
      {
        schema: {
          operationId: "listFlatChecks",
          summary: "List my flat checks, newest first",
          tags,
          security,
          response: { 200: FlatCheckListSchema, 401: ErrorResponseSchema },
        },
      },
      (req) => controller.list(currentUser(req)),
    );

    app.get(
      "/flatchecks/:id",
      {
        schema: {
          operationId: "getFlatCheck",
          summary: "Get one of my flat checks",
          tags,
          security,
          params: FlatCheckIdParamsSchema,
          response: { 200: FlatCheckSchema, 400: ErrorResponseSchema, 401: ErrorResponseSchema, 404: ErrorResponseSchema },
        },
      },
      (req) => controller.get(currentUser(req), req.params.id),
    );

    app.delete(
      "/flatchecks/:id",
      {
        schema: {
          operationId: "deleteFlatCheck",
          summary: "Delete one of my flat checks",
          tags,
          security,
          params: FlatCheckIdParamsSchema,
          response: { 204: z.null(), 400: ErrorResponseSchema, 401: ErrorResponseSchema, 404: ErrorResponseSchema },
        },
      },
      async (req, reply) => {
        await controller.delete(currentUser(req), req.params.id);
        return reply.status(204).send(null);
      },
    );
  };
}
