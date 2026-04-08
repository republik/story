import { defineConfig } from "@pandacss/dev";
import { presets } from "@story/theme/presets";

export default defineConfig({
  preflight: true,
  prefix: "tv",

  presets,

  include: ["./src/**/*.{js,ts,svelte}"],

  exclude: [],

  importMap: "@story/theme",

  outdir: "../../theme/__generated__",

  jsxFramework: "svelte",
});
