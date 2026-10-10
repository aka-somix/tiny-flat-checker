import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";

/** Base class for errors that map to a specific HTTP status. */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export class NotFoundError extends HttpError {
  constructor(resource: string, id: string) {
    super(404, `${resource} not found: ${id}`);
    this.name = "NotFoundError";
  }
}

/** Central error handler translating known error types into JSON responses. */
export function errorHandler(
  err: FastifyError | Error,
  req: FastifyRequest,
  reply: FastifyReply,
): void {
  if (err instanceof HttpError) {
    void reply.status(err.status).send({ error: err.message, details: err.details });
    return;
  }
  if (hasZodFastifySchemaValidationErrors(err)) {
    void reply.status(400).send({ error: "Validation failed", details: err.validation });
    return;
  }
  req.log.error({ err }, "unhandled error");
  void reply.status(500).send({ error: "Internal server error" });
}
