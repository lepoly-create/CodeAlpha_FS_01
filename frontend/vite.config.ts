import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },

  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "react-vendor";
            }
            if (
              id.includes("lucide-react") ||
              id.includes("sonner") ||
              id.includes("@base-ui/react") ||
              id.includes("clsx") ||
              id.includes("tailwind-merge")
            ) {
              return "ui-vendor";
            }
            if (id.includes("axios") || id.includes("zod")) {
              return "utils-vendor";
            }
          }
        },
      },
    },
  },
});