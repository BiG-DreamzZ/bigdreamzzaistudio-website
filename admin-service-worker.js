/* ════════════════════════════════════════════════════════════
   BiG-DreamzZ Director's Panel — Service Worker
   The admin panel shows live data, so we use NETWORK-FIRST:
   always try the network, fall back to cache only when offline.
   This keeps the control panel current while still being
   installable and resilient to a dropped connection.
   Bump CACHE_VERSION whenever you update admin.html.
════════════════════════════════════════════════════════════ */
const CACHE_VERSION = 'bigdreamzz-admin-v1';
const ADMIN_CACHE   = `${CACHE_VERSION}-shell`;

const SHELL_ASSETS = [
  './admin.html',
  './admin-manifest.webmanifest',
  './admin-icon-192.png',
  './admin-icon-512.png',
  './admin-icon-maskable-192.png',
  './admin-icon-maskable-512.png',
  './admin-apple-touch-180.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(ADMIN_CACHE)
      .then((cache) =>
        Promise.all(
          SHELL_ASSETS.map((a) =>
            cache.add(a).catch((e) => console.warn('[Admin SW] skip', a, e))
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (request.url.includes('cloudflareinsights.com')) return;

  // Network-first for the panel + its assets; cache as offline fallback.
  event.respondWith(
    fetch(request)
      .then((resp) => {
        if (resp && resp.status === 200 && resp.type === 'basic') {
          const copy = resp.clone();
          caches.open(ADMIN_CACHE).then((c) => c.put(request, copy));
        }
        return resp;
      })
      .catch(() =>
        caches.match(request).then(
          (cached) => cached || caches.match('./admin.html')
        )
      )
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
