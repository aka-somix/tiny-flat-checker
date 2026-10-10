import { buildApp } from "./app.js";
import { createContainer } from "./container.js";

const PORT = Number.parseInt(process.env.PORT ?? "4000", 10);
const isProduction = process.env.NODE_ENV === "production";

const app = await buildApp(createContainer(), {
  logger: {
    level: process.env.LOG_LEVEL ?? "info",
    ...(isProduction ? {} : { transport: { target: "pino-pretty" } }),
  },
});

await app.listen({ port: PORT, host: "0.0.0.0" });
