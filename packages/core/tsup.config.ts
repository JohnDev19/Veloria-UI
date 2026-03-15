import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"],
  banner: {
    js: `/**
 * @atlasui/core
 * Build anything. Ship faster.
 * © AtlasUI Contributors | JohnDev19 — MIT License
 */`,
  },
});
