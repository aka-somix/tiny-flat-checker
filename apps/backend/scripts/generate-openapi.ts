import { writeFile } from "node:fs/promises";
import { generateOpenApi, OPENAPI_PATH } from "../src/openapi.js";

await writeFile(OPENAPI_PATH, await generateOpenApi());
console.log(`OpenAPI spec written to ${OPENAPI_PATH}`);
