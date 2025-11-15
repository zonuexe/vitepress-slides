import { defineConfig } from "vitepress";
import { fileURLToPath } from "node:url";
import { resolve, extname } from "node:path";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { cp, rm } from "node:fs/promises";
import {
  slidesDataPlugin,
  pdfAssetsPlugin,
  oembedPlugin,
} from "@zonuexe/vitepress-slides/plugins";
import { generateSlidesData } from "../../lib/generate-slides-data.js";
import { loadSiteConfig } from "../../lib/load-site-config.js";

const slidesPath = fileURLToPath(new URL("../../data/slides.json", import.meta.url));
const sitePath = fileURLToPath(new URL("../../data/site.json", import.meta.url));
const pdfSourceDir = fileURLToPath(new URL("../../pdf", import.meta.url));
const slideViewerDir = fileURLToPath(new URL("../../../slide-pdf.js", import.meta.url));
const rawBase = process.env.BASE_URL;
const normalizedBase =
  rawBase && rawBase !== "/" ? rawBase.replace(/\/$/, "") : "";
const viteBase = normalizedBase ? `${normalizedBase}/` : "/";
const joinBasePath = (suffix) =>
  `${normalizedBase}${suffix.startsWith("/") ? suffix : `/${suffix}`}`;
const viewerBasePath = joinBasePath("/slide-pdf.js");
const pdfBasePath = joinBasePath("/pdf");

function slideViewerPlugin(basePath, viewerRoot) {
  const basePathValue = basePath || "/slide-pdf.js";
  const viewerRootDir = viewerRoot || slideViewerDir;
  const mimeMap = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".mjs": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".map": "application/json",
    ".svg": "image/svg+xml",
  };
  return {
    name: "slide-viewer-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) {
          next();
          return;
        }
        const requestUrl = new URL(req.url, "http://localhost");
        if (!requestUrl.pathname.startsWith(basePathValue)) {
          next();
          return;
        }
        const relativePath =
          requestUrl.pathname.slice(basePathValue.length).replace(/^\/+/, "") ||
          "index.html";
        let filePath = resolve(viewerRootDir, relativePath);
        try {
          const fileStat = await stat(filePath);
          if (fileStat.isDirectory()) {
            filePath = resolve(filePath, "index.html");
          }
          const ext = extname(filePath);
          const mime = mimeMap[ext];
          if (mime) {
            res.setHeader("Content-Type", mime);
          }
          createReadStream(filePath).pipe(res);
        } catch (error) {
          res.statusCode = 404;
          res.end("slide viewer asset not found");
        }
      });
    },
    async closeBundle() {
      const outDir = resolve(process.cwd(), "docs/.vitepress/dist/slide-pdf.js");
      await rm(outDir, { recursive: true, force: true });
      await cp(viewerRootDir, outDir, { recursive: true });
      await rm(resolve(outDir, "images/README.md"), { force: true });
    },
  };
}

export default defineConfig({
  lang: "en-US",
  title: "Slides Example",
  description: "Simple VitePress site wired to @zonuexe/vitepress-slides.",
  base: viteBase,
  cleanUrls: true,
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        integrity: "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
    ],
  ],
  vite: {
    server: {
      fs: {
        allow: [process.cwd(), slideViewerDir],
      },
    },
    plugins: [
      slideViewerPlugin(viewerBasePath, slideViewerDir),
      slidesDataPlugin({
        slidesYamlPath: slidesPath,
        siteYamlPath: sitePath,
        generateSlidesData,
        loadSiteConfig,
      }),
      pdfAssetsPlugin({
        pdfSourceDir,
        basePath: pdfBasePath,
      }),
      oembedPlugin({
        generateSlidesData,
        loadSiteConfig,
      }),
    ],
  },
});
