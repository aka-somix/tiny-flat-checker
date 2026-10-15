// Public surface of the component library. App code imports from "ui", never from deep paths.
export * from "./atoms/index.js";
export * from "./molecules/index.js";
export * from "./organisms/index.js";
export * from "./templates/index.js";
export { cn } from "./lib/cn.js";
export { formatDate, formatPrice } from "./lib/format.js";
export type { LinkComponent } from "./lib/link.js";
