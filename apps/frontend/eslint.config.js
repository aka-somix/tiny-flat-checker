import tseslint from "typescript-eslint";

// Only job right now: keep the component library (src/ui) free of app logic.
export default tseslint.config(
  { ignores: ["dist", "storybook-static"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [tseslint.configs.base],
  },
  {
    files: ["src/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/api", "**/api/**", "**/features", "**/features/**", "**/pages", "**/pages/**"],
              message: "src/ui is presentational: receive data via props, never import app logic.",
            },
            {
              group: ["@tanstack/*", "react-router", "react-router-dom"],
              message: "src/ui is presentational: no data fetching or routing.",
            },
          ],
        },
      ],
      "no-restricted-globals": [
        "error",
        { name: "fetch", message: "src/ui is presentational: fetch belongs in src/api." },
      ],
    },
  },
);
