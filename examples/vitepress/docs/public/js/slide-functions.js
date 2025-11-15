(() => {
  const toast = document.createElement("div");
  toast.id = "example-toast";
  toast.style.cssText =
    "position:fixed;bottom:24px;right:24px;padding:12px 20px;background:#111;color:#fff;border-radius:999px;opacity:0;transition:opacity .2s;";
  document.addEventListener("DOMContentLoaded", () => document.body.appendChild(toast));

  function showToast(message) {
    toast.textContent = message;
    toast.style.opacity = "1";
    setTimeout(() => {
      toast.style.opacity = "0";
    }, 1500);
  }

  window.initializeSlide = () => showToast("Slide initialized");
  window.toggleExpanded = () => showToast("Toggle embed frame");
  window.toggleFullscreen = () => showToast("Toggle fullscreen info");
  window.shareSlide = () => showToast("Share dialog would open");
  window.downloadCanvasAsImage = () => showToast("Pretend to save page");
  window.copyCanvasToClipboard = () => showToast("Pretend to copy page");
})();
