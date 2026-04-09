import { defineConfig } from "@pandacss/dev";
import { presets } from "@story/theme/presets";

export default defineConfig({
  preflight: true,
  polyfill: true, // was broken on safari without it
  prefix: "story", // do not change
  cssVarRoot: "#story-component", // do not change

  presets,

  include: ["./src/**/*.{js,ts,svelte}"],

  exclude: [],

  importMap: "@story/theme",

  outdir: "./generated",

  jsxFramework: "svelte",
});
