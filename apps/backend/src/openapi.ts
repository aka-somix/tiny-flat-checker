import { fileURLToPath } from "node:url";
import { buildApp } from "./app.js";
import { createContainer, memoryDeps } from "./container.js";

/** Committed OpenAPI contract. Regenerate with `pnpm openapi`. */
export const OPENAPI_PATH = fileURLToPath(new URL("../openapi.json", import.meta.url));

/** Build the app and return its OpenAPI 3.1 document, serialized exactly as it is committed. */
export async function generateOpenApi(): Promise<string> {
  const app = await buildApp(createContainer(memoryDeps()));
  await app.ready();
  const spec = app.swagger();
  await app.close();
  return `${JSON.stringify(spec, null, 2)}\n`;
}
