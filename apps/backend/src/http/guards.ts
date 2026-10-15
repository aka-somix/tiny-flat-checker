import type { FastifyRequest, onRequestAsyncHookHandler } from "fastify";
import type { AuthUser } from "../auth/token-verifier.js";
import type { AuthService } from "../services/auth.service.js";
import { HttpError } from "./errors.js";

declare module "fastify" {
  interface FastifyRequest {
    user: AuthUser | null;
  }
}

/** `/public/*`: requires a valid `x-api-key` header. */
export function apiKeyGuard(auth: AuthService): onRequestAsyncHookHandler {
  return async (req) => {
    const key = req.headers["x-api-key"];
    await auth.verifyApiKey(typeof key === "string" ? key : undefined);
  };
}

/** `/private/*`: requires a valid Supabase access token; sets `req.user`. */
export function jwtGuard(auth: AuthService): onRequestAsyncHookHandler {
  return async (req) => {
    req.user = await auth.verifyBearer(req.headers.authorization);
  };
}

/** The user set by `jwtGuard`. */
export function currentUser(req: FastifyRequest): AuthUser {
  if (!req.user) throw new HttpError(401, "Authentication required");
  return req.user;
}
