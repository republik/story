import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@story\/theme\/fonts\.css/, replacement: path.resolve(__dirname, "../../theme/fonts.css") },
      { find: /^@story\/theme\/presets$/, replacement: path.resolve(__dirname, "../../theme/presets.ts") },
      { find: /^@story\/theme/, replacement: path.resolve(__dirname, "./generated") },
    ],
  },
  build: {
    lib: {
      entry: "./src/index.svelte",
      formats: ["es"],
      fileName: "index",
    },
    copyPublicDir: false,
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
});
