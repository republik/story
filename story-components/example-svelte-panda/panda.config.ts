import { defineConfig } from "@pandacss/dev";
import { presets } from "@story/theme/presets";

export default defineConfig({
  preflight: true,
  polyfill: true,
  prefix: "r",
  cssVarRoot: "#custom-element-container",
  // strictTokens: true,

  presets,

  // Files where CSS is extracted from
  // NOTE: must include any component packages that are imported in the app
  include: ["./src/**/*.{js,ts,svelte}"],

  // Files to exclude
  exclude: [],

  // Package name where style functions get imported from
  importMap: "@story/theme",

  // Output directory for generated files.
  // NOTE: this must be directory where `importMap` module resolves to
  outdir: "../../theme/__generated__",

  jsxFramework: "svelte",
});
