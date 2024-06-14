import { defineConfig } from "tsup";

export default defineConfig({
  splitting: false,
  clean: true,
  format: "esm",
  dts: true,
  target: "es2020",
  noExternal: [/.*/],
});
