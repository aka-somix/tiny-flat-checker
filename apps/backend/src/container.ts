import { HealthController } from "./controllers/health.controller.js";

export interface ContainerConfig {
  /** Override the clock (deterministic timestamps in tests). */
  now?: () => string;
}

/**
 * Composition root. Wires concrete implementations behind their interfaces.
 * When storage arrives, build repositories here and inject them into services —
 * nothing above this layer should know which implementation it got.
 */
export interface Container {
  now: () => string;
  healthController: HealthController;
}

export function createContainer(config: ContainerConfig = {}): Container {
  return {
    now: config.now ?? (() => new Date().toISOString()),
    healthController: new HealthController(),
  };
}
