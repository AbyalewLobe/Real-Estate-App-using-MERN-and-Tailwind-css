import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"; // ⬅️ Add this line

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ⬅️ This enables @/ to point to /src
    },
  },
  plugins: [react()],
});
