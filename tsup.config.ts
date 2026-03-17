import { defineConfig } from "tsup";

// everything that ships as a peer dep or is only needed at
// the consumer's build time goes here — never bundle these.
const sharedExternal = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  // all radix primitives
  /^@radix-ui\/.*/,
  // cmdk, tailwind, lucide — large, always present in consumer projects
  "cmdk",
  "tailwindcss",
  "tailwindcss/plugin",
  "lucide-react",
  // class helpers — tiny but user may tree-shake their own copy
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  // tiptap — all packages are peer deps, never bundle them
  /^@tiptap\/.*/,
  "lowlight",
  // react-hook-form — optional peer dep, never bundle it
  "react-hook-form",
  // veloria-ui itself — the rhf and motion entries import from it
  "veloria-ui",
];

const cliExternal = [
  ...sharedExternal,
  "chalk",
  "commander",
  "execa",
  "fs-extra",
  "ora",
  "prompts",
];

export default defineConfig([
  // ── Main component library ──────────────────────────────────────────────
  {
    entry:    { index: "src/index.ts" },
    format:   ["cjs", "esm"],
    dts:      true,
    splitting: true,
    sourcemap: true,
    clean:    true,
    treeshake: true,
    external:  sharedExternal,
    outDir:    "dist",
    banner: {
      js: `/**
 * veloria-ui
 * Build anything. Ship faster.
 * By JohnDev19 — https://github.com/JohnDev19/Veloria-UI
 * MIT License
 */`,
    },
  },

  // ── RHF adapter ─────────────────────────────────────────────────────────
  {
    entry:     { rhf: "src/rhf/index.ts" },
    format:    ["cjs", "esm"],
    dts:       true,
    splitting: false,
    sourcemap: true,
    clean:     false,
    treeshake: true,
    external:  sharedExternal,
    outDir:    "dist",
  },

  // ── Motion system ────────────────────────────────────────────────────────
  //
  // veloria-ui/motion — zero-dependency animation layer built on the
  // Web Animations API. No Framer Motion, no GSAP.
  //
  // Separate entry so tree-shaking removes it entirely from projects
  // that don't import it. Keeps "use client" isolated.
  {
    entry:     { motion: "src/motion/index.ts" },
    format:    ["cjs", "esm"],
    dts:       true,
    splitting: false,
    sourcemap: true,
    clean:     false,
    treeshake: true,
    external:  sharedExternal,
    outDir:    "dist",
    banner: {
      js: `/**
 * veloria-ui/motion
 * Web Animations API motion layer — zero dependencies.
 * By JohnDev19 — MIT License
 */`,
    },
  },

  // ── VeloriaProvider ──────────────────────────────────────────────────────
  {
    entry:     { provider: "src/provider.tsx" },
    format:    ["cjs", "esm"],
    dts:       true,
    sourcemap: true,
    clean:     false,
    external:  sharedExternal,
    outDir:    "dist",
  },

  // ── Tailwind plugin ──────────────────────────────────────────────────────
  {
    entry:     { tailwind: "src/tailwind.ts" },
    format:    ["cjs"],
    dts:       true,
    sourcemap: false,
    clean:     false,
    external:  ["tailwindcss", "tailwindcss/plugin"],
    outDir:    "dist",
  },

  // ── CLI binary ───────────────────────────────────────────────────────────
  //
  // IMPORTANT — shebang handling:
  //
  // Do NOT use banner: { js: "#!/usr/bin/env node" } here.
  // tsup's banner is appended after its own generated file header,
  // which puts the shebang on line 2+. Node.js requires the shebang
  // to be the very first bytes of the file (byte 0).
  //
  // Correct approach: add the shebang as a postbuild step that prepends
  // it directly to dist/cli/index.js before publishing.
  {
    entry:     { "cli/index": "src/cli/index.ts" },
    format:    ["cjs"],
    dts:       false,
    splitting: false,
    sourcemap: false,
    clean:     false,
    treeshake: true,
    external:  cliExternal,
    outDir:    "dist",
  },
]);
