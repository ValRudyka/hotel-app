import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin({ failOnError: false })],
  define: {
    "process.env": {
      SUPABASE_KEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZ2NnYnpodnNlaGR0dmNtemVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ5NzcwMjQsImV4cCI6MjAxMDU1MzAyNH0.-n8Wp4dm87sIQ3GAiHEk88P0BXT56kF3SYStjUJvOt0",
    },
  },
});
