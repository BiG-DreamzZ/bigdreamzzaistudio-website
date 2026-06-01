/* BiG-DreamzZ Director's Panel - Service Worker (minimal / install-only)
   Network-first for the admin page only. It NEVER handles or caches the
   studio page, and it does NOT call clients.claim(), so it cannot take
   over studio navigations. Never touches images/video/API. */
const CACHE_VERSION = 'bigdreamzz-admin-v6';
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
  // Only handle ADMIN navigations. Everything else is left to the network.
  if(req.url.indexOf('admin') < 0) return;
  e.respondWith(
    fetch(req).then(function(r){
      var cp = r.clone();
      caches.open(ADMIN_CACHE).then(function(c){ c.put('./admin.html', cp); });
      return r;
    }).catch(function(){
      return caches.match('./admin.html');
    })
  );
});

self.addEventListener('message', function(e){ if(e.data === 'SKIP_WAITING') self.skipWaiting(); });
