// Dev-server static fallback for /playground.js
// This file exists so browsers requesting /playground.js (for local dev)
// receive valid JavaScript (avoiding 404 / MIME-type text/html errors).
// It will also attempt to load the main `scratch-paint.js` bundle as a fallback
// when the in-memory playground bundle is not available (e.g. when using
// a mismatched protocol).

(function () {
  // Avoid running in production builds (this file lives in /playground only).
  if (typeof window === 'undefined') return;

  // Load the library bundle as a fallback so pages that expect /playground.js
  // still get executable JS.
  var libScript = document.createElement('script');
  libScript.src = '/scratch-paint.js';
  libScript.defer = true;
  libScript.onload = function () {
    // Optionally signal that fallback loaded.
    // console.info('Loaded fallback /scratch-paint.js');
  };
  libScript.onerror = function () {
    // console.warn('Fallback /scratch-paint.js failed to load');
  };
  document.head.appendChild(libScript);
})();
