import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
  esbuild: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "react-native": "/src/mocks/react-native-mock.js",
    },
  },
  define: {
    global: "globalThis",
  },
});
