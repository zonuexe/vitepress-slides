import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { cp, rm, stat } from "node:fs/promises";

/**
 * PDF assets plugin
 * @param {Object} options - Plugin options
 * @param {string} options.pdfSourceDir - PDF source directory
 * @param {string} options.pdfDistDir - PDF output directory
 * @param {string} options.basePath - Base path (default: "/pdf")
 */
export function pdfAssetsPlugin(options = {}) {
  const {
    pdfSourceDir = resolve(process.cwd(), "pdf"),
    pdfDistDir = resolve(process.cwd(), "docs/.vitepress/dist/pdf"),
    basePath = "/pdf",
  } = options;

  return {
    name: "pdf-assets-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url || "").split("?")[0];
        if (!path.startsWith(basePath) && !path.startsWith(`/slides${basePath}`)) {
          next();
          return;
        }

        const handler = async () => {
          const trimmed = path.replace(/^\/slides/, "");
          const relativePath = decodeURIComponent(trimmed.replace(/^\/+/, ""));
          const safePath = resolve(pdfSourceDir, relativePath.replace(new RegExp(`^${basePath.replace(/^\//, "")}/`), ""));
          if (!safePath.startsWith(pdfSourceDir)) {
            res.statusCode = 404;
            res.end();
            return;
          }
          const fileStat = await stat(safePath);
          if (!fileStat.isFile()) {
            res.statusCode = 404;
            res.end();
            return;
          }
          res.setHeader("Content-Type", "application/pdf");
          createReadStream(safePath).pipe(res);
        };

        handler().catch(next);
      });
    },
    async closeBundle() {
      await rm(pdfDistDir, { recursive: true, force: true });
      await cp(pdfSourceDir, pdfDistDir, { recursive: true });
    },
  };
}

