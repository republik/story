import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "MyCounter",
      formats: ["es"],
      fileName: "index",
    },
    copyPublicDir: false,
  },
  plugins: [dts({ include: "./src/index.ts" })],
});
