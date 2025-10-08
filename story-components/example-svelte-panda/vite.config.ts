import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.svelte",
      formats: ["es"],
      fileName: "index",
    },
    cssCodeSplit: false,
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
