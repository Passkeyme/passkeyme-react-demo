import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
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
