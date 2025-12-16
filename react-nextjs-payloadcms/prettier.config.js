// @ts-check

import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/app/(frontend)/styles.css",
  },
  ignores: ["src/payload-types.ts"],
});
