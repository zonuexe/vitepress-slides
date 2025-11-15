import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const slides = require("../data/slides.json");

export async function generateSlidesData() {
  const enrichedSlides = slides.map((slide) => ({
    ...slide,
    combinedContent: slide.combinedContent ?? slide.title,
  }));
  return {
    enrichedSlides,
    slidesForClient: enrichedSlides,
  };
}
