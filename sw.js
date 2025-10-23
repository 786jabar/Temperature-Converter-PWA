const CACHE_NAME = 'temp-converter-v1';
const ASSETS = [
  './',
  './index.html',
  './converter.css',
  './converter.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => {
      if (k !== CACHE_NAME) return caches.delete(k);
    })))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        // Only cache GET requests from same-origin
        if (event.request.method === 'GET' && resp && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return resp;
      }).catch(() => {
        // If request fails (offline) and it's a navigation, return cached index
        if (event.request.mode === 'navigate') {
          return caches.match('./');
        }
      });
    })
  );
});
