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
import { healthRoutes } from "./routes/health.routes.js";

/** Build the Fastify app from a container. Kept separate from server boot so tests can drive it in-process. */
export async function buildApp(
  container: Container,
  opts: FastifyServerOptions = {},
): Promise<FastifyInstance> {
  const app = Fastify(opts).withTypeProvider<ZodTypeProvider>();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler(errorHandler);

  await app.register(cors);
  await app.register(swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Tiny Flat Checker API",
        version: "0.1.0",
      },
      servers: [{ url: "http://localhost:4000", description: "Local" }],
      tags: [{ name: "system", description: "Operational endpoints" }],
    },
    transform: jsonSchemaTransform,
    transformObject: jsonSchemaTransformObject,
  });
  await app.register(swaggerUi, { routePrefix: "/docs" });

  await app.register(healthRoutes(container.healthController));

  return app;
}
