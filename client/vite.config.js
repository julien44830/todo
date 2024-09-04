import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(), // Plugin React gère JSX automatiquement

  ],
  define: {
    "import.meta.env": JSON.stringify(process.env),
  },
});
