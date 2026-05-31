/* BiG-DreamzZ AI Studio - Service Worker (minimal / install-only)
   Caches ONLY the page shell so the app is installable + opens offline.
   Images, videos, CDN, API calls all go straight to the network — the
   worker never touches them, so live thumbnails always load fresh. */
const CACHE_VERSION = 'bigdreamzz-studio-v5';
const SHELL_CACHE = CACHE_VERSION + '-shell';
const SHELL_ASSETS = ['./index.html', './manifest.webmanifest'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(SHELL_CACHE).then(function(c){
    return Promise.all(SHELL_ASSETS.map(function(a){
      return c.add(a).catch(function(err){ console.warn('[SW] skip', a, err); });
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
    var url = req.url;
    if(url.indexOf('admin') > -1) return;
    e.respondWith(
      fetch(req).then(function(r){
        var cp = r.clone();
        caches.open(SHELL_CACHE).then(function(c){ c.put('./index.html', cp); });
        return r;
      }).catch(function(){
        return caches.match('./index.html');
      })
    );
  }
});

self.addEventListener('message', function(e){ if(e.data === 'SKIP_WAITING') self.skipWaiting(); });
