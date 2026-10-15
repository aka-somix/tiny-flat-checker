import { createRemoteJWKSet, jwtVerify } from "jose";

export interface AuthUser {
  id: string;
  email: string;
}

/** Turns a bearer token into a user. Throws when the token is invalid or expired. */
export interface TokenVerifier {
  verify(token: string): Promise<AuthUser>;
}

/** Verifies Supabase Auth access tokens against the project's JWKS (asymmetric signing keys). */
export class SupabaseTokenVerifier implements TokenVerifier {
  private readonly jwks;
  private readonly issuer: string;

  constructor(supabaseUrl: string) {
    this.issuer = `${supabaseUrl}/auth/v1`;
    this.jwks = createRemoteJWKSet(new URL(`${this.issuer}/.well-known/jwks.json`));
  }

  async verify(token: string): Promise<AuthUser> {
    const { payload } = await jwtVerify(token, this.jwks, { issuer: this.issuer, audience: "authenticated" });
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") {
      throw new Error("Token has no subject or email");
    }
    return { id: payload.sub, email: payload.email };
  }
}
