import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint2";

export default defineConfig({
  server: {
    open: true, // ✅ this is all you need
  },
  plugins: [react(), eslint()],
});
