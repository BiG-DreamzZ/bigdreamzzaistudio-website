/* ════════════════════════════════════════════════════════════
   BiG-DreamzZ AI Studio — Service Worker
   Makes the site installable, fast, and offline-capable.
   Strategy:
     • App shell (HTML/CSS/icons)  -> stale-while-revalidate
     • Video (HLS .m3u8/.ts, CDN)  -> network-first (never trap stale streams)
     • Fonts / CDN assets          -> cache-first
   Bump CACHE_VERSION whenever you update the site so visitors
   automatically pull the fresh version.
════════════════════════════════════════════════════════════ */
const CACHE_VERSION = 'bigdreamzz-studio-v1';
const SHELL_CACHE   = `${CACHE_VERSION}-shell`;
const ASSET_CACHE   = `${CACHE_VERSION}-assets`;

// Core files to pre-cache so the app opens instantly / offline.
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './studio-icon-192.png',
  './studio-icon-512.png',
  './studio-icon-maskable-192.png',
  './studio-icon-maskable-512.png',
  './studio-apple-touch-180.png'
];

// ---- INSTALL: pre-cache the shell ----
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS).catch(() => {
        // Don't fail install if one optional asset 404s
        return Promise.all(
          SHELL_ASSETS.map((a) =>
            cache.add(a).catch((e) => console.warn('[SW] skip', a, e))
          )
        );
      }))
      .then(() => self.skipWaiting())
  );
});

// ---- ACTIVATE: clean up old versions ----
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

// ---- helpers ----
const isVideoStream = (url) =>
  /\.(m3u8|ts|mp4|m4s|mpd)(\?|$)/i.test(url) ||
  url.includes('b-cdn.net') ||
  url.includes('mediadelivery') ||
  url.includes('iframe.mediadelivery');

const isCacheableAsset = (url) =>
  /\.(css|js|woff2?|ttf|otf|png|jpe?g|webp|svg|gif|ico)(\?|$)/i.test(url) ||
  url.includes('fonts.googleapis.com') ||
  url.includes('fonts.gstatic.com') ||
  url.includes('cdn.jsdelivr.net') ||
  url.includes('cdnjs.cloudflare.com');

// ---- FETCH ----
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = request.url;

  // Never interfere with analytics / beacons
  if (url.includes('cloudflareinsights.com')) return;

  // 1) Video & streaming -> network-first, no long-term caching.
  if (isVideoStream(url)) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  // 2) Navigations (the page itself) -> stale-while-revalidate
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => {
        const network = fetch(request)
          .then((resp) => {
            const copy = resp.clone();
            caches.open(SHELL_CACHE).then((c) => c.put('./index.html', copy));
            return resp;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // 3) Static assets (fonts, css, icons) -> cache-first, refresh in bg
  if (isCacheableAsset(url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((resp) => {
            if (resp && resp.status === 200) {
              const copy = resp.clone();
              caches.open(ASSET_CACHE).then((c) => c.put(request, copy));
            }
            return resp;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // 4) Everything else -> network, fall back to cache if offline
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});

// Allow the page to tell SW to activate immediately after an update
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
