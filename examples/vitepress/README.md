# VitePress Example

This directory contains a minimal VitePress site that exercises the components and plugins from `@zonuexe/vitepress-slides`. It demonstrates how to:

- import the provided plugins inside `docs/.vitepress/config.js`
- register the Vue components and provide slide data via `slidesDataSymbol`
- render the catalog and detail pages in Markdown files

## Usage

```bash
cd examples/vitepress
pnpm install
pnpm dev    # builds slide-pdf.js and starts VitePress dev server
pnpm build  # rebuilds the viewer and generates docs/.vitepress/dist
```

`pnpm dev` / `pnpm build` automatically run `pnpm run prepare-viewer`, which bundles the viewer in `../slide-pdf.js` and copies the output into `docs/public/slide-pdf.js` so the `<iframe>` can load it locally.

For deployments under a subdirectory (e.g., GitHub Pages at `/vitepress-slides/`), set the following environment variables before running `pnpm build`:

- `BASE_URL` (e.g., `/vitepress-slides`)
- `SITE_URL` (e.g., `https://zonuexe.github.io/vitepress-slides`)

The GitHub Actions workflow already exports these values so the published demo works on Pages.

The example ships with a single slide entry defined in `data/slides.json` and a sample site configuration stored in `data/site.json`. Feel free to duplicate those files to test additional scenarios.
