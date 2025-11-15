import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [vue()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.js"),
        plugins: resolve(__dirname, "src/plugins/index.js"),
        components: resolve(__dirname, "src/components/index.js"),
        styles: resolve(__dirname, "src/styles/index.css"),
        runtime: resolve(__dirname, "src/runtime/index.js"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "vitepress",
        "@unhead/vue",
        "fuse.js",
        "js-yaml",
        "virtual:slides-data",
        /^node:/,
      ],
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "styles.css" || assetInfo.name === "index.css") {
            return "styles/index.css";
          }
          return "assets/[name][extname]";
        },
      },
    },
    copyPublicDir: false,
  },
});
