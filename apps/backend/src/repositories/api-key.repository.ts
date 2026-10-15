export interface ApiKeyRepository {
  /** Returns the client name owning the key, or null. */
  verify(key: string): Promise<string | null>;
}
