# Usage

## Installation

```bash
npm install @zonuexe/vitepress-slides
```

## Setup

### 1. Plugin Configuration

`docs/.vitepress/config.js`:

```javascript
import { defineConfig } from "vitepress";
import {
  slidesDataPlugin,
  pdfAssetsPlugin,
  oembedPlugin,
} from "@zonuexe/vitepress-slides/plugins";
import { generateSlidesData } from "./lib/slides-data.js";
import { loadSiteConfig } from "./lib/site-config.js";

export default defineConfig({
  vite: {
    plugins: [
      slidesDataPlugin({
        generateSlidesData,
        loadSiteConfig,
      }),
      pdfAssetsPlugin({
        pdfSourceDir: "./pdf",
        pdfDistDir: "./docs/.vitepress/dist/pdf",
      }),
      oembedPlugin({
        generateSlidesData,
        loadSiteConfig,
      }),
    ],
  },
});
```

### 2. Component Registration

`docs/.vitepress/theme/index.js`:

```javascript
import DefaultTheme from "vitepress/theme";
import {
  SlidesCatalog,
  SlideDetailPage,
} from "@zonuexe/vitepress-slides/components";
import "@zonuexe/vitepress-slides/styles";
import { slidesDataSymbol } from "@zonuexe/vitepress-slides/runtime";
import { slides, siteConfig } from "virtual:slides-data";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component("SlidesCatalog", SlidesCatalog);
    ctx.app.component("SlideDetailPage", SlideDetailPage);
    ctx.app.provide(slidesDataSymbol, { slides, siteConfig });
  },
};
```

`@zonuexe/vitepress-slides/styles` bundles both the Tailwind utility layer and the slide viewer-specific selectors, so importing it once here applies all required styling. Provide the `slides`/`siteConfig` payload via `slidesDataSymbol` so packaged components can access the virtual module data.

### 3. Using in Pages

`docs/index.md`:

```markdown
---
layout: page
---

<SlidesCatalog />
```

`docs/[slug]/index.md`:

```markdown
---
layout: page
---

<SlideDetailPage />
```

## Notes

- `lib/slides-data.js` and `lib/site-config.js` need to be implemented in each project
- Import `@zonuexe/vitepress-slides/styles` once from your theme entry; the file contains Tailwind directives as well as the slide viewer CSS, so ensure Tailwind/PostCSS is configured in your VitePress project
