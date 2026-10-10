import type { HealthResponse } from "@flat-checker/shared";

/** Liveness probe. Thin by design: no dependencies, no logic. */
export class HealthController {
  get(): HealthResponse {
    return { status: "ok" };
  }
}
