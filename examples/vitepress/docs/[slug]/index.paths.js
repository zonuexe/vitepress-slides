import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const slides = require("../../data/slides.json");

/**
 * VitePress dynamic route generator.
 * Produces `/hello-world/` style pages for every slide entry.
 */
export default {
  paths() {
    return slides.map((slide) => ({
      params: {
        slug: slide.slug,
      },
    }));
  },
};
