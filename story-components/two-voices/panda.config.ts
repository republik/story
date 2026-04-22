import { defineConfig } from "@pandacss/dev";
import { presets } from "./theme/presets";

export default defineConfig({
  preflight: true,
  polyfill: true, // was broken on safari without it
  prefix: "story",
  cssVarRoot: ".story-component",

  presets,

  include: ["./src/**/*.{js,ts,svelte}"],

  exclude: [],

  importMap: "@story/theme",

  outdir: "./generated",

  jsxFramework: "svelte",
});
