# @zonuexe/vitepress-slides

[VitePress]用のスライドデッキプラグインとコンポーネント集

## インストール

```bash
npm install @zonuexe/vitepress-slides
# または
pnpm add @zonuexe/vitepress-slides
# または
yarn add @zonuexe/vitepress-slides
```

## 使用方法

### プラグインの使用

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

### コンポーネントの使用

`docs/.vitepress/theme/index.js`:

```javascript
import DefaultTheme from "vitepress/theme";
import {
  SlidesCatalog,
  SlideDetailPage,
  SlideCard,
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
    ctx.app.component("SlideCard", SlideCard);
    ctx.app.provide(slidesDataSymbol, {
      slides,
      siteConfig,
      base: ctx.siteData?.base ?? "/",
    });
  },
};
```

### スタイル

本パッケージには、カタログUI用のTailwindユーティリティとスライドビューア用スタイル（`slide-text-*` や `back-link` など）をまとめたCSSが同梱されています。上記のように `@zonuexe/vitepress-slides/styles` をテーマエントリで一度読み込み、`@tailwind` ディレクティブを解決できるようプロジェクト側でTailwind/PostCSSを設定してください。

## API

### プラグイン

#### `slidesDataPlugin(options)`

スライドデータを生成するViteプラグイン

**オプション:**
- `slidesYamlPath` (string): slides.yamlのパス
- `siteYamlPath` (string): _site.yamlのパス
- `publicSlidesScript` (string): 出力先のスクリプトファイルパス

#### `pdfAssetsPlugin(options)`

PDFアセットを配信するViteプラグイン

**オプション:**
- `pdfSourceDir` (string): PDFソースディレクトリ
- `pdfDistDir` (string): PDF出力先ディレクトリ

#### `oembedPlugin(options)`

oEmbedファイルを生成するViteプラグイン

**オプション:**
- `distDir` (string): 出力先ディレクトリ

### コンポーネント

#### `SlidesCatalog`

スライド一覧を表示するコンポーネント

#### `SlideDetailPage`

スライド詳細ページを表示するコンポーネント

**Props:**
- `slug` (string): スライドのスラッグ

#### `SlideCard`

スライドカードを表示するコンポーネント

**Props:**
- `slide` (object): スライドデータオブジェクト
- `query` (string): 検索クエリ（オプション）

## Copyright

このパッケージは[Apache License, Version 2.0][Apache-2.0]でライセンスされています。

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
