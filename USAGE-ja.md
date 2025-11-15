# 使用方法

## インストール

```bash
npm install @zonuexe/vitepress-slides
```

## セットアップ

### 1. プラグインの設定

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

### 2. コンポーネントの登録

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

`@zonuexe/vitepress-slides/styles` にはカタログUI向けのTailwindユーティリティとスライドビューア向けのセレクタが同梱されているため、ここで一度読み込むだけで必要なスタイルが適用されます。また `slidesDataSymbol` を使って `slides`/`siteConfig` を `provide` し、パッケージ側のコンポーネントが `virtual:slides-data` の内容にアクセスできるようにします。

### 3. ページでの使用

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

## 注意事項

- `lib/slides-data.js`と`lib/site-config.js`は各プロジェクトで実装する必要があります
- テーマエントリで `@zonuexe/vitepress-slides/styles` を一度読み込んでください。このファイルにはTailwindディレクティブとスライドビューア向けCSSが含まれるため、VitePressプロジェクト側でTailwind/PostCSSを設定しておく必要があります
