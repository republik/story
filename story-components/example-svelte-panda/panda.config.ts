import { defineConfig } from "@pandacss/dev";
import { presets } from "@story/theme/presets";

export default defineConfig({
  preflight: true,
  polyfill: true,
  prefix: "story", // do not change
  cssVarRoot: "#story-component", // do not change

  // strictTokens: true,

  presets,

  // Files where CSS is extracted from
  // NOTE: must include any component packages that are imported in the app
  include: ["./src/**/*.{js,ts,svelte}"],

  // Files to exclude
  exclude: [],

  importMap: "@story/theme",

  outdir: "./generated",

  jsxFramework: "svelte",
});
