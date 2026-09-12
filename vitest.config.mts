import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const rootDir = import.meta.dirname;

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        url: "http://localhost:3000",
      },
    },
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    // Node's own built-in localStorage (unconfigured without
    // --localstorage-file) otherwise claims the global before jsdom's
    // working implementation can, breaking Storage methods like .clear().
    execArgv: ["--no-experimental-webstorage"],
  },
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "."),
    },
  },
});
