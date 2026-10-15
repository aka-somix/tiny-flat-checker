import Fastify, { type FastifyInstance, type FastifyServerOptions } from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  jsonSchemaTransformObject,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import type { Container } from "./container.js";
import { errorHandler } from "./http/errors.js";
import { apiKeyGuard, jwtGuard } from "./http/guards.js";
import { healthRoutes } from "./routes/health.routes.js";
import { privateFlatCheckRoutes } from "./routes/private-flatchecks.routes.js";
import { publicChecklistRoutes } from "./routes/public-checklist.routes.js";

/** Build the Fastify app from a container. Kept separate from server boot so tests can drive it in-process. */
export async function buildApp(
  container: Container,
  opts: FastifyServerOptions = {},
): Promise<FastifyInstance> {
  const app = Fastify(opts).withTypeProvider<ZodTypeProvider>();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler(errorHandler);

  app.decorateRequest("user", null);

  await app.register(cors, {
    origin: container.corsOrigin,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["content-type", "authorization", "x-api-key"],
  });
  await app.register(swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Tiny Flat Checker API",
        version: "0.1.0",
      },
      servers: [{ url: "http://localhost:4000", description: "Local" }],
      tags: [
        { name: "system", description: "Operational endpoints" },
        { name: "checklists", description: "Checklist templates (API key)" },
        { name: "flatchecks", description: "Stored flat checks (Supabase JWT)" },
      ],
      components: {
        securitySchemes: {
          apiKey: { type: "apiKey", in: "header", name: "x-api-key" },
          bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        },
      },
    },
    transform: jsonSchemaTransform,
    transformObject: jsonSchemaTransformObject,
  });
  await app.register(swaggerUi, { routePrefix: "/docs" });

  await app.register(healthRoutes(container.healthController));

  await app.register(
    async (scope) => {
      scope.addHook("onRequest", apiKeyGuard(container.authService));
      await scope.register(publicChecklistRoutes(container.checklistController));
    },
    { prefix: "/public" },
  );

  await app.register(
    async (scope) => {
      scope.addHook("onRequest", jwtGuard(container.authService));
      await scope.register(privateFlatCheckRoutes(container.flatCheckController));
    },
    { prefix: "/private" },
  );

  return app;
}
