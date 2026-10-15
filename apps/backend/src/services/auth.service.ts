import type { AuthUser, TokenVerifier } from "../auth/token-verifier.js";
import { HttpError } from "../http/errors.js";
import type { ApiKeyRepository } from "../repositories/api-key.repository.js";

export class AuthService {
  constructor(
    private readonly apiKeys: ApiKeyRepository,
    private readonly tokens: TokenVerifier,
  ) {}

  /** Returns the client name, or throws 401. */
  async verifyApiKey(key: string | undefined): Promise<string> {
    const client = key ? await this.apiKeys.verify(key) : null;
    if (!client) throw new HttpError(401, "Invalid API key");
    return client;
  }

  /** Returns the user behind an `Authorization: Bearer` header, or throws 401. */
  async verifyBearer(header: string | undefined): Promise<AuthUser> {
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) throw new HttpError(401, "Authentication required");
    try {
      return await this.tokens.verify(token);
    } catch {
      throw new HttpError(401, "Invalid or expired token");
    }
  }
}
