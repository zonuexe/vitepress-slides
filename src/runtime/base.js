export function joinWithBase(base = "/", path = "/") {
  if (!path || path === "/") {
    return base ?? "/";
  }
  const normalizedBase = (base ?? "/").replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase === "" ? "" : normalizedBase}${normalizedPath}`;
}
