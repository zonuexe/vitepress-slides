# Repository Guidelines

## Project Structure & Module Organization
`src/index.js` re-exports everything under `src/plugins`, `src/components`, and `src/styles`, so keep those entry points stable. Author new Vite plugins beside `slides-data.js`, `pdf-assets.js`, and `oembed.js` in `src/plugins/`; mirror the export in `src/plugins/index.js`. Vue single-file components such as `SlidesCatalog.vue`, `SlideDetailPage.vue`, and `SlideCard.vue` live in `src/components/` with their registry in `src/components/index.js`. Shared visual tokens belong in `src/styles/index.css`. Example data, READMEs, and usage notes stay at the repo root to keep the published `dist/` lean.

## Build, Test, and Development Commands
Use pnpm for reproducible installs (`pnpm install`). `pnpm build` runs `vite build` and bundles plugins, components, and CSS into `dist/`; run it before publishing or pushing feature branches. During local iteration, point a VitePress docs site at your checkout and run `pnpm vitepress dev docs` from that consumer project to verify hot-module reload, since this package exposes plugins only after being built.

## Coding Style & Naming Conventions
Stick with native ES modules, `type: "module"`, and 2-space indentation. Keep exports named and stable (`export function slidesDataPlugin`). Vue components should use `<script setup>` only when necessary; otherwise follow the current options script style for clarity. Prefer descriptive filenames (`SlideTextNodes.vue`) and kebab-case CSS class names inside `index.css`. Run `pnpm build` as a lightweight lint to ensure bundling and type inference succeed.

## Semantic Markup
Favor semantic HTML—wrap main decks in `<main>`, index tiles in `<section>` or `<article>`, navigation widgets in `<nav>`, and supporting details in `<aside>`. When exposing metadata, reach for Microformats or similar vocabularies so consuming tools (e.g., search indexes) can parse slide titles, authors, and dates. Avoid anonymous `<div>` wrappers unless no semantic tag fits, and document any structured-data changes in `USAGE.md`.

## Documentation & Localization
Ship comments and docs in English so the package reads cleanly on npm, and mirror content in `*-ja.md` files when a Japanese version is needed. Avoid drifting explanations—update the English source first, then port the exact change to its `-ja` counterpart (e.g., `README.md` and `README-ja.md`).

## Browser Baseline
Target the 2022 interoperability baseline as the minimum expectation and lean on modern Web APIs (CSS logical props, `:has()`, URLPattern, etc.) whenever they reduce code or polyfills. Before adopting a feature, verify recent Chrome/Firefox/Safari all support it; otherwise gate it with feature detection and document the fallback in `USAGE.md`.

## Testing Guidelines
There is no formal test harness yet, so add scenario-focused checks alongside consumers. For new plugins, create fixture inputs (YAML or PDFs) under a temporary directory and exercise them via Vite’s plugin hooks, ensuring they watch the expected files. When adding Vue components, validate them in a demo VitePress site and capture the repro steps in the PR description. Keep manual verification notes concise but explicit.

## Commit & Pull Request Guidelines
Use imperative, scoped commits such as `feat: add SlideTextNodes search` or `fix: guard pdf asset lookup`. Each PR should describe the motivation, summarize behavioral changes, list manual verification commands, and mention any docs you touched (README, USAGE). Link related issues or discussion threads, and include screenshots or terminal snippets when UI or CLI output changes.
