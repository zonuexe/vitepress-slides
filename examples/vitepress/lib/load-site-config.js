import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const siteConfig = require("../data/site.json");

function normalizeBase(value) {
  if (!value || value === "/") return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function withBase(base, suffix) {
  const prefix = base ?? "";
  const normalizedSuffix = suffix.startsWith("/") ? suffix : `/${suffix}`;
  return `${prefix}${normalizedSuffix}`;
}

export async function loadSiteConfig() {
  const normalizedBase = normalizeBase(process.env.BASE_URL);
  const siteUrl = process.env.SITE_URL ?? siteConfig.site?.url ?? "";
  return {
    ...siteConfig,
    site: {
      ...siteConfig.site,
      url: siteUrl || siteConfig.site?.url || undefined,
    },
    embed: {
      ...siteConfig.embed,
      base_url: withBase(normalizedBase, "/slide-pdf.js"),
      slide_path: withBase(normalizedBase, "/pdf"),
    },
    oembed: {
      ...siteConfig.oembed,
      provider_url: siteUrl || siteConfig.oembed?.provider_url || "",
    },
  };
}
