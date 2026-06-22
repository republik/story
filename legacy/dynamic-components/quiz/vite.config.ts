import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: { "process.env.NODE_ENV": '"production"' },
  resolve: {
    alias: [
      {
        find: /^@story\/theme\/fonts\.css/,
        replacement: path.resolve(__dirname, "./theme/fonts.css"),
      },
      {
        find: /^@story\/theme\/presets$/,
        replacement: path.resolve(__dirname, "./theme/presets.ts"),
      },
      {
        find: /^@story\/theme/,
        replacement: path.resolve(__dirname, "./generated"),
      },
    ],
  },
  build: {
    lib: {
      entry: "./src/index.js",
      formats: ["es"],
      fileName: "index",
    },
    copyPublicDir: false,
  },
  plugins: [react()],
});
