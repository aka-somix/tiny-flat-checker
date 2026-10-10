import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { generateOpenApi, OPENAPI_PATH } from "./openapi.js";

describe("OpenAPI contract", () => {
  it("is an OpenAPI 3.1 document", async () => {
    const spec = JSON.parse(await generateOpenApi()) as { openapi: string; paths: object };
    expect(spec.openapi).toBe("3.1.0");
    expect(spec.paths).toHaveProperty("/health");
  });

  it("matches the committed openapi.json (run `pnpm openapi` if this fails)", async () => {
    const committed = await readFile(OPENAPI_PATH, "utf8");
    expect(await generateOpenApi()).toBe(committed);
  });
});
