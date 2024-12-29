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

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    runtimeErrorOverlay(),
    mdPlugin(),
    themePlugin(),
    viteStaticCopy({
      //getting the files i would like and copying them to the root directory of the dist folder
      targets: [
        {
          src: path.resolve(__dirname, 'public/markdown-pages/*'),
          dest: './'
        },
        {
          src: path.resolve(__dirname, 'public/assets/*'),
          dest: './assets'
        },
        {
          src: path.resolve(__dirname, '.nojekyll'),
          dest: './'
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
    // assetsDir: 'assets',
  },
});