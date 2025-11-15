import { inject } from "vue";

export const slidesDataSymbol = Symbol("vitepress-slides:data");

const defaultValue = {
  slides: [],
  siteConfig: {},
};

export function useSlidesData() {
  return inject(slidesDataSymbol, defaultValue);
}
