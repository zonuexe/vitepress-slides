import { resolve, dirname } from "node:path";
import { writeFile, mkdir } from "node:fs/promises";

/**
 * Slides data plugin
 * @param {Object} options - Plugin options
 * @param {string} options.slidesYamlPath - Path to slides.yaml
 * @param {string} options.siteYamlPath - Path to _site.yaml
 * @param {string} options.publicSlidesScript - Output script file path
 * @param {Function} options.generateSlidesData - Function to generate slide data
 * @param {Function} options.loadSiteConfig - Function to load site configuration
 */
export function slidesDataPlugin(options = {}) {
  const {
    slidesYamlPath = resolve(process.cwd(), "slides.yaml"),
    siteYamlPath = resolve(process.cwd(), "_site.yaml"),
    publicSlidesScript = resolve(process.cwd(), "docs/public/index.js"),
    generateSlidesData,
    loadSiteConfig,
  } = options;

  if (!generateSlidesData || !loadSiteConfig) {
    throw new Error(
      "slidesDataPlugin requires generateSlidesData and loadSiteConfig functions"
    );
  }

  const virtualModuleId = "virtual:slides-data";
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  async function writeSlidesDataScript(slides) {
    await mkdir(dirname(publicSlidesScript), { recursive: true });
    const script = `window.slidesData = ${JSON.stringify(slides).replace(/</g, "\\u003c")};\n`;
    await writeFile(publicSlidesScript, script, "utf8");
  }

  return {
    name: "slides-data-plugin",
    async load(id) {
      if (id !== resolvedVirtualModuleId) {
        return null;
      }

      this.addWatchFile(slidesYamlPath);
      this.addWatchFile(siteYamlPath);

      const { enrichedSlides, slidesForClient } = await generateSlidesData({
        includePdfMeta: true,
      });
      await writeSlidesDataScript(slidesForClient);
      for (const slide of enrichedSlides) {
        if (slide.meta) {
          this.addWatchFile(resolve(process.cwd(), slide.meta));
        }
      }
      const siteConfig = await loadSiteConfig();
      return `export const slides = ${JSON.stringify(
        enrichedSlides
      )};\nexport const siteConfig = ${JSON.stringify(siteConfig)};\nexport default { slides, siteConfig };`;
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      return null;
    },
  };
}

