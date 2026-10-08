// Preload script for secure desktop interop
window.addEventListener('DOMContentLoaded', () => {
  // Desktop specific environment flags
  window.__IS_ELECTRON__ = true;
});
