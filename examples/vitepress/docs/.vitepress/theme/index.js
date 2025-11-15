import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import {
  SlidesCatalog,
  SlideDetailPage,
} from "@zonuexe/vitepress-slides/components";
import "@zonuexe/vitepress-slides/styles";
import "github-fork-ribbon-css/gh-fork-ribbon.css";
import { slidesDataSymbol } from "@zonuexe/vitepress-slides/runtime";
import { slides, siteConfig } from "virtual:slides-data";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component("SlidesCatalog", SlidesCatalog);
    ctx.app.component("SlideDetailPage", SlideDetailPage);
    const runtimeBase =
      ctx.siteData?.base ??
      (typeof import.meta !== "undefined" ? import.meta.env.BASE_URL : "/") ??
      "/";
    ctx.app.provide(slidesDataSymbol, {
      slides,
      siteConfig,
      base: runtimeBase,
    });
  },
  Layout() {
    return h(
      "div",
      null,
      [
        h(
          "a",
          {
            class: "github-fork-ribbon",
            href: "https://github.com/zonuexe/vitepress-slides",
            "data-ribbon": "Fork me on GitHub",
            title: "Fork me on GitHub",
          },
          "Fork me on GitHub"
        ),
        h(DefaultTheme.Layout),
      ]
    );
  },
};
