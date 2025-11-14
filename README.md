# @zonuexe/vitepress-slides

[VitePress] plugin and components collection for slide deck websites.

## Installation

```bash
npm install @zonuexe/vitepress-slides
# or
pnpm add @zonuexe/vitepress-slides
# or
yarn add @zonuexe/vitepress-slides
```

## Usage

### Using Plugins

`docs/.vitepress/config.js`:

```javascript
import { defineConfig } from "vitepress";
import { slidesDataPlugin, pdfAssetsPlugin, oembedPlugin } from "@zonuexe/vitepress-slides/plugins";

export default defineConfig({
  vite: {
    plugins: [
      slidesDataPlugin({
        slidesYamlPath: "./slides.yaml",
        siteYamlPath: "./_site.yaml",
      }),
      pdfAssetsPlugin({
        pdfSourceDir: "./pdf",
        pdfDistDir: "./docs/.vitepress/dist/pdf",
      }),
      oembedPlugin({
        distDir: "./docs/.vitepress/dist",
      }),
    ],
  },
});
```

### Using Components

`docs/.vitepress/theme/index.js`:

```javascript
import DefaultTheme from "vitepress/theme";
import {
  SlidesCatalog,
  SlideDetailPage,
  SlideCard,
} from "@zonuexe/vitepress-slides/components";
import "@zonuexe/vitepress-slides/styles";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component("SlidesCatalog", SlidesCatalog);
    ctx.app.component("SlideDetailPage", SlideDetailPage);
    ctx.app.component("SlideCard", SlideCard);
  },
};
```

### Styles

The bundled stylesheet includes both the Tailwind utility layer for the catalog UI and the slide viewer styles (e.g. `slide-text-*`, `back-link`). Import `@zonuexe/vitepress-slides/styles` once from your custom theme entry as shown above, and make sure your VitePress project already has Tailwind/PostCSS configured so the directives in that file can be processed.

## API

### Plugins

#### `slidesDataPlugin(options)`

Vite plugin for generating slide data

**Options:**
- `slidesYamlPath` (string): Path to slides.yaml
- `siteYamlPath` (string): Path to _site.yaml
- `publicSlidesScript` (string): Output script file path

#### `pdfAssetsPlugin(options)`

Vite plugin for serving PDF assets

**Options:**
- `pdfSourceDir` (string): PDF source directory
- `pdfDistDir` (string): PDF output directory

#### `oembedPlugin(options)`

Vite plugin for generating oEmbed files

**Options:**
- `distDir` (string): Output directory

### Components

#### `SlidesCatalog`

Component for displaying slide catalog

#### `SlideDetailPage`

Component for displaying slide detail page

**Props:**
- `slug` (string): Slide slug

#### `SlideCard`

Component for displaying slide card

**Props:**
- `slide` (object): Slide data object
- `query` (string): Search query (optional)

## Copyright

This package is licensed under the [Apache License, Version 2.0][Apache-2.0].

```
Copyright 2025 USAMI Kenta <tadsan@zonu.me>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[Apache-2.0]: https://www.apache.org/licenses/LICENSE-2.0
[VitePress]: https://vitepress.dev/
