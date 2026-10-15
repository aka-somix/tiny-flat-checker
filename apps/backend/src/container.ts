import { createClient } from "@supabase/supabase-js";
import type { ChecklistTemplate } from "@flat-checker/shared";
import { SupabaseTokenVerifier, type TokenVerifier } from "./auth/token-verifier.js";
import { ChecklistController } from "./controllers/checklist.controller.js";
import { FlatCheckController } from "./controllers/flatcheck.controller.js";
import { HealthController } from "./controllers/health.controller.js";
import type { ApiKeyRepository } from "./repositories/api-key.repository.js";
import type { ChecklistRepository } from "./repositories/checklist.repository.js";
import type { FlatCheckRepository } from "./repositories/flatcheck.repository.js";
import { MemoryApiKeyRepository } from "./repositories/memory-api-key.repository.js";
import { MemoryChecklistRepository } from "./repositories/memory-checklist.repository.js";
import { MemoryFlatCheckRepository } from "./repositories/memory-flatcheck.repository.js";
import { SupabaseApiKeyRepository } from "./repositories/supabase-api-key.repository.js";
import { SupabaseChecklistRepository } from "./repositories/supabase-checklist.repository.js";
import { SupabaseFlatCheckRepository } from "./repositories/supabase-flatcheck.repository.js";
import { AuthService } from "./services/auth.service.js";
import { ChecklistService } from "./services/checklist.service.js";
import { FlatCheckService } from "./services/flatcheck.service.js";

export interface Repositories {
  checklists: ChecklistRepository;
  flatchecks: FlatCheckRepository;
  apiKeys: ApiKeyRepository;
}

export interface ContainerConfig {
  repos: Repositories;
  tokenVerifier: TokenVerifier;
  /** Allowed CORS origin (the web app). */
  corsOrigin?: string;
}

/** Composition root. Nothing above this layer knows which implementation it got. */
export interface Container {
  corsOrigin: string;
  authService: AuthService;
  healthController: HealthController;
  checklistController: ChecklistController;
  flatCheckController: FlatCheckController;
}

export function createContainer(config: ContainerConfig): Container {
  const { repos } = config;
  return {
    corsOrigin: config.corsOrigin ?? "http://localhost:5173",
    authService: new AuthService(repos.apiKeys, config.tokenVerifier),
    healthController: new HealthController(),
    checklistController: new ChecklistController(new ChecklistService(repos.checklists)),
    flatCheckController: new FlatCheckController(new FlatCheckService(repos.flatchecks, repos.checklists)),
  };
}

function required(env: NodeJS.ProcessEnv, name: string): string {
  const value = env[name];
  if (!value) throw new Error(`Missing env var ${name}`);
  return value;
}

/** Production wiring: Supabase Data API with the secret key, Supabase Auth JWKS. */
export function supabaseDeps(env: NodeJS.ProcessEnv): ContainerConfig {
  const url = required(env, "SUPABASE_URL");
  const db = createClient(url, required(env, "SUPABASE_SECRET_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return {
    repos: {
      checklists: new SupabaseChecklistRepository(db),
      flatchecks: new SupabaseFlatCheckRepository(db),
      apiKeys: new SupabaseApiKeyRepository(db),
    },
    tokenVerifier: new SupabaseTokenVerifier(url),
    corsOrigin: env.CORS_ORIGIN,
  };
}

export interface MemoryDepsOptions {
  templates?: ChecklistTemplate[];
  apiKeys?: Record<string, string>;
  newId?: () => string;
  now?: () => string;
}

/** In-memory wiring for tests and the OpenAPI generator. Rejects every token unless a verifier is supplied. */
export function memoryDeps(opts: MemoryDepsOptions = {}): ContainerConfig {
  return {
    repos: {
      checklists: new MemoryChecklistRepository(opts.templates ?? []),
      flatchecks: new MemoryFlatCheckRepository(
        opts.newId ?? (() => crypto.randomUUID()),
        opts.now ?? (() => new Date().toISOString()),
      ),
      apiKeys: new MemoryApiKeyRepository(opts.apiKeys ?? {}),
    },
    tokenVerifier: {
      verify: () => Promise.reject(new Error("No token verifier configured")),
    },
  };
}
