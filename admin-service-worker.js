/* BiG-DreamzZ Director's Panel - Service Worker (v7, install + safe offline)
   - Network-FIRST for the admin page so you always get the freshest panel.
   - Only falls back to the cached page when the device is truly offline.
   - NEVER caches API/data calls (Supabase, Google Sheets, Cloudinary), so
     submissions/applications/reviews always load live from the network.
   - Does NOT call clients.claim() and ignores any non-admin navigation. */
const CACHE_VERSION = 'bigdreamzz-admin-v7';
const ADMIN_CACHE = CACHE_VERSION + '-shell';
const SHELL_ASSETS = ['./admin.html', './admin-manifest.webmanifest'];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(ADMIN_CACHE).then(function(c){
    return Promise.all(SHELL_ASSETS.map(function(a){
      return c.add(a).catch(function(err){ console.warn('[Admin SW] skip', a, err); });
    }));
  }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){
      return k.indexOf('bigdreamzz-admin-') === 0 && k.indexOf(CACHE_VERSION) !== 0;
    }).map(function(k){ return caches.delete(k); }));
  }));
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  if(req.mode !== 'navigate') return;
  // Only the admin page. Everything else (incl. all data/API calls) goes
  // straight to the network, untouched by this worker.
  if(req.url.indexOf('admin') < 0) return;
  e.respondWith(
    fetch(req).then(function(r){
      var cp = r.clone();
      caches.open(ADMIN_CACHE).then(function(c){ c.put('./admin.html', cp); });
      return r;
    }).catch(function(){
      // Only reached when genuinely offline.
      return caches.match('./admin.html');
    })
  );
});

self.addEventListener('message', function(e){ if(e.data === 'SKIP_WAITING') self.skipWaiting(); });
