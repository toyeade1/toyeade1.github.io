import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import mdPlugin from 'vite-plugin-md';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "/toyeade1.github.io/", 
  plugins: [
    react(),
    runtimeErrorOverlay(),
    mdPlugin(),
    themePlugin(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'public/markdown-pages/*'),
          dest: 'markdown-pages'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@db": path.resolve(__dirname, "db"),
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/index.html'),
        fallback: path.resolve(__dirname, 'public/404.html')
      }
    }
  },
});
