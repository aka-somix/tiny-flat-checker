import type { ApiKeyRepository } from "./api-key.repository.js";

/** In-memory implementation, for tests and the OpenAPI generator. */
export class MemoryApiKeyRepository implements ApiKeyRepository {
  constructor(private readonly keys: Record<string, string>) {}

  async verify(key: string) {
    return this.keys[key] ?? null;
  }
}
