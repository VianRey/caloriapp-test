const CACHE_NAME = "caloria-pwa-v1";

const STATIC_ASSETS = [
  "/",
  "index.html",
  "manifest.json",
  "static/AppImages/android/android-launchericon-48-48.png",
  "static/AppImages/android/android-launchericon-72-72.png",
  "static/AppImages/android/android-launchericon-96-96.png",
  "static/AppImages/android/android-launchericon-144-144.png",
  "static/AppImages/android/android-launchericon-192-192.png",
  "static/AppImages/android/android-launchericon-512-512.png",
];

// Install
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
