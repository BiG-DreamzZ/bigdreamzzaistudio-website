/* BiG-DreamzZ Director's Panel - Service Worker (minimal / install-only)
   Network-first for the page; never touches images/video/API so live
   admin data always loads fresh. */
const CACHE_VERSION = 'bigdreamzz-admin-v5';
const ADMIN_CACHE = CACHE_VERSION + '-shell';
const SHELL_ASSETS = ['./admin.html', './admin-manifest.webmanifest'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(ADMIN_CACHE).then(function(c){
    return Promise.all(SHELL_ASSETS.map(function(a){
      return c.add(a).catch(function(err){ console.warn('[Admin SW] skip', a, err); });
    }));
  }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k.indexOf(CACHE_VERSION)!==0; })
      .map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  if(req.mode === 'navigate'){
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
  }
});

self.addEventListener('message', function(e){ if(e.data === 'SKIP_WAITING') self.skipWaiting(); });
