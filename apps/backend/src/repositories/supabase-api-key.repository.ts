import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApiKeyRepository } from "./api-key.repository.js";

/** Hashing happens in Postgres (`verify_api_key`), so the Vault salt never leaves the database. */
export class SupabaseApiKeyRepository implements ApiKeyRepository {
  constructor(private readonly db: SupabaseClient) {}

  // ponytail: one RPC per public request, add an LRU cache if latency matters.
  async verify(key: string) {
    const { data, error } = await this.db.rpc("verify_api_key", { p_key: key });
    if (error) throw error;
    return typeof data === "string" ? data : null;
  }
}
