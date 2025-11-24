// Minimal service worker for installability
self.addEventListener('install', e => {
  console.log('[Service Worker] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('[Service Worker] Activated');
  self.clients.claim();
});

// Optional fetch caching (not needed since your app is live Streamlit)
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
