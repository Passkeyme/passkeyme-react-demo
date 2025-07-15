import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "react-native": path.resolve(__dirname, "./src/mocks/react-native-mock.js"),
    },
  },
  define: {
    global: "globalThis",
  },
});
